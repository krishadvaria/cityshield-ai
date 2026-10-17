// CityShield AI — Threat Monitoring Feed
// Real-time simulated threat event stream, anomaly detection alerts, and triage cards.

import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  Terminal, 
  Sliders, 
  Sparkles, 
  Eye, 
  Filter, 
  ArrowRight,
  Clock,
  Radio,
  CheckCircle2
} from 'lucide-react';

export default function ThreatMonitor({ 
  incidents, 
  assets, 
  onSelectIncident, 
  onSelectAsset, 
  onOpenSimulator, 
  onOpenCopilot 
}) {
  const [severityFilter, setSeverityFilter] = useState('all');

  const filteredIncidents = incidents.filter(inc => {
    if (severityFilter === 'all') return true;
    return inc.severity === severityFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Simulated Threat Detection Stream
            </h2>
            <p className="text-xs text-slate-400">
              Correlating multi-protocol telemetry across NTCIP 1202, Modbus/DNP3, CoAP, and Kerberos KDC logs.
            </p>
          </div>
        </div>

        {/* Severity Filter */}
        <div className="flex rounded-lg bg-slate-800/80 p-0.5 border border-slate-700 text-xs">
          {['all', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((sev) => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-2.5 py-1 rounded-md font-medium capitalize transition-all ${
                severityFilter === sev
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Threat Incident List */}
      {filteredIncidents.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3 opacity-80" />
          <h3 className="text-base font-bold text-white">No Active Threats Detected</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
            All monitored smart city infrastructure is operating under safe baseline conditions. 
            Use the "Simulate Attack" button in the navigation bar to trigger a scenario.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredIncidents.map((incident) => {
            const isCritical = incident.severity === 'CRITICAL';
            const targetAsset = assets.find(a => a.id === incident.assetId);

            return (
              <div
                key={incident.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isCritical 
                    ? 'bg-slate-900/95 border-red-500/50 shadow-red-glow' 
                    : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                  {/* Left: Incident Title & Badges */}
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                        isCritical 
                          ? 'bg-red-500/20 text-red-400 border border-red-500/40' 
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      }`}>
                        {incident.severity} SEVERITY
                      </span>
                      <span className="text-xs font-mono text-slate-400">{incident.id}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs text-slate-400 flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>{new Date(incident.timestamp).toLocaleTimeString()}</span>
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        incident.status === 'RESOLVED' 
                          ? 'bg-emerald-500/20 text-emerald-400' 
                          : (incident.status === 'ACKNOWLEDGED' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-red-500/20 text-red-400 animate-pulse')
                      }`}>
                        {incident.status}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white">
                      {incident.scenario || incident.description}
                    </h3>
                  </div>

                  {/* Right: Risk Score Gauge Badge */}
                  <div className="flex items-center space-x-3 bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800">
                    <div className="text-right">
                      <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Explainable Risk</div>
                      <div className="text-lg font-mono font-extrabold" style={{ color: incident.riskBreakdown?.color || '#EF4444' }}>
                        {incident.riskScore} <span className="text-xs font-sans font-normal text-slate-400">/ 100</span>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-xs" style={{ borderColor: incident.riskBreakdown?.color || '#EF4444' }}>
                      {incident.riskScore >= 85 ? 'C1' : 'H2'}
                    </div>
                  </div>
                </div>

                {/* Middle: Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 text-xs">
                  {/* Col 1: Target Asset & Vulnerability */}
                  <div className="space-y-1">
                    <span className="text-slate-400 font-medium">Target Asset:</span>
                    <div className="font-semibold text-cyan-300">{incident.asset}</div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      Sector: <span className="capitalize text-slate-300">{incident.sector}</span>
                    </div>
                    {incident.vulnerabilityVector && (
                      <div className="text-[11px] text-orange-400 font-mono mt-1">
                        Vector: {incident.vulnerabilityVector}
                      </div>
                    )}
                  </div>

                  {/* Col 2: Detection Reason */}
                  <div className="space-y-1">
                    <span className="text-slate-400 font-medium">Detection Heuristic:</span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      {incident.detectionReason}
                    </p>
                  </div>

                  {/* Col 3: Public Service Impact */}
                  <div className="space-y-1">
                    <span className="text-slate-400 font-medium">Public Service Impact:</span>
                    <p className="text-amber-300/90 text-[11px] leading-relaxed">
                      {incident.publicServiceImpact}
                    </p>
                  </div>
                </div>

                {/* Bottom: Action Buttons */}
                <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onOpenSimulator(incident)}
                      className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-xs flex items-center space-x-1.5 shadow-cyan-glow transition-all"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Simulate Impact & Actions</span>
                    </button>
                    <button
                      onClick={() => onOpenCopilot(incident)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-300 font-medium text-xs flex items-center space-x-1.5 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>AI Incident Copilot</span>
                    </button>
                  </div>

                  <div className="flex items-center space-x-2">
                    {targetAsset && (
                      <button
                        onClick={() => onSelectAsset(targetAsset)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 font-medium text-xs flex items-center space-x-1 transition-colors"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Inspect Asset Telemetry</span>
                      </button>
                    )}
                    <button
                      onClick={() => onSelectIncident(incident)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs flex items-center space-x-1 transition-colors"
                    >
                      <span>Manage Incident</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
