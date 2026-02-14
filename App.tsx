
import React, { useState, useEffect } from 'react';
import { Complaint, ComplaintStatus, User } from './types';
import Navbar from './components/Navbar';
import CitizenDashboard from './components/CitizenDashboard';
import PublicDashboard from './components/PublicDashboard';
import ComplaintForm from './components/ComplaintForm';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'landing' | 'citizen' | 'public' | 'submit' | 'admin'>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('janvaani_grievances');
    if (saved) setComplaints(JSON.parse(saved));
    const savedUser = localStorage.getItem('janvaani_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    localStorage.setItem('janvaani_grievances', JSON.stringify(complaints));
  }, [complaints]);

  const handleLogin = (u: User) => {
    setUser(u);
    localStorage.setItem('janvaani_user', JSON.stringify(u));
    setActiveTab('citizen');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('janvaani_user');
    setActiveTab('landing');
  };

  const handleNewComplaint = (complaint: Complaint) => {
    setComplaints(prev => [complaint, ...prev]);
    setActiveTab('citizen');
  };

  const updateComplaint = (id: string, updates: Partial<Complaint>) => {
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  if (activeTab !== 'landing' && activeTab !== 'public' && !user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        user={user} 
        onLogout={handleLogout} 
      />
      
      <main className="flex-1">
        {activeTab === 'landing' && (
          <LandingPage 
            onStart={() => user ? setActiveTab('submit') : setActiveTab('citizen')} 
            onViewStats={() => setActiveTab('public')} 
            complaintCount={complaints.length}
          />
        )}
        
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {activeTab === 'citizen' && (
            <CitizenDashboard 
              complaints={complaints.filter(c => c.aadhaar === user?.aadhaar)} 
              onSubmitNew={() => setActiveTab('submit')}
              onFeedback={(id, f) => updateComplaint(id, { feedback: f })}
            />
          )}
          
          {activeTab === 'submit' && user && (
            <ComplaintForm user={user} onComplete={handleNewComplaint} />
          )}
          
          {activeTab === 'public' && (
            <PublicDashboard complaints={complaints} />
          )}

          {activeTab === 'admin' && (
            <AdminDashboard 
              complaints={complaints} 
              onUpdate={updateComplaint} 
            />
          )}
        </div>
      </main>

      <footer className="bg-white border-t py-8 text-center text-slate-400 text-xs">
        <div className="flex justify-center gap-6 mb-4">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" className="h-12 opacity-50 grayscale hover:grayscale-0 transition-all" alt="Emblem" />
        </div>
        <p>JANVAANI - Unified Citizen Grievance Portal</p>
        <p className="mt-1 italic">Digital India Initiative for Transparent Governance</p>
      </footer>
    </div>
  );
};

export default App;
