# Spec — Sherman Homes Modular/Manufactured Home Contract Document Suite

## Purpose

This spec describes the target state of Sherman Homes' contract document suite for modular and manufactured home projects in Minnesota. A loop agent reading this spec can evaluate any single document against these requirements and implement improvements independently, without needing context from prior iterations.

---

## Glossary

Canonical terms are defined here. All four documents must use these terms consistently. Deprecated synonyms are noted where historical ambiguity exists.

**Terminology governance:** (1) Add a new glossary entry rather than expanding the meaning of an existing term — if a concept needs a broader or narrower definition, create a distinct term. (2) Deprecate terms explicitly with a pointer to the replacement (e.g., ~~old term~~ — use *new term*) rather than silently redefining them. (3) When a term's definition changes, note the spec revision in which the change was introduced (e.g., "revised in v2") so drift can be audited. A loop agent updating this spec must apply these three rules before modifying any glossary entry.

| Term | Definition |
|---|---|
| **Project** | A modular or manufactured home purchase and installation engagement involving Owner, Contractor, and Manufacturer. ~~"job"~~ and ~~"work order"~~ are deprecated synonyms — use *Project*. |
| **Owner** | The homebuyer party to the Contract. May be one or two persons. |
| **Contractor** | Sherman Homes, 2244 Hwy 65, Mora, MN 55051, License # BC532878. |
| **Manufacturer** | An independent third-party entity that constructs the Home Unit off-site in a factory. The Manufacturer is NOT an agent, representative, partner, or subcontractor of the Contractor. The Contractor has no control over, knowledge of, or responsibility for the Manufacturer's operations, business practices, warranties, or obligations. The Contractor does not represent the Manufacturer in any capacity. |
| **Home Unit** | The factory-built structural home delivered to the project site. ~~"home," "unit," "structure"~~ — use *Home Unit* when referring to the factory-built object specifically. |
| **Factory Order** | The binding order placed by Sherman Homes with the Manufacturer committing to a specific Home Unit configuration. |
| **Factory Order Lock-In Date** | The contractually agreed deadline by which Owner must finalize all factory-locked selections. Changes after this date are governed by Section 4 of the Contract. |
| **Factory-Locked Item** | A selection or component that must be finalized before the Factory Order is placed and cannot be changed after without Manufacturer approval and potential fees. |
| **Site Allowance Item** | Work or materials completed on-site by Contractor; modifiable per the standard Change Order and Allowance processes. |
| **Allowance Budget** | The itemized budget for variable-cost work categories, including an Allowance Contingency line. |
| **Allowance Contingency** | A reserve fund within the Allowance Budget that absorbs overages in any allowance line before a Change Order is required. |
| **Allowance Reallocation** | An Owner-requested redistribution of funds within the Allowance Budget, not increasing the total amount, requiring no administrative fee. |
| **Change Order** | A written, signed modification to the Contract Documents covering scope, cost, and schedule impact. All Change Orders require 100% prepayment. |
| **Force Majeure Event** | A cause of delay beyond either party's reasonable control as enumerated in the Contract (Section 14), including Manufacturer production delays. |
| **Warranty Date** | For Contractor warranties: the earlier of (a) first Owner occupancy or (b) Owner's legal title to the home — but not before the Home Unit is set on the foundation. |
| **Right to Occupy Certificate** | The written document issued by Contractor to Owner authorizing occupancy, issued only after final payment. |
| **HUD** | U.S. Department of Housing and Urban Development. |
| **HUD-Code Home** | A manufactured home built under federal HUD Manufactured Home Construction and Safety Standards, 24 CFR Part 3280. |
| **Modular Home** | A factory-built home constructed to Minnesota State Building Code standards (not federal HUD code). |
| **MN Chapter 327A** | Minnesota Statutes Chapter 327A — New Home Warranties. Governs Contractor's statutory warranty obligations. |
| **Site Work** | All construction activities performed by Contractor at the project site, including foundation, utility connections, and installation. Not factory work. |
| **Pre-Delivery Inspection** | The joint inspection conducted by Owner and Contractor before the Home Unit is placed on the foundation, documenting condition at delivery. |
| **Marriage Wall** | The interior wall assembly and sealing required at the junction of sections in a multi-section Home Unit. |
| **Manufacturer Warranty Document** | The Manufacturer's own written warranty for the Home Unit. This document is provided by the Manufacturer (an independent third party) and is NOT drafted, controlled, or guaranteed by the Contractor. The Contractor makes no representations about the accuracy, completeness, or currency of the Manufacturer's warranty. The Owner must contact the Manufacturer directly for current warranty information, as the Manufacturer's warranty terms may change at any time without notice to the Contractor. |

