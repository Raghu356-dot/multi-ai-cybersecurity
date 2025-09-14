// This is a server-side file.
'use server';

/**
 * @fileOverview Analyzes a suspicious email for phishing indicators.
 *
 * - analyzePhishingEmail - Analyzes the email.
 * - PhishingEmailAnalysisInput - The input type for the analyzePhishingEmail function.
 * - PhishingEmailAnalysisOutput - The return type for the analyzePhishingEmail function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PhishingEmailAnalysisInputSchema = z.object({
  emailContent: z
    .string()
    .describe('The full content of the email to analyze.'),
});
export type PhishingEmailAnalysisInput = z.infer<
  typeof PhishingEmailAnalysisInputSchema
>;

const PhishingEmailAnalysisOutputSchema = z.object({
  isPhishing: z
    .boolean()
    .describe(
      'Whether the email is likely a phishing attempt (true) or not (false).'
    ),
  reasoning: z
    .string()
    .describe(
      'A detailed explanation of why the email is classified as phishing or not, including specific indicators found.'
    ),
  confidenceScore: z
    .number()
    .describe(
      'A score between 0 and 1 indicating the confidence level of the phishing determination.'
    ),
});
export type PhishingEmailAnalysisOutput = z.infer<
  typeof PhishingEmailAnalysisOutputSchema
>;

export async function analyzePhishingEmail(
  input: PhishingEmailAnalysisInput
): Promise<PhishingEmailAnalysisOutput> {
  return phishingEmailAnalysisFlow(input);
}

const phishingEmailAnalysisPrompt = ai.definePrompt({
  name: 'phishingEmailAnalysisPrompt',
  input: {schema: PhishingEmailAnalysisInputSchema},
  output: {schema: PhishingEmailAnalysisOutputSchema},
  prompt: `You are a cybersecurity expert specializing in phishing email detection.
  Analyze the email content provided and determine if it is a phishing attempt.
  Provide a detailed reasoning for your determination, including specific indicators found in the email.
  Also, provide a confidence score (0-1) for your analysis.

  Email Content: {{{emailContent}}}

  Follow the schema to produce the output.
  `,
});

const phishingEmailAnalysisFlow = ai.defineFlow(
  {
    name: 'phishingEmailAnalysisFlow',
    inputSchema: PhishingEmailAnalysisInputSchema,
    outputSchema: PhishingEmailAnalysisOutputSchema,
  },
  async input => {
    const {output} = await phishingEmailAnalysisPrompt(input);
    return output!;
  }
);
