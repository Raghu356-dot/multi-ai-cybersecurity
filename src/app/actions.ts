"use server";

import { z } from "zod";
import {
  analyzePhishingEmail,
  PhishingEmailAnalysisOutput,
} from "@/ai/flows/phishing-email-analysis";
import {
  transactionFraudCheck,
  TransactionFraudCheckOutput,
} from "@/ai/flows/transaction-fraud-check";
import {
  correlateThreatIntelligence,
  CorrelateThreatIntelligenceOutput,
} from "@/ai/flows/threat-intelligence-correlation";

export type PhishingState = {
  data: PhishingEmailAnalysisOutput | null;
  error: string | null;
};

const phishingSchema = z.object({
  emailContent: z.string().min(1, "Email content cannot be empty."),
});

export async function analyzeEmailAction(
  prevState: PhishingState,
  formData: FormData
): Promise<PhishingState> {
  const validatedFields = phishingSchema.safeParse({
    emailContent: formData.get("emailContent"),
  });

  if (!validatedFields.success) {
    return {
      data: null,
      error: validatedFields.error.flatten().fieldErrors.emailContent?.[0] || "Invalid input.",
    };
  }

  try {
    const result = await analyzePhishingEmail(validatedFields.data);
    return { data: result, error: null };
  } catch (e) {
    console.error(e);
    return { data: null, error: "An error occurred during analysis." };
  }
}

export type FraudState = {
  data: TransactionFraudCheckOutput | null;
  error: string | null;
};

const fraudSchema = z.object({
  transactionDetails: z.string().min(1, "Transaction details cannot be empty."),
});

export async function checkFraudAction(
  prevState: FraudState,
  formData: FormData
): Promise<FraudState> {
  const validatedFields = fraudSchema.safeParse({
    transactionDetails: formData.get("transactionDetails"),
  });

  if (!validatedFields.success) {
    return {
      data: null,
      error: validatedFields.error.flatten().fieldErrors.transactionDetails?.[0] || "Invalid input.",
    };
  }

  try {
    const result = await transactionFraudCheck(validatedFields.data);
    return { data: result, error: null };
  } catch (e) {
    console.error(e);
    return { data: null, error: "An error occurred during analysis." };
  }
}

export type ThreatIntelState = {
  data: CorrelateThreatIntelligenceOutput | null;
  error: string | null;
};

const threatIntelSchema = z.object({
  threatDataSources: z.string().min(1, "Threat data sources cannot be empty."),
  internalSecurityData: z.string().optional(),
});

export async function correlateThreatsAction(
  prevState: ThreatIntelState,
  formData: FormData
): Promise<ThreatIntelState> {
  const rawThreatData = formData.get("threatDataSources") as string;
  const threatDataSources = rawThreatData.split("\n").filter(line => line.trim() !== "");

  const validatedFields = threatIntelSchema.safeParse({
    threatDataSources: rawThreatData,
    internalSecurityData: formData.get("internalSecurityData"),
  });

  if (!validatedFields.success) {
    return {
      data: null,
      error: validatedFields.error.flatten().fieldErrors.threatDataSources?.[0] || "Invalid input.",
    };
  }

  try {
    const result = await correlateThreatIntelligence({
        threatDataSources,
        internalSecurityData: validatedFields.data.internalSecurityData
    });
    return { data: result, error: null };
  } catch (e) {
    console.error(e);
    return { data: null, error: "An error occurred during threat correlation." };
  }
}
