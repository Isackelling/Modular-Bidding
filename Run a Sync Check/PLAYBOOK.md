# Sync Check Playbook — Claude Code Operating Guide

> Read this file before running any sync check.
> When the user says "run a sync check", follow this guide exactly.

---

## What a Sync Check Is

The app has a one-directional data pipeline:

```
spec.md (intended behavior — the contract)
         │
         ▼
emptyQuote() in App.jsx          ← source of truth for all quote fields
         │
         ▼
calcTotals() in calculations.js  ← pricing engine
         │
         ▼
8 document generators in documentGeneration.js + CustomerPortal.jsx + ScrubbTab.jsx
```

A sync check verifies two things:
1. Every field/formula/connection in the pipeline is consistent end-to-end
2. The actual code matches what `spec.md` says it should do

---

## Step 0 — Read spec.md FIRST

**File:** `spec.md` (project root, ~69KB)

This is the authoritative technical specification. It defines:
- Every business rule and formula (contingency, variance, pricing pipeline, project command, material quantities)
- What each of the 8 documents is supposed to contain
- Status workflows (quote → contract → completed)
- Role permissions matrix (who can do what)
- The complete quote object schema (canonical field names)

**When running a sync check, compare code against spec.md to catch:**
- Formula deviations (e.g., spec says `sub × 5%` overhead — is that what calcTotals does?)
- Missing features (spec lists a document type — does it exist in documentGeneration.js?)
- Wrong business logic (spec says contingency draws subtract from balance — does CustomerPortal do that?)
- Spec says 6 ALLOWANCE_ITEMS — does constants/index.js match exactly?

---

## Step 1 — Files to Read

Always read these files at the start of a sync check:

| File | What to extract |
|------|----------------|
| `spec.md` | **The spec** — intended formulas, document rules, business logic |
| `src/App.jsx` lines ~52-82 | `emptyQuote()` — the complete field list (source of truth) |
| `src/constants/index.js` | `ALLOWANCE_ITEMS`, `HOME_OPTIONS`, `LICENSED_SERVICES`, service definitions |
| `src/utils/calculations.js` | `calcTotals()` — pricing pipeline, what totals are produced |
| `src/utils/documentGeneration.js` | All 8 generators — what fields each one reads from the quote |
| `src/components/Quotes/ScrubbTab.jsx` | Contingency fund formula |
| `src/components/Auth/CustomerPortal.jsx` | Contingency formula (must match ScrubbTab) |

---

## Step 2 — Source of Truth: emptyQuote() Fields

Current confirmed fields in `emptyQuote()` (verify against App.jsx each run):

```
Core:        id, customerId, quoteType, status
Home:        homeModel, homeBasePrice, houseWidth, houseLength, singleDouble, walkDoors, iBeamHeight
Foundation:  foundationType
Site:        sewerType, wellDepth, patioSize, driveTime
Services:    selectedServices, servicePriceOverrides, serviceQuantities, serviceDays
Notes:       serviceNotes, serviceCrewNotes
             publishedServiceNotes, publishedServiceCrewNotes
             publishedGeneralCrewNotes, publishedGeneralCustomerNotes
             generalCrewNote, generalCustomerNote
Special:     hasLandscaping, landscapingMaterialCost, landscapingDays
             hasDeck, deckMaterialCost, deckDays
Custom:      customServices, customOptions, customMaterials
Removed:     removedMaterials, removedServices
Tracking:    scrubbCosts, scrubbDocs, scrubbHistory, scrubbPayments, permitEntries
Folders:     folders (clayton_docs, crew_files, estimates, permits, change_orders)
```

**Fields that do NOT exist (never reference these):**
`sewerSystem`, `wellSystem`, `patio`, `patioWidth`, `patioLength`, `hasGarage`,
`landscaping`, `deckProject`, `scrubbPayments` (on customer — this lives on quote)

---

## Step 3 — The Eight Documents and What They Need

| # | Generator | Purpose | Critical Fields |
|---|-----------|---------|----------------|
| 1 | `generateQuoteHtml` | Internal admin summary | All fields, all prices |
| 2 | `generateCustomerQuote` | Customer-facing document | Price, scope, sewerType, wellDepth, patioSize |
| 3 | `generatePierDiagramHtml` | Visual pier layout | houseWidth, houseLength, iBeamHeight, singleDouble, foundationType ONLY |
| 4 | `generateScopeOfWorkDocument` | Legal scope document | selectedServices, customServices, dimensions, homeModel |
| 5 | `generateCrewWorkOrderDocument` | Crew job-site instructions | ALL fields crew needs — services, notes, sewer, well, patio, drive time |
| 6 | `generateJobSummaryReport` | Post-completion checklist | Service details, quantities, days, dimensions, special features |
| 7 | `generateChangeOrderDocument` | Change order delta tracker | Any field that can change between quote versions |
| 8 | `generateAllowanceProgressDocument` | Allowance cost tracking | scrubbCosts, scrubbPayments, sewerType, wellDepth, permitEntries |

