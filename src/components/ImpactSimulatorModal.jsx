// CityShield AI — What-If Service Impact Response Simulator Modal
// Primary Hackathon Differentiator: Visualizing Before vs. After Public Service Disruption

import React, { useState, useMemo } from 'react';
import { 
  X, 
  Sliders, 
  ArrowRight, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingDown, 
  DollarSign, 
  Clock, 
  Activity,
  Info,
  Check
} from 'lucide-react';
import { simulateResponseImpact } from '../services/impactSimulator';

export default function ImpactSimulatorModal({ 
  isOpen, 
  onClose, 
  incident, 
  onApproveResponse 
}) {
  if (!isOpen || !incident) return null;

  const actions = incident.recommendedActions || [];
  // Initially select all recommended actions
  const [selectedActionIds, setSelectedActionIds] = useState(
    actions.map(a => a.id)
  );

  const toggleAction = (id) => {
    setSelectedActionIds(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  // Recalculate impact dynamically
  const simulation = useMemo(() => {
    return simulateResponseImpact(incident, selectedActionIds);
  }, [incident, selectedActionIds]);

  const handleApprove = () => {
    onApproveResponse(incident.id, selectedActionIds);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-cyan-500/50 rounded-2xl shadow-cyan-glow overflow-hidden text-slate-100 my-8">
        {/* Top Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-cyan-400">WHAT-IF RESPONSE SIMULATOR</span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-400">Service-Impact-Aware Optimization</span>
              </div>
              <h2 className="text-base font-bold text-white mt-0.5">
                {incident.scenario} — Comparative Impact Modeling
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Target Asset Context */}
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-slate-400">Target Asset: </span>
              <span className="font-bold text-cyan-300">{incident.asset}</span>
              <span className="text-slate-500 font-mono ml-2">({incident.sector})</span>
            </div>
            <div className="text-amber-400 font-mono">
              Unmitigated Risk: <span className="font-bold text-red-400">{simulation.baselineRisk}/100</span>
            </div>
          </div>

          {/* Interactive Countermeasure Selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Select Proposed Countermeasures to Model:
              </h3>
              <span className="text-xs text-cyan-400 font-mono">
                {selectedActionIds.length} of {actions.length} Actions Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {actions.map((act) => {
                const isSelected = selectedActionIds.includes(act.id);
                return (
                  <div
                    key={act.id}
                    onClick={() => toggleAction(act.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-cyan-950/30 border-cyan-500 text-white'
                        : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-1 mb-1">
                        <span className="text-xs font-bold">{act.title}</span>
                        <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                          isSelected ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-600'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2">{act.description}</p>
                    </div>
                    <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-emerald-400 font-bold">-{act.riskReduction} Risk Pts</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Side-by-Side Impact Comparison Grid */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center space-x-2">
              <TrendingDown className="w-4 h-4 text-emerald-400" />
              <span>Simulated Public Service Disruption: Before vs. After Response</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card 1: Before Response (Status Quo) */}
              <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/40 space-y-3">
                <div className="flex items-center justify-between border-b border-red-500/20 pb-2">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    <span className="text-xs font-bold text-red-300 uppercase tracking-wider">Before Response (No Action)</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-red-400">Risk: {simulation.baselineRisk}/100</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center py-1 border-b border-slate-800/40">
                    <span className="text-slate-400">Public Safety Risk:</span>
                    <span className="font-bold text-red-400">{simulation.before.publicSafetyRiskLabel} ({simulation.before.publicSafetyRisk}%)</span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-slate-800/40">
                    <span className="text-slate-400">Service Availability:</span>
                    <span className="font-mono text-amber-400 font-bold">{simulation.before.serviceAvailability}%</span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-slate-800/40">
                    <span className="text-slate-400">Emergency Ambulance Delay:</span>
                    <span className="font-mono text-red-400 font-bold">+{simulation.before.emergencyDelayMinutes} mins</span>
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-400">Est. Economic Loss Rate:</span>
                    <span className="font-mono text-red-300 font-bold">{simulation.before.estimatedHourlyLoss}</span>
                  </div>
                </div>
              </div>

              {/* Card 2: After Approved Response (Projected) */}
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40 space-y-3">
                <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">After Approved Response</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    Projected: {simulation.projectedRisk}/100 (-{simulation.riskDelta} pts)
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center py-1 border-b border-slate-800/40">
                    <span className="text-slate-400">Public Safety Risk:</span>
                    <span className="font-bold text-emerald-400">{simulation.after.publicSafetyRiskLabel} ({simulation.after.publicSafetyRisk}%)</span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-slate-800/40">
                    <span className="text-slate-400">Service Availability:</span>
                    <span className="font-mono text-emerald-400 font-bold">{simulation.after.serviceAvailability}%</span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-slate-800/40">
                    <span className="text-slate-400">Emergency Ambulance Delay:</span>
                    <span className="font-mono text-emerald-400 font-bold">+{simulation.after.emergencyDelayMinutes} mins</span>
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-400">Est. Economic Loss Rate:</span>
                    <span className="font-mono text-emerald-300 font-bold">{simulation.after.estimatedHourlyLoss}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Transparent Assumptions List */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-2">
            <div className="flex items-center space-x-2 text-slate-300 font-bold">
              <Info className="w-4 h-4 text-cyan-400" />
              <span>Transparent Simulation Modeling Assumptions:</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-slate-400 text-[11px]">
              {simulation.assumptions.map((assump, idx) => (
                <li key={idx}>{assump}</li>
              ))}
            </ul>
            <div className="text-[10px] text-slate-500 italic mt-2 border-t border-slate-800/80 pt-1.5">
              {simulation.disclaimer}
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-400 font-mono">
            Projected Threat Reduction: <span className="font-bold text-emerald-400">{simulation.riskReductionPct}%</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
            >
              Cancel Preview
            </button>
            <button
              onClick={handleApprove}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-green-glow flex items-center space-x-1.5 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Approve & Apply Simulated Countermeasures</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
