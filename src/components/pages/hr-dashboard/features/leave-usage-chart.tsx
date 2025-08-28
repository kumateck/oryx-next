import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const leaveData = [
  { name: "Used Leave", value: 12 },
  { name: "Remaining Leave", value: 18 },
];

const COLORS = ["#FF9800", "#4CAF50"];

export default function LeaveUsageChart() {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Leave Usage</CardTitle>
      </CardHeader>
      <CardContent className="w-full h-[200px]">
        <ChartContainer config={{}}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={leaveData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius="80%"
                label
              >
                {leaveData.map((entry, index) => (
                  <Cell
                    key={`cell-${index + entry.name}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
