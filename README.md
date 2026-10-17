# CityShield AI — Intelligent Cyber Defense for Smart Cities

**Cyber Samvad Hackathon 2026** | **Problem Statement 4: Smart City & Critical Infrastructure Cybersecurity**  
*Organized by Adani University and Demmisto Technologies*

---

## 1. Executive Summary & Mission

Modern smart cities integrate IoT sensors, NTCIP traffic controllers, Modbus/DNP3 water SCADA systems, and municipal enterprise networks into unified digital grids. While this improves efficiency, it exposes critical public infrastructure to coordinated cyber threats.

**CityShield AI** is an AI-assisted Security Operations Center (SOC) decision-support platform designed to help municipal operators **detect, understand, prioritize, and respond** to cyber incidents. 

### The Primary Differentiator: Service-Impact-Aware Incident Response
Traditional SOC platforms prioritize alerts purely by technical CVSS scores (e.g. vulnerability exploitability). CityShield AI shifts the paradigm by scoring and ranking incidents according to **potential public service disruption**:
- An attack on a municipal web portal may have a high CVSS score, but minimal immediate citizen life-safety impact.
- An attack on a potable water reservoir SCADA pump or an emergency 911 dispatch database poses immediate civilian casualties and city-wide paralysis.
- CityShield AI dynamically weights **life-safety, utility continuity, and emergency response delay** into every triage decision.

---

## 2. Complete End-to-End Workflow

```
[Normal Operations] 
       ↓
[Cyber Threat Injected (Traffic / Water / Servers)]
       ↓
[Multi-Protocol Anomaly Detection]
       ↓
[Explainable Service-Impact Risk Scoring (0–100)]
       ↓
[CityShield Copilot Playbook & Blast Radius Triage]
       ↓
[Interactive What-If Impact Simulator (Before vs. After Preview)]
       ↓
[Operator Human-in-the-Loop Countermeasure Authorization]
       ↓
[Automated Subnet Containment & Failsafe Execution]
       ↓
[Incident Safely Resolved & Immutable Audit Trail Logged]
```

---

## 3. Key Features

1. **Cybersecurity Command Center (SOC Dashboard):**
   - Professional dark-navy theme (`#070B14`, `#0B1120`) with cyan, teal, and amber status indicators.
   - Live monitored infrastructure KPIs: 12 assets across 4 municipal sectors.
   - City Threat Gauge (DEFCON 1/2/3/Normal) reflecting real-time municipal risk.
   - Clear badge distinguishing simulated testbed telemetry from live infrastructure.

2. **Interactive Smart City Map (SVG Schematic):**
   - Stylized fictional metropolis map featuring the Downtown Civic Core, North Industrial Gateway, Reservoir River Basin, and Harbor Port.
   - Color-coded operational nodes (Nominal Green, Warning Amber, Critical Red with pulsing radar rings).
   - Click-to-inspect asset telemetry, protocol specifications, firmware versions, and physical air-gap lockdown controls.

3. **Three Reproducible Threat Simulation Scenarios:**
   - **Scenario 1 — Traffic Signal Network Compromise:**
     - Exploits NTCIP 1202 SNMP write commands to force conflicting all-green phases at 5th Ave & Main St, inducing gridlock and blocking Emergency Ambulance Route #3.
   - **Scenario 2 — Water Infrastructure SCADA Anomaly:**
     - Simulates Modbus TCP register injection (Function 16) falsifying chlorine dosing telemetry while commanding pump bypass valves to 108 PSI overpressure, threatening water-hammer pipe bursts.
   - **Scenario 3 — Municipal Core Server Intrusion:**
     - Simulates credential stuffing brute force against Kerberos/SSH followed by privileged lateral movement toward the 911 Emergency Computer-Aided Dispatch (CAD) database.

4. **Transparent, Explainable Risk Engine (0–100):**
   - Clear mathematical formula:
     $$\text{Risk Score} = (0.25 \times \text{Severity}) + (0.25 \times \text{Asset Tier}) + (0.25 \times \text{Public Impact}) + (0.15 \times \text{Urgency}) + (0.10 \times \text{Confidence})$$
   - Dedicated Formula Transparency modal showing factor weights, contributions, and CISA severity bands.

5. **Innovative Feature — What-If Service Impact Response Simulator:**
   - Evaluates the simulated trade-offs of proposed countermeasures before executing them.
   - Side-by-side comparison of **Before Response (Status Quo)** vs. **After Approved Response**.
   - Computes Public Safety Risk (84% -> 18%), Service Availability (35% -> 88%), Ambulance Delay (14.2 min -> 1.1 min), and Hourly Economic Loss ($42.5k -> $3.8k).

