"use client";

import { useParams, useRouter } from "next/navigation";
import React from "react";

import { Icon } from "@/components/ui";
import { useGetApiV1WarehouseChecklistByIdQuery } from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";

function ViewChecklist() {
  const { id } = useParams();
  const checklistId = id as string;
  const router = useRouter();
  const { data } = useGetApiV1WarehouseChecklistByIdQuery({ id: checklistId });
  return (
    <ScrollablePageWrapper>
      <div
        className="group mb-2 flex items-center gap-1 hover:cursor-pointer"
        onClick={() => {
          router.back();
        }}
      >
        <Icon name="ArrowLeft" className="h-5 w-5" />
        <div className="group-hover:underline">
          <PageTitle title={"Checklists"} />
        </div>
      </div>
      <div>{data?.material?.name}</div>
    </ScrollablePageWrapper>
  );
}

export default ViewChecklist;
