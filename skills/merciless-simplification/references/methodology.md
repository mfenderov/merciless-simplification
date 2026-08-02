> Snapshot of content/_index.md — the live source of truth lives there; update both when revising.


# Merciless Simplification

> **For AI Agents**: Systematic code simplification through micro-ticket execution
>
> **Foundations**: XP + TDD + Clean Code + Refactoring + Tidy First
>
> **Goal**: Measurable complexity reduction with zero change to externally observable behavior (as observed by callers and the tests) — always backward compatible, implementation-only changes

---

## Quick Start

Copy-paste this prompt to any AI agent:

```
Apply merciless simplification methodology from https://mfenderov.github.io/merciless-simplification to systematically eliminate complexity in this codebase.
```

---

## AI Agent Instructions

### Execute in Order

1. **READ** this complete methodology
2. **ANALYZE** the codebase for code smells — each smell requires concrete evidence (see Code Smell Detection)
3. **CLASSIFY** the scope of each candidate change: internal implementation vs. public API / service boundary
4. **GENERATE** micro-tickets prioritized by impact/risk, each with a risk tier
5. **APPROVAL**: present the ticket batch; the human approves direction and criteria, not every ticket — high-risk tickets (public API, large deletions, core modules) are gated on explicit approval
6. **EXECUTE** tickets one at a time: ANALYSIS → CHARACTERIZE → TIDY → SIMPLIFY/CONSOLIDATE → VERIFY
7. **COMMIT** after each ticket
8. **MEASURE** results against complexity metrics, then repeat or stop (see Stopping Criterion)

### Quality Gates

- All tests pass after each ticket
- Backward compatible: no change to externally observable behavior as observed by callers and the tests (API, error messages, formats, timing, side effects)
- Safety net calibrated to risk: tiny tidies (dead-code removal, renames) rely on smallness and revert; structural changes get CHARACTERIZE tickets first; boundary changes get human approval
- Tickets cite the Fowler refactoring by name **and** the concrete evidence for the smell — and before executing, read the actual catalog entry, not the summary gloss
- Coverage is a constraint, never a target — tests must assert behavior, verified via mutation testing
- Every ticket exits with: *this change makes the next change cheaper* — the only economic justification for tidying

### Expected Results

- Lower complexity: improved CRAP score (cyclomatic complexity × test coverage) on targeted modules
- Stronger tests: mutation testing shows tests actually assert behavior, not just execute code
- Cleaner architecture: architectural tests (dependency / layering rules) pass or improve
- Zero broken features, zero external behavior change, through TDD discipline

Lines of code and file counts are **never** a measure of success — adding lines (guard clauses, named intermediate variables, extracted functions) can reduce complexity.

### Stopping Criterion

Stop when any of these hold:
- N consecutive tickets find no code smell with evidence (suggested: 3)
- A pre-agreed timebox is reached

Metrics (CRAP score, mutation survival, architecture checks) are diagnostics, not gates — when a measure becomes a target it ceases to be a good measure. Use them to inform the work, never to gate it.

Do not churn. If a ticket's change is uncertain or tests cannot be made green, revert and record why — then move on.

---

## Principles

- **Merciless in ambition, incremental in execution**: always strive for the simplest possible long-term solution — reached one small ticket at a time. Boy-scout rule: leave code simpler than you found it.
- **Small bits only**: never batch refactorings. A single small, verified, committed change is the unit of work.
- **Risk asymmetry**: a wrong deletion surfaces as a production bug weeks later (expensive); leaving mildly complex code is cheap and reversible. When in doubt on anything touching external behavior, do not change it — record it as a ticket for human review instead.
- **Scope classification**: internal implementation changes are the normal path. Public API / service boundary changes are out of scope by default and require explicit human approval.

## Code Smell Detection

Detect these smells to generate micro-tickets. Every ticket must state the concrete evidence for its smell — naming the refactoring is not enough:

