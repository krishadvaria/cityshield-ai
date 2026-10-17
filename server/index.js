// CityShield AI — Backend API Server
// Express.js REST API providing infrastructure telemetry, simulation triggers, and incident persistence.

import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Persistent Data Storage file
const DATA_FILE = path.join(__dirname, 'data', 'incidents.json');
const INITIAL_DATA_FILE = path.join(__dirname, 'data', 'initialData.json');

// Initialize database file if not present
function getDb() {
  if (!fs.existsSync(DATA_FILE)) {
    if (fs.existsSync(INITIAL_DATA_FILE)) {
      const initial = fs.readFileSync(INITIAL_DATA_FILE, 'utf-8');
      fs.writeFileSync(DATA_FILE, initial, 'utf-8');
    } else {
      const empty = JSON.stringify({ assets: [], incidents: [], timeline: [] }, null, 2);
      fs.writeFileSync(DATA_FILE, empty, 'utf-8');
    }
  }
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading JSON DB', e);
    return { assets: [], incidents: [], timeline: [] };
  }
}

function saveDb(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    console.error('Error writing to JSON DB', e);
  }
}

// --- Routes ---

// Health & Status
app.get('/api/status', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'CityShield AI Core API',
    mode: 'SIMULATED_CYBER_RANGE',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Assets Endpoints
app.get('/api/assets', (req, res) => {
  const db = getDb();
  res.json(db.assets || []);
});

app.get('/api/assets/:id', (req, res) => {
  const db = getDb();
  const asset = (db.assets || []).find(a => a.id === req.params.id);
  if (!asset) return res.status(404).json({ error: 'Asset not found' });
  res.json(asset);
});

app.patch('/api/assets/:id', (req, res) => {
  const db = getDb();
  const index = (db.assets || []).findIndex(a => a.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Asset not found' });

  db.assets[index] = { ...db.assets[index], ...req.body };
  saveDb(db);
  res.json(db.assets[index]);
});

// Incidents Endpoints
app.get('/api/incidents', (req, res) => {
  const db = getDb();
  res.json(db.incidents || []);
});

app.post('/api/incidents', (req, res) => {
  const db = getDb();
  const newIncident = {
    id: `INC-${Date.now().toString().slice(-6)}`,
    timestamp: new Date().toISOString(),
    status: 'OPEN',
    history: [
      {
        timestamp: new Date().toISOString(),
        status: 'OPEN',
        notes: 'Incident detected and logged by CityShield Detection Daemon.'
      }
    ],
    ...req.body
  };

  db.incidents = [newIncident, ...(db.incidents || [])];
  saveDb(db);
  res.status(201).json(newIncident);
});

app.post('/api/incidents/:id/acknowledge', (req, res) => {
  const db = getDb();
  const index = (db.incidents || []).findIndex(i => i.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Incident not found' });

  const operator = req.body.operator || 'City Operator';
  const now = new Date().toISOString();

  db.incidents[index].status = 'ACKNOWLEDGED';
  db.incidents[index].acknowledgedAt = now;
  db.incidents[index].operator = operator;
  db.incidents[index].history = db.incidents[index].history || [];
  db.incidents[index].history.push({
    timestamp: now,
    status: 'ACKNOWLEDGED',
    notes: `Acknowledged by ${operator}`
  });

  // Log timeline event
  db.timeline = db.timeline || [];
  db.timeline.unshift({
    id: `LOG-${Date.now().toString().slice(-6)}`,
    timestamp: now,
    sector: db.incidents[index].sector || 'all',
    eventType: 'INCIDENT_ACKNOWLEDGED',
    level: 'INFO',
    message: `Incident ${req.params.id} acknowledged by ${operator}. Containment underway.`,
    operator,
    incidentId: req.params.id
  });

  saveDb(db);
  res.json(db.incidents[index]);
});

app.post('/api/incidents/:id/resolve', (req, res) => {
  const db = getDb();
  const index = (db.incidents || []).findIndex(i => i.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Incident not found' });

  const operator = req.body.operator || 'City Operator';
  const notes = req.body.resolutionNotes || 'Remediated nominal';
  const now = new Date().toISOString();

  db.incidents[index].status = 'RESOLVED';
  db.incidents[index].resolvedAt = now;
  db.incidents[index].resolutionNotes = notes;
  db.incidents[index].history = db.incidents[index].history || [];
  db.incidents[index].history.push({
    timestamp: now,
    status: 'RESOLVED',
    notes: `Resolved by ${operator}: ${notes}`
  });

  // Restore asset status if associated
  const assetId = db.incidents[index].assetId;
  if (assetId) {
    const assetIdx = (db.assets || []).findIndex(a => a.id === assetId);
    if (assetIdx !== -1) {
      db.assets[assetIdx].status = 'normal';
      db.assets[assetIdx].lastEvent = `Incident ${req.params.id} remediated. Baseline parameters restored.`;
    }
  }

  // Log timeline event
  db.timeline = db.timeline || [];
  db.timeline.unshift({
    id: `LOG-${Date.now().toString().slice(-6)}`,
    timestamp: now,
    sector: db.incidents[index].sector || 'all',
    eventType: 'INCIDENT_RESOLVED',
    level: 'INFO',
    message: `Incident ${req.params.id} marked RESOLVED by ${operator}. Countermeasures verified.`,
    operator,
    incidentId: req.params.id
  });

  saveDb(db);
  res.json(db.incidents[index]);
});

// Timeline Endpoints
app.get('/api/timeline', (req, res) => {
  const db = getDb();
  res.json(db.timeline || []);
});

app.post('/api/timeline', (req, res) => {
  const db = getDb();
  const newEvent = {
    id: `LOG-${Date.now().toString().slice(-6)}`,
    timestamp: new Date().toISOString(),
    ...req.body
  };
  db.timeline = [newEvent, ...(db.timeline || [])].slice(0, 200);
  saveDb(db);
  res.status(201).json(newEvent);
});

// Analytics Dashboard Endpoint
app.get('/api/analytics', (req, res) => {
  const db = getDb();
  const incidents = db.incidents || [];
  const assets = db.assets || [];

  const sectorCounts = { traffic: 0, water: 0, lighting: 0, servers: 0 };
  const severityCounts = { CRITICAL: 0, HIGH: 0, MEDIUM: 0, LOW: 0 };
  const statusCounts = { OPEN: 0, ACKNOWLEDGED: 0, RESOLVED: 0 };

  incidents.forEach(inc => {
    if (sectorCounts[inc.sector] !== undefined) sectorCounts[inc.sector]++;
    if (severityCounts[inc.severity] !== undefined) severityCounts[inc.severity]++;
    if (statusCounts[inc.status] !== undefined) statusCounts[inc.status]++;
  });

  res.json({
    totalAssets: assets.length,
    totalIncidents: incidents.length,
    sectorDistribution: sectorCounts,
    severityDistribution: severityCounts,
    statusDistribution: statusCounts,
    activeCriticalCount: severityCounts.CRITICAL
  });
});

// Reset Demo / Restore Baseline Endpoint
app.post('/api/simulate/reset', (req, res) => {
  if (fs.existsSync(INITIAL_DATA_FILE)) {
    const initial = fs.readFileSync(INITIAL_DATA_FILE, 'utf-8');
    fs.writeFileSync(DATA_FILE, initial, 'utf-8');
  }
  res.json({ success: true, message: 'All systems restored to clean normal baseline.' });
});

// Start Express Listener
app.listen(PORT, () => {
  console.log(`[CityShield AI SOC Backend] running on http://localhost:${PORT}`);
  console.log(`[Mode] SIMULATED CYBER RANGE — Testbed for Critical Infrastructure Protection`);
});
