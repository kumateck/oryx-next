"use client";
import { Icon } from "@/components/ui";
import { useLazyGetApiV1ApprovalByApprovalIdQuery } from "@/lib/redux/api/openapi.generated";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  bincardColumn,
  dummyBincards,
  dummyGeneral,
  generalColumn,
} from "./columns";
import ScrollablePageWrapper from "@/shared/page-wrapper";

type Tab = "general" | "bincard";

function Page() {
  const [activeTab, setActiveTab] = useState<Tab>("general");
  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);
  const { id } = useParams();
  const router = useRouter();
  const finishedProductId = id as string;
  const [loadFinishedProductDetails, { data, isLoading }] =
    useLazyGetApiV1ApprovalByApprovalIdQuery({});
  useEffect(() => {
    loadFinishedProductDetails({
      approvalId: finishedProductId,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finishedProductId]);
  const finishedProductDetails = data;
  console.log(finishedProductDetails);
  return (
    <ScrollablePageWrapper className="flex flex-col">
      <div
        className="cursor-pointer text-sm hover:underline duration-300 transition-all flex items-center gap-2"
        onClick={() => router.back()}
      >
        <Icon name="ArrowLeft" className="size-4" />
        <span>Finished Product</span>
      </div>
      <div className="flex flex-col my-4">
        <span className="text-gray-500 text-sm">NL-012</span>
        <PageTitle title="Finished Product Details" />
      </div>
      <div className="flex items-center justify-start gap-4">
        <button
          className={` border-b-2 px-2 ${
            activeTab === "general"
              ? "border-blue-500"
              : "text-gray-500 hover:border-blue-500"
          }`}
          onClick={() => setActiveTab("general")}
        >
          General Information
        </button>
        <button
          className={` px-2 border-b-2 ${
            activeTab === "bincard"
              ? "border-blue-500 "
              : "text-gray-500 hover:border-blue-500"
          }`}
          onClick={() => setActiveTab("bincard")}
        >
          Bincard Information
        </button>
      </div>
      <div className="h-3" />
      {activeTab === "bincard" && (
        <ServerDatatable
          data={dummyBincards}
          columns={bincardColumn}
          setPage={setPage}
          setPageSize={setPageSize}
          isLoading={isLoading}
          meta={{
            pageIndex: page,
            pageCount: 1,
            totalRecordCount: 1,
            numberOfPagesToShow: 1,
            startPageIndex: 1,
            stopPageIndex: 1,
            pageSize,
          }}
        />
      )}
      {activeTab === "general" && (
        <ServerDatatable
          data={dummyGeneral}
          columns={generalColumn}
          setPage={setPage}
          setPageSize={setPageSize}
          isLoading={isLoading}
          meta={{
            pageIndex: 1,
            pageCount: 1,
            totalRecordCount: 1,
            numberOfPagesToShow: 1,
            startPageIndex: 1,
            stopPageIndex: 1,
            pageSize,
          }}
        />
      )}
    </ScrollablePageWrapper>
  );
}

export default Page;
