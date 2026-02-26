# Run a Sync Check

Tools for maintaining the Sherman Bidding System — keeping the quote page,
all document generators, and every view consistent with each other.

---

## What's in This Folder

| File | Purpose | When to Use |
|------|---------|-------------|
| **PLAYBOOK.md** | Claude Code operating guide for sync checks | Open before asking Claude to run a sync check |
| **SYSTEM-TEST.md** | Full A-Z system test checklist (26 sections) | Open before asking Claude to run a system test |
| **test-mocks.js** | Mock data for testing and development | Reference when building test scenarios |
| **playwright-starter.js** | Automated browser test starter | Run after adding `data-testid` attributes to components |
| **sync-check.config.json** | Key file paths and consistency rules reference | Used by Claude Code and the npm script |
| **docs/SYNC-CHECK.md** | Deep-dive field-to-document mapping reference | Detailed lookup during audits |
| **scripts/** | npm run sync-check API-driven automation | Run via `npm run sync-check` (requires .env with API key) |

---

## How to Ask Claude Code to Run a Sync Check

Just say one of:
- **"Run a sync check"** → Claude reads PLAYBOOK.md and audits the data pipeline
- **"Run a system test"** → Claude reads SYSTEM-TEST.md and audits A-Z

Claude will read the relevant files, trace every connection, and report
findings grouped by severity (CRITICAL → HIGH → MEDIUM).

No setup required. No API key needed. Included in your Claude subscription.

---

## When to Run Each

### Sync Check
Run after any change to the quote page, calculations, or constants:
- Added or renamed a field in `emptyQuote()`
- Changed how a service is calculated in `calculations.js`
- Added a new service type in `constants/index.js`
- Changed the contingency formula anywhere

### System Test
Run after major rework of any core feature:
- Reworked how a workflow works end-to-end (e.g., quote → contract flow)
- Added a new tab or view
- Changed authentication or role logic
- Before a release to make sure nothing is broken

---

## Automated Browser Testing (Playwright)

The file `playwright-starter.js` contains a starter test script.

**Before it can run**, you need to add `data-testid` attributes to key
elements in the app. The starter file documents exactly which elements
need IDs and where to add them.

Once attributes are added:
```bash
npm install --save-dev @playwright/test
npx playwright install
npm run dev          # app must be running
npx playwright test Run\ a\ Sync\ Check/playwright-starter.js
```

Expected runtime: 10–15 minutes for the full A-Z flow.

---

## npm run sync-check (API Script)

The `scripts/` folder contains an Anthropic API-driven sync check agent.
This is an alternative to asking Claude Code directly.

```bash
# One-time setup
cp "Run a Sync Check/.env.example" .env
# Edit .env and add your API key

npm run sync-check
```

Cost: ~$0.08–$1.00 per run depending on model (vs $0 with Claude Code).