---

## Step 4 — Critical Business Rules (check these every time)

### Rule 1: Contingency Formula — MUST be identical in 3 places

```
currentBalance = startingContingency          (total × 2%)
               + allowanceSavings             (variance > 0, sum of savings)
               - allowanceOverages            (variance < 0, sum of overages)
               - contingencyPaymentsApplied   (scrubbPayments where isContingencyPayment = true)
```

These three locations must produce identical results:
1. `src/components/Quotes/ScrubbTab.jsx` — Contingency Fund Tracker
2. `src/utils/documentGeneration.js` → `generateAllowanceProgressDocument`
3. `src/components/Auth/CustomerPortal.jsx` → `renderBudgetTracker`

If any change touches contingency, check all three simultaneously.

### Rule 2: NHL Contract Grouping

In the Scrubb cost-tracking interface, three items are always grouped into one line:
```
NHL Contract = matT (materials total) + installation_of_home + painting
```
If a change affects materials pricing, installation_of_home, or painting, the NHL Contract
display must remain consistent across all Scrubb-related code.

### Rule 3: ALLOWANCE_ITEMS

```javascript
ALLOWANCE_ITEMS = ['permits', 'gravel_driveway', 'sand_pad', 'sewer', 'well', 'crane']
```
These are variable-cost items (estimated at quote time, finalized during construction).
They appear in the Allowance Progress document and affect the contingency fund.
Fixed-cost services do NOT appear in allowance tracking.

### Rule 4: Variance Sign Convention

```
variance = contractPrice - actualCost
Positive (+) = under budget = SAVINGS → adds to contingency
Negative (-) = over budget = OVERAGE → subtracts from contingency
```

### Rule 5: Total Cost Pipeline

```
matT     = sum of all material costs
svcT     = sum of all service costs (selected + custom services + custom options)
homePrice = homeBasePrice × 1.2 (HOME_MARKUP)
projCmd  = Project Command (PS + PM + PC based on service count and miles)
sub      = matT + svcT + homePrice + projCmd
oh       = sub × 5% (overhead)
mu       = (sub + oh) × 10% (markup)
total    = sub + oh + mu
contingency = total × 2%
```

Grand total must be IDENTICAL in: Customer Quote, Quote HTML, Scrubb tracking,
and Allowance Progress document.

---

## Step 5 — Field-to-Document Mapping

### Core Home Fields

| Quote Field | Cust Quote | Quote HTML | Pier Diag | Scope | Crew WO | Job Sum | Change Order | Allowance |
|-------------|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| homeModel | ✓ | ✓ | — | ✓ | ✓ | ✓ | — | — |
| homeBasePrice | implied | implied | — | — | implied | implied | implied | — |
| houseWidth | ✓ | ✓ | **✓** | ✓ | ✓ | ✓ | — | — |
| houseLength | ✓ | ✓ | **✓** | ✓ | ✓ | ✓ | — | — |
| singleDouble | ✓ | ✓ | **✓** | ✓ | ✓ | ✓ | — | — |
| iBeamHeight | — | — | **✓** | — | — | — | — | — |
| walkDoors | — | — | — | — | — | ✓ | — | — |
| foundationType | ✓ | ✓ | — | ✓ | ✓ | ✓ | — | — |

### Services & Options

| Quote Field | Cust Quote | Quote HTML | Pier Diag | Scope | Crew WO | Job Sum | Change Order | Allowance |
|-------------|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| selectedServices | ✓ | ✓ | — | ✓ | ✓ | ✓ | ✓ | ✓ |
| servicePriceOverrides | implied | implied | — | — | implied | implied | ✓ | — |
| serviceQuantities | — | — | — | — | ✓ | ✓ | — | — |
| serviceDays | — | — | — | — | ✓ | ✓ | — | — |
| customServices | ✓ | ✓ | — | ✓ | — | — | ✓ | — |
| customOptions | ✓ | ✓ | — | — | — | — | — | — |

### Notes

| Quote Field | Cust Quote | Quote HTML | Pier Diag | Scope | Crew WO | Job Sum | Change Order | Allowance |
|-------------|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| publishedServiceNotes | ✓ | ✓ | — | — | ✓ | — | — | — |
| publishedServiceCrewNotes | — | — | — | — | ✓ | — | — | — |
| publishedGeneralCustomerNotes | ✓ | — | — | — | — | — | — | — |
| publishedGeneralCrewNotes | — | — | — | — | ✓ | — | — | — |

### Site & Utilities

| Quote Field | Cust Quote | Quote HTML | Pier Diag | Scope | Crew WO | Job Sum | Change Order | Allowance |
|-------------|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| sewerType | ✓ | ✓ | — | — | ✓ | ✓ | — | ✓ |
| wellDepth | ✓ | ✓ | — | — | ✓ | ✓ | — | ✓ |
| patioSize | ✓ | ✓ | — | — | ✓ | ✓ | — | — |
| driveTime | — | — | — | — | ✓ | ✓ | — | — |

