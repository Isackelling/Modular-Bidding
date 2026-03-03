# Sherman Bidding System — Technical Specification

> **This is the authoritative source of truth for intended system behavior.**
> All code, sync checks, and system tests should be verified against this document.
> Last updated: Feb 2026

---

## System Overview

The Sherman Bidding System is a web application for managing modular home installation quotes, contracts, and project cost tracking for Sherman Pole Buildings (Sherman Lumber Inc., Mora MN).

It handles the full lifecycle: customer intake → quote → accepted → contract → cost tracking (Scrubb) → completion.

---

## Glossary

Canonical definitions for every domain term used in this spec. All sections must use these terms exactly. If a term is not in this glossary, it should not appear in the codebase.

| Term | Definition |
|------|-----------|
| **Quote** | A priced estimate for a modular home installation job. Lives in the `quotes` array. |
| **Contract** | An accepted quote copied into the `contracts` array. Tracks actual costs during construction. |
| **Change Order (CO)** | A revision to an existing contract that adds, removes, or adjusts line items. Versioned as CO #1a, #1b, #2a, etc. |
| **Scrubb** | The cost-tracking interface where Admin and Crew record actual costs against contract estimates during construction. Named after the internal process, not an acronym. |
| **NHL Contract** | A grouped line item in Scrubb combining three costs: materials total (matT) + installation_of_home + painting. Always tracked as one unit. "NHL" is a legacy internal label. |
| **Allowance Item** | One of 6 services whose costs are estimated at quote time but finalized during construction: permits, gravel_driveway, sand_pad, sewer, well, crane. Variances flow into the contingency fund. |
| **Contingency Fund** | A budget reserve (default 2% of total) that absorbs allowance overages and receives allowance savings. Customers can refill it via contingency payments. |
| **Contingency Payment** | A customer payment that refills the contingency fund. Stored in `scrubbPayments` with `isContingencyPayment = true`. These are additions to the fund, not draws. |
| **matT** | Materials total — the sum of all material costs (pier, siding, trim, etc.). |
| **svcT** | Services total — the sum of all selected service costs + utility services + custom services. |
| **projCmd** | Project Command — the combined cost of PS + PM + PC (supervision, management, coordination). |
| **PS** | Project Supervisor — on-site supervisor cost, scales with number of services and miles. |
| **PM** | Project Manager — management cost, scales with miles. |
| **PC** | Project Coordinator — coordination cost, derived from PM. |
| **driveTime** | Despite the name, this is a **distance in miles** (not a time). Represents one-way distance from Sherman to the job site. Minimum enforced: 15 miles. |
| **driveCost** | The dollar cost of one drive trip: `miles × DRIVE_RATE_SERVICE ($20/mi)`. |
| **Variance** | `contractPrice - actualCost`. Positive = under budget (savings). Negative = over budget (overage). |
| **calcTotals()** | The pricing engine function that computes all derived costs from a quote's fields. Located in `src/utils/calculations.js`. |
| **emptyQuote()** | The factory function that defines all canonical field names with default values. Located in `src/App.jsx`. This is the schema source of truth. |
| **Customer Portal** | A read-only view for customers accessed via password `mybid` + firstName + lastName. Shows quotes, budget tracker, and published notes. |
| **Published Notes** | Notes that have been explicitly published (moved from draft to the published array). Only published notes appear in documents and the customer portal. Draft notes are private. |
| **serviceDimensions** | Per-service dimension inputs (length, width, depth) used for dimension-based pricing. Currently used by `surfaced_driveway` and `surfaced_sidewalks`. Stored as `{ [serviceKey]: { length, width, depth } }`. |
| **serviceDescriptions** | Per-service user-generated description strings displayed in documents. Stored as `{ [serviceKey]: string }`. |
| **Surfaced Driveway / Sidewalks** | Services priced by area: `length × width × rate`, where rate depends on concrete depth (4" = $9.25/sqft, 6" = $13.75/sqft). Dimensions stored in `serviceDimensions`. |
| **CO Administrative Fee** | A flat $300 fee added to each Change Order (except Allowance Overage COs). Defined as `PRICING.CO_ADMIN_FEE` in constants. |
| **TEAM_CONTACTS** | Contact info for the Sherman team displayed in the Homeowner's Guide. Defined in `constants/index.js` so staff changes don't require code edits. |

**Deprecated terms — do not use:**

