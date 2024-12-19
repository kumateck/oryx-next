"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { ServerDatatable } from "@/app/shared/datatable";
import { RequisitionStatus } from "@/lib";
// import { Button, Icon } from "@/components/ui";
// import { routes } from "@/lib/constants";
import {
  useGetApiV1RequisitionQuery,
  useLazyGetApiV1RequisitionQuery,
} from "@/lib/redux/api/openapi.generated";

import { columns } from "./columns";

const Page = () => {
  const router = useRouter();

  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);

  const { data: result, isLoading } = useGetApiV1RequisitionQuery({
    page,
    pageSize,
    status: RequisitionStatus.Pending,
  });

  const [loadData, { isFetching }] = useLazyGetApiV1RequisitionQuery();

  useEffect(() => {
    loadData({
      page,
      pageSize,
      status: RequisitionStatus.Pending,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);

  const data = result?.data || [];
  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-2">
        <span className="text-3xl font-bold text-secondary-500">
          Purchase Requisitions
        </span>
        <div className="flex items-center justify-end gap-2"></div>
      </div>

      <ServerDatatable
        data={data}
        columns={columns}
        isLoading={isLoading || isFetching}
        setPage={setPage}
        setPageSize={setPageSize}
        onRowClick={(row) => router.push(`requisition/${row.id}`)}
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
