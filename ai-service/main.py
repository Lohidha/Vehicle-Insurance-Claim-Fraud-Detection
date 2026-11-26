import os
import pickle
import traceback
import pandas as pd
from fastapi import FastAPI, HTTPException
from catboost import CatBoostClassifier
from schemas import ClaimPredictionRequest

app = FastAPI(title="Vehicle Insurance Claim Fraud Detection AI Service")

# Use absolute paths derived from this file's location so the service works
# correctly regardless of which directory uvicorn is launched from.
_HERE = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(_HERE, "model")
MODEL_PATH = os.path.join(MODEL_DIR, "catboost_model.cbm")
PREPROCESSOR_PATH = os.path.join(MODEL_DIR, "preprocessor.pkl")

# Load artifacts
model = None
preprocessor = None
try:
    if os.path.exists(MODEL_PATH) and os.path.exists(PREPROCESSOR_PATH):
        model = CatBoostClassifier()
        model.load_model(MODEL_PATH)

        with open(PREPROCESSOR_PATH, 'rb') as f:
            preprocessor = pickle.load(f)

        MODEL_LOADED = True
        print(f"[AI Service] Model artifacts loaded successfully from {MODEL_DIR}")
    else:
        MODEL_LOADED = False
        print(f"[AI Service] WARNING: model artifacts not found at {MODEL_DIR}")
except Exception as e:
    MODEL_LOADED = False
    print(f"[AI Service] ERROR loading model artifacts:")
    traceback.print_exc()

DEFAULT_ML_VALUES = {
    "Month": "Jan",
    "WeekOfMonth": 1,
    "DayOfWeek": "Monday",
    "DayOfWeekClaimed": "Tuesday",
    "MonthClaimed": "Jan",
    "WeekOfMonthClaimed": 1,
    "RepNumber": 1,
    "Deductible": 400,
    "NumberOfSuppliments": "none",
    "AddressChange_Claim": "no change",
    "NumberOfCars": "1 vehicle",
    "Year": 1994,
}

@app.get("/health")
def health_check():
    return {
        "status": "AI service is running",
        "modelLoaded": MODEL_LOADED
    }

@app.post("/predict")
def predict_claim(claim: ClaimPredictionRequest):
    if not MODEL_LOADED:
        raise HTTPException(status_code=503, detail="ML model is not available yet.")
    
    # Combine received 19 fields with defaults for the 12 uncollected fields
    data_dict = {
        **DEFAULT_ML_VALUES,
        "Age": claim.age,
        "Sex": claim.sex,
        "MaritalStatus": claim.maritalStatus,
        "Make": claim.make,
        "VehicleCategory": claim.vehicleCategory,
        "VehiclePrice": claim.vehiclePrice,
        "AccidentArea": claim.accidentArea,
        "Fault": claim.fault,
        "PoliceReportFiled": claim.policeReportFiled,
        "WitnessPresent": claim.witnessPresent,
        "DriverRating": claim.driverRating,
        "PastNumberOfClaims": claim.pastNumberOfClaims,
        "AgeOfVehicle": claim.ageOfVehicle,
        "AgeOfPolicyHolder": claim.ageOfPolicyHolder,
        "PolicyType": claim.policyType,
        "BasePolicy": claim.basePolicy,
        "Days_Policy_Accident": claim.daysPolicyAccident,
        "Days_Policy_Claim": claim.daysPolicyClaim,
        "AgentType": claim.agentType
    }
    
    df = pd.DataFrame([data_dict])
    
    try:
        X_transformed = preprocessor.transform(df)
        prob = float(model.predict_proba(X_transformed)[0, 1])
        
        threshold = 0.380
        is_fraudulent = prob >= threshold
        
        if prob >= 0.7:
            risk_level = "High"
        elif prob >= threshold:
            risk_level = "Medium"
        else:
            risk_level = "Low"
            
        prediction = "Potential Fraud" if is_fraudulent else "Likely Legitimate"
        
        return {
            "probability": prob,
            "riskLevel": risk_level,
            "prediction": prediction
        }
    except Exception as e:
        print(f"[AI Service] Prediction error:")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Error generating prediction.")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

