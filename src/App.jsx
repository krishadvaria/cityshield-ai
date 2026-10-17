// CityShield AI — Root Application Coordinator
// Dual Portals: "Protect My City" (Municipal SOC) & "I Need Cyber Help" (Citizen Support)
// Cyber Samvad Hackathon 2026 — Problem Statement 4

import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import PortalGateway from './components/PortalGateway';
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
import CitizenHelpFlow from './components/CitizenPortal/CitizenHelpFlow';

import { ThemeProvider, useTheme } from './theme/themeContext';
import { ApiService } from './services/api';
import { StorageService } from './services/storage';
import { calculateCityHealth } from './services/riskEngine';
import { INITIAL_ASSETS } from './data/mockAssets';
import { SIMULATION_SCENARIOS } from './data/scenarios';
import { SYNTHETIC_SAMPLE_INCIDENTS } from './data/citizenData';

function MainApp() {
  // Navigation State: 'gateway' | 'management' | 'citizen'
  const [currentPortal, setCurrentPortal] = useState('gateway');
  // Management Tabs: 'overview' | 'assets' | 'incidents' | 'analytics'
  const [activeTab, setActiveTab] = useState('overview');

  // Municipal Datasets
  const [assets, setAssets] = useState(() => StorageService.getAssets());
  const [incidents, setIncidents] = useState(() => StorageService.getIncidents());
  const [timeline, setTimeline] = useState(() => StorageService.getTimeline());

  // Citizen Preloaded Sample State
  const [preloadedSample, setPreloadedSample] = useState(null);

  // Modals & Drawers
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

  // Compute overall city health dynamically
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

  const handleTrySampleCitizen = (sampleId) => {
    const sample = SYNTHETIC_SAMPLE_INCIDENTS.find(s => s.id === sampleId);
    setPreloadedSample(sample || null);
    setCurrentPortal('citizen');
  };

  // If on Gateway Screen
  if (currentPortal === 'gateway') {
    return (
      <>
        <PortalGateway
          onSelectPortal={(portal) => {
            setPreloadedSample(null);
            setCurrentPortal(portal);
          }}
          onTrySampleCitizen={handleTrySampleCitizen}
          onOpenGuide={() => setIsGuideModalOpen(true)}
        />

        <DemoGuideModal
          isOpen={isGuideModalOpen}
          onClose={() => setIsGuideModalOpen(false)}
          onTriggerScenario={(scen) => {
            handleTriggerScenario(scen);
            setCurrentPortal('management');
          }}
          onResetDemo={handleResetDemo}
        />
      </>
    );
  }

  return (
    <div 
      className="min-h-screen flex flex-col font-sans transition-colors duration-200"
      style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
    >
      {/* Top Navbar */}
      <Navbar
        currentPortal={currentPortal}
        onSwitchPortal={(p) => {
          setPreloadedSample(null);
          setCurrentPortal(p);
        }}
        onReturnToGateway={() => setCurrentPortal('gateway')}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cityHealth={cityHealth}
        onOpenCopilot={() => setIsCopilotOpen(true)}
        onOpenGuide={() => setIsGuideModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* CITIZEN PORTAL */}
        {currentPortal === 'citizen' && (
          <CitizenHelpFlow
            onBackToGateway={() => setCurrentPortal('gateway')}
            preloadedSample={preloadedSample}
          />
        )}

        {/* MANAGEMENT PORTAL (Organized by Progressive Disclosure) */}
        {currentPortal === 'management' && (
          <>
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
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

            {/* TAB 2: CITY ASSETS & MAP */}
            {activeTab === 'assets' && (
              <div className="space-y-6">
                <CityMap
                  assets={assets}
                  incidents={incidents}
                  onSelectAsset={(asset) => setSelectedAsset(asset)}
                  selectedAssetId={selectedAsset?.id}
                />
              </div>
            )}

            {/* TAB 3: INCIDENTS */}
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

            {/* TAB 4: ANALYTICS & AUDIT TIMELINE */}
            {activeTab === 'analytics' && (
              <div className="space-y-8">
                <AnalyticsView
                  incidents={incidents}
                  assets={assets}
                  onOpenRiskModal={handleOpenRiskModal}
                />
                
                <div className="pt-6 border-t" style={{ borderColor: 'var(--border-color)' }}>
                  <IncidentTimeline
                    timeline={timeline}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer 
        className="border-t py-6 px-4 text-xs text-center space-y-2"
        style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}
      >
        <div className="flex flex-wrap items-center justify-center gap-4">
          <span className="font-bold" style={{ color: 'var(--text-secondary)' }}>
            CityShield AI — Cyber Samvad Hackathon 2026
          </span>
          <span>•</span>
          <span>Adani University & Demmisto Technologies</span>
          <span>•</span>
          <span className="font-mono text-cyan-400">Problem Statement 4: Critical Infrastructure & Citizen Protection</span>
        </div>
        <p className="text-[11px] max-w-2xl mx-auto">
          Simulated Cyber Range & Decision Support Prototype. All citizen incidents are processed locally in your session. Synthetic infrastructure telemetry only.
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
        onTriggerScenario={(scen) => {
          handleTriggerScenario(scen);
          setCurrentPortal('management');
        }}
        onResetDemo={handleResetDemo}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
