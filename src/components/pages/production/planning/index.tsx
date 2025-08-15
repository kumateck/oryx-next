"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import PageWrapper from "@/components/layout/wrapper";
import { Button, Icon } from "@/components/ui";
import { PermissionKeys, routes } from "@/lib";
import { useLazyGetApiV1ProductQuery } from "@/lib/redux/api/openapi.generated";
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
  const [loadData, { data: result, isFetching, isLoading }] =
    useLazyGetApiV1ProductQuery();

  useEffect(() => {
    loadData({
      page,
      pageSize,
      searchQuery: searchInput,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, searchInput]);

  // check permissions access
  const { hasPermissionAccess } = useUserPermissions();

  const hasAccess = hasPermissionAccess(
    PermissionKeys.production.viewPlannedProducts,
  );

  if (!hasAccess) {
    //redirect to no access
    return <NoAccess />;
  }

  // permissions ends here

  const data = result?.data || [];
  return (
    <PageWrapper className="w-full space-y-2 py-1">
      <div className="flex items-center justify-between py-3">
        <PageTitle title="Planned Products" />
        <div className="flex items-center justify-end gap-2">
          {hasPermissionAccess(
            PermissionKeys.production.createNewProductionPlan,
          ) && (
            <Button
              variant="default"
              size={"sm"}
              onClick={() => router.push(routes.newPlanning())}
            >
              <Icon name="Plus" className="h-4 w-4" /> <span>Create</span>
            </Button>
          )}
        </div>
      </div>

      <ServerDatatable
        data={data}
        columns={columns}
        isLoading={isLoading || isFetching}
        setPage={setPage}
        setPageSize={setPageSize}
        onRowClick={(row) => {
          router.push(routes.viewPlanning(row.id as string));
        }}
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
