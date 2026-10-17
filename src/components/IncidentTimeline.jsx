// CityShield AI — Incident Timeline & Compliance Audit Log
// Records timestamps, status transitions, operator responses, and provides export capabilities.

import React, { useState } from 'react';
import { 
  History, 
  Download, 
  Filter, 
  Clock, 
  ShieldCheck, 
  AlertTriangle, 
  Terminal, 
  User, 
  CheckCircle2, 
  FileJson,
  FileSpreadsheet
} from 'lucide-react';

export default function IncidentTimeline({ timeline = [] }) {
  const [sectorFilter, setSectorFilter] = useState('all');
  const [eventTypeFilter, setEventTypeFilter] = useState('all');

  const filteredEvents = timeline.filter(evt => {
    if (sectorFilter !== 'all' && evt.sector !== sectorFilter && evt.sector !== 'all') return false;
    if (eventTypeFilter !== 'all' && evt.eventType !== eventTypeFilter) return false;
    return true;
  });

  const getLevelBadge = (level) => {
    switch (level) {
      case 'CRITICAL':
        return 'bg-red-500/20 text-red-400 border-red-500/40';
      case 'HIGH':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/40';
      case 'WARN':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      default:
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
    }
  };

  const exportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(timeline, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `cityshield-audit-log-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const exportCSV = () => {
    const headers = ['ID', 'Timestamp', 'Sector', 'EventType', 'Level', 'Operator', 'Message'];
    const rows = timeline.map(e => [
      e.id,
      e.timestamp,
      e.sector,
      e.eventType,
      e.level,
      `"${e.operator || 'System'}"`,
      `"${(e.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `cityshield-audit-log-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Chronological Incident Timeline & Audit Trail
            </h2>
            <p className="text-xs text-slate-400">
              Immutable logging of simulated cyber attacks, operator approvals, and containment timestamps.
            </p>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={exportJSON}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-300 text-xs font-medium flex items-center space-x-1.5 transition-colors"
          >
            <FileJson className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>
          <button
            onClick={exportCSV}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-emerald-300 text-xs font-medium flex items-center space-x-1.5 transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs">
        <div className="flex items-center space-x-2">
          <span className="text-slate-400 font-semibold uppercase text-[10px]">Filter Sector:</span>
          {['all', 'traffic', 'water', 'lighting', 'servers'].map((s) => (
            <button
              key={s}
              onClick={() => setSectorFilter(s)}
              className={`px-2 py-0.5 rounded capitalize transition-all ${
                sectorFilter === s
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <span className="text-slate-500 font-mono text-[11px]">
          Showing {filteredEvents.length} Recorded Events
        </span>
      </div>

      {/* Timeline Stream */}
      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-800">
        {filteredEvents.map((evt, idx) => {
          const isCritical = evt.level === 'CRITICAL';
          const isResolved = evt.eventType === 'INCIDENT_RESOLVED';

          return (
            <div key={evt.id || idx} className="relative group">
              {/* Timeline Dot Indicator */}
              <div className={`absolute -left-6 top-1 w-5 h-5 rounded-full border-2 bg-slate-950 flex items-center justify-center ${
                isCritical 
                  ? 'border-red-500 text-red-400 animate-pulse' 
                  : (isResolved ? 'border-emerald-400 text-emerald-400' : 'border-cyan-400 text-cyan-400')
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
              </div>

              {/* Event Card */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${getLevelBadge(evt.level)}`}>
                      {evt.level}
                    </span>
                    <span className="text-xs font-mono font-bold text-white">{evt.eventType}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-[11px] font-mono text-cyan-400 capitalize">{evt.sector} Sector</span>
                  </div>

                  <div className="flex items-center space-x-2 text-xs text-slate-400 font-mono">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{new Date(evt.timestamp).toLocaleTimeString()}</span>
                    <span className="text-slate-600">|</span>
                    <span className="text-slate-300 flex items-center space-x-1">
                      <User className="w-3 h-3 text-slate-400" />
                      <span>{evt.operator || 'System'}</span>
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {evt.message}
                </p>

                {evt.incidentId && (
                  <div className="text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-800/60">
                    Associated Incident Reference: <span className="text-cyan-400">{evt.incidentId}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
