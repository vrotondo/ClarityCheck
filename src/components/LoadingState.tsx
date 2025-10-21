import React from 'react';

interface LoadingStateProps {
    message?: string;
}

export function LoadingState({ message = 'Analyzing...' }: LoadingStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="text-gray-600 text-sm font-medium">{message}</p>
            <p className="text-gray-400 text-xs">Powered by Chrome Built-in AI</p>
        </div>
    );
}