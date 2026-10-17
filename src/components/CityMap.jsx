// CityShield AI — Interactive Smart City Map (SVG Schematic)
// Visual representation of critical municipal assets, zones, and real-time security postures.

import React, { useState } from 'react';
import { 
  Navigation, 
  Droplets, 
  Zap, 
  Server, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  Maximize2,
  Info
} from 'lucide-react';

export default function CityMap({ 
  assets, 
  incidents, 
  onSelectAsset, 
  selectedAssetId 
}) {
  const [sectorFilter, setSectorFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [hoveredAsset, setHoveredAsset] = useState(null);

  // Filter assets
  const filteredAssets = assets.filter(asset => {
    if (sectorFilter !== 'all' && asset.sector !== sectorFilter) return false;
    if (statusFilter !== 'all' && asset.status !== statusFilter) return false;
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return '#EF4444'; // Red
      case 'warning': return '#F59E0B'; // Amber
      case 'mitigating': return '#00F0FF'; // Cyan
      default: return '#10B981'; // Green
    }
  };

  const getSectorIcon = (sector) => {
    switch (sector) {
      case 'traffic': return Navigation;
      case 'water': return Droplets;
      case 'lighting': return Zap;
      case 'servers': return Server;
      default: return Layers;
    }
  };

  return (
    <div className="space-y-4">
      {/* Map Control Toolbar */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Metropolis Geographic Infrastructure Grid
            </h2>
            <p className="text-xs text-slate-400">
              Interactive local SVG cyber range schematic. Click any endpoint node to inspect telemetry.
            </p>
          </div>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Sector Filters */}
          <div className="flex rounded-lg bg-slate-800/80 p-0.5 border border-slate-700 text-xs">
            {['all', 'traffic', 'water', 'lighting', 'servers'].map((s) => (
              <button
                key={s}
                onClick={() => setSectorFilter(s)}
                className={`px-2.5 py-1 rounded-md capitalize font-medium transition-all ${
                  sectorFilter === s
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Status Filters */}
          <div className="flex rounded-lg bg-slate-800/80 p-0.5 border border-slate-700 text-xs">
            {['all', 'critical', 'warning', 'normal'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2 py-1 rounded-md capitalize font-medium transition-all ${
                  statusFilter === st
                    ? 'bg-slate-700 text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Map Container */}
      <div className="relative rounded-2xl bg-[#090E1A] border border-slate-800 overflow-hidden shadow-2xl p-2">
        {/* Cyber Grid Background */}
        <div className="relative w-full aspect-[16/9] max-h-[640px] cyber-grid-pattern rounded-xl overflow-hidden border border-slate-800/60 bg-[#070C16]">
          
          {/* SVG Map Canvas */}
          <svg
            viewBox="0 0 1000 600"
            className="w-full h-full select-none"
            style={{ filter: 'drop-shadow(0 0 1px rgba(0, 240, 255, 0.1))' }}
          >
            <defs>
              {/* Radial gradient for water */}
              <linearGradient id="riverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0369a1" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#0891b2" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#0e7490" stopOpacity="0.5" />
              </linearGradient>

              {/* Grid pattern */}
              <pattern id="smallGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
              </pattern>
            </defs>

            {/* Grid Fill */}
            <rect width="1000" height="600" fill="url(#smallGrid)" />

            {/* Sector Geographic Zones */}
            {/* North Gateway Industrial Zone */}
            <rect x="420" y="40" width="280" height="180" rx="16" fill="rgba(30, 41, 59, 0.3)" stroke="rgba(56, 189, 248, 0.2)" strokeDasharray="4 4" />
            <text x="440" y="70" fill="#38BDF8" fontSize="11" fontFamily="monospace" fontWeight="bold" opacity="0.6">ZONE 01: NORTH HIGHWAY GATEWAY</text>

            {/* Downtown Civic Core */}
            <rect x="280" y="200" width="340" height="200" rx="16" fill="rgba(30, 41, 59, 0.4)" stroke="rgba(168, 85, 247, 0.25)" strokeDasharray="4 4" />
            <text x="300" y="225" fill="#A855F7" fontSize="11" fontFamily="monospace" fontWeight="bold" opacity="0.6">ZONE 02: DOWNTOWN CIVIC CORE & CAD</text>

            {/* River Basin Works & Reservoir */}
            <path
              d="M 60,340 Q 200,320 280,420 T 520,540 L 460,600 L 0,600 L 0,360 Z"
              fill="rgba(6, 182, 212, 0.08)"
              stroke="rgba(6, 182, 212, 0.2)"
              strokeDasharray="4 4"
            />
            <text x="40" y="440" fill="#06B6D4" fontSize="11" fontFamily="monospace" fontWeight="bold" opacity="0.6">ZONE 03: RESERVOIR & RIVER BASIN</text>

            {/* Harbor Port & Logistics Wharf */}
            <rect x="680" y="320" width="280" height="240" rx="16" fill="rgba(30, 41, 59, 0.3)" stroke="rgba(245, 158, 11, 0.2)" strokeDasharray="4 4" />
            <text x="700" y="350" fill="#F59E0B" fontSize="11" fontFamily="monospace" fontWeight="bold" opacity="0.6">ZONE 04: HARBOR LOGISTICS WHARF</text>

            {/* Stylized River (The Metropolitan Waterway) */}
            <path
              d="M 0,300 C 180,310 240,460 380,510 C 520,560 680,480 820,500 L 1000,520 L 1000,580 L 0,580 Z"
              fill="url(#riverGradient)"
              stroke="#0891b2"
              strokeWidth="2"
              strokeOpacity="0.6"
            />
            <text x="140" y="520" fill="#0891b2" fontSize="12" fontFamily="monospace" fontWeight="600" opacity="0.5" transform="rotate(-6 140 520)">
              METRO RIVER RESERVOIR BASIN
            </text>

            {/* Major Arterial Roads & Bridges */}
            {/* 5th Avenue Spine */}
            <line x1="100" y1="280" x2="900" y2="280" stroke="#334155" strokeWidth="4" strokeDasharray="8 4" />
            <line x1="500" y1="60" x2="500" y2="540" stroke="#334155" strokeWidth="4" strokeDasharray="8 4" />

            {/* Harbor Bridge Crossing */}
            <line x1="680" y1="390" x2="820" y2="500" stroke="#38BDF8" strokeWidth="3" opacity="0.4" strokeDasharray="4 4" />

            {/* Asset Nodes */}
            {filteredAssets.map((asset) => {
              const { x, y } = asset.coordinates;
              const color = getStatusColor(asset.status);
              const isSelected = selectedAssetId === asset.id;
              const isCritical = asset.status === 'critical';
              const isWarning = asset.status === 'warning';

              return (
                <g
                  key={asset.id}
                  className="cursor-pointer transition-transform duration-200"
                  onClick={() => onSelectAsset(asset)}
                  onMouseEnter={() => setHoveredAsset(asset)}
                  onMouseLeave={() => setHoveredAsset(null)}
                >
                  {/* Pulsing ring for critical/warning threats */}
                  {(isCritical || isWarning) && (
                    <circle
                      cx={x}
                      cy={y}
                      r="22"
                      fill="none"
                      stroke={color}
                      strokeWidth="2"
                      className="pulse-ring-anim"
                    />
                  )}

                  {/* Outer selection ring */}
                  {isSelected && (
                    <circle
                      cx={x}
                      cy={y}
                      r="20"
                      fill="none"
                      stroke="#00F0FF"
                      strokeWidth="2.5"
                      strokeDasharray="4 2"
                    />
                  )}

                  {/* Base Circle Glow */}
                  <circle
                    cx={x}
                    cy={y}
                    r="14"
                    fill="#0B1120"
                    stroke={color}
                    strokeWidth="2.5"
                  />

                  {/* Inner Status Indicator */}
                  <circle
                    cx={x}
                    cy={y}
                    r="6"
                    fill={color}
                    opacity={isCritical ? 1 : 0.85}
                  />

                  {/* Text Label */}
                  <text
                    x={x}
                    y={y + 26}
                    fill="#E2E8F0"
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="bold"
                    textAnchor="middle"
                    className="select-none pointer-events-none drop-shadow-md"
                  >
                    {asset.id.split('-').slice(1).join('-')}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Interactive Hover Tooltip Overlay */}
          {hoveredAsset && (
            <div
              className="absolute pointer-events-none z-30 p-3 rounded-xl bg-slate-950/95 border border-cyan-500/50 shadow-cyan-glow text-xs backdrop-blur-md max-w-xs transition-opacity duration-150"
              style={{
                left: `${Math.min(75, Math.max(10, (hoveredAsset.coordinates.x / 1000) * 100))}%`,
                top: `${Math.min(75, Math.max(10, (hoveredAsset.coordinates.y / 600) * 100))}%`,
                transform: 'translate(-50%, -120%)'
              }}
            >
              <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1.5 mb-1.5">
                <span className="font-mono font-bold text-cyan-300">{hoveredAsset.id}</span>
                <span
                  className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase"
                  style={{
                    backgroundColor: `${getStatusColor(hoveredAsset.status)}20`,
                    color: getStatusColor(hoveredAsset.status)
                  }}
                >
                  {hoveredAsset.status}
                </span>
              </div>
              <div className="font-bold text-white mb-1">{hoveredAsset.name}</div>
              <div className="text-[11px] text-slate-300 mb-1">Zone: {hoveredAsset.zone}</div>
              <div className="text-[10px] text-slate-400 font-mono">Protocol: {hoveredAsset.protocol}</div>
              <div className="text-[10px] text-slate-400 font-mono">IP: {hoveredAsset.ipAddress}</div>
              <div className="mt-1 pt-1 border-t border-slate-800/80 text-[10px] text-cyan-400 italic">
                Click node to inspect full telemetry & countermeasures
              </div>
            </div>
          )}

          {/* Map Legend Overlay */}
          <div className="absolute bottom-3 left-3 bg-slate-950/90 border border-slate-800 p-2.5 rounded-xl backdrop-blur-sm text-xs space-y-1.5 z-20">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Status Legend</div>
            <div className="flex items-center space-x-3 text-[11px]">
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span className="text-slate-300">Nominal</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                <span className="text-slate-300">Warning</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse"></span>
                <span className="text-slate-300">Critical Threat</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
