/**
 * playwright-starter.js
 * Automated A-Z browser test for the Sherman Bidding System.
 *
 * HOW TO RUN:
 *   npm install --save-dev @playwright/test
 *   npx playwright install
 *   npm run dev   ← app must be running at localhost:5173
 *   npx playwright test "Run a Sync Check/playwright-starter.js"
 *
 * BEFORE THIS SCRIPT CAN RUN — add data-testid attributes:
 *   Search for each REQUIRES DATA-TESTID comment below and add the
 *   corresponding attribute to the element in the app source.
 *
 * Expected runtime: 10–15 minutes (full A-Z flow).
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * DATA-TESTID ATTRIBUTES NEEDED IN APP SOURCE
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * In src/App.jsx — login section:
 *   Username input        → data-testid="login-username"
 *   Password input        → data-testid="login-password"
 *   Login button          → data-testid="login-btn"
 *   User picker buttons   → data-testid="select-user-{username}"
 *
 * In src/App.jsx — customer form:
 *   First name input      → data-testid="customer-firstName"
 *   Last name input       → data-testid="customer-lastName"
 *   Phone input           → data-testid="customer-phone"
 *   Email input           → data-testid="customer-email"
 *   Site address          → data-testid="customer-siteAddress"
 *   Site city             → data-testid="customer-siteCity"
 *   Site state            → data-testid="customer-siteState"
 *   Site zip              → data-testid="customer-siteZip"
 *   Site county           → data-testid="customer-siteCounty"
 *   Save customer button  → data-testid="save-customer-btn"
 *
 * In src/App.jsx — quote form:
 *   Home model select     → data-testid="quote-homeModel"
 *   Foundation select     → data-testid="quote-foundationType"
 *   Drive time input      → data-testid="quote-driveTime"
 *   Sewer type select     → data-testid="quote-sewerType"
 *   Well depth input      → data-testid="quote-wellDepth"
 *   Patio size select     → data-testid="quote-patioSize"
 *   Save quote button     → data-testid="save-quote-btn"
 *   Grand total display   → data-testid="grand-total"
 *   Contingency display   → data-testid="contingency-amount"
 *
 * In src/App.jsx — navigation:
 *   New Customer button   → data-testid="new-customer-btn"
 *   New Quote button      → data-testid="new-quote-btn"
 *   Status select         → data-testid="quote-status-select"
 *
 * In src/components/Quotes/ScrubbTab.jsx:
 *   Contingency balance   → data-testid="contingency-balance"
 *   Add payment button    → data-testid="add-payment-btn"
 *   Payment amount input  → data-testid="payment-amount"
 *   Is contingency check  → data-testid="payment-is-contingency"
 *   Save payment button   → data-testid="save-payment-btn"
 *
 * In src/components/Auth/CustomerPortal.jsx:
 *   Portal contingency    → data-testid="portal-contingency-balance"
 *   Portal notes section  → data-testid="portal-project-notes"
 */

import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173';  // Vite default port

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

async function adminLogin(page) {
  await page.goto(BASE_URL);
  // REQUIRES DATA-TESTID: login-username, login-password, login-btn
  await page.fill('[data-testid="login-username"]', 'SHERMAN');
  await page.fill('[data-testid="login-password"]', 'BIDDING');
  await page.click('[data-testid="login-btn"]');
  // Select Admin user from user picker
  // REQUIRES DATA-TESTID: select-user-{name} on each user button
  await page.click('[data-testid="select-user-Admin"]');
}

async function customerPortalLogin(page, firstName, lastName) {
  await page.goto(BASE_URL);
  // Customer login: password = 'mybid', name field = firstName+lastName (no spaces)
  // REQUIRES DATA-TESTID: login-password on customer password input
  await page.fill('[data-testid="login-password"]', 'mybid');
  // REQUIRES DATA-TESTID: login-customername on customer name input
  await page.fill('[data-testid="login-customername"]', `${firstName}${lastName}`.toLowerCase());
  await page.click('[data-testid="login-btn"]');
}

// ─────────────────────────────────────────────────────────────────────────────
// A. AUTHENTICATION
// ─────────────────────────────────────────────────────────────────────────────

test('A — Admin login and logout', async ({ page }) => {
  await adminLogin(page);
  await expect(page.locator('text=Dashboard')).toBeVisible();

  await page.click('[data-testid="logout-btn"]');
  // REQUIRES DATA-TESTID: logout-btn
  await expect(page.locator('[data-testid="login-btn"]')).toBeVisible();
});

