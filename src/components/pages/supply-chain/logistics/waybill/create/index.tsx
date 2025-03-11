"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button, Card, CardTitle } from "@/components/ui";
import { Option } from "@/lib";
import {
  useGetApiV1ProcurementShipmentInvoiceByIdQuery,
  useGetApiV1ProcurementShipmentInvoiceQuery,
} from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";

import WaybillForm from "./form";
import TableForData from "./table";
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

  const selectedInvoiceId = watch("invoiceId");
  const router = useRouter();

  const onSubmit = async () => {};

  const { data: selectedInvoice } =
    useGetApiV1ProcurementShipmentInvoiceByIdQuery(
      { id: selectedInvoiceId?.value },
      { skip: !selectedInvoiceId },
    );

  const { data: invoices } = useGetApiV1ProcurementShipmentInvoiceQuery({
    page: 1,
    pageSize: 100,
  });

  const invoiceOptions = invoices?.data?.map((invoice) => ({
    label: `${invoice?.code}`,
    value: String(invoice.id),
  })) as Option[];

  return (
    <ScrollablePageWrapper>
      <div className="space-y-3">
        <PageTitle title="Create Waybill" />

        <div>
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <WaybillForm
              control={control}
              register={register}
              errors={errors}
              invoiceOptions={invoiceOptions}
            />
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
          </form>
        </div>

        {selectedInvoice?.items?.map((item) => (
          <Card key={item.id} className="space-y-4 p-5">
            <CardTitle>Invoice Item</CardTitle>
            <TableForData
              lists={[]}
              // Remove setItemLists if not used for editing
              setItemLists={() => {}}
            />
          </Card>
          // <h3 key={shelf.id}>I should appear</h3>
        ))}
      </div>
    </ScrollablePageWrapper>
  );
};

export default Create;