| Deprecated | Replacement | Reason | Revision |
|-----------|-------------|--------|----------|
| ~~sewerSystem~~ | `sewerType` | Field was never a "system"; it selects a sewer bed size | Rev 1, Jan 2026 |
| ~~wellSystem~~ | `wellDepth` | Field stores depth in feet, not a system type | Rev 1, Jan 2026 |
| ~~patio~~ | `patioSize` | Field is a size selector ('none', '6', '8', '10'), not a boolean | Rev 1, Jan 2026 |
| ~~patioWidth / patioLength~~ | `patioSize` | Patio is selected by pre-set size, not custom dimensions | Rev 1, Jan 2026 |
| ~~landscaping~~ | `hasLandscaping` | Boolean toggle, requires the `has` prefix | Rev 1, Jan 2026 |
| ~~deckProject~~ | `hasDeck` | Boolean toggle, requires the `has` prefix | Rev 1, Jan 2026 |
| ~~hasGarage~~ | (none) | Garages are not part of this system | Rev 1, Jan 2026 |
| ~~manufactured~~ | **modular** | Company rebranding — use "modular home" everywhere in UI and documents | Rev 2, Feb 2026 |

---

## Architecture

- **Framework:** React 18 + Vite, single-page application
- **Persistence:** localStorage via `window.storage`
- **No backend** — all data lives in the browser
- **Dev server:** `localhost:3001`
- **Build output:** `dist/`
- **Auth:** Staff password (`SHERMAN` / `BIDDING`), then username selection. Customer portal: `mybid` + firstName + lastName

---

## Non-Goals / Out of Scope

This spec does NOT cover and the system does NOT implement:

- **No backend or database.** All data is localStorage only. No server, no API, no cloud sync.
- **No multi-user concurrency.** One browser = one user at a time. No conflict resolution, locking, or merge logic.
- **No email, SMS, or push notifications.** All communication happens outside the app.
- **No PDF generation.** Documents are HTML opened in new browser windows for printing via the browser's native print dialog.
- **No mobile-specific layouts.** The app is designed for desktop use. It may render on mobile but responsive behavior is not specified.
- **No undo/redo system.** Changes are saved immediately. There is no history stack or revert capability beyond the scrubbHistory log.
- **No audit logging beyond scrubbHistory.** Quote edits, user actions, and login events are not logged.
- **No data import/export.** No CSV, Excel, or bulk import. No data migration tooling.
- **No internationalization.** English only, USD only, Minnesota-centric.
- **No automated testing infrastructure.** Tests are manual via the sync check and system test playbooks.
- **No garage, barn, or non-home structures.** The system handles modular home installation only.

---

## User Roles

| Role | Can Do |
|------|--------|
| **Admin** | Everything. Can switch to Sales or Crew view for testing. |
| **Sales** | Create/edit customers and quotes, generate documents, manage files |
| **Crew** | Read-only jobs view, access Scrubb tab, upload crew files |
| **Customer** | Read-only portal — view own quotes, active job budget tracker, published notes |

**Scrubb tab** is accessible to Admin and Crew only. Sales cannot access it.

---

## Data Pipeline

```
spec.md          ← intended behavior (this document)
     │
     ▼
emptyQuote()     ← canonical field names (src/App.jsx ~line 52)
     │
     ▼
calcTotals()     ← pricing engine (src/utils/calculations.js)
     │
     ▼
8 document generators  ← output (src/utils/documentGeneration.js)
+ ScrubbTab.jsx        ← contingency tracking
+ CustomerPortal.jsx   ← customer-facing balance
```

---

## Quote Object Schema

Canonical field names from `emptyQuote()`. **Do not reference fields outside this list** unless they are dynamic fields (see below).

```
Identity:     id, customerId, quoteType, status
Home:         homeModel, homeBasePrice, houseWidth, houseLength, singleDouble, walkDoors, iBeamHeight
Foundation:   foundationType  ('none' | 'slab' | 'basement' | 'crawlspace')
Utilities:    sewerType       ('none' | '1_bed' | '2_bed' | '3_bed')
              wellDepth       (string number, feet)
              patioSize       ('none' | '6' | '8' | '10')
              driveTime       (string number, miles — minimum 15)
Services:     selectedServices        (object: key → boolean)
              servicePriceOverrides   (object: key → price string)
              serviceQuantities       (object: key → number)
              serviceDays             (object: key → number)
              serviceDimensions      (object: key → { length, width, depth })
              serviceDescriptions    (object: key → string)
              serviceNotes            (object: key → string)
              serviceCrewNotes        (object: key → string)
              publishedServiceNotes   (object: key → array of note objects)
              publishedServiceCrewNotes (object: key → array)
Notes:        generalCrewNote, generalCustomerNote  (draft strings)
              publishedGeneralCrewNotes []
              publishedGeneralCustomerNotes []
Custom:       customServices  [{ name, price }]
              customOptions   [{ name, price, quantity }]
              customMaterials [{ name, price, quantity }]
Removed:      removedMaterials {}
              removedServices  {}
Landscaping:  landscapingMaterialCost  (string, user-entered)
Deck:         deckMaterialCost         (string, user-entered)
Tracking:     scrubbCosts {}           (key → actual cost number)
              scrubbDocs  {}           (key → array of doc objects)
              scrubbHistory []
              permitEntries []
Folders:      folders: { clayton_docs[], crew_files[], estimates[], permits[], change_orders[], contracts[] }
```

