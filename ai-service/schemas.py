from pydantic import BaseModel

class ClaimPredictionRequest(BaseModel):
    age: int
    sex: str
    maritalStatus: str
    make: str
    vehicleCategory: str
    vehiclePrice: str
    accidentArea: str
    fault: str
    policeReportFiled: str
    witnessPresent: str
    driverRating: int
    pastNumberOfClaims: str
    ageOfVehicle: str
    ageOfPolicyHolder: str
    policyType: str
    basePolicy: str
    daysPolicyAccident: str
    daysPolicyClaim: str
    agentType: str
