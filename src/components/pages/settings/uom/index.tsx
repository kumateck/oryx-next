"use client";

import { useEffect, useState } from "react";

import PageWrapper from "@/components/layout/wrapper";
// import { Button, Icon } from "@/components/ui";
import {
  UnitOfMeasureDtoIEnumerablePaginateable,
  usePostApiV1CollectionUomPaginatedMutation,
} from "@/lib/redux/api/openapi.generated";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";

// import { useDispatch } from "@/redux/store";

import Create from "./create";
import { PermissionKeys } from "@/lib";
import NoAccess from "@/shared/no-access";
import { useUserPermissions } from "@/hooks/use-permission";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useSelector } from "@/lib/redux/store";
import { commonActions } from "@/lib/redux/slices/common";
import { Button, Icon } from "@/components/ui";
import { columns } from "./columns";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);
  const triggerReload = useSelector((state) => state.common.triggerReload);

  const [loadUom, { isLoading }] = usePostApiV1CollectionUomPaginatedMutation();

  useEffect(() => {
    handleLoadUom(page, pageSize);

    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, triggerReload]);

  const [uomResponse, setUomResponse] =
    useState<UnitOfMeasureDtoIEnumerablePaginateable>();

  const handleLoadUom = async (page: number, pageSize: number) => {
    try {
      const response = await loadUom({
        filterUnitOfMeasure: {
          types: [],
          pageSize,
          page,
        },
      }).unwrap();

      setUomResponse(response);
    } catch (error) {
      console.log(error);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  //Check Permision
  const { hasPermissionAccess } = useUserPermissions();
  if (!hasPermissionAccess(PermissionKeys.warehouse.viewWarehouses)) {
    //redirect to no access
    return <NoAccess />;
  }

  return (
    <PageWrapper className="w-full space-y-2 py-1">
      {isOpen && hasPermissionAccess(PermissionKeys.warehouse.addWarehouse) && (
        <Create onClose={() => setIsOpen(false)} isOpen={isOpen} />
      )}
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-2 ">
          <Icon
            name="ArrowLeft"
            className="h-5 w-5 text-black hover:cursor-pointer"
            onClick={() => {
              router.back();
            }}
          />

          <PageTitle title={"Unit of Measure"} />
        </div>
        <div className="flex items-center justify-end gap-2">
          <Button variant="default" size={"sm"} onClick={() => setIsOpen(true)}>
            <Icon name="Plus" className="h-4 w-4" /> <span>Create</span>
          </Button>
        </div>
      </div>

      <ServerDatatable
        data={uomResponse?.data || []}
        columns={columns}
        isLoading={isLoading}
        setPage={setPage}
        setPageSize={setPageSize}
        meta={{
          pageIndex: uomResponse?.pageIndex as number,
          pageCount: uomResponse?.pageCount as number,
          totalRecordCount: uomResponse?.totalRecordCount as number,
          numberOfPagesToShow: uomResponse?.numberOfPagesToShow as number,
          startPageIndex: uomResponse?.startPageIndex as number,
          stopPageIndex: uomResponse?.stopPageIndex as number,
          pageSize,
        }}
      />
    </PageWrapper>
  );
};
export default Page;