**Dynamic fields** — not in `emptyQuote()`, added at runtime:
- `hasLandscaping` (boolean) — toggled by checkbox
- `landscapingDays` (number)
- `hasDeck` (boolean) — toggled by checkbox
- `deckDays` (number)
- `scrubbPayments []` — added when first payment recorded
- `contingencyRate` (string) — user-adjustable, defaults to `'2'`
- `markupRate` (string) — user-adjustable, defaults to `'10'`
- `changeOrderOf` (id) — set when creating a change order
- `changeOrderNum`, `changeOrderVersion` — CO versioning
- `changeOrderAdditions`, `changeOrderDeletions`, `changeOrderAdjustments`

**Fields that do NOT exist (never reference):**
See the **Deprecated terms** table in the Glossary for full context on why each was removed.
`sewerSystem` → use `sewerType`, `wellSystem` → use `wellDepth`, `patio` → use `patioSize`,
`patioWidth` / `patioLength` → use `patioSize`, `landscaping` → use `hasLandscaping`,
`deckProject` → use `hasDeck`, `hasGarage` → (removed, garages out of scope)

---

## Customer Object Schema

```
id, firstName, lastName, phone, email
person2FirstName, person2LastName, phone2, email2
siteAddress, siteCity, siteState (default 'MN'), siteZip, siteCounty
mailingAddress, mailingCity, mailingState, mailingZip
createdAt, createdBy
```

---

## Calculation Pipeline

### Total Cost Formula

```
matT     = sum of all material costs
svcT     = sum of all selected service costs + utility services + custom services
homePrice = homeBasePrice × 1.2   (HOME_MARKUP = 1.2)
projCmd  = Project Command total (PS + PM + PC)

sub      = matT + svcT + homePrice + projCmd
oh       = sub × 0.05              (overhead, always 5%)
mu       = (sub + oh) × markupRate (default 10%, configurable per quote)
total    = sub + oh + mu

contingency = total × contingencyRate  (default 2%, configurable per quote)
totalWithContingency = total + contingency
```

**Closing Costs** (optional service, `closing_costs`):
- Self-referential: `closingCost = total × (0.07 / 0.93)`
- Added to svcT, then sub/oh/mu/total are recalculated

### Project Command (PS + PM + PC)

```
miles    = max(driveTime, 15)
numSvc   = count of selected services + utilities + custom services

PS (Project Supervisor) = (numSvc × $150) + (miles × $15 × numSvc)
PM (Project Manager)    = (miles × $15) + $4,000
PC (Project Coordinator) = (PM / 2) + (miles × $15)
```

### Drive Rates

| Usage | Rate |
|-------|------|
| Installation of Home | $20/mi (INSTALLATION_COSTS.DRIVE_RATE_PER_MILE) |
| Services (general) | $20/mi (DRIVE_RATE_SERVICE) |
| Project Command | $15/mi (DRIVE_RATE_PC) |
| Install transport | $22/mi (DRIVE_RATE_INSTALL) |
| **Minimum miles** | **15** (enforced by `enforceMiles()`) |

### Installation of Home Cost Breakdown

```
installation       = (miles × $20 × 2) + ($800 single / $1,600 double)
axles              = $275 single / $550 double
deliveryInspection = (miles × $20) + $600
wrapUp             = (miles × $20) + $600
foundationAdj      = +$4,000 if foundationType = 'basement' or 'crawlspace'

total = installation + axles + deliveryInspection + wrapUp + foundationAdj
```

### Foundation Adjustments (service price add-ons)

> **Cross-cutting concern:** These adjustments modify service prices defined elsewhere. When implementing any service's price calculation, check if foundationType triggers an add-on here.

When `foundationType = 'basement'`:
- `sand_pad` +$5,000
- `plumbing` +$2,000
- `electric_connection` +$3,000
- Auto-adds: `basement_stairs` ($2,000+drive), `water_heater` ($1,500+drive), `updraft_furnace` ($6,000+drive)

When `foundationType = 'crawlspace'`:
- `sand_pad` +$5,000

### Utility Service Pricing

**Sewer** (selected via `sewerType`):
- `1_bed` = $14,200 + (driveCost × 2)
- `2_bed` = $16,700 + (driveCost × 2)
- `3_bed` = $17,200 + (driveCost × 2)

