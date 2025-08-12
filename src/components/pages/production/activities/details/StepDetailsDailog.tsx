import { useForm } from "react-hook-form";
import {
  AlertDialogHeader,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  Icon,
} from "../../../../ui";
import { CreateGoodsValidator, GoodTransfereDto } from "./types";
import {
  CreateFinishedGoodsTransferNoteRequest,
  useLazyGetApiV1ProductionScheduleManufacturingByProductionIdAndProductionScheduleIdQuery,
  usePostApiV1ProductionScheduleFinishedGoodsTransferNoteMutation,
} from "@/lib/redux/api/openapi.generated";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Form from "./form";
import { toast } from "sonner";
import { cn, ErrorResponse, isErrorResponse } from "@/lib";

type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  stepId: string;
};

function StepDetailsDailog({ isOpen, onClose, stepId }: DialogProps) {
  const searchParams = useSearchParams();
  const productionId = searchParams.get("productId") as string;
  const productionScheduleId = searchParams.get("scheduleId") as string;

  const [loadProduct, { data }] =
    useLazyGetApiV1ProductionScheduleManufacturingByProductionIdAndProductionScheduleIdQuery();
  const [createTransferNote, { isLoading }] =
    usePostApiV1ProductionScheduleFinishedGoodsTransferNoteMutation();

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<GoodTransfereDto>({
    resolver: CreateGoodsValidator,
    mode: "all",
    defaultValues: {
      product: {
        value: data?.product?.id || "",
        label: data?.product?.name || "",
      },
      department: {
        value: data?.product?.department?.id || "",
        label: data?.product?.department?.name || "",
      },
      batchNumber: data?.batchNumber || "",
      menufacturedDate: data?.manufacturingDate
        ? new Date(data.manufacturingDate)
        : undefined,
      expiryDate: data?.expiryDate ? new Date(data.expiryDate) : undefined,
      quantityPerPack: (data?.product?.basePackingQuantity as number) || 0,
      totalTranfareQuantity: data?.product?.fullBatchSize,
      unitMeasure: {
        value: data?.product?.baseUoM?.id || "",
        label: data?.product?.baseUoM?.name || "",
      },
    },
  });

  useEffect(() => {
    loadProduct({
      productionId,
      productionScheduleId,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productionId, productionScheduleId]);

  useEffect(() => {
    if (data) {
      setValue("product", {
        value: data?.product?.id || "",
        label: data?.product?.name || "",
      });
      setValue("department", {
        value: data?.product?.department?.id || "",
        label: data?.product?.department?.name || "",
      });
      setValue("batchNumber", data?.batchNumber || "");
      if (data?.manufacturingDate) {
        setValue("menufacturedDate", new Date(data.manufacturingDate));
      }
      if (data?.expiryDate) {
        setValue("expiryDate", new Date(data.expiryDate));
      }
      setValue(
        "quantityPerPack",
        typeof data?.product?.basePackingQuantity === "number"
          ? data.product.basePackingQuantity
          : 0,
      );
      setValue("totalTranfareQuantity", data?.product?.fullBatchSize ?? 0);
      setValue("unitMeasure", {
        value: data?.product?.baseUoM?.id || "",
        label: data?.product?.baseUoM?.name || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onSubmit = async (data: GoodTransfereDto) => {
    try {
      const payload = {
        uoMId: data.unitMeasure.value,
        quantityPerPack: data.quantityPerPack,
        productionActivityStepId: stepId,
        totalQuantity: data.totalTranfareQuantity,
      } as CreateFinishedGoodsTransferNoteRequest;
      await createTransferNote({
        createFinishedGoodsTransferNoteRequest: payload,
      });
      toast.success("Transfer note created successfully.");
      onClose();
      reset();
    } catch (error) {
      toast.error(
        isErrorResponse(error as ErrorResponse)?.description ||
          "Failed to create transfer note.",
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full">
        <AlertDialogHeader>
          <DialogTitle className="text-lg">
            Finished Goods Transfer Note
          </DialogTitle>
          <DialogDescription>
            {data?.productionSchedule?.code}
          </DialogDescription>
        </AlertDialogHeader>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <Form control={control} register={register} errors={errors} />
            <div className="flex items-center justify-end gap-3 ml-auto">
              <Button type="button" onClick={onClose} variant="outline">
                Cancel
              </Button>
              <Button
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
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default StepDetailsDailog;
