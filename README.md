
# ⚔️ Merciless Simplification

**AI Agent Framework** for systematically eliminating code complexity while preserving 100% externally observable behavior (backward compatible, implementation-only changes).

**👀 [Read the Complete Guide →](https://mfenderov.github.io/merciless-simplification/)**

## Pi Skill + Extension

This repo ships the methodology as a [pi](https://github.com/earendil-works/pi) package — a skill (methodology body) plus a micro extension (commands) — installable from git or npm:

```bash
# git install (always in sync with main):
pi install git:github.com/mfenderov/merciless-simplification

# npm install (released versions, auto-updated with pi update --extensions):
pi install npm:merciless-simplification
```

Then, in a pi session:

```
/merciless-simplify [targets...]   # run the methodology (analyze -> tickets -> approval -> execute)
/skill:merciless-simplification     # load the skill directly
```

Or load it directly from a local checkout without installing:

```bash
pi --skill ./skills/merciless-simplification
pi -e ./extensions/merciless-simplification.ts
```

Package files: `extensions/merciless-simplification.ts` (command + tool shim), `skills/merciless-simplification/` (SKILL.md wrapper + references/methodology.md snapshot).

**Auto-invocation (Tidy First)**: the extension appends Kent Beck's principle — *make the change easy (this might be hard), then make the easy change* — to every turn's system prompt, so the agent calls `merciless_simplify` before modifying complex code. It also shows a non-blocking nudge when you edit a file over a complexity threshold (default 300 lines; tune with `MERCILESS_SIMPLIFY_COMPLEX_LINES`). The human approval gate always stays in the loop.

**Releases**: a GitHub Action bumps the patch version, tags `vX.Y.Z`, and publishes to npm on every push to `main` touching the methodology, skill, or extension. Publishing to npm requires the `NPM_TOKEN` secret in the repo.

## Quick Start

Copy-paste this command to any AI agent:

```
Apply merciless simplification methodology from https://mfenderov.github.io/merciless-simplification to systematically eliminate complexity in this codebase.
```

## Complete Documentation

**📖 [Visit the Complete Guide](https://mfenderov.github.io/merciless-simplification/)**

The published website includes all guides, patterns, templates, and tools for systematic codebase simplification.

## Local Development

```bash
gh repo clone mfenderov/merciless-simplification
cd merciless-simplification
brew install hugo
hugo server
```

## Documentation Maintenance

**Ultra-Simple Approach:**
- **One file**: `content/_index.md` contains the complete guide
- **One command**: `hugo server` to preview locally
- **One output**: Hugo renders it as the website

**Making Changes:**
1. Edit `content/_index.md`
2. Commit your changes
3. Done!

**Why this approach?**
- Single source of truth - just one file to maintain
- No build scripts, no complexity
- AI agents can fetch the complete guide from GitHub or the live site
- Hugo automatically generates the beautiful website
- Note: `skills/merciless-simplification/references/methodology.md` is a snapshot of `content/_index.md` — update both when revising the methodology

## License

Open source and freely available for use, adaptation, and distribution.
