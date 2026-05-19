const VALUE_FLAGS = new Set(["--limit", "--interval", "--budget", "--proxy-url", "--usage-tool"]);

function parsePositiveInt(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function parseTokenBudget(value) {
  const raw = String(value || "").trim().toLowerCase();
  if (!raw) return null;
  const match = raw.match(/^(\d+(?:\.\d+)?)(k|m)?$/);
  if (!match) return null;
  const amount = Number.parseFloat(match[1]);
  const multiplier = match[2] === "m" ? 1000000 : match[2] === "k" ? 1000 : 1;
  const parsed = Math.round(amount * multiplier);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

function getOptionValue(args, flag) {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : null;
}

function getPositionals(args, valueFlags = VALUE_FLAGS) {
  const values = [];
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (valueFlags.has(arg)) {
      i += 1;
      continue;
    }
    if (!arg.startsWith("-")) values.push(arg);
  }
  return values;
}

function isScopeToken(value) {
  return /^[a-zA-Z0-9][a-zA-Z0-9_-]{1,40}$/.test(String(value || ""));
}

function parseScopeAndTarget(args, valueFlags = VALUE_FLAGS) {
  const positional = getPositionals(args, valueFlags);
  if (!positional.length) return { scope: null, target: null };
  if (positional.length >= 2 && isScopeToken(positional[0])) {
    return { scope: positional[0].toLowerCase(), target: positional[1] || null };
  }
  if (isScopeToken(positional[0]) && ![".", ".."].includes(positional[0])) {
    return { scope: positional[0].toLowerCase(), target: null };
  }
  return { scope: null, target: positional[0] || null };
}

function parseCli(argv) {
  const [command = null, ...rest] = argv;
  const flags = {
    auto: rest.includes("--auto"),
    ci: rest.includes("--ci"),
    dryRun: rest.includes("--dry-run"),
    fix: rest.includes("--fix"),
    json: rest.includes("--json"),
    noReport: rest.includes("--no-report"),
    once: rest.includes("--once"),
    report: rest.includes("--report"),
    rescue: rest.includes("--rescue"),
    simple: rest.includes("--simple"),
    usage: rest.includes("--usage"),
  };
  const values = {
    budget: getOptionValue(rest, "--budget"),
    interval: getOptionValue(rest, "--interval"),
    intervalMs: parsePositiveInt(getOptionValue(rest, "--interval"), 3) * 1000,
    limit: getOptionValue(rest, "--limit"),
    proxyUrl: getOptionValue(rest, "--proxy-url"),
    tokenBudget: parseTokenBudget(getOptionValue(rest, "--budget")),
    usageTool: getOptionValue(rest, "--usage-tool"),
  };
  return {
    command,
    rest,
    flags,
    values,
    positionals: getPositionals(rest),
    scopeTarget: parseScopeAndTarget(rest),
  };
}

module.exports = {
  getOptionValue,
  getPositionals,
  parseCli,
  parsePositiveInt,
  parseScopeAndTarget,
  parseTokenBudget,
};
