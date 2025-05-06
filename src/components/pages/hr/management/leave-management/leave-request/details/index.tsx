/* eslint-disable @next/next/no-img-element */
"use client";
import { Button, Card, CardContent, CardHeader, Icon } from "@/components/ui";
import { useGetApiV1LeaveRequestByIdQuery } from "@/lib/redux/api/openapi.generated";
import { ListsTable } from "@/shared/datatable";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { columns } from "./columns";
import { isImageFile, LeaveCategories, LeaveStatus, splitWords } from "@/lib";
import { format } from "date-fns";
import Link from "next/link";
// import Link from "next/link";

const statusColors: Record<LeaveStatus, string> = {
  [LeaveStatus.Pending]: "bg-gray-500 text-white",
  [LeaveStatus.Approved]: "bg-green-500 text-white",
  [LeaveStatus.Rejected]: "bg-red-500 text-white",
};

function LeaveDetails() {
  const { id } = useParams();
  const leaveRequestId = id as string;
  const router = useRouter();
  const { data } = useGetApiV1LeaveRequestByIdQuery({
    id: leaveRequestId,
  });
  return (
    <ScrollablePageWrapper className="space-y-5">
      <div className="flex items-center justify-between">
        <div
          className="group mb-2 flex items-center gap-1 hover:cursor-pointer"
          onClick={() => {
            router.back();
          }}
        >
          <Icon name="ArrowLeft" className="h-5 w-5" />
          <div className="group-hover:underline">
            <PageTitle title={"Leave Request List"} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant={"success"}>Approve</Button>
          <Button variant={"destructive"}>Reject</Button>
        </div>
      </div>

      <div className="mt-3">
        <h2 className="font-semibold">
          {splitWords(
            LeaveCategories[data?.requestCategory as LeaveCategories],
          )}{" "}
          Approval
        </h2>
      </div>

      <Card>
        <CardHeader>
          <div>
            <span
              className={`rounded-full px-2 py-1 text-xs font-medium ${
                data?.leaveStatus !== undefined && data?.leaveStatus !== null
                  ? statusColors[data.leaveStatus as LeaveStatus]
                  : "bg-gray-500 text-white"
              }`}
            >
              {data?.leaveStatus !== undefined && data?.leaveStatus !== null
                ? splitWords(LeaveStatus[data.leaveStatus as LeaveStatus])
                : "Pending"}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <span className="font-semibold">Approval Details</span>

          <div className="flex items-center justify-between mt-1 text-sm">
            <div className="flex gap-2 items-center">
              <span>Approval Name:</span>
              <span className="font-medium">
                {splitWords(
                  LeaveCategories[data?.requestCategory as LeaveCategories],
                )}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <span>Requested By:</span>
              <span className="font-medium">
                {data?.employee?.firstName} {data?.employee?.lastName}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <span>Request Date:</span>
              <span className="font-medium">
                {data?.createdAt ? format(data.createdAt, "MMM dd, yyyy") : "-"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <span className="font-semibold">Leave Request Details</span>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3 place-content-between mt-1 text-sm">
            {/* Row 1 */}
            <div className="flex gap-2 items-center">
              <span>Staff Name:</span>
              <span className="font-semibold">
                {data?.employee?.firstName} {data?.employee?.lastName}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <span>Leave Type:</span>
              <span className="font-semibold">{data?.leaveType?.name}</span>
            </div>
            <div className="flex gap-2 items-center">
              <span>Start Date:</span>
              <span className="font-semibold">
                {data?.startDate
                  ? format(data?.startDate, "MMM dd, yyyy")
                  : "-"}
              </span>
            </div>

            {/* Row 2 */}
            <div className="flex gap-2 items-center">
              <span>Staff Number:</span>
              <span className="font-semibold">
                {data?.employee?.staffNumber}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <span>Contact Person:</span>
              <span className="font-semibold">{data?.contactPerson}</span>
            </div>
            <div className="flex gap-2 items-center">
              <span>End Date:</span>
              <span className="font-semibold">
                {data?.endDate ? format(data?.endDate, "MMM dd, yyyy") : "-"}
              </span>
            </div>

            {/* Row 3 */}
            <div className="flex gap-2 items-center">
              <span>Department:</span>
              <span className="font-semibold">
                {data?.employee?.department?.name || "-"}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <span>Contact Person Number:</span>
              <span className="font-semibold">{data?.contactPersonNumber}</span>
            </div>
          </div>

          <div className="my-10">
            <ListsTable data={data ? [data] : []} columns={columns} />
          </div>

          <div className="mt-5">
            <div className="font-semibold">Attachments</div>
            {data?.attachments?.length ? (
              <>
                <span>Images</span>
                <div className="gap-4 grid grid-cols-3 mt-2">
                  {data.attachments
                    .filter((attachment) =>
                      isImageFile(attachment?.name as string),
                    )
                    .map((attachment) => (
                      <div key={attachment.id} className="group relative">
                        <Link
                          href={attachment.link as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <img
                            src={attachment.link as string}
                            alt={attachment.name as string}
                            className="w-full h-40 object-cover rounded border cursor-pointer transition-shadow hover:shadow-md"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 rounded bg-black bg-opacity-0 transition-opacity group-hover:bg-opacity-20" />
                        </Link>
                      </div>
                    ))}
                </div>

                <span>Documents</span>
                <div className="mt-4 space-y-2">
                  {data.attachments
                    .filter(
                      (attachment) => !isImageFile(attachment?.name as string),
                    )
                    .map((attachment) => (
                      <div
                        key={attachment.id}
                        className="group flex items-center justify-between rounded p-2 hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-2">
                          <Icon
                            name="Paperclip"
                            className="h-4 w-4 text-gray-400"
                          />
                          <Link
                            href={attachment.link as string}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline"
                          >
                            {attachment.name}
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
              </>
            ) : (
              <div className="py-2 text-sm text-gray-500">
                No attachments found
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>Approval Log</CardHeader>
        <CardContent>
          <span className="">Activity Log</span>
        </CardContent>
      </Card>
    </ScrollablePageWrapper>
  );
}

export default LeaveDetails;
