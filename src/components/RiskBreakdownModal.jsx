// CityShield AI — Explainable Risk Breakdown Modal
// Displays the mathematical formula, component weights, and reasoning behind 0–100 risk scores.

import React from 'react';
import { 
  X, 
  HelpCircle, 
  Calculator, 
  ShieldAlert, 
  CheckCircle2, 
  Info, 
  ArrowRight,
  Sliders
} from 'lucide-react';
import { RISK_WEIGHTS, RISK_THRESHOLDS } from '../services/riskEngine';

export default function RiskBreakdownModal({ isOpen, onClose, riskBreakdown }) {
  if (!isOpen) return null;

  // Use provided breakdown or default illustrative values
  const breakdown = riskBreakdown?.breakdown || {
    technicalSeverity: { raw: 80, weight: 0.25, contribution: 20.0, label: 'Technical Severity (Exploit Potential)' },
    assetCriticality: { raw: 95, weight: 0.25, contribution: 23.8, label: 'Asset Importance (Life Safety & Tier)' },
    publicServiceImpact: { raw: 88, weight: 0.25, contribution: 22.0, label: 'Public Service Disruption Risk' },
    urgency: { raw: 85, weight: 0.15, contribution: 12.8, label: 'Escalation Urgency & Time Sensitivity' },
    detectionConfidence: { raw: 90, weight: 0.10, contribution: 9.0, label: 'Sensor Corroboration Confidence' }
  };

  const score = riskBreakdown?.score || 88;
  const level = riskBreakdown?.level || 'CRITICAL';
  const driver = riskBreakdown?.primaryDriverExplanation || 'Primary risk driver is Asset Criticality & Public Service Disruption.';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-cyan-500/40 rounded-2xl shadow-cyan-glow overflow-hidden text-slate-100 my-8">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-cyan-400">MATHEMATICAL TRANSPARENCY</span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-400">Explainable AI Heuristics</span>
              </div>
              <h2 className="text-base font-bold text-white mt-0.5">
                CityShield Risk Scoring Engine (0 – 100)
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

        {/* Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-xs">
          {/* Composite Score Card */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-slate-400 block text-[11px] uppercase tracking-wider font-semibold">
                Calculated Risk Score:
              </span>
              <div className="flex items-baseline space-x-2 mt-1">
                <span className="text-3xl font-extrabold font-mono text-red-400">{score}</span>
                <span className="text-slate-400 font-mono">/ 100</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-300 border border-red-500/40 uppercase">
                  {level}
                </span>
              </div>
            </div>

            <div className="text-right max-w-xs">
              <span className="text-[11px] text-slate-400 block font-semibold">Primary Risk Driver:</span>
              <p className="text-cyan-300 text-[11px] mt-0.5 leading-tight">{driver}</p>
            </div>
          </div>

          {/* Mathematical Formula */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-500/30 font-mono text-cyan-300 text-[11px] leading-relaxed">
            <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider mb-1">
              Deterministic Scoring Formula:
            </span>
            Score = (0.25 × Severity) + (0.25 × Asset Tier) + (0.25 × Public Impact) + (0.15 × Urgency) + (0.10 × Confidence)
          </div>

          {/* Factor Breakdown Bars */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Component Weights & Contributions:
            </h3>

            {Object.entries(breakdown).map(([key, item]) => (
              <div key={key} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-200">{item.label}</span>
                  <div className="font-mono text-cyan-400">
                    <span className="text-white font-bold">{item.raw}/100</span> × {(item.weight * 100).toFixed(0)}% = <span className="font-bold text-emerald-400">+{item.contribution} pts</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-cyan-500 h-full rounded-full transition-all"
                    style={{ width: `${item.raw}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Thresholds Table */}
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <h4 className="font-bold text-white uppercase text-[10px] tracking-wider">
              Configured Severity Threshold Bands:
            </h4>
            <div className="grid grid-cols-4 gap-2 text-center font-mono text-[10px]">
              <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <span className="font-bold block">LOW</span>
                0 – 39 pts
              </div>
              <div className="p-2 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <span className="font-bold block">MEDIUM</span>
                40 – 69 pts
              </div>
              <div className="p-2 rounded bg-orange-500/10 border border-orange-500/30 text-orange-400">
                <span className="font-bold block">HIGH</span>
                70 – 84 pts
              </div>
              <div className="p-2 rounded bg-red-500/10 border border-red-500/30 text-red-400">
                <span className="font-bold block">CRITICAL</span>
                85 – 100 pts
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 flex items-start space-x-2 text-slate-400 text-[10px] leading-relaxed">
            <Info className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
            <span>
              Disclaimer: CityShield AI calculates risk using deterministic multi-criteria decision analysis (MCDA) for triage prioritization. Scores represent relative operational urgency and do not claim statistically validated physical failure probabilities.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
