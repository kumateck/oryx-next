"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import PageWrapper from "@/components/layout/wrapper";
import { AuditModules, PermissionKeys } from "@/lib";
import { useLazyGetApiV1ProductionScheduleApprovedProductsQuery } from "@/lib/redux/api/openapi.generated";
import { ClientDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";

import { columns } from "./columns";
import NoAccess from "@/shared/no-access";
import { useUserPermissions } from "@/hooks/use-permission";
import { useDispatch } from "react-redux";
import { useSelector } from "@/lib/redux/store";
import { commonActions } from "@/lib/redux/slices/common";

const Page = () => {
  const [loadApprovedProducts, { data: result, isLoading, isFetching }] =
    useLazyGetApiV1ProductionScheduleApprovedProductsQuery();

  const dispatch = useDispatch();
  const router = useRouter();

  const triggerReload = useSelector((state) => state.common.triggerReload);
  const searchValue = useSelector((state) => state.common.searchInput);

  useEffect(() => {
    loadApprovedProducts({
      module: AuditModules.warehouse.name,
      subModule: AuditModules.warehouse.approvedProducts,
    });
    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, triggerReload]);

  //Check Permision
  const { hasPermissionAccess } = useUserPermissions();

  const hasAccess = hasPermissionAccess(
    PermissionKeys.warehouse.viewApprovedRawMaterials,
  );
  if (!hasAccess) {
    //redirect to no access
    return <NoAccess />;
  }

  const data = result || [];
  return (
    <PageWrapper className="w-full space-y-2 py-1">
      <PageTitle title="Approved Products" />
      <ClientDatatable
        onRowClick={(row) => {
          router.push(`/warehouse/approved-products/${row?.product?.id}`);
        }}
        data={data}
        columns={columns}
        isLoading={isLoading || isFetching}
      />
    </PageWrapper>
  );
};

export default Page;
