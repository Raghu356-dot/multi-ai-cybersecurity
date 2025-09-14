import { FraudDetectionForm } from "./fraud-detection-form";

export default function FraudPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Fraudulent Transaction Analysis
        </h1>
        <p className="text-muted-foreground">
          Analyze transactions in real time for suspicious patterns using anomaly detection.
        </p>
      </div>
      <FraudDetectionForm />
    </div>
  );
}
