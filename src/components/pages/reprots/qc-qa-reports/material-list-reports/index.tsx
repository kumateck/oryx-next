"use client";
import { useEffect, useRef, useState } from "react";
import PageWrapper from "@/components/layout/wrapper";
import { Label, RadioGroup, RadioGroupItem } from "@/components/ui";
import { EMaterialKind } from "@/lib";
import {
  MaterialKind,
  useLazyGetApiV1MaterialQuery,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";
// import NoAccess from "@/shared/no-access";
// import { useUserPermissions } from "@/hooks/use-permission";
import { useReactToPrint } from "react-to-print";
import { columns } from "./column";
import { toast } from "sonner";
import DropdownBtns from "@/shared/btns/drop-btn";
import PrintTable from "./table";

const Page = () => {
  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);
  const [kind, setKind] = useState<EMaterialKind>(0);
  const dispatch = useDispatch();
  const triggerReload = useSelector((state) => state.common.triggerReload);
  const searchQuery = useSelector((state) => state.common.searchInput);
  const [print, setPrint] = useState(false);

  const contentRef = useRef<HTMLTableElement | null>(null);

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

  const [loadMaterials, { isLoading, isFetching, data: rawMaterials }] =
    useLazyGetApiV1MaterialQuery();

  useEffect(() => {
    handleLoadMaterials(kind, page, pageSize, searchQuery);
    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, triggerReload, searchQuery]);

  // //Check Permision
  // const { hasPermissionAccess } = useUserPermissions();
  // // check permissions access
  // const hasAccess = hasPermissionAccess(
  //   PermissionKeys.warehouse.viewRawMaterials,
  // );
  // // check permission for packaging meterial
  // const hasAccessToPackageMaterial = hasPermissionAccess(
  //   PermissionKeys.warehouse.viewPackagingMaterials,
  // );

  const handlePrint = useReactToPrint({
    contentRef,
    onBeforePrint: async () => {
      setPrint(true);
    },
    onAfterPrint: async () => {
      setPrint(false);
    },

    documentTitle: `Staff Gender Report`,
    pageStyle: `
            @media print {
                html, body {
                  font-size: 12px;
                }
              }
              @page {
                margin: 2mm 15mm;
              }`,
  });
  console.log("rawMaterials", rawMaterials);
  return (
    <PageWrapper className="w-full space-y-2 py-1">
      <div className="flex items-center justify-between py-2">
        <PageTitle title="Materials" />
        <div className="flex items-center justify-end gap-2">
          <RadioGroup
            className="flex items-center gap-4"
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
          <DropdownBtns
            variant="default"
            icon="Download"
            title="Export"
            menus={[
              {
                name: "PDF File",
                onClick: () => {
                  if (!rawMaterials?.data || rawMaterials.data.length === 0) {
                    toast.warning("No data available to print");
                    return;
                  }
                  setPrint(true);
                  handlePrint();
                },
              },
            ]}
          />
        </div>
      </div>
      {print && <PrintTable ref={contentRef} data={rawMaterials?.data ?? []} />}
      <ServerDatatable
        data={rawMaterials?.data ?? []}
        columns={columns}
        isLoading={isLoading || isFetching}
        setPage={setPage}
        setPageSize={setPageSize}
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
