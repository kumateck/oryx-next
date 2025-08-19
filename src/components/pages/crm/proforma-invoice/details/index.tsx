"use client";
import PageWrapper from "@/components/layout/wrapper";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Icon,
} from "@/components/ui";
import { useLazyGetApiV1ProductionOrdersProformaInvoicesByIdQuery } from "@/lib/redux/api/openapi.generated";
import PageTitle from "@/shared/title";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import LoadingSkeleton from "./loadingSkeleton";
import { format } from "date-fns";
import { columns } from "./columns";
import { ListsTable } from "@/shared/datatable";
import PrintPreview from "./print/printPreview";

function Index() {
  const router = useRouter();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [loadProFormalInvoiceDetial, { data, isLoading }] =
    useLazyGetApiV1ProductionOrdersProformaInvoicesByIdQuery();

  useEffect(() => {
    if (id) {
      loadProFormalInvoiceDetial({ id: id as string });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (isLoading) return <LoadingSkeleton />;
  return (
    <PageWrapper className="space-y-4">
      {open && (
        <PrintPreview
          isOpen={open}
          id={id as string}
          onClose={() => setOpen(false)}
        />
      )}
      <div className="flex items-center justify-between gap-2 w-full">
        <div className="flex items-center gap-2">
          <div onClick={() => router.back()}>
            <Icon name="ArrowLeft" className="h-5 w-5 cursor-pointer" />
          </div>
          <PageTitle title="Proforma Invoice Details" />
        </div>
        <div className="flex items-center gap-2">
          <Button className="flex items-center gap-2">
            <Icon name="Plus" className="h-4 w-4" />
            <span>Create Shipment</span>
          </Button>
          <Button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2"
          >
            <Icon name="Plus" className="h-4 w-4" />
            <span>Generate Invoice</span>
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-start gap-4 ">
            <div className="pr-2 border-r-2 border-r-gray-700">
              {data?.productionOrder?.code}
            </div>
            <div className="pr-2 flex gap-2 items-center border-r-2 border-r-gray-700">
              <span>Created on:</span>
              <span>
                {data?.productionOrder?.createdAt &&
                  format(data?.productionOrder?.createdAt, "dd MMMM, yyyy")}
              </span>
            </div>
            <div className="pr-2 flex items-center gap-2">
              <span>By:</span>
              <span>{`${data?.productionOrder?.createdBy?.firstName} ${data?.productionOrder?.createdBy?.lastName}`}</span>
            </div>
          </div>
          <div className="mt-10 space-y-4">
            <CardTitle className="text-xl font-semibold">
              {data?.productionOrder?.customer?.name}
            </CardTitle>
            <CardDescription>
              <div className="flex w-full items-center justify-between gap-2">
                <div className="space-x-1">
                  <span>Email: </span>
                  <span className="text-gray-800">
                    {data?.productionOrder?.customer?.email}
                  </span>
                </div>
                <div className="space-x-1">
                  <span>Phone: </span>
                  <span className="text-gray-800">
                    {data?.productionOrder?.customer?.phone}
                  </span>
                </div>
                <div className="space-x-1">
                  <span>Address: </span>
                  <span className="text-gray-800">
                    {data?.productionOrder?.customer?.phone}
                  </span>
                </div>
              </div>
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <ListsTable data={data?.products ?? []} columns={columns} />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}

export default Index;
