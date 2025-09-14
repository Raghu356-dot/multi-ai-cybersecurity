import { ThreatCorrelationForm } from "./threat-correlation-form";

export default function ThreatIntelligencePage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Threat Intelligence Correlation
        </h1>
        <p className="text-muted-foreground">
          Correlate threat data from different sources to identify broader attack campaigns.
        </p>
      </div>
      <ThreatCorrelationForm />
    </div>
  );
}
