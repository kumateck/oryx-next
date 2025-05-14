"use client";

// import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import PageWrapper from "@/components/layout/wrapper";
import { Button, Icon } from "@/components/ui";
import { useLazyGetApiV1ProductEquipmentQuery } from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";

import { columns } from "./column";
import Create from "./create";
import { findRecordWithAccess, PermissionKeys, Section } from "@/lib";
import NoAccess from "@/shared/no-access";

const Page = () => {
  const dispatch = useDispatch();
  // const router = useRouter();
  const triggerReload = useSelector((state) => state.common.triggerReload);
  const searchQuery = useSelector((state) => state.common.searchInput);

  const handleLoadEquipments = async (
    page: number,
    pageSize: number,
    searchQuery: string,
  ) => {
    await loadEquipments({
      page,
      pageSize,
      searchQuery,
    }).unwrap();
  };
  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);

  const [loadEquipments, { isLoading, isFetching, data: rawEquipments }] =
    useLazyGetApiV1ProductEquipmentQuery();

  useEffect(() => {
    handleLoadEquipments(page, pageSize, searchQuery);
    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, triggerReload, searchQuery]);

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
  const hasAccess = findRecordWithAccess(
    permissions,
    PermissionKeys.equipment.view,
  );
  if (isClient && !hasAccess) {
    //redirect to no access
    return <NoAccess />;
  }

  return (
    <PageWrapper className="w-full space-y-2 py-1">
      {isOpen && <Create onClose={() => setIsOpen(false)} isOpen={isOpen} />}
      <div className="flex items-center justify-between py-2">
        <PageTitle title="Equipments" />
        <div className="flex items-center justify-end gap-2">
          {findRecordWithAccess(
            permissions,
            PermissionKeys.equipment.addNew,
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
        data={rawEquipments?.data ?? []}
        columns={columns}
        isLoading={isLoading || isFetching}
        setPage={setPage}
        setPageSize={setPageSize}
        // onRowClick={(row) => {
        //   router.push(routes.viewEquipment(row?.id as string));
        // }}
        meta={{
          pageIndex: rawEquipments?.pageIndex as number,
          pageCount: rawEquipments?.pageCount as number,
          totalRecordCount: rawEquipments?.totalRecordCount as number,
          numberOfPagesToShow: rawEquipments?.numberOfPagesToShow as number,
          startPageIndex: rawEquipments?.startPageIndex as number,
          stopPageIndex: rawEquipments?.stopPageIndex as number,
          pageSize,
        }}
      />
    </PageWrapper>
  );
};
export default Page;
