// CityShield AI — Root Application Coordinator
// Cyber Samvad Hackathon 2026 — Problem Statement 4: Critical Infrastructure Protection

import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import CommandCenter from './components/CommandCenter';
import CityMap from './components/CityMap';
import ThreatMonitor from './components/ThreatMonitor';
import IncidentManager from './components/IncidentManager';
import AnalyticsView from './components/AnalyticsView';
import IncidentTimeline from './components/IncidentTimeline';
import ImpactSimulatorModal from './components/ImpactSimulatorModal';
import CopilotDrawer from './components/CopilotDrawer';
import AssetDetailModal from './components/AssetDetailModal';
import RiskBreakdownModal from './components/RiskBreakdownModal';
import DemoGuideModal from './components/DemoGuideModal';

import { ApiService } from './services/api';
import { StorageService } from './services/storage';
import { calculateCityHealth } from './services/riskEngine';
import { INITIAL_ASSETS } from './data/mockAssets';
import { SIMULATION_SCENARIOS } from './data/scenarios';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [assets, setAssets] = useState(() => StorageService.getAssets());
  const [incidents, setIncidents] = useState(() => StorageService.getIncidents());
  const [timeline, setTimeline] = useState(() => StorageService.getTimeline());

  // Modal States
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [simulatorIncident, setSimulatorIncident] = useState(null);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isRiskModalOpen, setIsRiskModalOpen] = useState(false);
  const [activeRiskBreakdown, setActiveRiskBreakdown] = useState(null);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);

  // Sync with backend API on mount
  useEffect(() => {
    async function loadData() {
      try {
        const loadedAssets = await ApiService.getAssets();
        const loadedIncidents = await ApiService.getIncidents();
        if (loadedAssets && loadedAssets.length > 0) setAssets(loadedAssets);
        if (loadedIncidents) setIncidents(loadedIncidents);
      } catch (e) {
        console.warn('Initial backend fetch offline, using local storage state', e);
      }
    }
    loadData();
  }, []);

  // Compute overall city health and threat level dynamically
  const cityHealth = useMemo(() => {
    return calculateCityHealth(assets, incidents);
  }, [assets, incidents]);

  // --- Handlers ---
  const handleTriggerScenario = async (scenarioKey) => {
    const res = await ApiService.triggerScenario(scenarioKey);
    if (res && res.success) {
      const updatedAssets = StorageService.getAssets();
      const updatedIncidents = StorageService.getIncidents();
      const updatedTimeline = StorageService.getTimeline();

      setAssets(updatedAssets);
      setIncidents(updatedIncidents);
      setTimeline(updatedTimeline);

      if (res.incident) {
        setSelectedIncident(res.incident);
      }
    }
  };

  const handleResetDemo = () => {
    const cleanState = StorageService.resetAll();
    setAssets(cleanState.assets);
    setIncidents([]);
    setTimeline(cleanState.timeline);
    setSelectedIncident(null);
    setSelectedAsset(null);
  };

  const handleAcknowledge = async (incidentId, operator) => {
    await ApiService.acknowledgeIncident(incidentId, operator);
    setIncidents(StorageService.getIncidents());
    setTimeline(StorageService.getTimeline());
  };

  const handleResolve = async (incidentId, operator, notes) => {
    await ApiService.resolveIncident(incidentId, operator, notes);
    
    // Find incident to restore affected asset status
    const targetInc = incidents.find(i => i.id === incidentId);
    if (targetInc && targetInc.assetId) {
      StorageService.updateAsset(targetInc.assetId, {
        status: 'normal',
        lastEvent: `Remediated by ${operator} — Normal operational baseline restored.`
      });
      setAssets(StorageService.getAssets());
    }

    setIncidents(StorageService.getIncidents());
    setTimeline(StorageService.getTimeline());
  };

  const handleApproveResponse = (incidentId, actionIds) => {
    const targetInc = incidents.find(i => i.id === incidentId);
    if (!targetInc) return;

    // Apply approved mitigations: mark incident resolved, restore asset
    handleResolve(
      incidentId, 
      'City Operator (Response Approved)', 
      `Operator approved and applied ${actionIds.length} simulated countermeasures.`
    );
  };

  const handleToggleIsolation = (assetId) => {
    const target = assets.find(a => a.id === assetId);
    if (!target) return;

    const newIsolated = !target.isolated;
    const updated = StorageService.updateAsset(assetId, {
      isolated: newIsolated,
      lastEvent: newIsolated 
        ? '[OPERATOR LOCKDOWN] Hardware air-gap isolation engaged.' 
        : '[OPERATOR RESTORE] Subnet routing re-established.'
    });

    StorageService.addTimelineEvent({
      sector: target.sector,
      eventType: newIsolated ? 'ASSET_ISOLATED' : 'ASSET_RECONNECTED',
      level: newIsolated ? 'WARN' : 'INFO',
      message: `Operator ${newIsolated ? 'engaged physical air-gap isolation for' : 'reconnected subnet routing for'} ${target.name} (${target.id}).`
    });

    setAssets(updated);
    setTimeline(StorageService.getTimeline());
    setSelectedAsset(prev => (prev ? { ...prev, isolated: newIsolated } : null));
  };

  const handleOpenRiskModal = (breakdown = null) => {
    setActiveRiskBreakdown(breakdown || incidents[0]?.riskBreakdown || null);
    setIsRiskModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cityHealth={cityHealth}
        onTriggerScenario={handleTriggerScenario}
        onResetDemo={handleResetDemo}
        onOpenCopilot={() => setIsCopilotOpen(true)}
        onOpenGuide={() => setIsGuideModalOpen(true)}
      />

      {/* Main Content View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && (
          <CommandCenter
            assets={assets}
            incidents={incidents}
            cityHealth={cityHealth}
            onSelectAsset={(asset) => setSelectedAsset(asset)}
            onSelectIncident={(incident) => {
              setSelectedIncident(incident);
              setActiveTab('incidents');
            }}
            onOpenSimulator={(incident) => setSimulatorIncident(incident)}
            onOpenCopilot={(incident) => {
              setSelectedIncident(incident);
              setIsCopilotOpen(true);
            }}
            onTriggerScenario={handleTriggerScenario}
            onResetDemo={handleResetDemo}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'map' && (
          <CityMap
            assets={assets}
            incidents={incidents}
            onSelectAsset={(asset) => setSelectedAsset(asset)}
            selectedAssetId={selectedAsset?.id}
          />
        )}

        {activeTab === 'threats' && (
          <ThreatMonitor
            incidents={incidents}
            assets={assets}
            onSelectIncident={(incident) => {
              setSelectedIncident(incident);
              setActiveTab('incidents');
            }}
            onSelectAsset={(asset) => setSelectedAsset(asset)}
            onOpenSimulator={(incident) => setSimulatorIncident(incident)}
            onOpenCopilot={(incident) => {
              setSelectedIncident(incident);
              setIsCopilotOpen(true);
            }}
          />
        )}

        {activeTab === 'incidents' && (
          <IncidentManager
            incidents={incidents}
            assets={assets}
            selectedIncident={selectedIncident}
            setSelectedIncident={setSelectedIncident}
            onAcknowledge={handleAcknowledge}
            onResolve={handleResolve}
            onOpenSimulator={(incident) => setSimulatorIncident(incident)}
            onOpenCopilot={(incident) => {
              setSelectedIncident(incident);
              setIsCopilotOpen(true);
            }}
            onOpenRiskModal={handleOpenRiskModal}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView
            incidents={incidents}
            assets={assets}
            onOpenRiskModal={handleOpenRiskModal}
          />
        )}

        {activeTab === 'timeline' && (
          <IncidentTimeline
            timeline={timeline}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-6 px-4 text-xs text-slate-500 text-center space-y-2">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <span className="font-semibold text-slate-400">CityShield AI — Prototype for Cyber Samvad Hackathon 2026</span>
          <span className="text-slate-700">•</span>
          <span>Organized by Adani University & Demmisto Technologies</span>
          <span className="text-slate-700">•</span>
          <span className="text-cyan-400 font-mono">Problem Statement 4: Critical Infrastructure Protection</span>
        </div>
        <p className="text-[11px] text-slate-600 max-w-2xl mx-auto">
          Simulated Cyber Range & Operational Decision Support System. Synthetic data only — does not connect to or control live municipal hardware.
        </p>
      </footer>

      {/* Modals & Drawers */}
      <ImpactSimulatorModal
        isOpen={!!simulatorIncident}
        onClose={() => setSimulatorIncident(null)}
        incident={simulatorIncident}
        onApproveResponse={handleApproveResponse}
      />

      <CopilotDrawer
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        incident={selectedIncident || incidents[0] || null}
        asset={assets.find(a => a.id === (selectedIncident?.assetId || incidents[0]?.assetId)) || null}
      />

      <AssetDetailModal
        isOpen={!!selectedAsset}
        onClose={() => setSelectedAsset(null)}
        asset={selectedAsset}
        onToggleIsolation={handleToggleIsolation}
      />

      <RiskBreakdownModal
        isOpen={isRiskModalOpen}
        onClose={() => setIsRiskModalOpen(false)}
        riskBreakdown={activeRiskBreakdown}
      />

      <DemoGuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
        onTriggerScenario={handleTriggerScenario}
        onResetDemo={handleResetDemo}
      />
    </div>
  );
}