**Well** (`wellDepth` > 0):
- `$120 × wellDepth ft` + driveCost

**Patio** (selected via `patioSize`):
- `6` = $8,300
- `8` = $10,300
- `10` = $13,800

### Special Service Calculations

**Concrete Skirting:**
```
patioExtra = patioSize > 0 ? patioSize × 2 : 0
cost = ((24 × (perimeter + patioExtra)) + ((miles + 200) × 3)) × 1.1
```

**LP SmartSide Siding:**
```
length ≤ 52' → $6,550 × 1.05
length 53–64' → $6,950 × 1.05
length ≥ 65' → $7,850 × 1.05
```

**Landscaping** (`hasLandscaping = true`):
```
cost = landscapingMaterialCost + $1,200 labor + (driveCost × landscapingDays)
```

**Deck** (`hasDeck = true`):
```
cost = deckMaterialCost + $1,200 labor + (driveCost × deckDays)
```

**Foundation - Slab:**
```
cost = (houseWidth × houseLength × $8) + driveCost
```

**Foundation - Basement/Crawlspace:**
- Basement default: $30,000 + driveCost
- Crawlspace default: $22,000 + driveCost

### Material Quantities

| Material | Quantity Formula |
|----------|-----------------|
| Great Stuff | Fixed: 2 |
| Floor Coverings | `ceil(((width × 12) / 39) × length / 100)` |
| 16x4 Cookies | `walkDoors × 6` |
| Tyvek | Fixed: 1 |
| Anchor System | Fixed: 2 |
| 20" Steel Pier | `pierCount + (walkDoors × 2)` — when iBeam ≥ 11 |
| 22" Steel Pier | `pierCount + (walkDoors × 2)` — when iBeam < 11 |
| 32" Steel Pier | `ceil(length / 12)` — marriage line (double-wide only) |
| Tie Down Straps | Fixed: 4 — single-wide only |
| Coil Nails | Fixed: 1 |
| Asphalt Silicon | Fixed: 2 |
| Stairs (4-step) | `walkDoors` count |
| Heat Tape | Fixed: 1 |
| Fiberglass Wrap | Fixed: 1 |
| Aluminum Foil Tape | Fixed: 1 |

### Pier Count

```
Single-wide: pierCount = ceil(2 × ceil(length/6 + 1) × 1  + 2 × walkDoors)
Double-wide: pierCount = ceil(2 × ceil(length/6 + 1) × 2.5)
```

### I-Beam Height

```
calcIBeam(length):
  length < 56ft  → 10"
  length ≥ 56ft  → 12"

Pier size selection:
  iBeamHeight ≥ 11  → 20" steel pier
  iBeamHeight < 11  → 22" steel pier
```

---

## Worked Examples

These examples show complete calculations for representative scenarios. A correct implementation must reproduce these numbers exactly.

### Example A: 60ft Double-Wide, Slab Foundation, 30 miles

**Inputs:**
```
houseWidth: 28, houseLength: 60, singleDouble: 'double'
foundationType: 'slab', walkDoors: 2, driveTime: 30
sewerType: '2_bed', wellDepth: '120', patioSize: '8'
homeBasePrice: 95000, markupRate: '10', contingencyRate: '2'
All 12 default services selected. No custom services.
hasLandscaping: false, hasDeck: false
```

**Pier Calculation:**
```
iBeamHeight = 12" (length 60 ≥ 56)
pier type = 20" steel (iBeam 12 ≥ 11)
pierCount = ceil(2 × ceil(60/6 + 1) × 2.5)
          = ceil(2 × ceil(11) × 2.5)
          = ceil(2 × 11 × 2.5)
          = ceil(55) = 55
20" pier quantity = 55 + (2 × 2) = 59
32" pier quantity = ceil(60 / 12) = 5  (marriage line, double-wide)
```

**Drive Costs:**
```
miles = max(30, 15) = 30
driveCost (service) = 30 × $20 = $600
```

**Installation of Home:**
```
installation       = (30 × $20 × 2) + $1,600 = $2,800
axles              = $550 (double)
deliveryInspection = (30 × $20) + $600 = $1,200
wrapUp             = (30 × $20) + $600 = $1,200
foundationAdj      = $0 (slab, not basement/crawlspace)
total              = $2,800 + $550 + $1,200 + $1,200 = $5,750
```

**Foundation Slab:**
```
cost = (28 × 60 × $8) + $600 = $13,440 + $600 = $14,040
```

**Sewer (2_bed):**
```
cost = $16,700 + ($600 × 2) = $17,900
```

