"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import PageWrapper from "@/components/layout/wrapper";
import {
  findRecordWithFullAccess,
  PermissionKeys,
  ProcurementType,
  Section,
  SupplierType,
} from "@/lib";
import { useLazyGetApiV1RequisitionSourceSupplierQuery } from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { useSelector } from "@/lib/redux/store";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";

import AccessTabs from "../../../../../shared/access";
import { columns } from "./columns";
import NoAccess from "@/shared/no-access";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type") as unknown as SupplierType; // Extracts 'type' from URL

  const pathname = usePathname();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleTabClick = (tabType: SupplierType) => {
    router.push(pathname + "?" + createQueryString("type", tabType.toString()));
  };

  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);
  const triggerReload = useSelector((state) => state.common.triggerReload);

  const [loadData, { isFetching, data: result, isLoading }] =
    useLazyGetApiV1RequisitionSourceSupplierQuery();

  useEffect(() => {
    loadData({
      page,
      pageSize,
      source: type ?? SupplierType.Foreign,
    });
    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, type, triggerReload]);

  const data = result?.data || [];

  // Check Permision
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  // check permissions here
  const permissions = useSelector(
    (state) => state.persistedReducer?.auth?.permissions,
  ) as Section[];

  // check permissions access

  const hasAccess = findRecordWithFullAccess(
    permissions,
    PermissionKeys.procurement.sendQuotationRequest,
  );

  if (isClient && !hasAccess) {
    //redirect to no access
    return <NoAccess />;
  }

  return (
    <PageWrapper className="w-full space-y-2 py-1">
      <div className="flex items-center justify-between py-2">
        <PageTitle title="Quotation Request" />
        <div className="flex items-center justify-end gap-2">
          <AccessTabs
            handleTabClick={handleTabClick}
            type={type}
            tabs={[
              {
                label: ProcurementType.Foreign,
                value: SupplierType.Foreign.toString(),
              },
              {
                label: ProcurementType.Local,
                value: SupplierType.Local.toString(),
              },
            ]}
          />
        </div>
      </div>

      <ServerDatatable
        data={data}
        columns={columns}
        isLoading={isLoading || isFetching}
        setPage={setPage}
        setPageSize={setPageSize}
        // onRowClick={(row) => router.push(`requisition/${row.supplier?.id}`)}
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
