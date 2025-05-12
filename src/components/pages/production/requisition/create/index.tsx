"use client";
import PageWrapper from "@/components/layout/wrapper";
import {
  EMaterialKind,
  findRecordWithFullAccess,
  getLargestUnit,
  getMatchingIds,
  PermissionKeys,
  Section,
  Units,
} from "@/lib";
import { useLazyGetApiV1MaterialDepartmentQuery } from "@/lib/redux/api/openapi.generated";
import { ServerDatatable } from "@/shared/datatable";
import React, { useCallback, useEffect, useState } from "react";
import { columns } from "./columns";
import PageTitle from "@/shared/title";
import AccessTabs from "@/shared/access";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RowSelectionState } from "@tanstack/react-table";
import { Button, Icon, Separator } from "@/components/ui";
import { MaterialRequestDto } from "./type";
import Purchase from "../../schedule/details/products/purchase";
import { useSelector } from "@/lib/redux/store";

const Page = () => {
  const router = useRouter();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);
  const [purchaseLists, setPurchaseLists] = useState<MaterialRequestDto[]>([]);
  const [isOpenPurchase, setIsOpenPurchase] = useState(false);

  const searchParams = useSearchParams();
  const kind = searchParams.get("kind") as unknown as EMaterialKind; // Extracts 'type' from URL

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

  const handleTabClick = (tabType: EMaterialKind) => {
    router.push(pathname + "?" + createQueryString("kind", tabType.toString()));
  };
  useEffect(() => {
    loadMaterials({
      page,
      pageSize,
      kind: kind || EMaterialKind.Raw,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, kind]);
  const [loadMaterials, { isLoading, isFetching, data: rawMaterials }] =
    useLazyGetApiV1MaterialDepartmentQuery();

  const loadPackagePurchaseData = () => {
    const material =
      rawMaterials?.data?.map((item) => ({
        id: item?.material?.id as string,
      })) ?? [];
    const ids = getMatchingIds(material, rowSelection);
    // const productFound = data?.products?.find(
    //   (item) => item.product?.id === productId,
    // );
    const filteredItems = rawMaterials?.data?.filter((item) =>
      ids.includes(item?.material?.id as string),
    );
    const filtered = filteredItems?.map((item) => {
      return {
        code: item.material?.code,
        materialName: item.material?.name,
        materialId: item.material?.id,
        uom: getLargestUnit(item.uoM?.symbol as Units),
        quantityOnHand: 0,
        quantityRequested: 0,
        quantity: 0,
        totalStock: 0,
        uomId: item.uoM?.id,
      };
    }) as unknown as MaterialRequestDto[];
    setPurchaseLists(filtered);
    setIsOpenPurchase(true);
  };

  // console.log(rawMaterials?.data, "rawMaterials?.data");
  // check permissions here
  const permissions = useSelector(
    (state) => state.persistedReducer?.auth?.permissions,
  ) as Section[];
  // check permissions access
  const canCreateRawMaterialRequisition = findRecordWithFullAccess(
    permissions,
    PermissionKeys.production.createRawMaterialPurchaseRequisition,
  );
  // check permission for packaging meterial
  const canCreatePackagingRequisistion = findRecordWithFullAccess(
    permissions,
    PermissionKeys.production.createPackagingMaterialStockRequisition,
  );
  return (
    <PageWrapper>
      <div className="flex items-center justify-between py-2">
        <PageTitle title="Create Purchase Requisition" />
        <div>
          <div className="flex items-center gap-2   justify-end">
            {Object.keys(rowSelection).length > 0 && (
              <div className="flex items-center gap-2">
                <Icon
                  name="SquareCheck"
                  className="size-6 text-primary-default"
                />
                <span>
                  {Object.keys(rowSelection).length} Item
                  {Object.keys(rowSelection).length > 1 && "s"}
                </span>
                <Separator orientation="vertical" />
                <Button size="sm" onClick={loadPackagePurchaseData}>
                  Purchase Requisition
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-end gap-2">
          {canCreateRawMaterialRequisition &&
            canCreatePackagingRequisistion && (
              <AccessTabs
                handleTabClick={handleTabClick}
                type={kind}
                tabs={[
                  {
                    label: EMaterialKind[EMaterialKind.Raw],
                    value: EMaterialKind.Raw.toString(),
                  },
                  {
                    label: EMaterialKind[EMaterialKind.Packing],
                    value: EMaterialKind.Packing.toString(),
                  },
                ]}
              />
            )}
          {!canCreateRawMaterialRequisition &&
            canCreatePackagingRequisistion && (
              <AccessTabs
                handleTabClick={handleTabClick}
                type={kind}
                tabs={[
                  // {
                  //   label: EMaterialKind[EMaterialKind.Raw],
                  //   value: EMaterialKind.Raw.toString(),
                  // },
                  {
                    label: EMaterialKind[EMaterialKind.Packing],
                    value: EMaterialKind.Packing.toString(),
                  },
                ]}
              />
            )}
          {canCreateRawMaterialRequisition &&
            !canCreatePackagingRequisistion && (
              <AccessTabs
                handleTabClick={handleTabClick}
                type={kind}
                tabs={[
                  {
                    label: EMaterialKind[EMaterialKind.Raw],
                    value: EMaterialKind.Raw.toString(),
                  },
                  // {
                  //   label: EMaterialKind[EMaterialKind.Packing],
                  //   value: EMaterialKind.Packing.toString(),
                  // },
                ]}
              />
            )}
        </div>
      </div>

      <ServerDatatable
        data={rawMaterials?.data ?? []}
        columns={columns}
        isLoading={isLoading || isFetching}
        setPage={setPage}
        setPageSize={setPageSize}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
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
      {purchaseLists.length > 0 && (
        <Purchase
          lists={purchaseLists}
          onClose={() => setIsOpenPurchase(false)}
          isOpen={isOpenPurchase}
        />
      )}
    </PageWrapper>
  );
};

export default Page;
