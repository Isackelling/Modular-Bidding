# Sherman Bidding System — Technical Specification

> **This is the authoritative source of truth for intended system behavior.**
> All code, sync checks, and system tests should be verified against this document.
> Last updated: Feb 2026

---

## System Overview

The Sherman Bidding System is a web application for managing manufactured home installation quotes, contracts, and project cost tracking for Sherman Pole Buildings (Sherman Lumber Inc., Mora MN).

It handles the full lifecycle: customer intake → quote → accepted → contract → cost tracking (Scrubb) → completion.

---

## Architecture

- **Framework:** React 18 + Vite, single-page application
- **Persistence:** localStorage via `window.storage`
- **No backend** — all data lives in the browser
- **Dev server:** `localhost:3001`
- **Build output:** `dist/`
- **Auth:** Staff password (`SHERMAN` / `BIDDING`), then username selection. Customer portal: `mybid` + firstName + lastName

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
Folders:      folders: { clayton_docs[], crew_files[], estimates[], permits[], change_orders[] }
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
`sewerSystem`, `wellSystem`, `patio`, `patioWidth`, `patioLength`,
`landscaping`, `deckProject`, `hasGarage`

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

## Default Services (Pre-Selected on New Quote)

```
installation_of_home, drywall, painting, carpet, dumpster,
siding_install, interior_trim_out, permits, electric_connection,
concrete_skirting, plumbing, gas_propane
```
Total: 12 services pre-selected.

---

## Allowance Items

These 6 items have estimated costs at quote time, finalized during construction.
They are tracked in the Scrubb tab and affect the contingency fund balance.

```javascript
ALLOWANCE_ITEMS = ['permits', 'gravel_driveway', 'sand_pad', 'sewer', 'well', 'crane']
```

---

## Contingency Fund

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

All 8 generators are in `src/utils/documentGeneration.js`.

| # | Function | Purpose | Saved To Folder |
|---|----------|---------|-----------------|
| 1 | `generateCustomerQuote` | Customer-facing pricing document | `estimates` |
| 2 | `generateQuoteHtml` | Internal admin quote summary | `estimates` |
| 3 | `generateCrewWorkOrderDocument` | Crew job-site instructions | `crew_files` |
| 4 | `generateJobSummaryReport` | Post-completion tracking | `estimates` |
| 5 | `generatePierDiagramHtml` | Visual pier layout | `crew_files` |
| 6 | `generateScopeOfWorkDocument` | Legal scope of work | `estimates` |
| 7 | `generateChangeOrderDocument` | Change order delta | `change_orders` |
| 8 | `generateAllowanceProgressDocument` | Live allowance/contingency status | `estimates` |

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

---

## File Folder Structure

Each quote has 5 folders in `quote.folders`:

| Key | Purpose |
|-----|---------|
| `clayton_docs` | Factory docs, floor plans, spec sheets |
| `crew_files` | Crew work orders, installation docs, customer info |
| `estimates` | Customer quotes, scope of work, allowance updates |
| `permits` | Permit documentation, inspection reports |
| `change_orders` | Change order documents |

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
9. Manufactured Home Warranty
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
