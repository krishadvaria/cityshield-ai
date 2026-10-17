// CityShield AI — Copilot Diagnostic Engine
// Rule-based deterministic diagnostic assistant + optional Gemini API hook
// Compliant with NIST SP 800-61 Rev. 2 & CISA Cross-Sector Cybersecurity Performance Goals

/**
 * Generates an executive and technical diagnostic explanation for any incident.
 * Uses deterministic expert rules by default, clearly labeled.
 */
export function generateIncidentCopilotReport(incident, asset = null) {
  if (!incident) {
    return {
      source: 'Deterministic Rule Engine (Fallback)',
      timestamp: new Date().toISOString(),
      summary: 'No active incident selected. Select an incident from the Incident Manager or City Map to generate an AI-style diagnostic.',
      sections: []
    };
  }

  const assetName = asset ? asset.name : (incident.asset || 'Target Infrastructure Asset');
  const sector = asset ? asset.sector : (incident.sector || 'Municipal Infrastructure');
  const risk = incident.riskScore || 75;
  const severity = incident.severity || 'HIGH';

  // Sector-specific intelligence heuristics
  let whatHappened = '';
  let whyFlagged = '';
  let publicServiceImpact = '';
  let urgencyAnalysis = '';
  let primaryCheck = '';
  let recommendedPlaybook = [];
  let blastRadius = '';
  let cisaReference = '';

  if (sector === 'traffic' || incident.scenario?.includes('TRAFFIC')) {
    whatHappened = `Simulated unauthorized configuration overwrite detected on ${assetName}. Signal phase cycle times were maliciously manipulated via unauthenticated SNMP write commands, causing conflicting green phases at major downtown intersections.`;
    whyFlagged = `The traffic conflict monitor triggered a Green-Green safety lockout flag. NTP time drift exceeded nominal threshold (+14.2s), violating NTCIP 1202 arterial synchronization standards.`;
    publicServiceImpact = `Vehicular gridlock affecting central transit corridors, high risk of orthogonal T-bone collisions at Main & 5th, and complete obstruction of Emergency Ambulance Route #3 to Metro Hospital.`;
    urgencyAnalysis = `HIGH (Estimated 6–10 minutes before gridlock halts first responder emergency vehicles).`;
    primaryCheck = `Verify physical conflict monitor hardware status in field cabinet; confirm whether local fail-safe flasher relay tripped automatically.`;
    recommendedPlaybook = [
      'Command field controllers to hardware fail-safe (Flashing Yellow on arterial, Flashing Red on cross-street).',
      'Sever remote perimeter SNMP management routing (VLAN 240) to stop attacker script execution.',
      'Notify Police and Emergency Medical Services dispatch to reroute emergency vehicles to Broadway Corridor.',
      'Dispatch field technician with cryptographic console cable to perform manual firmware checksum audit.'
    ];
    blastRadius = `Sector: Downtown Core (Radius: 1.8 miles). 8 connected intersections, 12 pedestrian crossing signals, and 2 designated hospital transit corridors.`;
    cisaReference = `NIST SP 800-82r3 (OT/ICS Security) & CISA CPG 2.E (Field Asset Separation).`;
  } else if (sector === 'water' || incident.scenario?.includes('WATER')) {
    whatHappened = `Modbus TCP register spoofing and unauthorized actuator override detected on ${assetName}. Attacker injected unauthenticated Function 16 commands to holding registers, forcing chemical dosing pumps and pressure valves to hazardous extremes while masking telemetry on operator screens.`;
    whyFlagged = `Mathematical anomaly: Chlorine dosage telemetry diverged from physical reservoir inflow rates. Hydraulic pressure sensor jumped +50 PSI within 12 seconds, exceeding physical fluid-dynamic boundaries without corresponding operator command.`;
    publicServiceImpact = `Risk of chemical over-chlorination or pathogenic water distribution to 450,000 residents in Central & South Districts. Severe hydraulic pressure surge threatens to cause catastrophic water-hammer pipe rupture along hospital supply line.`;
    urgencyAnalysis = `CRITICAL (Estimated 15–20 minutes before line pressure exceeds ASME pipe pressure threshold of 120 PSI).`;
    primaryCheck = `Immediately examine physical pressure relief bypass gauge at Reservoir Pump Station 4B and perform manual colorimetric chlorine grab sample.`;
    recommendedPlaybook = [
      'Activate OT physical network air-gap switch at Reservoir substation to isolate PLC-01 from WAN.',
      'Engage mechanical pressure-relief bypass valve to vent excess line pressure down to 55 PSI.',
      'Dispatch water utility chemist to verify chlorine residual manually before issuing public health boil-water advisories.',
      'Verify PLC firmware integrity against baseline cryptographic hash (SHA-256) to ensure no persistent ladder logic rootkit.'
    ];
    blastRadius = `Sector: Central Basin & South District (Population: ~450,000). Water distribution grid, 3 regional hospitals, and 14 industrial cooling plants.`;
    cisaReference = `EPA Water Sector Cybersecurity Guidance & CISA Cross-Sector OT Performance Goals (CPG 1.C, 2.B).`;
  } else if (sector === 'servers' || incident.scenario?.includes('SERVERS')) {
    whatHappened = `Credential stuffing and lateral movement detected targeting ${assetName}. More than 480 failed SSH authentication attempts within 60 seconds were followed by privileged session establishment and port-scanning directed at the 911 Emergency Computer-Aided Dispatch (CAD) database.`;
    whyFlagged = `Volumetric authentication failure threshold exceeded (>100x baseline). User account 'svc-muni-sync' executed unquoted service paths and probed TCP port 5432 (PostgreSQL CAD database) from an unauthorized IP.`;
    publicServiceImpact = `Imminent threat of municipal ransomware deployment, citizen PII extortion, and potential shutdown or manipulation of 911 emergency dispatch CAD operations.`;
    urgencyAnalysis = `CRITICAL (Attacker currently executing reconnaissance; lateral compromise expected within 8–15 minutes).`;
    primaryCheck = `Check active Kerberos tickets and verify whether any admin sessions have authenticated to the CAD database host (10.10.9.11).`;
    recommendedPlaybook = [
      'Invalidate all active Kerberos TGT tokens and lock compromised service account `svc-muni-sync`.',
      'Apply dynamic microsegmentation firewall ACL blocking all ingress to 911 CAD server except verified dispatch terminals.',
      'Take memory snapshot (RAM capture) of infected DC host for forensic analysis before reboot.',
      'Activate off-site immutable backup cluster to ensure municipal continuity.'
    ];
    blastRadius = `Sector: City Hall Datacenter & Public Safety Infrastructure. Municipal administration, 911 Computer-Aided Dispatch, and citizen tax portals.`;
    cisaReference = `CISA Known Exploited Vulnerabilities (KEV) Catalog & NIST SP 800-61 Rev. 2 Computer Security Incident Handling Guide.`;
  } else {
    // General infrastructure incident fallback
    whatHappened = `Anomalous activity detected on ${assetName}. Telemetry parameters deviate from nominal baseline tolerances.`;
    whyFlagged = incident.detectionReason || `Automated heuristic threshold triggered on monitored telemetry stream.`;
    publicServiceImpact = incident.publicServiceImpact || `Potential degradation of municipal service delivery in local zone.`;
    urgencyAnalysis = `${severity} (Review required by SOC operator).`;
    primaryCheck = `Verify physical network connectivity and inspect local device event log.`;
    recommendedPlaybook = [
      'Acknowledge incident to log operator assignment.',
      'Inspect device network connections and drop unauthenticated external sessions.',
      'Conduct hardware loopback and sensor calibration checks.'
    ];
    blastRadius = `Sector: Local zone. Estimated impact confined to sub-controller perimeter.`;
    cisaReference = `NIST Cybersecurity Framework (CSF 2.0) - Detect & Respond Functions.`;
  }

  return {
    source: 'Rule-Based Diagnostic Engine (Deterministic Heuristics)',
    isAiGenerated: false,
    confidenceLabel: 'High Deterministic Alignment (100% Reproducible)',
    timestamp: new Date().toISOString(),
    incidentId: incident.id,
    targetAsset: assetName,
    riskScore: risk,
    severity: severity,
    sections: [
      {
        title: '1. What Happened?',
        content: whatHappened,
        icon: 'AlertCircle'
      },
      {
        title: '2. Why Was It Flagged?',
        content: whyFlagged,
        icon: 'Eye'
      },
      {
        title: '3. Public Service Impact',
        content: publicServiceImpact,
        icon: 'Users'
      },
      {
        title: '4. Urgency & Time Sensitivity',
        content: urgencyAnalysis,
        icon: 'Clock'
      },
      {
        title: '5. What Should the Operator Check First?',
        content: primaryCheck,
        icon: 'CheckSquare'
      },
      {
        title: '6. Recommended Safe Playbook',
        list: recommendedPlaybook,
        icon: 'ShieldCheck'
      },
      {
        title: '7. Blast Radius Assessment',
        content: blastRadius,
        icon: 'Radar'
      },
      {
        title: '8. Cybersecurity Framework Alignment',
        content: cisaReference,
        icon: 'Bookmark'
      }
    ]
  };
}

