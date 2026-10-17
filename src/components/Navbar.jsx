// CityShield AI — Global Navigation Bar
// Supports Portal Switching, Theme Toggling, Simplified Navigation, and "Ask CityShield" Copilot.

import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  LifeBuoy, 
  Activity, 
  MapPin, 
  AlertTriangle, 
  BarChart3, 
  History, 
  Bot, 
  HelpCircle, 
  ArrowLeftRight, 
  Sun, 
  Moon, 
  Sparkles,
  Radio,
  Sliders,
  RotateCcw
} from 'lucide-react';
import { useTheme } from '../theme/themeContext';

export default function Navbar({ 
  currentPortal, 
  onSwitchPortal, 
  onReturnToGateway,
  activeTab, 
  setActiveTab, 
  cityHealth, 
  onOpenCopilot, 
  onOpenGuide 
}) {
  const { theme, setTheme, themes } = useTheme();
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simplified management tabs: Overview / City Assets / Incidents / Analytics
  const managementTabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'assets', label: 'City Assets & Map', icon: MapPin },
    { id: 'incidents', label: 'Incidents', icon: AlertTriangle },
    { id: 'analytics', label: 'Analytics & Audit', icon: BarChart3 },
  ];

  return (
    <header 
      className="sticky top-0 z-40 border-b backdrop-blur-md transition-colors shadow-lg"
      style={{ 
        backgroundColor: 'var(--bg-secondary)', 
        borderColor: 'var(--border-color)',
        color: 'var(--text-primary)'
      }}
    >
      {/* Top Banner: Simulated Notice, Time & Portal Switcher */}
      <div 
        className="px-4 sm:px-8 py-1.5 border-b text-xs flex flex-wrap items-center justify-between gap-2"
        style={{ borderColor: 'var(--border-color)' }}
      >
        <div className="flex items-center space-x-3">
          <span 
            className="inline-flex items-center px-2 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider"
            style={{ 
              backgroundColor: 'var(--badge-bg)', 
              color: 'var(--badge-text)', 
              border: '1px solid var(--badge-border)' 
            }}
          >
            <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            Simulated Cyber Testbed
          </span>

          <span className="hidden md:inline" style={{ color: 'var(--text-muted)' }}>
            Cyber Samvad 2026 | Problem Statement 4: Critical Infrastructure Protection
          </span>
        </div>

        <div className="flex items-center space-x-3 text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>
          <div>SOC TIME: <span className="font-bold text-slate-200">{time}</span></div>
          <span>|</span>
          <button 
            onClick={onOpenGuide}
            className="hover:underline flex items-center space-x-1"
            style={{ color: 'var(--accent-primary)' }}
          >
            <HelpCircle className="w-3 h-3" />
            <span>Judge Guide</span>
          </button>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand & Portal Label */}
        <div className="flex items-center space-x-3">
          <button 
            onClick={onReturnToGateway}
            className="flex items-center space-x-3 text-left group"
            title="Return to Portal Selection Gateway"
          >
            <div 
              className="w-10 h-10 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105"
              style={{ background: 'var(--accent-gradient)', boxShadow: 'var(--highlight-glow)' }}
            >
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-extrabold tracking-tight font-mono">
                  City<span style={{ color: 'var(--accent-primary)' }}>Shield</span>
                </span>
                <span 
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase font-sans tracking-wide"
                  style={{ 
                    backgroundColor: currentPortal === 'management' ? 'rgba(2, 132, 199, 0.15)' : 'rgba(244, 63, 94, 0.15)',
                    color: currentPortal === 'management' ? '#38BDF8' : '#FB7185',
                    border: `1px solid ${currentPortal === 'management' ? 'rgba(2, 132, 199, 0.3)' : 'rgba(244, 63, 94, 0.3)'}`
                  }}
                >
                  {currentPortal === 'management' ? 'City Management' : 'Citizen Cyber Help'}
                </span>
              </div>
              <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                {currentPortal === 'management' ? 'Municipal Infrastructure Security Operations' : 'Personal Scam & Account Incident Recovery'}
              </p>
            </div>
          </button>
        </div>

        {/* Portal Switcher & Controls */}
        <div className="flex items-center space-x-2.5">
          {/* Dual Portal Switch Button */}
          <button
            onClick={() => onSwitchPortal(currentPortal === 'management' ? 'citizen' : 'management')}
            className="px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center space-x-1.5 transition-all hover:opacity-90"
            style={{ 
              backgroundColor: 'var(--bg-surface)', 
              borderColor: 'var(--border-color)', 
              color: 'var(--text-primary)' 
            }}
            title={currentPortal === 'management' ? 'Switch to Citizen Cybercrime Support' : 'Switch to City Management SOC'}
          >
            <ArrowLeftRight className="w-3.5 h-3.5" style={{ color: 'var(--accent-primary)' }} />
            <span className="hidden sm:inline">Switch to:</span>
            <span className="font-bold" style={{ color: 'var(--accent-primary)' }}>
              {currentPortal === 'management' ? 'Citizen Help' : 'City Management'}
            </span>
          </button>

          {/* Theme Selector */}
          <div 
            className="flex items-center p-0.5 rounded-xl border text-xs"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
          >
            {Object.values(themes).map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`px-2 py-1 rounded-lg text-[10px] font-semibold transition-all ${
                  theme === t.id ? 'shadow-sm' : 'hover:opacity-75'
                }`}
                style={
                  theme === t.id
                    ? { backgroundColor: 'var(--bg-surface)', color: 'var(--accent-primary)' }
                    : { color: 'var(--text-muted)' }
                }
                title={t.subtitle}
              >
                {t.name.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Ask CityShield Copilot Button */}
          <button
            onClick={onOpenCopilot}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white flex items-center space-x-1.5 shadow-md transition-all hover:opacity-95"
            style={{ background: 'var(--accent-gradient)' }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask CityShield</span>
          </button>
        </div>
      </div>

      {/* Simplified Management Sub-Tabs (Only visible in Management portal) */}
      {currentPortal === 'management' && (
        <div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 overflow-x-auto no-scrollbar border-t pt-1"
          style={{ borderColor: 'var(--border-color)' }}
        >
          {managementTabs.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 text-xs font-bold rounded-t-xl transition-all border-b-2 whitespace-nowrap ${
                  isActive
                    ? 'border-cyan-400 text-cyan-400 bg-cyan-500/10'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.id === 'incidents' && cityHealth?.activeIncidentsCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse">
                    {cityHealth.activeIncidentsCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
