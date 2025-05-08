"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import PageWrapper from "@/components/layout/wrapper";
import {
  useGetApiV1RequisitionQuery,
  useLazyGetApiV1RequisitionQuery,
} from "@/lib/redux/api/openapi.generated";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";
import { columns } from "./columns";

const Page = () => {
  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);
  const router = useRouter();

  const { data: result, isLoading } = useGetApiV1RequisitionQuery({
    page,
    pageSize,
  });

  const [loadData, { isFetching }] = useLazyGetApiV1RequisitionQuery();

  useEffect(() => {
    loadData({
      page,
      pageSize,
    });
  }, [page, pageSize, loadData]);

  {
    /* const [isClient, setIsClient] = useState(false);

    useEffect(() => {
    setIsClient(true);
  }, []);

const permissions = useSelector(
    (state) => state.persistedReducer?.auth?.permissions
  ) as Section[];

 const hasAccess = findRecordWithFullAccess(
    permissions,
    PermissionKeys.production.createRawMaterialStockRequisition,
  );
  if (isClient && !hasAccess) {
    return <NoAccess />;
  } */
  }

  const data = result?.data || [];

  return (
    <PageWrapper className="w-full space-y-2 py-1">
      <div className="flex items-center justify-between py-2">
        <PageTitle title="Requisitions" />
        {/* <div className="flex items-center justify-end gap-2">
          <Button
            variant="default"
            size={"sm"}
            onClick={() => router.push(routes.newRequisition())}
          >
            <Icon name="Plus" className="h-4 w-4" /> <span>Create</span>
          </Button>
        </div> */}
      </div>

      <ServerDatatable
        onRowClick={(row) => {
          router.push(`/production/requisition/${row.id}/details`);
        }}
        data={data}
        columns={columns}
        isLoading={isLoading || isFetching}
        setPage={setPage}
        setPageSize={setPageSize}
        meta={{
          pageIndex: result?.pageIndex ?? 1,
          pageCount: result?.pageCount ?? 1,
          totalRecordCount: result?.totalRecordCount ?? 0,
          numberOfPagesToShow: result?.numberOfPagesToShow ?? 5,
          startPageIndex: result?.startPageIndex ?? 1,
          stopPageIndex: result?.stopPageIndex ?? 1,
          pageSize,
        }}
      />
    </PageWrapper>
  );
};

export default Page;
