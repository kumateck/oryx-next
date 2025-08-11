"use client";

import { useEffect, useState } from "react";
import PageWrapper from "@/components/layout/wrapper";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";

import { columns } from "./column";
import { useRouter } from "next/navigation";
import Create from "./create";
import { Button, Icon } from "@/components/ui";
import { useLazyGetApiV1VendorsQuery } from "@/lib/redux/api/openapi.generated";
import { useSelector } from "@/lib/redux/store";
import { useDebounce } from "@uidotdev/usehooks";
import { useDispatch } from "react-redux";
import { commonActions } from "@/lib/redux/slices/common";

const Page = () => {
  const router = useRouter();
  const [loadVenders, { data: vendersData, isLoading }] =
    useLazyGetApiV1VendorsQuery({});
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
      searchQuery: debouncedValue,
    });
    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, debouncedValue, triggerReload]);
  const data = vendersData?.data || [];

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
          setPage={setPage}
          setPageSize={setPageSize}
          meta={{
            pageIndex: vendersData?.pageIndex as number,
            pageCount: vendersData?.pageCount as number,
            totalRecordCount: vendersData?.totalRecordCount as number,
            numberOfPagesToShow: vendersData?.numberOfPagesToShow as number,
            startPageIndex: vendersData?.startPageIndex as number,
            stopPageIndex: vendersData?.stopPageIndex as number,
            pageSize,
          }}
        />
      </PageWrapper>
    </div>
  );
};
export default Page;
