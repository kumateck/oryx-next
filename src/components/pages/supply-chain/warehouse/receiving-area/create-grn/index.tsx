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
import { CODE_SETTINGS } from "@/lib";
import {
  CreateGrnRequest,
  NamingType,
  useGetApiV1ConfigurationByModelTypeByModelTypeQuery,
  useLazyGetApiV1ProductionScheduleQuery,
  usePostApiV1WarehouseDistributedMaterialMaterialBatchMutation,
  usePostApiV1WarehouseGrnMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import {
  ErrorResponse,
  GenerateCodeOptions,
  cn,
  generateCode,
  isErrorResponse,
} from "@/lib/utils";

import GRNForm from "./form";
import { CreateGRNValidator, GRNRequestDto } from "./types";

interface Props {
  isGRNOpen: boolean;
  onGRNClose: () => void;
  selectedIds: string[];
  data: any[];
}

const CreateGRN = ({ isGRNOpen, onGRNClose, selectedIds, data }: Props) => {
  const dispatch = useDispatch();
  const [createGRN, { isLoading }] = usePostApiV1WarehouseGrnMutation();
  const [getBatchDetails, { isLoading: isBatchLoading }] =
    usePostApiV1WarehouseDistributedMaterialMaterialBatchMutation();
  const { data: codeConfig } =
    useGetApiV1ConfigurationByModelTypeByModelTypeQuery({
      modelType: CODE_SETTINGS.modelTypes.GRNNumber,
    });
  const [loadProduct] = useLazyGetApiV1ProductionScheduleQuery();

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

  const filteredData = data?.filter((item) => selectedIds?.includes(item.id));

  const onSubmit = async (data: GRNRequestDto) => {
    try {
      const selectedMaterialIds = filteredData.map((item) => item.id);

      const batchDetails = await getBatchDetails({
        body: selectedMaterialIds,
      }).unwrap();

      const materialBatchIds = batchDetails.map(
        (detail) => detail.id,
      ) as string[];
      console.log("Material Batch Ids:::", materialBatchIds);

      const payload = {
        ...data,
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
    const loadCodes = async () => {
      const generatePayload: GenerateCodeOptions = {
        maxlength: Number(codeConfig?.maximumNameLength),
        minlength: Number(codeConfig?.minimumNameLength),
        prefix: codeConfig?.prefix as string,
        type: codeConfig?.namingType as NamingType,
      };
      const productsResponse = await loadProduct({
        page: 1,
        pageSize: 1,
      }).unwrap();

      const products = productsResponse?.totalRecordCount ?? 0;
      generatePayload.seriesCounter = products + 1;
      const code = await generateCode(generatePayload);
      setValue("grnNumber", code);
    };

    loadCodes();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeConfig]);

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
            filteredData={filteredData}
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
