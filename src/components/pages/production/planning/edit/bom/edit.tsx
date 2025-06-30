import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
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
import { AuditModules, COLLECTION_TYPES, Option } from "@/lib";
import {
  MaterialDto,
  PostApiV1CollectionApiArg,
  useGetApiV1CollectionUomQuery,
  useGetApiV1MaterialQuery,
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
  currentIndex: number;
}

const Edit = ({
  isOpen,
  onClose,
  details,
  onUpdateItem,
  existingItems,
  currentIndex,
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

  const { data: materialResponse } = useGetApiV1MaterialQuery({
    page: 1,
    pageSize: 1000,
    kind: 0,
    module: AuditModules.warehouse.name,
    subModule: AuditModules.warehouse.materials,
  });

  const { data: uomResponse } = useGetApiV1CollectionUomQuery({
    isRawMaterial: true,
    module: AuditModules.general.name,
    subModule: AuditModules.general.collection,
  });

  const materialOptions = useMemo(() => {
    if (!materialResponse?.data) return [];

    const usedMaterialIds = new Set(
      existingItems
        .filter((_, idx) => idx !== currentIndex)
        .map((item) => item.materialId?.value)
        .filter(Boolean),
    );

    return materialResponse.data
      .filter(
        (material) =>
          !usedMaterialIds.has(material?.id as string) ||
          material.id === details.materialId?.value,
      )
      .map((material: MaterialDto) => ({
        label: material.name || "",
        value: material.id || "",
      })) as Option[];
  }, [
    materialResponse?.data,
    existingItems,
    currentIndex,
    details.materialId?.value,
  ]);

  const materialTypeOptions = useMemo(() => {
    return (
      (collectionResponse?.[COLLECTION_TYPES.MaterialType]?.map((item) => ({
        label: item.name || "",
        value: item.id || "",
      })) as Option[]) || []
    );
  }, [collectionResponse]);

  const uomOptions = useMemo(() => {
    return (
      (uomResponse?.map((uom) => ({
        label: uom.symbol || "",
        value: uom.id || "",
      })) as Option[]) || []
    );
  }, [uomResponse]);

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
            materialOptions={materialOptions}
            uomOptions={uomOptions}
            defaultValues={details}
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
