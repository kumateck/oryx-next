"use client";
import { Card, CardContent, CardHeader, Icon } from "@/components/ui";
import { ListsTable } from "@/shared/datatable";
import { columns } from "./columns";
import PageWrapper from "@/components/layout/wrapper";
import { useParams, useRouter } from "next/navigation";
import { useGetApiV1OvertimeRequestsByIdQuery } from "@/lib/redux/api/openapi.generated";
import { AuditModules } from "@/lib";
import { format, addHours } from "date-fns";
// import Link from "next/link";

function Page() {
  const { id } = useParams();
  const overTimeId = id as string;
  const { data } = useGetApiV1OvertimeRequestsByIdQuery({
    id: overTimeId,
    module: AuditModules.management.name,
    subModule: AuditModules.management.overTimeMangement,
  });
  console.log(data, "data");
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
            Overtime Requests
          </h1>
        </div>
      </div>
      <Card>
        <CardContent>
          <h1 className="my-3">
            <span className="font-semibold">Approval Details</span>
          </h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="">Approved Name:</h1>
              <span className="font-semibold">{`${data?.createdBy?.firstName} ${data?.createdBy?.lastName}`}</span>
            </div>
            <div className="flex items-center gap-2">
              <h1 className="">Requested By:</h1>
              <span className="font-semibold">{`${data?.createdBy?.firstName} ${data?.createdBy?.lastName}`}</span>
            </div>
            <div className="flex items-center gap-2">
              <h1 className="">Requested Date:</h1>
              <span className="font-semibold">
                {data?.createdAt
                  ? format(data?.createdAt, "MMM dd, yyyy")
                  : "-"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="mt-4">
        <CardHeader>
          <span className="font-semibold">Overtime Request Details</span>
        </CardHeader>
        <CardContent>
          <div className="flex text-sm items-start justify-between gap-4">
            {/* Row 1 */}
            <div>
              <div className="flex gap-2 items-center">
                <span>Start Date:</span>
                <span className="font-semibold">
                  {data?.overtimeDate
                    ? format(data?.overtimeDate, "MMM dd, yyyy")
                    : "-"}
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <span>Start Time:</span>
                <span className="font-semibold">{data?.startTime}</span>
              </div>
              <div className="flex gap-2 items-center">
                <span>Department:</span>
                <span className="font-semibold">
                  {data?.department?.name || "Not Assigned"}
                </span>
              </div>
            </div>
            {/* Row 2 */}
            <div>
              <div className="flex gap-2 items-center">
                <span>End Date:</span>
                <span className="font-semibold">
                  {data?.overtimeDate && data?.totalHours
                    ? format(
                        addHours(new Date(data.overtimeDate), 54),
                        "MMM dd, yyyy",
                      )
                    : "-"}
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <span>End Time:</span>
                <span className="font-semibold">{data?.endTime}</span>
              </div>
              <div className="flex gap-2 items-center">
                <span>Overtime not to Exceed:</span>
                <span className="font-semibold">{data?.totalHours}Hrs</span>
              </div>
            </div>
            {/* Row 3 */}
            <div className="flex gap-2 items-center">
              <span>Overtime Justification:</span>
              <span className="font-semibold">
                {data?.createdBy?.department?.name || "-"}
              </span>
            </div>
          </div>

          <div className="my-10">
            <p className="font-medium mt-2">Employee List</p>
            {/* <ListsTable data={[]} columns={columns} /> */}
            <ListsTable
              data={data?.employees ? data.employees : []}
              columns={columns}
            />
          </div>

          {/* Approve logs over here */}
        </CardContent>
      </Card>
    </PageWrapper>
  );
}

export default Page;
