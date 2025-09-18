'use server';
/**
 * @fileOverview Answers user questions based on the provided contract text.
 *
 * - answerQuestionFromDocument - A function that answers a user's question based on the document.
 * - AnswerQuestionFromDocumentInput - The input type for the answerQuestionFromDocument function.
 * - AnswerQuestionFromDocumentOutput - The return type for the answerQuestionFromDocument function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const AnswerQuestionFromDocumentInputSchema = z.object({
  user_question: z.string().describe("The user's question about the contract."),
  contract_text: z.string().describe('The full text of the contract.'),
});
export type AnswerQuestionFromDocumentInput = z.infer<typeof AnswerQuestionFromDocumentInputSchema>;

const AnswerQuestionFromDocumentOutputSchema = z.object({
  question: z.string().describe("The original user question."),
  answer: z.string().describe("The answer to the user's question, based only on the contract text."),
  supporting_clause: z.string().describe("The specific clause from the contract that supports the answer. If not found, this will be an empty string."),
  certainty: z.enum(["high", "low"]).describe("The model's confidence in the answer. 'low' if the information is not found or ambiguous.")
});
export type AnswerQuestionFromDocumentOutput = z.infer<typeof AnswerQuestionFromDocumentOutputSchema>;

export async function answerQuestionFromDocument(input: AnswerQuestionFromDocumentInput): Promise<AnswerQuestionFromDocumentOutput> {
  return answerQuestionFromDocumentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerQuestionFromDocumentPrompt',
  input: {schema: AnswerQuestionFromDocumentInputSchema},
  output: {schema: AnswerQuestionFromDocumentOutputSchema},
  prompt: `[ROLE]
You are a legal explainer who answers user questions based ONLY on provided contract text.

[INPUT]
User question: "{user_question}"
Contract text: "{contract_text}"

[INSTRUCTIONS]
1. Only answer using the contract.
2. Quote the supporting clause when possible.
3. If not found, say: "This clause is unclear — please consult a lawyer."
4. Avoid assumptions or invented answers.
5. Set certainty to 'low' if the answer is not explicitly found in the text.

[OUTPUT FORMAT] (JSON)
Respond with a JSON object that matches the output schema.
`,
});

const answerQuestionFromDocumentFlow = ai.defineFlow(
  {
    name: 'answerQuestionFromDocumentFlow',
    inputSchema: AnswerQuestionFromDocumentInputSchema,
    outputSchema: AnswerQuestionFromDocumentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