6. **CityShield Copilot (AI-Style Incident Explainer):**
   - Rule-based deterministic expert system aligned with **NIST SP 800-61 Rev. 2** and **CISA Cross-Sector Cybersecurity Performance Goals (CPGs)**.
   - Answers the 6 core operator questions: What happened? Why was it flagged? Which public service is affected? How urgent is it? What to check first? What is the safe playbook?
   - Interactive quick-query prompts (Blast radius, Priority explanation, Playbooks).
   - Optional client-side Gemini API key hook for enhanced natural language synthesis.

7. **Incident Management Workbench & Timeline Audit Trail:**
   - Full operator lifecycle: Acknowledge alert, record notes, execute containment steps, mark resolved.
   - Chronological audit log with export options to **JSON** and **CSV** for regulatory compliance reporting.

---

## 4. System Architecture

```
cityshield-ai/
├── package.json                 # Project dependencies & scripts
├── vite.config.js               # Vite bundler configuration & /api proxy
├── tailwind.config.js           # SOC dark theme styling palette & glowing utilities
├── index.html                   # HTML5 entry with JetBrains Mono & Inter typography
├── server/
│   ├── index.js                 # Express.js REST API (Port 3001)
│   └── data/
│       ├── initialData.json     # Clean baseline state of 12 assets & sectors
│       └── incidents.json       # Persistent JSON store for runtime incidents & audit logs
└── src/
    ├── main.jsx                 # React 18 DOM mount point
    ├── App.jsx                  # Master state coordinator & view router
    ├── index.css                # Tailwind directives & cyber grid animations
    ├── data/
    │   ├── mockAssets.js        # 12 Smart City Assets across 4 sectors
    │   └── scenarios.js         # Deterministic scenario definitions & event streams
    ├── services/
    │   ├── api.js               # Resilient API client with seamless offline fallback
    │   ├── storage.js           # LocalStorage persistence & audit log engine
    │   ├── riskEngine.js        # Mathematical risk scoring & city health calculation
    │   ├── impactSimulator.js   # What-If response simulation before/after metrics
    │   └── copilotEngine.js     # Rule-based diagnostic expert system & Q&A
    └── components/
        ├── Navbar.jsx           # SOC header, live clock, threat gauge, demo controls
        ├── CommandCenter.jsx    # Executive overview cards & sector telemetry
        ├── CityMap.jsx          # Interactive SVG schematic city map
        ├── ThreatMonitor.jsx    # Anomaly event stream & threat triage
        ├── IncidentManager.jsx  # Incident lifecycle workbench & operator notes
        ├── AnalyticsView.jsx    # Recharts dynamic analytics & trend graphs
        ├── IncidentTimeline.jsx # Audit trail with CSV/JSON export
        ├── ImpactSimulatorModal.jsx # What-If response comparison modal
        ├── CopilotDrawer.jsx    # CityShield Copilot diagnostic drawer
        ├── AssetDetailModal.jsx # Asset telemetry & air-gap lockdown modal
        ├── RiskBreakdownModal.jsx # Mathematical formula inspector
        └── DemoGuideModal.jsx   # 6-step presentation walkthrough for judges
```

---

## 5. Prerequisites & Quick Start Guide

### Prerequisites
- Operating System: Windows 10/11, macOS, or Linux
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Step 1: Install Dependencies
Open your terminal (PowerShell, Command Prompt, or bash) in the project folder:
```powershell
cd C:\Users\DELL\Desktop\cityshield-ai
npm install
```

### Step 2: Start the Application
You can run the full prototype in either single or dual-service mode:

**Frontend Development Server (with automatic in-browser simulation):**
```powershell
npm run dev
```
Open your browser to: **`http://localhost:5173`**

**Optional Express Backend API Server (Port 3001):**
In a separate terminal window:
```powershell
npm run server
```

> **Resilient Architecture Note:** The frontend includes an automatic offline bridge. If the Express backend is not running, the application automatically persists all incidents, asset changes, and audit logs inside local browser `localStorage`, guaranteeing a 100% crash-free demonstration.

---

## 6. Six-Step Hackathon Demonstration Script (For Evaluators)

1. **Step 1 — Baseline Inspection:**
   - Look at the **Command Center**. All 12 assets are healthy (Green). The City Threat Level is `NORMAL (12/100)`. Potable water pressure is nominal at 58 PSI.
2. **Step 2 — Inject Scenario 2 (Water SCADA Spoofing):**
   - In the top navigation bar, click **Simulate Attack** -> **2. Water SCADA Spoofing**.
   - Notice the City Threat Level instantly shifts to `DEFCON 1 / CRITICAL ALERT (92/100)`.
3. **Step 3 — Interactive Map & Telemetry:**
   - Click the **Smart City Map** tab. Locate `ASSET-WTR-01` (Central Reservoir SCADA PLC-01) pulsing in red.
   - Click the node to open the Asset Detail Modal. Notice the anomalous 108 PSI hydraulic pressure surge and manipulated Modbus registers.
