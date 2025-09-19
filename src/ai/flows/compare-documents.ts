'use server';
/**
 * @fileOverview A contract comparison AI agent for cross-checking documents.
 *
 * - compareDocuments - A function that compares two legal documents for conflicts.
 * - CompareDocumentsInput - The input type for the compareDocuments function.
 * - CompareDocumentsOutput - The return type for the compareDocuments function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const CompareDocumentsInputSchema = z.object({
  docId1: z.string().describe('The identifier for the first document.'),
  docText1: z.string().describe('The text content of the first contract (Contract A).'),
  docId2: z.string().describe('The identifier for the second document.'),
  docText2: z.string().describe('The text content of the second contract (Contract B).'),
});
export type CompareDocumentsInput = z.infer<typeof CompareDocumentsInputSchema>;

const CompareDocumentsOutputSchema = z.array(
  z.object({
    docId1: z.string().describe('The identifier of the first document.'),
    docId2: z.string().describe('The identifier of the second document.'),
    conflict: z.string().describe('A description of the conflicting or inconsistent clauses found between the two documents (e.g., "Different governing law clauses (India vs. Singapore)").'),
    recommendation: z.string().describe('The suggested resolution to standardize the conflicting clauses (e.g., "Standardize governing law across contracts.").'),
  })
);
export type CompareDocumentsOutput = z.infer<typeof CompareDocumentsOutputSchema>;

export async function compareDocuments(input: CompareDocumentsInput): Promise<CompareDocumentsOutput> {
  return compareDocumentsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'compareDocumentsPrompt',
  input: {schema: CompareDocumentsInputSchema},
  output: {schema: CompareDocumentsOutputSchema},
  prompt: `[ROLE]
You are a legal AI assistant specializing in checking for consistency across multiple contracts for the same user.

[TASK]
Your goal is to compare two documents (e.g., an Employment Agreement vs. an NDA) and flag any contradictions or inconsistencies between them.

[INSTRUCTIONS]
1.  Carefully read both contract texts provided.
2.  Compare clauses across the documents, specifically looking for conflicting terms. Pay close attention to:
    - Governing law and jurisdiction.
    - IP (Intellectual Property) ownership terms.
    - Confidentiality obligations.
    - Non-compete clauses and their scopes.
    - Termination conditions.
3.  For each conflict you find, create an object that clearly describes the contradiction and suggests a resolution.
4.  If there are no conflicts, return an empty array.

[INPUT]
Document 1 ID: "{docId1}"
Document 1 Text: "{docText1}"

Document 2 ID: "{docId2}"
Document 2 Text: "{docText2}"


[OUTPUT FORMAT] (JSON Array)
Respond with a JSON array of objects that matches the output schema.
`,
});

const compareDocumentsFlow = ai.defineFlow(
  {
    name: 'compareDocumentsFlow',
    inputSchema: CompareDocumentsInputSchema,
    outputSchema: CompareDocumentsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
