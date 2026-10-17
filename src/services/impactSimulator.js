// CityShield AI — Service Impact Simulator (What-If Response Engine)
// Primary Hackathon Differentiator: Service-Impact-Aware Incident Response
// Models simulated municipal service degradation before and after operator-approved countermeasures.

/**
 * Calculates comparative impact metrics before and after an operator-approved response.
 * @param {Object} incident - The active security incident
 * @param {Array} selectedActionIds - Array of action IDs approved by the operator
 * @returns {Object} Comparative before vs after metrics with transparent assumptions
 */
export function simulateResponseImpact(incident, selectedActionIds = []) {
  if (!incident) {
    return null;
  }

  const baselineRisk = incident.riskScore || 75;
  const sector = incident.sector || 'traffic';
  const actions = incident.recommendedActions || [];

  // Calculate cumulative risk reduction based on operator selections
  let totalReduction = 0;
  const appliedActions = [];

  actions.forEach(action => {
    if (selectedActionIds.length === 0 || selectedActionIds.includes(action.id)) {
      totalReduction += (action.riskReduction || 20);
      appliedActions.push(action);
    }
  });

  // Calculate post-mitigation risk score (minimum floor of 12 for nominal background risk)
  const projectedRisk = Math.max(12, Math.round(baselineRisk - totalReduction));
  const riskReductionPct = Math.round(((baselineRisk - projectedRisk) / baselineRisk) * 100);

  // Sector-specific simulated public service indicators
  let beforeMetrics = {};
  let afterMetrics = {};
  let assumptions = [];

  if (sector === 'traffic') {
    beforeMetrics = {
      publicSafetyRisk: 84, // 0-100
      publicSafetyRiskLabel: 'SEVERE (Collision Hazard)',
      serviceAvailability: 35, // %
      emergencyDelayMinutes: 14.2, // min delay for ambulances
      estimatedHourlyLoss: '$42,500/hr',
      trafficCongestionIndex: '9.4 / 10 (Gridlock)'
    };
    afterMetrics = {
      publicSafetyRisk: 18,
      publicSafetyRiskLabel: 'LOW (Precautionary Flashing)',
      serviceAvailability: 88,
      emergencyDelayMinutes: 1.1,
      estimatedHourlyLoss: '$3,800/hr',
      trafficCongestionIndex: '3.1 / 10 (Controlled Flow)'
    };
    assumptions = [
      'Hardware failsafe switches traffic signals to flashing yellow on arterial corridors, eliminating orthogonal green conflict within 8 seconds.',
      'Ambulance rerouting via Broadway Corridor adds ~1.1 minutes compared to unobstructed optimal routing.',
      'Perimeter firewall isolation halts remote SNMP attacker packets, preventing further lateral phase changes.',
      'Economic impact is calculated based on downtown commercial transit delay estimates ($42.5k/hr idle lost productivity).'
    ];
  } else if (sector === 'water') {
    beforeMetrics = {
      publicSafetyRisk: 96,
      publicSafetyRiskLabel: 'CRITICAL (Water Quality & Rupture)',
      serviceAvailability: 20,
      emergencyDelayMinutes: 0,
      estimatedHourlyLoss: '$115,000/hr',
      trafficCongestionIndex: 'N/A (Potable Water Grid)',
      waterPressurePSI: 108,
      citizensAtRisk: '450,000 residents'
    };
    afterMetrics = {
      publicSafetyRisk: 14,
      publicSafetyRiskLabel: 'NOMINAL (Air-Gapped Manual)',
      serviceAvailability: 92,
      emergencyDelayMinutes: 0,
      estimatedHourlyLoss: '$2,400/hr',
      trafficCongestionIndex: 'N/A (Potable Water Grid)',
      waterPressurePSI: 54,
      citizensAtRisk: '0 (Safeguards Engaged)'
    };
    assumptions = [
      'Physical air-gap disconnects remote Modbus TCP attacker channel, forcing PLC to analog failsafe setpoints.',
      'Pressure relief valve activates immediately, dumping overpressure hydraulic shock waves before ASME pipe failure occurs.',
      'On-site water grab samples prevent erroneous public panic / boil-water notices by providing chemical verification.',
      'Avoids potential estimated $2.4M catastrophic pipe burst repair and civil liability.'
    ];
  } else if (sector === 'servers') {
    beforeMetrics = {
      publicSafetyRisk: 78,
      publicSafetyRiskLabel: 'HIGH (Dispatch Interruption Risk)',
      serviceAvailability: 45,
      emergencyDelayMinutes: 8.5,
      estimatedHourlyLoss: '$68,000/hr',
      trafficCongestionIndex: 'N/A (CAD Dispatch Queue: 48 calls)',
      dataExfiltrationRisk: 'CRITICAL (Port 5432 Probe)'
    };
    afterMetrics = {
      publicSafetyRisk: 15,
      publicSafetyRiskLabel: 'CONTROLLED (CAD Shielded)',
      serviceAvailability: 95,
      emergencyDelayMinutes: 0.2,
      estimatedHourlyLoss: '$1,500/hr',
      trafficCongestionIndex: 'N/A (CAD Dispatch Queue: 0 calls)',
      dataExfiltrationRisk: 'CONTAINED (SDN ACL Rule Active)'
    };
    assumptions = [
      'Kerberos ticket revocation immediately severs all active compromised privileged sessions.',
      'Software-Defined Network (SDN) microsegmentation drops unauthorized inbound traffic to 911 CAD database.',
      'Emergency 911 dispatch terminal traffic is preserved over dedicated encrypted management VLAN.',
      'Forensic memory snapshot safely captured for CISA/FBI reporting without taking dispatch offline.'
    ];
  } else {
    beforeMetrics = {
      publicSafetyRisk: 60,
      publicSafetyRiskLabel: 'MODERATE',
      serviceAvailability: 60,
      emergencyDelayMinutes: 4.0,
      estimatedHourlyLoss: '$12,000/hr'
    };
    afterMetrics = {
      publicSafetyRisk: 16,
      publicSafetyRiskLabel: 'LOW',
      serviceAvailability: 95,
      emergencyDelayMinutes: 0.5,
      estimatedHourlyLoss: '$800/hr'
    };
    assumptions = [
      'Standard incident containment protocol executed.',
      'Lateral perimeter isolation prevents secondary asset disruption.'
    ];
  }

  return {
    incidentId: incident.id,
    sector,
    baselineRisk,
    projectedRisk,
    riskDelta: baselineRisk - projectedRisk,
    riskReductionPct,
    appliedActions,
    before: beforeMetrics,
    after: afterMetrics,
    assumptions,
    disclaimer: 'Illustrative response simulation model for SOC decision support. All projections are heuristic estimates and do not represent validated physics or deterministic guarantees.'
  };
}
