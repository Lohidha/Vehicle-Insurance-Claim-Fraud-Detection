import traceback
import sys

print(f"Python: {sys.version}")

# Step 1: core deps
try:
    import sklearn
    import catboost
    import joblib
    import pickle
    import pandas as pd
    print(f"sklearn: {sklearn.__version__}")
    print(f"catboost: {catboost.__version__}")
    print("All imports OK")
except Exception as e:
    print(f"IMPORT ERROR: {e}")
    traceback.print_exc()
    sys.exit(1)

# Step 2: load preprocessor with pickle
try:
    with open("model/preprocessor.pkl", "rb") as f:
        preprocessor = pickle.load(f)
    print(f"preprocessor (pickle) loaded OK: {type(preprocessor)}")
except Exception as e:
    print(f"PICKLE LOAD ERROR: {e}")
    traceback.print_exc()

# Step 3: load preprocessor with joblib
try:
    preprocessor2 = joblib.load("model/preprocessor.pkl")
    print(f"preprocessor (joblib) loaded OK: {type(preprocessor2)}")
except Exception as e:
    print(f"JOBLIB LOAD ERROR: {e}")
    traceback.print_exc()

# Step 4: load CatBoost model
try:
    from catboost import CatBoostClassifier
    model = CatBoostClassifier()
    model.load_model("model/catboost_model.cbm")
    print("CatBoost model loaded OK")
except Exception as e:
    print(f"CATBOOST LOAD ERROR: {e}")
    traceback.print_exc()

# Step 5: run a prediction
try:
    import pandas as pd
    data = {
        "Month": "Jan", "WeekOfMonth": 1, "DayOfWeek": "Monday",
        "DayOfWeekClaimed": "Tuesday", "MonthClaimed": "Jan",
        "WeekOfMonthClaimed": 1, "RepNumber": 1, "Deductible": 400,
        "Age": 35, "Sex": "Male", "MaritalStatus": "Married",
        "Make": "Toyota", "VehicleCategory": "Sport",
        "VehiclePrice": "20000 to 29000", "AccidentArea": "Urban",
        "Fault": "Policy Holder", "PoliceReportFiled": "Yes",
        "WitnessPresent": "No", "DriverRating": 1,
        "PastNumberOfClaims": "none", "AgeOfVehicle": "7 years",
        "AgeOfPolicyHolder": "31 to 35", "PolicyType": "Sedan - Collision",
        "BasePolicy": "Collision", "Days_Policy_Accident": "more than 30",
        "Days_Policy_Claim": "more than 30", "AgentType": "External",
        "NumberOfSuppliments": "none", "AddressChange_Claim": "no change",
        "NumberOfCars": "1 vehicle", "Year": 1994,
    }
    df = pd.DataFrame([data])
    X = preprocessor.transform(df)
    prob = float(model.predict_proba(X)[0, 1])
    print(f"Test prediction probability: {prob:.4f}")
    print("Full pipeline OK")
except Exception as e:
    print(f"PIPELINE ERROR: {e}")
    traceback.print_exc()
