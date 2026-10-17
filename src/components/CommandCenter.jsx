// CityShield AI — Executive Security Operations Command Center
// High-level cybersecurity dashboard for smart city critical infrastructure

import React from 'react';
import { 
  ShieldAlert, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  Server, 
  Droplets, 
  Navigation, 
  Zap, 
  ArrowUpRight, 
  Sparkles,
  Play,
  RotateCcw,
  Sliders,
  ChevronRight
} from 'lucide-react';

export default function CommandCenter({ 
  assets, 
  incidents, 
  cityHealth, 
  onSelectAsset, 
  onSelectIncident,
  onOpenSimulator,
  onOpenCopilot,
  onTriggerScenario,
  onResetDemo,
  setActiveTab
}) {
  const unresolvedIncidents = incidents.filter(i => i.status !== 'RESOLVED');
  const activeCritical = unresolvedIncidents.filter(i => i.severity === 'CRITICAL');

  // Sector breakdown stats
  const sectors = [
    {
      id: 'traffic',
      name: 'Traffic Signals & Mobility',
      icon: Navigation,
      color: 'text-sky-400',
      bgColor: 'bg-sky-500/10',
      borderColor: 'border-sky-500/30',
      assets: assets.filter(a => a.sector === 'traffic'),
      activeIncident: unresolvedIncidents.find(i => i.sector === 'traffic')
    },
    {
      id: 'water',
      name: 'Water SCADA & Treatment',
      icon: Droplets,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30',
      assets: assets.filter(a => a.sector === 'water'),
      activeIncident: unresolvedIncidents.find(i => i.sector === 'water')
    },
    {
      id: 'lighting',
      name: 'Public Lighting & IoT Grid',
      icon: Zap,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      assets: assets.filter(a => a.sector === 'lighting'),
      activeIncident: unresolvedIncidents.find(i => i.sector === 'lighting')
    },
    {
      id: 'servers',
      name: 'Municipal Core & 911 CAD',
      icon: Server,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      assets: assets.filter(a => a.sector === 'servers'),
      activeIncident: unresolvedIncidents.find(i => i.sector === 'servers')
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner: Active Threat Alert (Appears when an incident is active) */}
      {unresolvedIncidents.length > 0 ? (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950/70 via-slate-900 to-slate-900 border border-red-500/50 shadow-red-glow">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-start space-x-3.5">
              <div className="p-2.5 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 animate-pulse">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/40 uppercase">
                    ACTIVE {unresolvedIncidents[0].severity} INCIDENT
                  </span>
                  <span className="text-xs font-mono text-slate-400">{unresolvedIncidents[0].id}</span>
                </div>
                <h3 className="text-base font-bold text-white mt-1">
                  {unresolvedIncidents[0].scenario || unresolvedIncidents[0].description}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5 line-clamp-1">
                  Target: <span className="font-semibold text-cyan-300">{unresolvedIncidents[0].asset}</span> — {unresolvedIncidents[0].publicServiceImpact}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2.5 w-full lg:w-auto justify-end">
              <button
                onClick={() => onOpenSimulator(unresolvedIncidents[0])}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-xs shadow-cyan-glow flex items-center space-x-1.5 transition-all"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Simulate Impact & Actions</span>
              </button>
              <button
                onClick={() => onOpenCopilot(unresolvedIncidents[0])}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-300 font-medium text-xs flex items-center space-x-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Copilot Analysis</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">All Municipal Infrastructure Operating Within Nominal Limits</h3>
                <p className="text-xs text-slate-400">Zero active cyber threats detected across 12 monitored critical endpoints.</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-400 font-mono">Ready to test response?</span>
              <button
                onClick={() => onTriggerScenario('traffic')}
                className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-semibold flex items-center space-x-1"
              >
                <Play className="w-3 h-3" />
                <span>Launch Scenario 1</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* KPI Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: City Composite Risk Score */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Simulated City Risk</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">0 - 100</span>
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold font-mono" style={{ color: cityHealth.color }}>
              {cityHealth.score}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: cityHealth.color }}>
              {cityHealth.level}
            </span>
          </div>
          {/* Progress Bar */}
          <div className="mt-3 w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full transition-all duration-700" 
              style={{ width: `${cityHealth.score}%`, backgroundColor: cityHealth.color }}
            ></div>
          </div>
          <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between font-mono">
            <span>Status: {cityHealth.status}</span>
            <button 
              onClick={() => setActiveTab('analytics')}
              className="text-cyan-400 hover:text-cyan-300 text-[10px] underline"
            >
              Formula
            </button>
          </div>
        </div>

        {/* Card 2: Monitored Assets */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Infrastructure Assets</span>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white font-mono">{assets.length}</span>
            <span className="text-xs text-slate-400">Endpoints Monitored</span>
          </div>
          <div className="mt-3 flex items-center space-x-2 text-xs">
            <span className="inline-flex items-center text-emerald-400 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1"></span>
              {cityHealth.healthyCount} Nominal
            </span>
            <span className="text-slate-600">•</span>
            <span className="inline-flex items-center text-amber-400 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-1"></span>
              {cityHealth.warningCount} Warning
            </span>
            <span className="text-slate-600">•</span>
            <span className="inline-flex items-center text-red-400 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-1"></span>
              {cityHealth.criticalCount} Critical
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            Across 4 Essential Public Sectors
          </div>
        </div>

        {/* Card 3: Active Incidents */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Active Incidents</span>
            <AlertTriangle className={`w-4 h-4 ${unresolvedIncidents.length > 0 ? 'text-red-400' : 'text-slate-500'}`} />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white font-mono">{unresolvedIncidents.length}</span>
            <span className="text-xs text-slate-400">Under Investigation</span>
          </div>
          <div className="mt-3 flex items-center space-x-2">
            <span className="text-[11px] font-mono text-red-400">
              {activeCritical.length} Critical Priority
            </span>
          </div>
          <div className="mt-2 text-[11px] text-cyan-400 flex items-center justify-between">
            <button 
              onClick={() => setActiveTab('incidents')}
              className="hover:underline flex items-center space-x-0.5"
            >
              <span>View Incident Queue</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Card 4: Service Disruption Impact */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Public Impact Risk</span>
            <ShieldAlert className="w-4 h-4 text-orange-400" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className={`text-2xl font-extrabold font-mono ${unresolvedIncidents.length > 0 ? 'text-orange-400' : 'text-emerald-400'}`}>
              {unresolvedIncidents.length > 0 ? 'ELEVATED' : 'MINIMAL'}
            </span>
          </div>
          <p className="mt-3 text-[11px] text-slate-300 line-clamp-1">
            {unresolvedIncidents.length > 0 
              ? (unresolvedIncidents[0].publicServiceImpact || 'Citizen life-safety exposure')
              : 'Ambulance & drinking water routes nominal'
            }
          </p>
          <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Differentiator:</span>
            <span className="text-cyan-300 font-mono text-[10px]">Impact-Aware Triage</span>
          </div>
        </div>
      </div>

      {/* Sector Health Cards (4 Sectors) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>Critical Infrastructure Sector Status</span>
          </h2>
          <span className="text-xs text-slate-400">Click any sector to inspect asset telemetry</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sectors.map((sector) => {
            const Icon = sector.icon;
            const hasIncident = !!sector.activeIncident;
            const statusColor = hasIncident ? 'border-red-500/60 bg-red-950/20' : 'border-slate-800 bg-slate-900/80';

            return (
              <div
                key={sector.id}
                className={`p-4 rounded-xl border ${statusColor} hover:border-slate-600 transition-all flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2.5">
                      <div className={`p-2 rounded-lg ${sector.bgColor} ${sector.color} border ${sector.borderColor}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-white">{sector.name}</span>
                    </div>
                    {hasIncident ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse">
                        ALERT
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        NOMINAL
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-300 mb-3">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Monitored Assets:</span>
                      <span className="font-mono text-slate-200">{sector.assets.length} nodes</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Protocols:</span>
                      <span className="font-mono text-cyan-400">
                        {sector.id === 'traffic' && 'NTCIP 1202 / SNMP'}
                        {sector.id === 'water' && 'Modbus TCP / DNP3'}
                        {sector.id === 'lighting' && 'CoAP / Zigbee Mesh'}
                        {sector.id === 'servers' && 'Kerberos / CAD / SSH'}
                      </span>
                    </div>
                    {hasIncident && (
                      <div className="p-2 rounded bg-red-500/10 border border-red-500/30 text-[10px] text-red-300 mt-2 font-mono">
                        Active Threat: {sector.activeIncident.scenario} (Risk: {sector.activeIncident.riskScore})
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() => {
                      if (sector.assets[0]) onSelectAsset(sector.assets[0]);
                    }}
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center space-x-1"
                  >
                    <span>Inspect Assets</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  {hasIncident && (
                    <button
                      onClick={() => onOpenSimulator(sector.activeIncident)}
                      className="text-xs text-red-400 hover:text-red-300 font-medium flex items-center space-x-1"
                    >
                      <span>Simulate</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Guided Hackathon Demonstration Bar */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 via-cyan-950/20 to-slate-900 border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>Hackathon Evaluation Walkthrough — 3 Reproducible Scenarios</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Click any scenario button to inject a deterministic cyber threat and evaluate service-impact response.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onTriggerScenario('traffic')}
            className="px-3 py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 text-sky-300 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
          >
            <Navigation className="w-3.5 h-3.5 text-sky-400" />
            <span>1. Traffic Signal Compromise</span>
          </button>
          <button
            onClick={() => onTriggerScenario('water')}
            className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
          >
            <Droplets className="w-3.5 h-3.5 text-cyan-400" />
            <span>2. Water SCADA Spoofing</span>
          </button>
          <button
            onClick={() => onTriggerScenario('servers')}
            className="px-3 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
          >
            <Server className="w-3.5 h-3.5 text-purple-400" />
            <span>3. Municipal Server Intrusion</span>
          </button>
          <button
            onClick={onResetDemo}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
}
