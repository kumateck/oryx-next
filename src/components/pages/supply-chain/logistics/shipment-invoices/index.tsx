"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import PageWrapper from "@/components/layout/wrapper";
import { Button } from "@/components/ui";
// import { Button, Icon } from "@/components/ui";
// import { routes } from "@/lib";
import { useLazyGetApiV1ProcurementShipmentInvoiceQuery } from "@/lib/redux/api/openapi.generated";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";

import { columns } from "./columns";
import { useSelector } from "@/lib/redux/store";
import { findRecordWithAccess, PermissionKeys, Section } from "@/lib";
import NoAccess from "@/shared/no-access";

const Page = () => {
  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);
  const router = useRouter();

  const [loadData, { isFetching, data: result, isLoading }] =
    useLazyGetApiV1ProcurementShipmentInvoiceQuery();

  useEffect(() => {
    loadData({
      page,
      pageSize,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);

  const data = result?.data || [];

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
  const hasAccess = findRecordWithAccess(
    permissions,
    PermissionKeys.logistics.viewShipmentInvoice,
  );

  if (isClient && !hasAccess) {
    //redirect to no access
    return <NoAccess />;
  }
  return (
    <PageWrapper className="w-full space-y-2 py-1">
      <div className="flex items-center justify-between py-2">
        <PageTitle title="Shipment Invoices" />
        <div className="flex items-center justify-end gap-2">
          {findRecordWithAccess(
            permissions,
            PermissionKeys.logistics.createShipmentInvoice,
          ) && (
            <Link href={"shipment-invoices/create"}>
              <Button>Create</Button>
            </Link>
          )}
        </div>
      </div>

      <ServerDatatable
        onRowClick={(row) => {
          router.push(`/logistics/shipment-invoices/${row.id}`);
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
