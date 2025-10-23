// Global type declarations for Chrome Built-in AI APIs

interface AICapabilitiesResponse {
    available: string;
}

interface AILanguageModel {
    capabilities(): Promise<AICapabilitiesResponse>;
    create(options?: any): Promise<any>;
}

interface AIRewriter {
    capabilities(): Promise<AICapabilitiesResponse>;
    create(options?: any): Promise<any>;
}

interface AISummarizer {
    capabilities(): Promise<AICapabilitiesResponse>;
    create(options?: any): Promise<any>;
}

interface AIWriter {
    capabilities(): Promise<AICapabilitiesResponse>;
    create(options?: any): Promise<any>;
}

interface AI {
    languageModel?: AILanguageModel;
    rewriter?: AIRewriter;
    summarizer?: AISummarizer;
    writer?: AIWriter;
}

declare global {
    interface Window {
        ai?: AI;
    }
}

export { };