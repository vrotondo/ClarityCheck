declare global {
    interface Window {
        ai?: {
            writer?: {
                capabilities(): Promise<{
                    available: string;
                }>;
                create(options?: any): Promise<any>;
            };
        };
    }
}

export class WriterAPIService {
    private writer: any = null;

    async initialize(): Promise<boolean> {
        try {
            if (!window.ai?.writer) {
                console.error('Writer API not available');
                return false;
            }

            const capabilities = await window.ai.writer.capabilities();

            if (capabilities.available === 'no') {
                console.error('Writer not available');
                return false;
            }

            this.writer = await window.ai.writer.create({
                sharedContext: 'You are helping to fill in missing information and context in instructions to make them clearer and more complete.'
            });

            return true;
        } catch (error) {
            console.error('Failed to initialize Writer API:', error);
            return false;
        }
    }

    async fillMissingSteps(originalText: string, missingInfo: string[]): Promise<string> {
        if (!this.writer) {
            throw new Error('Writer API not initialized');
        }

        try {
            const prompt = `Original instructions: "${originalText}"
      
      Missing information identified: ${missingInfo.join(', ')}
      
      Please add the missing steps or information to make these instructions more complete.`;

            const enhanced = await this.writer.write(prompt);

            return enhanced || originalText;
        } catch (error) {
            console.error('Writing failed:', error);
            throw error;
        }
    }

    async destroy() {
        if (this.writer) {
            await this.writer.destroy();
            this.writer = null;
        }
    }
}

export const writerAPIService = new WriterAPIService();