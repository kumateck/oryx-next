"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { Button, Card, CardContent, Icon } from "@/components/ui";
import {
  ErrorResponse,
  Option,
  Units,
  convertToLargestUnit,
  convertToSmallestUnit,
  isErrorResponse,
} from "@/lib";
import {
  CreateShipmentInvoice,
  PostApiV1ProcurementShipmentInvoiceApiArg,
  useGetApiV1ProcurementPurchaseOrderNotLinkedQuery,
  useLazyGetApiV1ProcurementPurchaseOrderSupplierBySupplierIdNotLinkedQuery,
  usePostApiV1ProcurementShipmentInvoiceMutation,
} from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";

import DocumentForm from "./form";
import PurchaseOrders from "./pos";
import {
  CreateInvoiceValidator,
  InvoiceRequestDto,
  MaterialRequestDto,
  invoiceItemsDto,
} from "./type";

const Page = () => {
  const router = useRouter();
  const [saveMutation, { isLoading }] =
    usePostApiV1ProcurementShipmentInvoiceMutation();

  const { data: suppliers } =
    useGetApiV1ProcurementPurchaseOrderNotLinkedQuery();

  const [loadPurchaseOrder, { data: purchaseOrders }] =
    useLazyGetApiV1ProcurementPurchaseOrderSupplierBySupplierIdNotLinkedQuery();

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

  const [poLists, setPoLists] = useState<invoiceItemsDto[]>([]);
  const supplierId = useWatch<InvoiceRequestDto>({
    control,
    name: "supplierId",
  }) as Option;

  const purchaseOrderIds = useWatch<InvoiceRequestDto>({
    control,
    name: "purchaseOrderIds",
  }) as Option[];

  useEffect(() => {
    if (supplierId?.value) {
      loadPurchaseOrder({
        supplierId: supplierId.value,
      });
      setValue("purchaseOrderIds", []);
      setPoLists([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supplierId]);

  useEffect(() => {
    const array2Values = purchaseOrderIds?.map((item) => item.value);

    const filteredArray = purchaseOrders?.filter((item) =>
      array2Values.includes(item?.id as string),
    );

    // console.log(filteredArray, "filteredArray");
    const formatArray = filteredArray?.map((item) => {
      const items = item.items?.map((x) => {
        const converted = convertToLargestUnit(
          x.quantity as number,
          x.uom?.symbol as Units,
        );

        const totalCost = ((x.price || 0) * (converted.value || 0)).toFixed(2);
        const defaultManufacturer = x.manufacturers?.find(
          (item) => item.default,
        );
        return {
          materialId: x.material?.id as string,
          uomId: x.uom?.id as string,
          materialName: x.material?.name as string,
          expectedQuantity: converted.value,
          uomName: converted.unit,
          receivedQuantity: converted.value,
          reason: "",
          manufacturerId: {
            label: defaultManufacturer?.manufacturer?.name,
            value: defaultManufacturer?.manufacturer?.id,
          },
          purchaseOrderId: item.id as string,
          purchaseOrderCode: item.code as string,
          code: x.material?.code as string,
          costPrice: x.price?.toString(),
          totalCost: totalCost?.toString(),
          options: x.manufacturers?.map((item) => ({
            label: item.manufacturer?.name,
            value: item.manufacturer?.id,
          })),
        };
      }) as MaterialRequestDto[];
      return {
        id: item.id as string,
        code: item.code as string,
        items,
      };
    }) as invoiceItemsDto[];
    setPoLists(formatArray);
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
    const flatItems = poLists.flatMap((obj) => obj.items);
    const payload = {
      code: data.code,
      supplierId: data.supplierId?.value,
      items: flatItems?.map((item) => {
        return {
          materialId: item.materialId,
          uoMId: item.uomId,
          manufacturerId: item.manufacturerId?.value,
          purchaseOrderId: item.purchaseOrderId,
          expectedQuantity: convertToSmallestUnit(
            item.expectedQuantity,
            item.uomName as Units,
          ).value,
          receivedQuantity: convertToSmallestUnit(
            item.receivedQuantity,
            item.uomName as Units,
          ).value,
          reason: item.reason,
        };
      }),
    } satisfies CreateShipmentInvoice;
    try {
      await saveMutation({
        createShipmentInvoice: payload,
      } as PostApiV1ProcurementShipmentInvoiceApiArg).unwrap();

      toast.success("Shipment Invoice Created");
      router.push("/logistics/shipment-invoices");
    } catch (error) {
      console.log(error, "errors");
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
    // console.log(materialLists, "materialLists");
  };

  // console.log(poLists, "poLists");
  // const [materialLists, setMaterialLists] = useState<MaterialRequestDto[]>([]);

  const updateParentState = (
    poId: string,
    updatedItem: MaterialRequestDto[],
  ) => {
    const index = poLists?.findIndex((item) => item.id === poId);
    if (index !== undefined && index !== null && index !== -1) {
      const updatedLists = [...poLists];
      updatedLists[index] = {
        ...updatedLists[index],
        items: updatedItem,
      };
      setPoLists(updatedLists);
    }
  };
  return (
    <ScrollablePageWrapper className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex w-full items-center justify-between space-y-4">
          <PageTitle title="Create Shipment Invoice" />
          <Button>
            {isLoading && <Icon name="LoaderCircle" className="animate-spin" />}
            <span>Save Changes</span>
          </Button>
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
              poId={item.id}
              updateParentState={updateParentState}
              lists={item.items}
            />
          )}
        </div>
      ))}
    </ScrollablePageWrapper>
  );
};

export default Page;
