"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2, GitBranch, Bot, FileWarning } from "lucide-react";
import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

import { correlateThreatsAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Correlating...
        </>
      ) : (
        <>
          <GitBranch className="mr-2 h-4 w-4" /> Correlate Threats
        </>
      )}
    </Button>
  );
}

export function ThreatCorrelationForm() {
  const initialState = { data: null, error: null };
  const [state, formAction] = useActionState(correlateThreatsAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
        variant: "destructive",
        title: "Correlation Error",
        description: state.error,
      });
    }
    if(state.data){
        formRef.current?.reset();
    }
  }, [state, toast]);

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Data Sources</CardTitle>
          <CardDescription>
            Provide data from various threat intelligence feeds and internal logs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} ref={formRef} className="space-y-4">
            <div className="space-y-2">
                <label htmlFor="threatDataSources" className="text-sm font-medium">Threat Data Sources</label>
                <Textarea
                    id="threatDataSources"
                    name="threatDataSources"
                    placeholder="Enter each data point/report on a new line..."
                    className="min-h-[200px] font-code text-sm"
                    required
                />
            </div>
            <div className="space-y-2">
                <label htmlFor="internalSecurityData" className="text-sm font-medium">Internal Security Data (Optional)</label>
                <Textarea
                    id="internalSecurityData"
                    name="internalSecurityData"
                    placeholder="e.g., Internal logs, SIEM alerts..."
                    className="min-h-[100px] font-code text-sm"
                />
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Correlation Analysis</CardTitle>
          <CardDescription>The AI-powered analysis of correlated threats will appear here.</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[450px] pr-4">
          {!state.data && !useFormStatus().pending && (
             <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg h-full">
                <Bot className="h-12 w-12 mb-4" />
                <p>Waiting for submission...</p>
            </div>
          )}
          {useFormStatus().pending && (
            <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg h-full">
                <Loader2 className="h-12 w-12 mb-4 animate-spin text-primary" />
                <p>AI is correlating intelligence feeds...</p>
            </div>
          )}
          {state.data && (
            <div className="space-y-6">
                <div>
                    <h3 className="font-semibold text-lg font-headline text-primary">Correlated Threats</h3>
                    <p className="text-sm text-muted-foreground mt-1">{state.data.correlatedThreats}</p>
                </div>
                <Separator />
                <div>
                    <h3 className="font-semibold text-lg font-headline text-accent">Potential Attack Campaigns</h3>
                    <p className="text-sm text-muted-foreground mt-1">{state.data.potentialAttackCampaigns}</p>
                </div>
                <Separator />
                <div>
                    <h3 className="font-semibold text-lg font-headline">Recommended Actions</h3>
                    <ul className="mt-2 list-disc list-inside space-y-2 text-sm text-muted-foreground">
                        {state.data.recommendedActions.map((action, index) => (
                            <li key={index} className="flex items-start">
                                <FileWarning className="h-4 w-4 mr-2 mt-1 shrink-0 text-primary" />
                                <span>{action}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
          )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
