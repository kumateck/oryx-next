import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Icon,
} from "@/components/ui";
import {
  AuditModules,
  cn,
  CODE_SETTINGS,
  ErrorResponse,
  isErrorResponse,
  Option,
} from "@/lib";
import React from "react";
import { useForm } from "react-hook-form";
import { StandardTestForm } from "./form";
import {
  PostApiV1FileByModelTypeAndModelIdApiArg,
  usePostApiV1FileByModelTypeAndModelIdMutation,
  PostApiV1ProductStpsApiArg,
  CreateProductStandardTestProcedureRequest,
  usePostApiV1ProductStpsMutation,
  useGetApiV1ProductQuery,
} from "@/lib/redux/api/openapi.generated";
import {
  CreateStandardTestProcedureDto,
  StandardTestProcedureValidator,
} from "./types";
import { toast } from "sonner";
import { commonActions } from "@/lib/redux/slices/common";
import { useDispatch } from "react-redux";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const Create = ({ isOpen, onClose }: Props) => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateStandardTestProcedureDto>({
    resolver: StandardTestProcedureValidator,
  });

  //get products
  const { data: products } = useGetApiV1ProductQuery({
    page: 1,
    pageSize: 1000,
    module: AuditModules.warehouse.name,
    subModule: AuditModules.warehouse.materials,
  });
  const [createStandardTestProcedure, { isLoading }] =
    usePostApiV1ProductStpsMutation();
  const [uploadAttachment] = usePostApiV1FileByModelTypeAndModelIdMutation();

  //fuction fro creating standard test procedure
  const onSubmit = async (data: CreateStandardTestProcedureDto) => {
    try {
      const payload = {
        stpNumber: data.stpNumber,
        productId: data.productId.value,
      } as CreateProductStandardTestProcedureRequest;
      // 1. Create the standard test procedure
      const standardTestProcedureId = await createStandardTestProcedure({
        module: AuditModules.settings.name,
        subModule: AuditModules.settings.standardTestProcedure,
        createProductStandardTestProcedureRequest: payload,
      } as PostApiV1ProductStpsApiArg).unwrap();
      //upload attachment if any
      if (standardTestProcedureId && data?.attachments?.length > 0) {
        const files = Array.isArray(data.attachments)
          ? data.attachments
          : Array.from(data.attachments);
        const formData = new FormData();
        files.forEach((file) => {
          formData.append("files", file, file.name);
        });
        if (files.length) {
          // Upload the files
          await uploadAttachment({
            modelType: CODE_SETTINGS.modelTypes.StandardTestProcedure,
            modelId: standardTestProcedureId,
            module: AuditModules.settings.name,
            subModule: AuditModules.settings.standardTestProcedure,
            body: formData,
          } as PostApiV1FileByModelTypeAndModelIdApiArg).unwrap();
        }
      }
      toast.success("STP created successfully");
      dispatch(commonActions.setTriggerReload());
      onClose();
      reset();
    } catch (error) {
      console.error("Error creating STP:", error);
      toast.error(
        isErrorResponse(error as ErrorResponse)?.description ||
          "Failed to create STP",
      );
    }
  };
  const data = products?.data;
  const productOptions = data?.map((product) => {
    return {
      label: product.name,
      value: product.id,
    };
  }) as Option[];

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Standard Test</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <StandardTestForm
            errors={errors}
            register={register}
            control={control}
            productsOptions={productOptions}
          />
          <DialogFooter className="justify-end gap-4 py-6">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant={"default"}
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <Icon
                name={isLoading ? "LoaderCircle" : "Plus"}
                className={cn("h-4 w-4", {
                  "animate-spin": isLoading,
                })}
              />
              <span>Save</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
