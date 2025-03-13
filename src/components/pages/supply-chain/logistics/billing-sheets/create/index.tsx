"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import { Button, Icon } from "@/components/ui";
import { ErrorResponse, Option, cn, isErrorResponse } from "@/lib";
import {
  CreateBillingSheetRequest,
  useGetApiV1CollectionUomQuery,
  useGetApiV1ProcurementShipmentInvoiceQuery,
  useGetApiV1ProcurementSupplierQuery,
  useLazyGetApiV1ProcurementShipmentInvoiceByIdQuery,
  usePostApiV1ProcurementBillingSheetMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";

import BillingSheetForm from "./form";
import {
  BillingSheetRequestDto,
  CreateBillingSheetValidator,
  MaterialRequestDto,
} from "./types";

const CreateBillingSheet = () => {
  const router = useRouter();
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm<BillingSheetRequestDto>({
    resolver: CreateBillingSheetValidator,
    mode: "all",
  });
  const [materialLists, setMaterialLists] = useState<MaterialRequestDto[]>([]);
  const [loadInvoice] = useLazyGetApiV1ProcurementShipmentInvoiceByIdQuery();

  const { data: invoicesResponse } = useGetApiV1ProcurementShipmentInvoiceQuery(
    {
      page: 1,
      pageSize: 100,
    },
  );
  const dispatch = useDispatch();
  const [createBillingSheet, { isLoading }] =
    usePostApiV1ProcurementBillingSheetMutation();

  const { data: supplierResponse } = useGetApiV1ProcurementSupplierQuery({
    page: 1,
    pageSize: 100,
  });

  const { data: packingUomResponse } = useGetApiV1CollectionUomQuery({
    isRawMaterial: false,
  });
  const packingUomOptions = packingUomResponse?.map((uom) => ({
    label: uom.symbol,
    value: uom.id,
  })) as Option[];

  const invoiceData = invoicesResponse?.data || [];
  const invoiceOptions = invoiceData?.map((item) => {
    return {
      label: item.code,
      value: item?.id,
    };
  }) as Option[];

  const supplierData = supplierResponse?.data || [];
  const supplierOptions = supplierData?.map((item) => {
    return {
      label: item.name,
      value: item?.id,
    };
  }) as Option[];

  const selectedInvoiceId = watch("invoiceId");
  const { fields, append, remove } = useFieldArray({
    control,
    name: "charges",
  });

  useEffect(() => {
    if (selectedInvoiceId?.value) {
      loadInvoiceDetailsHandler(selectedInvoiceId.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedInvoiceId]);

  const loadInvoiceDetailsHandler = async (id: string) => {
    const res = await loadInvoice({
      id,
    }).unwrap();

    const payload = res?.items?.map((item) => ({
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
  };

  const onSubmit = async (data: BillingSheetRequestDto) => {
    const payload = {
      billOfLading: data.billOfLading,
      expectedArrivalDate: data.expectedArrivalDate.toISOString(),
      freeTimeDuration: data.freeTimeDuration,
      numberOfPackages: data.numberOfPackages,
      freeTimeExpiryDate: data.freeTimeExpiryDate.toISOString(),
      demurrageStartDate: data.demurrageStartDate.toISOString(),
      invoiceId: data.invoiceId.value,
      supplierId: data.supplierId.value,
    } satisfies CreateBillingSheetRequest;

    try {
      await createBillingSheet({ createBillingSheetRequest: payload }).unwrap();
      toast.success("Billing Sheet Created");
      reset();
      dispatch(commonActions.setTriggerReload());
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  return (
    <ScrollablePageWrapper>
      <PageTitle title="Create Billing Sheet" />
      <form className="mt-5 w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-end gap-4 py-6">
          <Button type="button" variant="secondary" onClick={router.back}>
            Cancel
          </Button>

          <Button variant={"default"} className="flex items-center gap-2">
            <Icon
              name={isLoading ? "LoaderCircle" : "Plus"}
              className={cn("h-4 w-4", {
                "animate-spin": isLoading,
              })}
            />
            <span>Create</span>{" "}
          </Button>
        </div>
        <BillingSheetForm
          register={register}
          control={control}
          errors={errors}
          fields={fields}
          remove={remove}
          append={append}
          invoiceOptions={invoiceOptions}
          supplierOptions={supplierOptions}
          packingUomOptions={packingUomOptions}
          materialLists={materialLists}
          setMaterialLists={setMaterialLists}
        />
      </form>
    </ScrollablePageWrapper>
  );
};

export default CreateBillingSheet;
