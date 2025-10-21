declare global {
    interface Window {
        ai?: {
            rewriter?: {
                capabilities(): Promise<{
                    available: string;
                }>;
                create(options?: any): Promise<any>;
            };
        };
    }
}

export class RewriterAPIService {
    private rewriter: any = null;

    async initialize(): Promise<boolean> {
        try {
            if (!window.ai?.rewriter) {
                console.error('Rewriter API not available');
                return false;
            }

            const capabilities = await window.ai.rewriter.capabilities();

            if (capabilities.available === 'no') {
                console.error('Rewriter not available');
                return false;
            }

            this.rewriter = await window.ai.rewriter.create({
                sharedContext: 'Rewrite to be clearer, more specific, and more actionable. Add missing steps and clarify vague language.'
            });

            return true;
        } catch (error) {
            console.error('Failed to initialize Rewriter API:', error);
            return false;
        }
    }

    async rewriteForClarity(text: string): Promise<string> {
        if (!this.rewriter) {
            throw new Error('Rewriter API not initialized');
        }

        try {
            const improved = await this.rewriter.rewrite(text, {
                context: 'Make this instruction clearer by being more specific, adding missing steps, clarifying ambiguous references, and specifying timelines.'
            });

            return improved || text;
        } catch (error) {
            console.error('Rewrite failed:', error);
            throw error;
        }
    }

    async destroy() {
        if (this.rewriter) {
            await this.rewriter.destroy();
            this.rewriter = null;
        }
    }
}

export const rewriterAPIService = new RewriterAPIService();