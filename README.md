
# ⚔️ Merciless Simplification

**AI Agent Framework** for systematically eliminating code complexity while preserving 100% externally observable behavior (backward compatible, implementation-only changes).

**👀 [Read the Complete Guide →](https://mfenderov.github.io/merciless-simplification/)**

## Pi Skill

This repo also ships the methodology as a [pi](https://github.com/earendil-works/pi) skill, installable as a package:

```bash
pi install git:github.com/mfenderov/merciless-simplification
# then, in a pi session:
/skill:merciless-simplification
```

Or load it directly from a local checkout without installing:

```bash
pi --skill ./skills/merciless-simplification
```

Skill files: `skills/merciless-simplification/` (SKILL.md wrapper + references/methodology.md snapshot).

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
