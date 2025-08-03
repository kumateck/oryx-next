// Permission and Access (Schedule)
// path: src > components > pages > production > schedule> index.tsx

"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import PageWrapper from "@/components/layout/wrapper";

import { useLazyGetApiV1QaAnalyticalTestsQuery } from "@/lib/redux/api/openapi.generated";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";

import { columns } from "./columns";

import NoAccess from "@/shared/no-access";
import { PermissionKeys } from "@/lib";
import { useUserPermissions } from "@/hooks/use-permission";

const Page = () => {
  const router = useRouter();
  const [loadData, { data: result, isFetching, isLoading }] =
    useLazyGetApiV1QaAnalyticalTestsQuery();

  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);
  useEffect(() => {
    loadData({
      page,
      pageSize,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);

  //permissions checks
  const { hasPermissionAccess } = useUserPermissions();

  // check User permissions access

  const hasAccess = hasPermissionAccess(
    PermissionKeys.production.viewProductSchedules,
  );

  if (!hasAccess) {
    //redirect user to no access
    return <NoAccess />;
  }

  // permissions ends here!

  const data = result?.data || [];
  return (
    <PageWrapper className="w-full space-y-2 py-1">
      <div className="flex items-center justify-between py-2">
        <PageTitle title="Analytic Test Requests" />
      </div>

      <ServerDatatable
        onRowClick={(row) => {
          router.push(`/production/schedules/${row.id}/details`);
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
