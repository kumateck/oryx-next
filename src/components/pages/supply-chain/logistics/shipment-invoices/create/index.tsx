"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui";
import { ErrorResponse, isErrorResponse } from "@/lib";
import {
  CreateShipmentDocumentRequest,
  PostApiV1ProcurementShipmentDocumentApiArg,
  useLazyGetApiV1ProcurementPurchaseOrderByPurchaseOrderIdQuery,
  usePostApiV1ProcurementShipmentDocumentMutation,
} from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";

import { CreateManufacturerValidator, ShipmentRequestDto } from "../types";
import DocumentForm from "./form";
import TableForData from "./table";
import { MaterialRequestDto } from "./type";

const Page = () => {
  const router = useRouter();
  const [saveMutation] = usePostApiV1ProcurementShipmentDocumentMutation();
  // const { data: codeConfig } =
  //   useGetApiV1ConfigurationByModelTypeByModelTypeQuery({
  //     modelType: CODE_SETTINGS.modelTypes.ShipmentDocument,
  //   });
  // const [uploadAttachment, { isLoading: isUploadingAttachment }] =
  //   usePostApiV1FileByModelTypeAndModelIdMutation();
  // const [saveShipmentInvoice, { isLoading: isSavingInvoice }] =
  //   usePostApiV1ProcurementShipmentInvoiceMutation();
  // const [loadPOS, { data: purchaseOrders }] =
  //   useLazyGetApiV1ProcurementPurchaseOrderQuery();

  // console.log(purchaseOrders, "purchaseOrders");
  const [loadPurchaseOrder] =
    useLazyGetApiV1ProcurementPurchaseOrderByPurchaseOrderIdQuery();
  // console.log(isSavingInvoice)
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ShipmentRequestDto>({
    resolver: CreateManufacturerValidator,
    mode: "all",
  });

  // const purchaseOrderOptions = purchaseOrders?.data?.map((item) => {
  //   return {
  //     label: item.supplier?.name + "-" + item.code,
  //     value: item?.id,
  //   };
  // }) as Option[];

  const poOptions = useWatch({
    control,
    name: "purchaseOrderId",
  });

  // const handleLoadPO = async () => {
  //   // const res = await loadPurchaseOrder({}).unwrap();
  // };
  useEffect(() => {
    if (poOptions?.value) {
      loadPurchaseOrderDetailsHandler(poOptions.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poOptions]);

  const loadPurchaseOrderDetailsHandler = async (poId: string) => {
    const res = await loadPurchaseOrder({
      purchaseOrderId: poId,
    }).unwrap();

    const payload = res?.items?.map((item) => ({
      materialId: item.material?.id as string,
      uomId: item.uom?.id as string,
      expectedQuantity: item.quantity as number,
      materialName: item.material?.name as string,
      uomName: item.uom?.name as string,
      receivedQuantity: item.quantity as number,
      reason: "",
      code: item.material?.code as string,
      costPrice: item.price?.toString(),
      options: item.manufacturers?.map((item) => ({
        label: item.name,
        value: item.id,
      })),
    })) as MaterialRequestDto[];
    setMaterialLists(payload);
  };

  const onSubmit = async (data: ShipmentRequestDto) => {
    const payload = {
      code: data.code,
      // purchaseOrderId: data.purchaseOrderId.value,
    } satisfies CreateShipmentDocumentRequest;
    try {
      await saveMutation({
        createShipmentDocumentRequest: payload,
      } as PostApiV1ProcurementShipmentDocumentApiArg).unwrap();

      toast.success("Shipment Document Created");
      router.push("/logistics/shipment-documents");
    } catch (error) {
      console.log(error, "errors");
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
    // console.log(materialLists, "materialLists");
  };

  const [materialLists, setMaterialLists] = useState<MaterialRequestDto[]>([]);

  return (
    <ScrollablePageWrapper className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex w-full items-center justify-between space-y-4">
          <PageTitle title="Create Shipment Invoice" />
          {/* <Button>
            {(isLoading || isUploadingAttachment || isSavingInvoice) && (
              <Icon name="LoaderCircle" className="animate-spin" />
            )}
            <span>Save Changes</span>
          </Button> */}
        </div>
        <Card>
          <CardContent className="p-5">
            <DocumentForm
              control={control}
              register={register}
              errors={errors}
              purchaseOrderOptions={[]}
              // defaultValues={{} as ShipmentRequestDto}
            />
          </CardContent>
        </Card>
      </form>
      <div className="w-full space-y-4">
        <PageTitle title="Invoice Items" />
        <div className="">
          <TableForData lists={materialLists} setItemLists={setMaterialLists} />
        </div>
      </div>
    </ScrollablePageWrapper>
  );
};

export default Page;
