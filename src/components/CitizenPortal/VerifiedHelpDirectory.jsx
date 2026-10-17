// CityShield AI — Verified Official Cybercrime Help Directory
// Official government & police cybercrime reporting helplines, portals, and local cyber stations.

import React, { useState } from 'react';
import { 
  Building2, 
  PhoneCall, 
  ExternalLink, 
  ShieldCheck, 
  MapPin, 
  AlertCircle, 
  Calendar, 
  HelpCircle,
  CheckCircle2,
  Navigation
} from 'lucide-react';
import { VERIFIED_CYBER_DIRECTORY } from '../../data/citizenData';

export default function VerifiedHelpDirectory({ initialSelectedState = 'Gujarat' }) {
  const [selectedStateName, setSelectedStateName] = useState(initialSelectedState);
  const [selectedCityIndex, setSelectedCityIndex] = useState(0);

  const currentState = VERIFIED_CYBER_DIRECTORY.find(s => s.state.includes(selectedStateName)) || VERIFIED_CYBER_DIRECTORY[0];
  const activeCity = currentState.cities[selectedCityIndex] || currentState.cities[0];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div 
        className="p-6 rounded-3xl border space-y-3"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span 
                className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border"
                style={{ 
                  backgroundColor: 'rgba(16, 185, 129, 0.1)', 
                  borderColor: 'rgba(16, 185, 129, 0.3)',
                  color: '#10B981'
                }}
              >
                Verified Official Directory
              </span>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Government & Police Sources Only
              </span>
            </div>
            <h2 className="text-xl font-bold tracking-tight">
              Official Cybercrime Helplines & Police Stations
            </h2>
          </div>

          {/* National 1930 Emergency Badge */}
          <div 
            className="p-3 rounded-2xl border flex items-center space-x-3"
            style={{ 
              backgroundColor: 'rgba(239, 68, 68, 0.08)', 
              borderColor: 'rgba(239, 68, 68, 0.3)' 
            }}
          >
            <div className="w-9 h-9 rounded-xl bg-red-500 text-white flex items-center justify-center font-bold">
              <PhoneCall className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-red-500 tracking-wider">
                All-India Cyber Helpline
              </div>
              <div className="text-lg font-mono font-extrabold text-red-500">
                1930 (Toll-Free 24/7)
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Always report cybercrimes directly through verified law enforcement channels. CityShield AI never acts as a proxy for police filing and does not charge any fees.
        </p>

        {/* State & City Dropdown Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div>
            <label className="text-xs font-bold block mb-1.5" style={{ color: 'var(--text-secondary)' }}>
              Select State / Region:
            </label>
            <select
              value={selectedStateName}
              onChange={(e) => {
                setSelectedStateName(e.target.value);
                setSelectedCityIndex(0);
              }}
              className="w-full p-2.5 rounded-xl border text-xs font-semibold focus:outline-none"
              style={{ 
                backgroundColor: 'var(--bg-primary)', 
                borderColor: 'var(--border-color)', 
                color: 'var(--text-primary)' 
              }}
            >
              {VERIFIED_CYBER_DIRECTORY.map((s) => (
                <option key={s.state} value={s.state}>
                  {s.state}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold block mb-1.5" style={{ color: 'var(--text-secondary)' }}>
              Select City / District:
            </label>
            <select
              value={selectedCityIndex}
              onChange={(e) => setSelectedCityIndex(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl border text-xs font-semibold focus:outline-none"
              style={{ 
                backgroundColor: 'var(--bg-primary)', 
                borderColor: 'var(--border-color)', 
                color: 'var(--text-primary)' 
              }}
            >
              {currentState.cities.map((c, idx) => (
                <option key={c.name} value={idx}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Verified City Details Card */}
      <div 
        className="p-6 rounded-3xl border space-y-5"
        style={{ 
          backgroundColor: 'var(--bg-card)', 
          borderColor: 'var(--border-color)',
          boxShadow: 'var(--card-shadow)'
        }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b pb-4" style={{ borderColor: 'var(--border-color)' }}>
          <div className="flex items-center space-x-3">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold"
              style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--accent-primary)' }}
            >
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold">{activeCity.name}</h3>
                <span className="text-emerald-500 text-xs font-bold flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Official Contact</span>
                </span>
              </div>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {activeCity.portalName}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <a
              href={`tel:${activeCity.helpline.split('/')[0].trim()}`}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center justify-center space-x-1.5 transition-all shadow-sm"
              style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' }}
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call Helpline</span>
            </a>
            <a
              href={activeCity.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center justify-center space-x-1.5 transition-all shadow-sm"
              style={{ background: 'var(--accent-gradient)' }}
            >
              <span>Open Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Detailed Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl border space-y-1" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
            <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              Official Police Station Address:
            </span>
            <p className="font-medium leading-relaxed" style={{ color: 'var(--text-primary)' }}>
              {activeCity.address}
            </p>
          </div>

          <div className="p-4 rounded-2xl border space-y-1" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
            <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              Helpline Numbers:
            </span>
            <p className="font-mono font-bold text-sm text-cyan-400">
              {activeCity.helpline}
            </p>
            <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
              National Helpline 1930 is staffed 24/7 for financial cyber fraud.
            </p>
          </div>
        </div>

        {/* Verification Metadata Box */}
        <div 
          className="p-3.5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
          style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}
        >
          <div className="flex items-center space-x-2" style={{ color: 'var(--text-muted)' }}>
            <Calendar className="w-3.5 h-3.5" />
            <span>Audit Verification: {activeCity.verificationDate}</span>
          </div>

          <a 
            href={activeCity.sourceUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:underline flex items-center space-x-1 font-semibold"
            style={{ color: 'var(--accent-primary)' }}
          >
            <span>Source Reference: {activeCity.sourceUrl}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Special Notes */}
        {activeCity.notes && (
          <div className="text-xs p-3 rounded-xl border" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
            <strong>Jurisdiction Note:</strong> {activeCity.notes}
          </div>
        )}
      </div>

      {/* Legal & Regulatory Guidance */}
      <div 
        className="p-4 rounded-2xl border flex items-start space-x-3 text-xs"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
      >
        <HelpCircle className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong style={{ color: 'var(--text-primary)' }}>What to bring when visiting the Cyber Police Station:</strong>
          <p>
            1) Bank account statement showing debited amount and UTR number, 2) Complete screenshots of SMS/WhatsApp conversation, 3) Copy of government photo ID (Aadhaar / Voter ID / Passport), 4) Printout of the CityShield incident summary report.
          </p>
        </div>
      </div>
    </div>
  );
}
