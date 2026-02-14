
import React from 'react';
import { Complaint, ComplaintStatus } from '../types';

interface AdminDashboardProps {
  complaints: Complaint[];
  onUpdate: (id: string, updates: Partial<Complaint>) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ complaints, onUpdate }) => {
  const pending = complaints.filter(c => c.status === ComplaintStatus.PENDING && c.isValid);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-900">Admin Control Panel</h2>
          <p className="text-slate-500">Review, assign staff, and manage escalation paths.</p>
        </div>
        <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest">
          Authorized Admin View
        </div>
      </div>

      {pending.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-100">
          <p className="text-slate-400">All caught up! No pending grievances for review.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {pending.map(c => (
            <div key={c.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase">{c.department}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${c.priority === 'Critical' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'}`}>{c.priority}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{c.summary}</h3>
                <p className="text-sm text-slate-500 mb-4 italic">"{c.description}"</p>
                <div className="text-xs text-slate-400">
                  Citizen: <span className="font-bold text-slate-600">{c.citizenName}</span> | Aadhaar: <span className="font-mono text-slate-600">{c.aadhaar}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full md:w-48">
                <button 
                  onClick={() => onUpdate(c.id, { status: ComplaintStatus.ASSIGNED, staffAssigned: 'Regional Team A' })}
                  className="bg-blue-600 text-white py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all"
                >
                  Assign Staff
                </button>
                <button 
                  onClick={() => onUpdate(c.id, { status: ComplaintStatus.ESCALATED })}
                  className="bg-orange-100 text-orange-700 py-2 rounded-xl text-sm font-bold hover:bg-orange-200 transition-all"
                >
                  Escalate Case
                </button>
                <button 
                  onClick={() => onUpdate(c.id, { status: ComplaintStatus.RESOLVED })}
                  className="bg-green-100 text-green-700 py-2 rounded-xl text-sm font-bold hover:bg-green-200 transition-all"
                >
                  Quick Resolve
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
