import { useState, useEffect } from 'react';

export default function PredictionHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('predictionHistory');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Prediction History</h1>
        <span className="text-sm text-slate-500 bg-slate-200 px-3 py-1 rounded-full">Local Storage (Dev Mode)</span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Claim ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Probability</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Risk Level</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Prediction</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {history.length > 0 ? history.map((item, index) => (
                <tr key={index} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-semibold text-blue-700">
                    {item.claimId || '—'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {new Date(item.date).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {(item.probability * 100).toFixed(2)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${item.riskLevel === 'High' ? 'bg-red-100 text-red-800' :
                        item.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'}`}>
                      {item.riskLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <span className={item.prediction === 'Potential Fraud' ? 'text-red-600' : 'text-green-600'}>
                      {item.prediction}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                    No predictions found in history. Go to the Predict Claim page to make a prediction.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
