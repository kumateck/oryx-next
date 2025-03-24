"use client";

import { format } from "date-fns";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Card, CardContent, CardTitle, Icon } from "@/components/ui";
import { isImageFile } from "@/lib";
import { useGetApiV1ProcurementBillingSheetByBillingSheetIdQuery } from "@/lib/redux/api/openapi.generated";
import { ListsTable } from "@/shared/datatable";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";

import { MaterialRequestDto } from "../create/types";
import { chargesColumns } from "./columns";
import TableForData from "./table";

const BillingSheetDetails = () => {
  const { id } = useParams();
  const billingSheetId = id as string;
  const router = useRouter();
  const { data } = useGetApiV1ProcurementBillingSheetByBillingSheetIdQuery({
    billingSheetId,
  });
  const [materialLists, setMaterialLists] = useState<MaterialRequestDto[]>([]);

  useEffect(() => {
    if (data?.invoice?.items) {
      const payload = data?.invoice.items.map((item) => ({
        materialId: item.material?.id as string,
        uomId: item.uoM?.id as string,
        expectedQuantity: item.expectedQuantity as number,
        materialName: item.material?.name as string,
        uomName: item.uoM?.symbol as string,
        receivedQuantity: item.receivedQuantity as number,
        reason: item.reason as string,
        code: item.material?.code as string,
        costPrice: item.price?.toString(),
        manufacturer: item.manufacturer?.name as string,
        purchaseOrderCode: item?.purchaseOrder?.code as string,
        purchaseOrderId: item?.purchaseOrder?.id as string,
      })) as MaterialRequestDto[];
      setMaterialLists(payload);
    }
  }, [data]);

  return (
    <ScrollablePageWrapper>
      <div
        className="group mb-2 flex items-center gap-1 hover:cursor-pointer"
        onClick={() => {
          router.back();
        }}
      >
        <Icon name="ArrowLeft" className="h-5 w-5" />
        <div className="group-hover:underline">
          <PageTitle title={"Billing Sheet List"} />
        </div>
      </div>

      <div className="my-5 space-y-3">
        <Card>
          <CardContent className="space-y-4 py-2">
            <div className="flex justify-start gap-4">
              <div className="w-full space-y-2">
                <span className="font-Medium block text-lg">
                  Billing Sheet Information
                </span>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div>
                      <span>Bill of Lading No.: </span>
                      <span className="font-bold">{data?.billOfLading}</span>
                    </div>
                    <div>
                      <span>Supplier Name: </span>
                      <span className="font-bold">{data?.supplier?.name}</span>
                    </div>
                    <div>
                      <span>Invoice Number: </span>
                      <span className="font-bold">{data?.invoice?.code}</span>
                    </div>
                  </div>
                  <div>
                    <div>
                      <span>Invoice Amount: </span>
                      <span className="font-bold">
                        {data?.invoice?.totalCost}
                      </span>
                    </div>
                    <div>
                      <span>Arrival Date: </span>
                      <span className="font-bold">
                        {data?.expectedArrivalDate
                          ? format(
                              new Date(data?.expectedArrivalDate),
                              "MMMM dd, yyyy",
                            )
                          : "-"}
                      </span>
                    </div>
                    <div>
                      <span>Free Time Expiry Date: </span>
                      <span className="font-bold">
                        {data?.freeTimeExpiryDate
                          ? format(
                              new Date(data?.freeTimeExpiryDate),
                              "MMMM dd, yyyy",
                            )
                          : "-"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div>
                      <span>Free Time Duration: </span>
                      <span className="font-bold">
                        {data?.freeTimeDuration}
                      </span>
                    </div>
                    <div>
                      <span>Demurrage Start Date: </span>
                      <span className="font-bold">
                        {data?.demurrageStartDate
                          ? format(
                              new Date(data?.demurrageStartDate),
                              "MMMM dd, yyyy",
                            )
                          : "-"}
                      </span>
                    </div>
                    <div>
                      <span>Free Time Expiry Date: </span>
                      <span className="font-bold">
                        {data?.freeTimeExpiryDate
                          ? format(
                              new Date(data?.freeTimeExpiryDate),
                              "MMMM dd, yyyy",
                            )
                          : "-"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-3">
        <Card className="space-y-4 p-5">
          <CardTitle>
            <h3>Container Information</h3>
          </CardTitle>
          <div className="flex gap-6 text-sm">
            <div>
              <span>Container No.: </span>
              <span className="font-bold">{data?.containerNumber}</span>
            </div>
            <div>
              <span>No of Packages: </span>
              <span className="font-bold">{data?.numberOfPackages}</span>
            </div>
          </div>
          <TableForData lists={materialLists} setItemLists={setMaterialLists} />
        </Card>
      </div>

      <h3 className="mb-3 mt-4 text-lg font-semibold">Charges</h3>
      {(data?.charges?.length ?? 0) > 0 &&
      data?.charges?.some(
        (charge) => charge && (charge.name || charge.amount),
      ) ? (
        <div className="w-full">
          <ListsTable
            data={data.charges.filter(
              (charge) => charge && (charge.name || charge.name),
            )}
            columns={chargesColumns}
          />
        </div>
      ) : (
        <p className="text-sm italic text-gray-500">No charges available</p>
      )}

      <div className="my-5 space-y-3">
        <Card>
          <CardContent className="space-y-4 py-2">
            <CardTitle>
              <span className="text-sm text-gray-500">Attachments</span>
            </CardTitle>
            <div className="space-y-2">
              {data?.attachments?.length ? (
                data.attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="group flex items-center justify-between rounded p-2 hover:bg-gray-50"
                  >
                    <div className="flex flex-1 items-center gap-2">
                      {isImageFile(attachment.name as string) ? (
                        <div className="flex items-center gap-2">
                          <Link
                            href={attachment.link as string}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={attachment.link as string}
                              alt={attachment.name as string}
                              className="h-12 w-12 cursor-pointer rounded border object-cover transition-shadow hover:shadow-md"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 rounded bg-black bg-opacity-0 transition-opacity group-hover:bg-opacity-20" />
                          </Link>
                        </div>
                      ) : (
                        <>
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
                        </>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-2 text-sm text-gray-500">
                  No attachments found
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollablePageWrapper>
  );
};

export default BillingSheetDetails;