**Well:**
```
cost = $120 × 120 + $600 = $14,400 + $600 = $15,000
```

**Patio (8ft):**
```
cost = $10,300
```

**Closing Costs (self-referential formula explanation):**
```
Why 0.07 / 0.93: Closing costs are 7% of the FINAL total, but they are
themselves part of that total. To avoid circular math:
  closingCost = totalBeforeClosing × (0.07 / 0.93)
This ensures that when closingCost is added to the total, closing costs
are exactly 7% of the new total.

Example: if totalBeforeClosing = $100,000
  closingCost = $100,000 × (0.07 / 0.93) = $7,526.88
  newTotal = $107,526.88
  verify: $7,526.88 / $107,526.88 = 7.00% ✓
```

### Example B: 48ft Single-Wide, Basement, 15 miles (minimum)

**Inputs:**
```
houseWidth: 16, houseLength: 48, singleDouble: 'single'
foundationType: 'basement', walkDoors: 2, driveTime: 10
sewerType: 'none', wellDepth: '0', patioSize: 'none'
```

**Key differences from Example A:**
```
miles = max(10, 15) = 15  (minimum enforced)
iBeamHeight = 10" (length 48 < 56)
pier type = 22" steel (iBeam 10 < 11)
pierCount = ceil(2 × ceil(48/6 + 1) × 1 + 2 × 2)
          = ceil(2 × ceil(9) × 1 + 4)
          = ceil(2 × 9 + 4)
          = ceil(22) = 22
No 32" marriage line piers (single-wide)
Tie down straps: 4 (single-wide only)

Basement triggers:
  - installation foundationAdj = +$4,000
  - sand_pad price += $5,000
  - plumbing price += $2,000
  - electric_connection price += $3,000
  - Auto-adds: basement_stairs, water_heater, updraft_furnace

wellDepth = '0' → well is NOT selected (no cost)
sewerType = 'none' → sewer is NOT selected (no cost)
patioSize = 'none' → patio is NOT selected (no cost)
```

### Example C: Contingency Fund Tracking

**Scenario:** Contract with $200,000 total, 2% contingency, two allowance items tracked.

```
startingContingency = $200,000 × 0.02 = $4,000

Permits: contractPrice = $3,000, actualCost = $2,500
  variance = $3,000 - $2,500 = +$500 (savings → added to fund)

Gravel driveway: contractPrice = $5,000, actualCost = $6,200
  variance = $5,000 - $6,200 = -$1,200 (overage → drawn from fund)

One change order drew $800 from contingency:
  totalCODraws = $800

Customer made one contingency payment of $1,000:
  contingencyPayments = $1,000

currentBalance = $4,000 - $800 + $500 - $1,200 + $1,000 = $3,500
```

---

## Default Services (Pre-Selected on New Quote)

```
installation_of_home, drywall, painting, carpet, dumpster,
siding_install, interior_trim_out, permits, electric_connection,
concrete_skirting, plumbing, gas_propane
```
Total: 12 services pre-selected.

---

## Allowance Items

> **Depends on:** Calculation Pipeline (service pricing), Contingency Fund (variance flows into fund)
> **Required state:** Quote must be a contract with scrubbCosts populated

These 6 items have estimated costs at quote time, finalized during construction.
They are tracked in the Scrubb tab and affect the contingency fund balance.

```javascript
ALLOWANCE_ITEMS = ['permits', 'gravel_driveway', 'sand_pad', 'sewer', 'well', 'crane']
```

---

## Contingency Fund

> **Depends on:** Allowance Items (variance values), Change Orders (CO draws), scrubbPayments (contingency payments)
> **Required state:** Quote must be a contract. Contingency only has meaning during active construction tracking.

**Three locations must produce identical results:**
1. `src/App.jsx` (inline Scrubb tab) — Contingency Fund Tracker
2. `src/utils/documents/generateAllowanceProgressDocument.js`
3. `src/components/Auth/CustomerPortal.jsx` → `renderBudgetTracker`

Note: `src/components/Quotes/ScrubbTab.jsx` is dead code (not imported). The Scrubb tab is inline in App.jsx.

**Formula:**
```
startingContingency = total × contingencyRate  (default 2%)
                      (or reconstructed from CO history: coHistory[0].contingencyUsed + contingencyBalance)

totalCODraws        = sum of contingencyUsed from changeOrderHistory

allowanceSavings    = sum of variance > 0 for ALLOWANCE_ITEMS
allowanceOverages   = sum of abs(variance) where variance < 0 for ALLOWANCE_ITEMS

contingencyPayments = scrubbPayments.filter(p => p.isContingencyPayment)
                                    .reduce(sum of p.amount)
                      NOTE: These are customer REFILLS to the fund (added back)

currentBalance = startingContingency - totalCODraws + allowanceSavings - allowanceOverages + contingencyPayments
```

