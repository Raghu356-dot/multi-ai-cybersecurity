'use server';

/**
 * @fileOverview Flow for checking transaction fraud risk.
 *
 * - transactionFraudCheck - A function that checks the fraud risk of a transaction.
 * - TransactionFraudCheckInput - The input type for the transactionFraudCheck function.
 * - TransactionFraudCheckOutput - The return type for the transactionFraudCheck function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TransactionFraudCheckInputSchema = z.object({
  transactionDetails: z
    .string()
    .describe('Details of the transaction, including amount, timestamp, and involved parties.'),
});
export type TransactionFraudCheckInput = z.infer<typeof TransactionFraudCheckInputSchema>;

const TransactionFraudCheckOutputSchema = z.object({
  fraudRiskLevel: z
    .string()
    .describe(
      'The assessed risk level of the transaction, such as low, medium, or high.'
    ),
  explanation: z
    .string()
    .describe('Explanation of why the transaction is considered to have that risk level.'),
});
export type TransactionFraudCheckOutput = z.infer<typeof TransactionFraudCheckOutputSchema>;

export async function transactionFraudCheck(
  input: TransactionFraudCheckInput
): Promise<TransactionFraudCheckOutput> {
  return transactionFraudCheckFlow(input);
}

const prompt = ai.definePrompt({
  name: 'transactionFraudCheckPrompt',
  input: {schema: TransactionFraudCheckInputSchema},
  output: {schema: TransactionFraudCheckOutputSchema},
  prompt: `As a fraud detection expert, analyze the following transaction details and assess the fraud risk level.
  Provide a fraud risk level (low, medium, high) and an explanation for your assessment.

Transaction Details: {{{transactionDetails}}}`,
});

const transactionFraudCheckFlow = ai.defineFlow(
  {
    name: 'transactionFraudCheckFlow',
    inputSchema: TransactionFraudCheckInputSchema,
    outputSchema: TransactionFraudCheckOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
