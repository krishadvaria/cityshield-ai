// CityShield AI — Hackathon Judge Guided Walkthrough Modal
// 6-Step Demonstration Guide for Cyber Samvad Hackathon 2026 Evaluators

import React from 'react';
import { 
  X, 
  HelpCircle, 
  CheckCircle2, 
  Play, 
  Sliders, 
  ShieldAlert, 
  Sparkles, 
  RotateCcw,
  ArrowRight,
  Award,
  Layers
} from 'lucide-react';

export default function DemoGuideModal({ 
  isOpen, 
  onClose, 
  onTriggerScenario, 
  onResetDemo 
}) {
  if (!isOpen) return null;

  const steps = [
    {
      step: '1',
      title: 'Baseline Normal Operations',
      desc: 'Observe the city in a safe state: City Threat Level at 12/100 (LOW), all 12 assets green, potable water at 58 PSI, 911 dispatch latency under 150ms.',
      action: 'Click "Reset Demo" if any prior simulation was active.'
    },
    {
      step: '2',
      title: 'Simulate Cyber Threat Scenario',
      desc: 'Inject one of three deterministic attack vectors (Traffic Signal Override, Water SCADA Spoofing, or Municipal Server Intrusion).',
      action: 'Click "Simulate Attack" in the navbar and select "2. Water SCADA Spoofing".'
    },
    {
      step: '3',
      title: 'Interactive City Map & Asset Inspection',
      desc: 'Watch the affected asset pulse red on the interactive SVG map. Click the node to inspect Modbus register anomalies, overpressure hydraulic alerts, and unauthenticated commands.',
      action: 'Navigate to "Smart City Map" or click the asset from the Command Center.'
    },
    {
      step: '4',
      title: 'Explainable Risk Assessment & AI Copilot',
      desc: 'Inspect how the 92/100 risk score was derived from technical severity, asset tier, and public safety impact. Open Copilot to view CISA/NIST-aligned playbooks.',
      action: 'Click "Score: 92/100" or open "Copilot" in the header.'
    },
    {
      step: '5',
      title: 'What-If Service Impact Response Simulator',
      desc: 'Our primary hackathon differentiator: Toggle recommended countermeasures (Air-gap switch, pressure venting, grab samples) and watch public risk drop from 96% to 14% before approving.',
      action: 'Click "Simulate Impact & Actions" on the active threat card.'
    },
    {
      step: '6',
      title: 'Operator Resolution & Audit Trail',
      desc: 'Approve the countermeasures or click "Mark Resolved". Watch the dashboard return to nominal green, and verify the immutable audit entry in the Audit Timeline.',
      action: 'Review "Audit Timeline" and export the incident report to JSON or CSV.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-cyan-500/50 rounded-2xl shadow-cyan-glow overflow-hidden text-slate-100 my-8">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 text-cyan-400 border border-cyan-500/30">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-cyan-400">CYBER SAMVAD HACKATHON 2026</span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-400">Problem Statement 4</span>
              </div>
              <h2 className="text-base font-bold text-white mt-0.5">
                CityShield AI — 6-Step Judge Demonstration Guide
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

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-xs">
          <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-slate-300 leading-relaxed">
            <span className="font-bold text-cyan-300">Hackathon Mission: </span>
            CityShield AI delivers service-impact-aware cyber defense for municipal infrastructure. It ensures operators prioritize incidents not merely by technical bits and bytes, but by potential disruption to drinking water, ambulance corridors, and 911 dispatch.
          </div>

          {/* 6 Steps Grid */}
          <div className="space-y-3">
            {steps.map((st) => (
              <div
                key={st.step}
                className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start space-x-3.5"
              >
                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-mono font-bold flex items-center justify-center flex-shrink-0">
                  {st.step}
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="font-bold text-white text-xs">{st.title}</h3>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{st.desc}</p>
                  <div className="pt-1 text-[11px] font-mono text-cyan-400 flex items-center space-x-1">
                    <ArrowRight className="w-3 h-3 text-cyan-400" />
                    <span>Action: {st.action}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Demo Launch Buttons */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="font-bold text-white block">One-Click Demonstration Triggers:</span>
              <span className="text-slate-400 text-[11px]">Directly trigger any scenario to start evaluation</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  onTriggerScenario('traffic');
                  onClose();
                }}
                className="px-3 py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 text-sky-300 font-medium"
              >
                Traffic Scenario
              </button>
              <button
                onClick={() => {
                  onTriggerScenario('water');
                  onClose();
                }}
                className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 font-medium"
              >
                Water SCADA Scenario
              </button>
              <button
                onClick={() => {
                  onTriggerScenario('servers');
                  onClose();
                }}
                className="px-3 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 font-medium"
              >
                Server Scenario
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex justify-between items-center">
          <span className="text-slate-500 text-[11px] font-mono">Cyber Samvad 2026 — Team CityShield AI</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-cyan-glow"
          >
            Start Demonstration
          </button>
        </div>
      </div>
    </div>
  );
}
