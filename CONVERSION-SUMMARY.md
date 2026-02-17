# Sherman Bidding System - Standalone HTML Conversion

## ✅ Conversion Complete!

Successfully converted the React JSX application to a standalone HTML file that can be opened by double-clicking in Windows Explorer.

---

## 📊 File Details

| Item | Details |
|------|---------|
| **Output File** | `Modular-Bidding.html` |
| **File Size** | 195,946 bytes (191.35 KB) |
| **Source File** | `src/sherman-bidding-system.jsx` |
| **Source Lines** | 3,155 lines |
| **Created** | February 4, 2026 |

---

## 🎯 What's Included

### 1. **React & Dependencies (from CDN)**
   - ✅ React 18 (production build)
   - ✅ ReactDOM 18 (production build)
   - ✅ Babel Standalone (for JSX transformation)

### 2. **Storage Adapter**
   - ✅ `window.storage` object using localStorage
   - ✅ Async get/set methods for data persistence
   - ✅ Compatible with original storage interface

### 3. **Complete Application Code**
   - ✅ All 3,155 lines of the original JSX
   - ✅ Import statement removed and converted to React hooks destructuring
   - ✅ Export statement removed (not needed in browser)
   - ✅ All components, functions, and constants included

### 4. **Render Logic**
   - ✅ `ReactDOM.render(<App />, document.getElementById('root'))`
   - ✅ Mounts the application to the DOM on page load

---

## 🚀 How to Use

### **Step 1: Open the File**
Double-click `Modular-Bidding.html` in Windows Explorer. It will open in your default browser.

### **Step 2: Login**

**Staff Access:**
- Username: `SHERMAN`
- Password: `BIDDING`

**Customer Portal:**
- Username: `firstnamelastname` (no spaces, lowercase)
- Password: `mybid`

### **Step 3: Use the Application**
- Create customers
- Generate quotes
- Manage pricing
- View warranties
- Access pier diagrams
- Everything works exactly like the original!

---

## 💾 Data Storage

- **Storage Method:** Browser localStorage
- **Keys Used:**
  - `sherman_quotes` - All quote data
  - `sherman_customers` - All customer data
  - `sherman_users` - User accounts
  - `sherman_pricing` - Pricing configuration

- **Data Persistence:** Data is saved automatically and persists between sessions
- **Browser Specific:** Each browser maintains its own separate data
- **Reset Data:** Clear browser localStorage or cache

---

## 🔧 Technical Architecture

```
Modular-Bidding.html
├── <!DOCTYPE html>
├── <head>
│   ├── React 18 CDN
│   ├── ReactDOM 18 CDN
│   ├── Babel Standalone CDN
│   └── Inline CSS styles
├── <body>
│   ├── <div id="root"></div>
│   └── <script type="text/babel">
│       ├── window.storage adapter
│       ├── All app code (3,155 lines)
│       └── ReactDOM.render(<App />)
└── </html>
```

---

## ✨ Key Features

### **Customer Management**
- ✅ Create, edit, delete customers
- ✅ Track multiple contacts per customer
- ✅ Separate mailing addresses
- ✅ Phone and email validation

### **Quote Generation**
- ✅ 60+ pre-configured home models
- ✅ Auto-fill dimensions from model selection
- ✅ Dynamic pricing calculations
- ✅ Service selection with overrides
- ✅ Custom services
- ✅ Material cost tracking
- ✅ Labor calculations
- ✅ Project command breakdown

### **Customer Portal**
- ✅ Customers can log in to view their quotes
- ✅ Active project tracking
- ✅ View floor plans
- ✅ Download quotes

### **Pier Diagrams**
- ✅ Automatic pier layout generation
- ✅ Cross-section views
- ✅ Accurate spacing calculations
- ✅ SVG-based diagrams

### **User Roles**
- ✅ Admin - Full access
- ✅ Sales - Customer and quote management
- ✅ Crew - Job view, warranties, checklists

### **File Management**
- ✅ Organize files by quote
- ✅ Four folder types per quote
- ✅ Link to external files
- ✅ Auto-save quotes, pier layouts, floor plans

---

## 🌐 Browser Compatibility

| Browser | Status |
|---------|--------|
| Chrome | ✅ Recommended |
| Edge | ✅ Supported |
| Firefox | ✅ Supported |
| Safari | ✅ Supported |
| Internet Explorer | ❌ Not supported |

**Requirements:**
- Modern browser (2020 or newer)
- JavaScript enabled
- localStorage enabled
- No server required - runs entirely client-side

---

## 🔄 Conversion Process Used

The conversion was performed using a PowerShell script:

### **Steps:**
1. Read the original JSX file (`sherman-bidding-system.jsx`)
2. Replace ES6 import with React hooks destructuring
3. Wrap in HTML template with CDN scripts
4. Add localStorage storage adapter
5. Add ReactDOM.render() call
6. Write to `Modular-Bidding.html`

### **Script:** `convert-jsx-to-html.ps1`

---

## 📂 Files Created

| File | Purpose |
|------|---------|
| `Modular-Bidding.html` | **Main standalone HTML file (USE THIS)** |
| `convert-jsx-to-html.ps1` | PowerShell conversion script |
| `convert-to-html.py` | Python conversion script (alternative) |
| `README-HTML.txt` | Quick start guide |
| `CONVERSION-SUMMARY.md` | This file |

---

## ⚠️ Important Notes

### **Internet Connection Required For:**
- Floor plan images (loaded from claytonhomes.com)
- React/ReactDOM/Babel CDN scripts (first load only, then cached)

### **Works Offline After First Load:**
- Once the page loads successfully, the CDN scripts are cached
- All data is stored locally
- Can work offline except for external images

### **Security Notes:**
- All data is stored in browser localStorage (not encrypted)
- Not suitable for sensitive financial data without proper security
- Use HTTPS if deploying to a web server
- Consider proper authentication for production use

---

## 🎨 Customization

To modify the application:

### **1. Edit Pricing:**
   - Open `Modular-Bidding.html` in a text editor
   - Find `DEFAULT_MATERIALS`, `DEFAULT_SERVICES`, etc.
   - Modify values as needed
   - Save and reload in browser

### **2. Change Styling:**
   - Find the `<style>` block in `<head>`
   - Modify CSS as needed

### **3. Extract JSX:**
   - Copy code between `<script type="text/babel">` tags
   - Add back: `import React, { useState, useEffect } from 'react';`
   - Save as `.jsx` file

---

## 📞 Support

**Sherman Pole Buildings**
- Phone: (320) 679-3438
- Address: 2244 Hwy 65, Mora, MN 55051

---

## ✅ Verification Checklist

- [x] HTML file created successfully
- [x] File size: 195,946 bytes (191.35 KB)
- [x] All 3,155 lines of source code included
- [x] React 18 CDN links working
- [x] Babel Standalone CDN link working
- [x] localStorage adapter implemented
- [x] Import statement converted
- [x] ReactDOM.render() added
- [x] Proper HTML structure
- [x] README documentation created
- [x] Conversion scripts saved for future use

---

## 🎉 Success!

Your Sherman Bidding System is now a fully functional standalone HTML file that can be opened by double-clicking in Windows Explorer. No server, no build process, no installation required!

**Just double-click `Modular-Bidding.html` and start using it!**

---

*Generated: February 4, 2026*
