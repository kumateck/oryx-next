"use client";
import PageWrapper from "@/components/layout/wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Icon,
} from "@/components/ui";
import { useLazyGetApiV1ProductionOrdersByIdQuery } from "@/lib/redux/api/openapi.generated";
import PageTitle from "@/shared/title";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import LoadingSkeleton from "./loadingSkeleton";
import { format } from "date-fns";
import { ListsTable } from "@/shared/datatable";
import { columns } from "./columns";

function Index() {
  const router = useRouter();
  const { id } = useParams();
  const [loadProFormalInvoiceDetial, { data, isLoading }] =
    useLazyGetApiV1ProductionOrdersByIdQuery();

  useEffect(() => {
    if (id) {
      loadProFormalInvoiceDetial({ id: id as string });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (isLoading) return <LoadingSkeleton />;
  return (
    <PageWrapper className="space-y-4">
      <div className="flex items-center gap-2">
        <div onClick={() => router.back()}>
          <Icon name="ArrowLeft" className="h-5 w-5 cursor-pointer" />
        </div>
        <PageTitle title="Production Order Details" />
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-start gap-4 ">
            <div className="pr-2 border-r-2 border-r-gray-700">
              {data?.code}
            </div>
            <div className="pr-2 flex gap-2 items-center border-r-2 border-r-gray-700">
              <span>Created on:</span>
              <span>
                {data?.createdAt && format(data?.createdAt, "dd MMMM, yyyy")}
              </span>
            </div>
            <div className="pr-2 flex items-center gap-2">
              <span>By:</span>
              <span>{`${data?.createdBy?.firstName} ${data?.createdBy?.lastName}`}</span>
            </div>
          </div>
          <div className="mt-6">
            <CardTitle>{data?.customer?.name}</CardTitle>
            <CardDescription>
              <div className="flex w-full items-center justify-between gap-2">
                <div className="space-x-1">
                  <span>Email: </span>
                  <span className="text-gray-800">{data?.customer?.email}</span>
                </div>
                <div className="space-x-1">
                  <span>Phone: </span>
                  <span className="text-gray-800">{data?.customer?.phone}</span>
                </div>
                <div className="space-x-1">
                  <span>Address: </span>
                  <span className="text-gray-800">{data?.customer?.phone}</span>
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
