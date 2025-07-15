# Project Assessment Templates

> **Purpose**: Ready-to-use templates for assessing different types of projects for simplification opportunities.

## Universal Project Assessment Template

### Project Information
- **Project Name**: _________________
- **Language/Framework**: _________________
- **Team Size**: _____ developers
- **Age**: _____ months/years
- **Active Development**: Yes/No
- **Assessment Date**: _________________
- **Assessment Duration**: _____ minutes

### Project Metrics (Baseline)
```bash
# Commands to collect baseline metrics
find . -name "*test*" | wc -l                    # Test files
find . -name "*.md" | wc -l                      # Documentation files
find . -name "*.js" -o -name "*.go" -o -name "*.py" | grep -v test | wc -l  # Source files
wc -l *test* 2>/dev/null | tail -1               # Test lines
wc -l *.md 2>/dev/null | tail -1                 # Documentation lines
```

- **Test files**: _____ files (_____ lines)
- **Documentation files**: _____ files (_____ lines)
- **Source files**: _____ files (_____ lines)
- **Build/config files**: _____ files
- **Total repository size**: _____ MB

### Quick Health Check
- [ ] All tests pass (100% success rate)
- [ ] Build completes without errors
- [ ] Documentation examples work
- [ ] No obvious broken functionality
- [ ] Git repository is clean (no uncommitted changes)

---

## Frontend Project Template (React/Vue/Angular)

### Frontend-Specific Metrics
- **Components**: _____ total components
- **Test files**: _____ files
  - Unit tests: _____ files
  - Integration tests: _____ files
  - E2E tests: _____ files
- **Documentation**: _____ files
  - Component docs: _____ files
  - API docs: _____ files
  - User guides: _____ files

### Component Analysis
```bash
# Frontend-specific commands
find ./src/components -name "*.tsx" -o -name "*.vue" -o -name "*.js" | wc -l
find . -name "*.test.js" -o -name "*.spec.js" | wc -l
find . -name "*.stories.js" | wc -l              # Storybook stories
```

#### Component Complexity Assessment
**Large Components (>200 lines)**:
1. _________________ (_____ lines) - **Simplification Score**: ⭐⭐⭐⭐⭐
2. _________________ (_____ lines) - **Simplification Score**: ⭐⭐⭐⭐⭐
3. _________________ (_____ lines) - **Simplification Score**: ⭐⭐⭐⭐⭐

**Single-Use Components** (potential inlining candidates):
- [ ] _________________ (used only in: _________________)
- [ ] _________________ (used only in: _________________)
- [ ] _________________ (used only in: _________________)

**Wrapper Components** (potential elimination candidates):
- [ ] _________________ (wraps: _________________)
- [ ] _________________ (wraps: _________________)
- [ ] _________________ (wraps: _________________)

### Test Analysis
**Test Categories**:
- [ ] **Snapshot tests**: _____ files (often brittle, elimination candidates)
- [ ] **Component rendering tests**: _____ files (framework behavior vs business logic?)
- [ ] **User interaction tests**: _____ files (usually valuable)
- [ ] **API integration tests**: _____ files (usually valuable)

**Over-Engineering Indicators**:
- [ ] Tests that test CSS classes instead of functionality
- [ ] Snapshot tests that break on minor style changes
- [ ] Tests that duplicate framework behavior
- [ ] Complex test setup for simple component behavior

### Package Dependencies
```bash
# Check package complexity
npm ls --depth=0 | wc -l                         # Direct dependencies
npm ls --all | wc -l                             # All dependencies
npx depcheck                                     # Unused dependencies
```

- **Direct dependencies**: _____ packages
- **Total dependencies**: _____ packages
- **Unused dependencies**: _____ packages (elimination candidates)
- **Dev dependencies**: _____ packages

