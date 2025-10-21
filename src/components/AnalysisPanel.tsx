import React from 'react';
import { Issue } from '../types';
import { getScoreColor, getScoreBgColor, getScoreLabel, getSeverityColor } from '../utils/scoringLogic';

interface AnalysisPanelProps {
    score: number;
    issues: Issue[];
}

export function AnalysisPanel({ score, issues }: AnalysisPanelProps) {
    const issueTypeLabels: Record<string, string> = {
        missing_steps: 'Missing Steps',
        vague_language: 'Vague Language',
        ambiguous_reference: 'Ambiguous Reference',
        unclear_deadline: 'Unclear Deadline',
        assumed_knowledge: 'Assumed Knowledge',
        missing_context: 'Missing Context',
        unclear_responsibility: 'Unclear Responsibility'
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Analysis Results</h2>

            {/* Clarity Score */}
            <div className={`${getScoreBgColor(score)} rounded-lg p-6 mb-6`}>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">Clarity Score</p>
                        <p className={`text-5xl font-bold ${getScoreColor(score)}`}>
                            {score}
                            <span className="text-2xl">/100</span>
                        </p>
                        <p className={`text-sm font-semibold mt-2 ${getScoreColor(score)}`}>
                            {getScoreLabel(score)}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-600">Issues Found</p>
                        <p className="text-3xl font-bold text-gray-800">{issues.length}</p>
                    </div>
                </div>
            </div>

            {/* Issues List */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Identified Issues {issues.length > 0 && `(${issues.length})`}
                </h3>

                {issues.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        <svg className="w-16 h-16 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="font-medium">No major issues detected!</p>
                        <p className="text-sm mt-1">Your instructions are clear and well-structured.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {issues.map((issue) => (
                            <div
                                key={issue.id}
                                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center space-x-2">
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getSeverityColor(issue.severity)}`}>
                                            {issue.severity.toUpperCase()}
                                        </span>
                                        <span className="text-sm font-medium text-gray-700">
                                            {issueTypeLabels[issue.type] || issue.type}
                                        </span>
                                    </div>
                                </div>

                                <p className="text-gray-800 mb-2">{issue.description}</p>

                                {issue.location && (
                                    <p className="text-sm text-gray-600 mb-2">
                                        <span className="font-medium">Location:</span> "{issue.location}"
                                    </p>
                                )}

                                {issue.suggestion && (
                                    <div className="mt-3 bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
                                        <p className="text-sm font-medium text-blue-900 mb-1">💡 Suggestion:</p>
                                        <p className="text-sm text-blue-800">{issue.suggestion}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}