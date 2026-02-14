
import React from 'react';
import { User } from '../types';

interface NavbarProps {
  activeTab: 'landing' | 'citizen' | 'public' | 'submit' | 'admin';
  setActiveTab: (tab: 'landing' | 'citizen' | 'public' | 'submit' | 'admin') => void;
  user: User | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, user, onLogout }) => {
  return (
    <nav className="bg-white border-b sticky top-0 z-50 px-4">
      <div className="container mx-auto flex justify-between items-center h-20">
        <button 
          onClick={() => setActiveTab('landing')}
          className="flex items-center gap-3 group"
        >
          <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white text-2xl font-black group-hover:bg-blue-600 transition-all">
            J
          </div>
          <div className="text-left">
            <h1 className="text-2xl font-black text-slate-900 tracking-tighter">JANVAANI</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em] leading-none">Voice of Citizen</p>
          </div>
        </button>
        
        <div className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-2xl">
          <button 
            onClick={() => setActiveTab('citizen')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'citizen' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
          >
            My Cases
          </button>
          <button 
            onClick={() => setActiveTab('submit')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'submit' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
          >
            New Grievance
          </button>
          <button 
            onClick={() => setActiveTab('public')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'public' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Transparency
          </button>
          <button 
            onClick={() => setActiveTab('admin')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'admin' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-400'}`}
          >
            Admin
          </button>
        </div>

        {user ? (
          <div className="flex items-center gap-4">
            <div className="hidden lg:block text-right">
              <p className="text-xs font-bold text-slate-900">{user.name}</p>
              <p className="text-[10px] text-slate-400 font-mono">ADHR: ****{user.aadhaar.slice(-4)}</p>
            </div>
            <button 
              onClick={onLogout}
              className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-all"
              title="Logout"
            >
              🚪
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setActiveTab('citizen')}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-600/20"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
