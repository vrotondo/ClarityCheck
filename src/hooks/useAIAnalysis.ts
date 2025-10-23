import { useState, useCallback } from 'react';
import { AnalysisResult } from '../types';
import { promptAPIService } from '../services/promptAPI';
import { rewriterAPIService } from '../services/rewriterAPI';
import { summarizerAPIService } from '../services/summarizerAPI';
import { writerAPIService } from '../services/writerAPI';
import { mockAIService } from '../services/mockAI';

export function useAIAnalysis(useMockMode: boolean = false) {
    const [result, setResult] = useState<AnalysisResult>({
        clarityScore: 0,
        issues: [],
        improvedVersion: '',
        actionItems: [],
        isAnalyzing: false
    });

    const [isInitialized, setIsInitialized] = useState(false);

    const initializeAPIs = useCallback(async () => {
        if (isInitialized) return true;

        // If using mock mode, no initialization needed
        if (useMockMode) {
            setIsInitialized(true);
            return true;
        }

        try {
            const promptInit = await promptAPIService.initialize();
            const rewriterInit = await rewriterAPIService.initialize();
            const summarizerInit = await summarizerAPIService.initialize();
            const writerInit = await writerAPIService.initialize();

            // We need at least Prompt API to work
            if (!promptInit) {
                console.warn('Prompt API initialization failed - falling back to mock mode');
                return false;
            }

            setIsInitialized(true);
            return true;
        } catch (error) {
            console.error('Failed to initialize AI APIs:', error);
            return false;
        }
    }, [isInitialized, useMockMode]);

    const analyzeText = useCallback(async (text: string) => {
        if (!text.trim()) {
            setResult({
                clarityScore: 0,
                issues: [],
                improvedVersion: '',
                actionItems: [],
                isAnalyzing: false,
                error: 'Please enter some text to analyze'
            });
            return;
        }

        setResult(prev => ({
            ...prev,
            isAnalyzing: true,
            error: undefined
        }));

        try {
            // Use mock service if in mock mode OR if real APIs fail to initialize
            if (useMockMode) {
                console.log('Using mock AI service');

                const [analysisResult, improvedText, actionItems] = await Promise.all([
                    mockAIService.analyzeInstructions(text),
                    mockAIService.rewriteForClarity(text),
                    mockAIService.extractActionItems(text)
                ]);

                setResult({
                    clarityScore: analysisResult.score,
                    issues: analysisResult.issues,
                    improvedVersion: improvedText,
                    actionItems: actionItems,
                    isAnalyzing: false
                });
            } else {
                // Try to initialize real APIs
                const initialized = await initializeAPIs();

                if (!initialized) {
                    // Fall back to mock service
                    console.log('Real APIs unavailable, using mock service');

                    const [analysisResult, improvedText, actionItems] = await Promise.all([
                        mockAIService.analyzeInstructions(text),
                        mockAIService.rewriteForClarity(text),
                        mockAIService.extractActionItems(text)
                    ]);

                    setResult({
                        clarityScore: analysisResult.score,
                        issues: analysisResult.issues,
                        improvedVersion: improvedText,
                        actionItems: actionItems,
                        isAnalyzing: false
                    });
                    return;
                }

                // Use real AI APIs
                console.log('Using real Chrome AI APIs');
                const [analysisResult, improvedText, actionItems] = await Promise.allSettled([
                    promptAPIService.analyzeInstructions(text),
                    rewriterAPIService.rewriteForClarity(text),
                    summarizerAPIService.extractActionItems(text)
                ]);

                const analysis = analysisResult.status === 'fulfilled'
                    ? analysisResult.value
                    : { score: 50, issues: [] };

                const improved = improvedText.status === 'fulfilled'
                    ? improvedText.value
                    : text;

                const actions = actionItems.status === 'fulfilled'
                    ? actionItems.value
                    : [];

                setResult({
                    clarityScore: analysis.score,
                    issues: analysis.issues,
                    improvedVersion: improved,
                    actionItems: actions,
                    isAnalyzing: false
                });
            }
        } catch (error) {
            console.error('Analysis failed:', error);

            // Final fallback to mock service
            try {
                const [analysisResult, improvedText, actionItems] = await Promise.all([
                    mockAIService.analyzeInstructions(text),
                    mockAIService.rewriteForClarity(text),
                    mockAIService.extractActionItems(text)
                ]);

                setResult({
                    clarityScore: analysisResult.score,
                    issues: analysisResult.issues,
                    improvedVersion: improvedText,
                    actionItems: actionItems,
                    isAnalyzing: false
                });
            } catch (mockError) {
                setResult(prev => ({
                    ...prev,
                    isAnalyzing: false,
                    error: 'Analysis failed. Please try again.'
                }));
            }
        }
    }, [initializeAPIs, useMockMode]);

    const reset = useCallback(() => {
        setResult({
            clarityScore: 0,
            issues: [],
            improvedVersion: '',
            actionItems: [],
            isAnalyzing: false
        });
    }, []);

    return {
        result,
        analyzeText,
        reset,
        isInitialized
    };
}