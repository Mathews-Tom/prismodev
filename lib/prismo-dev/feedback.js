module.exports = function createFeedback(deps) {
  const {
    fs,
    os,
    path,
  } = deps;

function detectRepoType(root) {
  const markers = [
    ["Node.js", "package.json"],
    ["Python", "pyproject.toml"],
    ["Python", "requirements.txt"],
    ["Go", "go.mod"],
    ["Rust", "Cargo.toml"],
  ];
  const found = markers.filter(([, file]) => fs.existsSync(path.join(root, file))).map(([name]) => name);
  return Array.from(new Set(found)).join(", ") || "";
}

function runFeedback(rootDir = process.cwd()) {
  const root = path.resolve(rootDir);
  return {
    schemaVersion: 1,
    command: "feedback",
    generatedAt: new Date().toISOString(),
    scannedPath: root,
    repoType: detectRepoType(root),
    os: `${os.type()} ${os.release()}`,
    fields: {
      toolUsed: "",
      commandsCompleted: {
        "scan --usage --no-report": "",
        setup: "",
        "watch --once": "",
      },
      useful: "",
      confusing: "",
      expectedNext: "",
    },
  };
}

function renderFeedbackTerminal(packet) {
  return [
    "PrismoDev Feedback Packet",
    "",
    `Repo type: ${packet.repoType}`,
    "Tool used:",
    `OS: ${packet.os}`,
    "",
    "Commands completed:",
    "- scan --usage --no-report:",
    "- setup:",
    "- watch --once:",
    "",
    "Useful:",
    "Confusing:",
    "Expected next:",
  ].join("\n");
}

  return {
    renderFeedbackTerminal,
    runFeedback,
  };
};
