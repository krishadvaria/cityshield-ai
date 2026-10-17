// CityShield AI — Citizen Report Export Modal
// Clean, print-friendly and downloadable report preview with sensitive information toggles.

import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  FileText, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Check, 
  AlertCircle 
} from 'lucide-react';

export default function ReportExportModal({ 
  isOpen, 
  onClose, 
  incidentData, 
  evidenceFiles, 
  pastedText,
  cityShieldRef 
}) {
  const [includePastedText, setIncludePastedText] = useState(true);
  const [includeFinancialAmount, setIncludeFinancialAmount] = useState(true);
  const [includeContactInfo, setIncludeContactInfo] = useState(true);
  const [copied, setCopied] = useState(false);

  if (!isOpen || !incidentData) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const reportPayload = {
      title: 'CityShield AI Incident Summary Report',
      referenceNumber: cityShieldRef,
      disclaimer: 'This document is an incident evidence log prepared by CityShield AI. It is NOT an official police FIR or legal summons.',
      generatedAt: new Date().toISOString(),
      category: incidentData.categoryTitle,
      dateOfIncident: incidentData.date,
      platformInvolved: incidentData.platform,
      financialAmountLoss: includeFinancialAmount ? incidentData.amountLost : '[REDACTED BY USER]',
      userContactInfo: includeContactInfo ? incidentData.contactInfo : '[REDACTED BY USER]',
      userDescription: incidentData.description,
      suspiciousMessageEvidence: includePastedText ? pastedText : '[REDACTED BY USER]',
      evidenceFilesCount: evidenceFiles.length,
      evidenceFilesList: evidenceFiles.map(f => ({ name: f.name, size: f.size, type: f.type })),
      recommendedNextSteps: incidentData.recommendedSteps || []
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(reportPayload, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `CityShield-Incident-Report-${cityShieldRef}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl rounded-3xl border shadow-2xl overflow-hidden my-8"
        style={{ 
          backgroundColor: 'var(--bg-card)', 
          borderColor: 'var(--border-color)',
          color: 'var(--text-primary)'
        }}
      >
        {/* Modal Header */}
        <div 
          className="px-6 py-4 border-b flex items-center justify-between"
          style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
        >
          <div className="flex items-center space-x-3">
            <div 
              className="p-2 rounded-xl"
              style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--accent-primary)' }}
            >
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold">Official Incident Summary Export</h2>
              <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                CityShield Reference: <span className="font-bold text-cyan-400">{cityShieldRef}</span>
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content & Privacy Toggles */}
        <div className="p-6 space-y-5 max-h-[72vh] overflow-y-auto text-xs">
          {/* Privacy Exclusions Box */}
          <div 
            className="p-4 rounded-2xl border space-y-2.5"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}
          >
            <span className="text-[11px] font-bold uppercase tracking-wider block" style={{ color: 'var(--text-secondary)' }}>
              Export Privacy Settings (Decide what to include):
            </span>

            <div className="flex flex-wrap gap-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includePastedText}
                  onChange={(e) => setIncludePastedText(e.target.checked)}
                  className="rounded text-cyan-500 focus:ring-0"
                />
                <span>Include Pasted Suspicious Messages</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeFinancialAmount}
                  onChange={(e) => setIncludeFinancialAmount(e.target.checked)}
                  className="rounded text-cyan-500 focus:ring-0"
                />
                <span>Include Stated Financial Loss Amount</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeContactInfo}
                  onChange={(e) => setIncludeContactInfo(e.target.checked)}
                  className="rounded text-cyan-500 focus:ring-0"
                />
                <span>Include Contact Identifier</span>
              </label>
            </div>
          </div>

          {/* Printable Report Preview Canvas */}
          <div 
            id="printable-report"
            className="p-6 rounded-2xl border space-y-4 bg-white text-slate-900 shadow-sm"
          >
            {/* Header */}
            <div className="border-b border-slate-200 pb-3 flex justify-between items-start">
              <div>
                <h1 className="text-lg font-black tracking-tight text-slate-900">
                  CITYSHIELD AI — CYBERCRIME INCIDENT REPORT
                </h1>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Citizen Evidence Dossier prepared for presentation to National Helpline 1930 / Cyber Police
                </p>
              </div>

              <div className="text-right font-mono">
                <div className="text-[10px] text-slate-400 uppercase">App-Generated Reference</div>
                <div className="text-xs font-bold text-slate-800">{cityShieldRef}</div>
                <div className="text-[10px] text-slate-500">{new Date().toLocaleDateString()}</div>
              </div>
            </div>

            {/* Legal Notice */}
            <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-[10px] text-amber-800 leading-tight">
              <strong>Notice:</strong> This report is a user-generated evidence inventory and self-recorded timeline. It is not an official Police First Information Report (FIR) and does not guarantee financial recovery.
            </div>

            {/* Incident Details Grid */}
            <div className="grid grid-cols-2 gap-3 text-[11px]">
              <div>
                <span className="text-slate-400 block font-semibold">Incident Category:</span>
                <span className="font-bold text-slate-800">{incidentData.categoryTitle}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Date of Incident:</span>
                <span className="font-bold text-slate-800">{incidentData.date || 'Today'}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Platform / Channel Involved:</span>
                <span className="font-bold text-slate-800">{incidentData.platform || 'Online'}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Financial Impact Stated:</span>
                <span className="font-bold text-red-600">
                  {includeFinancialAmount ? (incidentData.amountLost || 'None / Not Applicable') : '[REDACTED]'}
                </span>
              </div>
            </div>

            {/* Incident Summary Description */}
            <div className="border-t border-slate-200 pt-3">
              <span className="text-slate-400 block font-semibold mb-1">Citizen Statement / Incident Description:</span>
              <p className="text-slate-700 leading-relaxed text-[11px] bg-slate-50 p-3 rounded-lg border border-slate-200">
                {incidentData.description || 'No detailed description provided.'}
              </p>
            </div>

            {/* Suspicious Message Evidence */}
            {includePastedText && pastedText && (
              <div className="border-t border-slate-200 pt-3">
                <span className="text-slate-400 block font-semibold mb-1">Suspicious Text / Phishing Content:</span>
                <pre className="font-mono text-[10px] bg-slate-100 p-2.5 rounded-lg border border-slate-200 text-slate-800 whitespace-pre-wrap">
                  {pastedText}
                </pre>
              </div>
            )}

            {/* Evidence Files List */}
            <div className="border-t border-slate-200 pt-3">
              <span className="text-slate-400 block font-semibold mb-1">
                Evidence Files Attached ({evidenceFiles.length}):
              </span>
              {evidenceFiles.length === 0 ? (
                <span className="text-slate-500 italic text-[11px]">No files attached</span>
              ) : (
                <ul className="list-disc pl-5 text-[10px] text-slate-700 space-y-0.5">
                  {evidenceFiles.map(f => (
                    <li key={f.id}>
                      <span className="font-semibold">{f.name}</span> ({f.size}, {f.type})
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div 
          className="px-6 py-4 border-t flex flex-wrap items-center justify-between gap-3"
          style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
        >
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Take this printed report to your local Cyber Crime Police Station or bank.
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl text-xs font-bold border flex items-center space-x-1.5 transition-all hover:opacity-90"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>

            <button
              onClick={handleDownloadJSON}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center space-x-1.5 transition-all shadow-md"
              style={{ background: 'var(--accent-gradient)' }}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download JSON Dossier</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
