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
import {
  type PhishingEmailAnalysisOutput,
  PhishingEmailAnalysisOutputSchema,
} from '@/ai/schemas/phishing-analysis';
import { analyzeUrlForPhishing } from './url-phishing-analysis';

const PhishingEmailAnalysisInputSchema = z.object({
  emailContent: z
    .string()
    .describe('The full content of the email to analyze.'),
});
export type PhishingEmailAnalysisInput = z.infer<
  typeof PhishingEmailAnalysisInputSchema
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
  tools: [analyzeUrlForPhishing],
  prompt: `You are a cybersecurity expert specializing in phishing email detection.
  Analyze the email content provided and determine if it is a phishing attempt.
  If you find any URLs in the email, use the analyzeUrlForPhishing tool to analyze them.
  Provide a detailed reasoning for your determination, including specific indicators found in the email and the results of any URL scans.
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
