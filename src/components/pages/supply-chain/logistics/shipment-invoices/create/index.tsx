"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui";
import {
  ErrorResponse,
  Option,
  Units,
  convertToLargestUnit,
  isErrorResponse,
} from "@/lib";
import {
  CreateShipmentDocumentRequest,
  PostApiV1ProcurementShipmentDocumentApiArg,
  PurchaseOrderDtoRead,
  useGetApiV1ProcurementPurchaseOrderNotLinkedQuery,
  useLazyGetApiV1ProcurementPurchaseOrderSupplierBySupplierIdNotLinkedQuery,
  usePostApiV1ProcurementShipmentDocumentMutation,
} from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";

import DocumentForm from "./form";
import PurchaseOrders from "./pos";
import {
  CreateInvoiceValidator,
  InvoiceRequestDto,
  MaterialRequestDto,
} from "./type";

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
  const { data: suppliers } =
    useGetApiV1ProcurementPurchaseOrderNotLinkedQuery();

  const [loadPurchaseOrder, { data: purchaseOrders }] =
    useLazyGetApiV1ProcurementPurchaseOrderSupplierBySupplierIdNotLinkedQuery();

  // console.log(purchaseOrders, "purchaseOrders");
  const poOptions = purchaseOrders?.map((item) => {
    return {
      label: item.code,
      value: item?.id,
    };
  }) as Option[];
  const suppliersOptions = suppliers?.map((item) => {
    return {
      label: item.name,
      value: item?.id,
    };
  }) as Option[];
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<InvoiceRequestDto>({
    resolver: CreateInvoiceValidator,
    mode: "all",
  });

  // const purchaseOrderOptions = purchaseOrders?.data?.map((item) => {
  //   return {
  //     label: item.supplier?.name + "-" + item.code,
  //     value: item?.id,
  //   };
  // }) as Option[];

  const [poLists, setPoLists] = useState<PurchaseOrderDtoRead[]>([]);
  const vendorId = useWatch<InvoiceRequestDto>({
    control,
    name: "vendorId",
  }) as Option;

  const purchaseOrderIds = useWatch<InvoiceRequestDto>({
    control,
    name: "purchaseOrderIds",
  }) as Option[];

  // console.log(purchaseOrderIds, "purchaseOrderIds");
  useEffect(() => {
    if (vendorId?.value) {
      loadPurchaseOrder({
        supplierId: vendorId.value,
      });
      setValue("purchaseOrderIds", []);
      setPoLists([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vendorId]);

  useEffect(() => {
    // if (purchaseOrderIds?.length > 0 && Number(purchaseOrderIds?.length) > 0) {
    // purchaseOrders

    const array2Values = purchaseOrderIds?.map((item) => item.value);

    const filteredArray = purchaseOrders?.filter((item) =>
      array2Values.includes(item?.id as string),
    );

    console.log(filteredArray, "filteredArray");
    setPoLists(filteredArray as PurchaseOrderDtoRead[]);
    // }
  }, [purchaseOrderIds, purchaseOrders]);

  // const handleLoadPO = async () => {
  //   // const res = await loadPurchaseOrder({}).unwrap();
  // };
  // useEffect(() => {
  //   if (poOptions?.value) {
  //     loadPurchaseOrderDetailsHandler(poOptions.value);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [poOptions]);

  // const loadPurchaseOrderDetailsHandler = async (poId: string) => {
  //   const res = await loadPurchaseOrder({
  //     purchaseOrderId: poId,
  //   }).unwrap();

  //   const payload = res?.items?.map((item) => ({
  //     materialId: item.material?.id as string,
  //     uomId: item.uom?.id as string,
  //     expectedQuantity: item.quantity as number,
  //     materialName: item.material?.name as string,
  //     uomName: item.uom?.name as string,
  //     receivedQuantity: item.quantity as number,
  //     reason: "",
  //     code: item.material?.code as string,
  //     costPrice: item.price?.toString(),
  //     options: item.manufacturers?.map((item) => ({
  //       label: item.name,
  //       value: item.id,
  //     })),
  //   })) as MaterialRequestDto[];
  //   setMaterialLists(payload);
  // };

  const onSubmit = async (data: InvoiceRequestDto) => {
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

  // const [materialLists, setMaterialLists] = useState<MaterialRequestDto[]>([]);

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
              suppliersOptions={suppliersOptions}
              poOptions={poOptions}
              // defaultValues={{} as ShipmentRequestDto}
            />
          </CardContent>
        </Card>
      </form>

      {poLists?.map((item, idx) => (
        <div className="w-full space-y-4" key={idx}>
          <PageTitle title={item.code as string} />
          {item.items && (
            <PurchaseOrders
              lists={
                item.items?.map((x) => {
                  const converted = convertToLargestUnit(
                    x.quantity as number,
                    x.uom?.symbol as Units,
                  );
                  console.log(x, "x");
                  return {
                    materialId: x.material?.id as string,
                    uomId: x.uom?.id as string,
                    materialName: x.material?.name as string,
                    expectedQuantity: converted.value,
                    uomName: converted.unit,
                    receivedQuantity: converted.value,
                    reason: "",
                    code: x.material?.code as string,
                    costPrice: x.price?.toString(),
                    options: x.manufacturers?.map((item) => ({
                      label: item.name,
                      value: item.id,
                    })),
                  };
                }) as MaterialRequestDto[]
              }
            />
          )}
        </div>
      ))}
    </ScrollablePageWrapper>
  );
};

export default Page;
