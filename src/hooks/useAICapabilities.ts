import { useState, useEffect } from 'react';
import { AICapabilities } from '../types';

export function useAICapabilities() {
    const [capabilities, setCapabilities] = useState<AICapabilities>({
        promptAPI: false,
        rewriterAPI: false,
        summarizerAPI: false,
        writerAPI: false
    });
    const [isChecking, setIsChecking] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [useMockMode, setUseMockMode] = useState(false);

    useEffect(() => {
        checkCapabilities();
    }, []);

    async function checkCapabilities() {
        setIsChecking(true);
        setError(null);

        try {
            const results: AICapabilities = {
                promptAPI: false,
                rewriterAPI: false,
                summarizerAPI: false,
                writerAPI: false
            };

            // Check if window.ai exists at all
            if (!window.ai) {
                console.warn('window.ai is not available - using mock mode');
                setUseMockMode(true);
                setCapabilities(results);
                setIsChecking(false);
                return;
            }

            // Check Prompt API (Language Model)
            if (window.ai?.languageModel) {
                try {
                    const caps = await window.ai.languageModel.capabilities();
                    results.promptAPI = caps.available !== 'no';
                } catch (e) {
                    console.warn('Prompt API check failed:', e);
                }
            }

            // Check Rewriter API
            if (window.ai?.rewriter) {
                try {
                    const caps = await window.ai.rewriter.capabilities();
                    results.rewriterAPI = caps.available !== 'no';
                } catch (e) {
                    console.warn('Rewriter API check failed:', e);
                }
            }

            // Check Summarizer API
            if (window.ai?.summarizer) {
                try {
                    const caps = await window.ai.summarizer.capabilities();
                    results.summarizerAPI = caps.available !== 'no';
                } catch (e) {
                    console.warn('Summarizer API check failed:', e);
                }
            }

            // Check Writer API
            if (window.ai?.writer) {
                try {
                    const caps = await window.ai.writer.capabilities();
                    results.writerAPI = caps.available !== 'no';
                } catch (e) {
                    console.warn('Writer API check failed:', e);
                }
            }

            setCapabilities(results);

            // If no APIs are available, use mock mode
            if (!results.promptAPI && !results.rewriterAPI && !results.summarizerAPI && !results.writerAPI) {
                console.warn('No Chrome AI APIs available - using mock mode');
                setUseMockMode(true);
            }
        } catch (err) {
            console.warn('Capability check error - using mock mode:', err);
            setUseMockMode(true);
        } finally {
            setIsChecking(false);
        }
    }

    return {
        capabilities,
        isChecking,
        error,
        hasMinimumCapabilities: capabilities.promptAPI || useMockMode,
        useMockMode
    };
}