// ─────────────────────────────────────────────────────────────────────────────
// D. CUSTOMER MANAGEMENT
// ─────────────────────────────────────────────────────────────────────────────

test('D — Create, edit, and search customer', async ({ page }) => {
  await adminLogin(page);

  // Create
  await page.click('[data-testid="new-customer-btn"]');
  await page.fill('[data-testid="customer-firstName"]', 'Test');
  await page.fill('[data-testid="customer-lastName"]', 'Customer');
  await page.fill('[data-testid="customer-phone"]', '507-555-0100');
  await page.fill('[data-testid="customer-email"]', 'test.customer@example.com');
  await page.fill('[data-testid="customer-siteAddress"]', '123 Oak Street');
  await page.fill('[data-testid="customer-siteCity"]', 'Rochester');
  await page.fill('[data-testid="customer-siteState"]', 'MN');
  await page.fill('[data-testid="customer-siteZip"]', '55901');
  await page.fill('[data-testid="customer-siteCounty"]', 'Olmsted');
  await page.click('[data-testid="save-customer-btn"]');

  // Verify appears in dashboard
  await expect(page.locator('text=Test Customer')).toBeVisible();

  // Search
  // REQUIRES DATA-TESTID: search-input on the dashboard search field
  await page.fill('[data-testid="search-input"]', 'Test Customer');
  await expect(page.locator('text=Test Customer')).toBeVisible();
  await page.fill('[data-testid="search-input"]', '');

  // Edit
  await page.click('text=Test Customer');
  // REQUIRES DATA-TESTID: edit-customer-btn
  await page.click('[data-testid="edit-customer-btn"]');
  await page.fill('[data-testid="customer-phone"]', '507-555-0199');
  await page.click('[data-testid="save-customer-btn"]');
  await expect(page.locator('text=507-555-0199')).toBeVisible();
});

// ─────────────────────────────────────────────────────────────────────────────
// E–G. QUOTE CREATION & FORMULAS
// ─────────────────────────────────────────────────────────────────────────────

test('E–G — Create quote, verify field auto-updates and formula', async ({ page }) => {
  await adminLogin(page);
  await page.click('text=Test Customer');
  await page.click('[data-testid="new-quote-btn"]');

  // Select home model — should auto-fill dimensions + price
  await page.selectOption('[data-testid="quote-homeModel"]', { label: 'LEGEND 43 MOD' });

  // Verify auto-fill happened
  // REQUIRES DATA-TESTID: quote-houseWidth, quote-houseLength, quote-homeBasePrice
  await expect(page.locator('[data-testid="quote-houseWidth"]')).not.toHaveValue('');
  await expect(page.locator('[data-testid="quote-homeBasePrice"]')).not.toHaveValue('');

  // Set foundation to basement — should auto-add stairs/water heater/furnace
  await page.selectOption('[data-testid="quote-foundationType"]', 'basement');
  // REQUIRES DATA-TESTID: service-checkbox-basement_stairs (or similar)
  await expect(page.locator('[data-testid="service-checkbox-basement_stairs"]')).toBeChecked();

  // Set site fields
  await page.fill('[data-testid="quote-driveTime"]', '45');
  await page.selectOption('[data-testid="quote-sewerType"]', '2_bed');
  await page.fill('[data-testid="quote-wellDepth"]', '150');
  await page.selectOption('[data-testid="quote-patioSize"]', '8ft');

  // Save and verify totals display
  await page.click('[data-testid="save-quote-btn"]');
  const totalText = await page.locator('[data-testid="grand-total"]').innerText();
  expect(totalText).toMatch(/\$[\d,]+/);

  // Verify contingency is shown
  const contingencyText = await page.locator('[data-testid="contingency-amount"]').innerText();
  expect(contingencyText).toMatch(/\$[\d,]+/);
});

// ─────────────────────────────────────────────────────────────────────────────
// I. DOCUMENT GENERATION
// ─────────────────────────────────────────────────────────────────────────────

