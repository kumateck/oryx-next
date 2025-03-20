"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui";
// import { Button, Icon } from "@/components/ui";
// import { routes } from "@/lib";
import { useLazyGetApiV1ProcurementBillingSheetQuery } from "@/lib/redux/api/openapi.generated";
import { ServerDatatable } from "@/shared/datatable";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";

import { columns } from "./columns";

const Page = () => {
  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);
  const router = useRouter();

  const [loadData, { isFetching, data: result, isLoading }] =
    useLazyGetApiV1ProcurementBillingSheetQuery();

  useEffect(() => {
    loadData({
      page,
      pageSize,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);

  const data = result?.data || [];
  return (
    <ScrollablePageWrapper className="w-full space-y-2 py-1">
      <div className="flex items-center justify-between py-2">
        <PageTitle title="Billing Sheets" />
        <div className="flex items-center justify-end gap-2">
          <Link href={"/logistics/billing-sheets/create"}>
            <Button>Create</Button>
          </Link>
        </div>
      </div>

      <ServerDatatable
        onRowClick={(row) => {
          router.push(`/logistics/billing-sheets/${row.id}`);
        }}
        data={data}
        columns={columns}
        isLoading={isLoading || isFetching}
        setPage={setPage}
        setPageSize={setPageSize}
        // onRowClick={(row) => router.push(`requisition/${row.id}`)}
        meta={{
          pageIndex: 0,
          pageCount: 0,
          totalRecordCount: 0,
          numberOfPagesToShow: 0,
          startPageIndex: 0,
          stopPageIndex: 0,
          pageSize,
        }}
        // meta={{
        //   pageIndex: result?.pageIndex as number,
        //   pageCount: result?.pageCount as number,
        //   totalRecordCount: result?.totalRecordCount as number,
        //   numberOfPagesToShow: result?.numberOfPagesToShow as number,
        //   startPageIndex: result?.startPageIndex as number,
        //   stopPageIndex: result?.stopPageIndex as number,
        //   pageSize,
        // }}
      />
    </ScrollablePageWrapper>
  );
};

export default Page;
