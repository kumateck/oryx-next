"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Card, CardContent, CardTitle, Icon } from "@/components/ui";
import {
  PermissionKeys,
  Section,
  ShipmentStatus,
  findRecordWithAccess,
  isImageFile,
  splitWords,
} from "@/lib";
import { useGetApiV1ProcurementShipmentDocumentByShipmentDocumentIdQuery } from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";

import { MaterialRequestDto } from "../create/type";
import TableForData from "./table";
import { useSelector } from "@/lib/redux/store";
import NoAccess from "@/shared/no-access";

/* eslint-disable @next/next/no-img-element */

const statusColors: Record<ShipmentStatus, string> = {
  [ShipmentStatus.New]: "bg-blue-100 text-blue-800",
  [ShipmentStatus.InTransit]: "bg-yellow-100 text-yellow-800",
  [ShipmentStatus.Cleared]: "bg-purple-100 text-purple-800",
  [ShipmentStatus.Arrived]: "bg-green-100 text-green-800",
};

const ShipmentDocumentDetails = () => {
  const { id } = useParams();
  const shipmentDocumentId = id as string;
  const router = useRouter();
  const { data } =
    useGetApiV1ProcurementShipmentDocumentByShipmentDocumentIdQuery({
      shipmentDocumentId,
    });
  const [materialLists, setMaterialLists] = useState<MaterialRequestDto[]>([]);

  useEffect(() => {
    if (data?.shipmentInvoice?.items) {
      const payload = data.shipmentInvoice.items.map((item) => ({
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

  //Check Permision
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  // check permissions here
  const permissions = useSelector(
    (state) => state.persistedReducer?.auth?.permissions,
  ) as Section[];
  // check permissions access
  const hasAccess = findRecordWithAccess(
    permissions,
    PermissionKeys.logistics.viewShipmentDocument,
  );

  if (isClient && !hasAccess) {
    //redirect to no access
    return <NoAccess />;
  }

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
          <PageTitle title={"Shipment Document List"} />
        </div>
      </div>

      <div className="my-5 space-y-3">
        <Card>
          <CardContent className="space-y-4 py-2">
            <div
              className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                data?.status !== undefined && data?.status !== null
                  ? statusColors[data.status as ShipmentStatus]
                  : "bg-gray-500 text-white"
              }`}
            >
              {data?.status !== undefined && data?.status !== null
                ? splitWords(ShipmentStatus[data.status as ShipmentStatus])
                : "Pending"}
            </div>
            <div className="flex justify-start gap-4">
              <div className="w-full space-y-2">
                <span className="font-Medium block text-lg">
                  Shipment Document Information
                </span>
                <div className="grid w-full grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <span className="text-sm font-normal text-neutral-secondary">
                      Shipment Document Code:{" "}
                    </span>
                    <span className="text-sm font-normal text-neutral-dark">
                      {data?.code}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-sm font-normal text-neutral-secondary">
                      Supplier Name:{" "}
                    </span>
                    <span className="text-sm font-normal text-neutral-dark">
                      {data?.shipmentInvoice?.supplier?.name}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-sm font-normal text-neutral-secondary">
                      Invoice Number:{" "}
                    </span>
                    <span className="text-sm font-normal text-neutral-dark">
                      {data?.shipmentInvoice?.code}
                    </span>
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
            <span className="text-sm text-gray-500">Invoice Items</span>
          </CardTitle>
          <TableForData lists={materialLists} setItemLists={setMaterialLists} />
        </Card>
      </div>

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
                    className="group flex items-center justify-between rounded p-2"
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
                            <img
                              src={attachment.link as string}
                              alt={attachment.name as string}
                              className="h-24 w-24 cursor-pointer rounded border object-cover transition-shadow hover:shadow-md"
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

export default ShipmentDocumentDetails;
