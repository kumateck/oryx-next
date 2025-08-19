"use client";

import { useEffect, useState } from "react";
import PageWrapper from "@/components/layout/wrapper";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";
import { columns } from "./column";
import { useRouter } from "next/navigation";
import Create from "./create";
import { Button, Icon } from "@/components/ui";
import { useLazyGetApiV1ProcurementInventoryQuery } from "@/lib/redux/api/openapi.generated";
import { useDispatch } from "react-redux";
import { useDebounce } from "@uidotdev/usehooks";
import { useSelector } from "@/lib/redux/store";
import { commonActions } from "@/lib/redux/slices/common";

const Page = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.common.searchInput);
  const debounceValue = useDebounce(searchValue, 500);
  const triggerReload = useSelector((state) => state.common.triggerReload);

  const [loadPurchaseRequisitions, { data: result, isLoading }] =
    useLazyGetApiV1ProcurementInventoryQuery();

  useEffect(() => {
    loadPurchaseRequisitions({
      page,
      pageSize,
      searchQuery: debounceValue,
    });
    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, debounceValue, triggerReload]);
  const data = result?.data || [];

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
            <PageTitle title={"Purchase Requisition"} />
          </div>
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="default"
              size={"sm"}
              onClick={() => setIsOpen(true)}
            >
              <Icon name="Plus" className="h-4 w-4" /> <span>Create</span>
            </Button>
          </div>
        </div>
        <ServerDatatable
          data={data}
          columns={columns}
          isLoading={isLoading}
          onRowClick={(row) =>
            router.push(`/extrals/purchase-requisitions/${row.id}/details`)
          }
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
    </div>
  );
};
export default Page;
