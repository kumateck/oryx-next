import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const genderData = [
  { name: "Male", value: 65 },
  { name: "Female", value: 35 },
];

const COLORS = ["#2196F3", "#E91E63"]; // blue for male, pink for female

export default function GenderRatioChart() {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Gender Ratio</CardTitle>
      </CardHeader>
      <CardContent className="w-full h-[200px]">
        {" "}
        {/* ✅ fixed space */}
        <ChartContainer config={{}}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={genderData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius="80%"
                label
              >
                {genderData.map((entry, index) => (
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
