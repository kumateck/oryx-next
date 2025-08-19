import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Icon,
} from "@/components/ui";
import { AuditModules, COLLECTION_TYPES, EMaterialKind, Option } from "@/lib";
import {
  MaterialDepartmentWithWarehouseStockDto,
  PostApiV1CollectionApiArg,
  useLazyGetApiV1MaterialDepartmentQuery,
  usePostApiV1CollectionMutation,
} from "@/lib/redux/api/openapi.generated";

import BomForm from "./form";
import { BomRequestDto, CreateBomValidator } from "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  details: BomRequestDto;
  onUpdateItem: (updatedItem: BomRequestDto) => boolean;
  existingItems: BomRequestDto[];
  currentIndex?: number;
}

const Edit = ({
  isOpen,
  onClose,
  details,
  onUpdateItem,
  existingItems,
}: Props) => {
  const form = useForm<BomRequestDto>({
    resolver: CreateBomValidator,
    mode: "onChange",
    defaultValues: details,
  });

  const {
    register,
    control,
    formState: { errors, isValid, isDirty },
    reset,
    handleSubmit,
  } = form;

  const [loadCollection, { data: collectionResponse }] =
    usePostApiV1CollectionMutation();

  // const materialOptions = useMemo(() => {
  //   if (!materialResponse?.data) return [];

  //   const usedMaterialIds = new Set(
  //     existingItems
  //       .filter((_, idx) => idx !== currentIndex)
  //       .map((item) => item.materialId?.value)
  //       .filter(Boolean),
  //   );

  //   return materialResponse.data
  //     .filter(
  //       (material) =>
  //         !usedMaterialIds.has(material?.id as string) ||
  //         material.id === details.materialId?.value,
  //     )
  //     .map((material: MaterialDto) => ({
  //       label: material.name || "",
  //       value: material.id || "",
  //     })) as Option[];
  // }, [
  //   materialResponse?.data,
  //   existingItems,
  //   currentIndex,
  //   details.materialId?.value,
  // ]);

  const materialTypeOptions = useMemo(() => {
    return (
      (collectionResponse?.[COLLECTION_TYPES.MaterialType]?.map((item) => ({
        label: item.name || "",
        value: item.id || "",
      })) as Option[]) || []
    );
  }, [collectionResponse]);

  useEffect(() => {
    if (isOpen) {
      loadCollection({
        module: AuditModules.general.name,
        subModule: AuditModules.general.collection,
        body: [COLLECTION_TYPES.MaterialType, COLLECTION_TYPES.ProductCategory],
      } as PostApiV1CollectionApiArg);
      reset(details);
    }
  }, [isOpen, details, reset, loadCollection]);

  const onSubmit = (data: BomRequestDto) => {
    const success = onUpdateItem(data);
    if (success) {
      toast.success("BOM item updated successfully");
      onClose();
    }
  };

  const handleClose = () => {
    reset(details);
    onClose();
  };

  const [materials, setMaterials] = useState<
    MaterialDepartmentWithWarehouseStockDto[]
  >([]);
  const selectedMaterial = useWatch({
    control,
    name: "materialId",
  }) as Option;
  useEffect(() => {
    if (selectedMaterial) {
      const material = materials.find(
        (department) => department?.material?.id === selectedMaterial.value,
      );
      if (material) {
        form.setValue("baseUoMId", {
          label: material?.uoM?.symbol || "",
          value: material.uoM?.id || "",
        });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materials, selectedMaterial]);

  const [
    loadMaterials,
    { isLoading: isLoadingMaterials, isFetching: isFetchingMaterials },
  ] = useLazyGetApiV1MaterialDepartmentQuery();
  const loadDataOrSearch = async (searchQuery: string, page: number) => {
    const res = await loadMaterials({
      searchQuery,
      page,
      kind: EMaterialKind.Raw,
    }).unwrap();
    const usedMaterialIds = new Set(
      existingItems.map((item) => item.materialId?.value).filter(Boolean),
    );
    const departmentMaterials =
      res?.data as MaterialDepartmentWithWarehouseStockDto[];
    setMaterials(departmentMaterials);
    const filteredData = departmentMaterials?.filter(
      (item) => !usedMaterialIds.has(item?.material?.id as string),
    );

    const response = {
      options: filteredData?.map((item) => ({
        label: item?.material?.name,
        value: item?.material?.id,
      })) as Option[],
      hasNext: (res?.pageIndex || 0) < (res?.stopPageIndex as number),
      hasPrevious: (res?.pageIndex as number) > 1,
    };
    return response;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit BOM Item</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <BomForm
            register={register}
            errors={errors}
            control={control}
            materialTypeOptions={materialTypeOptions}
            defaultValues={details}
            fetchOptions={loadDataOrSearch}
            isLoading={isLoadingMaterials || isFetchingMaterials}
          />

          <DialogFooter className="justify-end gap-4 py-6">
            <Button type="button" variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              className="flex items-center gap-2"
              disabled={!isValid || !isDirty}
            >
              <Icon name="Check" className="h-4 w-4" />
              <span>Update Changes</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Edit;
