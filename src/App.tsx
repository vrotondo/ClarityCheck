import React from 'react';
import { InputPanel } from './components/InputPanel';
import { AnalysisPanel } from './components/AnalysisPanel';
import { ImprovementPanel } from './components/ImprovementPanel';
import { ActionItemsPanel } from './components/ActionItemsPanel';
import { LoadingState } from './components/LoadingState';
import { useAICapabilities } from './hooks/useAICapabilities';
import { useAIAnalysis } from './hooks/useAIAnalysis';

function App() {
    const { capabilities, isChecking, useMockMode } = useAICapabilities();
    const { result, analyzeText, reset } = useAIAnalysis(useMockMode);

    // Show loading state while checking capabilities
    if (isChecking) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-xl p-8">
                    <LoadingState message="Checking AI capabilities..." />
                </div>
            </div>
        );
    }

    const hasResults = result.clarityScore > 0 || result.issues.length > 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                <span className="text-blue-600">Clarity</span>Check
                            </h1>
                            <p className="text-gray-600 mt-1">Instruction Quality Analyzer</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            {useMockMode ? (
                                <div className="flex items-center space-x-1 bg-yellow-100 px-3 py-1 rounded-full">
                                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                                    <span className="text-xs font-medium text-yellow-800">Demo Mode</span>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-1 bg-green-100 px-3 py-1 rounded-full">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-xs font-medium text-green-800">AI Ready</span>
                                </div>
                            )}
                            {hasResults && (
                                <button
                                    onClick={reset}
                                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 font-medium"
                                >
                                    New Analysis
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Mode Indicator Banner */}
                    {useMockMode && (
                        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                            <div className="flex items-start">
                                <svg className="w-5 h-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-yellow-900">Running in Demo Mode</p>
                                    <p className="text-xs text-yellow-800 mt-1">
                                        Chrome Built-in AI is not available. Using simulated AI responses for demonstration.
                                        Results are generated using pattern matching and will automatically switch to real AI when available.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* API Status Indicators */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        {useMockMode ? (
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                                🔄 Mock AI Service
                            </span>
                        ) : (
                            <>
                                {capabilities.promptAPI && (
                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                        ✓ Prompt API
                                    </span>
                                )}
                                {capabilities.rewriterAPI && (
                                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                        ✓ Rewriter API
                                    </span>
                                )}
                                {capabilities.summarizerAPI && (
                                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                                        ✓ Summarizer API
                                    </span>
                                )}
                                {capabilities.writerAPI && (
                                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                                        ✓ Writer API
                                    </span>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column - Input */}
                    <div className="space-y-6">
                        <InputPanel onAnalyze={analyzeText} isAnalyzing={result.isAnalyzing} />
                    </div>

                    {/* Right Column - Results */}
                    <div className="space-y-6">
                        {result.isAnalyzing ? (
                            <div className="bg-white rounded-lg shadow-md">
                                <LoadingState message={useMockMode ? "Simulating AI analysis..." : "Analyzing instructions with AI..."} />
                            </div>
                        ) : hasResults ? (
                            <>
                                <AnalysisPanel score={result.clarityScore} issues={result.issues} />
                                {result.improvedVersion && (
                                    <ImprovementPanel improvedVersion={result.improvedVersion} />
                                )}
                                {result.actionItems.length > 0 && (
                                    <ActionItemsPanel actionItems={result.actionItems} />
                                )}
                            </>
                        ) : (
                            <div className="bg-white rounded-lg shadow-md p-12 text-center">
                                <div className="text-6xl mb-4">📝</div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    Ready to Analyze
                                </h3>
                                <p className="text-gray-600">
                                    Paste your instructions on the left and click "Analyze Instructions" to get started.
                                </p>
                                <div className="mt-6 text-sm text-gray-500">
                                    <p className="font-medium mb-2">What we analyze:</p>
                                    <ul className="space-y-1">
                                        <li>• Missing steps or information</li>
                                        <li>• Vague or ambiguous language</li>
                                        <li>• Unclear deadlines</li>
                                        <li>• Assumed knowledge</li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Error Display */}
                {result.error && (
                    <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-start">
                            <svg className="w-5 h-5 text-red-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <h3 className="font-semibold text-red-800">Analysis Error</h3>
                                <p className="text-red-700 text-sm mt-1">{result.error}</p>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-gray-600">
                <p>
                    {useMockMode ? (
                        <>Demo Mode • Simulated AI Responses • <span className="font-semibold">No real AI processing</span></>
                    ) : (
                        <>Powered by <span className="font-semibold">Chrome Built-in AI APIs</span> • All processing happens locally on your device 🔒</>
                    )}
                </p>
            </footer>
        </div>
    );
}

export default App;