### Frontend Simplification Targets
- [ ] **Component consolidation**: _____ components → _____ components (____% reduction)
- [ ] **Test simplification**: _____ test files → _____ test files (____% reduction)
- [ ] **Dependency cleanup**: _____ packages → _____ packages (____% reduction)
- [ ] **Documentation streamlining**: _____ docs → _____ docs (____% reduction)

---

## Backend API Project Template (Go/Node.js/Python)

### Backend-Specific Metrics
- **API endpoints**: _____ total endpoints
- **Models/entities**: _____ files
- **Service layer files**: _____ files
- **Repository/DAO files**: _____ files
- **Middleware files**: _____ files

### API Complexity Assessment
```bash
# Backend-specific commands
grep -r "func.*Handler\|@app.route\|app.get\|app.post" . | wc -l  # API endpoints
find . -name "*_test.go" -o -name "*test.py" -o -name "*.test.js" | wc -l
```

**API Endpoint Analysis**:
- **GET endpoints**: _____ (typically simple, rarely need simplification)
- **POST/PUT endpoints**: _____ (complex business logic, potential targets)
- **DELETE endpoints**: _____ (usually simple)
- **Unused/deprecated endpoints**: _____ (elimination candidates)

**Service Layer Complexity**:
- [ ] **Large service files** (>500 lines): _________________
- [ ] **God objects** (too many responsibilities): _________________
- [ ] **Unnecessary abstractions**: _________________
- [ ] **Over-engineered patterns**: _________________

### Database & ORM Analysis
- **Database migrations**: _____ files
- **Model files**: _____ files
- **Query complexity**: Simple/Medium/Complex
- **ORM abstraction layers**: _____ layers (potential over-engineering)

### Test Categories
- [ ] **Unit tests**: _____ files (business logic - usually keep)
- [ ] **Integration tests**: _____ files (API contracts - usually keep)
- [ ] **Mock-heavy tests**: _____ files (potential over-engineering)
- [ ] **Database tests**: _____ files (infrastructure vs business logic?)

### Backend Simplification Targets
- [ ] **API consolidation**: _____ endpoints → _____ endpoints (____% reduction)
- [ ] **Service simplification**: _____ services → _____ services (____% reduction)
- [ ] **Test optimization**: _____ test files → _____ test files (____% reduction)
- [ ] **Abstraction reduction**: Remove _____ unnecessary layers

---

## Full-Stack Project Template

### Full-Stack Complexity Assessment
- **Frontend components**: _____ files
- **Backend services**: _____ files
- **Shared libraries**: _____ files
- **API integration points**: _____ connections
- **Database entities**: _____ models

### Integration Complexity
- [ ] **API client generation**: Auto-generated/Manual (auto is usually simpler)
- [ ] **Type sharing**: Shared types/Duplicate types (shared is usually simpler)
- [ ] **Build processes**: _____ separate builds (consolidation opportunity?)
- [ ] **Testing strategies**: _____ different test approaches (unification opportunity?)

### Monorepo vs Multi-repo Assessment
**Current Structure**: Monorepo/Multi-repo
**Complexity Indicators**:
- [ ] **Duplicate dependencies** across packages
- [ ] **Inconsistent tooling** between frontend/backend
- [ ] **Complex build orchestration**
- [ ] **Shared code management issues**

### Full-Stack Simplification Opportunities
- [ ] **Unified tooling**: Consolidate build/test/lint configurations
- [ ] **Shared type definitions**: Eliminate type duplication
- [ ] **API client optimization**: Auto-generate vs manual maintenance
- [ ] **Test strategy unification**: Consistent testing approaches

---

## Library/Package Project Template

### Library-Specific Metrics
- **Public API functions**: _____ functions
- **Internal helper functions**: _____ functions
- **Example files**: _____ files
- **Documentation pages**: _____ files

### API Surface Analysis
```bash
# Library-specific commands
grep -r "export\|public\|func [A-Z]" . | grep -v test | wc -l  # Public functions
```

**Public API Assessment**:
- [ ] **Core functions** (essential): _____ functions
- [ ] **Convenience functions** (wrappers): _____ functions
- [ ] **Utility functions** (helpers): _____ functions
- [ ] **Deprecated functions** (removal candidates): _____ functions

