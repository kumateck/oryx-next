import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { HrDashboardDtoRead } from "@/lib/redux/api/openapi.generated";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";

const chartConfig = {
  active: {
    label: "Active",
    color: "#007bff",
  },
  inactive: {
    label: "Inactive",
    color: "#ff8c00",
  },
  suspended: {
    label: "Suspended",
    color: "#8a2be2",
  },
} satisfies ChartConfig;

const chartData = [
  { status: "active", count: 187, fill: "#007bff" },
  { status: "inactive", count: 200, fill: "#ff8c00" },
  { status: "suspended", count: 275, fill: "#8a2be2" },
];

interface Props {
  data: HrDashboardDtoRead;
}

export function EmployeesBreakDown({}: Props) {
  return (
    <Card className="mt-6 w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Employees Status Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="max-h-96 h-full" config={chartConfig}>
          <BarChart className="h-full w-full" data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="status"
              className="text-lg font-medium capitalize"
              tickLine={false}
              tickMargin={10}
              axisLine={true}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="count"
              radius={8}
              activeIndex={2}
              activeBar={({ ...props }) => (
                <Rectangle
                  {...props}
                  fillOpacity={0.8}
                  stroke={props.payload.fill}
                  strokeDasharray={4}
                  strokeDashoffset={4}
                />
              )}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
