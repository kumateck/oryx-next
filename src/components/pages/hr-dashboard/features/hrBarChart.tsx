import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  sun: {
    label: "Sun",
    color: "#007bff",
  },
  mon: {
    label: "Mon",
    color: "#ff8c00",
  },
  tue: {
    label: "Tue",
    color: "#8a2be2",
  },
  wed: {
    label: "Wed",
    color: "#ff0000",
  },
  thu: {
    label: "Thu",
    color: "#ff0000",
  },
  fri: {
    label: "Fri",
    color: "#800080",
  },

  sat: {
    label: "Sat",
    color: "#9acd32",
  },
} satisfies ChartConfig;
const chartData = [
  { day: "Sun", visitors: 187, fill: "#007bff" },
  { day: "Mon", visitors: 200, fill: "#ff8c00" },
  { day: "Tue", visitors: 275, fill: "#8a2be2" },
  { day: "Wed", visitors: 173, fill: "#ff0000" },
  { day: "Thu", visitors: 90, fill: "#800080" },
  { day: "Fri", visitors: 90, fill: "#006400" },
  { day: "Sat", visitors: 90, fill: "#9acd32" },
];
export function HrBarChart() {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Daily Attendance Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="browser"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="visitors"
              strokeWidth={2}
              radius={8}
              activeIndex={2}
              activeBar={({ ...props }) => {
                return (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                );
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
