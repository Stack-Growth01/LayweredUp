'use server';
/**
 * @fileOverview A missing contract detector AI agent.
 *
 * - checkMissingContracts - A function that checks for required supporting contracts.
 * - CheckMissingContractsInput - The input type for the checkMissingContracts function.
 * - CheckMissingContractsOutput - The return type for the checkMissingContracts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const CheckMissingContractsInputSchema = z.object({
  mainContractType: z.string().describe('The type of the main contract, e.g., "Employment Agreement".'),
  mainContractContent: z.string().describe('The full text content of the main contract.'),
});
export type CheckMissingContractsInput = z.infer<typeof CheckMissingContractsInputSchema>;

const CheckMissingContractsOutputSchema = z.object({
  mainContract: z.string().describe("The type of the main contract analyzed."),
  recommendedAdditionalContracts: z.array(z.string()).describe("A list of other contracts that are typically associated with the main one."),
  reasoning: z.record(z.string(), z.string()).describe("A dictionary where keys are the recommended contract names and values explain why they are needed."),
});
export type CheckMissingContractsOutput = z.infer<typeof CheckMissingContractsOutputSchema>;

export async function checkMissingContracts(input: CheckMissingContractsInput): Promise<CheckMissingContractsOutput> {
  return checkMissingContractsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'checkMissingContractsPrompt',
  input: {schema: CheckMissingContractsInputSchema},
  output: {schema: CheckMissingContractsOutputSchema},
  prompt: `[ROLE]
You are an AI legal assistant that specializes in identifying required supporting legal documents for a primary contract.

[INSTRUCTIONS]
1. Read the provided contract type and its content.
2. Based on the contract type, identify what other legal agreements are typically associated with it. For example:
   - An "Employment Agreement" might need an "NDA", a "Non-compete Agreement", or an "ESOP Agreement".
   - A "Rental Agreement" might need a "Security Deposit Agreement" or a "Maintenance Agreement".
   - A "Partnership Agreement" could be associated with a "Profit-sharing Agreement" or an "IP Assignment Agreement".
3. Analyze the content of the main contract to see if it mentions or covers aspects of these related agreements.
4. Return a list of recommended additional contracts that are not sufficiently covered or are missing.
5. Provide a clear reason for why each recommended contract is necessary.

[INPUT]
Contract Type: "{{mainContractType}}"
Contract Content: "{{mainContractContent}}"

[OUTPUT FORMAT] (JSON)
Respond with a JSON object that matches the output schema, with keys for "mainContract", "recommendedAdditionalContracts", and "reasoning".
`,
});

const checkMissingContractsFlow = ai.defineFlow(
  {
    name: 'checkMissingContractsFlow',
    inputSchema: CheckMissingContractsInputSchema,
    outputSchema: CheckMissingContractsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
