import { Shield, Zap, FileText } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="text-center py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">About the System</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Vehicle Insurance Fraud Detection is an intelligent web application designed to help identify potentially suspicious insurance claims.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-12">
        
        {/* What's the Purpose */}
        <section className="flex flex-col md:flex-row gap-6 items-start">
          <div className="bg-blue-50 p-4 rounded-full flex-shrink-0">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">What's the Purpose?</h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              Insurance fraud can result in significant financial losses, ultimately leading to higher premiums for honest customers. 
              This system is designed to help insurance providers identify claims that may require further review and investigation, 
              streamlining the entire claim assessment process.
            </p>
          </div>
        </section>

        <hr className="border-slate-100" />

        {/* How It Helps */}
        <section className="flex flex-col md:flex-row gap-6 items-start">
          <div className="bg-green-50 p-4 rounded-full flex-shrink-0">
            <Zap className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">How It Helps</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex items-center space-x-3 bg-slate-50 p-4 rounded-lg">
                <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                <span className="text-slate-700">Analyzes submitted claim information</span>
              </li>
              <li className="flex items-center space-x-3 bg-slate-50 p-4 rounded-lg">
                <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                <span className="text-slate-700">Estimates the likelihood of potential fraud</span>
              </li>
              <li className="flex items-center space-x-3 bg-slate-50 p-4 rounded-lg">
                <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                <span className="text-slate-700">Provides a clear risk level</span>
              </li>
              <li className="flex items-center space-x-3 bg-slate-50 p-4 rounded-lg">
                <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                <span className="text-slate-700">Helps support faster claim review</span>
              </li>
            </ul>
          </div>
        </section>

        <hr className="border-slate-100" />

        {/* How It Works */}
        <section className="flex flex-col md:flex-row gap-6 items-start">
          <div className="bg-purple-50 p-4 rounded-full flex-shrink-0">
            <FileText className="h-8 w-8 text-purple-600" />
          </div>
          <div className="w-full">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">How It Works</h2>
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-purple-600 font-bold text-xl mr-4 w-8 text-center">1</div>
                <p className="text-slate-700 text-lg">Enter claim details</p>
              </div>
              <div className="flex items-center p-4 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-purple-600 font-bold text-xl mr-4 w-8 text-center">2</div>
                <p className="text-slate-700 text-lg">Submit the claim</p>
              </div>
              <div className="flex items-center p-4 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-purple-600 font-bold text-xl mr-4 w-8 text-center">3</div>
                <p className="text-slate-700 text-lg">The system analyzes the information</p>
              </div>
              <div className="flex items-center p-4 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-purple-600 font-bold text-xl mr-4 w-8 text-center">4</div>
                <p className="text-slate-700 text-lg">Receive a fraud probability and risk assessment</p>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Disclaimers & Footer Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
          <h3 className="font-bold text-yellow-900 mb-2 text-lg">Important Note</h3>
          <p className="text-yellow-800 leading-relaxed">
            This system provides a risk assessment to support claim review. A prediction should not be 
            treated as a final decision to approve or reject an insurance claim.
          </p>
        </section>

        <section className="p-6 bg-slate-800 text-white rounded-xl shadow-sm">
          <h3 className="font-bold mb-2 text-lg">Academic Project</h3>
          <p className="text-slate-300 leading-relaxed">
            Developed as a machine learning based vehicle insurance claim fraud detection application.
          </p>
        </section>
      </div>

    </div>
  );
}
