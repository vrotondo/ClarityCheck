// Core analysis result types
export interface AnalysisResult {
    clarityScore: number;
    issues: Issue[];
    improvedVersion: string;
    actionItems: ActionItem[];
    isAnalyzing: boolean;
    error?: string;
}

export interface Issue {
    id: string;
    type: IssueType;
    severity: 'high' | 'medium' | 'low';
    description: string;
    location?: string; // Which part of the text
    suggestion?: string;
}

export type IssueType =
    | 'missing_steps'
    | 'vague_language'
    | 'ambiguous_reference'
    | 'unclear_deadline'
    | 'assumed_knowledge'
    | 'missing_context'
    | 'unclear_responsibility';

export interface ActionItem {
    id: string;
    text: string;
    priority: 'high' | 'medium' | 'low';
    completed: boolean;
}

// AI API Capabilities
export interface AICapabilities {
    promptAPI: boolean;
    rewriterAPI: boolean;
    summarizerAPI: boolean;
    writerAPI: boolean;
    languageModel?: any;
    rewriter?: any;
    summarizer?: any;
    writer?: any;
}

// Analysis request
export interface AnalysisRequest {
    text: string;
    options?: {
        focusAreas?: IssueType[];
        detailLevel?: 'basic' | 'detailed' | 'comprehensive';
    };
}

// Scoring breakdown
export interface ScoreBreakdown {
    total: number;
    clarity: number;
    completeness: number;
    specificity: number;
    actionability: number;
}