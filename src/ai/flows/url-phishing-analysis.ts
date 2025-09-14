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

  To analyze the page, you must call the tool to get the page content first. Then do the analysis based on the content.

  Follow the schema to produce the output.
  `,
});

const getUrlContent = ai.defineTool(
  {
    name: 'getUrlContent',
    description: 'Fetches the text content of a given URL.',
    inputSchema: z.object({
      url: z.string().url().describe('The URL to fetch content from.'),
    }),
    outputSchema: z.string(),
  },
  async input => {
    try {
      const response = await fetch(input.url);
      if (!response.ok) {
        return `Error: Could not fetch content. Status: ${response.status}`;
      }
      // This is a simplified text extraction. A more robust solution would use a library like Cheerio to parse HTML.
      const textContent = await response.text();
      return textContent.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').substring(0, 5000);
    } catch (e: any) {
      return `Error fetching URL: ${e.message}`;
    }
  }
);


const urlPhishingAnalysisFlow = ai.defineFlow(
  {
    name: 'urlPhishingAnalysisFlow',
    inputSchema: UrlPhishingAnalysisInputSchema,
    outputSchema: PhishingEmailAnalysisOutputSchema,
    tools: [getUrlContent],
  },
  async input => {
    const {output} = await urlPhishingAnalysisPrompt(input);
    return output!;
  }
);
