"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import PageWrapper from "@/components/layout/wrapper";
import { Button } from "@/components/ui";
import { useLazyGetApiV1ProcurementShipmentDocumentQuery } from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { useSelector } from "@/lib/redux/store";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";

import { columns } from "./columns";
import { PermissionKeys } from "@/lib";
import NoAccess from "@/shared/no-access";
import { useUserPermissions } from "@/hooks/use-permission";

const Page = () => {
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(30);
  const triggerReload = useSelector((state) => state.common.triggerReload);
  const [page, setPage] = useState(1);
  const router = useRouter();

  const [loadData, { isFetching, data: result, isLoading }] =
    useLazyGetApiV1ProcurementShipmentDocumentQuery();

  useEffect(() => {
    loadData({
      page,
      pageSize,
    });

    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, triggerReload]);
  const data = result?.data || [];

  //permissions checks
  const { hasPermissionAccess } = useUserPermissions();
  // check permissions access
  const hasAccess = hasPermissionAccess(
    PermissionKeys.logistics.viewShipmentDocument,
  );

  if (!hasAccess) {
    //redirect to no access
    return <NoAccess />;
  }

  return (
    <PageWrapper className="w-full space-y-2 py-1">
      <div className="flex items-center justify-between py-2">
        <PageTitle title=" Shipment Documents" />
        <div className="flex items-center justify-end gap-2">
          {hasPermissionAccess(
            PermissionKeys.logistics.createShipmentDocument,
          ) && (
            <Link href={"shipment-documents/create"}>
              <Button>Create</Button>
            </Link>
          )}
        </div>
      </div>

      <ServerDatatable
        onRowClick={(row) => {
          router.push(`/logistics/shipment-documents/${row.id}/details`);
        }}
        data={data}
        columns={columns}
        isLoading={isLoading || isFetching}
        setPage={setPage}
        setPageSize={setPageSize}
        // onRowClick={(row) => router.push(`requisition/${row.id}`)}
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

export default Page;
