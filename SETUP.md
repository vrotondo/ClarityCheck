# ClarityCheck - Setup Instructions

## Project Structure

Your project should have this structure:

```
claritycheck/
├── node_modules/          (created after npm install)
├── public/
├── src/
│   ├── components/
│   │   ├── ActionItemsPanel.tsx
│   │   ├── AnalysisPanel.tsx
│   │   ├── ImprovementPanel.tsx
│   │   ├── InputPanel.tsx
│   │   └── LoadingState.tsx
│   ├── hooks/
│   │   ├── useAIAnalysis.ts
│   │   └── useAICapabilities.ts
│   ├── services/
│   │   ├── promptAPI.ts
│   │   ├── rewriterAPI.ts
│   │   ├── summarizerAPI.ts
│   │   └── writerAPI.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── scoringLogic.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install
```

This will install:
- **React 18.3.1** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **PostCSS & Autoprefixer** - CSS processing

### 2. Configure Chrome for Built-in AI

ClarityCheck requires Chrome Canary with AI features enabled.

#### Download Chrome Canary
- [Chrome Canary Download](https://www.google.com/chrome/canary/)

#### Enable AI Flags
1. Open Chrome Canary
2. Navigate to `chrome://flags`
3. Enable the following flags:
   - `#optimization-guide-on-device-model` → **Enabled**
   - `#prompt-api-for-gemini-nano` → **Enabled**
   - `#summarization-api-for-gemini-nano` → **Enabled**
   - `#rewriter-api-for-gemini-nano` → **Enabled**
   - `#writer-api-for-gemini-nano` → **Enabled**

4. Click "Relaunch" to restart Chrome

#### Download AI Model
1. Open DevTools (F12)
2. Go to Console tab
3. Run this command to trigger model download:
   ```javascript
   await ai.languageModel.create()
   ```
4. Wait for the model to download (may take several minutes)
5. You'll see a success message when ready

### 3. Start Development Server

```bash
npm run dev
```

This will start Vite dev server at `http://localhost:5173`

### 4. Open in Chrome Canary

**IMPORTANT:** You must open the app in Chrome Canary (not regular Chrome) for AI features to work.

Open: `http://localhost:5173`

### 5. Test the Application

1. You should see "AI Ready" indicator in the header
2. Try the "Load Example" button
3. Click "Analyze Instructions"
4. You should see analysis results appear

## Troubleshooting

### "Chrome Built-in AI Not Available" Error

**Cause:** AI APIs are not detected

**Solutions:**
1. Verify you're using Chrome Canary (not regular Chrome)
2. Check all flags are enabled at `chrome://flags`
3. Restart Chrome Canary completely
4. Try running `await ai.languageModel.create()` in DevTools console
5. Check Chrome version is 127 or later

### Model Download Issues

**Cause:** Gemini Nano model not downloaded

**Solutions:**
1. Open DevTools → Console
2. Run: `await ai.languageModel.create()`
3. Wait for download to complete (check chrome://components for "Optimization Guide On Device Model")
4. Refresh the page

### TypeScript Errors

**Cause:** Missing type definitions for AI APIs

**Note:** The `window.ai` types are defined in each service file using `declare global`. TypeScript may show errors in the editor but the app should still compile and run.

### Import Errors

**Cause:** Incorrect file paths

**Solution:** Ensure all files are in the correct directories as shown in the project structure above.

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## Additional Commands

- `npm run lint` - Run ESLint
- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Browser Compatibility

- ✅ Chrome Canary 127+ (with AI flags enabled)
- ❌ Regular Chrome (AI APIs not yet available)
- ❌ Firefox, Safari, Edge (not supported)

## What's Next?

Once the app is running successfully:
1. Test all features (analysis, rewriting, action items)
2. Try different types of instructions
3. Customize the UI or add new features
4. Prepare for Chrome Extension version

## Need Help?

Check the [Chrome Built-in AI Documentation](https://developer.chrome.com/docs/ai/built-in)