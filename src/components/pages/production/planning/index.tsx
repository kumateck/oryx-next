"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import PageWrapper from "@/components/layout/wrapper";
import { Button, Icon } from "@/components/ui";
import {
  // findRecordWithFullAccess,
  // PermissionKeys,
  routes,
  // Section,
} from "@/lib";
import { useLazyGetApiV1ProductQuery } from "@/lib/redux/api/openapi.generated";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";

import { columns } from "./columns";
// import { useSelector } from "@/lib/redux/store";
// import NoAccess from "@/shared/no-access";

const Page = () => {
  const router = useRouter();
  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);

  const [loadData, { data: result, isFetching, isLoading }] =
    useLazyGetApiV1ProductQuery();

  useEffect(() => {
    loadData({
      page,
      pageSize,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);

  // check permissions here
  // const permissions = useSelector(
  //   (state) => state.persistedReducer?.auth?.permissions,
  // ) as Section[];

  // // check permissions access
  // if (
  //   !findRecordWithFullAccess(
  //     permissions,
  //     PermissionKeys.production.viewPlannedProducts,
  //   )
  // ) {
  //   //redirect to no access
  //   return <NoAccess />;
  // }

  // permissions ends here

  const data = result?.data || [];
  return (
    <PageWrapper className="w-full space-y-2 py-1">
      <div className="flex items-center justify-between py-3">
        <PageTitle title="Planned Products" />
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="default"
            size={"sm"}
            onClick={() => router.push(routes.newPlanning())}
          >
            <Icon name="Plus" className="h-4 w-4" /> <span>Create</span>
          </Button>
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
