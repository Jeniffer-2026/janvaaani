
import React from 'react';
import { Complaint, ComplaintStatus } from '../types';

interface CitizenDashboardProps {
  complaints: Complaint[];
  onSubmitNew: () => void;
  onFeedback: (id: string, feedback: string) => void;
}

const CitizenDashboard: React.FC<CitizenDashboardProps> = ({ complaints, onSubmitNew, onFeedback }) => {
  const getStatusStyle = (status: ComplaintStatus) => {
    switch (status) {
      case ComplaintStatus.RESOLVED: return 'bg-green-100 text-green-700 border-green-200';
      case ComplaintStatus.REJECTED: return 'bg-red-100 text-red-700 border-red-200';
      case ComplaintStatus.ESCALATED: return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-slate-900">My Janvaani</h2>
          <p className="text-slate-500">Track and manage your civic grievances.</p>
        </div>
        <button 
          onClick={onSubmitNew}
          className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-black transition-all"
        >
          Raise Complaint
        </button>
      </div>

      {complaints.length === 0 ? (
        <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-slate-200">
          <p className="text-slate-400">No grievances filed yet.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {complaints.map(c => (
            <div key={c.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 overflow-hidden relative">
              {c.status === ComplaintStatus.REJECTED && (
                <div className="absolute top-0 right-0 bg-red-600 text-white px-4 py-1 text-[10px] font-black uppercase tracking-widest">Invalid Input</div>
              )}
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="flex gap-2 items-center mb-3">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${getStatusStyle(c.status)}`}>
                      {c.status}
                    </span>
                    <span className="text-[10px] text-slate-300 font-mono">#{c.id}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{c.summary}</h3>
                  <p className="text-sm text-slate-500 mb-4">{c.description}</p>
                  
                  {c.status === ComplaintStatus.REJECTED && (
                    <div className="bg-red-50 p-4 rounded-xl text-red-600 text-xs font-medium">
                      ⚠️ AI Validation Rejected: {c.rejectionReason || "Input does not contain a valid civic grievance."}
                    </div>
                  )}

                  {c.status === ComplaintStatus.RESOLVED && !c.feedback && (
                    <div className="mt-4 p-4 bg-green-50 rounded-xl">
                      <p className="text-xs font-bold text-green-700 mb-2">Issue resolved! How was your experience?</p>
                      <div className="flex gap-2">
                        {['😊 Great', '😐 Okay', '😞 Poor'].map(f => (
                          <button 
                            key={f}
                            onClick={() => onFeedback(c.id, f)}
                            className="bg-white px-3 py-1.5 rounded-lg text-xs font-bold border border-green-200 hover:bg-green-100 transition-all"
                          >
                            {f}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {c.feedback && (
                    <div className="mt-4 text-xs text-slate-400">
                      Feedback submitted: <span className="font-bold text-green-600">{c.feedback}</span>
                    </div>
                  )}
                </div>
                
                <div className="bg-slate-50 p-4 rounded-2xl w-full md:w-64 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] uppercase font-bold text-slate-400">
                      <span>Department</span>
                      <span className="text-slate-700">{c.department}</span>
                    </div>
                    <div className="flex justify-between text-[10px] uppercase font-bold text-slate-400">
                      <span>Priority</span>
                      <span className={`text-slate-700 ${c.priority === 'Critical' ? 'text-red-600' : ''}`}>{c.priority}</span>
                    </div>
                    <div className="flex justify-between text-[10px] uppercase font-bold text-slate-400">
                      <span>SLA Exp</span>
                      <span className="text-slate-700">{new Date(c.slaDeadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CitizenDashboard;
