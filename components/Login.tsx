
import React, { useState } from 'react';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [aadhaar, setAadhaar] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (aadhaar.length === 12) {
      onLogin({ name, aadhaar });
    } else {
      alert("Please enter a valid 12-digit Aadhaar number");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl font-black mx-auto mb-4">J</div>
          <h2 className="text-2xl font-bold text-slate-900">Welcome to Janvaani</h2>
          <p className="text-slate-500 text-sm">Please verify your identity to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
            <input 
              required
              type="text"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Rahul Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Aadhaar Number</label>
            <input 
              required
              type="text"
              maxLength={12}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-mono tracking-[0.2em]"
              placeholder="0000 0000 0000"
              value={aadhaar}
              onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, ''))}
            />
          </div>
          <button 
            type="submit"
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all"
          >
            Secure Login
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-slate-400">
          This system uses secure Aadhaar-based authentication. Your data is protected by the Government IT Act.
        </p>
      </div>
    </div>
  );
};

export default Login;
