// Summarize Security Reports Flow
'use server';
/**
 * @fileOverview Summarizes security reports to quickly understand key findings.
 *
 * - summarizeSecurityReport - A function that handles the summarization of security reports.
 * - SummarizeSecurityReportInput - The input type for the summarizeSecurityReport function.
 * - SummarizeSecurityReportOutput - The return type for the summarizeSecurityReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeSecurityReportInputSchema = z.object({
  reportText: z
    .string()
    .describe('The text content of the security report to be summarized.'),
});
export type SummarizeSecurityReportInput = z.infer<
  typeof SummarizeSecurityReportInputSchema
>;

const SummarizeSecurityReportOutputSchema = z.object({
  summary: z
    .string()
    .describe('A concise summary of the security report findings.'),
});
export type SummarizeSecurityReportOutput = z.infer<
  typeof SummarizeSecurityReportOutputSchema
>;

export async function summarizeSecurityReport(
  input: SummarizeSecurityReportInput
): Promise<SummarizeSecurityReportOutput> {
  return summarizeSecurityReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeSecurityReportPrompt',
  input: {schema: SummarizeSecurityReportInputSchema},
  output: {schema: SummarizeSecurityReportOutputSchema},
  prompt: `You are an expert security analyst. Please summarize the following security report, highlighting the key findings and potential actions required:\n\nReport:\n{{{reportText}}}`,
});

const summarizeSecurityReportFlow = ai.defineFlow(
  {
    name: 'summarizeSecurityReportFlow',
    inputSchema: SummarizeSecurityReportInputSchema,
    outputSchema: SummarizeSecurityReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
