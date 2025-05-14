"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

import PageWrapper from "@/components/layout/wrapper";
import {
  EMaterialKind,
  findRecordWithAccess,
  PermissionKeys,
  Section,
} from "@/lib";
import { useLazyGetApiV1MaterialApprovedMaterialsQuery } from "@/lib/redux/api/openapi.generated";
import AccessTabs from "@/shared/access";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";

import { columns } from "./columns";
import { useSelector } from "@/lib/redux/store";
import NoAccess from "@/shared/no-access";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const kind = searchParams.get("kind") as unknown as EMaterialKind; // Extracts 'type' from URL

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

  const handleTabClick = (tabType: EMaterialKind) => {
    router.push(pathname + "?" + createQueryString("kind", tabType.toString()));
  };

  const [loadData, { data: result, isFetching, isLoading }] =
    useLazyGetApiV1MaterialApprovedMaterialsQuery();

  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);
  useEffect(() => {
    loadData({
      page,
      pageSize,
      kind: kind || EMaterialKind.Raw,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, kind]);
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
    PermissionKeys.warehouse.viewApprovedRawMaterials,
  );
  // check permissions access
  const hasAccessToApprovedPackaging = findRecordWithAccess(
    permissions,
    PermissionKeys.warehouse.viewApprovedPackagingMaterials,
  );

  if (isClient && !hasAccess) {
    //redirect to no access
    return <NoAccess />;
  }
  if (isClient && !hasAccessToApprovedPackaging && kind?.toString() === "1") {
    //redirect to no access
    return <NoAccess />;
  }
  return (
    <PageWrapper className="w-full space-y-2 py-1">
      <div className="flex items-center justify-between py-2">
        <PageTitle title="Approved Materials" />
        <div className="flex items-center justify-end gap-2">
          {hasAccess && hasAccessToApprovedPackaging && (
            <AccessTabs
              handleTabClick={handleTabClick}
              type={kind}
              tabs={[
                {
                  label: EMaterialKind[EMaterialKind.Raw],
                  value: EMaterialKind.Raw.toString(),
                },
                {
                  label: EMaterialKind[EMaterialKind.Packing],
                  value: EMaterialKind.Packing.toString(),
                },
              ]}
            />
          )}
          {hasAccess && !hasAccessToApprovedPackaging && (
            <AccessTabs
              handleTabClick={handleTabClick}
              type={kind}
              tabs={[
                {
                  label: EMaterialKind[EMaterialKind.Raw],
                  value: EMaterialKind.Raw.toString(),
                },
                // {
                //   label: EMaterialKind[EMaterialKind.Packing],
                //   value: EMaterialKind.Packing.toString(),
                // },
              ]}
            />
          )}
          {hasAccessToApprovedPackaging && !hasAccess && (
            <AccessTabs
              handleTabClick={handleTabClick}
              type={kind}
              tabs={[
                // {
                //   label: EMaterialKind[EMaterialKind.Raw],
                //   value: EMaterialKind.Raw.toString(),
                // },
                {
                  label: EMaterialKind[EMaterialKind.Packing],
                  value: EMaterialKind.Packing.toString(),
                },
              ]}
            />
          )}
        </div>
      </div>

      <ServerDatatable
        onRowClick={(row) => {
          router.push(
            `/warehouse/approved-materials/${row?.material?.id}/details`,
          );
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
