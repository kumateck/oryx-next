"use client";

import PageWrapper from "@/components/layout/wrapper";
import { Icon } from "@/components/ui";
import { GRNStatus } from "@/lib";
import PageTitle from "@/shared/title";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { ServerDatatable } from "@/shared/datatable";
import { columns, SampleData } from "./columns";

function Page() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);
  const router = useRouter();
  const { id } = useParams();
  const isLoading = false;
  const isFetching = false;

  const data: SampleData[] = [
    {
      id: "someid",
      expiryDate: new Date(),
      invoiceNumber: "this is looking good",
      createdAt: new Date(),
      batchNumber: "This is god",
      status: GRNStatus.Completed,
      manufacturerName: "name",
      manufacturingDate: new Date(),
      materialName: "this is material name",
      quantity: 40,
      resetDate: new Date(),
    },
  ];
  console.log(id);
  return (
    <PageWrapper>
      <div
        className="group mb-2 flex items-center gap-1 hover:cursor-pointer"
        onClick={() => {
          router.back();
        }}
      >
        <Icon name="ArrowLeft" className="h-5 w-5" />
        <div className="group-hover:underline">
          <PageTitle title={"Receiving Area"} />
        </div>
      </div>
      <ServerDatatable
        onRowClick={(row) => {
          router.push(`/qc/goods-receipt-note/${row.id}`);
        }}
        data={data}
        columns={columns}
        isLoading={isLoading || isFetching}
        setPage={setPage}
        setPageSize={setPageSize}
        meta={{
          pageIndex: page,
          pageCount: page,
          totalRecordCount: page,
          numberOfPagesToShow: page,
          startPageIndex: page,
          stopPageIndex: page,
          pageSize,
        }}
      />
    </PageWrapper>
  );
}

export default Page;