### Special Features

| Quote Field | Cust Quote | Quote HTML | Pier Diag | Scope | Crew WO | Job Sum | Change Order | Allowance |
|-------------|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| hasLandscaping | ✓ | ✓ | — | ✓ | ✓ | ✓ | ✓ | — |
| landscapingMaterialCost | implied | implied | — | — | — | — | — | — |
| landscapingDays | — | — | — | — | ✓ | ✓ | — | — |
| hasDeck | ✓ | ✓ | — | ✓ | ✓ | ✓ | ✓ | — |
| deckMaterialCost | implied | implied | — | — | — | — | — | — |
| deckDays | — | — | — | — | ✓ | ✓ | — | — |

### Project Tracking (Scrubb Phase Only)

| Quote Field | Cust Quote | Quote HTML | Pier Diag | Scope | Crew WO | Job Sum | Change Order | Allowance |
|-------------|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| scrubbCosts | — | — | — | — | — | — | — | ✓ |
| scrubbPayments | — | — | — | — | — | — | — | ✓ |
| permitEntries | — | — | — | — | — | — | — | ✓ |

### Administrative (no document needs these)

`id`, `customerId`, `status`, `folders`, `scrubbHistory`, `changeOrderNum`, `changeOrderVersion`

---

## Step 5b — Spec Compliance Audit

After checking field-to-document mapping, check these spec-defined rules against the actual code:

### Formulas to verify in `calculations.js`:
| Spec Rule | What to Check |
|-----------|--------------|
| `overhead = sub × 5%` | Does calcTotals use exactly 0.05? |
| `markup = (sub + oh) × 10%` | Is markup applied to sub+overhead (not just sub)? |
| `contingency = total × 2%` | Applied to post-markup total? |
| `homePrice = homeBasePrice × 1.2` | Is HOME_MARKUP = 1.2 in constants? |
| `closing costs = total × (0.07/0.93)` | Self-referential — special formula |
| `PS = (numServices × $150) + (miles × $15 × numServices)` | Project Supervisor formula |
| `PM = (miles × $15) + $4,000` | Project Manager formula |
| `PC = (PM / 2) + (miles × $15)` | Project Coordinator formula |
| Drive minimum = 15 miles | `enforceMiles()` enforces this |
| I-beam: `<56ft → 10"`, `≥56ft → 12"` | Check `getBeamHeight()` |

### Allowance items to verify in `constants/index.js`:
```
ALLOWANCE_ITEMS = ['permits', 'gravel_driveway', 'sand_pad', 'sewer', 'well', 'crane']
```
Exactly 6. No more, no less.

### Document routing to verify:
| Document | Should save to folder |
|----------|----------------------|
| Customer Quote | `estimates` |
| Crew Work Order | `crew_files` |
| Pier Diagram | `crew_files` |
| Scope of Work | `estimates` |
| Change Order | `change_orders` |
| Allowance Progress | `estimates` |

### Role permissions to verify (spot check):
- Sales role: cannot access Scrubb tab
- Crew role: cannot create/edit quotes
- Customer Portal: read-only, no editing

---

## Step 6 — What to Flag as Broken

| Pattern | Severity | Example |
|---------|----------|---------|
| Field name mismatch (`quote.sewerSystem` vs `quote.sewerType`) | CRITICAL | Document produces undefined/missing data |
| Formula in code differs from spec.md | CRITICAL | Wrong price on customer quote |
| Field exists in emptyQuote but missing from a required document | HIGH | Crew shows up not knowing about patio |
| Contingency formula differs across the 3 locations | CRITICAL | Customer sees wrong balance |
| Grand total differs between documents | CRITICAL | Financial inconsistency |
| Feature described in spec.md but not implemented | HIGH | Promised functionality missing |
| Label names inconsistent across documents | MEDIUM | "Sewer System" in one, "Sewer" in another |
| Dead field reference (field was removed from emptyQuote) | HIGH | Always evaluates to undefined |
| Hardcoded list of services missing a new service key | MEDIUM | New service never shows in that document |
| Document saves to wrong folder (doesn't match spec) | MEDIUM | Files hard to find |

---

## Step 7 — How to Report Findings

For each issue found, report:
- **Where**: file + function name + approximate line
- **What's broken**: exact field name mismatch or missing reference
- **Impact**: which quotes/documents are affected and how
- **Fix**: exact code change needed

Group findings by severity: CRITICAL → HIGH → MEDIUM.

After reporting, ask the user if they want fixes applied before making any edits.

---

## Step 8 — After Making Fixes

1. Verify the fix by re-reading the changed section
2. Run `npm run build` to confirm no errors
3. Commit with a descriptive message referencing the sync check

---

## Files to Skip (not part of the data pipeline)

- `src/components/Auth/` (except CustomerPortal.jsx — contingency formula lives there)
- `src/components/Quotes/QuoteForm.jsx` — input UI, not output
- `dist/` — build output
- `Run a Sync Check/` — this folder itself
