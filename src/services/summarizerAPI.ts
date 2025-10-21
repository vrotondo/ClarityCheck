import { ActionItem } from '../types';

declare global {
    interface Window {
        ai?: {
            summarizer?: {
                capabilities(): Promise<{
                    available: string;
                }>;
                create(options?: any): Promise<any>;
            };
        };
    }
}

export class SummarizerAPIService {
    private summarizer: any = null;

    async initialize(): Promise<boolean> {
        try {
            if (!window.ai?.summarizer) {
                console.error('Summarizer API not available');
                return false;
            }

            const capabilities = await window.ai.summarizer.capabilities();

            if (capabilities.available === 'no') {
                console.error('Summarizer not available');
                return false;
            }

            this.summarizer = await window.ai.summarizer.create({
                type: 'key-points',
                format: 'plain-text',
                length: 'medium'
            });

            return true;
        } catch (error) {
            console.error('Failed to initialize Summarizer API:', error);
            return false;
        }
    }

    async extractActionItems(text: string): Promise<ActionItem[]> {
        if (!this.summarizer) {
            throw new Error('Summarizer API not initialized');
        }

        try {
            const summary = await this.summarizer.summarize(text, {
                context: 'Extract concrete action items and tasks from these instructions. Focus on what needs to be done.'
            });

            // Parse the summary into action items
            const actionItems = this.parseActionItems(summary);

            return actionItems;
        } catch (error) {
            console.error('Summarization failed:', error);
            throw error;
        }
    }

    private parseActionItems(summary: string): ActionItem[] {
        // Split by newlines and filter out empty lines
        const lines = summary
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);

        const actionItems: ActionItem[] = [];

        lines.forEach((line, index) => {
            // Remove bullet points, numbers, and dashes
            const cleanedLine = line.replace(/^[-•*\d.)]+\s*/, '').trim();

            if (cleanedLine.length > 0) {
                // Determine priority based on keywords
                let priority: 'high' | 'medium' | 'low' = 'medium';

                const highPriorityKeywords = ['urgent', 'immediately', 'asap', 'critical', 'must'];
                const lowPriorityKeywords = ['eventually', 'when possible', 'optional', 'consider'];

                const lowerLine = cleanedLine.toLowerCase();

                if (highPriorityKeywords.some(keyword => lowerLine.includes(keyword))) {
                    priority = 'high';
                } else if (lowPriorityKeywords.some(keyword => lowerLine.includes(keyword))) {
                    priority = 'low';
                }

                actionItems.push({
                    id: `action-${Date.now()}-${index}`,
                    text: cleanedLine,
                    priority,
                    completed: false
                });
            }
        });

        return actionItems;
    }

    async destroy() {
        if (this.summarizer) {
            await this.summarizer.destroy();
            this.summarizer = null;
        }
    }
}

export const summarizerAPIService = new SummarizerAPIService();