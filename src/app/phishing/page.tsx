import { PhishingAnalysisForm } from "./phishing-analysis-form";

export default function PhishingPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Phishing & Malware Detection
        </h1>
        <p className="text-muted-foreground">
          Analyze emails for phishing attempts and malware using NLP and machine learning.
        </p>
      </div>
      <PhishingAnalysisForm />
    </div>
  );
}