| Smell | Detection (concrete evidence required) | Action |
|-------|----------------------------------------|--------|
| **Dead Code** | `grep`/`rg` shows zero references | SIMPLIFY: Remove Dead Code |
| **Duplicate Code** | Identical or near-identical blocks via diff | CONSOLIDATE: Extract Function |
| **Speculative Generality** | Exactly one call site, no tests reference it | SIMPLIFY: Inline Class/Function |
| **Middle Man** | Pure delegation, no logic of its own | SIMPLIFY: Remove Middle Man |
| **Large Class/Method** | Hard to understand at a glance **and** a clear extraction improves it | TIDY: Extract Function |

---

## The Six Micro-Ticket Types

### ANALYSIS — Understand Before Changing

```
ANALYSIS-001: Document dependencies for UserService

Tasks:
- List all imports and dependencies
- Identify code smells
- Document simplification opportunities

Exit: Current state documented, safe path identified
```

### CHARACTERIZE — Capture Behavior (Safety Net)

**Safety net for structural changes. TDD designs new behavior; characterization captures existing behavior — write what the code *does* first, then judge whether that is desirable. Tiny tidies rely on smallness and revert instead.**

```
CHARACTERIZE-001: Capture AuthManager behavior in tests

Tasks:
1. Observe and document current behavior
2. Capture it in tests — success, failure, and edge cases as the code actually behaves
3. Verify all tests pass

Exit: Behavior captured in tests, safe to simplify
```

### TIDY — Prepare for Simplification

**Requires existing tests — run a CHARACTERIZE ticket first if the code has no coverage.**

```
TIDY-001: Extract validateEmail before inlining UserValidator

Fowler Refactoring: Extract Function

Steps:
1. Extract email validation to standalone function
2. Run tests (must stay green)
3. Commit

Exit: Structure improved, ready for simplification
```

### SIMPLIFY — Eliminate Complexity

```
SIMPLIFY-001: Inline formatUserName function

Fowler Refactoring: Inline Function
Code Smell: Speculative Generality

Steps:
1. Verify function used in only one location
2. Copy body to call site
3. Remove function definition
4. Run tests
5. Commit

Exit: Code simpler, all tests pass
```

### CONSOLIDATE — Merge Duplicates

```
CONSOLIDATE-001: Merge user test files

Fowler Refactoring: Extract Function (shared setup/fixtures), Move Function
Code Smell: Duplicate Code

Steps:
1. Identify duplicate setup/teardown
2. Move tests to primary file
3. Remove empty file
4. Run tests
5. Commit

Exit: Duplication eliminated, all tests pass
```

### VERIFY — Confirm Preservation

```
VERIFY-001: Verify all changes

Tasks:
1. Run complete test suite
2. Run mutation testing on changed modules — tests must actually assert the behavior
3. Verify no regressions and no external behavior change

Exit: All tests green, ready for next phase
```

---

## Key Patterns

### Pattern: Inline Single-Use Components

**When**: Component used in only one location

**Smell**: Speculative Generality

**Refactoring**: Inline Class, Inline Function

**Before**:
```
├── PersonaCard.tsx (156 lines) — only used by PersonaSelector
├── PersonaSelector.tsx
```

**After**:
```
├── PersonaSelector.tsx (card logic inlined)
```

**Decision**: Don't inline if component has independent business logic or inlining makes parent >300 lines.

---

### Pattern: Consolidate Related Test Files

**When**: Multiple test files testing the same component

**Smell**: Duplicate Code, Needless Repetition

**Refactoring**: Move Function, Remove Dead Code

**Before**:
```
├── user_basic_test
├── user_test
├── user_nested_test
├── user_errors_test
```

**After**:
```
├── user_test (consolidated)
├── user_advanced_test (complex scenarios)
```

**Decision**: Don't consolidate if files have conflicting setup/teardown or circular dependencies.

---

### Pattern: Eliminate Documentation Redundancy

**When**: Same information explained in multiple places

**Smell**: Duplicate Code (in documentation)

**Refactoring**: Move content to canonical location, delete duplicates

