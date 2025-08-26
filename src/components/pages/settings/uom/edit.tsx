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
import { Option, UoMType, UomCategory } from "@/lib";
import {
  CreateUnitOfMeasure,
  UnitOfMeasureCategory,
  UnitOfMeasureDto,
  UnitOfMeasureType,
  usePutApiV1CollectionUomByUomIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { ErrorResponse, isErrorResponse } from "@/lib/utils";

import CodeSettingsForm from "./form";
import { CreateUomValidator, UomRequestDto } from "./types";
import { useDispatch } from "react-redux";
import { commonActions } from "@/lib/redux/slices/common";

interface Props {
  isOpen: boolean;
  onClose: () => void;

  details: UnitOfMeasureDto | null;
}
const Edit = ({ isOpen, onClose, details }: Props) => {
  const dispatch = useDispatch();
  const [uomMutation, { isLoading }] =
    usePutApiV1CollectionUomByUomIdMutation();

  const defaultType = {
    value: details?.type?.toString(),
    label: UoMType[Number(details?.type)],
  } as Option;
  const defaultCategory = {
    value: details?.type?.toString() as string,
    label: UomCategory[Number(details?.type)] as string,
  } as Option;
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UomRequestDto>({
    resolver: CreateUomValidator,
    mode: "onSubmit",
    defaultValues: {
      name: details?.name as string,
      symbol: details?.symbol as string,
      description: details?.description ?? "",
      category: defaultCategory,
      type: defaultType,
    },
  });
  const onSubmit = async (data: UomRequestDto) => {
    const payload = {
      ...data,
      category: Number(data.category.value) as UnitOfMeasureCategory,
      type: Number(data.type.value) as UnitOfMeasureType,
    } satisfies CreateUnitOfMeasure;

    try {
      await uomMutation({
        createUnitOfMeasure: payload,
        uomId: details?.id as string,
      }).unwrap();
      toast.success("UoM updated successfully");
      dispatch(commonActions.setTriggerReload());

      reset();
      onClose();
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-9">
          <DialogHeader className="text-xl font-bold">
            <DialogTitle>Edit UoM</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <CodeSettingsForm
              control={control}
              register={register}
              errors={errors}

              // defaultValues={details}
            />
          </div>
          <DialogFooter className="justify-end">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>

            <Button
              type="submit"
              onClick={(e) => e.stopPropagation()}
              variant={"default"}
              className="flex items-center gap-2"
            >
              {isLoading ? (
                <Icon name="LoaderCircle" className="h-4 w-4 animate-spin" />
              ) : (
                <Icon name="Plus" className="h-4 w-4" />
              )}
              <span>Update Changes</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Edit;
