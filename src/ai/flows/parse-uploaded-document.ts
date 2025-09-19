'use server';
/**
 * @fileOverview A document parsing AI agent for legal documents.
 *
 * - parseUploadedDocument - A function that handles the document parsing process.
 * - ParseUploadedDocumentInput - The input type for the parseUploadedDocument function.
 * - ParseUploadedDocumentOutput - The return type for the parseUploadedDocument function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const ParseUploadedDocumentInputSchema = z.object({
  documentText: z.string().describe('The full text content of the legal document to be parsed.'),
});
export type ParseUploadedDocumentInput = z.infer<typeof ParseUploadedDocumentInputSchema>;

const ClauseSchema = z.object({
    clauseId: z.string().describe('A unique identifier for the clause, e.g., "C1", "C2".'),
    type: z.string().describe('The type of clause, e.g., "Termination", "Payment", "Confidentiality".'),
    text: z.string().describe('The full body text of the clause.'),
    riskFlag: z.enum(["standard", "unusual"]).describe('A flag indicating if the clause is standard or unusual.'),
    explanation: z.string().describe('A brief explanation if the clause is flagged as unusual.'),
  });

const ParseUploadedDocumentOutputSchema = z.object({
  title: z.string().describe('The main title of the legal document.'),
  docType: z.string().describe('The type of document, e.g., "Rental Agreement", "Employment Contract".'),
  parties: z.array(z.string()).describe('The parties involved, like "Landlord", "Tenant", "Employer", "Employee".'),
  dates: z.object({
    startDate: z.string().describe('The effective or start date of the document.'),
    endDate: z.string().describe('The expiry or end date of the document, if specified.'),
  }),
  financialTerms: z.array(z.string()).describe('A list of key financial obligations, such as rent, salary, or penalties.'),
  clauses: z.array(ClauseSchema),
  structuralIssues: z.array(z.string()).describe('A list of any detected structural issues, like missing signatures or undefined terms.'),
});
export type ParseUploadedDocumentOutput = z.infer<typeof ParseUploadedDocumentOutputSchema>;

export async function parseUploadedDocument(input: ParseUploadedDocumentInput): Promise<ParseUploadedDocumentOutput> {
  return parseUploadedDocumentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'parseUploadedDocumentPrompt',
  input: {schema: ParseUploadedDocumentInputSchema},
  output: {schema: ParseUploadedDocumentOutputSchema},
  prompt: `[ROLE]
You are a legal AI assistant for LawyeredUp. The user has provided a legal document's text. Your job is to:

1. Extract the complete text from the uploaded document.
2. Identify document metadata:
   - Title
   - Parties involved (e.g., Employer, Employee, Landlord, Tenant)
   - Dates (effective, expiry, renewal)
   - Financial obligations (rent, salary, deposit, penalties, etc.)
   - Jurisdiction / governing law
3. Break down the document into clauses. For each clause, you must:
   - Assign a unique ID (e.g., "C1", "C2").
   - Identify its 'type' from standard legal categories (e.g., "Termination", "Payment", "Confidentiality", "Governing Law", etc.).
   - Extract the full 'text' of the clause.
   - Set a 'riskFlag'. Mark it as "unusual" if it contains language that is non-standard, one-sided, or potentially risky (e.g., "Landlord may change rent at any time without notice."). Otherwise, mark it as "standard".
   - Provide a brief 'explanation' only if the riskFlag is "unusual".
4. Detect structural issues (e.g., missing signatures, undefined terms).
5. Return the result in JSON format matching the output schema.

[INPUT]
Document Text: "{{documentText}}"

[OUTPUT FORMAT] (JSON)
Respond with a JSON object that matches the output schema.
`,
});

const parseUploadedDocumentFlow = ai.defineFlow(
  {
    name: 'parseUploadedDocumentFlow',
    inputSchema: ParseUploadedDocumentInputSchema,
    outputSchema: ParseUploadedDocumentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
