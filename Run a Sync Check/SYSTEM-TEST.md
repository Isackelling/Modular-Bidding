# Sherman Bidding System — Full System Test

> When the user says "run a system test," follow this document A-Z.
> Each section specifies exactly what code to read and what to verify.
> This is a code audit — trace every connection, formula, and handler.
> Expected time: 10–15 minutes of thorough reading and cross-referencing.

---

## How to Run This Test

1. Read each section in order (A through Z)
2. For each check, read the specified file/line range
3. Verify the code matches the expected behavior
4. Mark each check: **PASS**, **FAIL**, or **NOTE** (worth watching)
5. At the end, summarize all FAIL and NOTE items grouped by severity
6. Apply fixes immediately or list them for user approval

---

## A. Authentication & Login

**Files:** `src/App.jsx` — login section, `login()` function

- [ ] Admin login: credentials check uses `SHERMAN` / `BIDDING`
- [ ] Customer portal: password `mybid` + customer firstName+lastName (no spaces, case-insensitive)
- [ ] `login()` sets `isAuth`, routes to user picker or customer portal
- [ ] `logout()` clears: `isAuth`, `selCustomer`, `selQuote`, `selContract`, `view`, `userName`
- [ ] Role picker shows after admin login (admin, sales, crew options)
- [ ] `handleSelectUser(user)` sets `userName`, `userRole`, routes to dashboard
- [ ] Customer portal login: looks up customer by firstName+lastName match, routes to portal view
- [ ] Admin can switch roles via header dropdown without re-login

---

## B. Data Load & Persistence

**Files:** `src/App.jsx` — useEffect on mount, `saveQuotes`, `saveContracts`, `saveCustomers`, `saveUsers`, `savePricing`

