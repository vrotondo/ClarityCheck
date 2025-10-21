# ClarityCheck

"ClarityCheck" - Instruction Quality Analyzer
Concept: A web app/extension that analyzes instructions in real-time and flags potential issues.
Features:

Paste or type instructions (emails, Slack messages, task descriptions)
AI identifies: missing steps, vague language, ambiguous pronouns, unclear deadlines
Provides a "clarity score" with specific improvement suggestions
Offers rewritten versions with better structure
Generates a checklist of action items from the instructions

APIs Used:

Prompt API: Analyze instruction quality, identify gaps, structure analysis
Rewriter API: Generate clearer versions
Summarizer API: Extract key action items
Writer API: Fill in missing steps or context

Why it's great: Solves your problem directly, works offline (perfect for client-side AI), and has clear utility for managers AND employees.

Technical Stack

Frontend: React + TypeScript + Tailwind CSS
AI: Chrome Built-in AI APIs (Prompt, Rewriter, Summarizer, Writer)
State Management: React hooks (useState, useEffect)
No backend needed - Everything runs client-side!

Core Components Architecture
ClarityCheck/
├── src/
│   ├── components/
│   │   ├── InputPanel.tsx          # Where users paste instructions
│   │   ├── AnalysisPanel.tsx       # Shows clarity score & issues
│   │   ├── ImprovementPanel.tsx    # Displays rewritten version
│   │   ├── ActionItemsPanel.tsx    # Extracted checklist
│   │   └── LoadingState.tsx        # AI processing indicator
│   ├── services/
│   │   ├── promptAPI.ts            # Wrapper for Prompt API
│   │   ├── rewriterAPI.ts          # Wrapper for Rewriter API
│   │   ├── summarizerAPI.ts        # Wrapper for Summarizer API
│   │   └── writerAPI.ts            # Wrapper for Writer API
│   ├── hooks/
│   │   ├── useAIAnalysis.ts        # Custom hook for analysis
│   │   └── useAICapabilities.ts    # Check API availability
│   ├── types/
│   │   └── index.ts                # TypeScript interfaces
│   ├── utils/
│   │   └── scoringLogic.ts         # Calculate clarity score
│   └── App.tsx                     # Main application
Data Flow

User Input → InputPanel
Trigger Analysis → useAIAnalysis hook
Parallel API Calls:

Prompt API: Analyze issues, calculate score
Rewriter API: Generate improved version
Summarizer API: Extract action items
Writer API: Fill gaps if needed


Display Results → Analysis, Improvement, ActionItems panels

Key Features for MVP

Clarity Score (0-100)

Deductions for: vague language, missing steps, unclear deadlines, ambiguous terms
Visual indicator (color-coded)


Issue Detection

Missing information
Vague language
Ambiguous references
No clear deadline
Assumed knowledge


Improved Version

Rewritten with clarity
Added missing steps
Explicit timelines


Action Items Checklist

Numbered, actionable steps
Copy-friendly format
