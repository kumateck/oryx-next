"use client";
import { Card, CardContent, CardHeader, Icon } from "@/components/ui";
import { ListsTable } from "@/shared/datatable";

import { columns } from "./columns";
import PageWrapper from "@/components/layout/wrapper";
import { useRouter } from "next/navigation";
// import Link from "next/link";

function OvertimeRequestDetails({ id }: { id: string }) {
  const leaveRequestId = id as string;
  // const { data } = useGetApiV1LeaveRequestByIdQuery({
  //   id: leaveRequestId,
  // });
  console.log(leaveRequestId);
  const router = useRouter();
  return (
    <PageWrapper>
      <div>
        <div
          className="inline-flex items-center gap-2 mb-4 hover:cursor-pointer"
          onClick={() => router.back()}
        >
          <Icon name="ArrowLeft" className="h-5 w-5" />
          <h1 className="font-Medium text-base text-primary-500">
            Overtime List
          </h1>
        </div>
      </div>
      <Card>
        <CardHeader>
          <span className="font-semibold">Overtime Request Details</span>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3 place-content-between mt-1 text-sm">
            {/* Row 1 */}
            <div className="flex gap-2 items-center">
              <span>Start Date:</span>
              <span className="font-semibold"></span>
            </div>
            <div className="flex gap-2 items-center">
              <span>Start Time:</span>
              <span className="font-semibold"></span>
            </div>
            <div className="flex gap-2 items-center">
              <span>Overtime Justification:</span>
              <span className="font-semibold">
                {/* <TheAduseiEditorViewer
                  content={data?.justification as string}
                /> */}
              </span>
            </div>

            {/* Row 2 */}
            <div className="flex gap-2 items-center">
              <span>End Date:</span>
              <span className="font-semibold">
                {/* {data?.endDate ? format(data?.endDate, "MMM dd, yyyy") : "-"} */}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <span>End Time:</span>
              {/* <span className="font-semibold">{data?.contactPerson}</span> */}
            </div>
            <div className="flex gap-2 items-center">
              <span>Department:</span>
              <span className="font-semibold">
                {/* {data?.leaveType?.name} */}
              </span>
            </div>

            {/* Row 3 */}
            <div className="flex gap-2 items-center">
              <span>Overtime not to Exceed:</span>
              <span className="font-semibold">
                {/* {data?.employee?.department?.name || "-"} */}
              </span>
            </div>
          </div>

          <div className="my-10">
            <p className="font-medium mt-2">Employee List</p>
            <ListsTable data={[]} columns={columns} />
            {/* <ListsTable data={data ? [data] : []} columns={columns} /> */}
          </div>
        </CardContent>
      </Card>
    </PageWrapper>
  );
}

export default OvertimeRequestDetails;
