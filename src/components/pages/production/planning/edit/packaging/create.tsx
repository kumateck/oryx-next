import { useForm, useWatch } from "react-hook-form";

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Icon,
} from "@/components/ui";
import { EMaterialKind, Option } from "@/lib";
import {
  MaterialDepartmentWithWarehouseStockDto,
  useLazyGetApiV1MaterialDepartmentQuery,
  useLazyGetApiV1MaterialSpecificationsMaterialByIdQuery,
} from "@/lib/redux/api/openapi.generated";

import PackageForm from "./form";
import { CreatePackagingValidator, PackagingRequestDto } from "./types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// import "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: PackagingRequestDto) => boolean;
  existingItems: PackagingRequestDto[];
}
const Create = ({ isOpen, onClose, onAddItem, existingItems }: Props) => {
  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
    setValue,
  } = useForm<PackagingRequestDto>({
    resolver: CreatePackagingValidator,
    mode: "onChange",
    defaultValues: {
      packingExcessMargin: 0,
      unitCapacity: 0,
    },
  });

  // const { data: materialResponse } = useGetApiV1MaterialQuery({
  //   page: 1,
  //   pageSize: 10000,
  //   kind: EMaterialKind.Packing,
  // });

  // const materialOptions = _.isEmpty(itemLists)
  //   ? (materialResponse?.data?.map((uom: MaterialDto) => ({
  //       label: uom.name,
  //       value: uom.id,
  //     })) as Option[])
  //   : (_.filter(
  //       materialResponse?.data,
  //       (itemA) =>
  //         !_.some(itemLists, (itemB) => itemA?.id === itemB?.material.value),
  //     )?.map((uom: MaterialDto) => ({
  //       label: uom.name,
  //       value: uom.id,
  //     })) as Option[]);

  const [materials, setMaterials] = useState<
    MaterialDepartmentWithWarehouseStockDto[]
  >([]);
  const [loadSpec] = useLazyGetApiV1MaterialSpecificationsMaterialByIdQuery();

  const [
    loadMaterials,
    { isLoading: isLoadingMaterials, isFetching: isFetchingMaterials },
  ] = useLazyGetApiV1MaterialDepartmentQuery();
  const loadDataOrSearch = async (searchQuery: string, page: number) => {
    const res = await loadMaterials({
      searchQuery,
      page,
      kind: EMaterialKind.Packing,
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

  const directLinkMaterialOptions = existingItems?.map((item) => ({
    label: item.materialId?.label,
    value: item.materialId?.value,
  })) as Option[];

  const selectedMaterial = useWatch({
    control,
    name: "materialId",
  }) as Option;
  useEffect(() => {
    if (selectedMaterial) {
      handleSelectedMaterial(materials, selectedMaterial);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materials, selectedMaterial]);

  const handleSelectedMaterial = async (
    materials: MaterialDepartmentWithWarehouseStockDto[],
    selectedMaterial: Option,
  ) => {
    const foundMaterial = materials.find(
      (department) => department?.material?.id === selectedMaterial.value,
    );
    if (foundMaterial) {
      const specResponse = await loadSpec({
        id: foundMaterial?.material?.id as string,
      }).unwrap();
      const spec = specResponse?.specificationNumber as string;
      setValue("spec", spec);

      setValue("code", foundMaterial?.material?.code || "");
    }
  };

  const onSubmit = (data: PackagingRequestDto) => {
    const success = onAddItem(data);
    if (success) {
      toast.success("Packing item added to the list");
      reset();
      onClose();
    }
    // setItemLists((prevState) => {
    //   const payload = {
    //     ...data,
    //     idIndex: (prevState.length + 1).toString(),
    //   };
    //   return [...prevState, payload]; // Add new item to the array
    // });

    // reset(); // Reset the form after submission
    // onClose(); // Close the form/modal if applicable
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Add Package</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <PackageForm
            register={register}
            control={control}
            errors={errors}
            fetchOptions={loadDataOrSearch}
            isLoading={isLoadingMaterials || isFetchingMaterials}
            directLinkMaterialOptions={directLinkMaterialOptions}
          />
          <DialogFooter className="justify-end gap-4 py-6">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>

            <Button variant={"default"} className="flex items-center gap-2">
              <Icon name="Plus" className="h-4 w-4" />
              <span>Add Package</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Create;
