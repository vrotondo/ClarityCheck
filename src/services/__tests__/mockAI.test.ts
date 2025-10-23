import { describe, it, expect } from 'vitest';
import { MockAIService } from '../mockAI';

describe('MockAIService', () => {
    const mockAI = new MockAIService();

    describe('analyzeInstructions', () => {
        it('should return a score between 0 and 100', async () => {
            const result = await mockAI.analyzeInstructions('Please update the dashboard by EOD.');
            expect(result.score).toBeGreaterThanOrEqual(0);
            expect(result.score).toBeLessThanOrEqual(100);
        });

        it('should detect missing deadline', async () => {
            const result = await mockAI.analyzeInstructions('Complete the task soon.');
            const hasDeadlineIssue = result.issues.some(
                issue => issue.type === 'unclear_deadline'
            );
            expect(hasDeadlineIssue).toBe(true);
        });

        it('should detect vague language', async () => {
            const result = await mockAI.analyzeInstructions('Do this ASAP please.');
            const hasVagueIssue = result.issues.some(
                issue => issue.type === 'vague_language' && issue.description.includes('asap')
            );
            expect(hasVagueIssue).toBe(true);
        });

        it('should detect ambiguous pronouns', async () => {
            const result = await mockAI.analyzeInstructions('Check it and send them the report when it is done.');
            const hasAmbiguousIssue = result.issues.some(
                issue => issue.type === 'ambiguous_reference'
            );
            expect(hasAmbiguousIssue).toBe(true);
        });

        it('should detect missing steps', async () => {
            const result = await mockAI.analyzeInstructions('Deploy the application to production.');
            const hasMissingSteps = result.issues.some(
                issue => issue.type === 'missing_steps'
            );
            expect(hasMissingSteps).toBe(true);
        });

        it('should detect unclear responsibility', async () => {
            const result = await mockAI.analyzeInstructions('The dashboard needs to be updated.');
            const hasResponsibilityIssue = result.issues.some(
                issue => issue.type === 'unclear_responsibility'
            );
            expect(hasResponsibilityIssue).toBe(true);
        });

        it('should detect assumed knowledge', async () => {
            const result = await mockAI.analyzeInstructions('Deploy the API to the server and configure the endpoint.');
            const hasKnowledgeIssue = result.issues.some(
                issue => issue.type === 'assumed_knowledge'
            );
            expect(hasKnowledgeIssue).toBe(true);
        });

        it('should give high score to clear instructions', async () => {
            const clearInstruction = `Please complete the Q4 financial report by Friday, December 20th at 5:00 PM. 
      You should review all revenue figures, verify expense allocations, and submit the final report to finance@company.com.`;
            const result = await mockAI.analyzeInstructions(clearInstruction);
            expect(result.score).toBeGreaterThan(70);
        });

        it('should return issues with proper structure', async () => {
            const result = await mockAI.analyzeInstructions('Update it soon.');
            result.issues.forEach(issue => {
                expect(issue).toHaveProperty('id');
                expect(issue).toHaveProperty('type');
                expect(issue).toHaveProperty('severity');
                expect(issue).toHaveProperty('description');
                expect(issue).toHaveProperty('suggestion');
                expect(['high', 'medium', 'low']).toContain(issue.severity);
            });
        });
    });

    describe('rewriteForClarity', () => {
        it('should return improved text', async () => {
            const original = 'Update the dashboard by EOD.';
            const improved = await mockAI.rewriteForClarity(original);
            expect(improved).toBeTruthy();
            expect(improved.length).toBeGreaterThan(original.length);
            expect(improved).toContain('Steps to complete');
        });

        it('should add deadline if missing', async () => {
            const original = 'Complete the report.';
            const improved = await mockAI.rewriteForClarity(original);
            expect(improved.toLowerCase()).toMatch(/by|deadline|end of day/);
        });

        it('should include numbered steps', async () => {
            const original = 'Update the system.';
            const improved = await mockAI.rewriteForClarity(original);
            expect(improved).toMatch(/\d\./); // Contains numbered list
        });
    });

    describe('extractActionItems', () => {
        it('should extract action items from text', async () => {
            const text = 'Update the report. Check the numbers. Send it to the team.';
            const items = await mockAI.extractActionItems(text);
            expect(items.length).toBeGreaterThan(0);
        });

        it('should return items with proper structure', async () => {
            const text = 'Complete the urgent task immediately.';
            const items = await mockAI.extractActionItems(text);
            items.forEach(item => {
                expect(item).toHaveProperty('id');
                expect(item).toHaveProperty('text');
                expect(item).toHaveProperty('priority');
                expect(item).toHaveProperty('completed');
                expect(['high', 'medium', 'low']).toContain(item.priority);
                expect(item.completed).toBe(false);
            });
        });

        it('should detect high priority keywords', async () => {
            const text = 'Complete this urgent task immediately.';
            const items = await mockAI.extractActionItems(text);
            const hasHighPriority = items.some(item => item.priority === 'high');
            expect(hasHighPriority).toBe(true);
        });

        it('should detect low priority keywords', async () => {
            const text = 'Eventually, consider updating the documentation if possible.';
            const items = await mockAI.extractActionItems(text);
            const hasLowPriority = items.some(item => item.priority === 'low');
            expect(hasLowPriority).toBe(true);
        });

        it('should return default items for unclear text', async () => {
            const text = 'xyz abc def';
            const items = await mockAI.extractActionItems(text);
            expect(items.length).toBeGreaterThan(0);
            expect(items[0].text).toContain('Review');
        });
    });
});