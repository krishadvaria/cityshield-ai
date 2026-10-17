// CityShield AI — Explainable Risk Engine
// Transparent, deterministic risk scoring algorithm (0 - 100)
// Evaluates Technical Severity, Asset Criticality, Public Service Impact, Urgency, and Detection Confidence.

export const RISK_WEIGHTS = {
  technicalSeverity: 0.25,      // Technical attack severity (CVSS/payload risk)
  assetCriticality: 0.25,       // Asset tier (Life safety / SCADA vs non-critical)
  publicServiceImpact: 0.25,    // Disruption to emergency services, water, mobility
  urgency: 0.15,                // Velocity of escalation / time before irreversible damage
  detectionConfidence: 0.10     // Multi-sensor corroboration vs anomaly noise
};

export const RISK_THRESHOLDS = {
  LOW: { min: 0, max: 39, label: 'LOW', color: '#10B981', textColor: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
  MEDIUM: { min: 40, max: 69, label: 'MEDIUM', color: '#F59E0B', textColor: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  HIGH: { min: 70, max: 84, label: 'HIGH', color: '#F97316', textColor: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30' },
  CRITICAL: { min: 85, max: 100, label: 'CRITICAL', color: '#EF4444', textColor: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' }
};

/**
 * Calculates a transparent, explainable risk score between 0 and 100.
 * @param {Object} params
 * @param {number} params.severityScore - 0 to 100 (Technical payload/exploit severity)
 * @param {number} params.assetImportance - 0 to 100 (Infrastructure tier: 95 for water/911, 40 for lighting)
 * @param {number} params.serviceDisruption - 0 to 100 (Potential loss of essential municipal functions)
 * @param {number} params.urgency - 0 to 100 (Escalation velocity)
 * @param {number} params.confidence - 0 to 100 (Corroborated evidence confidence)
 * @returns {Object} Comprehensive calculation breakdown
 */
export function calculateRiskScore({
  severityScore = 50,
  assetImportance = 50,
  serviceDisruption = 50,
  urgency = 50,
  confidence = 70
}) {
  // Clamp all inputs to [0, 100]
  const clampedSeverity = Math.min(100, Math.max(0, severityScore));
  const clampedAsset = Math.min(100, Math.max(0, assetImportance));
  const clampedDisruption = Math.min(100, Math.max(0, serviceDisruption));
  const clampedUrgency = Math.min(100, Math.max(0, urgency));
  const clampedConfidence = Math.min(100, Math.max(0, confidence));

  // Weighted factor calculations
  const severityContribution = clampedSeverity * RISK_WEIGHTS.technicalSeverity;
  const assetContribution = clampedAsset * RISK_WEIGHTS.assetCriticality;
  const disruptionContribution = clampedDisruption * RISK_WEIGHTS.publicServiceImpact;
  const urgencyContribution = clampedUrgency * RISK_WEIGHTS.urgency;
  const confidenceContribution = clampedConfidence * RISK_WEIGHTS.detectionConfidence;

  // Composite score sum
  const rawScore = severityContribution + assetContribution + disruptionContribution + urgencyContribution + confidenceContribution;
  const finalScore = Math.min(100, Math.max(0, Math.round(rawScore)));

  // Categorize threshold
  let level = RISK_THRESHOLDS.LOW;
  if (finalScore >= 85) {
    level = RISK_THRESHOLDS.CRITICAL;
  } else if (finalScore >= 70) {
    level = RISK_THRESHOLDS.HIGH;
  } else if (finalScore >= 40) {
    level = RISK_THRESHOLDS.MEDIUM;
  }

  // Generate transparent human-readable explanation
  const primaryDriver = getPrimaryRiskDriver({
    severityContribution,
    assetContribution,
    disruptionContribution,
    urgencyContribution,
    confidenceContribution
  });

  return {
    score: finalScore,
    level: level.label,
    color: level.color,
    textColor: level.textColor,
    bg: level.bg,
    border: level.border,
    breakdown: {
      technicalSeverity: {
        raw: clampedSeverity,
        weight: RISK_WEIGHTS.technicalSeverity,
        contribution: Math.round(severityContribution * 10) / 10,
        label: 'Technical Severity (Exploit Potential)'
      },
      assetCriticality: {
        raw: clampedAsset,
        weight: RISK_WEIGHTS.assetCriticality,
        contribution: Math.round(assetContribution * 10) / 10,
        label: 'Asset Importance (Life Safety & Tier)'
      },
      publicServiceImpact: {
        raw: clampedDisruption,
        weight: RISK_WEIGHTS.publicServiceImpact,
        contribution: Math.round(disruptionContribution * 10) / 10,
        label: 'Public Service Disruption Risk'
      },
      urgency: {
        raw: clampedUrgency,
        weight: RISK_WEIGHTS.urgency,
        contribution: Math.round(urgencyContribution * 10) / 10,
        label: 'Escalation Urgency & Time Sensitivity'
      },
      detectionConfidence: {
        raw: clampedConfidence,
        weight: RISK_WEIGHTS.detectionConfidence,
        contribution: Math.round(confidenceContribution * 10) / 10,
        label: 'Sensor Corroboration Confidence'
      }
    },
    formula: 'Score = (0.25 × Severity) + (0.25 × Asset Tier) + (0.25 × Public Impact) + (0.15 × Urgency) + (0.10 × Confidence)',
    primaryDriverExplanation: primaryDriver,
    disclaimer: 'Deterministic rule-based risk index for simulation triage. Not a validated statistical failure probability.'
  };
}

function getPrimaryRiskDriver(contributions) {
  const drivers = [
    { name: 'Public Service Disruption Risk', val: contributions.disruptionContribution, reason: 'High potential disruption to essential citizen life-support or transit flow.' },
    { name: 'Critical Infrastructure Tier', val: contributions.assetContribution, reason: 'Target is a Tier-1 municipal asset (Reservoir or 911 Dispatch).' },
    { name: 'Technical Attack Severity', val: contributions.severityContribution, reason: 'High-severity unauthorized remote command injection or privilege escalation.' },
    { name: 'Rapid Escalation Urgency', val: contributions.urgencyContribution, reason: 'Attack velocity requires swift mitigation before physical hardware damage occurs.' }
  ];

  drivers.sort((a, b) => b.val - a.val);
  return `Primary risk driver is ${drivers[0].name} (${drivers[0].val.toFixed(1)} pts) — ${drivers[0].reason}`;
}

/**
 * Calculates city-wide composite risk score across all active assets and incidents.
 */
export function calculateCityHealth(assets = [], incidents = []) {
  if (!assets.length) return { score: 10, status: 'NORMAL', activeIncidentsCount: 0 };

  const unresolvedIncidents = incidents.filter(inc => inc.status !== 'RESOLVED');
  
  if (unresolvedIncidents.length === 0) {
    return {
      score: 12,
      status: 'NORMAL',
      level: 'LOW',
      color: '#10B981',
      activeIncidentsCount: 0,
      healthyCount: assets.length,
      warningCount: 0,
      criticalCount: 0
    };
  }

  // Weight average of active incident risks plus max incident severity
  const maxIncidentRisk = Math.max(...unresolvedIncidents.map(i => i.riskScore || 50));
  const avgIncidentRisk = unresolvedIncidents.reduce((acc, i) => acc + (i.riskScore || 50), 0) / unresolvedIncidents.length;
  
  // Composite municipal posture (60% worst single point of failure, 40% aggregate incident load)
  const compositeScore = Math.min(100, Math.round((maxIncidentRisk * 0.65) + (avgIncidentRisk * 0.35)));

  let status = 'NORMAL';
  let color = '#10B981';
  let level = 'LOW';

  if (compositeScore >= 85) {
    status = 'DEFCON 1 / CRITICAL ALERT';
    color = '#EF4444';
    level = 'CRITICAL';
  } else if (compositeScore >= 70) {
    status = 'DEFCON 2 / ELEVATED THREAT';
    color = '#F97316';
    level = 'HIGH';
  } else if (compositeScore >= 40) {
    status = 'DEFCON 3 / ADVISORY';
    color = '#F59E0B';
    level = 'MEDIUM';
  }

  const healthyCount = assets.filter(a => a.status === 'normal').length;
  const warningCount = assets.filter(a => a.status === 'warning').length;
  const criticalCount = assets.filter(a => a.status === 'critical').length;

  return {
    score: compositeScore,
    status,
    level,
    color,
    activeIncidentsCount: unresolvedIncidents.length,
    healthyCount,
    warningCount,
    criticalCount
  };
}
