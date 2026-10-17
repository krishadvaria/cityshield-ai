// CityShield AI — Incident Management Workbench
// Complete incident lifecycle: triage, operator acknowledgement, action execution, and resolution.

import React, { useState } from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  UserCheck, 
  RotateCcw, 
  Sliders, 
  Sparkles, 
  Send, 
  FileText, 
  AlertCircle,
  HelpCircle,
  Layers
} from 'lucide-react';

export default function IncidentManager({ 
  incidents, 
  assets, 
  onAcknowledge, 
  onResolve, 
  onOpenSimulator, 
  onOpenCopilot,
  onOpenRiskModal,
  selectedIncident,
  setSelectedIncident
}) {
  const [statusFilter, setStatusFilter] = useState('all');
  const [sectorFilter, setSectorFilter] = useState('all');
  const [operatorNotes, setOperatorNotes] = useState('');
  const [actionStatuses, setActionStatuses] = useState({});

  // Active or selected incident
  const currentIncident = selectedIncident || incidents[0] || null;

  const filteredIncidents = incidents.filter(inc => {
    if (statusFilter !== 'all' && inc.status !== statusFilter) return false;
    if (sectorFilter !== 'all' && inc.sector !== sectorFilter) return false;
    return true;
  });

  const handleToggleAction = (actionId) => {
    setActionStatuses(prev => ({
      ...prev,
      [actionId]: !prev[actionId]
    }));
  };

  const handleResolveWithNotes = (incidentId) => {
    const notes = operatorNotes || 'All recommended countermeasures executed and verified safe.';
    onResolve(incidentId, 'City Operator (Lead)', notes);
    setOperatorNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Top Filter Bar */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 text-cyan-400" />
            <span>Incident Response Operations</span>
          </h2>
          <p className="text-xs text-slate-400">
            Acknowledge alerts, review rule-based playbooks, and approve containment actions.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <div className="flex rounded-lg bg-slate-800/80 p-0.5 border border-slate-700 text-xs">
            {['all', 'OPEN', 'ACKNOWLEDGED', 'RESOLVED'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 rounded-md font-medium uppercase text-[11px] transition-all ${
                  statusFilter === st
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Sector Filter */}
          <div className="flex rounded-lg bg-slate-800/80 p-0.5 border border-slate-700 text-xs">
            {['all', 'traffic', 'water', 'lighting', 'servers'].map((sec) => (
              <button
                key={sec}
                onClick={() => setSectorFilter(sec)}
                className={`px-2 py-1 rounded-md font-medium capitalize text-[11px] transition-all ${
                  sectorFilter === sec
                    ? 'bg-slate-700 text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {sec}
              </button>
            ))}
          </div>
        </div>
      </div>

      {incidents.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white">No Incidents in Queue</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
            Simulate a cyber attack using the dropdown in the navigation header to test the incident response workflow.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Incidents List (4 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
              Active Incident Queue ({filteredIncidents.length})
            </div>

            <div className="space-y-2 max-h-[680px] overflow-y-auto pr-1">
              {filteredIncidents.map((inc) => {
                const isSelected = currentIncident?.id === inc.id;
                const isCritical = inc.severity === 'CRITICAL';

                return (
                  <div
                    key={inc.id}
                    onClick={() => setSelectedIncident(inc)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-slate-800/90 border-cyan-500 shadow-cyan-glow'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                        isCritical ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      }`}>
                        {inc.severity}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">{inc.id}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        inc.status === 'RESOLVED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-cyan-500/20 text-cyan-300'
                      }`}>
                        {inc.status}
                      </span>
                    </div>

                    <div className="font-bold text-xs text-white line-clamp-1">{inc.scenario}</div>
                    <div className="text-[11px] text-slate-400 mt-1 flex justify-between">
                      <span>Target: {inc.asset}</span>
                      <span className="font-mono text-cyan-400 font-bold">Risk: {inc.riskScore}/100</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Incident Detail & Action Panel (7 cols) */}
          <div className="lg:col-span-7">
            {currentIncident ? (
              <div className="p-5 rounded-2xl bg-slate-900/95 border border-slate-800 space-y-5">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xs font-mono font-bold text-cyan-400">{currentIncident.id}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs text-slate-400">{new Date(currentIncident.timestamp).toLocaleString()}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white">{currentIncident.scenario}</h3>
                  </div>

                  {/* Risk Score Pill & Formula Button */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onOpenRiskModal(currentIncident.riskBreakdown)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-cyan-300 font-mono font-bold flex items-center space-x-1.5 transition-colors"
                      title="Inspect transparent mathematical risk calculation"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Score: {currentIncident.riskScore}/100</span>
                    </button>
                  </div>
                </div>

                {/* Primary Intelligence Boxes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-slate-400 font-medium block mb-1">Affected Infrastructure:</span>
                    <span className="font-bold text-cyan-300">{currentIncident.asset}</span>
                    <span className="text-slate-400 block text-[11px] mt-0.5">Sector: {currentIncident.sector}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-slate-400 font-medium block mb-1">Public Service Disruption:</span>
                    <span className="text-amber-300/90 text-[11px] leading-tight block">
                      {currentIncident.publicServiceImpact}
                    </span>
                  </div>
                </div>

                {/* Detection Reason */}
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
                  <span className="text-slate-400 font-medium block mb-1">Root Cause Detection Reason:</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {currentIncident.detectionReason}
                  </p>
                </div>

                {/* Recommended Safe Actions / Playbook Checklist */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Recommended Safe Countermeasures</span>
                    </h4>
                    <span className="text-[11px] text-slate-400">Operator authorization required</span>
                  </div>

                  <div className="space-y-2">
                    {currentIncident.recommendedActions?.map((act) => {
                      const isExecuted = !!actionStatuses[act.id];
                      return (
                        <div
                          key={act.id}
                          onClick={() => handleToggleAction(act.id)}
                          className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start space-x-3 ${
                            isExecuted
                              ? 'bg-emerald-950/20 border-emerald-500/50 text-slate-200'
                              : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isExecuted}
                            onChange={() => {}}
                            className="mt-1 rounded bg-slate-800 border-slate-600 text-cyan-500 focus:ring-0 cursor-pointer"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className={`text-xs font-bold ${isExecuted ? 'text-emerald-300' : 'text-white'}`}>
                                {act.title}
                              </span>
                              <span className="text-[10px] font-mono text-cyan-400">
                                -{act.riskReduction} Risk Pts
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-0.5">{act.description}</p>
                            <p className="text-[10px] text-emerald-400/90 mt-1 italic">
                              Safe Impact: {act.safetyImpact}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Operator Notes Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex items-center space-x-1">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    <span>Operator Action Notes & Verification:</span>
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={operatorNotes}
                      onChange={(e) => setOperatorNotes(e.target.value)}
                      placeholder="e.g., Confirmed hardware conflict monitor tripped; field tech dispatched."
                      className="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 placeholder-slate-600"
                    />
                  </div>
                </div>

                {/* Operational Lifecycle Buttons */}
                <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    {/* Acknowledge Button */}
                    {currentIncident.status === 'OPEN' && (
                      <button
                        onClick={() => onAcknowledge(currentIncident.id, 'City Operator (Lead)')}
                        className="px-3.5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs flex items-center space-x-1.5 shadow-cyan-glow transition-all"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Acknowledge Incident</span>
                      </button>
                    )}

                    {/* What-If Impact Simulator */}
                    <button
                      onClick={() => onOpenSimulator(currentIncident)}
                      className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-300 font-medium text-xs flex items-center space-x-1.5 transition-colors"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>What-If Simulator</span>
                    </button>

                    {/* Copilot Drawer */}
                    <button
                      onClick={() => onOpenCopilot(currentIncident)}
                      className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-300 font-medium text-xs flex items-center space-x-1.5 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Copilot AI</span>
                    </button>
                  </div>

                  {/* Mark Resolved Button */}
                  {currentIncident.status !== 'RESOLVED' ? (
                    <button
                      onClick={() => handleResolveWithNotes(currentIncident.id)}
                      className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-1.5 shadow-green-glow transition-all"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Mark Resolved</span>
                    </button>
                  ) : (
                    <span className="text-xs text-emerald-400 font-bold flex items-center space-x-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Incident Safely Resolved</span>
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400 text-xs">
                Select an incident from the queue to view details.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
