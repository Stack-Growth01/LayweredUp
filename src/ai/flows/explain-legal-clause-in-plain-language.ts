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
  explanation: z.string().describe('The plain language explanation of the legal clause.'),
});
export type ExplainLegalClauseOutput = z.infer<typeof ExplainLegalClauseOutputSchema>;

export async function explainLegalClause(input: ExplainLegalClauseInput): Promise<ExplainLegalClauseOutput> {
  return explainLegalClauseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainLegalClausePrompt',
  input: {schema: ExplainLegalClauseInputSchema},
  output: {schema: ExplainLegalClauseOutputSchema},
  prompt: `You are a lawyer specializing in plain language explanations of legal clauses.

  Explain the following legal clause in plain language:

  {{clause}}`,
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
