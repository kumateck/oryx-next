import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const chartData = [
  { name: "Official Duty Leave", value: 12, status: "approved" },
  { name: "Exit Past Leave", value: 8, status: "rejected" },
  { name: "Leave Request", value: 20, status: "approved" },
  { name: "Absentee Leave", value: 5, status: "expired" },
];

const COLORS = ["#4CAF50", "#FF9800", "#2196F3", "#F44336"];

export default function LeavePieChart() {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Leave Overview</CardTitle>
      </CardHeader>
      <CardContent className="w-full h-[200px]">
        <ChartContainer config={{}}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="80%"
                cy="80%"
                outerRadius="80%"
                label
              >
                {chartData.map((entry, index) => (
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
