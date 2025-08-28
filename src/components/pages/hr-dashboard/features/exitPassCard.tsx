import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { HrDashboardDtoRead } from "@/lib/redux/api/openapi.generated";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";

// Dummy turnover trend data
const chartData = [
  { year: "2020", turnover: 12 },
  { year: "2021", turnover: 18 },
  { year: "2022", turnover: 15 },
  { year: "2023", turnover: 22 },
  { year: "2024", turnover: 17 },
  { year: "2025", turnover: 20 },
];

const chartConfig = {
  turnover: {
    label: "Turnover %",
    color: "#007bff",
  },
} satisfies ChartConfig;

interface Props {
  data: HrDashboardDtoRead;
}

export function StaffTurnoverCard({ data }: Props) {
  console.log("data in turnover card", data);
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Staff Turnover Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="max-h-96 h-full" config={chartConfig}>
          <LineChart className="h-full w-full" data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={true}
              tickMargin={10}
            />
            <YAxis tickLine={false} axisLine={false} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="turnover"
              stroke={chartConfig.turnover.color}
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
