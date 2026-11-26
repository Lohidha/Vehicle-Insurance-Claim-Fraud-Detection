package com.vehiclefraud.backend.dto;

public class ClaimPredictionRequest {
    private Integer age;
    private String sex;
    private String maritalStatus;
    private String make;
    private String vehicleCategory;
    private String vehiclePrice;
    private String accidentArea;
    private String fault;
    private String policeReportFiled;
    private String witnessPresent;
    private Integer driverRating;
    private String pastNumberOfClaims;
    private String ageOfVehicle;
    private String ageOfPolicyHolder;
    private String policyType;
    private String basePolicy;
    private String daysPolicyAccident;
    private String daysPolicyClaim;
    private String agentType;

    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }

    public String getSex() { return sex; }
    public void setSex(String sex) { this.sex = sex; }

    public String getMaritalStatus() { return maritalStatus; }
    public void setMaritalStatus(String maritalStatus) { this.maritalStatus = maritalStatus; }

    public String getMake() { return make; }
    public void setMake(String make) { this.make = make; }

    public String getVehicleCategory() { return vehicleCategory; }
    public void setVehicleCategory(String vehicleCategory) { this.vehicleCategory = vehicleCategory; }

    public String getVehiclePrice() { return vehiclePrice; }
    public void setVehiclePrice(String vehiclePrice) { this.vehiclePrice = vehiclePrice; }

    public String getAccidentArea() { return accidentArea; }
    public void setAccidentArea(String accidentArea) { this.accidentArea = accidentArea; }

    public String getFault() { return fault; }
    public void setFault(String fault) { this.fault = fault; }

    public String getPoliceReportFiled() { return policeReportFiled; }
    public void setPoliceReportFiled(String policeReportFiled) { this.policeReportFiled = policeReportFiled; }

    public String getWitnessPresent() { return witnessPresent; }
    public void setWitnessPresent(String witnessPresent) { this.witnessPresent = witnessPresent; }

    public Integer getDriverRating() { return driverRating; }
    public void setDriverRating(Integer driverRating) { this.driverRating = driverRating; }

    public String getPastNumberOfClaims() { return pastNumberOfClaims; }
    public void setPastNumberOfClaims(String pastNumberOfClaims) { this.pastNumberOfClaims = pastNumberOfClaims; }

    public String getAgeOfVehicle() { return ageOfVehicle; }
    public void setAgeOfVehicle(String ageOfVehicle) { this.ageOfVehicle = ageOfVehicle; }

    public String getAgeOfPolicyHolder() { return ageOfPolicyHolder; }
    public void setAgeOfPolicyHolder(String ageOfPolicyHolder) { this.ageOfPolicyHolder = ageOfPolicyHolder; }

    public String getPolicyType() { return policyType; }
    public void setPolicyType(String policyType) { this.policyType = policyType; }

    public String getBasePolicy() { return basePolicy; }
    public void setBasePolicy(String basePolicy) { this.basePolicy = basePolicy; }

    public String getDaysPolicyAccident() { return daysPolicyAccident; }
    public void setDaysPolicyAccident(String daysPolicyAccident) { this.daysPolicyAccident = daysPolicyAccident; }

    public String getDaysPolicyClaim() { return daysPolicyClaim; }
    public void setDaysPolicyClaim(String daysPolicyClaim) { this.daysPolicyClaim = daysPolicyClaim; }

    public String getAgentType() { return agentType; }
    public void setAgentType(String agentType) { this.agentType = agentType; }
}
