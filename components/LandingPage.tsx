
import React from 'react';

interface LandingPageProps {
  onStart: () => void;
  onViewStats: () => void;
  complaintCount: number;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, onViewStats, complaintCount }) => {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-slate-900 text-white py-32 px-4">
        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          <div className="inline-block px-4 py-1.5 mb-8 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-black uppercase tracking-widest">
            A Digital India Initiative
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
            JANVAANI<br />
            <span className="text-blue-500">जनवाणी</span>
          </h1>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            India's most advanced AI-powered grievance portal. Use your voice, speak in any language, and hold the government accountable.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={onStart}
              className="w-full sm:w-auto px-12 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-lg transition-all hover:-translate-y-1 shadow-2xl shadow-blue-600/30"
            >
              Raise Your Voice
            </button>
            <button 
              onClick={onViewStats}
              className="w-full sm:w-auto px-12 py-5 bg-transparent text-white rounded-2xl font-bold text-lg border-2 border-slate-700 hover:bg-slate-800 transition-all"
            >
              Public Audit
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white px-4">
        <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-sm">🆔</div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Aadhaar Verified</h3>
            <p className="text-slate-500 text-sm">Secure, one-click authentication ensures only legitimate citizens file grievances.</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-sm">🎤</div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Multi-Lingual Voice</h3>
            <p className="text-slate-500 text-sm">Don't know English? No problem. Speak in your regional language and our AI will transcribe it.</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-sm">⚡</div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">AI Validation</h3>
            <p className="text-slate-500 text-sm">Instant routing and validation prevents spam and ensures fast response times.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
