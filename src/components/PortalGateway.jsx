// CityShield AI — Portal Gateway
// Dual Entry Points: "Protect My City" (Municipal SOC) vs "I Need Cyber Help" (Citizen Support)

import React from 'react';
import { 
  Shield, 
  LifeBuoy, 
  Server, 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles,
  Zap,
  Lock,
  PhoneCall,
  UserCheck
} from 'lucide-react';
import { useTheme } from '../theme/themeContext';

export default function PortalGateway({ 
  onSelectPortal, 
  onTrySampleCitizen,
  onOpenGuide 
}) {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div 
      className="min-h-screen flex flex-col justify-between selection:bg-cyan-500/30 selection:text-cyan-200"
      style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
    >
      {/* Top Header / Brand Bar */}
      <header 
        className="border-b px-4 sm:px-8 py-3.5 flex items-center justify-between"
        style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
      >
        <div className="flex items-center space-x-3">
          <div 
            className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg transition-transform hover:scale-105"
            style={{ 
              background: 'var(--accent-gradient)', 
              boxShadow: 'var(--highlight-glow)' 
            }}
          >
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-extrabold tracking-tight font-mono">
                City<span style={{ color: 'var(--accent-primary)' }}>Shield</span>
              </span>
              <span 
                className="text-[10px] font-bold px-2 py-0.5 rounded-full font-mono uppercase tracking-wider"
                style={{ 
                  backgroundColor: 'var(--badge-bg)', 
                  color: 'var(--badge-text)', 
                  border: '1px solid var(--badge-border)' 
                }}
              >
                AI Platform
              </span>
            </div>
            <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
              Dual Cyber Defense & Citizen Safety System
            </p>
          </div>
        </div>

        {/* Theme Picker & Guide Buttons */}
        <div className="flex items-center space-x-3">
          {/* Theme Selector */}
          <div 
            className="flex items-center p-1 rounded-xl border text-xs"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
          >
            {Object.values(themes).map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  theme === t.id
                    ? 'font-bold shadow-sm'
                    : 'hover:opacity-80'
                }`}
                style={
                  theme === t.id
                    ? { backgroundColor: 'var(--bg-surface)', color: 'var(--accent-primary)' }
                    : { color: 'var(--text-muted)' }
                }
                title={t.subtitle}
              >
                {t.name}
              </button>
            ))}
          </div>

          <button
            onClick={onOpenGuide}
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all hover:opacity-90"
            style={{ 
              backgroundColor: 'var(--bg-card)', 
              borderColor: 'var(--border-color)',
              color: 'var(--text-secondary)'
            }}
          >
            <HelpCircle className="w-3.5 h-3.5" style={{ color: 'var(--accent-primary)' }} />
            <span>Judge Guide</span>
          </button>
        </div>
      </header>

      {/* Main Hero & Dual Entry Cards */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex-1 flex flex-col justify-center">
        {/* Hero Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold mb-2 border"
               style={{ 
                 backgroundColor: 'var(--badge-bg)', 
                 borderColor: 'var(--badge-border)', 
                 color: 'var(--badge-text)' 
               }}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cyber Samvad 2026 — Problem Statement 4</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            How can CityShield help you today?
          </h1>

          <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Choose your journey. Protect municipal infrastructure from cyber attacks, or get immediate personal guidance for online scams and digital fraud.
          </p>
        </div>

        {/* The Two Choice Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full">
          {/* Card 1: Protect My City (Management / SOC) */}
          <div 
            onClick={() => onSelectPortal('management')}
            className="group relative rounded-3xl p-7 sm:p-9 border cursor-pointer transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            style={{ 
              backgroundColor: 'var(--bg-card)', 
              borderColor: 'var(--border-color)',
              boxShadow: 'var(--card-shadow)'
            }}
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ 
                    background: 'linear-gradient(135deg, #0284C7 0%, #00F0FF 100%)',
                    boxShadow: '0 8px 20px -4px rgba(0, 240, 255, 0.35)'
                  }}
                >
                  <Server className="w-7 h-7 text-white" />
                </div>
                <span 
                  className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border"
                  style={{ 
                    backgroundColor: 'rgba(2, 132, 199, 0.1)', 
                    borderColor: 'rgba(2, 132, 199, 0.3)',
                    color: '#38BDF8'
                  }}
                >
                  City Officials & Security Teams
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-bold tracking-tight mb-2">
                  Protect My City
                </h2>
                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  For municipal operators, cybersecurity analysts, and city leadership. Monitor traffic signals, water treatment PLCs, public lighting, and 911 dispatch networks.
                </p>
              </div>

              {/* Key Features List */}
              <div className="space-y-2 pt-2 border-t" style={{ borderColor: 'var(--border-color)' }}>
                <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                  Core Operations:
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Real-Time Threat Detection</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Service Impact Simulator</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Interactive City Map</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>NIST/CISA AI Copilot</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectPortal('management');
                }}
                className="w-full py-3.5 px-5 rounded-2xl font-bold text-sm text-white flex items-center justify-center space-x-2 transition-all shadow-md group-hover:shadow-lg"
                style={{ 
                  background: 'linear-gradient(135deg, #0284C7 0%, #0ea5e9 100%)' 
                }}
              >
                <span>Open Management Dashboard</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Card 2: I Need Cyber Help (Citizen Support) */}
          <div 
            onClick={() => onSelectPortal('citizen')}
            className="group relative rounded-3xl p-7 sm:p-9 border cursor-pointer transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            style={{ 
              backgroundColor: 'var(--bg-card)', 
              borderColor: 'var(--border-color)',
              boxShadow: 'var(--card-shadow)'
            }}
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ 
                    background: 'linear-gradient(135deg, #7C3AED 0%, #F43F5E 100%)',
                    boxShadow: '0 8px 20px -4px rgba(244, 63, 94, 0.35)'
                  }}
                >
                  <LifeBuoy className="w-7 h-7 text-white" />
                </div>
                <span 
                  className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border"
                  style={{ 
                    backgroundColor: 'rgba(244, 63, 94, 0.1)', 
                    borderColor: 'rgba(244, 63, 94, 0.3)',
                    color: '#FB7185'
                  }}
                >
                  Individuals & Citizens
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-bold tracking-tight mb-2">
                  I Need Cyber Help
                </h2>
                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  For individuals facing online scams, unauthorized UPI transactions, social media account hacks, or blackmail. Get immediate safe guidance and verified official reporting details.
                </p>
              </div>

              {/* Key Features List */}
              <div className="space-y-2 pt-2 border-t" style={{ borderColor: 'var(--border-color)' }}>
                <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                  Assistance Provided:
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" />
                    <span>Emergency Financial Freeze (1930)</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" />
                    <span>Account Recovery Walkthrough</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" />
                    <span>Local Cyber Cell Contacts</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" />
                    <span>Download Official Report PDF</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectPortal('citizen');
                }}
                className="w-full py-3.5 px-5 rounded-2xl font-bold text-sm text-white flex items-center justify-center space-x-2 transition-all shadow-md group-hover:shadow-lg"
                style={{ 
                  background: 'linear-gradient(135deg, #7C3AED 0%, #E11D48 100%)' 
                }}
              >
                <span>Get Cyber Support Now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Hackathon Quick Sample Demo Bar */}
        <div 
          className="mt-12 p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto w-full"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
        >
          <div className="flex items-center space-x-3 text-xs">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-500 font-bold">⚡ Demo</span>
            <div>
              <span className="font-bold">Evaluating the Cybercrime Help Flow?</span>
              <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                Try preloaded realistic scam incidents to test the triage, evidence handling, and export.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onTrySampleCitizen('SAMPLE-01-ELEC-SMS')}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all hover:opacity-90"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            >
              Electricity Bill Scam
            </button>
            <button
              onClick={() => onTrySampleCitizen('SAMPLE-02-UPI-FRAUD')}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 transition-all"
            >
              UPI Payment Fraud
            </button>
            <button
              onClick={() => onTrySampleCitizen('SAMPLE-03-INSTA-EXTORTION')}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-purple-400 bg-purple-500/10 border border-purple-500/30 hover:bg-purple-500/20 transition-all"
            >
              Instagram Takeover
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer 
        className="border-t py-6 px-4 text-xs text-center space-y-1.5"
        style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}
      >
        <p>
          <strong style={{ color: 'var(--text-secondary)' }}>Privacy Guarantee:</strong> Citizen incidents are kept strictly private in your local browser session and are never mixed with municipal infrastructure datasets.
        </p>
        <p className="text-[11px]">
          Cyber Samvad Hackathon 2026 | Adani University & Demmisto Technologies | Problem Statement 4
        </p>
      </footer>
    </div>
  );
}