### Documentation Complexity
- [ ] **Getting started guide**: _____ pages
- [ ] **API reference**: _____ pages
- [ ] **Examples**: _____ examples
- [ ] **Advanced usage**: _____ pages

**Documentation Redundancy Check**:
- [ ] **Multiple getting started guides**: _____
- [ ] **Overlapping examples**: _____
- [ ] **Outdated documentation**: _____
- [ ] **Over-detailed explanations**: _____

### Test Categories for Libraries
- [ ] **Unit tests**: _____ files (business logic - essential)
- [ ] **Integration tests**: _____ files (usage scenarios - important)
- [ ] **Performance benchmarks**: _____ files (realistic vs edge cases?)
- [ ] **Compatibility tests**: _____ files (multiple versions/environments)

### Library Simplification Targets
- [ ] **API consolidation**: _____ functions → _____ functions (____% reduction)
- [ ] **Example streamlining**: _____ examples → _____ examples (____% reduction)
- [ ] **Documentation focus**: _____ pages → _____ pages (____% reduction)
- [ ] **Test optimization**: _____ benchmarks → _____ benchmarks (____% reduction)

---

## Legacy Project Template

### Legacy Assessment Considerations
- **Project age**: _____ years
- **Last major refactor**: _____ months/years ago
- **Technical debt level**: Low/Medium/High/Critical
- **Team knowledge**: Complete/Partial/Limited/Lost
- **Documentation state**: Current/Outdated/Missing

### Legacy-Specific Risks
- [ ] **Unknown dependencies**: Code that might be used by external systems
- [ ] **Undocumented behavior**: Functions whose purpose isn't clear
- [ ] **Historical workarounds**: Code that fixes old bugs/compatibility issues
- [ ] **Performance hacks**: Optimizations that might be critical

### Legacy Simplification Strategy
**Conservative Approach Checklist**:
- [ ] **Start with documentation**: Safe wins without code changes
- [ ] **Focus on tests**: Eliminate clearly broken or obsolete tests
- [ ] **Remove dead code**: Use tools to identify truly unused code
- [ ] **Gradual consolidation**: Small, reversible changes only

### Risk Mitigation for Legacy
- [ ] **Comprehensive backup**: Full system backup before changes
- [ ] **Feature flags**: Ability to toggle old vs new behavior
- [ ] **Gradual rollout**: Phased deployment of simplifications
- [ ] **Monitoring increase**: Enhanced logging during simplification
- [ ] **Rollback plan**: Detailed procedures for reverting changes

---

## Assessment Results Summary Template

### Project: _________________
### Assessment Date: _________________

#### Simplification Potential Score
**Overall Complexity**: ⭐⭐⭐⭐⭐ (1=simple, 5=complex)
**Simplification Opportunity**: ⭐⭐⭐⭐⭐ (1=little opportunity, 5=high opportunity)
**Risk Level**: ⭐⭐⭐⭐⭐ (1=low risk, 5=high risk)

#### Recommended Approach
- [ ] **Aggressive simplification** (high opportunity, low risk)
- [ ] **Targeted simplification** (medium opportunity/risk)
- [ ] **Conservative simplification** (legacy/high risk)
- [ ] **Documentation-first** (unclear codebase state)
- [ ] **Defer simplification** (low opportunity or very high risk)

#### Expected Results
- **File reduction**: ____% fewer files
- **Line reduction**: ____% fewer lines
- **Complexity reduction**: ____% less cognitive load
- **Time investment**: _____ hours over _____ sessions
- **Risk level**: _____ (mitigation strategies identified)

#### Next Steps
1. _________________
2. _________________
3. _________________

#### Success Criteria
- [ ] _________________
- [ ] _________________
- [ ] _________________

These templates provide systematic assessment for any project type, ensuring comprehensive evaluation and appropriate simplification strategies.