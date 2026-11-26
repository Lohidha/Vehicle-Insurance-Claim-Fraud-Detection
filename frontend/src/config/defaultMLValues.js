// Default fallback values for the remaining 21 ML predictor features 
// that are NOT exposed in the simplified 10-field React UI.
// The Spring Boot/FastAPI backend will eventually merge these, but for now 
// they serve as documentation of the complete 31-feature schema.

export const defaultMLValues = {
  Month: "Jan",
  WeekOfMonth: 1,
  DayOfWeek: "Monday",
  DayOfWeekClaimed: "Tuesday",
  MonthClaimed: "Jan",
  WeekOfMonthClaimed: 1,
  PolicyType: "Sedan - Collision",
  RepNumber: 1,
  Deductible: 400,
  DriverRating: 1,
  Days_Policy_Accident: "more than 30",
  Days_Policy_Claim: "more than 30",
  PastNumberOfClaims: "none",
  AgeOfVehicle: "7 years",
  AgeOfPolicyHolder: "31 to 35",
  AgentType: "External",
  NumberOfSuppliments: "none",
  AddressChange_Claim: "no change",
  NumberOfCars: "1 vehicle",
  Year: 1994,
  BasePolicy: "Collision"
};
