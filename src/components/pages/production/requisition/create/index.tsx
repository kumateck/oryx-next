"use client";
import PageWrapper from "@/components/layout/wrapper";
import { EMaterialKind, getMatchingIds } from "@/lib";
import { useLazyGetApiV1MaterialQuery } from "@/lib/redux/api/openapi.generated";
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
    useLazyGetApiV1MaterialQuery();

  const loadPackagePurchaseData = () => {
    const material =
      rawMaterials?.data?.map((item) => ({
        id: item?.id as string,
      })) ?? [];
    const ids = getMatchingIds(material, rowSelection);
    // const productFound = data?.products?.find(
    //   (item) => item.product?.id === productId,
    // );
    const filteredItems = rawMaterials?.data?.filter((item) =>
      ids.includes(item?.id as string),
    );
    const filtered = filteredItems?.map((material) => {
      return {
        code: material?.code,
        materialName: material?.name,
        materialId: material?.id,
        // uom,
        quantityOnHand: 0,
        quantityRequested: 0,
        quantity: 0,
        totalStock: 0,
        // uomId: material.?.id,
      };
    }) as unknown as MaterialRequestDto[];
    setPurchaseLists(filtered);
    setIsOpenPurchase(true);
  };

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
          productId={""}
          productionScheduleId={""}
        />
      )}
    </PageWrapper>
  );
};

export default Page;
