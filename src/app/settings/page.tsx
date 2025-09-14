import { SettingsForm } from "./settings-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account settings and notification preferences.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Alert Configuration</CardTitle>
          <CardDescription>
            Customize alerting thresholds and how you receive notifications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SettingsForm />
        </CardContent>
      </Card>
    </div>
  );
}
