// CityShield AI — Resilient API Client Bridge
// Transparently handles backend communication with automatic offline fallback to StorageService.

import { StorageService } from './storage';
import { SIMULATION_SCENARIOS } from '../data/scenarios';
import { calculateRiskScore, calculateCityHealth } from './riskEngine';

const API_BASE = '/api';

export const ApiService = {
  // --- Check Backend Status ---
  async getStatus() {
    try {
      const res = await fetch(`${API_BASE}/status`, { signal: AbortSignal.timeout(1200) });
      if (res.ok) return await res.json();
    } catch (e) {
      // Backend not running, use local mode
    }
    return { status: 'ONLINE', mode: 'CLIENT_STORAGE_FALLBACK', simulated: true };
  },

  // --- Assets ---
  async getAssets() {
    try {
      const res = await fetch(`${API_BASE}/assets`, { signal: AbortSignal.timeout(1200) });
      if (res.ok) {
        const data = await res.json();
        StorageService.saveAssets(data);
        return data;
      }
    } catch (e) {
      // Fallback
    }
    return StorageService.getAssets();
  },

  async updateAsset(assetId, partial) {
    try {
      const res = await fetch(`${API_BASE}/assets/${assetId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(partial),
        signal: AbortSignal.timeout(1200)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      // Fallback
    }
    return StorageService.updateAsset(assetId, partial);
  },

  // --- Incidents ---
  async getIncidents() {
    try {
      const res = await fetch(`${API_BASE}/incidents`, { signal: AbortSignal.timeout(1200) });
      if (res.ok) {
        const data = await res.json();
        StorageService.saveIncidents(data);
        return data;
      }
    } catch (e) {
      // Fallback
    }
    return StorageService.getIncidents();
  },

  async acknowledgeIncident(incidentId, operator = 'City Operator (Admin)') {
    try {
      const res = await fetch(`${API_BASE}/incidents/${incidentId}/acknowledge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operator }),
        signal: AbortSignal.timeout(1200)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      // Fallback
    }
    StorageService.addTimelineEvent({
      sector: 'all',
      eventType: 'INCIDENT_ACKNOWLEDGED',
      level: 'INFO',
      message: `Incident ${incidentId} acknowledged by ${operator}. Triage in progress.`,
      operator,
      incidentId
    });
    return StorageService.updateIncidentStatus(incidentId, 'ACKNOWLEDGED', `Acknowledged by ${operator}`);
  },

  async resolveIncident(incidentId, operator = 'City Operator (Admin)', resolutionNotes = 'Countermeasures verified nominal') {
    try {
      const res = await fetch(`${API_BASE}/incidents/${incidentId}/resolve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operator, resolutionNotes }),
        signal: AbortSignal.timeout(1200)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      // Fallback
    }
    StorageService.addTimelineEvent({
      sector: 'all',
      eventType: 'INCIDENT_RESOLVED',
      level: 'INFO',
      message: `Incident ${incidentId} marked RESOLVED by ${operator}. Notes: ${resolutionNotes}`,
      operator,
      incidentId
    });
    return StorageService.updateIncidentStatus(incidentId, 'RESOLVED', resolutionNotes);
  },

  // --- Simulation Triggers ---
  async triggerScenario(scenarioKey) {
    const scenario = SIMULATION_SCENARIOS[scenarioKey];
    if (!scenario) return null;

    if (scenarioKey === 'baseline') {
      // Clean slate
      StorageService.resetAll();
      StorageService.addTimelineEvent({
        sector: 'all',
        eventType: 'SIMULATION_RESET',
        level: 'INFO',
        message: 'Normal baseline restored across all monitored infrastructure.'
      });
      return { success: true, scenario: 'baseline' };
    }

    // Build realistic incident object
    const incidentId = `INC-${Date.now().toString().slice(-6)}`;
    const now = new Date().toISOString();
    
    // Calculate explainable risk score
    const riskScoreResult = calculateRiskScore({
      severityScore: scenario.severity === 'CRITICAL' ? 95 : 80,
      assetImportance: scenario.sector === 'water' ? 95 : (scenario.sector === 'servers' ? 90 : 85),
      serviceDisruption: scenario.sector === 'water' ? 92 : (scenario.sector === 'traffic' ? 82 : 88),
      urgency: 85,
      confidence: 90
    });

    const newIncident = {
      id: incidentId,
      timestamp: now,
      scenarioKey,
      scenario: scenario.name,
      sector: scenario.sector,
      assetId: scenario.targetAssetId,
      asset: scenario.targetAssetName,
      severity: scenario.severity,
      riskScore: riskScoreResult.score,
      riskBreakdown: riskScoreResult,
      description: scenario.description || scenario.detectionReason,
      detectionReason: scenario.detectionReason,
      publicServiceImpact: scenario.publicServiceImpact,
      vulnerabilityVector: scenario.vulnerabilityVector,
      recommendedActions: scenario.recommendedActions,
      telemetryChanges: scenario.telemetryChanges,
      status: 'OPEN', // OPEN | ACKNOWLEDGED | MITIGATING | RESOLVED
      history: [
        {
          timestamp: now,
          status: 'OPEN',
          notes: 'Automated threat detection rule triggered.'
        }
      ]
    };

    // Update target asset status to critical/warning
    if (scenario.targetAssetId) {
      StorageService.updateAsset(scenario.targetAssetId, {
        status: scenario.severity === 'CRITICAL' ? 'critical' : 'warning',
        telemetry: {
          ...scenario.telemetryChanges
        },
        lastEvent: `[ALERT] ${scenario.detectionReason}`
      });
    }

    // Save incident to storage
    StorageService.addIncident(newIncident);

    // Record timeline audit log
    StorageService.addTimelineEvent({
      sector: scenario.sector,
      eventType: 'THREAT_DETECTED',
      level: scenario.severity === 'CRITICAL' ? 'CRITICAL' : 'HIGH',
      message: `CYBER THREAT SIMULATION TRIGGERED: ${scenario.name} targeting ${scenario.targetAssetName} (Risk Score: ${riskScoreResult.score}/100)`,
      operator: 'CityShield Detection Daemon',
      incidentId
    });

    return {
      success: true,
      incident: newIncident
    };
  }
};
