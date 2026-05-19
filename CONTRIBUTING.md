# Contributing

Thanks for taking a look at PrismoDev.

## Local Setup

```bash
npm test
node bin/prismo.js demo
node bin/prismo.js scan --simple .
```

## Scope

This repository contains only the local PrismoDev CLI. Keep contributions
focused on local scanning, local usage-log parsing, generated context packs,
and token-waste diagnostics.

Do not add hosted Prismo app code, billing, auth, private backend modules,
provider credentials, or customer data fixtures.

## Pull Requests

- Keep changes small and explain the user-facing behavior.
- Add or update tests for scanner behavior.
- Avoid network calls in scanner paths unless the command explicitly opts in.
- Do not commit generated reports, `.prismo/` output, local logs, or secrets.

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
