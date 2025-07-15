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
import { CartesianGrid, Line, LineChart, Pie, PieChart } from "recharts";

const cardsStatus = {
  leaveRequest: [
    {
      id: 1,
      status: "Pending",
      count: 43,
      color: "bg-gray-400",
    },
    {
      id: 3,
      status: "Rejected",
      count: 20,
      color: "bg-orange-400",
    },
    {
      id: 2,
      status: "Expired",
      count: 45,
      color: "bg-red-400",
    },
  ],
  overtimeRequest: [
    {
      id: 1,
      status: "Pending",
      count: 43,
      color: "bg-gray-400",
    },
    {
      id: 2,
      status: "Approved",
      count: 20,
      color: "bg-green-400",
    },
    {
      id: 3,
      status: "Rejected",
      count: 12,
      color: "bg-red-400",
    },
  ],
  shipment: [
    {
      id: 2,
      status: "In Transit",
      count: 20,
      color: "bg-blue-400",
    },

    {
      id: 3,
      status: "Arrived",
      count: 12,
      color: "bg-green-400 bg-opacity-60",
    },
    {
      id: 1,
      status: "Created",
      count: 43,
      color: "bg-green-400",
    },
  ],
};

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
const COLORS = {
  Cleared: "#8DF6B3",
  Arrived: "#B0F4A6",
  New: "#FEC84E",
  "In Transit": "#0086DF",
};
const PieChartData = [
  { shipment: "Cleared", visitors: 275, fill: COLORS.Cleared },
  { shipment: "Arrived", visitors: 200, fill: COLORS.Arrived },
  { shipment: "Created", visitors: 187, fill: COLORS.New },
  { shipment: "In Transit", visitors: 173, fill: COLORS["In Transit"] },
];

const pieChartConfig = {
  cleared: {
    label: "cleared",
    color: COLORS.Cleared,
  },
  arrived: {
    label: "arrived",
    color: COLORS.Arrived,
  },
  created: {
    label: "created",
    color: COLORS.New,
  },
  inTransit: {
    label: "in transit",
    color: COLORS["In Transit"],
  },
} satisfies ChartConfig;

export const ChartCards = () => {
  return (
    <div className=" grid grid-cols-9 gap-4">
      {/* leave reqest card */}
      <Card className="col-span-3">
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Leave Requests</h3>
            <Icon name="UserRound" className="size-5 text-primary-default" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6">
            <div className="col-span-2 text-center">
              <span className="font-extrabold text-2xl text-gray-800 text-center">
                105
              </span>
              <Separator className="my-2" />
              <div className="space-y-2">
                {cardsStatus.leaveRequest.map((item) => (
                  <div
                    key={item.id}
                    className={`flex ${item.color} text-white text-sm p-2 rounded-full items-center justify-between`}
                  >
                    <span>{item.status}</span>
                    <span>{item.count}</span>
                  </div>
                ))}
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
      <Card className="col-span-3">
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
                105
              </span>
              <Separator className="my-2" />
              <div className="space-y-2">
                {cardsStatus.overtimeRequest.map((item) => (
                  <div
                    key={item.id}
                    className={`flex ${item.color} text-white text-sm p-2 rounded-full items-center justify-between`}
                  >
                    <span>{item.status}</span>
                    <span>{item.count}</span>
                  </div>
                ))}
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
      <Card className="col-span-3">
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Shipment</h3>
            <Icon name="UserRound" className="size-5 text-primary-default" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6">
            <div className="col-span-2 text-center">
              <span className="font-extrabold text-2xl text-gray-800 text-center">
                105
              </span>
              <Separator className="my-2" />
              <div className="space-y-2">
                {cardsStatus.shipment.map((item) => (
                  <div
                    key={item.id}
                    className={`flex ${item.color} text-white text-sm p-2 rounded-full items-center justify-between`}
                  >
                    <span>{item.status}</span>
                    <span>{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-4">
              <ChartContainer config={pieChartConfig}>
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <Pie
                    data={PieChartData}
                    dataKey="visitors"
                    label
                    nameKey="browser"
                  />
                </PieChart>
              </ChartContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
