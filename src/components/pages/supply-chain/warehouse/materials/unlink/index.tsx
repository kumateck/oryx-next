"use client";

import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { useSelector } from "@/lib/redux/store";
import {
  useLazyGetApiV1CollectionUomQuery,
  useLazyGetApiV1MaterialDepartmentNotLinkedQuery,
  usePostApiV1MaterialDepartmentMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";

import { EMaterialKind, Option } from "@/lib";

import PageWrapper from "@/components/layout/wrapper";
import PageTitle from "@/shared/title";
import TableForData from "./table";
import { itemsRequestSchema, MaterialRequestDto } from "./types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import AccessTabs from "@/shared/access";
import { Button, Icon } from "@/components/ui";
import ThrowErrorMessage from "@/lib/throw-error";
import { toast } from "sonner";

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchQuery = useSelector((state) => state.common.searchInput);

  const [saveMutation, { isLoading: isSaving }] =
    usePostApiV1MaterialDepartmentMutation();

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

  const [itemLists, setItemLists] = useState<MaterialRequestDto[]>([]);
  const triggerReload = useSelector((state) => state.common.triggerReload);

  const [loadUnlinkedMaterials, { isLoading, isFetching }] =
    useLazyGetApiV1MaterialDepartmentNotLinkedQuery();

  useEffect(() => {
    handleLoadMaterials(kind, searchQuery);

    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind, searchQuery, triggerReload]);

  const [loadUom] = useLazyGetApiV1CollectionUomQuery();

  const handleLoadMaterials = async (
    kind: EMaterialKind,
    searchQuery?: string,
  ) => {
    const response = await loadUnlinkedMaterials({
      kind: (Number(kind) as EMaterialKind) || EMaterialKind.Raw,
      page: 1,
      pageSize: 500,
      searchQuery,
    }).unwrap();

    const uomResponse = await loadUom({
      isRawMaterial: Number(kind) === EMaterialKind.Packing ? false : true,
    }).unwrap();
    const uomOptions = uomResponse?.map((uom) => ({
      label: uom.symbol,
      value: uom.id,
    })) as Option[];
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
  };

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
      // console.log(validate.error.issues, "issues");
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
