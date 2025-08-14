// Permission and Access (Schedule)
// path: src > components > pages > production > schedule> index.tsx

"use client";

import React, { useCallback, useEffect, useState } from "react";

import PageWrapper from "@/components/layout/wrapper";

import { useLazyGetApiV1QaAnalyticalTestsQuery } from "@/lib/redux/api/openapi.generated";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";

import { columns } from "./columns";

import NoAccess from "@/shared/no-access";
import { AnalyticalTestRequestStatus, PermissionKeys } from "@/lib";
import { useUserPermissions } from "@/hooks/use-permission";
import { useDispatch } from "react-redux";
import { useSelector } from "@/lib/redux/store";
import { commonActions } from "@/lib/redux/slices/common";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import AccessTabs from "@/shared/access";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const type = searchParams.get(
    "type",
  ) as unknown as AnalyticalTestRequestStatus; // Extracts 'type' from URL

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

  const [loadData, { data: result, isFetching, isLoading }] =
    useLazyGetApiV1QaAnalyticalTestsQuery();

  const triggerReload = useSelector((state) => state.common.triggerReload);
  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);
  useEffect(() => {
    loadData({
      page,
      pageSize,
      status: type || AnalyticalTestRequestStatus.New,
    });

    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, page, pageSize, triggerReload]);

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

  const handleTabClick = (tabType: AnalyticalTestRequestStatus) => {
    router.push(pathname + "?" + createQueryString("type", tabType.toString()));
  };

  return (
    <PageWrapper className="w-full space-y-2 py-1">
      <div className="flex items-center justify-between py-2">
        <PageTitle title="Analytical Test Requests" />

        {type > 0 && (
          <AccessTabs
            handleTabClick={handleTabClick}
            containerClassName="w-full "
            type={type}
            tabs={[
              {
                label:
                  AnalyticalTestRequestStatus[
                    AnalyticalTestRequestStatus.Sampled
                  ],
                value: AnalyticalTestRequestStatus.Sampled.toString(),
              },
              {
                label:
                  AnalyticalTestRequestStatus[
                    AnalyticalTestRequestStatus.Acknowledged
                  ],
                value: AnalyticalTestRequestStatus.Acknowledged.toString(),
              },
              {
                label: "Under Test",
                value: AnalyticalTestRequestStatus.Testing.toString(),
              },
              {
                label: "Test Taken",
                value: AnalyticalTestRequestStatus.TestTaken.toString(),
              },
              {
                label: "Released",
                value: AnalyticalTestRequestStatus.Released.toString(),
              },
            ]}
          />
        )}
      </div>

      <ServerDatatable
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
