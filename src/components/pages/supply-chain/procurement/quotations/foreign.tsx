"use client";

import React, { useEffect, useState } from "react";

import { ServerDatatable } from "@/app/shared/datatable";
import { SupplierType } from "@/lib";
import {
  useGetApiV1RequisitionSourceSupplierQuery,
  useLazyGetApiV1RequisitionSourceSupplierQuery,
} from "@/lib/redux/api/openapi.generated";

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
    <div className="w-full">
      <div className="flex items-center justify-between py-2">
        <span className="text-3xl font-bold text-secondary-500">
          Foreign Quotation Request
        </span>
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
    </div>
  );
};

export default Page;
