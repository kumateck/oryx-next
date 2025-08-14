"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import PageWrapper from "@/components/layout/wrapper";
import { ProcurementType, SupplierType } from "@/lib";
// import { Button, Icon } from "@/components/ui";
// import { routes } from "@/lib";
import { useLazyGetApiV1ProcurementPurchaseOrderQuery } from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { useSelector } from "@/lib/redux/store";
import AccessTabs from "@/shared/access";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";

import { listsColumns } from "../columns";

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type") as unknown as SupplierType; // Extracts 'type' from URL
  const searchInput = useSelector((state) => state.common.searchInput);
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

  const triggerReload = useSelector((state) => state.common.triggerReload);
  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);

  const [loadData, { isFetching, data: result, isLoading }] =
    useLazyGetApiV1ProcurementPurchaseOrderQuery();

  useEffect(() => {
    loadData({
      page,
      pageSize,
      //   status: PurchaseOrderStatusList.Completed,
      type: type ?? SupplierType.Foreign,
      searchQuery: searchInput,
    });
    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, type, searchInput, triggerReload]);

  const data = result?.data || [];
  return (
    <PageWrapper className="w-full space-y-2 py-1">
      <div className="flex items-center justify-between py-2">
        <PageTitle title="Purchase Order Lists" />
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
        </div>{" "}
      </div>

      <ServerDatatable
        data={data}
        columns={listsColumns}
        isLoading={isLoading || isFetching}
        setPage={setPage}
        setPageSize={setPageSize}
        onRowClick={(row) =>
          router.push(`/procurement/purchase-orders/${row.id}`)
        }
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