- [ ] On mount: loads `sherman_quotes`, `sherman_contracts`, `sherman_customers`, `sherman_users` from localStorage
- [ ] On mount: loads `sherman_pricing` and merges with defaults (so new defaults aren't lost)
- [ ] `saveQuotes(list)` writes to `sherman_quotes`
- [ ] `saveContracts(list)` writes to `sherman_contracts`
- [ ] `saveCustomers(list)` writes to `sherman_customers` AND calls `syncCustomersToServer()`
- [ ] `saveUsers(list)` writes to `sherman_users`
- [ ] `savePricing()` writes combined pricing to `sherman_pricing`
- [ ] Legacy field migration: `materials.price` → `materials.cost` (if old data exists)
- [ ] `emptyQuote()` is called for new quotes — verify it contains ALL expected fields (cross-ref PLAYBOOK.md field list)

---

## C. emptyQuote Source of Truth

**File:** `src/App.jsx` — `emptyQuote()` function

Verify each field exists in emptyQuote AND is the name used everywhere else:

- [ ] `sewerType` (NOT `sewerSystem`)
- [ ] `wellDepth` (NOT `wellSystem`)
- [ ] `patioSize` (NOT `patio`, `patioWidth`, `patioLength`)
- [ ] `hasLandscaping`, `landscapingMaterialCost`, `landscapingDays`
- [ ] `hasDeck`, `deckMaterialCost`, `deckDays`
- [ ] `markupRate`, `contingencyRate` (customizable %)
- [ ] `scrubbPayments` array exists
- [ ] `permitEntries` array exists
- [ ] `addlMaterialEntries` array exists
- [ ] `changeOrderHistory` array exists
- [ ] `customScopeContent` object exists
- [ ] `folders` has all expected keys: `clayton_docs`, `crew_files`, `estimates`, `permits`, `change_orders`

---

## D. Customer Management

**File:** `src/App.jsx` — customer handlers, `emptyCustomer()`, customer form section

**Create Customer:**
- [ ] `emptyCustomer()` initializes all required fields
- [ ] Required field validation: firstName, lastName, siteAddress, phone, email
- [ ] Email duplicate check runs across ALL customers (primary + secondary email)
- [ ] Phone duplicate check runs across ALL customers (primary + secondary phone)
- [ ] Shows creator info when duplicate found
- [ ] All string fields trimmed before save
- [ ] New customer gets: `id`, `createdAt`, `createdBy`
- [ ] After save: `saveCustomers()` called → triggers `syncCustomersToServer()`

**Edit Customer:**
- [ ] Edit copies current customer data into form
- [ ] `updatedAt`, `updatedBy` updated on save
- [ ] Duplicate checks exclude the customer being edited (doesn't flag itself)

**Delete Customer:**
- [ ] Checks if customer has any quotes or contracts
- [ ] Prevents deletion if quotes/contracts exist (shows message)
- [ ] If no quotes: removes from customers array, saves

**View Customer:**
- [ ] Shows all quotes for that customer (status badges)
- [ ] Shows all contracts
- [ ] Click quote → routes to view quote
- [ ] New Quote button → routes to quote creation for that customer

---

## E. Quote Creation & Field Updates

**File:** `src/App.jsx` — `emptyQuote()`, `updateField()`, quote form

**Field Dependency Chains (verify each auto-updates correctly):**
- [ ] `homeModel` selected → auto-fills `homeBasePrice`, `houseWidth`, `houseLength`, `iBeamHeight`, `singleDouble`
- [ ] `houseWidth` changed → auto-updates `singleDouble` (Single if ≤ some threshold, Double otherwise)
- [ ] `houseLength` changed → recalculates `iBeamHeight` via `calcIBeam()`
- [ ] `foundationType` = `basement` or `crawlspace` → auto-selects related services (stairs, water heater, furnace for basement; verify which)
- [ ] `driveTime` enforces minimum: cannot go below `MIN_MILES` (15)
- [ ] `sewerType` = `none` → sewer service not selected/priced
- [ ] `sewerType` ≠ `none` → sewer service priced correctly per type
- [ ] `wellDepth` = `0` → well not priced
- [ ] `wellDepth` > `0` → well priced at $120/ft (or current rate) + drive time
- [ ] `patioSize` = `none` → patio not priced
- [ ] `patioSize` ≠ `none` → patio priced from patio pricing table

**Service Selection:**
- [ ] Checkbox toggles `selectedServices[key]` boolean
- [ ] Price override sets `servicePriceOverrides[key]`
- [ ] Reset override (↺ button) deletes `servicePriceOverrides[key]`
- [ ] `serviceQuantities[key]` updates correctly from quantity inputs
- [ ] `serviceDays[key]` updates correctly from days inputs

---

## F. Pricing Calculation Pipeline

**File:** `src/utils/calculations.js` — `calcTotals()`

Trace the full formula and verify each step:

- [ ] `homePrice = homeBasePrice × HOME_MARKUP` (or similar — verify exact formula)
- [ ] `matT` = sum of all material costs (verify materials loop)
- [ ] `svcT` = sum of all service costs (selectedServices + custom services + custom options)
- [ ] Drive cost calculation: `driveTime × driveRate` (verify which rate per service type)
- [ ] `projCmd` = Project Command (PS + PM + PC) — verify formula: `psPerService × serviceCount + pmBase + PC`
- [ ] `sub = matT + svcT + homePrice + projCmd`
- [ ] `oh = sub × 0.05` (5% overhead)
- [ ] `mu = (sub + oh) × markupRate` (default 10%, customizable)
- [ ] `total = sub + oh + mu`
- [ ] `contingency = total × contingencyRate` (default 2%, customizable)
- [ ] `totalWithContingency = total + contingency`
- [ ] Well depth pricing: `$120/ft × wellDepth + drive cost`
- [ ] Concrete skirting: calculated from house perimeter + patio sides
- [ ] Service prices respect `servicePriceOverrides` when set
- [ ] `removedServices` causes service to be skipped in total

---

## G. Summary Display & Pricing Breakdown

**File:** `src/App.jsx` — right-column summary section

- [ ] Materials total displayed matches `matT` from `calcTotals()`
- [ ] Services total displayed matches `svcT`
- [ ] Home price displayed correctly
- [ ] Project Command total displayed
- [ ] Overhead (5%) row displayed
- [ ] Markup row shows customizable % and correct amount
- [ ] Grand Total matches `total` from `calcTotals()`
- [ ] Contingency line shown separately with `contingencyRate`% and `contingency` amount
- [ ] ALLOWANCE items shown in yellow allowance section
- [ ] Non-allowance services shown in professional services section
- [ ] Removed services NOT shown (or shown in restore section)
- [ ] Custom services appear in correct section
- [ ] Custom materials appear in materials table
- [ ] Custom options appear correctly

---

## H. Notes System

**File:** `src/App.jsx` — note publishing handlers

**Per-Service Notes:**
- [ ] Draft note textarea → `serviceNotes[key]` or `serviceCrewNotes[key]`
- [ ] Publish customer note → appends to `publishedServiceNotes[key]` array with `{text, publishedAt, publishedBy}`
- [ ] Publish crew note → appends to `publishedServiceCrewNotes[key]` array
- [ ] Draft textarea clears after publish
- [ ] Edit published note → moves text back to draft, removes from published array
- [ ] Delete published note → removes from published array
- [ ] Blue dot count indicator shows number of published notes

**General Notes:**
- [ ] `generalCustomerNote` draft → publish → `publishedGeneralCustomerNotes` array
- [ ] `generalCrewNote` draft → publish → `publishedGeneralCrewNotes` array
- [ ] Same edit/delete flow as service notes

**Notes in Documents:**
- [ ] Customer quote shows `publishedServiceNotes` (NOT crew notes)
- [ ] Crew work order shows `publishedServiceCrewNotes` (NOT customer notes)
- [ ] Customer portal shows only `publishedServiceNotes`
- [ ] General customer notes show in customer-facing documents
- [ ] General crew notes show in crew work order

---

## I. Document Generation — All 8 Generators

**File:** `src/utils/documentGeneration.js`

### I-1. generateQuoteHtml
- [ ] Receives: `(quote, totals, homeModels)`
- [ ] Shows: home model, dimensions, all selected services with prices
- [ ] Grand total matches `totals.total`
- [ ] Uses `quote.sewerType` (NOT `sewerSystem`)
- [ ] Uses `quote.wellDepth` (NOT `wellSystem`)
- [ ] Uses `quote.patioSize` (NOT `patio`)
- [ ] Uses `quote.hasLandscaping` (NOT `quote.landscaping`)
- [ ] Uses `quote.hasDeck` (NOT `quote.deckProject`)
- [ ] Published customer notes shown
- [ ] Custom services, options shown

### I-2. generateCustomerQuote
- [ ] Receives: `(quote, totals, homeModels)`
- [ ] Professional customer-facing layout
- [ ] Grand total matches `totals.total` (same number as Quote HTML)
- [ ] `sewerType` check: `quote.sewerType && quote.sewerType !== 'none'`
- [ ] `wellDepth` check: `quote.wellDepth && quote.wellDepth !== '0'`
- [ ] `patioSize` check: `quote.patioSize && quote.patioSize !== 'none'`
- [ ] `hasLandscaping` check (NOT `landscaping`)
- [ ] `hasDeck` check (NOT `deckProject`)
- [ ] Contingency explanation included

### I-3. generatePierDiagramHtml
- [ ] Receives: `(quote, customer)`
- [ ] Uses ONLY dimensional fields: `houseWidth`, `houseLength`, `iBeamHeight`, `singleDouble`, `foundationType`
- [ ] Does NOT use: prices, services, notes, sewer, well, patio
- [ ] Pier placement math is consistent with pier specifications (6' outer, 12' marriage line, 2' cantilever)
- [ ] Double-wide shows marriage line correctly

### I-4. generateScopeOfWorkDocument
- [ ] Receives: `(quote, customer, services)`
- [ ] Lists all `selectedServices` that are active
- [ ] Shows `customServices`
- [ ] Shows `foundationType` description
- [ ] Shows house dimensions and model
- [ ] `customScopeContent` overrides default text if set

### I-5. generateCrewWorkOrderDocument
- [ ] Receives: `(quote, customer, servicesParam)`
- [ ] Shows ALL crew-relevant fields
- [ ] `sewerType` check: `quote.sewerType && quote.sewerType !== 'none'`
- [ ] `wellDepth` check: `quote.wellDepth && quote.wellDepth !== '0'`
- [ ] `patioSize` check: `quote.patioSize && quote.patioSize !== 'none'`
- [ ] `hasLandscaping` check (NOT `landscaping`)
- [ ] `hasDeck` check (NOT `deckProject`)
- [ ] Shows `publishedServiceCrewNotes` (NOT customer notes)
- [ ] Shows `publishedGeneralCrewNotes`
- [ ] Shows `serviceQuantities`, `serviceDays` for each service
- [ ] Shows `driveTime`
- [ ] Shows customer contact info

### I-6. generateJobSummaryReport
- [ ] Receives: `(quote, customer, totals, services, crewData, commentsData)`
- [ ] Shows all service details with quantities and days
- [ ] Shows special features: `sewerType`, `wellDepth`, `patioSize`
- [ ] Shows `walkDoors`, foundation type, dimensions
- [ ] Shows `hasLandscaping` days and `hasDeck` days if applicable
- [ ] Budget vs actual summary (if scrubb data present)

### I-7. generateChangeOrderDocument
- [ ] Receives: `(changeOrder, originalQuote, customer, additions, deletions, adjustments)`
- [ ] Shows what was ADDED to the quote
- [ ] Shows what was REMOVED from the quote
- [ ] Shows what was ADJUSTED (price changes)
- [ ] Shows CO number formatted as "CO #Xa" (e.g., "CO #1a")
- [ ] Shows cost impact and contingency used
- [ ] Signature lines present

### I-8. generateAllowanceProgressDocument
- [ ] Receives: `(quote, customer, totals, services)`
- [ ] Shows only ALLOWANCE_ITEMS: permits, gravel_driveway, sand_pad, sewer, well, crane
- [ ] Contract price vs actual cost for each
- [ ] Variance = contractPrice - actualCost (positive = savings, negative = overage)
- [ ] Contingency fund calculation matches ScrubbTab formula:
  ```
  balance = startingContingency + allowanceSavings - allowanceOverages - contingencyPaymentsApplied
  ```
- [ ] Uses `quote.scrubbCosts`, `quote.scrubbPayments`, `quote.permitEntries`

---

## J. Document Save Destinations

**File:** `src/App.jsx` — `folderSavers` object, document generation call sites

- [ ] `generateQuoteHtml` → saved to `estimates` folder
- [ ] `generateCustomerQuote` → saved to `estimates` folder (or verify correct folder)
- [ ] `generatePierDiagramHtml` → saved to `crew_files` or `clayton_docs` folder (verify)
- [ ] `generateScopeOfWorkDocument` → auto-saved to appropriate folder on contract acceptance
- [ ] `generateCrewWorkOrderDocument` → saved to `crew_files` folder
- [ ] `generateAllowanceProgressDocument` → saved to appropriate folder
- [ ] `generateChangeOrderDocument` → saved to `change_orders` folder
- [ ] Each folderSaver receives correct quote ID and file name
- [ ] Files have: `{id, name, type, url, addedAt, addedBy}`

---

## K. Quote Status Workflow

**File:** `src/App.jsx` — status change handlers

- [ ] Status flow: Draft → Sent → Accepted / Declined
- [ ] Accepted status → moves quote to `contracts` array, removes from `quotes`
- [ ] Contract gets: `contractCreatedAt`, `contractCreatedBy`
- [ ] Accepted → auto-generates Scope of Work, saves to folder
- [ ] Declined status: stays in quotes, marked declined
- [ ] Under Contract status: set in Scrubb phase when work begins
- [ ] Completed status: final state
- [ ] Status badge colors consistent across all views

---

## L. Save Quote Logic (Edit vs New)

**File:** `src/App.jsx` — `saveNew()`, quote save handler

- [ ] **New quote:** Creates with fresh ID, `editVersion = 0`, status = Draft
- [ ] **Edit quote (normal):** Creates COPY with `editVersion + 1`, `copiedFrom = originalId`, status = Draft (does NOT overwrite original)
- [ ] **Change order mode:** Different save path — updates contract, appends to `changeOrderHistory`
- [ ] `saveQuotes()` called after every quote save
- [ ] `saveContracts()` called after every contract modification
- [ ] `updatedAt` and `updatedBy` always set on save

---

## M. Change Order Workflow

**File:** `src/App.jsx` — `startChangeOrder()`, CO save handler, CO tracking

- [ ] `startChangeOrder(quote)` → stores `originalQuoteForComparison`, initializes additions/deletions/adjustments tracking
- [ ] Adding a service in CO mode → tracked in `changeOrderAdditions`
- [ ] Removing a service in CO mode → tracked in `changeOrderDeletions`
- [ ] Changing a price in CO mode → tracked in `changeOrderAdjustments`
- [ ] CO number increments correctly (first CO = 1, second CO = 2)
- [ ] CO version letter: first = 'a', revision of same CO = 'b', etc.
- [ ] CO displayed as "CO #1a", "CO #1b", "CO #2a"
- [ ] `totalChange` calculated correctly (sum of additions - deletions + adjustments)
- [ ] `contingencyUsed` = amount drawn from contingency fund for this CO
- [ ] If CO cost > contingency balance → customer pays difference
- [ ] `changeOrderHistory` array in quote receives CO record
- [ ] CO document auto-generated and available for printing/saving
- [ ] Sign CO button: changes `status = 'Signed'` in changeOrderHistory entry
- [ ] Unsign CO button: reverts to `status = 'Draft'`

---

## N. Scrubb Tab — Cost Tracking

**File:** `src/components/Quotes/ScrubbTab.jsx`

**Cost Table:**
- [ ] Shows: Home from Dealership row (homeBasePrice)
- [ ] Shows: NHL Contract row = matT + installation_of_home + painting (always grouped)
- [ ] Shows: Each selected professional service with contract price
- [ ] Shows: Project Command row
- [ ] Shows: Overhead row
- [ ] Shows: Markup row
- [ ] Shows: Permits as special row (uses `permitEntries` array, not `scrubbCosts.permits`)

**Actual Cost Entry:**
- [ ] Click row or pencil → inline edit field activates
- [ ] Enter key saves, Escape cancels
- [ ] Save writes to `scrubbCosts[serviceKey] = actualCost`
- [ ] History logged in `scrubbHistory`

**Permit Tracking (Special):**
- [ ] "+" button opens add permit modal
- [ ] Modal: name + cost fields
- [ ] Save appends to `permitEntries` array
- [ ] Delete button removes entry by id
- [ ] Variance = budget permit cost - sum(permitEntries.cost)

**Additional Materials:**
- [ ] "+" button opens add material modal
- [ ] Save appends to `addlMaterialEntries` array
- [ ] Delete removes entry

**Summary Row:**
- [ ] Total Contract Price = sum of all contract prices shown
- [ ] Total Actual Cost = sum of all actual costs entered
- [ ] Total Variance = Contract - Actual
- [ ] Positive variance = green (under budget), negative = red (over budget)

---

## O. Contingency Fund — Triple Consistency Check

**Files:** `ScrubbTab.jsx`, `documentGeneration.js` → `generateAllowanceProgressDocument`, `CustomerPortal.jsx` → `renderBudgetTracker`

Verify this EXACT formula is used in all three locations:
```
currentBalance = startingContingency
               + allowanceSavings       (variance > 0, positive only)
               - allowanceOverages      (abs(variance) where variance < 0)
               - contingencyPaymentsApplied  (scrubbPayments.filter(isContingencyPayment))
```

- [ ] **ScrubbTab.jsx:** `contingencyPaymentsApplied` variable correctly filters `isContingencyPayment === true`
- [ ] **ScrubbTab.jsx:** Formula order is correct (savings added, overages subtracted, payments subtracted)
- [ ] **generateAllowanceProgressDocument:** Same formula, same variables
- [ ] **CustomerPortal.jsx `renderBudgetTracker`:** `contingencyPaymentsTotal` calculated and subtracted
- [ ] All three produce identical result for same input data
- [ ] Starting contingency = `totals.contingency` (total × 2% or custom %)
- [ ] Variance sign convention consistent: `variance = contractPrice - actualCost`

---

## P. Payment Tracking

**File:** `src/App.jsx` and/or `ScrubbTab.jsx` — payment handlers

- [ ] "Add Payment" button opens payment modal
- [ ] Payment fields: amount, date, notes, isContingencyPayment checkbox
- [ ] Save appends `{id, amount, date, notes, isContingencyPayment, createdAt, createdBy}` to `scrubbPayments`
- [ ] Contingency payment (isContingencyPayment=true) → refills contingency fund
- [ ] Regular payment (isContingencyPayment=false) → general project payment
- [ ] Payments displayed with correct badge: orange = Contingency, green = Regular
- [ ] Payment total correctly reflected in contingency fund running balance

---

## Q. File Management & Folders

**File:** `src/App.jsx` — folder/file handlers

**Add File (Manual Entry):**
- [ ] Modal: name, type (link/pdf/image/other), url/file, notes
- [ ] Required: name, url (if type=link)
- [ ] Creates: `{id, name, type, url, notes, addedAt, addedBy}`
- [ ] Appended to `quote.folders[folderId]`
- [ ] `saveQuotes()` or `saveContracts()` called after

**File Upload / Drag-Drop:**
- [ ] Drag files onto folder → triggers file upload handler
- [ ] Max 50MB enforced per file
- [ ] Auto-detects type: PDF → 'pdf', image → 'image', other → 'other'
- [ ] `blobToDataUrl()` converts file to data URL
- [ ] Multiple files in one drop all saved

**File Display:**
- [ ] Correct icon per type: 🔗 link, 📄 PDF, 🖼️ image, 📎 other
- [ ] Name and notes shown
- [ ] Added by + date shown
- [ ] Open button: link → new window, PDF/image → inline viewer
- [ ] Delete button → removes from array with confirmation

**Folder Navigation:**
- [ ] All folder types accessible: clayton_docs, crew_files, estimates, permits, change_orders
- [ ] Active folder highlighted
- [ ] Crew role can see crew_files only
- [ ] Admin/sales see all folders

---

## R. Crew View

**File:** `src/App.jsx` — crew role section

- [ ] Crew role shows different navigation (Jobs, Warranties, Checklists)
- [ ] Jobs tab: lists active contracts + accepted quotes
- [ ] Click job → shows job details
- [ ] Job details: customer name, phone, site address
- [ ] Maps button: generates Google Maps URL from `siteAddress + siteCity + siteState`
- [ ] Pier Diagram: calls `generatePierDiagramHtml(quote, customer)`, displays inline
- [ ] Crew Files: shows files from `quote.folders.crew_files`
- [ ] File open: correct handler per type

**Warranties Tab:**
- [ ] Shows `WARRANTIES` constant data
- [ ] Manufacturer, terms, phone for each
- [ ] No edit functionality (read-only)

**Checklists Tab:**
- [ ] Delivery checklist items from `DELIVERY_CHECKLIST` or similar constant
- [ ] Contract checklist items from `CHECKLIST` constant
- [ ] Checkboxes are interactive (not persisted, reference only)

---

## S. Customer Portal

**File:** `src/components/Auth/CustomerPortal.jsx`

- [ ] Portal login: matches customer by `firstName + lastName` (case-insensitive, no spaces in password)
- [ ] Shows only that customer's quotes
- [ ] Shows only Accepted/Under Contract/Completed quotes in "Active Jobs"
- [ ] "Sent" quotes shown separately if applicable
- [ ] Cannot edit or create — read-only

**Budget Tracker (`renderBudgetTracker`):**
- [ ] ALLOWANCE_ITEMS loop: shows each allowance with budget + actual
- [ ] `sewerType !== 'none'` → sewer row shown
- [ ] `parseFloat(wellDepth) > 0` → well row shown (using `wellDepth` not `wellSystem`)
- [ ] `startingBalance = totalAllowances + contingency`
- [ ] `contingencyPaymentsTotal` calculated from `q.scrubbPayments.filter(isContingencyPayment)`
- [ ] `runningBalance = startingBalance + netVariance - contingencyPaymentsTotal`
- [ ] "Contingency Draws Applied" row shown when `contingencyPaymentsTotal > 0`
- [ ] Green/red color based on whether `runningBalance >= startingBalance`
- [ ] Published notes shown per allowance item

**Project Notes (`renderProjectNotes`):**
- [ ] Loops all `selectedServices` with `publishedServiceNotes`
- [ ] `sewerType !== 'none'` → sewer notes shown
- [ ] `parseFloat(wellDepth) > 0` → well notes shown (using `wellDepth`)
- [ ] Notes displayed with service name, text, date, author

---

## T. Scope of Work

**File:** `src/App.jsx` — scope section, `generateScopeOfWorkDocument`

- [ ] Auto-generated when quote accepted (status → Accepted)
- [ ] Sections: Overview, Roles, Foundation, Services, Deliverables, Exclusions, Assumptions
- [ ] `customScopeContent` allows per-section overrides
- [ ] Edit mode: all sections editable, save stores to `quote.customScopeContent`
- [ ] Cancel discards unsaved section edits
- [ ] Generated document reflects `customScopeContent` overrides
- [ ] Scope saved to correct folder on contract acceptance

---

## U. Pricing Editor (Admin Only)

**File:** `src/App.jsx` — pricing view, `savePricing()`, `resetPricing()`

- [ ] Pricing locked by default (requires unlock action)
- [ ] Edit mode: all rates, home models, materials, service prices editable
- [ ] `savePricing()` persists to `localStorage('sherman_pricing')`
- [ ] `resetPricing()` reverts to `DEFAULT_*` constants
- [ ] Cancel discards changes without saving
- [ ] Home model price edits persist correctly
- [ ] Drive rate changes affect service price calculations globally
- [ ] Material cost vs price distinction maintained correctly
- [ ] Saved pricing loaded on next session (not reset to defaults)

---

## V. User Management (Admin Only)

**File:** `src/App.jsx` — users view

- [ ] Create user: username, fullName, role (admin/sales/crew), company, phone
- [ ] Required validation: username, fullName
- [ ] Duplicate username check
- [ ] New user gets: `id`, `createdAt`
- [ ] User list shows all users with role badges
- [ ] Delete user: confirmation + removes from array + `saveUsers()`
- [ ] Users persist across sessions

---

## W. Caller ID Sync

**File:** `src/App.jsx` — `syncCustomersToServer()`

- [ ] Called after EVERY `saveCustomers()` call
- [ ] Sends to: `https://sherman-callerid.onrender.com/api/sync-customers`
- [ ] Payload includes: name, phone, phone2, latest quote info for each customer
- [ ] Failure handled gracefully (no crash if server unreachable)
- [ ] Not called from other save functions (only customer saves)

---

## X. Cross-Document Consistency Checks

These values must be IDENTICAL across all documents that show them:

**Grand Total:**
- [ ] `generateQuoteHtml` total === `generateCustomerQuote` total === ScrubbTab contract total
- [ ] All pull from the same `calcTotals()` result (not recalculated independently)

**Contingency Amount:**
- [ ] `calcTotals().contingency` === starting fund in ScrubbTab === starting fund in CustomerPortal === starting fund in AllowanceProgressDocument

**Service Names/Labels:**
- [ ] Scan for any service labeled differently across documents (e.g., "Sewer System" vs "Sewer")
- [ ] Check `services[key].name` is used consistently (not hardcoded string in some places)

**Allowance Items:**
- [ ] ALLOWANCE_ITEMS list in constants matches what AllowanceProgressDocument iterates
- [ ] Same list used in CustomerPortal budget tracker
- [ ] Same list used in ScrubbTab contingency tracker

**NHL Contract Grouping:**
- [ ] ScrubbTab: matT + installation_of_home + painting grouped into "NHL Contract"
- [ ] No other document breaks this grouping differently
- [ ] If any of these three components changes, NHL Contract display updates

---

## Y. Constants Consistency

**File:** `src/constants/index.js`

- [ ] `ALLOWANCE_ITEMS` list — verify each key exists as a service in the services object
- [ ] `HOME_OPTIONS` list — verify each key exists as a service
- [ ] `LICENSED_SERVICES` list — verify each key exists as a service
- [ ] `SUMMARY_SERVICES` list — verify each key exists as a service
- [ ] Each service key used in `documentGeneration.js` exists in the constants/services object
- [ ] `DEFAULT_HOME_MODELS` — verify structure matches what quote form expects (`name, price, width, length, iBeamHeight, floorPlanUrl`)
- [ ] Patio pricing: entries for all sizes that `patioSize` can be ('6ft', '8ft', '10ft' or however they're defined)
- [ ] Sewer pricing: entries for all types that `sewerType` can be

---

## Z. Error Handling & Edge Cases

**File:** `src/App.jsx` — ErrorBoundary, validation functions, edge case guards

- [ ] `ErrorBoundary` wraps the entire app — catches render errors gracefully
- [ ] `Validators.required()` used for all critical required fields
- [ ] `Validators.email()` used for email fields
- [ ] `Validators.phone()` used for phone fields
- [ ] File size validation: 50MB limit enforced before upload
- [ ] `NotificationSystem` shows success/error messages consistently
- [ ] Quote with no home model selected — app doesn't crash
- [ ] Quote with all services deselected — calculations still run (no divide-by-zero)
- [ ] Customer with no quotes — viewCustomer shows empty state (no crash)
- [ ] Empty `scrubbPayments` — contingency tracker shows starting balance, no crash
- [ ] `wellDepth` = '' or null — treated as 0 (no well pricing)
- [ ] `patioSize` = 'none' — no patio pricing
- [ ] `markupRate` = 0 — no markup (valid edge case, no crash)
- [ ] Change order with no changes — handled gracefully

---

## Test Results Template

When reporting findings, use this format:

```
SYSTEM TEST RESULTS — [Date]
================================

CRITICAL FAILURES (breaks functionality):
  [#] [File:Line] Description of failure

HIGH ISSUES (wrong data, silent bugs):
  [#] [File:Line] Description

MEDIUM NOTES (inconsistencies, labels, minor gaps):
  [#] [File:Line] Description

PASS COUNT: X / Y checks passed
FAIL COUNT: Z total issues found
```

---

## Tips for Running This Test Efficiently

- Read large files in targeted sections (use line offsets) rather than all at once
- Run sections in parallel where files don't overlap (e.g., ScrubbTab + CustomerPortal + constants simultaneously)
- Cross-reference PLAYBOOK.md field list when verifying field names
- Focus extra attention on sections O (contingency triple-check) and X (cross-document consistency) — these are historically where bugs hide
- When in doubt whether a field name is correct, check `emptyQuote()` first
