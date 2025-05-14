"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Icon } from "@/components/ui";
import { useGetApiV1MaterialByMaterialIdQuery } from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";

import MaterialDetails from "./material-details";
import { useSelector } from "@/lib/redux/store";
import { findRecordWithFullAccess, PermissionKeys, Section } from "@/lib";
import NoAccess from "@/shared/no-access";

const ApprovedRawMaterialDetail = () => {
  const { id } = useParams();
  const materialId = id as string;
  const { data } = useGetApiV1MaterialByMaterialIdQuery({
    materialId,
  });
  const router = useRouter();

  //Check Permision
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  // check permissions here
  const permissions = useSelector(
    (state) => state.persistedReducer?.auth?.permissions,
  ) as Section[];
  // check permissions access
  const hasAccess = findRecordWithFullAccess(
    permissions,
    PermissionKeys.warehouse.viewApprovedRawMaterials,
  );

  if (isClient && !hasAccess) {
    //redirect to no access
    return <NoAccess />;
  }

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
          <PageTitle title={"Approved Materials"} />
        </div>
      </div>
      <div className="space-y-3">
        <p className="text-sm">{data?.code}</p>
        <PageTitle title={data?.name as string} />
        {/* <DragLists /> */}
        {/* {data?.products && data?.products?.length > 0 && (
          <Products scheduleId={scheduleId} products={data?.products ?? []} />
        )} */}
        <MaterialDetails materialId={materialId} />
      </div>
    </ScrollablePageWrapper>
  );
};

export default ApprovedRawMaterialDetail;
