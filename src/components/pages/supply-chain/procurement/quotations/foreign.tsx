"use client";

import React, { useEffect, useState } from "react";

import PageWrapper from "@/components/layout/wrapper";
import { SupplierType } from "@/lib";
import {
  useGetApiV1RequisitionSourceSupplierQuery,
  useLazyGetApiV1RequisitionSourceSupplierQuery,
} from "@/lib/redux/api/openapi.generated";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";

import { columns } from "./columns";

const Page = () => {
  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);

  const { data: result, isLoading } = useGetApiV1RequisitionSourceSupplierQuery(
    {
      page,
      pageSize,
      source: SupplierType.Foreign,
    },
  );

  const [loadData, { isFetching }] =
    useLazyGetApiV1RequisitionSourceSupplierQuery();

  useEffect(() => {
    loadData({
      page,
      pageSize,
      source: SupplierType.Foreign,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);

  const data = result?.data || [];

  return (
    <PageWrapper className="w-full space-y-2 py-1">
      <div className="flex items-center justify-between py-2">
        <PageTitle title="Foreign Quotation Request" />
        <div className="flex items-center justify-end gap-2"></div>
      </div>

      <ServerDatatable
        data={data}
        columns={columns}
        isLoading={isLoading || isFetching}
        setPage={setPage}
        setPageSize={setPageSize}
        // onRowClick={(row) => router.push(`requisition/${row.supplier?.id}`)}
        meta={{
          pageIndex: result?.pageIndex as number,
          pageCount: result?.pageCount as number,
          totalRecordCount: result?.totalRecordCount as number,
          numberOfPagesToShow: result?.numberOfPagesToShow as number,
          startPageIndex: result?.startPageIndex as number,
          stopPageIndex: result?.stopPageIndex as number,
          pageSize,
        }}
      />
    </PageWrapper>
  );
};

export default Page;
