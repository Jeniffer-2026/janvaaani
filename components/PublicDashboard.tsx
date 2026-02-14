
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { Complaint, ComplaintStatus, Department } from '../types';

interface PublicDashboardProps {
  complaints: Complaint[];
}

const PublicDashboard: React.FC<PublicDashboardProps> = ({ complaints }) => {
  // Aggregate data for charts
  const deptStats = Object.values(Department).map(dept => {
    const deptComplaints = complaints.filter(c => c.department === dept);
    const resolved = deptComplaints.filter(c => c.status === ComplaintStatus.RESOLVED).length;
    const total = deptComplaints.length;
    return {
      name: dept.split(' ')[0],
      total,
      resolved,
      performance: total > 0 ? Math.round((resolved / total) * 100) : 0
    };
  });

  const statusData = [
    { name: 'Pending', value: complaints.filter(c => c.status === ComplaintStatus.PENDING).length, color: '#eab308' },
    // Fix: Changed IN_PROGRESS to ASSIGNED as IN_PROGRESS is not defined in the enum
    { name: 'In Progress', value: complaints.filter(c => c.status === ComplaintStatus.ASSIGNED).length, color: '#3b82f6' },
    { name: 'Resolved', value: complaints.filter(c => c.status === ComplaintStatus.RESOLVED).length, color: '#22c55e' },
    { name: 'Escalated', value: complaints.filter(c => c.status === ComplaintStatus.ESCALATED).length, color: '#ef4444' },
  ].filter(d => d.value > 0);

  const totalResolved = complaints.filter(c => c.status === ComplaintStatus.RESOLVED).length;
  const resolutionRate = complaints.length > 0 ? Math.round((totalResolved / complaints.length) * 100) : 0;

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900">Public Transparency Dashboard</h2>
        <p className="text-slate-500">Real-time governance metrics and department accountability tracking.</p>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Total Received</p>
          <h4 className="text-3xl font-black text-slate-800">{complaints.length}</h4>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Total Resolved</p>
          <h4 className="text-3xl font-black text-green-600">{totalResolved}</h4>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Resolution Rate</p>
          <h4 className="text-3xl font-black text-blue-600">{resolutionRate}%</h4>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Avg SLA Response</p>
          <h4 className="text-3xl font-black text-slate-800">4.2<span className="text-sm font-normal text-slate-400 ml-1">hrs</span></h4>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Department Performance Chart */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Department Performance (Efficiency %)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptStats}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="performance" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Current Case Distribution</h3>
          {statusData.length > 0 ? (
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col gap-2 ml-4">
                {statusData.map(d => (
                  <div key={d.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }}></div>
                    <span className="text-xs text-slate-600 font-medium">{d.name}: {d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-slate-400 text-sm">
              No data available yet.
            </div>
          )}
        </div>
      </div>

      {/* Accountability Heatmap (Simulated with simple grid) */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-2xl">
        <h3 className="text-xl font-bold mb-2">Regional Heatmap</h3>
        <p className="text-slate-400 text-sm mb-8">Identification of problem zones based on complaint density.</p>
        
        <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
          {Array.from({ length: 50 }).map((_, i) => {
            const intensity = Math.random();
            const color = intensity > 0.8 ? 'bg-red-500' : intensity > 0.5 ? 'bg-orange-400' : intensity > 0.2 ? 'bg-blue-400' : 'bg-slate-800';
            return (
              <div 
                key={i} 
                className={`aspect-square rounded ${color} opacity-80 hover:opacity-100 transition-opacity cursor-pointer`}
                title={`Zone ${i+1}: ${Math.floor(intensity * 100)} cases`}
              ></div>
            );
          })}
        </div>
        <div className="mt-6 flex gap-4 text-[10px] text-slate-400 uppercase tracking-widest font-bold">
           <div className="flex items-center gap-1"><div className="w-3 h-3 bg-slate-800 rounded"></div> Safe</div>
           <div className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-400 rounded"></div> Moderate</div>
           <div className="flex items-center gap-1"><div className="w-3 h-3 bg-orange-400 rounded"></div> High</div>
           <div className="flex items-center gap-1"><div className="w-3 h-3 bg-red-500 rounded"></div> Critical</div>
        </div>
      </div>
    </div>
  );
};

export default PublicDashboard;
