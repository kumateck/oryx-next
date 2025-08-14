"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import PageWrapper from "@/components/layout/wrapper";
import { PermissionKeys, RequisitionStatus, RequisitionType } from "@/lib";
// import { Button, Icon } from "@/components/ui";
// import { routes } from "@/lib";
import { useLazyGetApiV1RequisitionQuery } from "@/lib/redux/api/openapi.generated";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";

import { columns } from "./columns";
import NoAccess from "@/shared/no-access";
import { useUserPermissions } from "@/hooks/use-permission";
import { useSelector } from "@/lib/redux/store";

const Page = () => {
  const router = useRouter();

  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);
  const searchInput = useSelector((state) => state.common.searchInput);
  const [loadData, { isFetching, data: result, isLoading }] =
    useLazyGetApiV1RequisitionQuery();

  useEffect(() => {
    loadData({
      page,
      pageSize,
      status: RequisitionStatus.Pending,
      type: RequisitionType.Purchase,
      searchQuery: searchInput,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, searchInput]);

  const data = result?.data || [];

  // Check Permision
  const { hasPermissionAccess } = useUserPermissions();
  // check permissions access
  const hasAccess = hasPermissionAccess(
    PermissionKeys.procurement.viewPurchaseRequisitions,
  );

  if (!hasAccess) {
    //redirect to no access
    return <NoAccess />;
  }
  return (
    <PageWrapper className="w-full space-y-2 py-1">
      <div className="flex items-center justify-between py-2">
        <PageTitle title="Purchase Requisitions" />
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
    </PageWrapper>
  );
};

export default Page;
