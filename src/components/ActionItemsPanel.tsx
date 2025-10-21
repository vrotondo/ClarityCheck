import React, { useState } from 'react';
import { ActionItem } from '../types';
import { getPriorityColor } from '../utils/scoringLogic';

interface ActionItemsPanelProps {
    actionItems: ActionItem[];
}

export function ActionItemsPanel({ actionItems }: ActionItemsPanelProps) {
    const [items, setItems] = useState<ActionItem[]>(actionItems);

    const toggleComplete = (id: string) => {
        setItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, completed: !item.completed } : item
            )
        );
    };

    const handleCopyAll = async () => {
        const text = items
            .map((item, index) => `${index + 1}. ${item.text}`)
            .join('\n');

        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    if (actionItems.length === 0) {
        return null;
    }

    const completedCount = items.filter(item => item.completed).length;

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Action Items</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        {completedCount} of {items.length} completed
                    </p>
                </div>
                <button
                    onClick={handleCopyAll}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Copy All</span>
                </button>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(completedCount / items.length) * 100}%` }}
                    ></div>
                </div>
            </div>

            {/* Action Items List */}
            <div className="space-y-3">
                {items.map((item, index) => (
                    <div
                        key={item.id}
                        className={`flex items-start space-x-3 p-3 rounded-lg border transition-all ${item.completed
                                ? 'bg-gray-50 border-gray-200'
                                : 'bg-white border-gray-300 hover:border-blue-400'
                            }`}
                    >
                        <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={() => toggleComplete(item.id)}
                            className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        />
                        <div className="flex-1">
                            <div className="flex items-start justify-between">
                                <p
                                    className={`text-gray-800 ${item.completed ? 'line-through text-gray-500' : ''
                                        }`}
                                >
                                    <span className="font-medium text-gray-600 mr-2">
                                        {index + 1}.
                                    </span>
                                    {item.text}
                                </p>
                                <span className={`text-xs font-semibold ml-2 ${getPriorityColor(item.priority)}`}>
                                    {item.priority === 'high' && '🔴'}
                                    {item.priority === 'medium' && '🟡'}
                                    {item.priority === 'low' && '🟢'}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 text-xs text-gray-500 text-center">
                💡 Tip: Use this checklist to track your progress on these tasks
            </div>
        </div>
    );
}