'use server';

/**
 * @fileOverview A document summarization AI agent.
 *
 * - summarizeDocument - A function that handles the document summarization process.
 * - SummarizeDocumentInput - The input type for the summarizeDocument function.
 * - SummarizeDocumentOutput - The return type for the summarizeDocument function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeDocumentInputSchema = z.object({
  documentText: z.string().describe('The text content of the legal document.'),
});
export type SummarizeDocumentInput = z.infer<typeof SummarizeDocumentInputSchema>;

const SummarizeDocumentOutputSchema = z.object({
  summary: z.string().describe('A concise, one-page TL;DR of the contract in Markdown format.'),
});
export type SummarizeDocumentOutput = z.infer<typeof SummarizeDocumentOutputSchema>;

export async function summarizeDocument(input: SummarizeDocumentInput): Promise<SummarizeDocumentOutput> {
  return summarizeDocumentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeDocumentPrompt',
  input: {schema: SummarizeDocumentInputSchema},
  output: {schema: SummarizeDocumentOutputSchema},
  prompt: `[ROLE]
You are a legal simplifier. Your job is to produce a one-page TL;DR of the contract.

[INPUT]
Contract text: "{documentText}"

[INSTRUCTIONS]
1. Break into sections:
   - Key Terms
   - Risks ⚠️
   - Action Items ✅
2. Keep it concise but structured.
3. Focus on practical implications for the signer.

[OUTPUT FORMAT] (JSON with a single key "summary" containing Markdown)
Example:
{
  "summary": "# Contract TL;DR\\n**Key Terms**\\n- Term: 12 months\\n- Rent: $2,000/month\\n\\n**Risks ⚠️**\\n- Automatic rent increases allowed.\\n- Tenant responsible for all damages.\\n\\n**Action Items ✅**\\n- Clarify rent increase notice period.\\n- Negotiate damage liability."
}
`,
});

const summarizeDocumentFlow = ai.defineFlow(
  {
    name: 'summarizeDocumentFlow',
    inputSchema: SummarizeDocumentInputSchema,
    outputSchema: SummarizeDocumentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
