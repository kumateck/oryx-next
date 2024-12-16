"use client";

import React, { useEffect, useState } from "react";

import { ServerDatatable } from "@/app/shared/datatable";
import {
  useGetApiV1RequisitionSourceSupplierQuotationQuery,
  useLazyGetApiV1RequisitionSourceSupplierQuotationQuery,
} from "@/lib/redux/api/openapi.generated";

import { columns } from "./columns";

const Page = () => {
  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);

  const { data: result, isLoading } =
    useGetApiV1RequisitionSourceSupplierQuotationQuery({
      page,
      pageSize,
      supplierType: 0,
    });

  const [loadData, { isFetching }] =
    useLazyGetApiV1RequisitionSourceSupplierQuotationQuery();

  useEffect(() => {
    loadData({
      page,
      pageSize,
      supplierType: 0,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);

  const data = result?.data || [];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-2">
        <span className="text-3xl font-bold text-secondary-500">
          Foreign Sales Quotation Responses
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
