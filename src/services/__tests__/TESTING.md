# ClarityCheck Testing Guide

## Quick Start

### Running Manual Tests
Use the checklist in this document to manually test all features.

### Running Automated Tests (Optional)

If you want to set up automated tests:

```bash
# Install test dependencies
npm install --save-dev vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event

# Run tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

---

## Manual Test Cases

### 🟢 Critical Path Tests (Must Pass)

#### CP-1: Load Application
**Steps:**
1. Navigate to your deployed URL
2. Wait for page to load

**Expected:**
- ✅ Page loads within 3 seconds
- ✅ No console errors
- ✅ Header shows "ClarityCheck"
- ✅ Input panel visible on left
- ✅ "Ready to Analyze" visible on right

---

#### CP-2: Example Analysis (Full Flow)
**Steps:**
1. Click "Load Example" button
2. Verify text appears in textarea
3. Click "Analyze Instructions"
4. Wait for results

**Expected:**
- ✅ Example text loads: "Please update the dashboard by EOD..."
- ✅ Loading spinner appears
- ✅ Results appear within 5 seconds
- ✅ Clarity score shows (should be 40-60)
- ✅ Multiple issues listed
- ✅ Improved version displays
- ✅ Action items checklist appears

---

#### CP-3: Copy Functionality
**Steps:**
1. Complete an analysis
2. Scroll to "Improved Version" section
3. Click "Copy" button
4. Open Notepad/TextEdit and paste (Ctrl+V)

**Expected:**
- ✅ Button changes to "Copied!" with checkmark
- ✅ Text successfully pastes in external app
- ✅ Pasted text matches displayed improved version

---

#### CP-4: Action Items Interaction
**Steps:**
1. Complete an analysis with action items
2. Click checkbox next to first action item
3. Observe changes

**Expected:**
- ✅ Checkbox becomes checked
- ✅ Text gets strikethrough
- ✅ Progress bar increases
- ✅ Completion count updates (e.g., "1 of 3 completed")

---

### 🟡 Feature Tests

#### F-1: Clear Button
**Input:** Type "test text" in textarea
**Action:** Click "Clear" button
**Expected:** Textarea becomes empty, character count shows 0

---

#### F-2: Character Counter
**Input:** Type "Hello World" (11 characters)
**Expected:** Character counter shows "11 characters"

---

#### F-3: Disabled State
**Input:** Leave textarea empty
**Expected:** "Analyze Instructions" button is gray and disabled

---

#### F-4: New Analysis Button
**Steps:**
1. Complete an analysis
2. Click "New Analysis" button in header

**Expected:**
- Textarea clears
- Results panels disappear
- Returns to "Ready to Analyze" state

---

#### F-5: Responsive Design
**Steps:**
1. Resize browser to 400px width (mobile)
2. Observe layout

**Expected:**
- Panels stack vertically
- All text readable
- No horizontal scroll
- Buttons remain accessible

---

### 🔴 Edge Case Tests

#### E-1: Very Short Input
**Input:** "ok"
**Expected:** 
- Analysis completes
- Very low score (0-30)
- Multiple high-severity issues
- Improved version adds context

---

#### E-2: Very Long Input
**Input:** Paste a 2000+ character essay
**Expected:**
- Analysis completes successfully
- Results display properly
- No performance issues
- Scrolling works smoothly

---

#### E-3: Special Characters
**Input:** "Update @dashboard #now! (urgent) *ASAP*"
**Expected:**
- Analysis handles special characters
- Detects vague terms like "ASAP"
- No crashes or errors

---

#### E-4: Empty Analysis
**Input:** "        " (only spaces)
**Expected:**
- Either button disabled OR error message
- No crash

---

#### E-5: Rapid Clicking
**Steps:**
1. Click "Analyze Instructions" 5 times rapidly
2. Observe behavior

**Expected:**
- Only one analysis runs
- Button disabled during processing
- No duplicate results

---

## Test Data Sets

### Test Set 1: Poor Quality Instructions

```
Update the dashboard by EOD. Make sure everything looks good and all the numbers are correct. Check with the team if you have questions.
```
**Expected Score:** 40-60
**Expected Issues:** 4-6 issues including unclear deadline, vague language, ambiguous references

---

### Test Set 2: Medium Quality Instructions

```
Please review the Q4 sales report and send feedback by Friday. Make sure to check the revenue numbers carefully.
```
**Expected Score:** 60-75
**Expected Issues:** 2-3 issues (missing specific time, vague "carefully")

---

### Test Set 3: High Quality Instructions

```
Please complete the Q4 financial report by Friday, December 20th at 5:00 PM EST. Review all revenue figures in section 2.1, verify expense allocations in section 3.4, and compare year-over-year growth with last quarter's data. Submit the final report to finance@company.com with the subject line "Q4 Report - Final". If you encounter any discrepancies, document them in the Issues tab and notify me immediately via Slack.
```
**Expected Score:** 80-95
**Expected Issues:** 0-2 minor issues

---

### Test Set 4: Technical Jargon

```
Deploy the API endpoint to the staging server and run integration tests before pushing to prod.
```
**Expected Score:** 50-70
**Expected Issues:** Missing steps, assumed knowledge about deployment process

---

## Browser Compatibility Matrix

| Browser | Version | Expected Behavior |
|---------|---------|-------------------|
| Chrome Canary | 127+ | ✅ Full support, may have real AI |
| Chrome | Latest | ✅ Demo mode works perfectly |
| Firefox | Latest | ✅ Demo mode works |
| Safari | Latest | ✅ Demo mode works |
| Edge | Latest | ✅ Demo mode works |

---

## Performance Benchmarks

| Metric | Target | Critical |
|--------|--------|----------|
| Initial page load | < 3 sec | < 5 sec |
| Analysis time (demo) | 2-4 sec | < 6 sec |
| Button response | < 100ms | < 300ms |
| Smooth scrolling | 60 FPS | 30 FPS |

---

## Issue Severity Guide

When testing, verify issue severities match these patterns:

| Issue Type | Typical Severity |
|------------|------------------|
| Missing deadline | High |
| Vague language (ASAP, soon) | Medium |
| Ambiguous pronouns | Medium |
| Missing steps | High |
| Unclear responsibility | Medium |
| Assumed knowledge | Low |
| Missing context | Medium |

---

## Quick Smoke Test (2 minutes)

Before submitting or demoing, run this quick test:

1. ⏱️ **Load test**: Page loads < 3 sec
2. 🔘 **Button test**: "Load Example" works
3. ⚡ **Analysis test**: Analyze completes < 5 sec
4. 📊 **Results test**: Score, issues, improved version all show
5. ✅ **Checkbox test**: Can check action items
6. 📋 **Copy test**: Copy button works
7. 🔄 **Reset test**: "New Analysis" clears everything

**All passing? You're good to go!** ✅

---

## Troubleshooting

### Issue: Analysis never completes
- Check browser console for errors
- Verify internet connection
- Try refreshing the page

### Issue: Results look broken
- Check browser zoom (should be 100-125%)
- Try different browser
- Clear cache and reload

### Issue: Copy button doesn't work
- Check browser permissions for clipboard
- Try using keyboard shortcut instead
- Verify HTTPS connection (required for clipboard API)

---

## Test Reporting Template

When reporting test results:

```
CLARITYCHECK TEST REPORT
Date: [Date]
Tester: [Your Name]
Environment: [Browser/OS]

CRITICAL TESTS:
☐ CP-1: Load Application [PASS/FAIL]
☐ CP-2: Example Analysis [PASS/FAIL]
☐ CP-3: Copy Functionality [PASS/FAIL]
☐ CP-4: Action Items [PASS/FAIL]

FEATURE TESTS:
☐ F-1 through F-5 [X/5 passed]

EDGE CASES:
☐ E-1 through E-5 [X/5 passed]

BROWSER COMPATIBILITY:
☐ Chrome: [PASS/FAIL]
☐ Firefox: [PASS/FAIL]
☐ Safari: [PASS/FAIL]

ISSUES FOUND:
1. [Description]
2. [Description]

OVERALL: [PASS/FAIL]
```