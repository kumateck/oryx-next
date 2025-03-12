"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui";
import { Option } from "@/lib";
import {
  useGetApiV1ProcurementShipmentInvoiceQuery,
  useLazyGetApiV1ProcurementShipmentInvoiceByIdQuery,
} from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";

import { MaterialRequestDto } from "../../shipment-documents/create/type";
import WaybillForm from "./form";
import { WaybillRequestDto } from "./types";

const Create = () => {
  const {
    control,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WaybillRequestDto>({
    mode: "all",
    defaultValues: {
      invoiceId: undefined,
      supplierName: "",
    },
  });

  const [materialLists, setMaterialLists] = useState<MaterialRequestDto[]>([]);
  const { data: invoicesResponse } = useGetApiV1ProcurementShipmentInvoiceQuery(
    {
      page: 1,
      pageSize: 100,
    },
  );
  const data = invoicesResponse?.data || [];
  const invoiceOptions = data?.map((item) => {
    return {
      label: item.code,
      value: item?.id,
    };
  }) as Option[];

  const selectedInvoiceId = watch("invoiceId");
  const router = useRouter();
  const [loadInvoice] = useLazyGetApiV1ProcurementShipmentInvoiceByIdQuery();

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

  const onSubmit = async () => {};

  return (
    <ScrollablePageWrapper>
      <div className="space-y-3">
        <PageTitle title="Create Waybill" />

        <div>
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center justify-end gap-2">
              <Button type="button" variant="secondary" onClick={router.back}>
                Cancel
              </Button>

              <Button variant={"default"} className="flex items-center gap-2">
                {/* <Icon
                            name={isLoading ? "LoaderCircle" : "Plus"}
                            className={cn("h-4 w-4", {
                              "animate-spin": isLoading,
                            })}
                          /> */}
                <span>Save</span>{" "}
              </Button>
            </div>
            <WaybillForm
              control={control}
              register={register}
              errors={errors}
              invoiceOptions={invoiceOptions}
              materialLists={materialLists}
              setMaterialLists={setMaterialLists}
            />
          </form>
        </div>
      </div>
    </ScrollablePageWrapper>
  );
};

export default Create;
