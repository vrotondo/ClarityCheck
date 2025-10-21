import React, { useState } from 'react';

interface ImprovementPanelProps {
    improvedVersion: string;
}

export function ImprovementPanel({ improvedVersion }: ImprovementPanelProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(improvedVersion);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    if (!improvedVersion) {
        return null;
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Improved Version</h2>
                <button
                    onClick={handleCopy}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                >
                    {copied ? (
                        <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Copied!</span>
                        </>
                    ) : (
                        <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4 rounded">
                <p className="text-sm text-green-800">
                    ✨ This version has been rewritten for improved clarity, specificity, and actionability.
                </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="prose max-w-none">
                    <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                        {improvedVersion}
                    </p>
                </div>
            </div>
        </div>
    );
}