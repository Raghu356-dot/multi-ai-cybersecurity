"use client";

import { useActionState, useFormStatus } from "react-dom";
import { Loader2, Send, AlertTriangle, CheckCircle2, Bot } from "lucide-react";

import { analyzeEmailAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
        </>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" /> Analyze Email
        </>
      )}
    </Button>
  );
}

export function PhishingAnalysisForm() {
  const initialState = { data: null, error: null };
  const [state, formAction] = useActionState(analyzeEmailAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
        variant: "destructive",
        title: "Analysis Error",
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
          <CardTitle className="font-headline">Email Content</CardTitle>
          <CardDescription>
            Paste the full content of the suspicious email below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} ref={formRef} className="space-y-4">
            <Textarea
              name="emailContent"
              placeholder="From: suspicious@example.com..."
              className="min-h-[300px] font-code text-sm"
              required
            />
            <SubmitButton />
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Analysis Result</CardTitle>
          <CardDescription>The AI-powered analysis will appear here.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!state.data && !useFormStatus().pending && (
            <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg h-full">
                <Bot className="h-12 w-12 mb-4" />
                <p>Waiting for submission...</p>
            </div>
          )}
          {useFormStatus().pending && (
            <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg h-full">
                <Loader2 className="h-12 w-12 mb-4 animate-spin text-primary" />
                <p>AI is analyzing the content...</p>
            </div>
          )}
          {state.data && (
            <>
              <Alert variant={state.data.isPhishing ? "destructive" : "default"}>
                {state.data.isPhishing ? (
                  <AlertTriangle className="h-4 w-4" />
                ) : (
                  <CheckCircle2 className="h-4 w-4" />
                )}
                <AlertTitle className="font-headline">
                  {state.data.isPhishing
                    ? "Phishing Attempt Detected"
                    : "Email Appears Safe"}
                </AlertTitle>
                <AlertDescription>
                    The model determined this with a confidence score of {Math.round(state.data.confidenceScore * 100)}%.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Confidence Score</label>
                <Progress value={state.data.confidenceScore * 100} className="w-full" />
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold font-headline">AI Reasoning</h3>
                <p className="text-sm text-muted-foreground bg-secondary/50 p-4 rounded-md">
                  {state.data.reasoning}
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
