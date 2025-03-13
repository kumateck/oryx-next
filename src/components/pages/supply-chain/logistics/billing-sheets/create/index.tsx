"use client";

import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button, Icon } from "@/components/ui";
import { ErrorResponse, Option, cn, isErrorResponse } from "@/lib";
import {
  CreateBillingSheetRequest,
  useGetApiV1CollectionUomQuery,
  useGetApiV1ProcurementShipmentInvoiceQuery,
  useGetApiV1ProcurementSupplierQuery,
  usePostApiV1ProcurementBillingSheetMutation,
} from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";

import BillingSheetForm from "./form";
import { BillingSheetRequestDto, CreateBillingSheetValidator } from "./types";

const CreateBillingSheet = () => {
  const router = useRouter();
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<BillingSheetRequestDto>({
    resolver: CreateBillingSheetValidator,
    mode: "all",
  });

  const { data: invoicesResponse } = useGetApiV1ProcurementShipmentInvoiceQuery(
    {
      page: 1,
      pageSize: 100,
    },
  );

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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "charges",
  });

  const onSubmit = async (data: BillingSheetRequestDto) => {
    const payload = {
      billOfLading: data.billOfLading,
      expectedArrivalDate: data.expectedArrivalDate.toISOString(),
      freeTimeDuration: data.freeTimeDuration.toISOString(),
      // containerSize: data.containerSize,
      numberOfPackages: data.numberOfPackages,
      freeTimeExpiryDate: data.freeTimeExpiryDate.toISOString(),
      demurrageStartDate: data.demurrageStartDate.toISOString(),
      invoiceId: data.invoiceId.value,
      supplierId: data.supplierId.value,
      // uom: data.uom.value,
      // charges: data.charges.map(charge => ({
      //   description: charge.description,
      //   cost: Number(charge.cost),
      // })),
    } satisfies CreateBillingSheetRequest;
    try {
      await createBillingSheet({
        createBillingSheetRequest: payload,
      });
      toast.success("Rack created successfully");
      reset();
      router.push("/logistics/billing-sheet");
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  return (
    <ScrollablePageWrapper>
      <PageTitle title="Create Billing Sheet" />
      <form className="mt-5 w-full" onSubmit={handleSubmit(onSubmit)}>
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
        />

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
      </form>
    </ScrollablePageWrapper>
  );
};

export default CreateBillingSheet;
