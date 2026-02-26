# Sherman Bidding System — Sync-Check Agent

> An AI-powered consistency guardian for your quote-to-document pipeline.
> When you change the quote page, this tool tells you exactly what else needs updating — and fixes it.

---

## Table of Contents

1. [What Problem This Solves](#1-what-problem-this-solves)
2. [Quick Start — Four Steps](#2-quick-start)
3. [System Architecture](#3-system-architecture)
4. [Complete Field-to-Document Mapping](#4-field-to-document-mapping)
5. [How to Use It — Step by Step](#5-how-to-use-it)
6. [The Two Key Buttons: Edit Quote and Change Order](#6-edit-quote-and-change-order-buttons)
7. [Every Change Scenario With Examples](#7-change-scenarios)
8. [The Prompts Used and Why](#8-the-prompts)
9. [Auto-Apply Safety Guide](#9-auto-apply-safety)
10. [Troubleshooting Guide](#10-troubleshooting)
11. [Configuration Reference](#11-configuration-reference)
12. [Comparison With Generic AI Agent Approaches](#12-comparison-with-generic-approaches)

---

## 1. What Problem This Solves

### The Data Pipeline

The Sherman bidding app has a strictly one-directional data flow:

```
emptyQuote() in App.jsx
       │
       │  40+ fields
       │  homeModel, houseWidth, houseLength, foundationType,
       │  sewerType, wellDepth, patioSize, selectedServices,
       │  serviceNotes, serviceCrewNotes, driveTime, and more...
       ▼
calcTotals() in calculations.js
       │
       │  totals: { total, svcT, matT, contingency, driveCost, ... }
       ▼
┌──────────────────────────────────────────────────────────────────┐
│                    documentGeneration.js                          │
│                                                                  │
│  1. generateQuoteHtml()               Internal admin summary     │
│  2. generateCustomerQuote()           Customer-facing document   │
│  3. generatePierDiagramHtml()         Visual pier layout         │
│  4. generateScopeOfWorkDocument()     Formal legal scope         │
│  5. generateCrewWorkOrderDocument()   Crew job-site instructions │
│  6. generateJobSummaryReport()        Completion checklist       │
│  7. generateChangeOrderDocument()     Change order tracking      │
│  8. generateAllowanceProgressDocument() Cost variance tracking   │
└──────────────────────────────────────────────────────────────────┘
```

### The Problem

When you add a new field to the quote page — for example, you add a "garage" option — you have to manually update all 8 document generators so they include the garage info. In practice you might update 4 of them and forget the other 4. The crew shows up without knowing there's a garage to account for. The customer quote doesn't mention it.

This tool catches every one of those missed updates automatically.

### How It Catches Them

Every time you make a change, you run `npm run sync-check`. The agent:

1. Reads exactly what you changed (git diff)
2. Sends that diff + the full document generator code to Claude
3. Claude reads all 3,700 lines of document generator code and identifies every place your new field should appear but doesn't
4. Gives you a color-coded report showing which documents are complete and which have gaps
5. Offers to auto-apply the fixes

---

## 2. Quick Start

### One-Time Setup (do this once)

**Step 1: Install the Anthropic SDK**
```bash
npm install @anthropic-ai/sdk
```

**Step 2: Create your .env file**
```bash
copy .env.example .env
```
Then open `.env` and replace the placeholder with your real API key.

Get a key at: https://console.anthropic.com/settings/keys
It looks like: `sk-ant-api03-...`

**Step 3: Verify it works**
```bash
npm run sync-check
```
If there are no staged changes, you'll see:
```
  No changes detected.
  Tips:
    • Stage your changes first: git add src/App.jsx
```
That means it's working correctly.

### Daily Use (do this every time you make a change)

```bash
# 1. Make your change to App.jsx, calculations.js, or constants/index.js

# 2. Stage the changed file
git add src/App.jsx

# 3. Run the sync-check
npm run sync-check

# 4. Review the report, apply fixes when prompted
```

---

## 3. System Architecture

### File Structure

```
scripts/
├── sync-check.js          ← Entry point (npm run sync-check runs this)
└── lib/
    ├── config.js           ← Loads sync-check.config.json + defaults
    ├── gitDiff.js          ← Gets git diff (staged → unstaged → last commit)
    ├── contextAssembler.js ← Builds Claude's context package (~44K tokens)
    ├── claudeClient.js     ← Calls the Anthropic API (system prompt lives here)
    ├── responseParser.js   ← Parses Claude's JSON response
    ├── reportRenderer.js   ← Color-coded terminal output
    └── autoApply.js        ← Patches files with suggested fixes

sync-check.config.json      ← Your settings (auto-apply mode, critical docs, etc.)
.env                        ← Your API key (NOT committed to git)
.env.example                ← Template to copy from
docs/
└── SYNC-CHECK.md           ← This file
```

### How Each Module Connects

```
sync-check.js
    │
    ├──→ config.js          Load sync-check.config.json
    │
    ├──→ gitDiff.js         Get staged diff
    │                       (staged → unstaged → last commit)
    │
    ├──→ contextAssembler.js
    │       │
    │       ├── Read emptyQuote() from App.jsx
    │       ├── Read full documentGeneration.js
    │       ├── Read constants/index.js
    │       └── Read calculations.js (if App.jsx or calc files changed)
    │
    ├──→ claudeClient.js     Build system + user prompts → call API
    │                        Model: claude-opus-4-6
    │                        Temperature: 0 (deterministic)
    │                        Max tokens: 8,192
    │
    ├──→ responseParser.js   Extract JSON → structured analysis object
    │
    ├──→ reportRenderer.js   Print color-coded terminal report
    │
    └──→ autoApply.js        Prompt y/n/review → patch documentGeneration.js
```

### Token Budget

The agent must stay within Claude's 200,000 token context window.

| Content Sent to Claude | Approx Size | Approx Tokens |
|------------------------|-------------|---------------|
| Git diff | ~5 KB | 1,250 |
| emptyQuote() function | ~2 KB | 500 |
| documentGeneration.js (full) | ~130 KB | 32,500 |
| constants/index.js | ~15 KB | 3,750 |
| calculations.js (when changed) | ~25 KB | 6,250 |
| **Total** | **~177 KB** | **~44,250** |

We use approximately **22% of Claude's context window** — well within budget even as the app grows.

---

## 4. Field-to-Document Mapping

This table maps every quote field to the documents that use it.

**Legend:**
- `USES` — document actively references and displays/uses this field
- `IMPLIED` — field affects this document indirectly through calcTotals()
- `N/A` — field is not relevant to this document's purpose

### Core Fields

| Quote Field | Customer Quote | Quote HTML | Pier Diagram | Scope of Work | Crew Work Order | Job Summary | Change Order | Allowance Progress |
|-------------|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| homeModel | USES | USES | N/A | USES | USES | USES | N/A | N/A |
| homeBasePrice | IMPLIED | IMPLIED | N/A | N/A | IMPLIED | IMPLIED | IMPLIED | N/A |
| houseWidth | USES | USES | **USES** | USES | USES | USES | N/A | N/A |
| houseLength | USES | USES | **USES** | USES | USES | USES | N/A | N/A |
| singleDouble | USES | USES | **USES** | USES | USES | USES | N/A | N/A |
| iBeamHeight | N/A | N/A | **USES** | N/A | N/A | N/A | N/A | N/A |
| walkDoors | N/A | N/A | N/A | N/A | N/A | USES | N/A | N/A |
| foundationType | USES | USES | N/A | USES | USES | USES | N/A | N/A |

### Services & Options

| Quote Field | Customer Quote | Quote HTML | Pier Diagram | Scope of Work | Crew Work Order | Job Summary | Change Order | Allowance Progress |
|-------------|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| selectedServices | USES | USES | N/A | USES | USES | USES | USES | USES |
| servicePriceOverrides | IMPLIED | IMPLIED | N/A | N/A | IMPLIED | IMPLIED | USES | N/A |
| serviceQuantities | N/A | N/A | N/A | N/A | USES | USES | N/A | N/A |
| serviceDays | N/A | N/A | N/A | N/A | USES | USES | N/A | N/A |
| customServices | USES | USES | N/A | USES | N/A | N/A | USES | N/A |
| customOptions | USES | USES | N/A | N/A | N/A | N/A | N/A | N/A |
| customMaterials | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A |

### Notes

| Quote Field | Customer Quote | Quote HTML | Pier Diagram | Scope of Work | Crew Work Order | Job Summary | Change Order | Allowance Progress |
|-------------|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| serviceNotes | USES | N/A | N/A | N/A | USES | N/A | N/A | N/A |
| serviceCrewNotes | N/A | N/A | N/A | N/A | USES | N/A | N/A | N/A |
| publishedServiceNotes | USES | USES | N/A | N/A | USES | N/A | N/A | N/A |
| publishedServiceCrewNotes | N/A | N/A | N/A | N/A | USES | N/A | N/A | N/A |
| publishedGeneralCustomerNotes | USES | N/A | N/A | N/A | N/A | N/A | N/A | N/A |
| publishedGeneralCrewNotes | N/A | N/A | N/A | N/A | USES | N/A | N/A | N/A |

### Site & Utilities

| Quote Field | Customer Quote | Quote HTML | Pier Diagram | Scope of Work | Crew Work Order | Job Summary | Change Order | Allowance Progress |
|-------------|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| sewerType | USES | USES | N/A | N/A | USES* | USES | N/A | USES |
| wellDepth | USES | USES | N/A | N/A | USES* | USES | N/A | USES |
| patioSize | USES | USES | N/A | N/A | USES* | USES | N/A | N/A |
| driveTime | N/A | N/A | N/A | N/A | USES | USES | N/A | N/A |

> **\*NOTE — Known Existing Bugs in Crew Work Order:**
> The crew work order currently uses **wrong field names** for these three fields:
> - Uses `quote.sewerSystem` → should be `quote.sewerType`
> - Uses `quote.wellSystem` → should be `quote.wellDepth`
> - Uses `quote.patio` → should be `quote.patioSize`
>
> The sync-check agent will flag these as BROKEN issues on its first run.

### Special Features

| Quote Field | Customer Quote | Quote HTML | Pier Diagram | Scope of Work | Crew Work Order | Job Summary | Change Order | Allowance Progress |
|-------------|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| hasLandscaping | USES | USES | N/A | USES | USES | USES | USES | N/A |
| landscapingMaterialCost | IMPLIED | IMPLIED | N/A | N/A | N/A | N/A | N/A | N/A |
| landscapingDays | N/A | N/A | N/A | N/A | USES | USES | N/A | N/A |
| hasDeck | USES | USES | N/A | USES | USES | USES | USES | N/A |
| deckMaterialCost | IMPLIED | IMPLIED | N/A | N/A | N/A | N/A | N/A | N/A |
| deckDays | N/A | N/A | N/A | N/A | USES | USES | N/A | N/A |

### Project Tracking

| Quote Field | Customer Quote | Quote HTML | Pier Diagram | Scope of Work | Crew Work Order | Job Summary | Change Order | Allowance Progress |
|-------------|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| scrubbCosts | N/A | N/A | N/A | N/A | N/A | N/A | N/A | USES |
| scrubbPayments | N/A | N/A | N/A | N/A | N/A | N/A | N/A | USES |
| permitEntries | N/A | N/A | N/A | N/A | N/A | N/A | N/A | USES |

### Administrative (Not Used in Any Document)

These fields are purely system/database fields. No document needs them:

`id`, `customerId`, `status`, `folders`, `scrubbHistory`, `changeOrderNum`, `changeOrderVersion`

---

## 5. How to Use It

### Before You Make Changes

Always start with a clean working state so the diff is focused:
```bash
git status
# Should show either clean or only your in-progress changes
```

### Make Your Change to the Quote Page

**Example:** You're adding a "garage" option.

In [src/App.jsx](../src/App.jsx), you add:
```javascript
// In emptyQuote():
hasGarage: false,
garageSize: 'none',  // 'none' | '1_car' | '2_car' | '3_car'

// In the quote form JSX:
<label>
  <input
    type="checkbox"
    checked={newQ.hasGarage}
    onChange={e => setNewQ({...newQ, hasGarage: e.target.checked})}
  />
  Garage
</label>
{newQ.hasGarage && (
  <select value={newQ.garageSize} onChange={e => setNewQ({...newQ, garageSize: e.target.value})}>
    <option value="1_car">1 Car</option>
    <option value="2_car">2 Car</option>
    <option value="3_car">3 Car</option>
  </select>
)}
```

### Stage Your Changes

```bash
git add src/App.jsx
```

### Run the Sync-Check

```bash
npm run sync-check
```

### Reading the Report

```
  Sherman Bidding System — Sync-Check Agent

  Changed files: src/App.jsx
  Assembling context for Claude...
  Context ready: ~44k tokens

  Sending to Claude claude-opus-4-6 for analysis...
  (This usually takes 20-40 seconds for large files)

══════════════════════════════════════════════════════════════
  SHERMAN BIDDING — SYNC-CHECK REPORT
══════════════════════════════════════════════════════════════

Changed Files:
  • src/App.jsx

Trigger Type: field_addition

Changes Detected:
  → New boolean field 'hasGarage' added to emptyQuote()
  → New string field 'garageSize' added to emptyQuote()
  → Garage toggle and size selector added to quote form JSX

Gaps Found: 4 total, 2 critical

Document Analysis:
──────────────────────────────────────────────────────────────

Customer Quote  NEEDS UPDATE ⚠
  New garage fields not referenced in customer-facing document.
  Gaps:
    • hasGarage not shown in home options section
    • garageSize not shown when hasGarage is true
  Suggested Fixes: 1
    1. Add garage display to customer quote home options section
       Location: after the patio display block, ~line 312
       Code: ${quote.hasGarage ? `<p><strong>Garage:</strong>…

Quote HTML (Internal)  NEEDS UPDATE ⚠
  ...

Crew Work Order  NEEDS UPDATE ⚠  (CRITICAL)
  The crew needs to know about garage during site work.
  ...

Job Summary Report  NEEDS UPDATE ⚠  (CRITICAL)
  Garage should be tracked and verified at project completion.
  ...

Scope of Work  NEEDS UPDATE ⚠
  Scope should include or exclude garage work explicitly.
  ...

Change Order  NEEDS UPDATE ⚠
  Garage can be added/removed via change order — document must track it.
  ...

Allowance Progress  N/A
  Garage is not a variable-cost allowance item. No update needed.

Pier Diagram  N/A
  Garage does not affect pier layout dimensions. No update needed.

──────────────────────────────────────────────────────────────

Auto-Apply Fixes
6 suggested fixes are available.

Apply 6 fixes to documentGeneration.js? (y / n / review):
```

### Applying Fixes

Type your choice:
- `y` — Apply all 6 fixes automatically
- `n` — Show suggestions only; you'll apply them manually
- `review` — Step through each fix one at a time, you decide each one

---

## 6. Edit Quote and Change Order Buttons

These two buttons in the app UI trigger the biggest downstream changes. The sync-check agent understands both flows.

### Edit Quote Button

**What it does in the app:** Opens an existing saved quote for modification. The user can change prices, add/remove services, change dimensions, update notes — anything.

**Why it matters for sync-check:** When you make changes to how the quote form works (adding fields, changing validation, changing how data is stored), the edit-quote flow uses the same fields. The agent treats any change to the quote form as potentially affecting the edit-quote flow.

**When Claude detects this trigger:** When the diff touches fields that feed into pricing totals, service selections, or dimension inputs.

**Documents typically affected:**
- Customer Quote (CRITICAL — customer sees updated pricing)
- Quote HTML Internal (CRITICAL — admin review)
- Crew Work Order (CRITICAL — crew gets updated instructions)
- Job Summary Report
- Scope of Work (if scope changes)
- Change Order (if the field tracks between versions)

### Change Order Edit Button

**What it does in the app:** Creates a new version of an accepted quote that documents what changed. The change order shows: what was added, what was removed, what was adjusted, and the net cost impact.

**Why it matters for sync-check:** When you add a new field to the quote, you need to ask: "Can this field change between the original quote and a change order?" If yes, the Change Order document needs to know about it.

**When Claude detects this trigger:** When the diff touches fields that have change order equivalents in the state (e.g., `changeOrderAdditions`, `changeOrderDeletions`, `changeOrderAdjustments`).

**Documents typically affected:**
- Change Order Document (ALWAYS)
- Customer Quote (updated totals)
- Allowance Progress (if a variable-cost item changed)
- Crew Work Order (if services changed)

**Example:** You add a "solar panels" service option. The sync-check will identify:
1. The customer quote needs to show solar panels
2. The crew work order needs to include solar installation steps
3. The **change order document** needs to be able to show "Solar Panels: ADDED — $12,000" or "Solar Panels: REMOVED — -$12,000"

---

## 7. Change Scenarios

### Scenario 1: Adding a New Field

**The change:**
```javascript
// Added to emptyQuote():
hasGarage: false,
garageSize: 'none',
```

**What Claude detects:**
- Two new fields in emptyQuote()
- New UI inputs in the form

**Typical gaps found:**
- Customer Quote: garage not shown
- Quote HTML: garage not in admin summary
- Crew Work Order: crew doesn't know about garage
- Job Summary: garage not in completion checklist
- Scope of Work: scope doesn't include/exclude garage
- Change Order: can't track garage additions/removals

**Documents NOT affected:**
- Pier Diagram: garage doesn't affect pier layout
- Allowance Progress: garage isn't a variable-cost allowance

---

### Scenario 2: Renaming a Field

**The change:**
```javascript
// Before:
patioType: 'none',
// After (renamed):
patioSize: 'none',
```

**What Claude detects:**
- Field `patioType` removed from emptyQuote()
- Field `patioSize` added
- This is a rename

**Typical gaps found:**
- Every document that references `quote.patioType` is now BROKEN
- The agent provides exact find-and-replace fixes: `quote.patioType` → `quote.patioSize`

**Documents affected:** Any that had `patioType` references — marked as BROKEN, not NEEDS_UPDATE

---

### Scenario 3: Removing a Field

**The change:**
```javascript
// Removed from emptyQuote() (walkDoors is always 2 now):
// walkDoors: '2',
```

**What Claude detects:**
- Field `walkDoors` removed from emptyQuote()

**Typical gaps found:**
- generateJobSummaryReport references `quote.walkDoors` — needs cleanup
- Dead reference should be removed

---

### Scenario 4: Changing a Calculation

**The change in calculations.js:**
```javascript
// Before: landscaping base rate was $1,500/day
const landscapingDayRate = 1500;
// After: increased to $1,800/day
const landscapingDayRate = 1800;
```

**What Claude detects:**
- Calculation change in calculations.js
- Landscaping day rate changed

**Typical result:**
- Documents that use `totals.svcT` (which includes landscaping) pick up the change automatically — COMPLETE
- The agent checks if any document hardcodes the old rate — if found, marked NEEDS_UPDATE
- `calculationsImpact.affectsCalculations: true` with an explanation

---

### Scenario 5: Adding a New Service Type

**The change in constants/index.js:**
```javascript
// Added to DEFAULT_SERVICES:
solar_panels: {
  name: 'Solar Panels',
  base: 12000,
  calc: 'flat',
  addDrive: false,
}
```

**What Claude detects:**
- New service definition in constants
- Checks which service category it falls into

**Typical result:**
- Most documents loop over `selectedServices` automatically — they'll pick it up: COMPLETE
- The agent checks if any document has a hardcoded list of services that needs updating
- If solar panels should be in ALLOWANCE_ITEMS (variable cost), Allowance Progress needs updating

---

### Scenario 6: Adding a Pricing Override Field

**The change:**
```javascript
// Added to emptyQuote():
garagePrice: '',  // manual price override for garage

// In quote form:
<input
  type="number"
  value={newQ.garagePrice}
  onChange={e => setNewQ({...newQ, garagePrice: e.target.value})}
  placeholder="Override price"
/>
```

**What Claude detects:**
- New price override field
- This affects totals

**Typical gaps found:**
- Customer Quote: should show the override price
- Change Order: price override can change between versions
- `calculationsImpact.affectsCalculations: true`

---

## 8. The Prompts

### Why claude-opus-4-6?

This task requires:
- Reading and understanding 3,700 lines of document generator code
- Tracing data flow through multiple abstraction layers
- Reasoning about what "should" appear in each document based on its purpose
- Generating syntactically correct JavaScript code for fixes

Claude claude-opus-4-6 is the most capable model available. Cheaper/faster models would miss nuances.

### Why temperature: 0?

Code analysis requires determinism. Temperature 0 means Claude gives the most consistent, reliable results rather than "creative" suggestions. Every time you run the check on the same diff, you should get the same analysis.

### Why require a JSON response?

The prompt instructs Claude to return only a JSON object with a specific schema. This:

1. Makes parsing 100% reliable — no regex scraping of prose
2. Forces Claude to organize its analysis into structured findings
3. Enables the auto-apply engine to extract exact `searchFor`/`replaceWith` pairs
4. Makes the output programmatically usable for future tooling

### Why send the full documentGeneration.js?

At ~130KB, documentGeneration.js is the largest file we send. We send all of it because:

- Gaps can appear anywhere across all 8 generators
- Context about how one generator handles a field helps Claude understand patterns in others
- It's 32K of a 200K token budget — less than 20% of what's available
- Sending only a subset would miss cross-generator patterns

### Why extract emptyQuote() separately?

Even though App.jsx contains it, we extract just the `emptyQuote()` function because:

- It's the single, definitive source of truth for every quote field
- It's small (~2KB) and perfectly scoped to the question "what fields exist?"
- Claude sees it prominently at the top, not buried in 5,000 lines of JSX

### The Full System Prompt

The full system prompt is in [scripts/lib/claudeClient.js](../scripts/lib/claudeClient.js), in the `SYSTEM_PROMPT` constant. It contains:

- Claude's role definition ("senior React developer + code auditor")
- The architecture explanation (data flow from emptyQuote → calcTotals → 8 generators)
- The exact fields of the quote object (from emptyQuote)
- All 8 document generators with their purpose and relevant fields
- The decision rules (when is each document critical vs optional vs N/A)
- Special handling for Edit Quote and Change Order button flows
- The known existing bugs (sewerSystem, wellSystem, patio field names)
- The exact JSON schema Claude must return

---

## 9. Auto-Apply Safety Guide

### How Auto-Apply Works

The engine reads `documentGeneration.js`, finds the exact text specified in `fix.searchFor`, and replaces it with `fix.replaceWith`. This is **exact string replacement** — it cannot introduce syntax errors by itself.

If a pattern isn't found (e.g., the file was modified after the analysis), it logs `FAIL` and you apply it manually. The tool never makes up changes.

### Safe to Auto-Apply

These types of fixes are safe to auto-apply without review:
- Adding a new field display after an existing similar block
- Renaming a field reference (`quote.oldName` → `quote.newName`)
- Fixing a known wrong field name (the sewerSystem/wellSystem/patio bugs)
- Adding a new service display to an existing services list

### Review Before Applying

Apply these manually or use the `review` mode to inspect first:
- Structural changes to a document section
- Fixes that modify complex template literal interpolations
- Changes near IIFE blocks (`(() => { ... })()` pattern in document generators)
- Fixes where the suggested code is more than ~20 lines

### If Something Goes Wrong

Every change is made only to `src/utils/documentGeneration.js`.

To undo everything:
```bash
git checkout src/utils/documentGeneration.js
```

Then run `npm run build` to verify the app still works.

### Three Apply Modes

| Mode | When to Use |
|------|-------------|
| `y` (apply all) | You trust the analysis and want all gaps fixed at once |
| `n` (skip all) | You want to review the suggestions and apply them manually |
| `review` (one by one) | You want to inspect each fix individually before applying |

---

## 10. Troubleshooting

### "No changes detected"

**Cause:** The git diff is empty.

**Solutions:**
1. Stage your changes: `git add src/App.jsx`
2. Make sure you actually saved the file
3. Check git status: `git status`
4. If you want to analyze a specific past commit, set `"diffTarget": "abc1234"` in sync-check.config.json

---

### "ANTHROPIC_API_KEY not found"

**Cause:** The `.env` file doesn't exist or the key isn't set.

**Solutions:**
1. `copy .env.example .env`
2. Open `.env` and replace the placeholder with your real key
3. Make sure the key starts with `sk-ant-`

**If you're on Node.js older than 20.6:**
The `--env-file` flag requires Node 20.6+. Check your version: `node --version`

If you're on an older version, install dotenv:
```bash
npm install dotenv
```
Then add this line to the very top of `scripts/sync-check.js`:
```javascript
import 'dotenv/config';
```

---

### "API key is invalid or expired"

**Cause:** The API key in `.env` is wrong or has been revoked.

**Solution:** Get a new key at https://console.anthropic.com/settings/keys

---

### "Could not parse Claude's response as JSON"

**Cause:** Claude occasionally adds a sentence before or after the JSON despite instructions.

**What the parser does:** It tries to extract the JSON object by finding `{` and `}`. Usually this works.

**If it keeps failing:**
1. Run again — occasionally a retry produces clean JSON
2. Check the first 800 chars of the response shown in the error — it may give a clue
3. The raw response is logged — you can manually read the analysis from it

---

### "Pattern not found in file — apply manually"

**Cause:** Claude suggested code that differs slightly from what's actually in `documentGeneration.js`.

**This happens when:**
- The file was modified between running the analysis and applying fixes
- Claude's `searchFor` string has slightly different whitespace than the file

**Solution:** Read the `searchFor` and `replaceWith` values shown in the terminal, and manually apply the change in `documentGeneration.js`.

---

### "Git diff failed"

**Cause:** Not in a git repository, or git is not installed.

**Solution:** Run sync-check from inside the Modular Bidding folder:
```bash
cd "C:\Users\IsacKelling\OneDrive - Sherman Lumber Inc\Desktop\Modular Bidding"
npm run sync-check
```

---

### Claude takes a long time (30-60 seconds)

**This is normal.** We send ~44K tokens to Claude and ask for a detailed analysis of 3,700 lines. Expect 20-60 seconds. The model is doing careful work — that's what we want.

---

### "FAIL" on a fix that should work

**Cause:** The `searchFor` pattern includes characters that differ (whitespace, quote style) from what's in the file.

**Debug steps:**
1. Open `documentGeneration.js`
2. Use Ctrl+F to search for the first few words of the `searchFor` string
3. Compare what you find to the full `searchFor` — identify the difference
4. Apply the fix manually with the correct text

---

## 11. Configuration Reference

### sync-check.config.json

All options are optional. Defaults are used for any missing keys.

```json
{
  "diffTarget": "HEAD",
  "autoApply": "prompt",
  "criticalDocuments": [...],
  "optionalDocuments": [...],
  "monitoredFiles": [...],
  "outputDocumentFile": "src/utils/documentGeneration.js",
  "ignoreFields": [...]
}
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `diffTarget` | string | `"HEAD"` | Git ref to diff against. Use `"HEAD~1"` for last commit, or a SHA like `"abc1234"`. |
| `autoApply` | `"never"` \| `"prompt"` \| `"always"` | `"prompt"` | `"never"` = never offer to apply. `"prompt"` = ask each time. `"always"` = auto-apply without asking. |
| `criticalDocuments` | string[] | [QuoteHtml, CustomerQuote, CrewWorkOrder, JobSummary] | Documents considered critical — Claude gives them priority attention. |
| `optionalDocuments` | string[] | [PierDiagram, ScopeOfWork, ChangeOrder, AllowanceProgress] | Documents that get reviewed but are lower priority. |
| `monitoredFiles` | string[] | [App.jsx, calculations.js, CalcHelpers.js, constants/index.js] | Files the agent watches for changes. |
| `outputDocumentFile` | string | `"src/utils/documentGeneration.js"` | The file that gets analyzed and patched. |
| `ignoreFields` | string[] | [id, customerId, status, folders, scrubbHistory, ...] | Quote fields to skip in the analysis. |

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | YES | Your Anthropic API key (`sk-ant-...`) |

---

## 12. Comparison With Generic AI Agent Approaches

You may have seen generic AI agent frameworks like LangChain, CrewAI, or "AGENTS.md" approaches. Here's how this agent differs and why those approaches are less suitable for this specific use case.

### Generic Approach (e.g., Grok/AGENTS.md style)

A generic agent typically:
- Uses a broad system prompt like "keep back-end in sync with front-end"
- Maintains a `dependencies.yaml` mapping files to their dependents
- Triggers on any push via GitHub Actions
- Generates generic "proposed diff patches"
- Requires careful prompting to avoid hallucinations about your specific codebase

**Limitations for this use case:**
- Doesn't know the specific field names (`sewerType`, `patioSize`, etc.)
- Doesn't know which of the 8 documents cares about dimensions vs services vs costs
- Can't provide exact `searchFor`/`replaceWith` code because it doesn't know the actual file content
- Generic change detection misses nuanced things like "this field belongs in allowance tracking"

### This Agent (Sherman Sync-Check)

This agent:
- Has the **full** `documentGeneration.js` in context — Claude reads every line
- Knows **exactly** which fields each document uses (the mapping table above is baked into the system prompt)
- Knows the **purpose** of each document (customer-facing vs crew-facing vs legal)
- Detects the **trigger type** (edit-quote flow vs change-order flow)
- Knows the **existing bugs** in the code and will flag them
- Provides **verbatim code fixes** extracted from the actual file content
- Works **locally** — no GitHub Actions, no cloud CI, no setup beyond an API key

### When to Use a Generic Approach Instead

A generic AGENTS.md approach makes sense when:
- You have many different files with unclear dependencies
- You need GitHub Actions integration (remote CI)
- Your codebase is too large for Claude's context window
- You need multi-agent coordination (planning, coding, reviewing agents)

For a single focused task like "keep 8 document generators in sync with 1 quote page," a purpose-built, specific agent beats a generic framework every time.

---

*This document is the complete reference for the Sherman Bidding Sync-Check Agent.*
*If you add new output documents to documentGeneration.js, update the system prompt in `scripts/lib/claudeClient.js` to include the new generator.*
