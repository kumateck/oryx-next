"use client";

import React, { useState } from "react";

import PageWrapper from "@/components/layout/wrapper";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";

import { columns } from "./columns";

const Page = () => {
  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);
  // useEffect(() => {
  //   loadData({
  //     page,
  //     pageSize,
  //   });
  console.log(page);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [page, pageSize]);
  // const data = result?.data || [];
  return (
    <PageWrapper className="w-full space-y-2 py-1">
      <div className="flex items-center justify-between py-2">
        <PageTitle title="Stock Transfer Request" />
      </div>

      <ServerDatatable
        data={[]}
        columns={columns}
        isLoading={false || false}
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
