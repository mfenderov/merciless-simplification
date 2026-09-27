---
name: merciless-simplification
description: Use when writing, simplifying, or refactoring code — removing dead code, speculative abstractions, duplication, or unnecessary complexity while preserving all externally observable behavior. Also use for whole-codebase complexity-reduction passes.
---

# Merciless Simplification

## Overview

Standards for writing clean code continuously, plus an optional campaign flow for
simplifying it periodically. **Merciless in ambition, incremental in execution** —
boy-scout rule, always strive for the simplest possible long-term solution.
Harness-agnostic: process (planning, execution, verification) belongs to the host workflow.

## When to Use

- Writing or reviewing new code (apply Layer 1 standards)
- Removing dead code, unused abstractions, duplication, middle men
- Code-smell cleanup after features land
- Whole-codebase complexity reduction (Layer 2 campaign)
- When asked to "simplify", "clean up", or "reduce complexity" in code

**When NOT to use**: codebase already minimal; no test coverage at all (build coverage first); major architectural rewrite planned; team lacks buy-in.

## Hard Rules (non-negotiable)

1. **Safety net calibrated to risk**: tiny tidies (dead-code removal, renames) rely on smallness and revert; structural changes get CHARACTERIZE first (capture what the code actually does in tests); boundary changes get human approval. TDD designs new behavior; characterization captures existing behavior.
2. **Backward compatible**: never change externally observable behavior (API, error messages, formats, timing, side effects). Internal implementation only.
3. **Scope**: public API / service boundary changes are out of scope by default and require explicit human approval.
4. **Evidence over naming**: every simplification claim states concrete evidence (search results, call-site count, diff). Citing a refactoring name is not enough.
5. **Human approval**: the human approves direction and criteria. High-risk changes (public API, large deletions, core modules) are gated.
6. **Small bits only**: one change at a time, verified before the next. Never batch changes.
7. **Stop, don't churn**: if a change is uncertain or tests can't go green, revert and record why.

## Layer 1 — Standards (always-on)

Clean Code essence, SOLID, simplification judgment (KEEP/ELIMINATE with evidence),
preventive habits (tidy first, CHARACTERIZE before restructuring, low-CRAP by construction).
See [references/methodology.md](references/methodology.md) Layer 1.

## Layer 2 — Campaign (optional whole-codebase passes)

Ticket flow ANALYSIS → CHARACTERIZE → TIDY → SIMPLIFY/CONSOLIDATE → VERIFY, one ticket
at a time with tests green throughout. Use only for standalone simplification campaigns
outside feature work. See [references/methodology.md](references/methodology.md) Layer 2.

## Measurement

Goal is **complexity reduction, not fewer lines**: CRAP score (cyclomatic complexity × coverage),
tests that assert behavior, dependency/layering checks. Coverage is a constraint, never a target;
metrics are diagnostics, not gates. Lines of code and file counts are never success metrics.

## Full Methodology

See [references/methodology.md](references/methodology.md) for the complete guide.
