import { config } from 'dotenv';
config();

import '@/ai/flows/transaction-fraud-check.ts';
import '@/ai/flows/threat-intelligence-correlation.ts';
import '@/ai/flows/summarize-security-reports.ts';
import '@/ai/flows/phishing-email-analysis.ts';
import '@/ai/flows/url-phishing-analysis.ts';
