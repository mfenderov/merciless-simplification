---
title: "Merciless Simplification"
description: "AI Agent framework for systematic code simplification using micro-tickets"
---

# Merciless Simplification

> **For AI Agents**: Systematic code simplification through micro-ticket execution
>
> **Foundations**: XP + TDD + Clean Code + Refactoring + Tidy First
>
> **Goal**: Measurable complexity reduction, zero functionality loss

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
2. **ANALYZE** codebase for code smells
3. **GENERATE** micro-tickets prioritized by impact/risk
4. **EXECUTE** tickets one at a time: ANALYSIS → TIDY → TEST-FIRST → SIMPLIFY/CONSOLIDATE → VERIFY
5. **COMMIT** after each ticket
6. **MEASURE** results

### Quality Gates

- All tests pass after each ticket
- Zero functionality loss
- Cite Fowler refactoring by name in SIMPLIFY/CONSOLIDATE tickets
- Identify code smell being fixed

### Expected Results

- Fewer files through consolidation
- Less code through removing unnecessary abstractions
- Simpler documentation through redundancy elimination
- Zero broken features through TDD discipline

---

## Code Smell Detection

Detect these smells to generate micro-tickets:

| Smell | Detection | Action |
|-------|-----------|--------|
| **Dead Code** | Functions with zero references | SIMPLIFY: Remove Dead Code |
| **Duplicate Code** | Similar logic in multiple places | CONSOLIDATE: Extract Function |
| **Speculative Generality** | Abstractions never actually used | SIMPLIFY: Inline Class/Function |
| **Middle Man** | Classes that only delegate | SIMPLIFY: Remove Middle Man |
| **Large Class/Method** | Hard to understand at a glance | TIDY: Extract Function |

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

### TIDY — Prepare for Simplification

```
TIDY-001: Extract validateEmail before inlining UserValidator

Fowler Refactoring: Extract Function

Steps:
1. Extract email validation to standalone function
2. Run tests (must stay green)
3. Commit

Exit: Structure improved, ready for simplification
```

### TEST-FIRST — Create Safety Net

```
TEST-FIRST-001: Write characterization test for AuthManager

Tasks:
1. Document current behavior
2. Write tests for success, failure, and edge cases
3. Verify all tests pass

Exit: Behavior captured in tests, safe to simplify
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

Fowler Refactoring: Consolidate Duplicate Conditional Fragments
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
2. Check coverage maintained
3. Verify no regressions

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
// KEEP: Provides semantic value
func GetEnv(key string) string {
    return os.Getenv(key)
}

// ELIMINATE: No value over built-in
func StringLength(s string) int {
    return len(s)
}
```

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

**Eliminate functionality**: Before removing code, verify no tests fail and no users depend on it

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
- No test coverage exists (build coverage first)
- Major architectural rewrite is planned
- Team lacks buy-in

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
