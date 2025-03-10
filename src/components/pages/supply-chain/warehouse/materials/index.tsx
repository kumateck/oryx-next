"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import PageWrapper from "@/components/layout/wrapper";
import {
  Button,
  Icon,
  Label,
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui";
import { EMaterialKind, routes } from "@/lib";
import {
  MaterialKind,
  useLazyGetApiV1MaterialQuery,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";

import { columns } from "./column";
import Create from "./create";

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const triggerReload = useSelector((state) => state.common.triggerReload);
  const searchQuery = useSelector((state) => state.common.searchInput);

  const handleLoadMaterials = async (
    kind: EMaterialKind,
    page: number,
    pageSize: number,
    searchQuery: string,
  ) => {
    await loadMaterials({
      page,
      pageSize,
      kind,
      searchQuery,
    }).unwrap();
  };
  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);
  const [kind, setKind] = useState<EMaterialKind>(0);

  const [loadMaterials, { isLoading, isFetching, data: rawMaterials }] =
    useLazyGetApiV1MaterialQuery();

  useEffect(() => {
    handleLoadMaterials(kind, page, pageSize, searchQuery);
    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, triggerReload, searchQuery]);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <PageWrapper className="w-full space-y-2 py-1">
      {isOpen && (
        <Create kind={kind} onClose={() => setIsOpen(false)} isOpen={isOpen} />
      )}
      <div className="flex items-center justify-between py-2">
        <PageTitle title="Materials" />
        <div className="flex items-center justify-end gap-2">
          <RadioGroup
            onValueChange={(value) => {
              const selectedKind = Number(value) as MaterialKind;
              setKind(selectedKind);
              loadMaterials({
                page,
                pageSize,
                kind: selectedKind,
                searchQuery,
              }).unwrap();
            }}
            defaultValue={EMaterialKind.Raw.toString()}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={EMaterialKind.Raw.toString()} id="r1" />
              <Label htmlFor="r1">Raw Materials</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value={EMaterialKind.Packing.toString()}
                id="r2"
              />
              <Label htmlFor="r2">Package Materials</Label>
            </div>
          </RadioGroup>
          <Button variant="default" size={"sm"} onClick={() => setIsOpen(true)}>
            <Icon name="Plus" className="h-4 w-4" /> <span>Create</span>
          </Button>
        </div>
      </div>

      <ServerDatatable
        data={rawMaterials?.data ?? []}
        columns={columns}
        isLoading={isLoading || isFetching}
        setPage={setPage}
        setPageSize={setPageSize}
        onRowClick={(row) => {
          router.push(routes.viewMaterial(row?.id as string));
        }}
        meta={{
          pageIndex: rawMaterials?.pageIndex as number,
          pageCount: rawMaterials?.pageCount as number,
          totalRecordCount: rawMaterials?.totalRecordCount as number,
          numberOfPagesToShow: rawMaterials?.numberOfPagesToShow as number,
          startPageIndex: rawMaterials?.startPageIndex as number,
          stopPageIndex: rawMaterials?.stopPageIndex as number,
          pageSize,
        }}
      />
    </PageWrapper>
  );
};
export default Page;