/**
 * Handles conversational inquiries from the operator inside the Copilot side drawer.
 * Answers common operator questions deterministically.
 */
export function queryCopilotKnowledge(query, incident = null, asset = null) {
  const q = query.toLowerCase();

  if (q.includes('blast radius') || q.includes('spread') || q.includes('who is affected')) {
    if (incident?.sector === 'traffic') {
      return {
        answer: 'Blast Radius: 1.8 mile downtown gridlock radius. 8 signalized intersections, 12 pedestrian crossings, and Emergency Ambulance Route #3. If not mitigated within 10 minutes, cascade delay will congest the Harbor Expressway corridor.',
        source: 'Rule-Based Heuristic Model'
      };
    } else if (incident?.sector === 'water') {
      return {
        answer: 'Blast Radius: High-consequence regional impact. Central reservoir supplies 450,000 citizens. Pressure surges over 100 PSI threaten pipe ruptures across South District, including the main dedicated water intake for Metro Hospital.',
        source: 'Rule-Based Heuristic Model'
      };
    } else if (incident?.sector === 'servers') {
      return {
        answer: 'Blast Radius: Enterprise municipal network. Attacker is scanning toward 911 CAD Dispatch database (10.10.9.11). Risk of municipal-wide ransomware lockout and emergency call handling downtime.',
        source: 'Rule-Based Heuristic Model'
      };
    }
    return {
      answer: 'Blast Radius: Monitored asset perimeter and immediate network neighbors. Isolate subnet routing to prevent lateral propagation.',
      source: 'Rule-Based Heuristic Model'
    };
  }

  if (q.includes('priority') || q.includes('why water') || q.includes('score')) {
    return {
      answer: 'CityShield AI prioritizes incidents using Service-Impact-Aware Risk Scoring. Water SCADA has an Asset Criticality Weight of 0.95 (life safety, clean drinking water), whereas streetlights have 0.45. Even identical attack severities produce a much higher score for water infrastructure due to potential civilian casualties and contamination.',
      source: 'Rule-Based Heuristic Model'
    };
  }

  if (q.includes('nist') || q.includes('cisa') || q.includes('compliance')) {
    return {
      answer: 'All recommended countermeasures align with CISA Cross-Sector Cybersecurity Performance Goals (CPGs) and NIST SP 800-61 Rev. 2. Responses prioritize fail-safe physical isolation, human verification, and zero disruption to civilian life safety.',
      source: 'Rule-Based Heuristic Model'
    };
  }

  if (q.includes('mitigat') || q.includes('action') || q.includes('contain') || q.includes('playbook')) {
    return {
      answer: 'Recommended Containment Sequence: 1) Hardware/Subnet isolation (cut off attacker command stream), 2) Fail-safe transition (flashing yellow for traffic, manual analog for water), 3) Dispatch field technicians for manual verification, 4) Forensic image preservation.',
      source: 'Rule-Based Heuristic Model'
    };
  }

  return {
    answer: `Operator Guidance: For incident ${incident ? incident.id : 'N/A'}, adhere strictly to the approved Standard Operating Procedure. Never execute unverified automated write commands to industrial PLCs. Maintain continuous voice contact with field supervisors.`,
    source: 'Rule-Based Heuristic Model'
  };
}