---

## Document Suite Overview

The suite consists of exactly four documents. Each document is complete and independently readable but cross-references the others by name. No document is optional; all four are required for contract execution.

| Document | File | Statutory Basis |
|---|---|---|
| Main Contract | `Contract_Manufactured_Home.md` | MN Stat. § 326B; general contract law |
| Formaldehyde Disclosure | `Formaldehyde_Disclosure_Manufactured_Home.md` | MN Stat. § 325F.182 |
| Homeowner's Guide | `Homeowner_Guide_Manufactured_Home.md` | Incorporated by reference into Contract |
| Warranty Statement | `Warranty_Statement_Manufactured_Home.md` | MN Stat. § 327A.08 |

---

## Non-Goals

This spec does NOT cover the following items. A loop agent must not modify or create documents for these:

- The Allowance Budget spreadsheet or its line items
- Exhibit A (Manufacturer's Quote, Floor Plan, and Specifications)
- Manufacturer's warranty documentation (provided by the Manufacturer, an independent third party — Contractor makes no representations about it)
- The Plans and Specification Booklet
- The Payment Schedule document
- Project-specific fill-in values (Owner name, Contract Price, project address, dates)
- Manufacturer identity, warranty terms, or product specifications
- Legal advice or attorney review functions

---

## Cross-Document Requirements

These assertions apply to all four documents and are verifiable across the suite.

1. Every document uses Glossary terms consistently. No document uses a deprecated synonym when a canonical term is defined above.
2. Every document that references another document does so by its canonical document title (e.g., "the Warranty Statement," "the Homeowner's Guide").
3. No document contradicts another document on legal obligations, definitions, or scope of responsibility.
4. The division of responsibility between Contractor (Site Work) and Manufacturer (factory construction) is stated consistently: Contractor is not liable for Manufacturer defects; the Manufacturer is an independent third-party entity whose obligations are governed by its own agreements. Contractor does not represent, warrant, or guarantee any aspect of the Manufacturer's work, products, warranties, or business practices.
5. Every document that requires Owner signature includes an Acknowledgment and Signature block with fields for: Owner signature, Owner printed name, and date. Where two owners may exist, both signature lines are present.
6. Every signature block that requires a Contractor representative signature includes fields for: representative signature, printed name, title, and date.
7. All statutory citations reference the correct Minnesota statute and section number.
8. All four documents must clearly state that the Manufacturer is an independent third-party entity, that the Contractor is not a representative, agent, or partner of the Manufacturer, and that the Contractor makes no representations about the Manufacturer's warranties, products, or business practices. The Owner must be directed to contact the Manufacturer directly for warranty information. Where appropriate, documents must also state that the Contractor maintains a professional working relationship with the Manufacturer and will make reasonable efforts to assist the Owner in navigating communications, warranty claims, service requests, and other concerns — as a courtesy, not as an obligation of the Manufacturer.

---

## Main Contract Requirements

### Section Structure

The Contract contains these sections in order, each present and titled:

1. Contract Documents
2. Scope of Work — Division of Responsibility (with subsections 2.1 Manufacturer Responsibilities and 2.2 Sherman Homes Responsibilities)
3. Time of Completion
4. Factory Order Lock-In (with subsections 4.1, 4.2, 4.3)
5. The Contract Price
6. Progress Payments
7. Duties of the Contractor
8. Duties of the Owner
9. Change Orders
10. Allowances
11. Delivery, Transportation & Installation (with subsections 11.1–11.4)
12. Insurance
13. General Provisions
14. Force Majeure and Delays Beyond Contractor's Control
15. Hazardous Materials, Waste, and Formaldehyde
16. Arbitration of Disputes
17. Warranty (with subsections 17.1–17.5)
18. Termination of the Contract (with subsection 18.1)
19. Attorney Fees
20. Acceptance and Occupancy
(unnumbered) Mechanic's Lien Notice (PLEASE TAKE NOTICE block)
21. General Exclusions (Available Services Not Selected; Items Never Included)
22. Project Assumptions
(unnumbered) Exhibits list
(unnumbered) Acknowledgment and Signature

### Scope of Work (Section 2)

- Section 2.1 states that the Manufacturer is an independent third-party entity that constructs the Home Unit. Contractor is not a representative, agent, or partner of the Manufacturer and has no control over, knowledge of, or responsibility for the Manufacturer's operations, construction methods, quality control, warranties, or business practices. Owner is directed to contact the Manufacturer directly for information about their responsibilities and processes.
- Section 2.1 states that Contractor is **not** liable for defects originating at the Manufacturer's facility and does not warrant, guarantee, or make any representations regarding the Manufacturer's work.
- Section 2.1 includes an **Owner Assistance** note: Although Contractor is not a representative of the Manufacturer, Contractor maintains a professional working relationship with the Manufacturer and will make reasonable efforts to assist the Owner in navigating communications, warranty claims, service requests, and other concerns directed toward the Manufacturer. This assistance is offered as a courtesy and does not make Contractor responsible for the Manufacturer's response, decisions, obligations, or warranties.
- Section 2.2 enumerates Contractor's Site Work responsibilities, including: site prep and grading, foundation, delivery coordination, transportation and oversize permits, crane and set, Marriage Wall assembly, utility connections, on-site finish work, permitting, MN Building Code compliance, and broom-clean completion.

### Factory Order Lock-In (Section 4)

- Section 4.3 defines two categories: Factory-Locked Items and Site Allowance Items.
- The distinction is: Factory-Locked Items are finalized by the Factory Order Lock-In Date and cannot be changed post-order without Manufacturer approval; Site Allowance Items follow the Change Order and Allowance processes.

### Contract Price (Section 5)

- States the Contract Price (or blank for fill-in) and acknowledges a Down Payment of 50% of the Contract Price due at signing.
- States that the price is contingent on the Payment Schedule between Contractor, Owner, and Loan Agency (if applicable).

### Progress Payments (Section 6)

- States Owner must respond to payment requests within 3 business days.
- States Contractor may stop work or terminate if payment is not received within 7 business days of a payment request for substantially completed work.
- Termination by Contractor does not relieve Owner of payment obligations for work completed.

### Duties of Contractor (Section 7)

- Site Work complies with MN State Building Code.
- Factory-built portions comply with HUD or modular standards — the Manufacturer's responsibility.
- Contractor holds a valid Manufactured Home Installer License as required by MN Statute 327B.
- Contractor obtains all permits for Site Work at Owner's expense.

### Duties of Owner (Section 8)

- Owner communicates with subcontractors and Manufacturer only through Contractor (with exceptions noted in Owner's Responsibility Acknowledgement).
- Owner is responsible for all utility setups, fees, and usage costs during construction, including generator fuel if electric service is unavailable and heater fuel for cold-weather conditions.
- **Owner is responsible for site readiness for delivery** (foundation complete and inspected, site access clear, grading complete). Delays from site unreadiness are Owner's financial responsibility and treated as a Change Order.
- Owner is responsible for snow plowing the driveway and construction site.
- No third-party contractor work is permitted during delivery and installation without prior written Contractor approval.

### Change Orders (Section 9)

- A Change Order is any modification to the Contract Documents, including factory-ordered items subject to Manufacturer approval.
- All Change Orders are agreed in writing, include cost and time impacts, and require 100% prepayment before the change is made.
- Standard Change Order fee: $300 administrative fee plus material, tax, labor, drafting, permits, engineering, inspections, deliveries, overhead, and profit at 15%.
- Allowance Overage Change Orders: no administrative fee, but subject to material, tax, labor, overhead, and profit at 15%.

### Allowances (Section 10)

- The Allowance Budget includes an Allowance Contingency reserve.
- Overages in any line item are deducted from the Allowance Contingency first, without triggering a Change Order.
- Only after the Allowance Contingency is fully depleted does an Allowance Overage Change Order apply.
- Owner may request Allowance Reallocations within the Allowance Budget total at no administrative fee.
- Unused Allowance Budget funds (including unused Allowance Contingency) are credited back to Owner.

> **Example — contingency depletion:** Allowance Budget total = $20,000; Allowance Contingency line = $2,000; Flooring line budget = $5,000. Owner selects flooring that costs $6,800 — a $1,800 overage. The $1,800 is deducted from the $2,000 Allowance Contingency; no Change Order is issued. Contingency balance is now $200. Owner then overruns the Cabinetry line by $500. The remaining $200 Allowance Contingency is consumed; a $300 Allowance Overage Change Order (no administrative fee, plus overhead/profit at 15%) is required for the remaining $300 before the cabinet work proceeds.

### Delivery, Transportation & Installation (Section 11)

- Section 11.1: Transportation costs, oversize-load permits, and crane and set fees are included in the Contract Price unless otherwise specified. Owner-caused delays, inaccessible site, or additional permits from site location are Owner's financial responsibility.
- Section 11.2: A Pre-Delivery Inspection is conducted jointly by Owner (or Owner's representative) and Contractor before the Home Unit is placed on the foundation. Condition is documented in writing. "Documented in writing" means a dated, signed record listing each observed condition item by location and description — for example: *"Master bedroom exterior wall, northwest corner: dent in siding approximately 6 inches diameter, noted before placement."* A verbal agreement or unmarked delivery receipt does not satisfy this requirement.
- Section 11.3: Visible damage or factory defects discovered at delivery must be reported to Manufacturer **in writing within 5 business days of delivery**. Factory defects are the Manufacturer's responsibility. Contractor will make reasonable efforts to assist the Owner in documenting defects and communicating them to the Manufacturer, but is not liable for factory defects. If responsibility for a defect is ambiguous — for example, a cracked window that could result from either factory installation or transit handling — Owner notifies both Contractor and Manufacturer in writing within 5 business days; the parties cooperate to determine origin before assigning responsibility. This mirrors the disputed-claims procedure in the Warranty Statement (Section F.3). Contractor is not liable during the investigation period solely because origin is unclear.
- Section 11.4: Formal acceptance does not occur until the Pre-Delivery Inspection is complete and documented. Formal acceptance occurs at final payment.

### Insurance (Section 12)

- Owner maintains liability insurance on the project property.
- Contractor maintains Workers Compensation, Liability, and Builder's Risk insurance as required by law.
- Contractor's insurance covers only Contractor and its direct subcontractors.
- Unscheduled unsupervised access by any person other than Contractor's team requires a Certificate of Additional Insured provided to Contractor in advance.
- Owner must acquire homeowners insurance immediately after drywall is hung. Property shall not be occupied before homeowners insurance is in place.

### Force Majeure (Section 14)

- Enumerated Force Majeure Events include: acts of God, fire, flood, earthquake, tornado, epidemic, pandemic, quarantine, war, riot, civil unrest, strikes, labor disputes, government orders, unavailability of materials or labor, supplier failures, and **Manufacturer production delays**.
- Contractor notifies Owner in writing within **7 business days** of becoming aware of a Force Majeure Event.
- Force Majeure Events do not relieve Owner of payment obligations for work completed before or during such events.
- Increased costs from Force Majeure Events (extended overhead, storage, re-mobilization, material price increases) are treated as a Change Order.

### Warranty (Section 17)

- Section 17.1: Contractor warrants Site Work and installation:
  - 1 year — workmanship and material defects
  - 2 years — site-installed plumbing, heating, and electrical system defects
  - 10 years — structural defects related to foundation and site installation
- Section 17.1 states this warranty covers only Contractor's Site Work; it does not cover factory-built components.
- Section 17.2: Contractor is not a representative of the Manufacturer and does not warrant, guarantee, or make any representations regarding the Manufacturer's warranty coverage, terms, exclusions, or claims process. The Manufacturer is an independent third-party entity whose warranty obligations are governed solely by the Manufacturer's own agreements and policies, which may change at any time without notice to the Contractor. Owner must contact the Manufacturer directly for warranty information. To claim on factory components, Owner contacts Manufacturer directly; Contractor will make reasonable efforts to assist the Owner in navigating the Manufacturer's warranty process, but is not financially responsible for factory defects and has no authority over the Manufacturer's warranty decisions or response.
- Section 17.3: Warranty Date for Contractor's warranty is the earlier of (1) first Owner occupancy or (2) Owner's legal title to the home — but not before the Home Unit is set on the foundation. Manufacturer's warranty date is governed by the Manufacturer's own terms — contact the Manufacturer directly.
- Section 17.4: If the home is a HUD-code manufactured home, Minnesota Statute Chapter 327A may be affected by federal HUD preemption for factory-built portions. Owner is encouraged to consult a licensed MN attorney.
- Section 17.5: Owner must provide written notice of any warranty claim to Contractor within **6 months of discovering the defect**, as required by MN Stat. § 327A.

### Termination (Section 18)

- Covers both Owner default and Contractor default with symmetric remedies (damages, specific performance).
- For Owner default: Down Payment applied to legally ascertained damages. If insufficient, Contractor may claim all work executed plus losses. Alternatively, Contractor may accept Down Payment as liquidated damages.
- Section 18.1 covers Manufacturer default (failure to deliver, non-conforming unit, insolvency): Contractor notifies Owner within 5 business days; parties cooperate to find remedy; costs incurred by Contractor for Site Work prior to Manufacturer default remain Owner's financial responsibility; Contractor is not liable for damages arising solely from Manufacturer default.

### Acceptance and Occupancy (Section 20)

- Joint final inspection by Owner and Contractor at completion.
- Contractor makes repairs necessary to comply with Contract Documents.
- Upon final payment, Contractor provides Owner and Loan Agency with Lien Waivers for all materials and labor.
- Owner shall not occupy until final payment is received **and** a Right to Occupy Certificate is issued by Contractor.
- **The Section 20 early-occupancy "deemed waiver" provision must comply with MN Stat. § 327A.04**: any waiver of statutory warranty rights must be a written instrument, in boldface type, minimum 10-point size, signed by Owner, describing the warranty and terms. A conduct-based deemed waiver is not enforceable against statutory warranty rights. If a waiver for pre-certificate occupancy is desired, it must be a separately executed § 327A.04-compliant instrument — not an implied-by-conduct clause.

### Exhibits

- Exhibit A: Manufacturer's Quote, Floor Plan, and Specifications — present and listed, with disclaimer that Contractor makes no representations regarding the accuracy or completeness of Manufacturer-supplied documents.
- Exhibit B: Approved Engineered Foundation Drawings (to be attached when available).

---

## Formaldehyde Disclosure Requirements

- Identifies Sherman Homes by name and license number at the top.
- States disclosure is required under **Minnesota Statutes Section 325F.182**.
- Includes a CAPITALIZED health warning block as required by MN Stat. § 325F.182. The warning block must contain all of the following elements (each is independently verifiable by checking the disclosure text):
  1. Formaldehyde is present in building materials including particleboard, plywood, OSB, and adhesives.
  2. Formaldehyde can cause eye, nose, and throat irritation, headache, and nausea.
  3. Formaldehyde may trigger or worsen asthma-like symptoms.
  4. Elderly persons, young children, and persons with respiratory or lung conditions face elevated risk.
  5. Adequate ventilation reduces formaldehyde levels; open windows and run fans after occupancy.
  6. Higher temperatures and humidity increase formaldehyde off-gassing; manage HVAC accordingly.
  7. The warning is printed in ALL CAPS (or all uppercase) so it is visually distinct from surrounding text.
- Specifies that for modular and manufactured homes, factory construction introduces higher quantities of formaldehyde-emitting materials (particleboard, OSB, plywood, factory cabinetry, flooring).
- States that the Manufacturer — an independent third-party entity — selects and installs factory-built materials. Contractor has no control over, knowledge of, or responsibility for these materials and makes no representations about them.
- States that Contractor maintains a professional working relationship with the Manufacturer and will make reasonable efforts to assist the Owner in communicating material concerns or questions to the Manufacturer upon request.
- Informs Owner of the right to request material specifications from the Manufacturer before the Factory Order Lock-In Date.
- Provides actionable steps: request low-formaldehyde or NAF options before ordering (Owner may ask Sherman Team to help coordinate the conversation); ventilate after delivery; manage temperature and humidity.
- Includes Owner Acknowledgment and Signature block (two signature lines for dual-owner scenarios).
- This disclosure does not limit or waive any Owner rights under MN or federal law.

---

## Homeowner's Guide Requirements

### Team Contact Block

- Lists three Sherman team roles with contact fields: Project Design Representative, Project Specification Coordinator, and Project Construction Manager. Each role has fields for name, office phone, cell phone, and email.
- Lists a Manufacturer Contact section that clearly states the Manufacturer is an independent third-party entity and that the Owner should contact the Manufacturer directly for questions about factory-built components, specifications, and warranties. Includes blank fields for manufacturer name and phone/website.

### Factory vs. Site Distinction

- Clearly explains that two parallel workflows run: Manufacturer builds the Home Unit in the factory while Contractor prepares the site.
- Contains an **Owner Assistance** note: Contractor maintains a professional working relationship with the Manufacturer and will make reasonable efforts to assist the Owner in navigating communications, warranty claims, service requests, and other concerns directed toward the Manufacturer — as a courtesy, not making Contractor responsible for the Manufacturer's response.
- Contains a table distinguishing Factory-Locked Items (decided before Factory Order Lock-In Date) from Site Allowance Items (follow Sherman's standard timeline).

### Project Timeline

- Describes five phases in order:
  1. Pre-Order (Selections & Site Planning)
  2. Factory Production
  3. Delivery & Set (including Pre-Delivery Inspection before placement on foundation)
  4. Installation & Site Finish
  5. Final Walkthrough & Occupancy

### Key Acknowledgements

The Guide contains exactly 12 numbered Key Acknowledgements, each with two initial lines (for dual-owner scenarios). Each acknowledgement covers one of the following topics, in this order:

1. Document Review
2. Factory Order Lock-In
3. Change Authorization
4. Cost Responsibility
5. Site Readiness for Delivery
6. Pre-Delivery Inspection
7. Floor Plan & Framing Tolerances
8. Homeowner-Hired Contractors (no third-party work during delivery/installation without prior written Contractor approval)
9. Homeowner-Selected Subcontractors (Contractor does not warrant their work)
10. Seasonal Construction & Weather Delays
11. Utility Costs During Construction
12. Insurance Requirements

### Selections Sections

- Each selection section states whether it is Factory-Locked or Site Allowance and when it must be finalized.
- Factory-Locked sections explicitly state: "Once the order is placed, these cannot be changed."
- Site Allowance sections reference the Allowance Budget.

### Quick Reference Checklist

- Contains three checklists: Factory-Locked Selections (with checkbox status column), Site Selections & Purchases (with timing column), and Project Milestones (with responsibility column).
- Factory-Locked checklist includes: home model & floor plan, structural options, factory cabinetry & finishes, factory-plumbed fixtures, factory flooring, fireplace (if factory option), Factory Order Lock-In Date confirmed in writing.
- Project Milestones checklist includes: Factory Order Lock-In Date, factory production complete, site ready for delivery, Pre-Delivery Inspection, delivery & set, HUD/modular inspection, utility connections complete, final walkthrough, Right to Occupy Certificate issued.

### Incorporation

- The Guide states it is incorporated by reference into the Main Contract as a Contract Document.
- Owner signature block includes two Owner signature lines and one Contractor representative signature line.

---

## Warranty Statement Requirements

### Section Structure

The Warranty Statement contains these sections in order:

- A. Sherman Homes Statutory Warranties — Site Work & Installation
- B. Scope of Responsibility — Why This Warranty Covers Only Site Work
- C. Manufacturer Warranty — Contact the Manufacturer Directly
- D. Applicable Building Standards — HUD Code vs. MN State Building Code
- E. Warranty Date — Factory-Built Home Clarification
- F. Claims Procedures (F.1 Contractor claims, F.2 Manufacturer claims, F.3 Disputed claims)
- G. Warranty Exclusions
- H. Waiver and Modification
- I. Minnesota Statutes Chapter 327A — Reference
- Acknowledgment and Signature

### Section A — Contractor Statutory Warranties

- States warranty is provided under MN Chapter 327A.
- Contains a table with three warranty periods and their coverage:
  - 1 year: Site work and installation free from defects caused by faulty workmanship and defective materials due to non-compliance with building standards.
  - 2 years: Site-installed plumbing, electrical, heating, and cooling systems free from defects caused by faulty installation due to non-compliance with building standards.
  - 10 years: Site work and installation free from major construction defects due to non-compliance with building standards.
- States Contractor's warranties apply to Site Work and installation only — not Manufacturer-built components.
- States Warranty Date clearly (earlier of first occupancy or legal title), with note that it does not begin before the Home Unit is set on the foundation.
- States written warranty claims must be reported within **6 months** of Owner discovering the defect.

### Section C — Manufacturer Warranty — Contact the Manufacturer Directly

- Clearly states that Contractor is NOT a representative of the Manufacturer and does not warrant, guarantee, or make any representations regarding the Manufacturer's warranty coverage, terms, exclusions, or claims process.
- States that the Manufacturer is an independent third-party entity whose warranty obligations are governed solely by the Manufacturer's own agreements and policies, which may change at any time without notice to the Contractor.
- States that the Owner must contact the Manufacturer directly for warranty information, including coverage periods, exclusions, limitations, and how to file a claim.
- States that the Manufacturer's warranty documentation will likely be provided by the Manufacturer with the home upon delivery.
- Contains blank Manufacturer contact information fields (name, address, warranty contact, phone, email/website) with a disclaimer that the information is provided for Owner convenience only and that the Contractor does not guarantee its accuracy as the Manufacturer may update it at any time.
- Does NOT contain specific warranty terms, coverage periods, or warranty summary tables — these are the Manufacturer's information to provide, not the Contractor's.
- Provides a numbered three-step procedure for factory defect claims: (1) document in writing with photos, (2) contact Manufacturer directly, (3) notify Contractor — Contractor will make reasonable efforts to assist the Owner in documenting and communicating the issue to the Manufacturer, but has no authority over the Manufacturer's warranty process.

### Section D — Applicable Building Standards

- Distinguishes two home types and their governing standards:
  - HUD-Code Home: may be governed by 24 CFR Part 3280 for factory-built portions; Contractor does not represent the Manufacturer and makes no representations about the Manufacturer's compliance with HUD standards; attorney consultation recommended.
  - Modular Home: may be factory-built to MN State Building Code standards; Contractor warrants its own Site Work under Chapter 327A; the Manufacturer's obligations are governed by the Manufacturer's own agreements and applicable law — contact the Manufacturer directly.
- States that all Contractor Site Work complies with MN State Building Code regardless of home type.
- States HUD Data Plate and certification labels must be present at delivery; if missing, Owner notifies Contractor immediately.

### Section E — Warranty Date Clarification

- Explicitly addresses the risk that Owner may take title to the Home Unit (as personal property) before Site installation is complete.
- States that the Warranty Date for Contractor's Site Work warranties shall not begin earlier than the date the Home Unit is set on the foundation and Site Work commences.

### Section F — Claims Procedures

- F.1 (Claims Against Contractor): five numbered steps:
  1. Report in writing within 6 months of discovering defect to Sherman Homes, 2244 Hwy 65, Mora, MN 55051.
  2. Contractor inspects within 30 days of written notice.
  3. Contractor provides written offer to repair within 15 days of inspection.
  4. If parties agree, Contractor performs repairs per written agreement.
  5. If parties disagree, matter proceeds to MN Home Warranty Dispute Resolution Process under MN Stat. § 327A.051 before any court action.
- F.2 (Claims Against Manufacturer): three numbered steps: (1) contact Manufacturer directly, (2) follow Manufacturer's own claims procedure — Contractor has no authority over or knowledge of the Manufacturer's claims process, (3) notify Contractor — Contractor will make reasonable efforts to assist the Owner in documenting and communicating the claim to the Manufacturer, but does not control or guarantee the Manufacturer's response.
- F.3 (Disputed Claims): if defect origin is unclear, Owner notifies both Contractor and Manufacturer in writing; Contractor inspects site work components and will make reasonable efforts to assist the Owner in communicating with the Manufacturer regarding the Manufacturer's portion; determination of Manufacturer's responsibility rests solely with the Manufacturer per the Manufacturer's own policies.

### Section G — Warranty Exclusions

Contains at minimum these exclusions, labeled (a) through (p):

- (a) Not reported in writing within 6 months of discovery
- (b) Caused by Owner-supplied design, materials, or installation
- (c) Secondary loss (personal injury, property damage)
- (d) Normal wear and tear
- (e) Normal shrinkage within building standard tolerances
- (f) Dampness or condensation from insufficient post-occupancy ventilation
- (g) Negligence, improper maintenance, or alteration by others
- (h) Changes in site grading by others
- (i) Landscaping or insect damage
- (j) Failure to maintain the home
- (k) Failure to take timely action to minimize damage
- (l) Home no longer used primarily as a residence
- (m) Acts of God (fire, explosion, smoke, water escape, windstorm, hail, lightning, falling trees, aircraft, vehicles, flood, earthquake) — except where caused by failure to comply with building standards
- (n) Soil movement compensated by legislation or insurance
- (o) Soil conditions on Owner-supplied land obtained independently of Contractor
- (p) Defects in Manufacturer-supplied components, factory workmanship, or materials originating in the manufacturing facility — the Manufacturer is an independent third-party entity; contact the Manufacturer directly regarding their warranty obligations

### Section H — Waiver and Modification

- States that MN Chapter 327A warranties cannot be waived except per § 327A.04.
- States the § 327A.04 requirements: written instrument, boldface type, minimum 10-point size, signed by Owner, describing warranty and terms, with substitute express warranties offering substantially the same protections.

### Section I — MN Chapter 327A Reference

- Lists the URL to the MN statute: `https://www.revisor.mn.gov/statutes/cite/327A`
- States a printed copy is available to Owner on request.
- Lists key sections: §§ 327A.01, 327A.02, 327A.03, 327A.04, 327A.05, 327A.051, 327A.08.
- Includes HUD preemption note for HUD-Code homes.

### Acknowledgment and Signature

- Two Owner signature lines with printed name and date fields.
- One Contractor representative signature line with printed name/title and date.
- Summary acknowledgement block states: Contractor warrants Site Work only under Chapter 327A; the Manufacturer is an independent third-party entity whose warranty obligations are governed by the Manufacturer's own agreements — Contractor does not represent the Manufacturer and makes no representations about the Manufacturer's warranty; written claims against Contractor within 6 months of discovery; Owner must contact the Manufacturer directly for warranty information.
- States this document is required under MN Stat. § 327A.08 and that failure to provide it in writing violates MN Stat. § 326B.84.

---

## Known Open Items (Loop Agent Must Not Silently Resolve)

These items require human decision-making before a loop agent can implement them. If a loop agent encounters one of these, it must flag it and skip — not infer a resolution:

1. **Section 20 Early-Occupancy Waiver**: The current Contract language uses a conduct-based "deemed waiver" that does not satisfy MN Stat. § 327A.04. The human decision needed: remove the provision entirely, or replace it with a separately executed § 327A.04-compliant written waiver instrument. The loop agent may flag this finding but must not unilaterally rewrite Section 20 in a legally opinionated way without human direction.

2. **Manufacturer Warranty Information**: The Manufacturer is an independent third-party entity. The Contractor does not draft, control, or guarantee any Manufacturer warranty documentation. All manufacturer contact information in the contracts is left blank — to be filled in by the Owner based on information obtained directly from the Manufacturer. The Contractor makes no representations about the accuracy or currency of any Manufacturer information.

3. **Homeowner's Guide Vendor Placeholders**: Sections for Plumbing Fixtures, Paint Colors, and other selections contain placeholder vendor names, contacts, and phone numbers in brackets (`[Name]`, `[Phone]`, etc.). These require human input and must not be invented by the loop agent.

4. **Project-Specific Fill-Ins**: Owner name, Contract Price, project address, agreement date, Factory Order Lock-In Date, and all signature fields are intentionally blank. The loop agent must not populate these with example data.

---

## Loop Verification Guidance

These patterns supplement the per-section testability hooks and apply to the loop as a whole.

1. **Ambiguity flagging.** If a loop agent evaluates a requirement and finds it ambiguous — meaning two reasonable interpretations exist — it must flag the ambiguity in its output and skip implementation of that requirement. It must not silently choose an interpretation. The flag should name the requirement, state both interpretations, and wait for human direction before proceeding.

2. **Periodic spec-compliance summary.** Every 5 plan-item iterations, the loop agent must emit a summary of its current understanding of the spec and which requirements have been implemented, are in progress, or remain open. The summary exists to surface drift between the agent's working model and the spec's intent before it compounds. Format: one sentence per implemented requirement stating what was done and which spec assertion it satisfies.

3. **Cross-document verification after each iteration.** After implementing any plan item, the loop agent must re-evaluate the 8 Cross-Document Requirements (listed above) and confirm none were violated. If a violation is introduced, the agent must flag it and revert the change before moving to the next plan item — not defer the conflict to a later iteration.

---

*This spec governs the document suite as a whole. A loop agent may improve any single document by evaluating it against the relevant requirements section, implementing the gap, and verifying the cross-document requirements still hold.*
