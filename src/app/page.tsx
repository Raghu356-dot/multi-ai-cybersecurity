import Image from "next/image";
import {
  Activity,
  AlertTriangle,
  FileText,
  Laptop,
  ShieldAlert,
  Signal,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { Pie, PieChart, Cell } from "recharts";
import { getPlaceholderImage } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";

const alerts = [
  {
    type: "Phishing Attempt",
    severity: "High",
    timestamp: "2 mins ago",
    summary: "Suspicious login from new IP",
  },
  {
    type: "Fraud Detection",
    severity: "Critical",
    timestamp: "5 mins ago",
    summary: "High-value transaction flagged",
  },
  {
    type: "Malware Detected",
    severity: "High",
    timestamp: "15 mins ago",
    summary: 'Malicious file "invoice.exe" quarantined',
  },
  {
    type: "Threat Correlation",
    severity: "Medium",
    timestamp: "30 mins ago",
    summary: "IOCs match recent threat feed",
  },
  {
    type: "System Anomaly",
    severity: "Low",
    timestamp: "1 hour ago",
    summary: "Unusual CPU usage on server-db-01",
  },
];

const severityVariant: { [key: string]: "destructive" | "secondary" | "default" } = {
  Critical: "destructive",
  High: "destructive",
  Medium: "secondary",
  Low: "default",
};

const systemStatusData = [
  { status: "Operational", value: 95, fill: "hsl(var(--chart-1))" },
  { status: "Degraded", value: 3, fill: "hsl(var(--chart-2))" },
  { status: "Offline", value: 2, fill: "hsl(var(--destructive))" },
];

const chartConfig: ChartConfig = {
  value: {
    label: "Systems",
  },
  Operational: {
    label: "Operational",
    color: "hsl(var(--chart-1))",
  },
  Degraded: {
    label: "Degraded",
    color: "hsl(var(--chart-2))",
  },
  Offline: {
    label: "Offline",
    color: "hsl(var(--destructive))",
  },
};

export default function Home() {
  const threatMapImage = getPlaceholderImage("threat-map");
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Dashboard
        </h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Real-time Alerts
            </CardTitle>
            <ShieldAlert className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last hour
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              High-Risk Events
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2</div>
            <p className="text-xs text-muted-foreground">
              in the last 30 minutes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Systems Scanned</CardTitle>
            <Laptop className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,204</div>
            <p className="text-xs text-muted-foreground">
              All systems operational
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Threats</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              Currently under investigation
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="font-headline">Recent Alerts</CardTitle>
            <CardDescription>
              A feed of the latest security events.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Summary</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alerts.map((alert, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{alert.type}</TableCell>
                    <TableCell>
                      <Badge variant={severityVariant[alert.severity]}>
                        {alert.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>{alert.timestamp}</TableCell>
                    <TableCell>{alert.summary}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        Investigate
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="font-headline">System Status</CardTitle>
            <CardDescription>
              Overview of all monitored systems.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={systemStatusData}
                  dataKey="value"
                  nameKey="status"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  {systemStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Global Threat Map</CardTitle>
          <CardDescription>
            Real-time visualization of detected cyber threats worldwide.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {threatMapImage && (
            <Image
              src={threatMapImage.imageUrl}
              alt={threatMapImage.description}
              width={1200}
              height={600}
              className="w-full h-auto rounded-lg"
              data-ai-hint={threatMapImage.imageHint}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
