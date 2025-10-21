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

            // Check if at least Prompt API is available (minimum requirement)
            if (!results.promptAPI) {
                setError('Chrome Built-in AI APIs are not available. Please ensure you are using Chrome Canary with the appropriate flags enabled.');
            }
        } catch (err) {
            setError('Failed to check AI capabilities. Please ensure Chrome Built-in AI is properly configured.');
            console.error('Capability check error:', err);
        } finally {
            setIsChecking(false);
        }
    }

    return {
        capabilities,
        isChecking,
        error,
        hasMinimumCapabilities: capabilities.promptAPI
    };
}