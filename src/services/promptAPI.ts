import { Issue, IssueType } from '../types';

declare global {
    interface Window {
        ai?: {
            languageModel?: {
                capabilities(): Promise<{
                    available: string;
                }>;
                create(options?: any): Promise<any>;
            };
        };
    }
}

export class PromptAPIService {
    private session: any = null;

    async initialize(): Promise<boolean> {
        try {
            if (!window.ai?.languageModel) {
                console.error('Prompt API not available');
                return false;
            }

            const capabilities = await window.ai.languageModel.capabilities();

            if (capabilities.available === 'no') {
                console.error('Language model not available');
                return false;
            }

            // Create a session
            this.session = await window.ai.languageModel.create({
                systemPrompt: `You are an expert at analyzing instructions and identifying clarity issues. 
        Your goal is to help improve communication by finding vague language, missing steps, 
        ambiguous references, unclear deadlines, and assumed knowledge.`
            });

            return true;
        } catch (error) {
            console.error('Failed to initialize Prompt API:', error);
            return false;
        }
    }

    async analyzeInstructions(text: string): Promise<{
        score: number;
        issues: Issue[];
    }> {
        if (!this.session) {
            throw new Error('Prompt API not initialized');
        }

        try {
            const prompt = `Analyze the following instructions for clarity issues. 
      Identify problems such as:
      - Missing steps or information
      - Vague or ambiguous language
      - Unclear deadlines or timelines
      - Ambiguous pronouns or references
      - Assumed knowledge that might not be shared
      - Unclear responsibilities
      
      Instructions to analyze:
      "${text}"
      
      Respond in JSON format with this structure:
      {
        "clarityScore": <number 0-100>,
        "issues": [
          {
            "type": "<issue_type>",
            "severity": "<high|medium|low>",
            "description": "<what's wrong>",
            "location": "<which part of text>",
            "suggestion": "<how to fix>"
          }
        ]
      }
      
      Issue types: missing_steps, vague_language, ambiguous_reference, unclear_deadline, assumed_knowledge, missing_context, unclear_responsibility`;

            const response = await this.session.prompt(prompt);

            // Parse the JSON response
            const result = this.parseAIResponse(response);

            return result;
        } catch (error) {
            console.error('Analysis failed:', error);
            throw error;
        }
    }

    private parseAIResponse(response: string): { score: number; issues: Issue[] } {
        try {
            // Try to extract JSON from the response
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const parsed = JSON.parse(jsonMatch[0]);

                // Add IDs to issues
                const issues = (parsed.issues || []).map((issue: any, index: number) => ({
                    id: `issue-${Date.now()}-${index}`,
                    ...issue
                }));

                return {
                    score: parsed.clarityScore || 50,
                    issues
                };
            }
        } catch (error) {
            console.error('Failed to parse AI response:', error);
        }

        // Fallback if parsing fails
        return {
            score: 50,
            issues: []
        };
    }

    async destroy() {
        if (this.session) {
            await this.session.destroy();
            this.session = null;
        }
    }
}

export const promptAPIService = new PromptAPIService();