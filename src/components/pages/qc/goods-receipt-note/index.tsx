"use client";
import PageWrapper from "@/components/layout/wrapper";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";
import { columns } from "./columns";
import { useState } from "react";
import { useRouter } from "next/navigation";

export type SampleData = {
  id: string;
  createdAt: Date;
  items: number;
  status: "Approved" | "In Progress" | "Pending";
};

function Page() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);
  const router = useRouter();
  const isLoading = false;
  const isFetching = false;

  const data: SampleData[] = [
    {
      id: "someid",
      createdAt: new Date(),
      items: 40,
      status: "Approved",
    },
    {
      id: "someid1",
      createdAt: new Date(),
      items: 20,
      status: "In Progress",
    },
  ];
  return (
    <PageWrapper>
      <div className="mb-2">
        <PageTitle title="GRN/GRA" />
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