**Variance sign convention:**
```
variance = contractPrice - actualCost
Positive = under budget → savings → added to contingency fund
Negative = over budget  → overage → drawn from contingency fund
```

---

## NHL Contract (Scrubb Grouping)

In the Scrubb cost-tracking interface, these three items are always grouped into one "NHL Contract" line:

```
NHL Contract = matT (materials total) + installation_of_home + painting
```

---

## Status Workflows

### Quote Status
```
Draft → Sent → Accepted
              ↓
           Declined
```
Accepted quote is copied into the contracts array. Original remains in quotes.

### Contract Status
```
Accepted → Under Contract → Completed
         ↘                ↗
           Cancelled (any point)
```

### Change Order Numbering
```
Original quote / contract → CO #1a → (revise) → CO #1b → (new CO) → CO #2a
```

---

## Document Generators

> **Depends on:** calcTotals() must have run first — generators consume computed totals, not raw fields. All generators also depend on the Quote Object Schema (field names) and Customer Object Schema (customer data joined at generation time).

Each generator is a separate file in `src/utils/documents/`, re-exported via `src/utils/documents/index.js`.

| # | Function | File | Purpose | Saved To Folder |
|---|----------|------|---------|-----------------|
| 1 | `generateCustomerQuote` | `generateCustomerQuote.js` | Customer-facing pricing document | `estimates` |
| 2 | `generateQuoteHtml` | `generateQuoteHtml.js` | Internal admin quote summary | `estimates` |
| 3 | `generateCrewWorkOrderDocument` | `generateCrewWorkOrderDocument.js` | Crew job-site instructions | `crew_files` |
| 4 | `generateJobSummaryReport` | `generateJobSummaryReport.js` | Post-completion tracking | `estimates` |
| 5 | `generatePierDiagramHtml` | `generatePierDiagramHtml.js` | Visual pier layout | `crew_files` |
| 6 | `generateScopeOfWorkDocument` | `generateScopeOfWorkDocument.js` | Legal scope of work | `estimates` |
| 7 | `generateChangeOrderDocument` | `generateChangeOrderDocument.js` | Change order delta | `change_orders` |
| 8 | `generateAllowanceProgressDocument` | `generateAllowanceProgressDocument.js` | Live allowance/contingency status | `estimates` |
| 9 | `generateManufacturedHomeContract` | `generateModularHomeDocuments.js` | Formal contract agreement | `contracts` |
| 10 | `generateFormaldehydeDisclosure` | `generateModularHomeDocuments.js` | MN Statute 325F.182 compliance | `contracts` |
| 11 | `generateHomeownerGuide` | `generateModularHomeDocuments.js` | Customer onboarding & key acknowledgements | `contracts` |
| 12 | `generateWarrantyStatement` | `generateModularHomeDocuments.js` | Warranty terms & claims process | `contracts` |
| 13 | `generateAllowancesExplainerDocument` | `generateAllowancesExplainerDocument.js` | Allowance system explainer for customers | `estimates` |

### What Each Document Must Include

**generateCustomerQuote & generateQuoteHtml**
- All pricing line items, total, contingency amount, totalWithContingency
- Home model, dimensions, foundationType
- sewerType, wellDepth, patioSize (if selected)
- hasLandscaping, hasDeck (if true)
- Published customer-facing notes

**generateCrewWorkOrderDocument**
- Everything the crew needs on-site:
  - Dimensions, homeModel, singleDouble, foundationType
  - sewerType, wellDepth, patioSize, driveTime
  - hasLandscaping + landscapingDays, hasDeck + deckDays
  - walkDoors, iBeamHeight
  - Published crew notes (per-service and general)
  - All selected services with quantities and days

**generateAllowanceProgressDocument**
- Starting contingency
- Each allowance item: contractPrice, actualCost (from scrubbCosts), variance
- permitEntries sub-breakdown
- contingencyPayments (from scrubbPayments where isContingencyPayment = true)
- currentBalance using the contingency formula above

**generatePierDiagramHtml**
- Only: houseWidth, houseLength, singleDouble, iBeamHeight, foundationType
- Renders visual pier placement diagram

**generateScopeOfWorkDocument**
- selectedServices, customServices
- Dimensions, homeModel, foundationType

**generateChangeOrderDocument**
- Side-by-side comparison: original vs. change order
- changeOrderAdditions, changeOrderDeletions, changeOrderAdjustments
- Price delta

**generateJobSummaryReport**
- All service details including quantities, days, costs
- Dimensions, walkDoors, sewerType, wellDepth, patioSize, driveTime

