import { Issue, ActionItem } from '../types';

// Simulates AI processing delay
const simulateDelay = (ms: number = 1000) =>
    new Promise(resolve => setTimeout(resolve, ms));

// Mock analysis based on text patterns
export class MockAIService {
    async analyzeInstructions(text: string): Promise<{
        score: number;
        issues: Issue[];
    }> {
        await simulateDelay(1500);

        const issues: Issue[] = [];
        let score = 100;

        const lowerText = text.toLowerCase();

        // Check for missing deadlines
        if (!lowerText.match(/by|before|until|deadline|due|eod|end of day|\d+\/\d+/)) {
            issues.push({
                id: `issue-${Date.now()}-1`,
                type: 'unclear_deadline',
                severity: 'high',
                description: 'No clear deadline or timeline is specified',
                location: 'Throughout the instruction',
                suggestion: 'Add a specific deadline like "by Friday 5pm" or "before end of day"'
            });
            score -= 15;
        }

        // Check for vague language
        const vagueWords = ['asap', 'soon', 'later', 'eventually', 'maybe', 'probably'];
        vagueWords.forEach(word => {
            if (lowerText.includes(word)) {
                issues.push({
                    id: `issue-${Date.now()}-${word}`,
                    type: 'vague_language',
                    severity: 'medium',
                    description: `Vague term "${word}" found - this could cause confusion`,
                    location: `"${word}" in the text`,
                    suggestion: `Replace "${word}" with a specific timeline or action`
                });
                score -= 8;
            }
        });

        // Check for unclear pronouns
        if (lowerText.match(/\b(it|this|that|they|them)\b/g)) {
            const matches = text.match(/\b(it|this|that|they|them)\b/gi);
            if (matches && matches.length > 2) {
                issues.push({
                    id: `issue-${Date.now()}-pronouns`,
                    type: 'ambiguous_reference',
                    severity: 'medium',
                    description: 'Multiple ambiguous pronouns could cause confusion',
                    location: `Words like "${matches.slice(0, 3).join('", "')}"`,
                    suggestion: 'Replace pronouns with specific nouns (e.g., "the dashboard" instead of "it")'
                });
                score -= 10;
            }
        }

        // Check for missing steps
        if (text.split('.').length < 3 && text.length > 50) {
            issues.push({
                id: `issue-${Date.now()}-steps`,
                type: 'missing_steps',
                severity: 'high',
                description: 'Instructions appear to be missing detailed steps',
                location: 'Overall structure',
                suggestion: 'Break down the task into numbered steps with clear actions'
            });
            score -= 12;
        }

        // Check for unclear responsibility
        if (!lowerText.match(/you should|please|you need to|your task|assigned to/)) {
            issues.push({
                id: `issue-${Date.now()}-responsibility`,
                type: 'unclear_responsibility',
                severity: 'medium',
                description: 'It\'s unclear who is responsible for this task',
                location: 'Throughout the instruction',
                suggestion: 'Clearly state who should complete this task'
            });
            score -= 8;
        }

        // Check for assumed knowledge
        const technicalTerms = ['api', 'endpoint', 'database', 'server', 'deploy', 'config'];
        const foundTerms = technicalTerms.filter(term => lowerText.includes(term));
        if (foundTerms.length > 0 && !lowerText.includes('see documentation')) {
            issues.push({
                id: `issue-${Date.now()}-knowledge`,
                type: 'assumed_knowledge',
                severity: 'low',
                description: `Technical terms used without context: ${foundTerms.join(', ')}`,
                location: 'Technical terminology',
                suggestion: 'Provide links to documentation or brief explanations of technical terms'
            });
            score -= 5;
        }

        // Ensure score doesn't go below 0
        score = Math.max(0, score);

        return { score, issues };
    }

    async rewriteForClarity(text: string): Promise<string> {
        await simulateDelay(2000);

        // Generate an improved version
        const hasDeadline = text.toLowerCase().match(/by|before|until|deadline|due|eod/);
        const deadline = hasDeadline ? '' : ' This should be completed by end of day today.';

        const improved = `Task: ${text.trim()}

Steps to complete:
1. Review the current status and identify what needs to be updated
2. Make the necessary changes ensuring accuracy of all information
3. Verify all numbers and data points are correct
4. Coordinate with team members if you have any questions or need clarification
5. Complete a final review before submission${deadline}

Please confirm once completed.`;

        return improved;
    }

    async extractActionItems(text: string): Promise<ActionItem[]> {
        await simulateDelay(1000);

        const actionItems: ActionItem[] = [];

        // Extract sentences that sound like actions
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);

        sentences.forEach((sentence, index) => {
            const lowerSentence = sentence.toLowerCase();

            // Look for action verbs
            const actionVerbs = ['update', 'check', 'make sure', 'verify', 'review', 'contact', 'send', 'complete', 'finish'];
            const hasAction = actionVerbs.some(verb => lowerSentence.includes(verb));

            if (hasAction || index === 0) {
                // Determine priority
                let priority: 'high' | 'medium' | 'low' = 'medium';
                if (lowerSentence.includes('urgent') || lowerSentence.includes('asap')) {
                    priority = 'high';
                } else if (lowerSentence.includes('if possible') || lowerSentence.includes('eventually')) {
                    priority = 'low';
                }

                actionItems.push({
                    id: `action-${Date.now()}-${index}`,
                    text: sentence.trim(),
                    priority,
                    completed: false
                });
            }
        });

        // If no actions found, create generic ones
        if (actionItems.length === 0) {
            actionItems.push({
                id: `action-${Date.now()}-0`,
                text: 'Review and understand the instructions',
                priority: 'high',
                completed: false
            });
            actionItems.push({
                id: `action-${Date.now()}-1`,
                text: 'Complete the requested task',
                priority: 'high',
                completed: false
            });
            actionItems.push({
                id: `action-${Date.now()}-2`,
                text: 'Follow up with relevant team members',
                priority: 'medium',
                completed: false
            });
        }

        return actionItems;
    }
}

export const mockAIService = new MockAIService();