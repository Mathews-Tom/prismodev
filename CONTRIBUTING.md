# Contributing

Thanks for taking a look at PrismoDev.

## Local Setup

```bash
npm test
node bin/prismo.js demo
node bin/prismo.js scan --simple .
node bin/prismo.js scan --json --no-report .
```

Use npm in this repo. `package-lock.json` is the package-manager source of
truth.

## Scope

This repository contains only the local PrismoDev CLI. Keep contributions
focused on local scanning, local usage-log parsing, generated context packs,
and token-waste diagnostics.

Good contribution areas:

- scanner correctness
- project/global config scope separation
- local log parser fixtures
- JSON output stability
- CLI parser tests
- ignore matcher tests
- docs from user-testing feedback

Non-goals:

- hosted dashboard code
- billing or auth
- private backend modules
- provider credentials
- customer data fixtures
- MCP interception
- prompt rewriting
- shell-output compression

## Pull Requests

- Keep changes small and explain the user-facing behavior.
- Add or update tests for scanner behavior.
- Avoid network calls in scanner paths unless the command explicitly opts in.
- Do not commit generated reports, `.prismo/` output, local logs, or secrets.

Run the narrowest validation that proves your change, then run `npm test`
before opening a PR. For scanner or JSON output changes, include the relevant
CLI smoke command in the PR body.

## Generated Local Artifacts

Keep generated PrismoDev and agent-workflow files local. Do not commit:

- `.prismo/`
- `.claudeignore.prismo-suggested`
- `.cursorignore.prismo-suggested`
- `prismo-optimized-CLAUDE.template.md`
- `*.bak`
- `.cocoindex_code/`

The npm package `files` allowlist should stay limited to source, docs, and
package metadata. Generated outputs should not be added to published package
contents.
