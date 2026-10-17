// CityShield AI — Local Browser Storage & State Persistence Manager
// Manages offline persistence for assets, active incidents, timeline logs, and demo states.

import { INITIAL_ASSETS } from '../data/mockAssets';
import { SIMULATION_SCENARIOS } from '../data/scenarios';

const STORAGE_KEYS = {
  ASSETS: 'cityshield_assets_v1',
  INCIDENTS: 'cityshield_incidents_v1',
  TIMELINE: 'cityshield_timeline_v1',
  DEMO_STATE: 'cityshield_demo_state_v1',
  GEMINI_KEY: 'cityshield_gemini_key_v1'
};

export const StorageService = {
  // --- Assets ---
  getAssets() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ASSETS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Storage read failed for assets, using initial baseline', e);
    }
    return INITIAL_ASSETS;
  },

  saveAssets(assets) {
    try {
      localStorage.setItem(STORAGE_KEYS.ASSETS, JSON.stringify(assets));
    } catch (e) {
      console.error('Failed to save assets to localStorage', e);
    }
  },

  updateAsset(assetId, partialUpdate) {
    const assets = this.getAssets();
    const updated = assets.map(a => (a.id === assetId ? { ...a, ...partialUpdate } : a));
    this.saveAssets(updated);
    return updated;
  },

  // --- Incidents ---
  getIncidents() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.INCIDENTS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Storage read failed for incidents, using default empty list', e);
    }
    return [];
  },

  saveIncidents(incidents) {
    try {
      localStorage.setItem(STORAGE_KEYS.INCIDENTS, JSON.stringify(incidents));
    } catch (e) {
      console.error('Failed to save incidents to localStorage', e);
    }
  },

  addIncident(incident) {
    const incidents = this.getIncidents();
    // Check if incident already exists by ID
    const exists = incidents.some(i => i.id === incident.id);
    const updated = exists
      ? incidents.map(i => (i.id === incident.id ? { ...i, ...incident } : i))
      : [incident, ...incidents];
    this.saveIncidents(updated);
    return updated;
  },

  updateIncidentStatus(incidentId, status, operatorNotes = '') {
    const incidents = this.getIncidents();
    const now = new Date().toISOString();
    const updated = incidents.map(inc => {
      if (inc.id === incidentId) {
        const history = inc.history || [];
        history.push({
          timestamp: now,
          status,
          notes: operatorNotes || `Status updated to ${status}`
        });
        return {
          ...inc,
          status,
          updatedAt: now,
          history
        };
      }
      return inc;
    });
    this.saveIncidents(updated);
    return updated;
  },

  // --- Timeline Audit Logs ---
  getTimeline() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TIMELINE);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Storage read failed for timeline', e);
    }
    // Default baseline events
    return [
      {
        id: 'LOG-001',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        sector: 'all',
        eventType: 'SYSTEM_BOOT',
        level: 'INFO',
        message: 'CityShield AI Security Operations Center initialized in SIMULATED ENVIRONMENT mode.',
        operator: 'System Daemon'
      },
      {
        id: 'LOG-002',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        sector: 'water',
        eventType: 'TELEMETRY_SYNC',
        level: 'INFO',
        message: 'Baseline cryptographic signature verified for 12 critical municipal assets.',
        operator: 'Automated OT Poller'
      }
    ];
  },

  saveTimeline(timeline) {
    try {
      localStorage.setItem(STORAGE_KEYS.TIMELINE, JSON.stringify(timeline));
    } catch (e) {
      console.error('Failed to save timeline to localStorage', e);
    }
  },

  addTimelineEvent({ sector = 'all', eventType, level = 'INFO', message, operator = 'City Operator', incidentId = null }) {
    const timeline = this.getTimeline();
    const newEvent = {
      id: `LOG-${Date.now().toString().slice(-6)}`,
      timestamp: new Date().toISOString(),
      sector,
      eventType,
      level,
      message,
      operator,
      incidentId
    };
    const updated = [newEvent, ...timeline].slice(0, 150); // Keep last 150 events
    this.saveTimeline(updated);
    return updated;
  },

  // --- Reset Entire Demo State ---
  resetAll() {
    try {
      localStorage.removeItem(STORAGE_KEYS.ASSETS);
      localStorage.removeItem(STORAGE_KEYS.INCIDENTS);
      localStorage.removeItem(STORAGE_KEYS.TIMELINE);
      localStorage.removeItem(STORAGE_KEYS.DEMO_STATE);
    } catch (e) {
      console.error('Failed to clear storage', e);
    }
    return {
      assets: INITIAL_ASSETS,
      incidents: [],
      timeline: this.getTimeline()
    };
  }
};
