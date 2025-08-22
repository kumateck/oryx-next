"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button, Card, CardHeader, CardTitle, Icon } from "@/components/ui";
import {
  ErrorResponse,
  PermissionKeys,
  Units,
  convertToLargestUnit,
  convertToSmallestUnit,
  // fullname,
  isErrorResponse,
} from "@/lib";
import {
  InventoryRequisitionSource,
  PostApiV1ProcurementInventorySourceApiArg,
  useGetApiV1ProcurementInventoryByIdQuery,
  usePostApiV1ProcurementInventorySourceMutation,
} from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";

import TableForData from "./table";
import { InventoryRequestDto } from "./type";
import NoAccess from "@/shared/no-access";
import { useUserPermissions } from "@/hooks/use-permission";
import TheAduseiEditorViewer from "@/components/ui/adusei-editor/viewer";
import { format } from "date-fns";

const Page = () => {
  const { id } = useParams();
  const router = useRouter();
  const [saveMutation, { isLoading }] =
    usePostApiV1ProcurementInventorySourceMutation();
  const { data: requisition } = useGetApiV1ProcurementInventoryByIdQuery({
    id: id as string,
  });

  const [purchaseLists, setPurchaseLists] = useState<InventoryRequestDto[]>([]);

  useEffect(() => {
    if (requisition) {
      const items = requisition?.items?.map((item) => ({
        code: item?.item?.code,
        itemName: item?.item?.name,
        itemId: item?.item?.id,
        uom: convertToLargestUnit(item.uoM as number, item.uoM?.symbol as Units)
          .unit,
        quantity: convertToLargestUnit(
          item?.quantity as number,
          item.uoM?.symbol as Units,
        ).value,
        uomId: item?.item?.unitOfMeasure?.id,
        vendors: [],
        options: [],
      })) as unknown as InventoryRequestDto[];
      setPurchaseLists(items);
    }
  }, [requisition]);

  const onSubmit = async () => {
    // Only check vendors when source === 0
    const hasEmptyVendors = purchaseLists?.some(
      (item) =>
        Number(item.source) === 0 &&
        (!item.vendors || item.vendors.length === 0),
    );

    if (hasEmptyVendors) {
      toast.warning(
        "One or more vendor-sourced items are missing vendor selection.",
      );
      return; // stop execution if validation fails
    }

    try {
      const payload: PostApiV1ProcurementInventorySourceApiArg = {
        createSourceInventoryRequisition: {
          inventoryPurchaseRequisitionId: id as string,
          items: purchaseLists?.map((item) => ({
            source: Number(item.source) as InventoryRequisitionSource,
            itemId: item.itemId,
            quantity: convertToSmallestUnit(item.quantity, item.uom as Units)
              .value,
            vendors:
              Number(item.source) === 0
                ? (item?.vendors?.map((v) => ({ vendorId: v?.value })) ?? [])
                : [],
            uomId: item.uomId,
          })),
        },
      };

      await saveMutation(payload).unwrap();
      toast.success("Sourcing created successfully");
      router.push("/extrals/purchase-requisition-sourcing");
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  // console.log(requisition, "requisition");

  // Check Permision
  const { hasPermissionAccess } = useUserPermissions();
  // check permissions access
  const hasAccess = hasPermissionAccess(
    PermissionKeys.procurement.viewPurchaseRequisitions,
  );

  if (!hasAccess) {
    //redirect to no access
    return <NoAccess />;
  }
  return (
    <ScrollablePageWrapper className="space-y-4">
      <div className="flex w-full justify-between gap-4">
        <div
          onClick={() => router.back()}
          className="flex hover:underline items-center w-full gap-2"
        >
          <Icon
            name="ArrowLeft"
            className="h-5 w-5 cursor-pointer text-neutral-500"
          />
          <span className="text-2xl font-semibold">
            Purchase Requisition Sourcing
          </span>
        </div>

        <Button className="flex gap-2" onClick={onSubmit}>
          {isLoading && <Icon name="LoaderCircle" className="animate-spin" />}
          <span>Save</span>
        </Button>
      </div>
      <Card className="">
        <CardHeader className="space-y-2">
          <span className="text-white w-fit bg-gray-500 rounded-lg px-2 py-1 text-xs">
            Pending
          </span>
          <CardTitle>{requisition?.code}</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-2 md:grid-cols-3 p-5">
          <div className="flex items-center justify-start gap-2">
            <span>Requested Date:</span>
            <span className="font-semibold">
              {requisition?.createdAt &&
                format(requisition.createdAt, "MMM d, yyyy")}
            </span>
          </div>
          <div className="flex items-center justify-start gap-2">
            <span>Expected Delivery Date:</span>
            <span className="font-semibold">
              {requisition?.expectedDeliveryDate &&
                format(requisition.expectedDeliveryDate, "MMM d, yyyy")}
            </span>
          </div>
          <div className="flex items-center justify-start gap-2">
            <span>Orded Items:</span>
            <span className="font-semibold">
              {requisition?.items?.length || 0}
            </span>
          </div>
          <div className="flex items-center justify-start gap-2">
            <span>Remarks:</span>
            <span className="font-semibold">
              <TheAduseiEditorViewer content={requisition?.remarks as string} />
            </span>
          </div>
        </div>
      </Card>
      <div className="w-full">
        <div className="space-y-2">
          <TableForData
            lists={purchaseLists || []}
            setItemLists={setPurchaseLists}
          />
        </div>
      </div>
    </ScrollablePageWrapper>
  );
};

export default Page;