**generateManufacturedHomeContract**
- Customer names (both parties), full site and mailing addresses
- Home model, totalWithContingency as contract price
- Contractor info: Sherman Homes, Lic. # BC532878
- Manufacturer: Schult Homes by Clayton, Redwood Falls MN
- 50% down payment, 90–120 working day estimate
- $300 change order administrative fee reference
- Warranty periods: Schult 1-year workmanship, 10-year structural

**generateFormaldehydeDisclosure**
- Customer names only (legal compliance document)
- MN Statute 325F.182 notice with health warnings (min 13px font)
- Factory-built material list (particleboard, OSB, plywood, etc.)

**generateHomeownerGuide**
- All selected services (to describe scope of work)
- User contact info (fullName, officePhone, cellPhone, email)
- 7 key acknowledgements: document review, factory vs site division, factory lock-in deadlines, site readiness, joint inspection, warranty limitations, inspection/acceptance

**generateWarrantyStatement**
- Customer names and site address
- Manufacturer warranty terms (Schult 1-year & 10-year)
- Sherman warranty terms (structural & workmanship)
- Claims process and exclusions

**generateAllowancesExplainerDocument**
- Customer names
- All selected allowance items with costs from totals.svc
- totals.contingency amount
- Plain-language explanation of how allowances and contingency work

---

## Cross-Verification Requirements

Values that must match across multiple locations. A sync check must verify all of these.

### Contingency Balance (3 locations)
The contingency fund `currentBalance` must produce identical results in:
1. `src/App.jsx` — inline Scrubb tab, Contingency Fund Tracker section
2. `src/utils/documents/generateAllowanceProgressDocument.js` — printed allowance report
3. `src/components/Auth/CustomerPortal.jsx` → `renderBudgetTracker` — customer-facing view

All three must use the same formula: `startingContingency - totalCODraws + allowanceSavings - allowanceOverages + contingencyPayments`

### Total Cost (4 locations)
The `total` and `totalWithContingency` values must match across:
1. `calcTotals()` — the computation source
2. `generateCustomerQuote` — customer-facing document
3. `generateQuoteHtml` — internal admin document
4. `generateJobSummaryReport` — post-completion report

### Variance Sign Convention (all Scrubb-related code)
`variance = contractPrice - actualCost` — positive is savings, negative is overage. Must be consistent in:
1. Scrubb tab inline in App.jsx
2. `generateAllowanceProgressDocument`
3. `CustomerPortal.jsx` budget tracker

### Drive Rate Usage (4 distinct rates)
Each rate is used in specific contexts only. Using the wrong rate is a silent pricing bug:
| Rate | Constant | Used for |
|------|----------|----------|
| $20/mi | `DRIVE_RATE_SERVICE` | General service drive costs |
| $20/mi | `INSTALLATION_COSTS.DRIVE_RATE_PER_MILE` | Installation of home calculation |
| $15/mi | `DRIVE_RATE_PC` | Project Command (PS, PM, PC) |
| $22/mi | `DRIVE_RATE_INSTALL` | Install transport |

### NHL Contract Grouping
Wherever NHL Contract appears (Scrubb tab, allowance document), it must equal exactly: `matT + installation_of_home + painting`. No other items included, none of these three excluded.

### Foundation Adjustment Propagation
When `foundationType` changes, these must all update in the same `calcTotals()` pass:
- `installation_of_home` foundationAdj (+$4,000 for basement/crawlspace)
- `sand_pad` price (+$5,000 for basement, +$5,000 for crawlspace)
- `plumbing` price (+$2,000 for basement only)
- `electric_connection` price (+$3,000 for basement only)
- Auto-added services (basement only): `basement_stairs`, `water_heater`, `updraft_furnace`

---

## File Folder Structure

Each quote has 6 folders in `quote.folders`:

| Key | Purpose |
|-----|---------|
| `clayton_docs` | Factory docs, floor plans, spec sheets |
| `crew_files` | Crew work orders, installation docs, customer info |
| `estimates` | Customer quotes, scope of work, allowance updates |
| `permits` | Permit documentation, inspection reports |
| `change_orders` | Change order documents |
| `contracts` | Contract agreements, disclosures, homeowner guide, warranty |

File object: `{ id, name, type, url, notes, addedBy, addedAt }`

---

## Key Constants

