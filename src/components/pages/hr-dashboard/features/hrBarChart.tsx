import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { HrDashboardDtoRead } from "@/lib/redux/api/openapi.generated";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  XAxis,
  YAxis,
} from "recharts";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  sun: {
    label: "sun",
    color: "#007bff",
  },
  mon: {
    label: "mon",
    color: "#ff8c00",
  },
  tue: {
    label: "tue",
    color: "#8a2be2",
  },
  wed: {
    label: "wed",
    color: "#ff0000",
  },
  thu: {
    label: "thu",
    color: "#ff0000",
  },
  fri: {
    label: "fri",
    color: "#800080",
  },

  sat: {
    label: "sat",
    color: "#9acd32",
  },
} satisfies ChartConfig;
const chartData = [
  { day: "sun", visitors: 187, fill: "#007bff" },
  { day: "mon", visitors: 200, fill: "#ff8c00" },
  { day: "tue", visitors: 275, fill: "#8a2be2" },
  { day: "wed", visitors: 173, fill: "#ff0000" },
  { day: "thu", visitors: 90, fill: "#800080" },
  { day: "fri", visitors: 90, fill: "#006400" },
  { day: "sat", visitors: 90, fill: "#9acd32" },
];

interface Props {
  data: HrDashboardDtoRead;
}
export function HrBarChart({}: Props) {
  return (
    <Card className="mt-6 w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Daily Attendance Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="max-h-96 !pl-0 h-full" config={chartConfig}>
          <BarChart
            className="h-full w-full"
            accessibilityLayer
            margin={{ left: 0 }}
            data={chartData}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              className="text-lg font-medium capitalize"
              tickLine={false}
              tickMargin={10}
              axisLine={true}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <YAxis tickLine={false} axisLine={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="visitors"
              // strokeWidth={2}
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
