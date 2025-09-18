'use server';
/**
 * @fileOverview A risk prediction engine for legal and compliance issues.
 *
 * - predictRisk - A function that calculates a risk score and suggests preventive actions.
 * - PredictRiskInput - The input type for the predictRisk function.
 * - PredictRiskOutput - The return type for the predictRisk function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const PredictRiskInputSchema = z.object({
  caseType: z.string().describe('The type of legal case, e.g., "Rental Dispute", "Contract Violation".'),
  region: z.string().describe('The geographical region where the case is, e.g., "Delhi", "California".'),
  userProfile: z.string().describe('A summary of the user\'s situation and history.'),
  pastDisputes: z.array(z.string()).describe('A list of relevant past disputes for the user.'),
  deadlines: z.array(z.string()).describe('A list of upcoming deadlines.'),
});
export type PredictRiskInput = z.infer<typeof PredictRiskInputSchema>;

const PredictRiskOutputSchema = z.object({
  risk_score: z.number().describe('A risk score from 0 to 100.'),
  risk_factors: z.array(z.string()).describe('Factors contributing to the risk score.'),
  preventive_actions: z.array(z.string()).describe('Suggested actions to mitigate the risk.'),
  confidence_level: z.enum(["High", "Medium", "Low"]).describe("The model's confidence in its assessment."),
});
export type PredictRiskOutput = z.infer<typeof PredictRiskOutputSchema>;

export async function predictRisk(input: PredictRiskInput): Promise<PredictRiskOutput> {
  return predictRiskFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictRiskPrompt',
  input: {schema: PredictRiskInputSchema},
  output: {schema: PredictRiskOutputSchema},
  prompt: `[ROLE]
You are an AI risk prediction engine monitoring legal and compliance risks for users.

[INPUT DATA]
Case Type: "{caseType}"
Region: "{region}"
User Profile: "{userProfile}"
Past Disputes: {{#each pastDisputes}}- {{@this}}{{/each}}
Deadlines: {{#each deadlines}}- {{@this}}{{/each}}

[INSTRUCTIONS]
1. Based on the input data, assign a risk score from 0 to 100, where 100 is the highest risk.
2. Explain the score by identifying the key factors contributing to the risk (e.g., location-specific case delays, user’s prior missed deadlines, high penalties in contract).
3. Suggest concrete, preventive actions (e.g., gather missing documents, file before X deadline, seek mediation).
4. Set a confidence level for your assessment.

[OUTPUT FORMAT] (JSON)
Respond with a JSON object that matches the output schema.
`,
});

const predictRiskFlow = ai.defineFlow(
  {
    name: 'predictRiskFlow',
    inputSchema: PredictRiskInputSchema,
    outputSchema: PredictRiskOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
