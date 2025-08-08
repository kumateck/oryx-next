"use client";

import { useEffect, useState } from "react";
import PageWrapper from "@/components/layout/wrapper";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";

import { columns } from "./column";
import { PermissionKeys } from "@/lib";
import NoAccess from "@/shared/no-access";
import { useUserPermissions } from "@/hooks/use-permission";
import { useRouter } from "next/navigation";
import Create from "./create";
import { Button, Icon } from "@/components/ui";
import { useLazyGetApiV1ProcurementInventoryMarketVendorsQuery } from "@/lib/redux/api/openapi.generated";
import { useSelector } from "@/lib/redux/store";
import { useDebounce } from "@uidotdev/usehooks";
import { useDispatch } from "react-redux";
import { commonActions } from "@/lib/redux/slices/common";

const Page = () => {
  const router = useRouter();
  const [loadVenders, { data: vendersData, isLoading }] =
    useLazyGetApiV1ProcurementInventoryMarketVendorsQuery({});
  const [isOpen, setIsOpen] = useState(false);
  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const triggerReload = useSelector((state) => state.common.triggerReload);
  const searchValue = useSelector((state) => state.common.searchInput);
  const debouncedValue = useDebounce(searchValue, 500);
  useEffect(() => {
    loadVenders({
      page,
      pageSize,
    });
    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, debouncedValue, triggerReload]);
  const data = vendersData?.data || [];
  const { hasPermissionAccess } = useUserPermissions();
  // check permissions access
  const hasAccess = hasPermissionAccess(
    PermissionKeys.procurement.sendQuotationRequest,
  );

  if (!hasAccess) {
    //redirect to no access
    return <NoAccess />;
  }

  return (
    <div>
      <Create isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <PageWrapper className="w-full space-y-2 py-1">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2 ">
            <Icon
              name="ArrowLeft"
              className="h-5 w-5 text-black hover:cursor-pointer"
              onClick={() => {
                router.back();
              }}
            />
            <PageTitle title={"Vendors"} />
          </div>
          <div className="flex items-center justify-end gap-2">
            {hasPermissionAccess(PermissionKeys.procurement.createVendor) && (
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
          isLoading={isLoading}
          setPage={setPage}
          setPageSize={setPageSize}
          meta={{
            pageIndex: 1,
            pageCount: 1,
            totalRecordCount: 0,
            numberOfPagesToShow: 1,
            startPageIndex: 1,
            stopPageIndex: 1,
            pageSize,
          }}
        />
      </PageWrapper>
    </div>
  );
};
export default Page;
