import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Icon,
} from "@/components/ui";
import React from "react";
import { SegmentedBar } from "./segmentedBar";
import { HrDashboardDtoRead } from "@/lib/redux/api/openapi.generated";
interface Props {
  data: HrDashboardDtoRead;
}
export function AttendanceCard({ data }: Props) {
  return (
    <Card className="col-span-4 row-span-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Attendance Rate</CardTitle>
          <Icon
            name="UserRound"
            className="size-5 font-semibold text-primary-default"
          />
        </div>
        <CardDescription className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">99%</h1>
          <span className="mr-10 text-lg">
            <span className="text-green-700 font-medium">+45%</span> in last
            quarter
          </span>
        </CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto">
        <SegmentedBar data={data} />
      </CardFooter>
    </Card>
  );
}
