
import React, { useState, useEffect } from 'react';
import { Complaint, ComplaintStatus, User, Location } from '../types';
import { classifyComplaint } from '../services/geminiService';

interface ComplaintFormProps {
  user: User;
  onComplete: (complaint: Complaint) => void;
}

const ComplaintForm: React.FC<ComplaintFormProps> = ({ user, onComplete }) => {
  const [description, setDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [location, setLocation] = useState<Location | null>(null);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    // Auto-capture location on mount
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude, address: "Geo-tagged location" });
      });
    }
  }, []);

  const handleVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in your browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US, hi-IN'; // Multi-language support hint
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setDescription(prev => prev + ' ' + transcript);
    };
    recognition.start();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description) return;

    setIsAnalyzing(true);
    const aiResult = await classifyComplaint(description);

    const newComplaint: Complaint = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      description,
      summary: aiResult.summary,
      department: aiResult.department,
      priority: aiResult.priority,
      status: aiResult.isValid ? ComplaintStatus.PENDING : ComplaintStatus.REJECTED,
      createdAt: Date.now(),
      slaDeadline: Date.now() + (aiResult.slaHours * 60 * 60 * 1000),
      citizenName: user.name,
      aadhaar: user.aadhaar,
      isValid: aiResult.isValid,
      rejectionReason: aiResult.rejectionReason,
      location: location || undefined
    };

    setIsAnalyzing(false);
    onComplete(newComplaint);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-blue-600 p-8 text-white">
          <h2 className="text-2xl font-bold">New Grievance</h2>
          <p className="opacity-80 text-sm">Speak or type in your regional language. AI will handle the rest.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-slate-700">Issue Details</label>
              <button 
                type="button"
                onClick={handleVoiceInput}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {isListening ? '🛑 Stop Recording' : '🎤 Use Voice Search'}
              </button>
            </div>
            <textarea 
              required
              className="w-full px-4 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 min-h-[160px] resize-none"
              placeholder="Describe what's wrong (e.g. 'Street lights on MG road not working for 3 days' or 'पानी की पाइप लीक हो रही है')"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 border-dashed relative">
              <span className="text-xs text-slate-400 block mb-2">Upload Photo/Video</span>
              <div className="flex items-center gap-2 text-blue-600 font-bold text-sm cursor-pointer">
                📁 Click to Attach
              </div>
            </div>
            <div className={`p-4 rounded-xl border transition-all ${location ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'}`}>
              <span className="text-xs text-slate-400 block mb-2">Location Status</span>
              <div className="text-sm font-bold text-slate-700">
                {location ? '📍 Auto-Captured' : '⌛ Detecting...'}
              </div>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isAnalyzing}
            className="w-full py-4 bg-slate-900 hover:bg-black text-white rounded-xl font-bold shadow-xl transition-all disabled:opacity-50"
          >
            {isAnalyzing ? '🤖 AI Validation Layer Processing...' : 'Submit Grievance'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;