**Before**:
```
├── README.md (API + examples)
├── API_REFERENCE.md (API + examples)
├── TUTORIAL.md (API + examples)
```

**After**:
```
├── README.md (overview + getting started)
├── API_REFERENCE.md (complete API docs)
```

---

### Pattern: Reduce API Surface

**When**: Too many public functions, some providing minimal value

**Smell**: Speculative Generality, Dead Code

**Refactoring**: Inline Function, Remove Dead Code

```go
// KEEP: Callers rely on the indirection
func GetEnv(key string) string {
    return os.Getenv(key)
}

// ELIMINATE: No meaning callers rely on over the built-in
func StringLength(s string) int {
    return len(s)
}
```

**Scope**: internal code only. If these are public functions consumed by other packages, removing them changes external behavior — out of scope unless explicitly approved.

---

## Fowler Refactoring Reference

Full catalog: [refactoring.com/catalog](https://refactoring.com/catalog/)

### Remove Unnecessary Abstractions

| Refactoring | When to Use |
|-------------|-------------|
| **Inline Function** | Function provides no semantic value |
| **Inline Class** | Class does too little |
| **Collapse Hierarchy** | Subclass adds no value |
| **Remove Middle Man** | Wrapper adds no value |

### Consolidate Duplication

| Refactoring | When to Use |
|-------------|-------------|
| **Extract Function** | Duplicated code fragments |
| **Pull Up Method** | Duplicated methods in subclasses |
| **Consolidate Duplicate Conditional Fragments** | Duplicated conditional logic |

### Prepare for Simplification (Tidy First)

| Refactoring | When to Use |
|-------------|-------------|
| **Extract Variable** | Complex expressions |
| **Extract Function** | Long methods |
| **Rename Variable/Function** | Unclear names |
| **Replace Nested Conditional with Guard Clauses** | Deep nesting |

### Eliminate Dead Code

| Refactoring | When to Use |
|-------------|-------------|
| **Remove Dead Code** | Unused functions/classes |
| **Remove Parameter** | Unused parameters |

---

## AI Agent Workflow

### DO

**Cite refactorings by name**:
```
SIMPLIFY-001: Inline getUserName (Inline Function)
```

**Test after every ticket**:
```
Execute → Run tests → Verify green → Commit
```

**Work one ticket at a time**:
```
Complete SIMPLIFY-001 → Commit → Start SIMPLIFY-002
```

### DON'T

**Skip tests**: If tests fail, revert and break into smaller steps

**Change external behavior**: Any change to public API, error messages, formats, timing, or side effects is out of scope unless explicitly approved

**Batch changes**: Commit after each ticket, not after multiple tickets

---

## Limitations

### Subjectivity in Code Smells

**More objective** (easier to agree on):
- Dead code (never called)
- Duplicate code (identical blocks)
- Unused imports

**More subjective** (reasonable disagreement):
- "Speculative Generality" — what counts as "might need someday"?
- "Large Class" — how large is too large?
- "Middle Man" — when does a wrapper add value?

### When NOT to Use This Methodology

- Codebase is already minimal
- Major architectural rewrite is planned
- Team lacks buy-in

Untested code is not a reason to skip — CHARACTERIZE tickets are the entry point. Capturing behavior *is* the work.

### Honest Expectations

This methodology does not guarantee:
- Any specific reduction percentage
- Improved performance (this is about maintainability)
- Agreement among team members

Results vary based on starting codebase, team experience, and time invested.

---

## Attribution

**Built on**:
- **Kent Beck**: XP, TDD, Tidy First
- **Robert Martin**: Clean Code
- **Martin Fowler**: Refactoring (2nd Ed) — [refactoring.com/catalog](https://refactoring.com/catalog/)

**What this adds**: Micro-tickets as the execution vehicle that makes these practices actionable for AI agents.

**Source**: [github.com/mfenderov/merciless-simplification](https://github.com/mfenderov/merciless-simplification)

---

*Micro-tickets: The execution vehicle for XP, TDD, Clean Code, Refactoring, and Tidy First.*
