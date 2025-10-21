import { useState, useCallback } from 'react';
import { AnalysisResult } from '../types';
import { promptAPIService } from '../services/promptAPI';
import { rewriterAPIService } from '../services/rewriterAPI';
import { summarizerAPIService } from '../services/summarizerAPI';
import { writerAPIService } from '../services/writerAPI';

export function useAIAnalysis() {
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

        try {
            const promptInit = await promptAPIService.initialize();
            const rewriterInit = await rewriterAPIService.initialize();
            const summarizerInit = await summarizerAPIService.initialize();
            const writerInit = await writerAPIService.initialize();

            // We need at least Prompt API to work
            if (!promptInit) {
                throw new Error('Failed to initialize Prompt API');
            }

            setIsInitialized(true);
            return true;
        } catch (error) {
            console.error('Failed to initialize AI APIs:', error);
            setResult(prev => ({
                ...prev,
                error: 'Failed to initialize AI services. Please check your Chrome AI setup.'
            }));
            return false;
        }
    }, [isInitialized]);

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

        // Initialize if not already done
        const initialized = await initializeAPIs();
        if (!initialized) return;

        setResult(prev => ({
            ...prev,
            isAnalyzing: true,
            error: undefined
        }));

        try {
            // Run all analyses in parallel for better performance
            const [analysisResult, improvedText, actionItems] = await Promise.allSettled([
                promptAPIService.analyzeInstructions(text),
                rewriterAPIService.rewriteForClarity(text),
                summarizerAPIService.extractActionItems(text)
            ]);

            // Extract results
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
        } catch (error) {
            console.error('Analysis failed:', error);
            setResult(prev => ({
                ...prev,
                isAnalyzing: false,
                error: 'Analysis failed. Please try again.'
            }));
        }
    }, [initializeAPIs]);

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