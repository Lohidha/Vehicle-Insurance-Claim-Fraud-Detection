import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, CheckCircle, Users } from 'lucide-react';
import Papa from 'papaparse';
import ClaimsView from '../components/ClaimsView';

export default function Dashboard() {
  const [activeView, setActiveView] = useState(null); // 'total', 'legitimate', 'fraudulent', 'rate'
  const [dataset, setDataset] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load the CSV data once when component mounts
    Papa.parse('/dataset/fraud_oracle.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setDataset(results.data);
        setIsLoading(false);
      },
      error: (err) => {
        console.error("Error parsing CSV:", err);
        setIsLoading(false);
      }
    });
  }, []);

  if (activeView) {
    let filteredData = dataset;
    let title = "";
    let subtitle = "";

    if (activeView === 'legitimate') {
      filteredData = dataset.filter(row => row.FraudFound_P === '0');
      title = `Legitimate Claims — ${filteredData.length.toLocaleString()} Records`;
    } else if (activeView === 'fraudulent') {
      filteredData = dataset.filter(row => row.FraudFound_P === '1');
      title = `Fraudulent Claims — ${filteredData.length.toLocaleString()} Records`;
    } else if (activeView === 'rate') {
      filteredData = dataset.filter(row => row.FraudFound_P === '1');
      title = `Fraud Claims — 5.99% of Total Claims`;
      subtitle = `Fraud Rate: 5.99% | Fraudulent Claims: ${filteredData.length.toLocaleString()} | Total Claims: ${dataset.length.toLocaleString()}`;
    } else if (activeView === 'total') {
      title = `All Claims — ${dataset.length.toLocaleString()} Records`;
    }

    return (
      <ClaimsView 
        data={filteredData} 
        title={title} 
        subtitle={subtitle}
        onClose={() => setActiveView(null)} 
      />
    );
  }

  const MetricCard = ({ id, title, value, icon: Icon, iconBg, iconColor }) => (
    <div 
      onClick={() => setActiveView(id)}
      className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-1"
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className={`p-3 ${iconBg} rounded-lg`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        <h2 className="text-lg font-semibold text-slate-700">{title}</h2>
      </div>
      <p className="text-3xl font-bold text-slate-900">
        {isLoading ? "..." : value}
      </p>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="bg-white rounded-xl shadow-sm p-8 border border-slate-200">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Vehicle Insurance Claim Fraud Detection System
        </h1>
        <p className="text-lg text-slate-600 mb-8">
          An ML-based system for identifying potentially fraudulent vehicle insurance claims.
        </p>
        <Link 
          to="/predict" 
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors"
        >
          Check a Claim
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          id="total" 
          title="Total Claims" 
          value="15,420" 
          icon={Users} 
          iconBg="bg-blue-50" 
          iconColor="text-blue-600" 
        />
        <MetricCard 
          id="legitimate" 
          title="Legitimate" 
          value="14,497" 
          icon={CheckCircle} 
          iconBg="bg-green-50" 
          iconColor="text-green-600" 
        />
        <MetricCard 
          id="fraudulent" 
          title="Fraudulent" 
          value="923" 
          icon={ShieldAlert} 
          iconBg="bg-red-50" 
          iconColor="text-red-600" 
        />
        <MetricCard 
          id="rate" 
          title="Fraud Rate" 
          value="5.99%" 
          icon={ShieldAlert} 
          iconBg="bg-purple-50" 
          iconColor="text-purple-600" 
        />
      </div>

      <div className="bg-slate-900 rounded-xl shadow-sm p-8 text-white">
        <h2 className="text-xl font-semibold mb-2">Powered by CatBoost</h2>
        <p className="text-slate-300">
          Our principal production model utilizes CatBoost with an optimized decision threshold of 0.380 
          for maximizing the recall of fraudulent claims without compromising overall accuracy.
        </p>
      </div>
    </div>
  );
}
