// app/dashboard/page.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart } from "lucide-react";
import { Icon } from "@/components/ui";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// const data = [
//   { day: "Sunday", value: 28 },
//   { day: "Monday", value: 88 },
//   { day: "Tuesday", value: 90 },
//   { day: "Wednesday", value: 90 },
//   { day: "Thursday", value: 96 },
//   { day: "Friday", value: 91 },
//   { day: "Saturday", value: 48 },
// ];
export const FilterBtn = ["Today", "This Week", "This Month", "All Time"];

export default function Dashboard() {
  return (
    <main className="p-6 grid gap-6">
      {/* Filters & Date */}

      {/* Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <div className="flex w-full justify-between items-center">
              <CardTitle className="">Leave Requests</CardTitle>
              <Icon name="UserRound" className="size-5 text-primary-default" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">185</p>
            <p className="text-gray-600">
              <span className="text-green-700">+45%</span> in last quarter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Overtime Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">75</p>
            <p className="text-green-600">+45% in last quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shipments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">185</p>
            <p className="text-green-600">+45% in last quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Report Upload</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="secondary">Attach Document</Button>
          </CardContent>
        </Card>
      </section>

      {/* Attendance Rate & Employees */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Attendance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">90%</p>
            <p className="text-green-600">+45% in last quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">704</p>
            <div className="flex justify-between">
              <span>Permanent Staff: 500</span>
              <span>Casual Staff: 204</span>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Present & Absent Today */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Present Today</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">304</p>
            <p className="text-green-600">+10% in last quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Absent Today</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">21</p>
            <p className="text-green-600">+45% in last quarter</p>
          </CardContent>
        </Card>

        {/* Duplicate for layout balance */}
        <Card>
          <CardHeader>
            <CardTitle>Present Today</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">304</p>
            <p className="text-green-600">+10% in last quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Absent Today</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">21</p>
            <p className="text-green-600">+45% in last quarter</p>
          </CardContent>
        </Card>
      </section>

      {/* Daily Attendance Chart */}
      <section className="bg-white rounded-2xl p-4 shadow">
        <h2 className="text-xl font-semibold mb-4">
          Daily Attendance Statistics
        </h2>
        {/* <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#6366f1" />
          </BarChart>
          <
        </ResponsiveContainer> */}
        <BarChart />
      </section>
    </main>
  );
}
