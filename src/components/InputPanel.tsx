import React, { useState } from 'react';

interface InputPanelProps {
    onAnalyze: (text: string) => void;
    isAnalyzing: boolean;
}

export function InputPanel({ onAnalyze, isAnalyzing }: InputPanelProps) {
    const [text, setText] = useState('');

    const handleAnalyze = () => {
        if (text.trim()) {
            onAnalyze(text);
        }
    };

    const handleClear = () => {
        setText('');
    };

    const exampleText = `Please update the dashboard by EOD. Make sure everything looks good and all the numbers are correct. Check with the team if you have questions.`;

    const loadExample = () => {
        setText(exampleText);
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Instructions to Analyze</h2>
                <button
                    onClick={loadExample}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    disabled={isAnalyzing}
                >
                    Load Example
                </button>
            </div>

            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste or type instructions here... (e.g., emails, Slack messages, task descriptions)"
                className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                disabled={isAnalyzing}
            />

            <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-500">
                    {text.length} characters
                </span>
                <div className="space-x-3">
                    <button
                        onClick={handleClear}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                        disabled={isAnalyzing}
                    >
                        Clear
                    </button>
                    <button
                        onClick={handleAnalyze}
                        disabled={!text.trim() || isAnalyzing}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium transition-colors"
                    >
                        {isAnalyzing ? 'Analyzing...' : 'Analyze Instructions'}
                    </button>
                </div>
            </div>
        </div>
    );
}