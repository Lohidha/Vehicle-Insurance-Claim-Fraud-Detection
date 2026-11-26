import { Link } from 'react-router-dom';
import { Shield, Zap, Database } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-full">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 px-4 mt-[-2rem] mb-12 rounded-b-3xl">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <Shield className="h-20 w-20 mx-auto text-blue-200 mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Vehicle Insurance Claim Fraud Detection
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 font-light">
            Machine Learning-Based Vehicle Insurance Claim Fraud Detection
          </p>
          <p className="max-w-2xl mx-auto text-lg text-blue-100">
            An intelligent system that analyzes vehicle insurance claim information and identifies potentially fraudulent claims using machine learning.
          </p>
          <div className="pt-8 flex justify-center gap-4">
            <Link 
              to="/login" 
              className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
            >
              Get Started
            </Link>
            <Link 
              to="/about" 
              className="bg-blue-700 text-white hover:bg-blue-800 border border-blue-500 px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-5xl mx-auto px-4 py-12 w-full text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4">1</div>
            <h3 className="text-xl font-semibold mb-2">Enter Claim Details</h3>
            <p className="text-slate-600 text-center">Provide the standard insurance claim forms and details.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4">2</div>
            <h3 className="text-xl font-semibold mb-2">AI Analyzes the Claim</h3>
            <p className="text-slate-600 text-center">The CatBoost model evaluates features to detect anomaly patterns.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4">3</div>
            <h3 className="text-xl font-semibold mb-2">Receive Fraud Risk Assessment</h3>
            <p className="text-slate-600 text-center">Get a clear probability score and risk level to aid your decision.</p>
          </div>
        </div>
      </section>

      {/* Why This System Section */}
      <section className="bg-slate-50 py-16 px-4 mt-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Why This System?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
              <Zap className="h-10 w-10 text-yellow-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">AI-Powered Detection</h3>
              <p className="text-slate-600">Uses a CatBoost machine learning model.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
              <Shield className="h-10 w-10 text-green-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Fast Assessment</h3>
              <p className="text-slate-600">Provides a fraud probability and risk level.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
              <Database className="h-10 w-10 text-purple-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Data-Driven Analysis</h3>
              <p className="text-slate-600">Uses historical vehicle insurance claim data.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 text-center text-slate-500 border-t border-slate-200 bg-white">
        <p className="font-medium text-slate-700">Vehicle Insurance Fraud Detection</p>
        <p className="text-sm">Machine Learning Project</p>
      </footer>
    </div>
  );
}
