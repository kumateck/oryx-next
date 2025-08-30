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

  const { data: suppliers } = useGetApiV1ProcurementPurchaseOrderNotLinkedQuery(
    {},
  );

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
    // Early return if no purchaseOrderIds or purchaseOrders
    if (!purchaseOrderIds?.length || !purchaseOrders?.length) {
      setPoLists([]);
      return;
    }

    // Get selected PO IDs while maintaining order of selection
    const selectedPoIds = purchaseOrderIds.map((item) => item.value);

    // Filter purchase orders based on selected IDs and maintain the selection order
    const filteredArray = selectedPoIds
      .map((poId) => purchaseOrders.find((po) => po.id === poId))
      .filter(Boolean); // Remove any undefined values

    // Create a Set for quick lookup to avoid duplicates
    const processedIds = new Set<string>();

    const formatArray = filteredArray
      .filter((item) => {
        // Ensure we don't process the same PO twice
        if (processedIds.has(item?.id as string)) {
          return false;
        }
        processedIds.add(item?.id as string);
        return true;
      })
      .map((item) => {
        const items = item?.items?.map((x) => {
          const remainingQuantity =
            (x?.quantity || 0) -
            (x?.quantityInvoiced || x?.receivedQuantity || 0);

          const initialQuantity = convertToLargestUnit(
            x.quantity as number,
            x.uom?.symbol as Units,
          );
          const converted = convertToLargestUnit(
            remainingQuantity as number,
            x.uom?.symbol as Units,
          );

          const totalCost = ((x.price || 0) * (converted.value || 0)).toFixed(
            2,
          );

          // Remove duplicate manufacturers more efficiently
          const manufacturers = x.manufacturers?.filter(
            (item, index, self) =>
              index ===
              self.findIndex(
                (m) => m?.manufacturer?.id === item?.manufacturer?.id,
              ),
          );

          const defaultManufacturer = manufacturers?.find(
            (item) => item.default,
          );
          const otherManufacturers = manufacturers?.filter(
            (item) => !item.default,
          );

          return {
            materialId: x.material?.id as string,
            uomId: x.uom?.id as string,
            materialName: x.material?.name as string,
            expectedQuantity: converted.value,
            uomName: converted.unit,
            receivedQuantity: converted.value,
            initialQuantity: initialQuantity.value,
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
            options: otherManufacturers?.map((item) => ({
              label: item.manufacturer?.name,
              value: item.manufacturer?.id,
            })),
          };
        }) as MaterialRequestDto[];

        return {
          id: item?.id as string,
          code: item?.code as string,
          items,
        };
      }) as invoiceItemsDto[];

    setPoLists(formatArray);
  }, [purchaseOrderIds, purchaseOrders]);

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
  };

  const updateParentState = (
    poId: string,
    updatedItem: MaterialRequestDto[],
  ) => {
    setPoLists((prevPoLists) => {
      const index = prevPoLists.findIndex((item) => item.id === poId);
      if (index !== -1) {
        const updatedLists = [...prevPoLists];
        updatedLists[index] = {
          ...updatedLists[index],
          items: updatedItem,
        };
        return updatedLists;
      }
      return prevPoLists;
    });
  };

  return (
    <ScrollablePageWrapper className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex w-full items-center justify-between space-y-4">
          <div
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <Icon name="ArrowLeft" />
            <div>Back to Shipment Invoice List</div>
          </div>
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
            />
          </CardContent>
        </Card>
      </form>

      {poLists?.map((item) => (
        <div className="w-full space-y-4" key={item.id}>
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
