import pandas as pd
import numpy as np
import pickle
import os
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score, average_precision_score, confusion_matrix
from catboost import CatBoostClassifier

def evaluate_model(y_true, y_prob, threshold):
    y_pred = (y_prob >= threshold).astype(int)
    return {
        "Accuracy": accuracy_score(y_true, y_pred),
        "Precision": precision_score(y_true, y_pred, zero_division=0),
        "Recall": recall_score(y_true, y_pred),
        "F1-score": f1_score(y_true, y_pred, zero_division=0),
        "ROC-AUC": roc_auc_score(y_true, y_prob),
        "PR-AUC": average_precision_score(y_true, y_prob),
        "Confusion Matrix": confusion_matrix(y_true, y_pred).tolist()
    }

def main():
    print("--- Starting Phase 2: CatBoost ML Training Pipeline ---")
    
    # Load Data
    data_path = '../fraud_oracle.csv'
    if not os.path.exists(data_path):
        raise FileNotFoundError(f"Dataset not found at {data_path}")
    
    df = pd.read_csv(data_path)
    
    print("\n1. Dataset shape:", df.shape)
    
    # Drop PolicyNumber
    df = df.drop(columns=['PolicyNumber'])
    
    # Target and Features
    X = df.drop(columns=['FraudFound_P'])
    y = df['FraudFound_P']
    
    # 80:20 Stratified Split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, stratify=y, random_state=42
    )
    
    print("2. Train shape:", X_train.shape, "| Test shape:", X_test.shape)
    print("3. Target distribution in train:", y_train.value_counts().to_dict())
    print("4. Target distribution in test:", y_test.value_counts().to_dict())
    
    # Identify Categorical and Numerical features
    categorical_features = [
        "Month", "DayOfWeek", "Make", "AccidentArea", "DayOfWeekClaimed", 
        "MonthClaimed", "Sex", "MaritalStatus", "Fault", "PolicyType", 
        "VehicleCategory", "VehiclePrice", "Days_Policy_Accident", 
        "Days_Policy_Claim", "PastNumberOfClaims", "AgeOfVehicle", 
        "AgeOfPolicyHolder", "PoliceReportFiled", "WitnessPresent", 
        "AgentType", "NumberOfSuppliments", "AddressChange_Claim", 
        "NumberOfCars", "BasePolicy"
    ]
    numerical_features = [
        "WeekOfMonth", "WeekOfMonthClaimed", "Age", "RepNumber", 
        "Deductible", "DriverRating", "Year"
    ]
            
    print("5. Number of categorical features:", len(categorical_features))
    print("6. Number of numerical features:", len(numerical_features))
    
    # Preprocessing
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', StandardScaler(), numerical_features),
            ('cat', OneHotEncoder(handle_unknown='ignore', sparse_output=False), categorical_features)
        ])
    
    # Fit strictly on train and transform
    X_train_transformed = preprocessor.fit_transform(X_train)
    X_test_transformed = preprocessor.transform(X_test)
    
    print("7. Number of transformed features:", X_train_transformed.shape[1])
    
    if X_train_transformed.shape[1] != 147:
        print(f"WARNING: Expected 147 transformed features, got {X_train_transformed.shape[1]}")
    
    print("\n--- Training CatBoost Model ---")
    # Do not use native cat handling, as we already one-hot encoded
    model = CatBoostClassifier(
        random_seed=42,
        verbose=100
    )
    model.fit(X_train_transformed, y_train)
    
    # Evaluation
    print("\n--- Model Evaluation ---")
    y_test_prob = model.predict_proba(X_test_transformed)[:, 1]
    
    print("\n[Threshold 0.5 Results]")
    res_05 = evaluate_model(y_test, y_test_prob, 0.5)
    for k, v in res_05.items():
        print(f"{k}: {v}")
        
    print("\n[Threshold 0.380 Results]")
    res_038 = evaluate_model(y_test, y_test_prob, 0.380)
    for k, v in res_038.items():
        print(f"{k}: {v}")
        
    # Save Artifacts
    model_dir = 'model'
    os.makedirs(model_dir, exist_ok=True)
    
    model.save_model(os.path.join(model_dir, 'catboost_model.cbm'))
    
    # Save preprocessor and metadata
    metadata = {
        'categorical_features': categorical_features,
        'numerical_features': numerical_features,
        'feature_names': list(X.columns),
        'threshold': 0.380,
        'version': '1.0',
        'transformed_feature_count': X_train_transformed.shape[1]
    }
    
    with open(os.path.join(model_dir, 'preprocessor.pkl'), 'wb') as f:
        pickle.dump(preprocessor, f)
        
    with open(os.path.join(model_dir, 'metadata.pkl'), 'wb') as f:
        pickle.dump(metadata, f)
        
    print("\n--- Phase 2 Complete. Artifacts saved in ai-service/model/ ---")

if __name__ == "__main__":
    main()
