"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

export function SettingsForm() {
  const [threshold, setThreshold] = useState(80);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
      <div className="space-y-4">
        <Label htmlFor="threshold" className="text-base">
          High-Risk Alert Threshold
        </Label>
        <div className="flex items-center gap-4">
          <Slider
            id="threshold"
            min={50}
            max={100}
            step={5}
            value={[threshold]}
            onValueChange={(value) => setThreshold(value[0])}
          />
          <span className="font-mono text-lg text-primary w-16 text-center">
            {threshold}%
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          Set the confidence score threshold for triggering a high-risk alert.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-base font-medium">Notification Channels</h3>
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <Label htmlFor="email-notifications">Email Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive alerts at admin@cybermind.dev
            </p>
          </div>
          <Switch id="email-notifications" defaultChecked />
        </div>
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <Label htmlFor="sms-notifications">SMS Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive critical alerts via text message.
            </p>
          </div>
          <Switch id="sms-notifications" />
        </div>
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <Label htmlFor="push-notifications">Push Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Get notified directly on your mobile device.
            </p>
          </div>
          <Switch id="push-notifications" defaultChecked />
        </div>
      </div>

      <Button type="submit">Save Preferences</Button>
    </form>
  );
}
