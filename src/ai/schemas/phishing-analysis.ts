/**
 * @fileOverview Shared schemas for phishing analysis.
 */

import {z} from 'genkit';

export const PhishingEmailAnalysisOutputSchema = z.object({
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
