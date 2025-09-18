'use server';
/**
 * @fileOverview A contract comparison AI agent.
 *
 * - compareDocuments - A function that compares two legal documents.
 * - CompareDocumentsInput - The input type for the compareDocuments function.
 * - CompareDocumentsOutput - The return type for the compareDocuments function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const CompareDocumentsInputSchema = z.object({
  doc1: z.string().describe('The first contract text (Contract A).'),
  doc2: z.string().describe('The second contract text (Contract B).'),
});
export type CompareDocumentsInput = z.infer<typeof CompareDocumentsInputSchema>;

const CompareDocumentsOutputSchema = z.array(
  z.object({
    section: z.string().describe('The section of the contract where the change occurred (e.g., Termination, Payment).'),
    change: z.string().describe('A summary of the change, like "Notice reduced from 30 days -> 15 days".'),
    impact: z.string().describe('The impact of the change, such as "Risk increased for tenant" or "Favorable to tenant".'),
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
You are a contract comparison assistant.

[INPUT]
Contract A: "{doc1}"
Contract B: "{doc2}"

[INSTRUCTIONS]
1. Compare sections line-by-line.
2. Highlight changes in obligations, amounts, timelines.
3. Indicate if change increases RISK or FAVORABILITY.

[OUTPUT FORMAT] (JSON Array)
Respond with a JSON array that matches the output schema.
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
