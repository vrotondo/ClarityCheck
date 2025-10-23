# ClarityCheck - Instruction Quality Analyzer

![Chrome Built-in AI](https://img.shields.io/badge/Chrome-Built--in%20AI-4285F4?logo=google-chrome)
![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)

**ClarityCheck** is an AI-powered web application that analyzes instructions in real-time to identify clarity issues and suggest improvements. Built for the Google Chrome Built-in AI Challenge 2025.

## 🎯 Problem Statement

Poor communication costs organizations time and money. When managers give instructions, critical information often gets lost:
- Missing steps or context
- Vague language and ambiguous terms
- Unclear deadlines and responsibilities
- Assumed knowledge that isn't shared

ClarityCheck solves this by providing instant, AI-powered feedback on instruction quality.

## ✨ Features

### 📊 Clarity Scoring
- Real-time analysis of instruction quality (0-100 score)
- Visual indicators for score interpretation
- Detailed breakdown of issues found

### 🔍 Issue Detection
Identifies seven types of clarity problems:
- **Missing Steps** - Gaps in the process
- **Vague Language** - Ambiguous or unclear terms
- **Ambiguous References** - Unclear pronouns or references
- **Unclear Deadlines** - Missing or vague timelines
- **Assumed Knowledge** - Unexplained concepts or context
- **Missing Context** - Insufficient background information
- **Unclear Responsibility** - Unspecified who should do what

### ✏️ Improved Versions
- AI-generated rewritten instructions
- Enhanced clarity and specificity
- Added missing steps and context
- Copy functionality for easy use

### ✅ Action Item Extraction
- Automatic extraction of tasks from instructions
- Interactive checklist with completion tracking
- Priority indicators (high/medium/low)
- Progress visualization

## 🛠️ Technology Stack

### AI APIs Used
- **Prompt API** - Analyzes instructions and identifies issues
- **Rewriter API** - Generates improved versions with better clarity
- **Summarizer API** - Extracts action items from instructions
- **Writer API** - Fills in missing steps and context

### Frontend Stack
- **React 18** - UI framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool and dev server

## 🚀 Getting Started

### Prerequisites
- Chrome Canary (version 127 or later)
- Node.js (version 18 or later)
- npm or yarn

### Installation

See [SETUP.md](SETUP.md) for detailed setup instructions.

**Quick Start:**
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Then open `http://localhost:5173` in Chrome Canary with AI flags enabled.

## 💡 How It Works

1. **User Input**: Paste or type instructions into the input panel
2. **AI Analysis**: Four AI APIs work in parallel:
   - Prompt API analyzes for clarity issues
   - Rewriter API generates improved version
   - Summarizer API extracts action items
   - Writer API fills missing information
3. **Results Display**: Shows clarity score, identified issues, improved version, and actionable checklist
4. **User Action**: Copy improved text or use the checklist to complete tasks

## 🎨 User Interface

### Key Components
- **Input Panel** - Text input with example instructions
- **Analysis Panel** - Clarity score and issue breakdown
- **Improvement Panel** - AI-rewritten version
- **Action Items Panel** - Interactive task checklist
- **Loading States** - Visual feedback during AI processing

### Design Principles
- Clean, professional interface
- Color-coded severity indicators
- Responsive layout (desktop and mobile)
- Accessible design with clear hierarchy

## 📦 Project Structure

```
src/
├── components/       # React UI components
├── hooks/           # Custom React hooks
├── services/        # AI API service wrappers
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
├── App.tsx          # Main application component
├── main.tsx         # React entry point
└── index.css        # Global styles
```

## 🔒 Privacy & Security

All processing happens **locally on your device**:
- No data sent to external servers
- Instructions never leave your computer
- Works offline once AI model is downloaded
- Perfect for sensitive workplace communications

## 🎯 Use Cases

### For Managers
- Review instructions before sending to team
- Improve clarity of task assignments
- Reduce miscommunication and rework
- Ensure all necessary context is included

### For Employees
- Clarify vague instructions received
- Extract concrete action items
- Identify missing information to request
- Track task completion

### For Teams
- Standardize communication quality
- Reduce back-and-forth clarification requests
- Improve remote work communication
- Document processes more clearly

## 🏆 Chrome Built-in AI Challenge 2025

This project was built for the Google Chrome Built-in AI Challenge 2025.

**Challenge Goals Met:**
- ✅ Uses multiple Chrome Built-in AI APIs (Prompt, Rewriter, Summarizer, Writer)
- ✅ Solves a real workplace communication problem
- ✅ Works entirely client-side with privacy benefits
- ✅ Demonstrates innovative AI use cases
- ✅ Provides immediate, practical value

## 🔮 Future Enhancements

### Planned Features
- Chrome Extension version (analyze any text on any webpage)
- History/saved analyses
- Custom issue types and rules
- Team templates and style guides
- Integration with Slack, Gmail, Google Docs
- Multilingual support with Translator API
- Export to various formats (PDF, Markdown, etc.)

## 📝 License

MIT License - See LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or feedback about this project, please open an issue on GitHub.

## 🙏 Acknowledgments

- Google Chrome Team for Built-in AI APIs
- Anthropic Claude for development assistance
- Chrome Built-in AI Challenge 2025 organizers

---

**Built with ❤️ using Chrome Built-in AI APIs**