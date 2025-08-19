import {
  Card,
  CardContent,
  CardHeader,
  Icon,
  Separator,
} from "@/components/ui";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { HrDashboardDtoRead } from "@/lib/redux/api/openapi.generated";
import { CartesianGrid, Line, LineChart } from "recharts";
import { AttendanceReportUpload } from "./attendaceCard";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface Props {
  data: HrDashboardDtoRead;
}
export const ChartCards = ({ data }: Props) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-9 gap-4">
      {/* leave reqest card */}
      <Card className="lg:col-span-3  col-span-1">
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Leave Requests</h3>
            <Icon name="UserRound" className="size-5 text-primary-default" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <div className="col-span-2 text-center">
              <span className="font-extrabold text-2xl text-gray-800 text-center">
                {data?.numberOfLeaveRequests}
              </span>
              <Separator className="my-2" />
              <div className="flex flex-col  gap-1">
                <div className="flex font-medium px-2 py-1 w-fit rounded-full items-center gap-1 bg-gray-700 text-white">
                  <span className="text-xs">Pending</span>
                  <span className="font-semibold">
                    {data?.numberOfPendingLeaveRequests}
                  </span>
                </div>
                <div className="flex font-medium px-2 py-1 w-fit rounded-full items-center gap-1 bg-yellow-700 text-white">
                  <span className="text-xs">Rejected</span>
                  <span className="font-semibold">
                    {data?.numberOfRejectedLeaveRequests}
                  </span>
                </div>
                <div className="flex font-medium px-2 py-1 w-fit rounded-full items-center gap-1 bg-red-700 text-white">
                  <span className="text-xs">Expired</span>
                  <span className="font-semibold">
                    {data?.numberOfExpiredLeaveRequests}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-4">
              <ChartContainer config={chartConfig}>
                <LineChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Line
                    dataKey="desktop"
                    type="natural"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Overtime Requests */}
      <Card className="lg:col-span-3 col-span-1">
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Overtime Requests</h3>
            <Icon name="UsersRound" className="size-5 text-primary-default" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6">
            <div className="col-span-2 text-center">
              <span className="font-extrabold text-2xl text-gray-800 text-center">
                {data.numberOfOvertimeRequests}
              </span>
              <Separator className="my-2" />
              <div className="flex flex-col  gap-1">
                <div className="flex font-medium px-2 py-1 w-fit rounded-full items-center gap-1 bg-gray-700 text-white">
                  <span className="text-xs">Pending</span>
                  <span className="font-semibold">
                    {data?.numberOfPendingOvertimeRequests}
                  </span>
                </div>
                <div className="flex font-medium px-2 py-1 w-fit rounded-full items-center gap-1 bg-green-700 text-white">
                  <span className="text-xs">Approved</span>
                  <span className="font-semibold">
                    {data?.numberOfApprovedOvertimeRequests}
                  </span>
                </div>
                <div className="flex font-medium px-2 py-1 w-fit rounded-full items-center gap-1 bg-red-700 text-white">
                  <span className="text-xs">Rejected</span>
                  <span className="font-semibold">
                    {data?.numberOfRejectedLeaveRequests}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-4">
              <ChartContainer config={chartConfig}>
                <LineChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Line
                    dataKey="desktop"
                    type="natural"
                    // stroke="var(--color-desktop)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </div>
        </CardContent>
      </Card>
      <AttendanceReportUpload />
    </div>
  );
};
