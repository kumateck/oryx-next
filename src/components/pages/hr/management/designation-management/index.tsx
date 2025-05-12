"use client";

import { useEffect, useState } from "react";

import PageWrapper from "@/components/layout/wrapper";
import { Button, Icon } from "@/components/ui";
import {
  useGetApiV1DesignationQuery,
  useLazyGetApiV1DesignationQuery,
} from "@/lib/redux/api/openapi.generated";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";

// import { useDispatch } from "@/redux/store";
import { columns } from "./columns";
import Create from "./create";
import { useDispatch } from "react-redux";
import { useSelector } from "@/lib/redux/store";
import { commonActions } from "@/lib/redux/slices/common";
import { findRecordWithFullAccess, PermissionKeys, Section } from "@/lib";
import NoAccess from "@/shared/no-access";

const Page = () => {
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);
  const triggerReload = useSelector((state) => state.common.triggerReload);

  const { data: result, isLoading } = useGetApiV1DesignationQuery({
    page,
    pageSize,
  });
  const [loadDesignations, { isFetching }] = useLazyGetApiV1DesignationQuery();

  useEffect(() => {
    loadDesignations({
      page,
      pageSize,
    });
    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, triggerReload]);
  const data = result?.data || [];
  const [isOpen, setIsOpen] = useState(false);

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
  const hasAccess = findRecordWithFullAccess(
    permissions,
    PermissionKeys.humanResources.viewDesignation,
  );

  if (isClient && !hasAccess) {
    //redirect to no access
    return <NoAccess />;
  }

  return (
    <PageWrapper className="w-full space-y-2 py-1">
      {isOpen && <Create onClose={() => setIsOpen(false)} isOpen={isOpen} />}
      <div className="flex items-center justify-between py-2">
        <PageTitle title="Designation Management" />
        {findRecordWithFullAccess(
          permissions,
          PermissionKeys.humanResources.createDesignation,
        ) && (
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="default"
              size={"sm"}
              onClick={() => setIsOpen(true)}
            >
              <Icon name="Plus" className="h-4 w-4" /> <span>Create</span>
            </Button>
          </div>
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
