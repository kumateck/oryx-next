"use client";

import { useEffect, useState } from "react";

import PageWrapper from "@/components/layout/wrapper";
import { Button, Icon } from "@/components/ui";
import {
  GetApiV1ProcurementManufacturerApiArg,
  useLazyGetApiV1ProcurementManufacturerQuery,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";

import { columns } from "./column";
import Create from "./create";
import { PermissionKeys } from "@/lib";
import NoAccess from "@/shared/no-access";
import { useUserPermissions } from "@/hooks/use-permission";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const triggerReload = useSelector((state) => state.common.triggerReload);
  const searchQuery = useSelector((state) => state.common.searchInput);

  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);

  const [loadData, { isFetching, data: result, isLoading }] =
    useLazyGetApiV1ProcurementManufacturerQuery();

  useEffect(() => {
    loadData({
      page,
      pageSize,
      searchQuery,
    } as GetApiV1ProcurementManufacturerApiArg);

    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, triggerReload, searchQuery]);

  const data = result?.data || [];
  const [isOpen, setIsOpen] = useState(false);

  //permission start from here
  const { hasPermissionAccess } = useUserPermissions();

  // check permissions access
  const hasAccess = hasPermissionAccess(
    PermissionKeys.procurement.viewManufacturerDetails,
  );

  if (!hasAccess) {
    //redirect to no access
    return <NoAccess />;
  }

  //permission end here
  return (
    <PageWrapper className="w-full space-y-2 py-1">
      {isOpen && <Create onClose={() => setIsOpen(false)} isOpen={isOpen} />}
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-2 ">
          <Icon
            name="ArrowLeft"
            className="h-5 w-5 text-black hover:cursor-pointer"
            onClick={() => {
              router.back();
            }}
          />

          <PageTitle title={"Manufacturers"} />
        </div>
        <div className="flex items-center justify-end gap-2">
          {hasPermissionAccess(
            PermissionKeys.procurement.createManufacturer,
          ) && (
            <Button
              variant="default"
              size={"sm"}
              onClick={() => setIsOpen(true)}
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
