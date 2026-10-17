// CityShield AI — Threat Simulation Scenarios Engine
// Three deterministic demonstration scenarios + Baseline Normal Operations
// Designed for Cyber Samvad Hackathon 2026

export const SIMULATION_SCENARIOS = {
  baseline: {
    id: 'SCENARIO-00-BASELINE',
    name: 'Normal Operations (Baseline)',
    category: 'Normal',
    sector: 'all',
    targetAssetId: null,
    targetAssetName: 'All Municipal Systems',
    severity: 'LOW',
    initialRiskScore: 12,
    badgeColor: 'emerald',
    description: 'All municipal services operating within nominal tolerances. Telemetry streams and cryptographic handshakes normal.',
    detectionReason: 'Continuous baseline monitoring: zero active anomalies across NTCIP, Modbus, CoAP, and Kerberos logs.',
    publicServiceImpact: 'Optimal: Transit flowing, potable water pressure stable at 58 PSI, emergency dispatch queue latency < 150ms.',
    eventLogs: [
      { id: 'EVT-B01', offset: -180, source: 'NTCIP-Master', level: 'INFO', message: 'Traffic signal phase synchronization verified across all 12 downtown controllers.' },
      { id: 'EVT-B02', offset: -120, source: 'SCADA-Watchdog', level: 'INFO', message: 'Central reservoir chlorine residual 1.2 ppm — automated dosing pump cycle nominal.' },
      { id: 'EVT-B03', offset: -60, source: 'Kerberos-KDC', level: 'INFO', message: 'Municipal core datacenter single-sign-on token renewals passing standard security checks.' }
    ]
  },

  traffic: {
    id: 'SCENARIO-01-TRAFFIC',
    name: 'Downtown Arterial Signal Grid Compromise',
    category: 'Traffic Signals',
    sector: 'traffic',
    targetAssetId: 'ASSET-TRF-01',
    targetAssetName: 'Downtown Arterial Signal Controller',
    severity: 'HIGH',
    initialRiskScore: 78,
    badgeColor: 'red',
    detectionReason: 'Unauthorized remote configuration overwrite via forged NTCIP 1202 SNMP packet; cycle timers forced into conflicting 90-second all-green states along orthogonal 5th Ave and Main St.',
    publicServiceImpact: 'Immediate vehicular gridlock, catastrophic intersection collision risk, and complete obstruction of Emergency Ambulance Route #3.',
    vulnerabilityVector: 'CVE-2024-NTCIP-Sim (Weak default community string in legacy NTCIP field gateway)',
    urgency: 'HIGH',
    confidence: 'CONFIRMED',
    recommendedActions: [
      {
        id: 'ACT-TRF-01',
        title: 'Force Local Hardware Failsafe (Flashing Yellow / All-Red)',
        description: 'Send manual hardware override command to shift local conflict monitors to flashing yellow/red precautionary mode.',
        riskReduction: 38,
        safetyImpact: 'Eliminates T-bone collision hazards immediately; reduces transit speed safely.'
      },
      {
        id: 'ACT-TRF-02',
        title: 'Isolate Signal Controller Subnet (VLAN 240)',
        description: 'Sever remote IP routing to the field gateway at the perimeter firewall to prevent further malicious SNMP commands.',
        riskReduction: 25,
        safetyImpact: 'Stops attacker lateral movement into North Expressway controllers.'
      },
      {
        id: 'ACT-TRF-03',
        title: 'Reroute Emergency Ambulances to Secondary Corridor',
        description: 'Automate transit priority alert to EMS Dispatch to steer units via Broadway Corridor.',
        riskReduction: 15,
        safetyImpact: 'Restores emergency medical response times to under 6 minutes.'
      }
    ],
    telemetryChanges: {
      cycleTime: 'OVERRIDE: 90s All-Green (Conflict!)',
      phaseDrift: 'CRITICAL: +14.2s desync',
      networkPackets: '1,840 pps (Abnormal burst)',
      connectedSensors: 16
    },
    eventLogs: [
      { id: 'EVT-T01', offset: -90, source: 'Edge-Gateway-240', level: 'WARN', message: 'Unauthenticated SNMP write request received from external IP 198.51.100.44.' },
      { id: 'EVT-T02', offset: -45, source: 'Conflict-Monitor-TS2', level: 'CRITICAL', message: 'Hardware conflict detection: Green-Green condition detected on Channel 2 & Channel 6.' },
      { id: 'EVT-T03', offset: -10, source: 'CityShield-Detector', level: 'HIGH', message: 'RULE MATCH [TRF-ALERT-04]: Signal phase timing desync exceeds safety threshold (>2.0s).' }
    ]
  },

  water: {
    id: 'SCENARIO-02-WATER',
    name: 'Reservoir SCADA Sensor Spoofing & Pressure Anomaly',
    category: 'Water SCADA',
    sector: 'water',
    targetAssetId: 'ASSET-WTR-01',
    targetAssetName: 'Central Reservoir SCADA PLC-01',
    severity: 'CRITICAL',
    initialRiskScore: 92,
    badgeColor: 'red',
    detectionReason: 'Modbus TCP function code 16 (Write Multiple Registers) injection detected without corresponding HMI operator action; holding registers 40102 and 40108 manipulated to falsify chlorine sensor telemetry while commanding booster pump bypass valve to 100% capacity.',
    publicServiceImpact: 'Potential over-chlorination or microbial breakout affecting 450,000 residents, coupled with imminent South Aqueduct pipe rupture due to 110 PSI water hammer surge.',
    vulnerabilityVector: 'Unauthenticated Modbus/TCP protocol flaw exploited via infected contractor laptop on OT subnet.',
    urgency: 'CRITICAL',
    confidence: 'HIGH',
    recommendedActions: [
      {
        id: 'ACT-WTR-01',
        title: 'Engage Physical OT Network Air-Gap Switch',
        description: 'Isolate SCADA PLC-01 from municipal WAN; transition reservoir control to manual analog field panel.',
        riskReduction: 42,
        safetyImpact: 'Terminates remote Modbus tampering instantly; locks physical actuators at safe defaults.'
      },
      {
        id: 'ACT-WTR-02',
        title: 'Dispatch On-Site Water Quality Inspection Team',
        description: 'Trigger immediate automated technician dispatch for manual grab-sample chlorine/pH chemical titrations.',
        riskReduction: 28,
        safetyImpact: 'Validates potable water safety before public boil-water advisory is required.'
      },
      {
        id: 'ACT-WTR-03',
        title: 'Throttling Aqueduct Booster Pump 4B to Safe 45 PSI',
        description: 'Activate local emergency pressure release valve to dissipate hydraulic shock waves.',
        riskReduction: 22,
        safetyImpact: 'Prevents $2.4M catastrophic main line pipe burst under metropolitan hospital.'
      }
    ],
    telemetryChanges: {
      phLevel: '8.92 (Abnormal spike)',
      chlorineResidual: '4.8 ppm (Toxic threshold risk!)',
      waterPressure: '108 PSI (Critical Overpressure)',
      inflowRate: '3,850 gpm (Surge)'
    },
    eventLogs: [
      { id: 'EVT-W01', offset: -110, source: 'Modbus-Firewall', level: 'WARN', message: 'Anomalous write command: Modbus Function 16 sent to PLC holding register 40102 (Chlorine Dosing).' },
      { id: 'EVT-W02', offset: -55, source: 'Sensor-Analytic', level: 'HIGH', message: 'Telemetry divergence: Pressure sensor delta exceeds physical hydraulic model limits (+50 PSI in 12s).' },
      { id: 'EVT-W03', offset: -15, source: 'CityShield-SCADA', level: 'CRITICAL', message: 'RULE MATCH [WTR-ALERT-01]: High-consequence critical asset telemetry anomaly with unverified origin.' }
    ]
  },

  servers: {
    id: 'SCENARIO-03-SERVERS',
    name: 'Municipal Core Credential Stuffing & Lateral Movement',
    category: 'City Servers',
    sector: 'servers',
    targetAssetId: 'ASSET-SRV-01',
    targetAssetName: 'City Hall Municipal Datacenter Core',
    severity: 'HIGH',
    initialRiskScore: 84,
    badgeColor: 'red',
    detectionReason: 'Distributed credential stuffing attack (>450 failed SSH/Kerberos authentications/min) followed by successful privileged session token creation and lateral port-scanning toward 911 Dispatch CAD database (Port 5432).',
    publicServiceImpact: 'Threat of municipal ransomware lockout, citizen PII exfiltration, and disruption of emergency 911 dispatch records.',
    vulnerabilityVector: 'Compromised administrative credentials without enforced FIDO2 MFA on legacy web administrative portal.',
    urgency: 'HIGH',
    confidence: 'HIGH',
    recommendedActions: [
      {
        id: 'ACT-SRV-01',
        title: 'Revoke Active Kerberos TGTs & Force Password Reset',
        description: 'Invalidate all enterprise tokens issued in past 4 hours; lock compromised service accounts `svc-muni-sync`.',
        riskReduction: 35,
        safetyImpact: 'Instantly expels active attacker session and stops unauthorized database dump.'
      },
      {
        id: 'ACT-SRV-02',
        title: 'Enforce Microsegmentation Isolation Rule for 911 CAD',
        description: 'Apply immediate SDN firewall drop rule blocking all ingress traffic to CAD database except approved dispatch terminals.',
        riskReduction: 32,
        safetyImpact: 'Shields mission-critical 911 first responder dispatch systems from lateral compromise.'
      },
      {
        id: 'ACT-SRV-03',
        title: 'Capture RAM Volatile Forensic Image & Quarantine',
        description: 'Trigger agent-based memory dump for malware artifact extraction and CISA incident logging.',
        riskReduction: 17,
        safetyImpact: 'Preserves legal chain of custody and uncovers persistence mechanisms.'
      }
    ],
    telemetryChanges: {
      cpuLoad: '94% (Cryptominer/Exfiltration spike)',
      memoryUsed: '88%',
      activeSessions: 142,
      failedLoginsPastHour: 624
    },
    eventLogs: [
      { id: 'EVT-S01', offset: -140, source: 'SSH-AuthLog', level: 'WARN', message: 'Brute-force velocity: 480 failed authentication attempts against root/admin accounts from 45.33.32.156.' },
      { id: 'EVT-S02', offset: -60, source: 'EDR-Agent-DC1', level: 'CRITICAL', message: 'Privileged execution detected: powershell.exe invoking unquoted service path with elevated tokens.' },
      { id: 'EVT-S03', offset: -20, source: 'CityShield-Core', level: 'HIGH', message: 'RULE MATCH [SRV-ALERT-09]: Lateral movement probe detected from Web-Tier toward CAD Emergency DB.' }
    ]
  }
};
