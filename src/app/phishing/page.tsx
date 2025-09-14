import { PhishingAnalysisForm } from "./phishing-analysis-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UrlScanForm } from "./url-scan-form";

export default function PhishingPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Phishing & Malware Detection
        </h1>
        <p className="text-muted-foreground">
          Analyze emails and URLs for phishing attempts and malware using AI.
        </p>
      </div>
      <Tabs defaultValue="email" className="space-y-4">
        <TabsList>
          <TabsTrigger value="email">Analyze Email</TabsTrigger>
          <TabsTrigger value="url">Scan URL</TabsTrigger>
        </TabsList>
        <TabsContent value="email">
          <PhishingAnalysisForm />
        </TabsContent>
        <TabsContent value="url">
          <UrlScanForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
