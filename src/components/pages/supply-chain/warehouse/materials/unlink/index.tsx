"use client";

import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { useSelector } from "@/lib/redux/store";
import {
  useLazyGetApiV1MaterialDepartmentNotLinkedQuery,
  usePostApiV1CollectionUomPaginatedMutation,
  usePostApiV1MaterialDepartmentMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";

import { EMaterialKind, Option, UoMType } from "@/lib";

import PageWrapper from "@/components/layout/wrapper";
import PageTitle from "@/shared/title";
import TableForData from "./table";
import { itemsRequestSchema, MaterialRequestDto } from "./types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import AccessTabs from "@/shared/access";
import { Button, Icon } from "@/components/ui";
import ThrowErrorMessage from "@/lib/throw-error";
import { useDebounce } from "@uidotdev/usehooks";
import { toast } from "sonner";

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchQuery = useSelector((state) => state.common.searchInput);
  const debouncedValue = useDebounce(searchQuery, 500);

  const [saveMutation, { isLoading: isSaving }] =
    usePostApiV1MaterialDepartmentMutation();

  const searchParams = useSearchParams();
  const kind =
    (searchParams.get("kind") as unknown as EMaterialKind) ?? EMaterialKind.Raw;

  const pathname = usePathname();

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

  const [itemLists, setItemLists] = useState<MaterialRequestDto[]>([]);
  const triggerReload = useSelector((state) => state.common.triggerReload);

  const [loadUnlinkedMaterials, { isLoading, isFetching }] =
    useLazyGetApiV1MaterialDepartmentNotLinkedQuery();

  const [loadUom] = usePostApiV1CollectionUomPaginatedMutation();
  const [uomOptions, setUomOptions] = useState<Option[]>([]);

  const handleLoadUom = async (type: UoMType) => {
    try {
      const response = await loadUom({
        filterUnitOfMeasure: {
          pageSize: 100,
          types: [type],
        },
      }).unwrap();

      const uom = response.data;
      const uomOpt = uom?.map((u) => ({
        label: `${u.name} (${u.symbol})`,
        value: u.id,
      })) as Option[];

      setUomOptions(uomOpt);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoadMaterials = async (
    kind: EMaterialKind,
    searchQuery?: string,
  ) => {
    try {
      const response = await loadUnlinkedMaterials({
        kind: (Number(kind) as EMaterialKind) || EMaterialKind.Raw,
        page: 1,
        pageSize: 500,
        searchQuery,
      }).unwrap();

      const results = response.data?.map((item) => ({
        materialId: item?.id,
        materialName: item?.name,
        uomId: {
          label: "",
          value: "",
        },
        code: item?.code,
        reOrderLevel: 0,
        minimumStockLevel: 0,
        maximumStockLevel: 0,
        options: uomOptions,
      })) as MaterialRequestDto[];

      setItemLists(results);
    } catch (error) {
      ThrowErrorMessage(error);
    }
  };

  useEffect(() => {
    handleLoadMaterials(kind, debouncedValue);

    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind, debouncedValue, triggerReload]);

  useEffect(() => {
    handleLoadUom(kind as unknown as UoMType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind]);

  const handleSaveChanges = async () => {
    const payload = itemLists?.filter(
      (item) =>
        item.reOrderLevel > 0 &&
        item.minimumStockLevel > 0 &&
        item.maximumStockLevel > 0,
    );

    if (payload.length === 0) {
      toast.error("No materials selected");
      return;
    }

    const validate = itemsRequestSchema.safeParse(payload);

    if (!validate.success) {
      const errors = validate.error.issues.map(
        ({ message, path }) =>
          `${payload[path[0] as number].materialName}: ${message}`,
      );
      toast.error(errors.join(". "));
    } else {
      try {
        await saveMutation({
          body: payload?.map((item) => ({
            materialId: item.materialId,
            uoMId: item.uomId?.value,
            reOrderLevel: item.reOrderLevel,
            minimumStockLevel: item.minimumStockLevel,
            maximumStockLevel: item.maximumStockLevel,
          })),
        }).unwrap();

        toast.success("Materials Linked to Department");
        handleLoadMaterials(kind);
      } catch (error) {
        ThrowErrorMessage(error);
      }
    }
  };

  return (
    <PageWrapper className="w-full space-y-2">
      <div className="w-full flex items-center justify-between gap-4">
        <PageTitle title="Unlinked Materials" />
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
      <div className="flex justify-end">
        <Button className="flex items-center gap-2" onClick={handleSaveChanges}>
          {isSaving && <Icon name="LoaderCircle" className="animate-spin" />}
          <span>Save Changes</span>
        </Button>
      </div>
      <div className="pb-12">
        <TableForData
          isLoading={isLoading || isFetching}
          lists={itemLists}
          setItemLists={setItemLists}
        />
      </div>
    </PageWrapper>
  );
};

export default Page;
