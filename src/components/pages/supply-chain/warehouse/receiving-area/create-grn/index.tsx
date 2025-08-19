"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
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
import { CodeModelTypes, EMaterialKind } from "@/lib";
import {
  CreateGrnRequest,
  DistributedRequisitionMaterialDto,
  MaterialBatchDtoRead,
  useLazyGetApiV1ConfigurationByModelTypeCountQuery,
  usePostApiV1WarehouseDistributedMaterialMaterialBatchMutation,
  usePostApiV1WarehouseGrnMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { ErrorResponse, cn, getNameInBeta, isErrorResponse } from "@/lib/utils";

import GRNForm from "./form";
import { CreateGRNValidator, GRNRequestDto } from "./types";
import { generateGRNNumber, getGRNPrefix } from "@/lib/batch-gen";

interface Props {
  isGRNOpen: boolean;
  onGRNClose: () => void;
  selectedIds: string[];
  selectedMaterials: DistributedRequisitionMaterialDto[];
}

const CreateGRN = ({
  isGRNOpen,
  onGRNClose,
  selectedIds,
  selectedMaterials,
}: Props) => {
  const dispatch = useDispatch();
  const [createGRN, { isLoading }] = usePostApiV1WarehouseGrnMutation();
  const [loadCountConfig] = useLazyGetApiV1ConfigurationByModelTypeCountQuery();

  const [getBatchDetails, { isLoading: isBatchLoading }] =
    usePostApiV1WarehouseDistributedMaterialMaterialBatchMutation();

  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
    setValue,
  } = useForm<GRNRequestDto>({
    resolver: CreateGRNValidator,
    mode: "all",
  });

  const onSubmit = async (data: GRNRequestDto) => {
    try {
      const batchDetails = await getBatchDetails({
        body: selectedIds,
      }).unwrap();

      const materialBatchIds = batchDetails.map(
        (detail: MaterialBatchDtoRead) => detail.id,
      ) as string[];
      const grnNumber = await handleLoadCode();
      const payload = {
        ...data,
        grnNumber,
        materialBatchIds,
      } satisfies CreateGrnRequest;

      await createGRN({
        createGrnRequest: payload,
      });

      toast.success("GRN created successfully");
      dispatch(commonActions.setTriggerReload());
      reset();
      onGRNClose();
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  useEffect(() => {
    handleLoadCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadCode = async () => {
    try {
      const selectedData = selectedMaterials?.find(
        (item) => item.id === selectedIds[0],
      );
      const department = selectedData?.department?.name as string;
      const material = selectedData?.material;

      const warehouse = getNameInBeta(department) ? "BWH" : "NWH";
      const type = Number(material?.kind) === EMaterialKind.Raw ? "RM" : "PM";
      const year = new Date().getFullYear();
      const prefix = getGRNPrefix(warehouse, type, year);

      const countConfigResponse = await loadCountConfig({
        modelType: CodeModelTypes.GRNNumber,
        prefix,
      }).unwrap();
      const serial = countConfigResponse + 1;
      const code = generateGRNNumber({ warehouse, type, year, serial });
      setValue("grnNumber", code);
      return code;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={isGRNOpen} onOpenChange={onGRNClose}>
      <DialogContent className="w-full max-w-6xl">
        <DialogHeader>
          <DialogTitle>Create GRN</DialogTitle>
        </DialogHeader>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <GRNForm
            register={register}
            control={control}
            errors={errors}
            filteredData={selectedMaterials}
          />
          <DialogFooter className="justify-end gap-4 py-6">
            <Button type="button" variant="secondary" onClick={onGRNClose}>
              Cancel
            </Button>

            <Button variant={"default"} className="flex items-center gap-2">
              <Icon
                name={isLoading || isBatchLoading ? "LoaderCircle" : "Plus"}
                className={cn("h-4 w-4", {
                  "animate-spin": isLoading || isBatchLoading,
                })}
              />
              <span>Create GRN</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGRN;
