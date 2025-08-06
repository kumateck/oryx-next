import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Icon,
} from "@/components/ui";
import ThrowErrorMessage from "@/lib/throw-error";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CreateATRDto, CreateATRValidator } from "./types";
import { cn, CollectionTypes, Option } from "@/lib";
import {
  TestStage,
  usePostApiV1CollectionMutation,
  usePostApiV1QaAnalyticalTestsMutation,
} from "@/lib/redux/api/openapi.generated";
import AtrForm from "./form";

export interface DefaultProps {
  batchManufacturingRecordId: string;
  expiryDate: string;
  manufacturingDate: string;
  batchNumber: string;
  expiryDateName: string;
  manufacturingDateName: string;
  productName: string;
}
interface Props {
  isOpen: boolean;
  onClose: () => void;
  productionScheduleId: string;
  productId: string;
  productionActivityStepId: string;
  defaultValues?: DefaultProps;
}
const CreateATR = ({
  isOpen,
  onClose,
  productionScheduleId,
  productId,
  productionActivityStepId,
  defaultValues,
}: Props) => {
  const [createATRMutation, { isLoading }] =
    usePostApiV1QaAnalyticalTestsMutation();
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateATRDto>({
    resolver: CreateATRValidator,
  });

  const [loadCollection, { data: collectionResponse }] =
    usePostApiV1CollectionMutation();

  useEffect(() => {
    loadCollection({
      body: [CollectionTypes.ProductState],
    });
  }, [loadCollection]);

  const productStateOptions = collectionResponse?.[
    CollectionTypes.ProductState
  ]?.map((uom) => ({
    label: uom.name,
    value: uom.id,
  })) as Option[];

  const onSubmit = async (data: CreateATRDto) => {
    try {
      // Call the API to create the service provider
      await createATRMutation({
        createAnalyticalTestRequest: {
          stage: Number(data.stage) as TestStage,
          stateId: data.state.value,
          filled: data.filledVolume,
          productId,
          productionScheduleId,
          productionActivityStepId,
          batchManufacturingRecordId: defaultValues?.batchManufacturingRecordId,
          expiryDate: defaultValues?.expiryDate,
          manufacturingDate: defaultValues?.manufacturingDate,
        },
      });
      toast.success("ATR created successfully");
      reset();
      onClose();
    } catch (error) {
      ThrowErrorMessage(error);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Analytic Test Request</DialogTitle>
        </DialogHeader>
        <ul className="bg-white p-4 rounded-xl shadow-sm text-sm text-gray-700 space-y-2 list-none">
          <li className="flex justify-between">
            <span className="font-medium text-gray-600">Product:</span>
            <span>{defaultValues?.productName}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-medium text-gray-600">Batch Number:</span>
            <span>{defaultValues?.batchNumber}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-medium text-gray-600">
              Manufacturing Date:
            </span>
            <span>{defaultValues?.manufacturingDateName}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-medium text-gray-600">Expiry Date:</span>
            <span>{defaultValues?.expiryDateName}</span>
          </li>
        </ul>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <AtrForm
            productStateOptions={productStateOptions}
            register={register}
            control={control}
            errors={errors}
          />
          <DialogFooter className="justify-end gap-4 py-6">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              type="submit"
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

export default CreateATR;
