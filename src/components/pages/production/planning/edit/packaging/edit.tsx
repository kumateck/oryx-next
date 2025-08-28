// import { useForm } from "react-hook-form";

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
import { toast } from "sonner";
import { useEffect, useState } from "react";

// import "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  details: PackagingRequestDto;
  // setItemLists: React.Dispatch<React.SetStateAction<PackagingRequestDto[]>>;
  // itemLists: PackagingRequestDto[];
  onUpdateItem: (updatedItem: PackagingRequestDto) => boolean;
  existingItems: PackagingRequestDto[];
  currentIndex?: number;
}
const Edit = ({
  isOpen,
  onClose,
  details,
  onUpdateItem,
  existingItems,
}: Props) => {
  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
    setValue,
  } = useForm<PackagingRequestDto>({
    resolver: CreatePackagingValidator,
    mode: "all",
    defaultValues: details,
  });

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

  // const { data: materialResponse } = useGetApiV1MaterialQuery({
  //   page: 1,
  //   pageSize: 10000,
  //   kind: 1,
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

  // const directLinkMaterialOptions = materialResponse?.data?.map(
  //   (uom: MaterialDto) => ({
  //     label: uom.name,
  //     value: uom.id,
  //   }),
  // ) as Option[];

  // const onSubmit = (data: PackagingRequestDto) => {
  //   setItemLists((prevState) => {
  //     return [...prevState, data]; // Add new item to the array
  //   });

  //   reset(); // Reset the form after submission
  //   onClose(); // Close the form/modal if applicable
  // };
  const onSubmit = (data: PackagingRequestDto) => {
    // setItemLists((prevState) => {
    //   // Check if the item already exists in the list
    //   const itemIndex = prevState.findIndex(
    //     (item) => item.idIndex === details.idIndex,
    //   );

    //   if (itemIndex !== -1) {
    //     // Update the existing item if found
    //     const updatedList = [...prevState];
    //     updatedList[itemIndex] = data;
    //     return updatedList;
    //   } else {
    //     // Add new item if not found
    //     return [...prevState, data];
    //   }
    // });

    // reset(); // Reset the form after submission
    // onClose(); // Close the form/modal if applicable
    const success = onUpdateItem(data);
    if (success) {
      toast.success("Packaging item changed");
      reset();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit Package</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <PackageForm
            register={register}
            control={control}
            errors={errors}
            fetchOptions={loadDataOrSearch}
            isLoading={isLoadingMaterials || isFetchingMaterials}
            directLinkMaterialOptions={directLinkMaterialOptions}
            defaultValues={details}
          />
          <DialogFooter className="justify-end gap-4 py-6">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>

            <Button variant={"default"} className="flex items-center gap-2">
              <Icon name="Plus" className="h-4 w-4" />
              <span>Update Changes</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Edit;
