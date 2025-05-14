"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button, Card, Icon } from "@/components/ui";
import {
  ErrorResponse,
  PermissionKeys,
  RequisitionType,
  Section,
  Units,
  convertToLargestUnit,
  convertToSmallestUnit,
  findRecordWithAccess,
  fullname,
  isErrorResponse,
} from "@/lib";
import {
  CreateSourceRequisitionRequest,
  PostApiV1RequisitionSourceApiArg,
  ProcurementSource,
  useGetApiV1RequisitionByRequisitionIdQuery,
  usePostApiV1RequisitionSourceMutation,
} from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";

import TableForData from "./table";
import { MaterialRequestDto } from "./type";
import NoAccess from "@/shared/no-access";
import { useSelector } from "@/lib/redux/store";

const Page = () => {
  const { id } = useParams();
  const router = useRouter();
  const [saveMutation, { isLoading }] = usePostApiV1RequisitionSourceMutation();
  const { data: requisition } = useGetApiV1RequisitionByRequisitionIdQuery({
    requisitionId: id as string,
  });

  const [purchaseLists, setPurchaseLists] = useState<MaterialRequestDto[]>([]);

  useEffect(() => {
    if (requisition) {
      const items = requisition?.items?.map((material) => ({
        code: material.material?.code,
        materialName: material.material?.name,
        materialId: material.material?.id,
        uom: convertToLargestUnit(
          material.quantity as number,
          material.uoM?.symbol as Units,
        ).unit,
        quantity: convertToLargestUnit(
          material.quantity as number,
          material.uoM?.symbol as Units,
        ).value,
        uomId: material.uoM?.id,
        source: "",
        sourceSuppliers: [],
        options: [],
      })) as unknown as MaterialRequestDto[];
      setPurchaseLists(items);
    }
  }, [requisition]);

  const onSubmit = async () => {
    try {
      const payload = {
        requisitionId: id as string,
        items: purchaseLists?.map((item) => ({
          source: Number(item.source) as ProcurementSource,
          materialId: item.materialId,
          quantity: convertToSmallestUnit(item.quantity, item.uom as Units)
            .value,
          suppliers: item.sourceSuppliers?.map((item) => {
            return {
              supplierId: item?.value,
            };
          }),
          uoMId: item.uomId,
        })),
      } satisfies CreateSourceRequisitionRequest;
      // console.log(payload, "payload");
      await saveMutation({
        createSourceRequisitionRequest: payload,
      } as PostApiV1RequisitionSourceApiArg);
      toast.success("Sourcing created successfully");
      router.push("/procurement/requisition");
      // reset(); // Reset the form after submission
      // onClose(); // Close the form/modal if applicable
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };
  // console.log(requisition, "requisition");

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
    PermissionKeys.procurement.sourceItemsBasedOnRequisition,
  );

  if (isClient && !hasAccess) {
    //redirect to no access
    return <NoAccess />;
  }
  return (
    <ScrollablePageWrapper className="space-y-4">
      <div className="flex w-full justify-between gap-4">
        <span className="text-2xl font-semibold">Requisition Sourcing</span>
        <Button className="flex gap-2" onClick={onSubmit}>
          {isLoading && <Icon name="LoaderCircle" className="animate-spin" />}
          <span>Save</span>
        </Button>
      </div>
      <Card className="p-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="w-full space-y-2">
            <ul>
              <li>
                <span className="text-sm font-semibold">Requisition Code:</span>{" "}
                <span>{requisition?.code}</span>
              </li>
              <li>
                <span className="text-sm font-semibold">Requisition Type:</span>{" "}
                <span>
                  {
                    RequisitionType[
                      requisition?.requisitionType as RequisitionType
                    ]
                  }
                </span>
              </li>
              <li>
                <span className="text-sm font-semibold">Deparment:</span>{" "}
                <span>{requisition?.requestedBy?.department?.name}</span>
                <span>
                  {" "}
                  by: (
                  {fullname(
                    requisition?.requestedBy?.firstName as string,
                    requisition?.requestedBy?.lastName as string,
                  )}
                  )
                </span>
              </li>
              <li>
                <span className="text-sm font-semibold">Comments</span>
                <p>{requisition?.comments}</p>
              </li>
            </ul>
          </div>
        </div>
      </Card>
      <div className="w-full">
        <div className="space-y-2">
          <TableForData lists={purchaseLists} setItemLists={setPurchaseLists} />
        </div>
      </div>
    </ScrollablePageWrapper>
  );
};

export default Page;
