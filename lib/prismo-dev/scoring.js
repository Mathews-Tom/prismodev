function severityWeight(severity) {
  return severity === "critical" ? 10 : severity === "high" ? 6 : severity === "medium" ? 4 : 2;
}

function severityRank(severity) {
  return { critical: 0, high: 1, medium: 2, low: 3 }[severity] ?? 4;
}

function scoreScan(issues, stats, context = {}) {
  const issuePenalty = issues.reduce((sum, issue) => sum + severityWeight(issue.severity), 0);
  const repoPenalty =
    (stats.totalFiles > 2500 ? 4 : 0) +
    (stats.exposedLargeFiles > 10 ? 4 : 0) +
    (stats.exposedHighRiskDirs > 4 ? 4 : 0);
  const toolOutputPenalty = context.toolOutputRisk && context.toolOutputRisk.level === "High" ? 8 : context.toolOutputRisk && context.toolOutputRisk.level === "Medium" ? 4 : 0;
  const readinessCredit = context.agentReadiness && context.agentReadiness.localUsageLogsAvailable ? 3 : 0;
  const proxyCredit = context.proxyTrackingReadiness && context.proxyTrackingReadiness.exactApiTracking.available ? 2 : 0;

  let score = 100 - issuePenalty - repoPenalty - toolOutputPenalty + readinessCredit + proxyCredit;
  score = Math.max(0, Math.min(100, score));

  const risk = score >= 80 ? "Low" : score >= 55 ? "Medium" : "High";
  const avoidableWaste = risk === "Low" ? "5-15%" : risk === "Medium" ? "20-40%" : "40-65%";
  return { score, risk, avoidableWaste };
}

function getTopTokenLeaks(issues, limit = 5) {
  return [...issues]
    .sort((a, b) => severityRank(a.severity) - severityRank(b.severity))
    .slice(0, limit)
    .map((issue) => issue.title);
}

module.exports = {
  getTopTokenLeaks,
  scoreScan,
  severityRank,
  severityWeight,
};
