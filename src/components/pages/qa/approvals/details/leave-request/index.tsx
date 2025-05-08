/* eslint-disable @next/next/no-img-element */
"use client";
import { Card, CardContent, CardHeader, Icon } from "@/components/ui";
import { useGetApiV1LeaveRequestByIdQuery } from "@/lib/redux/api/openapi.generated";
import { ListsTable } from "@/shared/datatable";

import React from "react";
import { columns } from "./columns";
import { isImageFile } from "@/lib";
import { format } from "date-fns";
import Link from "next/link";
import TheAduseiEditorViewer from "@/components/ui/adusei-editor/viewer";
// import Link from "next/link";

function LeaveApproval({ id }: { id: string }) {
  const leaveRequestId = id as string;
  const { data } = useGetApiV1LeaveRequestByIdQuery({
    id: leaveRequestId,
  });
  return (
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
              {data?.startDate ? format(data?.startDate, "MMM dd, yyyy") : "-"}
            </span>
          </div>

          {/* Row 2 */}
          <div className="flex gap-2 items-center">
            <span>Staff Number:</span>
            <span className="font-semibold">{data?.employee?.staffNumber}</span>
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
          <div className="flex gap-2 items-center">
            <span>Justification:</span>
            <span className="font-semibold">
              <TheAduseiEditorViewer content={data?.justification as string} />
            </span>
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
  );
}

export default LeaveApproval;
