"use client";
import { Button, Icon } from "@/components/ui";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";
import React, { useEffect, useState } from "react";
import { FilterBtn, QcDashboardDto } from "../types";
import { useLazyGetApiV1ReportQcDashboardQuery } from "@/lib/redux/api/openapi.generated";
import { DashboardCard } from "./features/card";
import { EMaterialKind, getDateRange } from "@/lib";
import QcDashboardSkeleton from "./ladingSkeleton";

function Index() {
  const [stpMaterialKind, setStpMaterialKind] = useState<EMaterialKind>(
    EMaterialKind.Raw,
  );
  const [batchTestMaterialKind, setBatchTestMaterialKind] =
    useState<EMaterialKind>(EMaterialKind.Raw);
  const [loadReport, { data, isLoading, isFetching }] =
    useLazyGetApiV1ReportQcDashboardQuery({});

  useEffect(() => {
    loadReport({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleFilterClick = async (filter: string) => {
    const { startDate, endDate } = getDateRange(filter);
    await loadReport({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    });
  };
  if (isLoading || isFetching) return <QcDashboardSkeleton />;
  return (
    <ScrollablePageWrapper className="space-y-4">
      <div className="flex w-full items-center justify-between gap-4">
        <div className="">
          <PageTitle title="QC Dashboard" />
          <div className="flex items-center gap-2 justify-start">
            <Icon
              name="RefreshCw"
              size={"14"}
              className="text-primary-default font-bold"
            />
            <span className="text-sm text-gray-700">
              Last refreshed, 30 minutes ago
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {FilterBtn.map((btn) => (
              <Button
                key={btn}
                variant="outline"
                className="text-sm p-2"
                onClick={() => handleFilterClick(btn)}
              >
                {isLoading || isFetching ? (
                  <Icon
                    name="LoaderCircle"
                    size={"14"}
                    className="animate-spin mr-2"
                  />
                ) : (
                  <Icon name="RefreshCw" size={"14"} />
                )}
                <span>{btn}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
      <DashboardCard
        stpMaterialKind={stpMaterialKind}
        batchTestMaterialKind={batchTestMaterialKind}
        data={data as unknown as QcDashboardDto}
        onMaterialKindChange={setStpMaterialKind}
        onBatchTestMaterialKindChange={setBatchTestMaterialKind}
      />
    </ScrollablePageWrapper>
  );
}

export default Index;