4. **Step 4 — Explainable Risk & Copilot:**
   - Click the **Formula** button or **Score: 92/100**. Review the mathematical breakdown explaining why life-safety exposure drove the score to 92.
   - Open **Copilot** in the header. Review the 8 structured diagnostic sections explaining what happened, why it was flagged, and the NIST/CISA playbook.
5. **Step 5 — What-If Service Impact Response Simulator (Our Differentiator):**
   - Click **Simulate Impact & Actions**.
   - View the side-by-side comparison: Public Safety Risk drops from **96% (Critical)** to **14% (Nominal)**; citizens at risk drops from 450,000 to 0.
   - Click **Approve & Apply Simulated Countermeasures**.
6. **Step 6 — Resolution & Audit Compliance:**
   - Return to the **Command Center**. The reservoir is restored to normal green.
   - Click **Audit Timeline** to show the timestamped record of the attack, operator approval, and containment. Click **Export CSV** to demonstrate compliance reporting.

---

## 7. Limitations & Future Roadmap

- **Simulated Testbed:** All telemetry is synthetic and calculated using deterministic heuristic models. No live municipal equipment is connected or altered.
- **Future Improvements:**
  - Integration with hardware-in-the-loop (HIL) physical testbeds using open-source Modbus/DNP3 emulators (e.g. ScadaBR).
  - Integration with municipal GIS shapefiles for live geospatial mapping.
  - Integration of automated SOAR playbooks via Webhooks into municipal ticketing systems (e.g. Jira / ServiceNow).

---

## 8. Suggested 6-Slide Hackathon Presentation Outline

- **Slide 1 — Title & Mission:** CityShield AI: Intelligent Cyber Defense for Smart Cities. (Cyber Samvad 2026, Problem Statement 4).
- **Slide 2 — The Problem:** Modern cities are digital battlegrounds. Traditional IT security tools ignore public service impacts, treating an administrative server attack the same as a water supply hack.
- **Slide 3 — The Innovation:** Service-Impact-Aware Triage & What-If Response Simulator. Prioritizing citizen life-safety over technical CVSS scores.
- **Slide 4 — Architecture & Explainability:** Multi-protocol correlation (NTCIP, Modbus, CoAP, Kerberos) with transparent 5-factor risk scoring (0–100) and NIST/CISA aligned Copilot.
- **Slide 5 — Live Demonstration:** 3 Scenarios (Traffic, Water, Servers), before/after impact comparison, human-in-the-loop operator approval, and audit trail export.
- **Slide 6 — Impact & Scalability:** Zero paid APIs, deployable offline, modular architecture ready for smart city command centers.

---

## 9. Top 5 Questions from Hackathon Judges & Model Answers

### Q1: Why not rely solely on traditional CVSS scores for incident triage?
**Answer:** CVSS measures technical vulnerability exploitability, not municipal consequence. A high-CVSS vulnerability on an isolated library Wi-Fi server is far less dangerous to human life than a medium-severity anomaly on a municipal water reservoir PLC. CityShield AI incorporates an Asset Criticality and Public Service Disruption multiplier into its scoring engine to prioritize citizen life-safety first.

### Q2: Is the AI Copilot safe to deploy in critical infrastructure?
**Answer:** Yes, because CityShield AI is strictly **decision-support**, not autonomous control. We enforce human-in-the-loop authorization for all simulated actions. Furthermore, our Copilot defaults to a deterministic, rule-based expert system grounded in NIST SP 800-61 and CISA playbooks, eliminating LLM hallucination risks in high-consequence environments.

### Q3: What happens if an operator takes no action during an ongoing attack?
**Answer:** Our What-If Service Impact Simulator models the compounding cascade failure of inaction. For instance, in Scenario 1 (Traffic Grid), delaying response past 10 minutes expands gridlock from 8 intersections to the Harbor Expressway, paralyzing emergency ambulance dispatch and inflicting an estimated $42,500/hr in economic productivity losses.

### Q4: How does CityShield AI distinguish between equipment malfunction and a cyber attack?
**Answer:** Through multi-signal heuristic correlation. In Scenario 2 (Water SCADA), a mechanical pump valve failure causes gradual pressure variation. However, CityShield detects an unauthenticated Modbus Function 16 write command originating from an unauthorized contractor IP that simultaneously falsifies chlorine sensor readings while commanding 108 PSI overpressure—a signature characteristic of an intentional cyber attack.

### Q5: Can CityShield AI run in air-gapped municipal environments without internet access?
**Answer:** Absolutely. CityShield AI is completely self-contained. It requires zero cloud databases, zero paid APIs, and zero external subscriptions. The entire frontend, rule engine, risk calculator, and simulation testbed run locally in the browser or on an on-premise municipal workstation.

---

## 10. License & Disclaimers

Developed for educational and competition purposes at **Cyber Samvad Hackathon 2026**.  
*Disclaimer: CityShield AI operates strictly in a simulated cyber range environment using synthetic data. It does not perform actual network vulnerability scanning, exploit generation, or physical hardware control.*