| Constant | Value |
|----------|-------|
| `HOME_MARKUP` | 1.2 (20%) |
| `MIN_MILES` | 15 |
| `DRIVE_RATE_SERVICE` | $20/mi |
| `DRIVE_RATE_PC` | $15/mi |
| `PRICING.OVERHEAD` | 0.05 (5%) |
| `PRICING.MARKUP` | 0.10 (10%) — default, configurable |
| `PRICING.CONTINGENCY` | 0.02 (2%) — default, configurable |
| `PRICING.CLOSING_COSTS` | 0.07 (7%) |
| `PRICING.SLAB_COST_PER_SQ_FT` | $8 |
| `INSTALLATION_COSTS.FOUNDATION_ADJUSTMENT` | $4,000 |
| `INSTALLATION_COSTS.DELIVERY_INSPECTION` | $600 |
| `INSTALLATION_COSTS.WRAP_UP` | $600 |

---

## Boundary Conditions & Edge Cases

How the system handles zero, empty, and edge-case inputs. A correct implementation must handle all of these without crashing or producing NaN.

| Field | Edge Value | Expected Behavior |
|-------|-----------|-------------------|
| `driveTime` | `'0'`, `'5'`, empty | Enforce minimum 15 miles via `enforceMiles()`. Never calculate with < 15. |
| `wellDepth` | `'0'` or empty | Well is not selected. Cost = $0. Do not add well to services. |
| `sewerType` | `'none'` | Sewer is not selected. Cost = $0. Do not add sewer to services. |
| `patioSize` | `'none'` | Patio is not selected. Cost = $0. `patioExtra` in concrete skirting = 0. |
| `houseLength` | `'0'` or empty | Quote is incomplete. Pier count formula should not produce NaN — treat as 0. |
| `houseWidth` | `'0'` or empty | Quote is incomplete. Slab cost should be $0, not NaN. |
| `walkDoors` | `0` or undefined | Cookie count = 0, stair count = 0, pier adjustment = 0. |
| `homeBasePrice` | `'0'` or empty | homePrice = $0. Total still calculated from services + materials. |
| `selectedServices` | All deselected | svcT = $0. Project Command numSvc = 0, so PS = $0 + drive component. |
| `customServices` | Empty array `[]` | No custom services. Do not add to svcT. |
| `scrubbCosts` | Empty object `{}` | All actual costs = $0. Variances = full contract price (savings). |
| `scrubbPayments` | Missing or `undefined` | Treat as empty array. contingencyPayments = $0. |
| `changeOrderHistory` | Missing or empty | totalCODraws = $0. startingContingency = `total × contingencyRate`. |
| `contingencyRate` | Missing or empty | Default to `'2'` (2%). |
| `markupRate` | Missing or empty | Default to `'10'` (10%). |
| `landscapingMaterialCost` | `'0'` or empty when `hasLandscaping` = true | Cost = $0 material + $1,200 labor + drive. Labor and drive still apply. |
| `deckMaterialCost` | `'0'` or empty when `hasDeck` = true | Same as landscaping — labor and drive still apply. |
| `iBeamHeight` | Missing | Calculate from `houseLength` via `calcIBeam()`. Never leave undefined. |
| `foundationType` | `'none'` | No foundation service. No adjustments. No foundation cost. |

**String-to-number parsing:** All user-entered cost/quantity fields are stored as strings. Calculations must `parseFloat()` and handle NaN (treat as 0).

---

## MN Licensed Services

These services require an installer's license per MN state statute:

```
installation_of_home, siding_install, permits,
electric_connection, concrete_skirting, plumbing, gas_propane
```

---

## Warranties (Reference)

| Manufacturer | Terms |
|-------------|-------|
| BlueLinx (Exterior Door) | 10yr Steel / 25yr Fiberglass |
| Certainteed (Shingles) | 10 Years |
| Samsung (Appliances) | 2 Years |
| Carrier | 2 Year Limited |
| Pella Windows | 5 Years |
| Rheem (Water Heaters) | 1 Year |
| Shaw Flooring | 1 Year |
| Smart Lap Siding | 50yr Pro-Rated |
| Sherman - Structural | 30 Years |
| Sherman - Workmanship | 10 Years |

---

## Completion Checklist Items

1. Seal Badge (Dept of Labor)
2. State Seal Certificate (Dept of Labor)
3. Foundation Inspection Request (Chuck Olsen)
4. Builders Certificate (HUD)
5. Radon Gas Certificate
6. Certificate of Occupancy (Permit Issuer)
7. Surety Bond
8. Plot Plan
9. Modular Home Warranty
10. Certificate of Origin (Manufacturer)
11. Lien Release

---

## Delivery Checklist

**Docs:** HUD data plate, red HUD tag, installation instructions, warranties, Install Badge photo

**Exterior:** Siding, roof, windows, trim/porches, transit damage

---

## Sherman Company Info

- **Address:** 2244 Hwy 65, Mora, MN 55051
- **Structural Warranty:** 30 Years
- **Workmanship Warranty:** 10 Years
