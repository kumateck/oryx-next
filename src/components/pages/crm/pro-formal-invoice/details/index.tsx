"use client";
import PageWrapper from "@/components/layout/wrapper";
import { Card, CardHeader, Icon } from "@/components/ui";
import { useLazyGetApiV1ProductionOrdersProformaInvoicesByIdQuery } from "@/lib/redux/api/openapi.generated";
import PageTitle from "@/shared/title";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import LoadingSkeleton from "./loadingSkeleton";
import { format } from "date-fns";

function Index() {
  const router = useRouter();
  const { id } = useParams();
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
      <div className="flex items-center gap-2">
        <div onClick={() => router.back()}>
          <Icon name="ArrowLeft" className="h-5 w-5 cursor-pointer" />
        </div>
        <PageTitle title="Pro-Forma Invoice Details" />
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
        </CardHeader>
      </Card>
    </PageWrapper>
  );
}

export default Index;
