'use server';

/**
 * @fileOverview Threat Intelligence Correlation AI agent.
 *
 * - correlateThreatIntelligence - A function that correlates threat intelligence data.
 * - CorrelateThreatIntelligenceInput - The input type for the correlateThreatIntelligence function.
 * - CorrelateThreatIntelligenceOutput - The return type for the correlateThreatIntelligence function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CorrelateThreatIntelligenceInputSchema = z.object({
  threatDataSources: z
    .array(z.string())
    .describe('An array of threat intelligence data sources.'),
  internalSecurityData: z
    .string()
    .optional()
    .describe('Optional internal security data to consider for correlation.'),
});
export type CorrelateThreatIntelligenceInput = z.infer<
  typeof CorrelateThreatIntelligenceInputSchema
>;

const CorrelateThreatIntelligenceOutputSchema = z.object({
  correlatedThreats: z
    .string()
    .describe(
      'A summary of correlated threats identified across the data sources.'
    ),
  potentialAttackCampaigns: z
    .string()
    .describe(
      'A description of potential attack campaigns that these threats might be a part of.'
    ),
  recommendedActions: z
    .array(z.string())
    .describe('Recommended actions to mitigate the identified threats.'),
});
export type CorrelateThreatIntelligenceOutput = z.infer<
  typeof CorrelateThreatIntelligenceOutputSchema
>;

export async function correlateThreatIntelligence(
  input: CorrelateThreatIntelligenceInput
): Promise<CorrelateThreatIntelligenceOutput> {
  return correlateThreatIntelligenceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'correlateThreatIntelligencePrompt',
  input: {schema: CorrelateThreatIntelligenceInputSchema},
  output: {schema: CorrelateThreatIntelligenceOutputSchema},
  prompt: `You are a cybersecurity threat intelligence analyst.
  Your goal is to correlate threat intelligence data from various sources to identify potential attack campaigns.

  Analyze the following threat data sources:
  {{#each threatDataSources}}- {{{this}}}
  {{/each}}

  {{#if internalSecurityData}}
  Consider the following internal security data:
  {{{internalSecurityData}}}
  {{/if}}

  Based on your analysis, provide a summary of correlated threats, a description of potential attack campaigns, and recommended actions to mitigate the identified threats.
`,
});

const correlateThreatIntelligenceFlow = ai.defineFlow(
  {
    name: 'correlateThreatIntelligenceFlow',
    inputSchema: CorrelateThreatIntelligenceInputSchema,
    outputSchema: CorrelateThreatIntelligenceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
