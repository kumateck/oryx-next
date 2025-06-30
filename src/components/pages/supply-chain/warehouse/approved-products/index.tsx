"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import PageWrapper from "@/components/layout/wrapper";
import { AuditModules, PermissionKeys } from "@/lib";
import { useLazyGetApiV1WarehouseFinishedGoodsDetailsQuery } from "@/lib/redux/api/openapi.generated";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";

import { columns } from "./columns";
import NoAccess from "@/shared/no-access";
import { useUserPermissions } from "@/hooks/use-permission";
import { useDispatch } from "react-redux";
import { useSelector } from "@/lib/redux/store";
import { commonActions } from "@/lib/redux/slices/common";

const Page = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);
  const [loadFinishedProducts, { data: result, isLoading, isFetching }] =
    useLazyGetApiV1WarehouseFinishedGoodsDetailsQuery();

  const dispatch = useDispatch();
  const router = useRouter();

  const triggerReload = useSelector((state) => state.common.triggerReload);
  const searchValue = useSelector((state) => state.common.searchInput);

  useEffect(() => {
    loadFinishedProducts({
      page,
      pageSize,
      module: AuditModules.warehouse.name,
      subModule: AuditModules.warehouse.approvedProducts,
      searchQuery: searchValue,
    });
    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, searchValue, triggerReload]);
  const data = result?.data || [];
  //Check Permision
  const { hasPermissionAccess } = useUserPermissions();

  const hasAccess = hasPermissionAccess(
    PermissionKeys.warehouse.viewApprovedRawMaterials,
  );
  if (!hasAccess) {
    //redirect to no access
    return <NoAccess />;
  }
  return (
    <PageWrapper className="w-full space-y-2 py-1">
      <PageTitle title="Approved Products" />
      <ServerDatatable
        onRowClick={(row) => {
          router.push(`/warehouse/approved-products/${row?.product?.id}`);
        }}
        data={data}
        columns={columns}
        isLoading={isLoading || isFetching}
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

export default Page;
