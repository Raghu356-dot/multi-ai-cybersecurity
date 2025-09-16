// This is a server-side file.
'use server';

/**
 * @fileOverview Analyzes a URL for phishing indicators.
 *
 * - analyzeUrlForPhishing - Analyzes the URL.
 * - UrlPhishingAnalysisInput - The input type for the analyzeUrlForPhishing function.
 * - UrlPhishingAnalysisOutput - The return type for the analyzeUrlForPhishing function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {
  type PhishingEmailAnalysisOutput,
  PhishingEmailAnalysisOutputSchema,
} from '@/ai/schemas/phishing-analysis';

const UrlPhishingAnalysisInputSchema = z.object({
  url: z.string().url().describe('The URL to analyze for phishing.'),
});
export type UrlPhishingAnalysisInput = z.infer<
  typeof UrlPhishingAnalysisInputSchema
>;

export type UrlPhishingAnalysisOutput = PhishingEmailAnalysisOutput;

export async function analyzeUrlForPhishing(
  input: UrlPhishingAnalysisInput
): Promise<UrlPhishingAnalysisOutput> {
  return urlPhishingAnalysisFlow(input);
}

const urlPhishingAnalysisPrompt = ai.definePrompt({
  name: 'urlPhishingAnalysisPrompt',
  input: {schema: UrlPhishingAnalysisInputSchema},
  output: {schema: PhishingEmailAnalysisOutputSchema},
  prompt: `You are a cybersecurity expert specializing in phishing detection.
  Analyze the content of the provided URL and determine if it is a phishing attempt.
  Provide a detailed reasoning for your determination, including specific indicators found on the page.
  Also, provide a confidence score (0-1) for your analysis.

  URL to analyze: {{{url}}}

  Analyze the page content from the URL directly to perform the analysis.

  Follow the schema to produce the output.
  `,
});

const urlPhishingAnalysisFlow = ai.defineFlow(
  {
    name: 'urlPhishingAnalysisFlow',
    inputSchema: UrlPhishingAnalysisInputSchema,
    outputSchema: PhishingEmailAnalysisOutputSchema,
  },
  async input => {
    const {output} = await urlPhishingAnalysisPrompt(input);
    return output!;
  }
);
