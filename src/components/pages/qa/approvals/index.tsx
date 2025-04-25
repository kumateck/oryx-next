"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import PageWrapper from "@/components/layout/wrapper";

// import { Button, Icon } from "@/components/ui";
// import { routes } from "@/lib";
import { useLazyGetApiV1ApprovalMyPendingQuery } from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { useSelector } from "@/lib/redux/store";

import { ClientDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";
import { columns } from "./columns";

const PendingApprovals = () => {
  const dispatch = useDispatch();

  const triggerReload = useSelector((state) => state.common.triggerReload);

  const [loadData, { isFetching, data: result, isLoading }] =
    useLazyGetApiV1ApprovalMyPendingQuery();

  useEffect(() => {
    loadData();
    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerReload]);

  const data = result || [];
  return (
    <PageWrapper className="w-full space-y-2 py-1">
      <div className="flex items-center justify-between py-2">
        <PageTitle title="Pending Approvals" />
      </div>

      <ClientDatatable
        data={data}
        columns={columns}
        isLoading={isLoading || isFetching}
        // onRowClick={(row) => router.push(`requisition/${row.id}`)}
      />
    </PageWrapper>
  );
};

export default PendingApprovals;
