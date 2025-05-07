import { Card, CardContent, CardHeader, Icon } from "@/components/ui";
import { useGetApiV1ProcurementPurchaseOrderByPurchaseOrderIdQuery } from "@/lib/redux/api/openapi.generated";
import { ListsTable } from "@/shared/datatable";
import { format } from "date-fns";
import React from "react";
import { getColumns } from "./columns";
import { isImageFile } from "@/lib";
import Link from "next/link";

interface Props {
  id: string;
}
function POApproval({ id }: Props) {
  const { data } = useGetApiV1ProcurementPurchaseOrderByPurchaseOrderIdQuery({
    purchaseOrderId: id as string,
  });
  return (
    <Card>
      <CardHeader>
        <span className="font-semibold">Purchase Order Summary</span>
      </CardHeader>
      <CardContent>
        <span>{data?.code}</span>
        <div className="grid grid-cols-3 gap-3 place-content-between mt-1 text-sm">
          {/* Row 1 */}
          <div className="flex gap-2 items-center">
            <span>Supplier Name:</span>
            <span className="font-semibold">{data?.supplier?.name}</span>
          </div>
          <div className="flex gap-2 items-center">
            <span>Order Date:</span>
            <span className="font-semibold">
              {data?.createdAt ? format(data?.createdAt, "MMM dd, yyyy") : "-"}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <span>Contact Person:</span>
            <span className="font-semibold">
              {data?.createdBy?.firstName} {data?.createdBy?.lastName}
            </span>
          </div>

          {/* Row 2 */}
          <div className="flex gap-2 items-center">
            <span>Contact Email:</span>
            <span className="font-semibold">{data?.createdBy?.email}</span>
          </div>
          <div className="flex gap-2 items-center">
            <span>Expected Delivery Date:</span>
            <span className="font-semibold">
              {data?.expectedDeliveryDate
                ? format(data?.expectedDeliveryDate, "MMM dd, yyyy")
                : "-"}
            </span>
          </div>
        </div>

        <div className="my-10">
          <ListsTable
            data={data?.items ?? []}
            columns={getColumns(data?.supplier?.currency?.symbol ?? "")}
          />
        </div>

        <div className="mt-5">
          <span className="font-semibold">Attachments</span>
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
                        {/* eslint-disable-next-line @next/next/no-img-element */}
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

export default POApproval;
