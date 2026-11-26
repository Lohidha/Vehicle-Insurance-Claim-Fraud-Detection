import { useState } from 'react';
import { predictFraud } from '../services/api';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

export default function PredictClaim() {
  const [formData, setFormData] = useState({
    age: '',
    sex: 'Male',
    maritalStatus: 'Single',
    make: 'Honda',
    vehicleCategory: 'Sedan',
    vehiclePrice: '20000 to 29000',
    accidentArea: 'Urban',
    fault: 'Policy Holder',
    policeReportFiled: 'No',
    witnessPresent: 'No',
    driverRating: '1',
    pastNumberOfClaims: 'none',
    ageOfVehicle: '7 years',
    ageOfPolicyHolder: '31 to 35',
    policyType: 'Sedan - Collision',
    basePolicy: 'Collision',
    daysPolicyAccident: 'more than 30',
    daysPolicyClaim: 'more than 30',
    agentType: 'External'
  });
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setResult(null);
    try {
      const res = await predictFraud(formData);
      setResult(res);
    } catch (error) {
      console.error(error);
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Predict Claim Fraud</h1>
      
      {errorMsg && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
          <p className="text-red-700 font-medium">{errorMsg}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 space-y-8">

              {/* Claimant Details */}
              <section>
                <h2 className="text-lg font-semibold text-slate-800 mb-4 pb-2 border-b">Claimant Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div>
                    <label className="block text-sm font-medium text-slate-700">Age</label>
                    <span className="block text-xs text-slate-500 mb-1">Age</span>
                    <input required type="number" name="age" value={formData.age} onChange={handleChange} className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Sex</label>
                    <span className="block text-xs text-slate-500 mb-1">Gender</span>
                    <select name="sex" value={formData.sex} onChange={handleChange} className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 bg-white">
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Marital Status</label>
                    <span className="block text-xs text-slate-500 mb-1">Marital status</span>
                    <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 bg-white">
                      <option>Single</option>
                      <option>Married</option>
                      <option>Widow</option>
                      <option>Divorced</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Age of Policy Holder</label>
                    <span className="block text-xs text-slate-500 mb-1">Policyholder age</span>
                    <select name="ageOfPolicyHolder" value={formData.ageOfPolicyHolder} onChange={handleChange} className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 bg-white">
                      <option>16 to 17</option>
                      <option>18 to 20</option>
                      <option>21 to 25</option>
                      <option>26 to 30</option>
                      <option>31 to 35</option>
                      <option>36 to 40</option>
                      <option>41 to 50</option>
                      <option>51 to 65</option>
                      <option>over 65</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Vehicle Details */}
              <section>
                <h2 className="text-lg font-semibold text-slate-800 mb-4 pb-2 border-b">Vehicle Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Make</label>
                    <span className="block text-xs text-slate-500 mb-1">Vehicle brand</span>
                    <input required type="text" name="make" value={formData.make} onChange={handleChange} className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Vehicle Category</label>
                    <span className="block text-xs text-slate-500 mb-1">Vehicle type</span>
                    <select name="vehicleCategory" value={formData.vehicleCategory} onChange={handleChange} className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 bg-white">
                      <option>Sedan</option>
                      <option>Sport</option>
                      <option>Utility</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Vehicle Price</label>
                    <span className="block text-xs text-slate-500 mb-1">Vehicle value</span>
                    <select name="vehiclePrice" value={formData.vehiclePrice} onChange={handleChange} className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 bg-white">
                      <option>less than 20000</option>
                      <option>20000 to 29000</option>
                      <option>30000 to 39000</option>
                      <option>40000 to 59000</option>
                      <option>60000 to 69000</option>
                      <option>more than 69000</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Age of Vehicle</label>
                    <span className="block text-xs text-slate-500 mb-1">Vehicle age</span>
                    <select name="ageOfVehicle" value={formData.ageOfVehicle} onChange={handleChange} className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 bg-white">
                      <option>new</option>
                      <option>2 years</option>
                      <option>3 years</option>
                      <option>4 years</option>
                      <option>5 years</option>
                      <option>6 years</option>
                      <option>7 years</option>
                      <option>more than 7</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Accident Details */}
              <section>
                <h2 className="text-lg font-semibold text-slate-800 mb-4 pb-2 border-b">Accident Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Accident Area</label>
                    <span className="block text-xs text-slate-500 mb-1">Accident location</span>
                    <select name="accidentArea" value={formData.accidentArea} onChange={handleChange} className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 bg-white">
                      <option>Urban</option>
                      <option>Rural</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Fault</label>
                    <span className="block text-xs text-slate-500 mb-1">Accident responsibility</span>
                    <select name="fault" value={formData.fault} onChange={handleChange} className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 bg-white">
                      <option>Policy Holder</option>
                      <option>Third Party</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Claim Details */}
              <section>
                <h2 className="text-lg font-semibold text-slate-800 mb-4 pb-2 border-b">Claim Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Police Report Filed</label>
                    <span className="block text-xs text-slate-500 mb-1">Police report</span>
                    <select name="policeReportFiled" value={formData.policeReportFiled} onChange={handleChange} className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 bg-white">
                      <option>No</option>
                      <option>Yes</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Witness Present</label>
                    <span className="block text-xs text-slate-500 mb-1">Witness availability</span>
                    <select name="witnessPresent" value={formData.witnessPresent} onChange={handleChange} className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 bg-white">
                      <option>No</option>
                      <option>Yes</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Past Number of Claims</label>
                    <span className="block text-xs text-slate-500 mb-1">Previous claims</span>
                    <select name="pastNumberOfClaims" value={formData.pastNumberOfClaims} onChange={handleChange} className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 bg-white">
                      <option>none</option>
                      <option>1</option>
                      <option>2 to 4</option>
                      <option>more than 4</option>
                    </select>
                  </div>
                </div>
              </section>
              
              {/* Policy & Rating Details */}
              <section>
                <h2 className="text-lg font-semibold text-slate-800 mb-4 pb-2 border-b">Policy & Rating Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Policy Type</label>
                    <span className="block text-xs text-slate-500 mb-1">Policy category</span>
                    <select name="policyType" value={formData.policyType} onChange={handleChange} className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 bg-white">
                      <option>Sedan - Collision</option>
                      <option>Sedan - Liability</option>
                      <option>Sedan - All Perils</option>
                      <option>Sport - Collision</option>
                      <option>Sport - Liability</option>
                      <option>Sport - All Perils</option>
                      <option>Utility - Collision</option>
                      <option>Utility - Liability</option>
                      <option>Utility - All Perils</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Base Policy</label>
                    <span className="block text-xs text-slate-500 mb-1">Basic coverage</span>
                    <select name="basePolicy" value={formData.basePolicy} onChange={handleChange} className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 bg-white">
                      <option>Collision</option>
                      <option>Liability</option>
                      <option>All Perils</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Days Policy Accident</label>
                    <span className="block text-xs text-slate-500 mb-1">Policy accident timing</span>
                    <select name="daysPolicyAccident" value={formData.daysPolicyAccident} onChange={handleChange} className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 bg-white">
                      <option>none</option>
                      <option>1 to 7</option>
                      <option>8 to 15</option>
                      <option>15 to 30</option>
                      <option>more than 30</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Days Policy Claim</label>
                    <span className="block text-xs text-slate-500 mb-1">Policy claim timing</span>
                    <select name="daysPolicyClaim" value={formData.daysPolicyClaim} onChange={handleChange} className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 bg-white">
                      <option>none</option>
                      <option>8 to 15</option>
                      <option>15 to 30</option>
                      <option>more than 30</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Driver Rating</label>
                    <span className="block text-xs text-slate-500 mb-1">Driver score</span>
                    <select name="driverRating" value={formData.driverRating} onChange={handleChange} className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 bg-white">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Agent Type</label>
                    <span className="block text-xs text-slate-500 mb-1">Agent category</span>
                    <select name="agentType" value={formData.agentType} onChange={handleChange} className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 bg-white">
                      <option>External</option>
                      <option>Internal</option>
                    </select>
                  </div>
                </div>
              </section>
            </div>
            
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-200">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 transition-colors"
              >
                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Predict Fraud"}
              </button>
            </div>
          </form>
        </div>

        <div>
          {result ? (
            <div className={`rounded-xl shadow-sm border p-6 ${result.prediction === 'Potential Fraud' ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
              <div className="flex items-center space-x-2 mb-4">
                {result.prediction === 'Potential Fraud' ? (
                  <AlertCircle className="h-6 w-6 text-red-600" />
                ) : (
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                )}
                <h2 className="text-xl font-bold text-slate-900">Prediction Result</h2>
              </div>
              
              <div className="space-y-4">

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-xs font-medium text-blue-600 uppercase tracking-wider mb-1">Claim ID</p>
                  <p className="font-mono font-bold text-blue-800 text-lg">{result.claimId}</p>
                </div>

                
                <div>
                  <p className="text-sm text-slate-500">Fraud Probability</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {(result.probability * 100).toFixed(2)}%
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-slate-500">Risk Level</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1
                    ${result.riskLevel === 'High' ? 'bg-red-100 text-red-800' : 
                      result.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-green-100 text-green-800'}`}>
                    {result.riskLevel}
                  </span>
                </div>
                
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-sm text-slate-500">Final Assessment</p>
                  <p className={`font-bold text-lg mt-1 ${result.prediction === 'Potential Fraud' ? 'text-red-700' : 'text-green-700'}`}>
                    {result.prediction}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
              <div className="text-slate-400 mb-4">
                <AlertCircle className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-slate-900">No Prediction Yet</h3>
              <p className="text-slate-500 mt-2">Fill out the form and submit to see the ML model's risk assessment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
