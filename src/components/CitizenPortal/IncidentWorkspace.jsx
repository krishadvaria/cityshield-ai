// CityShield AI — Citizen Personal Incident Workspace
// Plain-language summary, evidence inventory, prioritized action checklist, and export actions.

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  PhoneCall, 
  FileText, 
  Download, 
  Building2, 
  ArrowLeft, 
  RotateCcw, 
  ShieldCheck, 
  AlertTriangle, 
  ExternalLink,
  Lock,
  Share2,
  Trash2,
  HelpCircle
} from 'lucide-react';
import ReportExportModal from './ReportExportModal';
import VerifiedHelpDirectory from './VerifiedHelpDirectory';

export default function IncidentWorkspace({ 
  incidentData, 
  evidenceFiles, 
  pastedText, 
  onStartNew, 
  cityShieldRef 
}) {
  const [completedSteps, setCompletedSteps] = useState({});
  const [userPoliceRef, setUserPoliceRef] = useState('');
  const [showExportModal, setShowExportModal] = useState(false);
  const [activeTab, setActiveTab] = useState('checklist'); // 'checklist' | 'directory'

  const toggleStep = (index) => {
    setCompletedSteps(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const steps = incidentData.recommendedSteps || [
    { title: 'Call 1930 Cyber Fraud Helpline', detail: 'Report immediately to initiate account freeze on recipient accounts.', priority: 'CRITICAL' },
    { title: 'Contact Your Bank Emergency Desk', detail: 'Temporarily lock netbanking and linked debit/credit cards.', priority: 'HIGH' },
    { title: 'Preserve SMS Alerts & WhatsApp Chats', detail: 'Do not delete chat messages, call logs, or UPI UTR reference numbers.', priority: 'MEDIUM' },
    { title: 'File Official Complaint on cybercrime.gov.in', detail: 'Submit your formal report on the official Ministry of Home Affairs portal.', priority: 'HIGH' }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Banner / Identifier */}
      <div 
        className="p-6 rounded-3xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', boxShadow: 'var(--card-shadow)' }}
      >
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span 
              className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border"
              style={{ 
                backgroundColor: 'var(--badge-bg)', 
                borderColor: 'var(--badge-border)', 
                color: 'var(--badge-text)' 
              }}
            >
              CityShield Reference: {cityShieldRef}
            </span>
            <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
              (Self-recorded workspace • Not an official police FIR number)
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            {incidentData.categoryTitle} — Recovery Workspace
          </h2>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            Follow these prioritized steps to minimize damage, protect your accounts, and submit verified reports.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <button
            onClick={() => setShowExportModal(true)}
            className="flex-1 md:flex-none px-4 py-2.5 rounded-xl font-bold text-xs text-white flex items-center justify-center space-x-1.5 shadow-md transition-all hover:opacity-95"
            style={{ background: 'var(--accent-gradient)' }}
          >
            <Download className="w-4 h-4" />
            <span>Export Report Dossier</span>
          </button>

          <button
            onClick={onStartNew}
            className="p-2.5 rounded-xl border text-xs font-semibold text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            title="Start a new report"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex space-x-2 border-b pb-1" style={{ borderColor: 'var(--border-color)' }}>
        <button
          onClick={() => setActiveTab('checklist')}
          className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-all border-b-2 ${
            activeTab === 'checklist'
              ? 'border-cyan-400 text-cyan-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Action Checklist & Evidence
        </button>
        <button
          onClick={() => setActiveTab('directory')}
          className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-all border-b-2 ${
            activeTab === 'directory'
              ? 'border-cyan-400 text-cyan-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Find Official Cybercrime Help (Police Stations)
        </button>
      </div>

      {/* Main Tab View */}
      {activeTab === 'checklist' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Prioritized Steps Checklist (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div 
              className="p-6 rounded-3xl border space-y-4"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Prioritized Recovery Action Checklist</span>
                </h3>
                <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                  {Object.values(completedSteps).filter(Boolean).length} of {steps.length} Completed
                </span>
              </div>

              <div className="space-y-3">
                {steps.map((st, idx) => {
                  const isDone = !!completedSteps[idx];
                  const isCritical = st.priority === 'CRITICAL';

                  return (
                    <div
                      key={idx}
                      onClick={() => toggleStep(idx)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start space-x-3.5 ${
                        isDone
                          ? 'opacity-60 bg-emerald-950/10 border-emerald-500/30'
                          : 'hover:border-slate-500'
                      }`}
                      style={!isDone ? { backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' } : {}}
                    >
                      <div className="mt-0.5 flex-shrink-0">
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-400" />
                        )}
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className={`text-xs font-bold ${isDone ? 'line-through text-slate-400' : 'text-white'}`}>
                            {st.title}
                          </h4>
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                            isCritical ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-amber-500/10 text-amber-400'
                          }`}>
                            {st.priority}
                          </span>
                        </div>

                        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                          {st.detail}
                        </p>

                        {st.link && (
                          <div className="pt-1">
                            <a
                              href={st.link}
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-400 hover:underline"
                            >
                              <PhoneCall className="w-3.5 h-3.5" />
                              <span>Dial 1930 Now</span>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Official Complaint Reference Note Box */}
            <div 
              className="p-5 rounded-2xl border space-y-2 text-xs"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
            >
              <label className="font-bold block" style={{ color: 'var(--text-secondary)' }}>
                Have you already filed a complaint on cybercrime.gov.in?
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={userPoliceRef}
                  onChange={(e) => setUserPoliceRef(e.target.value)}
                  placeholder="e.g., 2026-MHA-CYBER-88491 (Optional: User-provided reference)"
                  className="flex-1 p-2.5 rounded-xl border text-xs focus:outline-none"
                  style={{ 
                    backgroundColor: 'var(--bg-primary)', 
                    borderColor: 'var(--border-color)', 
                    color: 'var(--text-primary)' 
                  }}
                />
              </div>
              <span className="text-[11px] block" style={{ color: 'var(--text-muted)' }}>
                {userPoliceRef ? (
                  <span className="text-emerald-400 font-semibold">User-provided reference logged.</span>
                ) : (
                  'Entering your official complaint tracking ID will save it into your exported dossier.'
                )}
              </span>
            </div>
          </div>

          {/* Right Column: Incident Summary & Evidence Review (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Plain Language Summary Box */}
            <div 
              className="p-5 rounded-3xl border space-y-3 text-xs"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
            >
              <h3 className="font-bold uppercase tracking-wider text-xs" style={{ color: 'var(--text-muted)' }}>
                Incident Summary
              </h3>

              <div className="space-y-2">
                <div>
                  <span className="text-slate-400 text-[11px] block">Category:</span>
                  <span className="font-bold">{incidentData.categoryTitle}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Date:</span>
                  <span className="font-mono">{incidentData.date || 'Today'}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Platform / Bank:</span>
                  <span className="font-semibold">{incidentData.platform || 'Online'}</span>
                </div>
                {incidentData.amountLost && (
                  <div>
                    <span className="text-slate-400 text-[11px] block">Amount Reported:</span>
                    <span className="font-bold text-red-400 font-mono">{incidentData.amountLost}</span>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t" style={{ borderColor: 'var(--border-color)' }}>
                <span className="text-slate-400 text-[11px] block mb-1">Description:</span>
                <p className="text-[11px] leading-relaxed line-clamp-4" style={{ color: 'var(--text-secondary)' }}>
                  {incidentData.description || 'No additional description provided.'}
                </p>
              </div>
            </div>

            {/* Evidence Inventory Card */}
            <div 
              className="p-5 rounded-3xl border space-y-3 text-xs"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold uppercase tracking-wider text-xs" style={{ color: 'var(--text-muted)' }}>
                  Evidence Inventory
                </h3>
                <span className="text-[11px] font-mono text-cyan-400">{evidenceFiles.length} files</span>
              </div>

              {evidenceFiles.length === 0 && !pastedText ? (
                <p className="text-[11px] italic" style={{ color: 'var(--text-muted)' }}>
                  No evidence uploaded. You can still export your report.
                </p>
              ) : (
                <div className="space-y-2">
                  {evidenceFiles.map(f => (
                    <div 
                      key={f.id}
                      className="p-2 rounded-xl border flex items-center justify-between text-[11px]"
                      style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}
                    >
                      <span className="truncate max-w-[160px] font-semibold">{f.name}</span>
                      <span className="font-mono text-[10px]" style={{ color: 'var(--text-muted)' }}>{f.size}</span>
                    </div>
                  ))}

                  {pastedText && (
                    <div className="pt-2 border-t" style={{ borderColor: 'var(--border-color)' }}>
                      <span className="text-[11px] text-slate-400 block mb-1">Suspicious Text Recorded:</span>
                      <p className="font-mono text-[10px] p-2 rounded-lg bg-slate-950/60 border border-slate-800 line-clamp-3 text-slate-300">
                        {pastedText}
                      </p>
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={() => setShowExportModal(true)}
                className="w-full py-2.5 rounded-xl text-xs font-bold border transition-all hover:opacity-90 flex items-center justify-center space-x-1.5"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Dossier (PDF/JSON)</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <VerifiedHelpDirectory />
      )}

      {/* Export Report Modal */}
      <ReportExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        incidentData={incidentData}
        evidenceFiles={evidenceFiles}
        pastedText={pastedText}
        cityShieldRef={cityShieldRef}
      />
    </div>
  );
}
