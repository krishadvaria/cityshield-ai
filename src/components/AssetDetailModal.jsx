// CityShield AI — Critical Infrastructure Asset Inspection Modal
// Real-time telemetry, protocol analysis, and safe subnet isolation controls.

import React from 'react';
import { 
  X, 
  Server, 
  Radio, 
  Shield, 
  Activity, 
  Lock, 
  Unlock, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Cpu, 
  Layers
} from 'lucide-react';

export default function AssetDetailModal({ 
  isOpen, 
  onClose, 
  asset, 
  onToggleIsolation 
}) {
  if (!isOpen || !asset) return null;

  const isIsolated = !!asset.isolated;
  const isCritical = asset.status === 'critical';
  const isWarning = asset.status === 'warning';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-cyan-500/40 rounded-2xl shadow-cyan-glow overflow-hidden text-slate-100 my-8">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-xl border ${
              isCritical ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
            }`}>
              <Server className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-cyan-400">{asset.id}</span>
                <span className="text-slate-600">•</span>
                <span className="text-xs font-mono uppercase text-slate-400">{asset.sectorName}</span>
              </div>
              <h2 className="text-base font-bold text-white mt-0.5">{asset.name}</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-xs">
          {/* Status Banner */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
            <div>
              <span className="text-slate-400 block text-[11px]">Operational Status:</span>
              <span className={`font-mono font-bold text-sm uppercase ${
                isCritical ? 'text-red-400' : (isWarning ? 'text-amber-400' : 'text-emerald-400')
              }`}>
                {asset.status}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Criticality Tier:</span>
              <span className="font-mono font-bold text-sm text-cyan-300">{asset.criticality}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Service Impact Weight:</span>
              <span className="font-mono font-bold text-sm text-purple-300">
                {(asset.serviceImpactWeight * 100).toFixed(0)}%
              </span>
            </div>
          </div>

          {/* Asset Telemetry Stream */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span>Monitored Operational Telemetry</span>
            </h3>

            <div className="grid grid-cols-2 gap-2.5">
              {Object.entries(asset.telemetry || {}).map(([key, val]) => (
                <div key={key} className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                  <span className="text-slate-400 text-[11px] capitalize block">
                    {key.replace(/([A-Z])/g, ' $1')}:
                  </span>
                  <span className={`font-mono font-bold text-sm ${
                    String(val).toLowerCase().includes('critical') || String(val).toLowerCase().includes('override')
                      ? 'text-red-400 animate-pulse'
                      : 'text-white'
                  }`}>
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Network & Protocol Details */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <Radio className="w-3.5 h-3.5 text-cyan-400" />
              <span>Network & Communication Specs</span>
            </h3>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Industrial Protocol:</span>
                <span className="font-mono text-cyan-400 font-semibold">{asset.protocol}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">IP Address:</span>
                <span className="font-mono text-slate-200">{asset.ipAddress}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Firmware / OS:</span>
                <span className="font-mono text-slate-300">{asset.firmware || 'Standard Microcode'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Geographic Zone:</span>
                <span className="text-slate-200">{asset.zone}</span>
              </div>
            </div>
          </div>

          {/* Asset Description & Last Event */}
          <div className="space-y-2">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-400 block mb-1 font-semibold">Asset Function:</span>
              <p className="text-slate-300 leading-relaxed">{asset.description}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-400 block mb-1 font-semibold">Latest Telemetry Polling Event:</span>
              <p className="text-cyan-300 font-mono text-[11px]">{asset.lastEvent}</p>
            </div>
          </div>
        </div>

        {/* Footer Isolation Controls */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isIsolated ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`}></span>
            <span className="text-xs text-slate-300 font-mono">
              Network Routing: <span className="font-bold">{isIsolated ? 'ISOLATED (Air-Gapped)' : 'CONNECTED'}</span>
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onToggleIsolation(asset.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
                isIsolated
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-green-glow'
                  : 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-glow'
              }`}
            >
              {isIsolated ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
              <span>{isIsolated ? 'Restore Subnet Routing' : 'Engage Physical Isolation'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
