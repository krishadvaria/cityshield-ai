// CityShield AI — Security Operations Analytics & Trend Visualizations
// Dynamic charts powered by Recharts, driven strictly by live application state.

import React, { useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  AreaChart, 
  Area,
  CartesianGrid,
  Legend
} from 'recharts';
import { 
  BarChart3, 
  PieChart as PieIcon, 
  TrendingUp, 
  ShieldCheck, 
  AlertCircle,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';
import { RISK_WEIGHTS, RISK_THRESHOLDS } from '../services/riskEngine';

const SECTOR_COLORS = {
  traffic: '#38BDF8',
  water: '#06B6D4',
  lighting: '#F59E0B',
  servers: '#A855F7'
};

const SEVERITY_COLORS = {
  CRITICAL: '#EF4444',
  HIGH: '#F97316',
  MEDIUM: '#F59E0B',
  LOW: '#10B981'
};

export default function AnalyticsView({ incidents, assets, onOpenRiskModal }) {
  // 1. Sector Incident Distribution Data
  const sectorData = useMemo(() => {
    const counts = { traffic: 0, water: 0, lighting: 0, servers: 0 };
    incidents.forEach(inc => {
      if (counts[inc.sector] !== undefined) {
        counts[inc.sector]++;
      }
    });

    return [
      { name: 'Traffic Grid', sector: 'traffic', count: counts.traffic, fill: SECTOR_COLORS.traffic },
      { name: 'Water SCADA', sector: 'water', count: counts.water, fill: SECTOR_COLORS.water },
      { name: 'Public Lighting', sector: 'lighting', count: counts.lighting, fill: SECTOR_COLORS.lighting },
      { name: 'Municipal Servers', sector: 'servers', count: counts.servers, fill: SECTOR_COLORS.servers },
    ];
  }, [incidents]);

  // 2. Severity Distribution Data
  const severityData = useMemo(() => {
    const counts = { CRITICAL: 0, HIGH: 0, MEDIUM: 0, LOW: 0 };
    incidents.forEach(inc => {
      if (counts[inc.severity] !== undefined) {
        counts[inc.severity]++;
      }
    });

    const result = Object.keys(counts).map(sev => ({
      name: sev,
      value: counts[sev],
      color: SEVERITY_COLORS[sev]
    })).filter(d => d.value > 0);

    // If empty, supply placeholder baseline
    if (result.length === 0) {
      return [{ name: 'NOMINAL (Zero Threats)', value: 1, color: '#10B981' }];
    }
    return result;
  }, [incidents]);

  // 3. Response Status Statistics
  const statusStats = useMemo(() => {
    const open = incidents.filter(i => i.status === 'OPEN').length;
    const ack = incidents.filter(i => i.status === 'ACKNOWLEDGED').length;
    const resolved = incidents.filter(i => i.status === 'RESOLVED').length;
    const total = incidents.length;
    const resolutionRate = total > 0 ? Math.round((resolved / total) * 100) : 100;

    return { open, ack, resolved, total, resolutionRate };
  }, [incidents]);

  // 4. Simulated Risk Progression Trend
  const trendData = useMemo(() => {
    if (incidents.length === 0) {
      return [
        { time: 'T-60m', risk: 12 },
        { time: 'T-45m', risk: 14 },
        { time: 'T-30m', risk: 12 },
        { time: 'T-15m', risk: 15 },
        { time: 'Now', risk: 12 }
      ];
    }

    return incidents.slice(0, 6).reverse().map((inc, i) => ({
      time: `Inc #${inc.id.slice(-3)}`,
      risk: inc.riskScore,
      resolvedRisk: inc.status === 'RESOLVED' ? 18 : inc.riskScore
    }));
  }, [incidents]);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Cybersecurity Operations & Threat Analytics
            </h2>
            <p className="text-xs text-slate-400">
              Correlated metrics updated dynamically from active incident queues and simulation states.
            </p>
          </div>
        </div>

        <button
          onClick={() => onOpenRiskModal()}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-300 text-xs font-mono font-medium flex items-center space-x-1.5 transition-colors"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Risk Formula Specs</span>
        </button>
      </div>

      {/* KPI Response Status Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Logged Incidents</span>
          <div className="text-2xl font-mono font-bold text-white mt-1">{statusStats.total}</div>
          <span className="text-[10px] text-slate-500">Historical & Simulated</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-[11px] font-semibold text-red-400 uppercase tracking-wider">Open / Unacknowledged</span>
          <div className="text-2xl font-mono font-bold text-red-400 mt-1">{statusStats.open}</div>
          <span className="text-[10px] text-slate-500">Awaiting Operator Triage</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider">Under Active Response</span>
          <div className="text-2xl font-mono font-bold text-cyan-400 mt-1">{statusStats.ack}</div>
          <span className="text-[10px] text-slate-500">Playbooks in Execution</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">Resolution Rate</span>
          <div className="text-2xl font-mono font-bold text-emerald-400 mt-1">{statusStats.resolutionRate}%</div>
          <span className="text-[10px] text-slate-500">{statusStats.resolved} Safely Contained</span>
        </div>
      </div>

      {/* Main Charts Grid (2x2) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Incidents by Infrastructure Sector */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              <span>Incident Frequency by Infrastructure Sector</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Dynamic State</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorData} margin={{ top: 15, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} allowDecimals={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0B1120', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {sectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Threat Severity Distribution */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <PieIcon className="w-4 h-4 text-cyan-400" />
              <span>Threat Severity Breakdown</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">CISA Thresholds</span>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0B1120', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  wrapperStyle={{ fontSize: '11px', color: '#94A3B8' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Simulated Risk Score Progression */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <span>Simulated Risk Score History & Mitigation Trajectory</span>
            </h3>
            <span className="text-[10px] text-emerald-400 font-mono">Pre- vs. Post-Mitigation</span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="resGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="time" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0B1120', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="risk" stroke="#EF4444" strokeWidth={2} fillOpacity={1} fill="url(#riskGrad)" name="Unmitigated Risk" />
                <Area type="monotone" dataKey="resolvedRisk" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#resGrad)" name="Mitigated Risk" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
