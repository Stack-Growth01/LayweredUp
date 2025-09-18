'use server';
/**
 * @fileOverview Explains a legal clause in plain language.
 *
 * - explainLegalClause - A function that explains a legal clause in plain language.
 * - ExplainLegalClauseInput - The input type for the explainLegalClause function.
 * - ExplainLegalClauseOutput - The return type for the explainLegalClause function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const ExplainLegalClauseInputSchema = z.object({
  clause: z
    .string()
    .describe('The legal clause to explain.'),
});
export type ExplainLegalClauseInput = z.infer<typeof ExplainLegalClauseInputSchema>;

const ExplainLegalClauseOutputSchema = z.object({
  original_clause: z.string().describe("The original clause text."),
  eli5_summary: z.string().describe("A very simple explanation of the clause, as if for a 5-year-old."),
  eli15_summary: z.string().describe("A more detailed, but still jargon-free, explanation of the clause, as if for a 15-year-old."),
  disclaimer: z.string().describe("A standard disclaimer that this is not legal advice."),
});
export type ExplainLegalClauseOutput = z.infer<typeof ExplainLegalClauseOutputSchema>;

export async function explainLegalClause(input: ExplainLegalClauseInput): Promise<ExplainLegalClauseOutput> {
  return explainLegalClauseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainLegalClausePrompt',
  input: {schema: ExplainLegalClauseInputSchema},
  output: {schema: ExplainLegalClauseOutputSchema},
  prompt: `You are a legal explainer assistant. You DO NOT provide legal advice. You only simplify text while keeping accuracy.

[INSTRUCTIONS]
1. Explain the clause at two levels:
- **ELI5** → very simple, grade 8, like explaining to a teenager.
- **ELI15** → moderately detailed, grade 10, but still jargon-free.
2. Avoid adding extra meaning not present in the text.
3. Keep tone neutral, supportive, and clear.
4. Do not say "I am not a lawyer" repeatedly — instead, add a short disclaimer once.

[INPUT]
Clause: "{{clause}}"

[OUTPUT FORMAT] (JSON)
Respond with a JSON object that matches the output schema.
`,
});

const explainLegalClauseFlow = ai.defineFlow(
  {
    name: 'explainLegalClauseFlow',
    inputSchema: ExplainLegalClauseInputSchema,
    outputSchema: ExplainLegalClauseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
