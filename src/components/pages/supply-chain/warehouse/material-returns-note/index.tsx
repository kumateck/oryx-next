"use client";

import { useState } from "react";

import PageWrapper from "@/components/layout/wrapper";
import { useGetApiV1ProductionScheduleMaterialReturnNoteQuery } from "@/lib/redux/api/openapi.generated";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";
import { columns } from "./columns";

const MaterialReturnsNote = () => {
  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);
  const { data: result, isLoading } =
    useGetApiV1ProductionScheduleMaterialReturnNoteQuery({
      page,
      pageSize,
    });

  const data = result?.data || [];

  return (
    <PageWrapper className="w-full space-y-2 py-1">
      <div className="flex items-center justify-between py-2">
        <PageTitle title="Material Returns Note" />
      </div>

      <ServerDatatable
        data={data}
        columns={columns}
        isLoading={isLoading}
        setPage={setPage}
        setPageSize={setPageSize}
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
export default MaterialReturnsNote;