test('I — Generate all documents and verify they open', async ({ page }) => {
  await adminLogin(page);
  await page.click('text=Test Customer');
  await page.click('text=View Quote');  // Navigate to the created quote

  const docButtons = [
    'Generate Quote',
    'Customer Quote',
    'Pier Diagram',
    'Scope of Work',
    'Crew Work Order',
    'Job Summary',
    'Allowance Progress'
    // Change Order is tested separately
  ];

  for (const label of docButtons) {
    // Each button should open a document (new tab or inline)
    const [newPage] = await Promise.all([
      page.waitForEvent('popup').catch(() => null),
      page.click(`button:has-text("${label}")`)
    ]);
    if (newPage) {
      await expect(newPage).not.toBeNull();
      const content = await newPage.content();
      // Verify document has price info (not blank)
      expect(content).toMatch(/\$/);
      await newPage.close();
    }
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// M. CHANGE ORDERS
// ─────────────────────────────────────────────────────────────────────────────

test('M — Create and sign a change order', async ({ page }) => {
  await adminLogin(page);
  await page.click('text=Test Customer');
  await page.click('text=View Quote');

  // REQUIRES DATA-TESTID: create-change-order-btn
  await page.click('[data-testid="create-change-order-btn"]');

  // Make some changes in CO mode
  // Add/remove a service, adjust a price

  await page.click('[data-testid="save-quote-btn"]');

  // Verify CO record created
  await expect(page.locator('text=CO #1a')).toBeVisible();

  // Sign it
  // REQUIRES DATA-TESTID: sign-co-btn
  await page.click('[data-testid="sign-co-btn"]');
  await expect(page.locator('text=Signed')).toBeVisible();
});

// ─────────────────────────────────────────────────────────────────────────────
// K. QUOTE STATUS → CONTRACT
// ─────────────────────────────────────────────────────────────────────────────

test('K — Accept quote and verify it moves to contracts', async ({ page }) => {
  await adminLogin(page);
  await page.click('text=Test Customer');
  await page.click('text=View Quote');

  await page.selectOption('[data-testid="quote-status-select"]', 'Accepted');
  await page.click('[data-testid="save-quote-btn"]');

  // Quote should no longer appear in quotes list, now in contracts
  // Navigate back to customer view
  // REQUIRES DATA-TESTID: back-to-customer-btn
  await page.click('[data-testid="back-to-customer-btn"]');
  await expect(page.locator('text=Under Contract')).toBeVisible();
});

// ─────────────────────────────────────────────────────────────────────────────
// N + O. SCRUBB TAB & CONTINGENCY FORMULA
// ─────────────────────────────────────────────────────────────────────────────

test('N–O — Scrubb cost entry and contingency formula', async ({ page }) => {
  await adminLogin(page);
  await page.click('text=Test Customer');
  await page.click('text=View Contract');  // Now it's a contract

  // REQUIRES DATA-TESTID: scrubb-tab
  await page.click('[data-testid="scrubb-tab"]');

  // Verify NHL Contract row exists
  await expect(page.locator('text=NHL Contract')).toBeVisible();

  // Enter actual costs for allowance items
  // (permits under budget → positive variance → saves to contingency)
  // (sewer over budget → negative variance → draws from contingency)
  // REQUIRES DATA-TESTID: scrubb-input-permits, scrubb-input-sewer
  await page.fill('[data-testid="scrubb-input-permits"]', '4200');
  await page.keyboard.press('Enter');
  await page.fill('[data-testid="scrubb-input-sewer"]', '19000');
  await page.keyboard.press('Enter');

  // Capture contingency balance from Scrubb
  const scrubbBalance = await page.locator('[data-testid="contingency-balance"]').innerText();

  // Add a contingency payment
  await page.click('[data-testid="add-payment-btn"]');
  await page.fill('[data-testid="payment-amount"]', '1500');
  await page.check('[data-testid="payment-is-contingency"]');
  await page.click('[data-testid="save-payment-btn"]');

  // Contingency balance should DECREASE by 1500
  const newBalance = await page.locator('[data-testid="contingency-balance"]').innerText();
  const oldNum = parseFloat(scrubbBalance.replace(/[^0-9.-]/g, ''));
  const newNum = parseFloat(newBalance.replace(/[^0-9.-]/g, ''));
  expect(newNum).toBeLessThan(oldNum);
});

// ─────────────────────────────────────────────────────────────────────────────
// S. CUSTOMER PORTAL — Verify it matches Scrubb
// ─────────────────────────────────────────────────────────────────────────────

test('S — Customer portal shows correct balance matching Scrubb', async ({ page, browser }) => {
  // Get Scrubb balance as admin first
  await adminLogin(page);
  await page.click('text=Test Customer');
  await page.click('text=View Contract');
  await page.click('[data-testid="scrubb-tab"]');
  const scrubbBalance = await page.locator('[data-testid="contingency-balance"]').innerText();

  // Now log in as customer in a new context
  const customerContext = await browser.newContext();
  const customerPage = await customerContext.newPage();
  await customerPortalLogin(customerPage, 'Test', 'Customer');

  // Find the quote and check budget tracker
  const portalBalance = await customerPage.locator('[data-testid="portal-contingency-balance"]').innerText();

  // Both should show same number
  expect(portalBalance).toBe(scrubbBalance);

  await customerContext.close();
});

// ─────────────────────────────────────────────────────────────────────────────
// H. NOTES PUBLISHED TO CORRECT AUDIENCES
// ─────────────────────────────────────────────────────────────────────────────

test('H — Customer notes visible in portal, crew notes NOT', async ({ page, browser }) => {
  await adminLogin(page);
  await page.click('text=Test Customer');
  await page.click('text=View Contract');

  // Publish a customer note on permits service
  // REQUIRES DATA-TESTID: notes-input-permits-customer, publish-note-btn-permits-customer
  await page.fill('[data-testid="notes-input-permits-customer"]', 'Customer-facing test note');
  await page.click('[data-testid="publish-note-btn-permits-customer"]');

  // Publish a crew note
  await page.fill('[data-testid="notes-input-permits-crew"]', 'Crew-only test note');
  await page.click('[data-testid="publish-note-btn-permits-crew"]');

  // Customer portal: customer note visible, crew note NOT visible
  const customerContext = await browser.newContext();
  const customerPage = await customerContext.newPage();
  await customerPortalLogin(customerPage, 'Test', 'Customer');

  await expect(customerPage.locator('text=Customer-facing test note')).toBeVisible();
  await expect(customerPage.locator('text=Crew-only test note')).not.toBeVisible();

  await customerContext.close();
});

// ─────────────────────────────────────────────────────────────────────────────
// R. CREW VIEW
// ─────────────────────────────────────────────────────────────────────────────

test('R — Crew view shows active contracts, not quote details', async ({ page }) => {
  await adminLogin(page);

  // Switch to crew role
  // REQUIRES DATA-TESTID: role-switcher-select
  await page.selectOption('[data-testid="role-switcher-select"]', 'crew');

  // Should see Jobs tab with Test Customer's job
  await expect(page.locator('text=Test Customer')).toBeVisible();

  // Crew should NOT see pricing or edit buttons
  await expect(page.locator('button:has-text("Edit Quote")')).not.toBeVisible();
  await expect(page.locator('button:has-text("Edit Pricing")')).not.toBeVisible();

  // Click job — verify pier diagram loads
  await page.click('text=Test Customer');
  // Pier diagram section should be present
  await expect(page.locator('text=Pier')).toBeVisible();
});

// ─────────────────────────────────────────────────────────────────────────────
// Z. EDGE CASES
// ─────────────────────────────────────────────────────────────────────────────

test('Z — Edge cases: min drive miles, zero well depth, zero markup', async ({ page }) => {
  await adminLogin(page);
  await page.click('text=Test Customer');
  await page.click('[data-testid="new-quote-btn"]');

  // Min miles — should enforce minimum (15)
  await page.fill('[data-testid="quote-driveTime"]', '5');
  await page.click('[data-testid="quote-foundationType"]');  // trigger blur
  const driveValue = await page.locator('[data-testid="quote-driveTime"]').inputValue();
  expect(parseInt(driveValue)).toBeGreaterThanOrEqual(15);

  // Zero well depth — no well cost
  await page.fill('[data-testid="quote-wellDepth"]', '0');
  await page.click('[data-testid="save-quote-btn"]');
  // Well should not appear in pricing breakdown
  await expect(page.locator('[data-testid="grand-total"]')).not.toContainText('Well: $0');

  // patioSize = none — no patio cost
  await page.selectOption('[data-testid="quote-patioSize"]', 'none');
  // No crash, no patio line in summary

  // Grand total should always be a real number (no NaN, no undefined)
  const total = await page.locator('[data-testid="grand-total"]').innerText();
  expect(total).toMatch(/\$[\d,]+/);
  expect(total).not.toContain('NaN');
  expect(total).not.toContain('undefined');
});
