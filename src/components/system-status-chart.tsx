
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { Pie, PieChart, Cell } from "recharts";

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

export function SystemStatusChart() {
  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle className="font-headline">System Status</CardTitle>
        <CardDescription>Overview of all monitored systems.</CardDescription>
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
  );
}
