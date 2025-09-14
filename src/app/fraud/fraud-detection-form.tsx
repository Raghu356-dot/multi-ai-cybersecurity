"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Loader2, ShieldCheck, Bot } from "lucide-react";
import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

import { checkFraudAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Checking...
        </>
      ) : (
        <>
          <ShieldCheck className="mr-2 h-4 w-4" /> Check Transaction
        </>
      )}
    </Button>
  );
}

const riskLevelVariant: { [key: string]: "destructive" | "secondary" | "default" } = {
  high: "destructive",
  medium: "secondary",
  low: "default",
};

export function FraudDetectionForm() {
  const initialState = { data: null, error: null };
  const [state, formAction] = useFormState(checkFraudAction, initialState);
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
          <CardTitle className="font-headline">Transaction Details</CardTitle>
          <CardDescription>
            Paste the transaction details below in any format.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} ref={formRef} className="space-y-4">
            <Textarea
              name="transactionDetails"
              placeholder={`e.g., "Amount: $15,000, From: User A, To: User B, Location: Cayman Islands, Time: 03:00 AM"`}
              className="min-h-[300px] font-code text-sm"
              required
            />
            <SubmitButton />
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Fraud Risk Assessment</CardTitle>
          <CardDescription>The AI-powered risk assessment will appear here.</CardDescription>
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
                <p>AI is assessing the risk...</p>
            </div>
          )}
          {state.data && (
            <div className="space-y-4">
                <div className="space-y-2">
                    <h3 className="font-semibold font-headline">Fraud Risk Level</h3>
                    <Badge variant={riskLevelVariant[state.data.fraudRiskLevel.toLowerCase()] || "default"} className="text-lg py-1 px-3 capitalize">
                        {state.data.fraudRiskLevel}
                    </Badge>
                </div>
                <div className="space-y-2">
                    <h3 className="font-semibold font-headline">Explanation</h3>
                    <p className="text-sm text-muted-foreground bg-secondary/50 p-4 rounded-md">
                    {state.data.explanation}
                    </p>
                </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
