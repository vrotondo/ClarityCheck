import { Issue, ScoreBreakdown } from '../types';

export function calculateScoreBreakdown(score: number, issues: Issue[]): ScoreBreakdown {
    // Base scoring on different aspects
    const issueCount = issues.length;
    const highSeverityCount = issues.filter(i => i.severity === 'high').length;
    const mediumSeverityCount = issues.filter(i => i.severity === 'medium').length;

    // Calculate component scores
    const clarity = Math.max(0, 100 - (highSeverityCount * 15 + mediumSeverityCount * 8));
    const completeness = Math.max(0, 100 - (issueCount * 10));
    const specificity = Math.max(0, 100 - (highSeverityCount * 12));
    const actionability = Math.max(0, 100 - (issueCount * 8));

    return {
        total: score,
        clarity: Math.round(clarity),
        completeness: Math.round(completeness),
        specificity: Math.round(specificity),
        actionability: Math.round(actionability)
    };
}

export function getScoreColor(score: number): string {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
}

export function getScoreBgColor(score: number): string {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    if (score >= 40) return 'bg-orange-100';
    return 'bg-red-100';
}

export function getScoreLabel(score: number): string {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Good';
    if (score >= 70) return 'Fair';
    if (score >= 60) return 'Needs Improvement';
    if (score >= 40) return 'Poor';
    return 'Very Poor';
}

export function getSeverityColor(severity: 'high' | 'medium' | 'low'): string {
    switch (severity) {
        case 'high':
            return 'text-red-600 bg-red-50';
        case 'medium':
            return 'text-yellow-600 bg-yellow-50';
        case 'low':
            return 'text-blue-600 bg-blue-50';
    }
}

export function getPriorityColor(priority: 'high' | 'medium' | 'low'): string {
    switch (priority) {
        case 'high':
            return 'text-red-600';
        case 'medium':
            return 'text-yellow-600';
        case 'low':
            return 'text-gray-600';
    }
}