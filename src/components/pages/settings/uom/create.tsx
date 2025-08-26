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
import {
  CreateUnitOfMeasure,
  UnitOfMeasureCategory,
  UnitOfMeasureType,
  usePostApiV1CollectionUomMutation,
} from "@/lib/redux/api/openapi.generated";
import { ErrorResponse, isErrorResponse } from "@/lib/utils";

import UomForm from "./form";
import { CreateUomValidator, UomRequestDto } from "./types";
import { useDispatch } from "react-redux";
import { commonActions } from "@/lib/redux/slices/common";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const CreateCode = ({ isOpen, onClose }: Props) => {
  const dispatch = useDispatch();
  const [codeMutation, { isLoading }] = usePostApiV1CollectionUomMutation();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UomRequestDto>({
    resolver: CreateUomValidator,
    mode: "all",
  });

  const onSubmit = async (data: UomRequestDto) => {
    const payload = {
      ...data,
      category: Number(data.category.value) as UnitOfMeasureCategory,
      type: Number(data.type.value) as UnitOfMeasureType,
    } satisfies CreateUnitOfMeasure;

    try {
      await codeMutation({
        createUnitOfMeasure: payload,
      }).unwrap();
      toast.success("UOM created successfully");
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
            <DialogTitle>Create New UOM</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <UomForm control={control} register={register} errors={errors} />
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
              <span>Create Code</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCode;
