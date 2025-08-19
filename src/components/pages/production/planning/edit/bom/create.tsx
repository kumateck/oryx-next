import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

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
  onAddItem: (item: BomRequestDto) => boolean;
  existingItems: BomRequestDto[];
  isOpen: boolean;
  onClose: () => void;
}

const Create = ({ onAddItem, existingItems, isOpen, onClose }: Props) => {
  const form = useForm<BomRequestDto>({
    resolver: CreateBomValidator,
    mode: "onChange",
    defaultValues: {
      casNumber: "",
      function: "",
      grade: "",
      isSubstitutable: false,
      baseQuantity: 0,
      rowId: uuidv4(),
    },
  });

  const {
    register,
    control,
    formState: { errors, isValid },
    reset,
    handleSubmit,
  } = form;

  const [loadCollection, { data: collectionResponse }] =
    usePostApiV1CollectionMutation();

  // const { data: uomResponse } = useGetApiV1CollectionUomQuery({
  //   isRawMaterial: true,
  //   module: AuditModules.general.name,
  //   subModule: AuditModules.general.collection,
  // });

  // const materialOptions = useMemo(() => {
  //   if (!materialResponse?.data) return [];

  //   const usedMaterialIds = new Set(
  //     existingItems.map((item) => item.materialId?.value).filter(Boolean),
  //   );

  //   return materialResponse.data
  //     .filter((material) => !usedMaterialIds.has(material?.id as string))
  //     .map((material: MaterialDto) => ({
  //       label: material.name || "",
  //       value: material.id || "",
  //     })) as Option[];
  // }, [materialResponse?.data, existingItems]);

  const materialTypeOptions = useMemo(() => {
    return (
      (collectionResponse?.[COLLECTION_TYPES.MaterialType]?.map((item) => ({
        label: item.name || "",
        value: item.id || "",
      })) as Option[]) || []
    );
  }, [collectionResponse]);

  // const uomOptions = useMemo(() => {
  //   return (
  //     (uomResponse
  //       ?.filter((item) => item.isRawMaterial)
  //       ?.map((uom) => ({
  //         label: uom.symbol || "",
  //         value: uom.id || "",
  //       })) as Option[]) || []
  //   );
  // }, [uomResponse]);

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

  useEffect(() => {
    if (isOpen) {
      loadCollection({
        module: AuditModules.general.name,
        subModule: AuditModules.general.collection,
        body: [COLLECTION_TYPES.MaterialType, COLLECTION_TYPES.ProductCategory],
      } as PostApiV1CollectionApiArg);
    }
  }, [isOpen, loadCollection]);

  const onSubmit = (data: BomRequestDto) => {
    const success = onAddItem(data);
    if (success) {
      toast.success("BOM item added successfully");
      reset();
      onClose();
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

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
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Add BOM Item</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <BomForm
              register={register}
              errors={errors}
              control={control}
              materialTypeOptions={materialTypeOptions}
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
                disabled={!isValid}
              >
                <Icon name="Plus" className="h-4 w-4" />
                <span>Add BOM Item</span>
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Create;
