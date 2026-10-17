// CityShield AI — Simplified Security Operations Command Center
// Progressive Disclosure: Plain-language security posture, essential KPIs, ranked urgent threats, and distinct simulation controls.

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
  ArrowRight, 
  Sparkles,
  Play,
  RotateCcw,
  Sliders,
  ChevronRight,
  TrendingDown,
  Users,
  ExternalLink,
  Layers,
  HelpCircle
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
  
  // Rank active incidents by risk score / urgency (highest first)
  const rankedIncidents = [...unresolvedIncidents].sort((a, b) => (b.riskScore || 0) - (a.riskScore || 0));
  const topIncident = rankedIncidents[0];

  // Plain language summary explanation
  const getPlainLanguageStatus = () => {
    if (unresolvedIncidents.length === 0) {
      return {
        headline: 'All City Systems Safe & Operating Normally',
        detail: 'Essential public services—including drinking water pressure, emergency 911 dispatch communications, and downtown traffic signals—are functioning with zero detected cyber threats.',
        badge: 'NORMAL OPERATIONS',
        badgeColor: 'emerald'
      };
    }
    if (topIncident.severity === 'CRITICAL') {
      return {
        headline: `Critical Threat Alert: ${topIncident.scenario}`,
        detail: `Immediate operator action is required on ${topIncident.asset}. ${topIncident.publicServiceImpact}`,
        badge: 'CRITICAL ACTION REQUIRED',
        badgeColor: 'red'
      };
    }
    return {
      headline: `Advisory: ${topIncident.scenario}`,
      detail: `An anomaly has been flagged on ${topIncident.asset}. Service impact is currently contained, but operator review is recommended.`,
      badge: 'ELEVATED MONITORING',
      badgeColor: 'amber'
    };
  };

  const statusNarrative = getPlainLanguageStatus();

  return (
    <div className="space-y-6">
      {/* 1. Plain Language Overall City Security Status Banner */}
      <div 
        className={`p-6 rounded-3xl border transition-all ${
          unresolvedIncidents.length > 0 
            ? 'border-red-500/50 shadow-red-glow' 
            : 'border-emerald-500/30'
        }`}
        style={{ 
          backgroundColor: unresolvedIncidents.length > 0 ? 'rgba(239, 68, 68, 0.08)' : 'rgba(16, 185, 129, 0.06)',
          boxShadow: 'var(--card-shadow)'
        }}
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-start space-x-4">
            <div 
              className={`p-3 rounded-2xl border flex-shrink-0 ${
                unresolvedIncidents.length > 0 
                  ? 'bg-red-500/20 border-red-500/40 text-red-400 animate-pulse' 
                  : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
              }`}
            >
              {unresolvedIncidents.length > 0 ? <ShieldAlert className="w-7 h-7" /> : <CheckCircle2 className="w-7 h-7" />}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${
                  statusNarrative.badgeColor === 'red' 
                    ? 'bg-red-500/20 text-red-400 border-red-500/40' 
                    : (statusNarrative.badgeColor === 'amber' ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40')
                }`}>
                  {statusNarrative.badge}
                </span>
                <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                  Simulated City Risk Index: <strong style={{ color: cityHealth.color }}>{cityHealth.score}/100</strong>
                </span>
              </div>

              <h2 className="text-xl font-bold tracking-tight text-white">
                {statusNarrative.headline}
              </h2>
              <p className="text-xs sm:text-sm max-w-3xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {statusNarrative.detail}
              </p>
            </div>
          </div>

          {/* Quick Direct Action on Top Incident */}
          {topIncident && (
            <div className="flex items-center space-x-2 w-full lg:w-auto justify-end flex-shrink-0">
              <button
                onClick={() => onOpenSimulator(topIncident)}
                className="px-4 py-2.5 rounded-xl font-bold text-xs text-white flex items-center space-x-2 shadow-lg transition-all hover:opacity-95"
                style={{ background: 'linear-gradient(135deg, #0284C7 0%, #00F0FF 100%)' }}
              >
                <Sliders className="w-4 h-4" />
                <span>Simulate Response & Mitigate</span>
              </button>

              <button
                onClick={() => onOpenCopilot(topIncident)}
                className="px-3.5 py-2.5 rounded-xl border text-xs font-semibold flex items-center space-x-1.5 transition-all"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Ask Copilot</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 2. Four Essential Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: City Security Status */}
        <div 
          className="p-5 rounded-3xl border transition-all hover:-translate-y-0.5"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', boxShadow: 'var(--card-shadow)' }}
        >
          <div className="flex items-center justify-between text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
            <span className="uppercase tracking-wider">Overall Posture</span>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold font-mono" style={{ color: cityHealth.color }}>
              {cityHealth.score}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: cityHealth.color }}>
              {cityHealth.level}
            </span>
          </div>
          <div className="mt-3 w-full bg-slate-800/60 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full transition-all duration-700 rounded-full" 
              style={{ width: `${cityHealth.score}%`, backgroundColor: cityHealth.color }}
            ></div>
          </div>
          <span className="text-[11px] block mt-2" style={{ color: 'var(--text-muted)' }}>
            Status: <strong className="text-white">{cityHealth.status}</strong>
          </span>
        </div>

        {/* Card 2: Monitored Assets */}
        <div 
          className="p-5 rounded-3xl border transition-all hover:-translate-y-0.5"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', boxShadow: 'var(--card-shadow)' }}
        >
          <div className="flex items-center justify-between text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
            <span className="uppercase tracking-wider">Monitored Assets</span>
            <Server className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white font-mono">{assets.length}</span>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Total Endpoints</span>
          </div>
          <div className="mt-3 flex items-center space-x-3 text-xs">
            <span className="text-emerald-400 font-bold">{cityHealth.healthyCount} Safe</span>
            <span className="text-slate-600">•</span>
            <span className="text-amber-400 font-bold">{cityHealth.warningCount} Warn</span>
            <span className="text-slate-600">•</span>
            <span className="text-red-400 font-bold">{cityHealth.criticalCount} Alert</span>
          </div>
          <button 
            onClick={() => setActiveTab('assets')}
            className="text-[11px] font-semibold text-cyan-400 hover:underline mt-2 flex items-center space-x-0.5"
          >
            <span>View Asset Grid & Map</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Card 3: Active Security Incidents */}
        <div 
          className="p-5 rounded-3xl border transition-all hover:-translate-y-0.5"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', boxShadow: 'var(--card-shadow)' }}
        >
          <div className="flex items-center justify-between text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
            <span className="uppercase tracking-wider">Active Incidents</span>
            <AlertTriangle className={`w-4 h-4 ${unresolvedIncidents.length > 0 ? 'text-red-400' : 'text-slate-500'}`} />
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white font-mono">{unresolvedIncidents.length}</span>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Under Response</span>
          </div>
          <div className="mt-3 text-xs">
            <span className="text-red-400 font-bold">
              {unresolvedIncidents.filter(i => i.severity === 'CRITICAL').length} Critical Priority
            </span>
          </div>
          <button 
            onClick={() => setActiveTab('incidents')}
            className="text-[11px] font-semibold text-cyan-400 hover:underline mt-2 flex items-center space-x-0.5"
          >
            <span>Open Incident Queue</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Card 4: Service Disruption Exposure */}
        <div 
          className="p-5 rounded-3xl border transition-all hover:-translate-y-0.5"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', boxShadow: 'var(--card-shadow)' }}
        >
          <div className="flex items-center justify-between text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
            <span className="uppercase tracking-wider">Public Impact</span>
            <ShieldAlert className="w-4 h-4 text-orange-400" />
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className={`text-2xl font-extrabold font-mono ${unresolvedIncidents.length > 0 ? 'text-orange-400' : 'text-emerald-400'}`}>
              {unresolvedIncidents.length > 0 ? 'ELEVATED' : 'MINIMAL'}
            </span>
          </div>
          <p className="mt-3 text-[11px] truncate" style={{ color: 'var(--text-secondary)' }}>
            {unresolvedIncidents.length > 0 
              ? topIncident.publicServiceImpact 
              : 'Zero civilian service disruption'}
          </p>
          <span className="text-[11px] block mt-2 text-cyan-400 font-mono">
            Service-Impact-Aware Triage
          </span>
        </div>
      </div>

      {/* 3. Most Important Active Incidents Ranked by Urgency (With ONE Clear Action Per Incident) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-cyan-400" />
              <span>Prioritized Incident Response Queue</span>
            </h3>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Ranked dynamically by public service disruption risk and asset criticality tier.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('incidents')}
            className="text-xs font-bold text-cyan-400 hover:underline flex items-center space-x-1"
          >
            <span>View All ({incidents.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {rankedIncidents.length === 0 ? (
          <div 
            className="p-8 text-center rounded-3xl border space-y-2"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
          >
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h4 className="text-sm font-bold text-white">No Active Incidents Pending Response</h4>
            <p className="text-xs max-w-md mx-auto" style={{ color: 'var(--text-muted)' }}>
              All 12 municipal infrastructure endpoints are nominal. Use the simulation controls below to evaluate threat detection and response.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {rankedIncidents.slice(0, 3).map((incident, idx) => {
              const isCritical = incident.severity === 'CRITICAL';
              const primaryAction = incident.recommendedActions?.[0] || {
                title: 'Execute Recommended Countermeasure',
                riskReduction: 35
              };

              return (
                <div
                  key={incident.id}
                  className="p-5 rounded-3xl border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  style={{ 
                    backgroundColor: 'var(--bg-card)', 
                    borderColor: isCritical ? 'rgba(239, 68, 68, 0.4)' : 'var(--border-color)',
                    boxShadow: 'var(--card-shadow)'
                  }}
                >
                  {/* Left: Incident info */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                        RANK #{idx + 1}
                      </span>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase ${
                        isCritical ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      }`}>
                        {incident.severity}
                      </span>
                      <span className="text-xs font-mono font-bold text-cyan-400">{incident.id}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs font-semibold text-slate-300">{incident.asset}</span>
                    </div>

                    <h4 className="text-base font-bold text-white">
                      {incident.scenario}
                    </h4>

                    <p className="text-xs leading-relaxed max-w-2xl line-clamp-1" style={{ color: 'var(--text-secondary)' }}>
                      <strong>Impact:</strong> {incident.publicServiceImpact}
                    </p>
                  </div>

                  {/* Right: One Clearly Labelled Next Action Button */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-shrink-0 w-full md:w-auto">
                    <button
                      onClick={() => onOpenSimulator(incident)}
                      className="px-4 py-2.5 rounded-xl font-bold text-xs text-white flex items-center justify-center space-x-1.5 shadow-md transition-all hover:opacity-95"
                      style={{ background: 'linear-gradient(135deg, #0284C7 0%, #00F0FF 100%)' }}
                      title="Launch What-If response simulator to approve containment"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Action: {primaryAction.title.slice(0, 32)}...</span>
                    </button>

                    <button
                      onClick={() => onOpenCopilot(incident)}
                      className="px-3 py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center space-x-1 transition-all"
                      style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Copilot</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Aggregated Citywide Citizen Cybercrime Trends Card */}
      <div 
        className="p-5 rounded-3xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        style={{ 
          backgroundColor: 'rgba(124, 58, 237, 0.05)', 
          borderColor: 'rgba(124, 58, 237, 0.25)' 
        }}
      >
        <div className="flex items-start space-x-3.5">
          <div className="p-2.5 rounded-2xl bg-purple-500/20 text-purple-400 flex-shrink-0 mt-0.5">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="text-sm font-bold text-white">Citywide Citizen Cybercrime Trends</h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 uppercase font-semibold">
                Anonymized Telemetry
              </span>
            </div>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
              Aggregated from citizen reports: <strong>48 active phishing attempts</strong> flagged this week (Electricity SMS: 58%, Fake UPI Payment: 26%, Account Compromises: 16%). Individual citizen reports remain strictly confidential.
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('analytics')}
          className="px-3.5 py-2 rounded-xl text-xs font-semibold text-purple-300 border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 transition-all flex items-center space-x-1 flex-shrink-0"
        >
          <span>View Trends</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 5. Visually Distinct Simulation Controls (Testbed Range) */}
      <div 
        className="p-5 rounded-3xl border space-y-3"
        style={{ 
          backgroundColor: 'var(--bg-card)', 
          borderColor: 'var(--border-color)',
          boxShadow: 'var(--card-shadow)'
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              🧪 CYBER RANGE SIMULATION CONTROLS (DEMO TESTBED)
            </h4>
          </div>
          <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
            Inject reproducible cyber threat scenarios to evaluate triage and response
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            onClick={() => onTriggerScenario('traffic')}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-sky-300 bg-sky-500/10 border border-sky-500/30 hover:bg-sky-500/20 transition-all flex items-center space-x-1.5"
          >
            <Navigation className="w-3.5 h-3.5 text-sky-400" />
            <span>Scenario 1: Traffic Signal Override</span>
          </button>

          <button
            onClick={() => onTriggerScenario('water')}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all flex items-center space-x-1.5"
          >
            <Droplets className="w-3.5 h-3.5 text-cyan-400" />
            <span>Scenario 2: Water SCADA Spoofing</span>
          </button>

          <button
            onClick={() => onTriggerScenario('servers')}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-purple-300 bg-purple-500/10 border border-purple-500/30 hover:bg-purple-500/20 transition-all flex items-center space-x-1.5"
          >
            <Server className="w-3.5 h-3.5 text-purple-400" />
            <span>Scenario 3: 911 CAD Server Intrusion</span>
          </button>

          <button
            onClick={onResetDemo}
            className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all flex items-center space-x-1.5 ml-auto"
            title="Reset city to clean baseline"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
}
