// CityShield AI — Command Navigation Bar
// Displays SOC status, active threat posture, guided demo actions, and navigation tabs.

import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  AlertTriangle, 
  Activity, 
  MapPin, 
  Terminal, 
  BarChart3, 
  History, 
  Play, 
  RotateCcw, 
  Bot, 
  Radio,
  HelpCircle
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  cityHealth, 
  onTriggerScenario, 
  onResetDemo, 
  onOpenCopilot,
  onOpenGuide
}) {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { id: 'dashboard', label: 'Command Center', icon: Activity },
    { id: 'map', label: 'Smart City Map', icon: MapPin },
    { id: 'threats', label: 'Threat Monitor', icon: AlertTriangle },
    { id: 'incidents', label: 'Incident Management', icon: Shield },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'timeline', label: 'Audit Timeline', icon: History },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0B1120]/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-xl">
      {/* Top Banner: Simulated Warning & SOC Telemetry */}
      <div className="bg-slate-900/80 px-4 py-1.5 border-b border-slate-800/80 text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full font-mono text-[10px] font-semibold bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            Simulated Testbed
          </span>
          <span className="text-slate-400 hidden sm:inline">
            Cyber Samvad Hackathon 2026 | Problem Statement 4: Critical Infrastructure Protection
          </span>
        </div>

        <div className="flex items-center space-x-4 font-mono text-slate-400 text-[11px]">
          <div className="flex items-center space-x-1.5">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>SOC Telemetry: <span className="text-emerald-400 font-medium">LIVE</span></span>
          </div>
          <span className="text-slate-600">|</span>
          <div>TIME: <span className="text-slate-200">{time}</span></div>
          <span className="text-slate-600">|</span>
          <button 
            onClick={onOpenGuide}
            className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center space-x-1 underline decoration-cyan-500/40"
          >
            <HelpCircle className="w-3 h-3" />
            <span>Judge Guide</span>
          </button>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 flex items-center justify-center shadow-cyan-glow">
            <Shield className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tight text-white font-mono">
                City<span className="text-cyan-400">Shield</span> <span className="text-xs px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-sans font-semibold">AI</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-400 tracking-wider uppercase font-medium">
              Intelligent Cyber Defense for Smart Cities
            </p>
          </div>
        </div>

        {/* Threat Posture Indicator */}
        <div className="hidden lg:flex items-center space-x-3 bg-slate-900/90 px-3.5 py-1.5 rounded-lg border border-slate-800">
          <div className="text-right">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">City Threat Level</div>
            <div className="text-xs font-mono font-bold" style={{ color: cityHealth.color }}>
              {cityHealth.status} ({cityHealth.score}/100)
            </div>
          </div>
          <div 
            className="w-3.5 h-3.5 rounded-full animate-ping"
            style={{ backgroundColor: cityHealth.color }}
          ></div>
        </div>

        {/* Demo Scenario Trigger Controls */}
        <div className="flex items-center space-x-2">
          {/* Quick Scenario Dropdown / Selector */}
          <div className="relative group">
            <button className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-red-500/20 to-orange-500/20 hover:from-red-500/30 hover:to-orange-500/30 border border-red-500/40 text-red-300 text-xs font-medium flex items-center space-x-1.5 transition-all shadow-red-glow">
              <Play className="w-3.5 h-3.5 fill-red-400 text-red-400" />
              <span>Simulate Attack</span>
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-1 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 hidden group-hover:block z-50">
              <div className="text-[10px] uppercase font-bold text-slate-400 px-2 py-1 tracking-wider border-b border-slate-800">
                Deterministic Threat Scenarios
              </div>
              <button
                onClick={() => onTriggerScenario('traffic')}
                className="w-full text-left px-2 py-2 rounded-lg hover:bg-slate-800/80 text-xs text-slate-200 transition-colors flex items-start space-x-2 mt-1"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1 flex-shrink-0"></span>
                <div>
                  <div className="font-semibold text-cyan-300">1. Traffic Signal Override</div>
                  <div className="text-[10px] text-slate-400">NTCIP SNMP manipulation & arterial gridlock</div>
                </div>
              </button>
              <button
                onClick={() => onTriggerScenario('water')}
                className="w-full text-left px-2 py-2 rounded-lg hover:bg-slate-800/80 text-xs text-slate-200 transition-colors flex items-start space-x-2"
              >
                <span className="w-2 h-2 rounded-full bg-blue-400 mt-1 flex-shrink-0"></span>
                <div>
                  <div className="font-semibold text-blue-300">2. Water SCADA Spoofing</div>
                  <div className="text-[10px] text-slate-400">Modbus PLC chlorine & pressure surge</div>
                </div>
              </button>
              <button
                onClick={() => onTriggerScenario('servers')}
                className="w-full text-left px-2 py-2 rounded-lg hover:bg-slate-800/80 text-xs text-slate-200 transition-colors flex items-start space-x-2"
              >
                <span className="w-2 h-2 rounded-full bg-purple-400 mt-1 flex-shrink-0"></span>
                <div>
                  <div className="font-semibold text-purple-300">3. Municipal Server Intrusion</div>
                  <div className="text-[10px] text-slate-400">Kerberos brute force & CAD 911 lateral probe</div>
                </div>
              </button>
            </div>
          </div>

          {/* Reset Demo Button */}
          <button
            onClick={onResetDemo}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700/80 border border-slate-700 text-slate-300 text-xs font-medium flex items-center space-x-1.5 transition-colors"
            title="Reset system to clean baseline normal operations"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* AI Copilot Side Drawer Button */}
          <button
            onClick={onOpenCopilot}
            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-medium flex items-center space-x-1.5 shadow-cyan-glow transition-all"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Copilot</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 overflow-x-auto no-scrollbar border-t border-slate-800/60 pt-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center space-x-2 px-3.5 py-2 text-xs font-medium rounded-t-lg transition-all border-b-2 whitespace-nowrap ${
                isActive
                  ? 'border-cyan-400 text-cyan-300 bg-cyan-950/20'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
              <span>{item.label}</span>
              {item.id === 'incidents' && cityHealth.activeIncidentsCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse">
                  {cityHealth.activeIncidentsCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
}
