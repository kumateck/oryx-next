"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

// import { useDispatch } from "react-redux";
import PageWrapper from "@/components/layout/wrapper";
import { Button } from "@/components/ui";
// import { useLazyGetApiV1ProcurementShipmentDocumentQuery } from "@/lib/redux/api/openapi.generated";
// import { commonActions } from "@/lib/redux/slices/common";
// import { useSelector } from "@/lib/redux/store";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";

import { columns } from "./columns";

const Page = () => {
  //   const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(30);
  //   const triggerReload = useSelector((state) => state.common.triggerReload);
  const [page, setPage] = useState(1);
  console.log(page);
  const router = useRouter();

  return (
    <PageWrapper className="w-full space-y-2 py-1">
      <div className="flex items-center justify-between py-2">
        <PageTitle title="Waybill" />
        <div className="flex items-center justify-end gap-2">
          <Link href={"/logistics/waybill/create"}>
            <Button>Create</Button>
          </Link>
        </div>
      </div>

      <ServerDatatable
        onRowClick={(row) => {
          router.push(`/logistics/shipment-documents/${row.id}/details`);
        }}
        data={[]}
        columns={columns}
        isLoading={false || false}
        // isLoading={isLoading || isFetching}
        setPage={setPage}
        setPageSize={setPageSize}
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
    </PageWrapper>
  );
};

export default Page;
