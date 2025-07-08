import {
  Button,
  DialogContent,
  DialogFooter,
  DialogTitle,
  Icon,
} from "@/components/ui";
import { Dialog } from "@radix-ui/react-dialog";
import SampleForm from "./form";
import { useForm } from "react-hook-form";
import { CreateSampleFormData, CreateSampleFormResolver } from "./types";
import { usePostApiV1MaterialSamplingsMutation } from "@/lib/redux/api/openapi.generated";
import { toast } from "sonner";
import { cn, ErrorResponse, isErrorResponse } from "@/lib";
import { useDispatch } from "react-redux";
import { commonActions } from "@/lib/redux/slices/common";
import { useParams } from "next/navigation";

type CreateSampleMaterialProps = {
  isOpen: boolean;
  onClose: () => void;
  details: CreateSampleFormData;
};

export const CreateSampleMaterial = ({
  isOpen,
  onClose,
  details,
}: CreateSampleMaterialProps) => {
  const { id } = useParams();
  const grnId = id as string;

  const [createSample, { isLoading }] = usePostApiV1MaterialSamplingsMutation();

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateSampleFormData>({
    resolver: CreateSampleFormResolver,
    defaultValues: details,
  });

  // Function to handle form submission
  const onSubmit = async (data: CreateSampleFormData) => {
    try {
      await createSample({
        createMaterialSamplingRequest: {
          materialBatchId: details.materialBatchId,
          grnId: grnId,
          arNumber: data.arNumber,
          sampleQuantity: Number(data.sampleQuantity),
        },
      });
      toast.success("Material sampling created successfully");
      dispatch(commonActions.setTriggerReload());
      onClose();
      reset();
    } catch (error) {
      toast.error(
        isErrorResponse(error as ErrorResponse)?.description ||
          "Failed to create material sampling",
      );
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle className="text-lg font-medium">
          {" "}
          Sample Material
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SampleForm
            register={register}
            errors={errors}
            baseUnit={details.baseUnit as string}
          />
          <DialogFooter className="flex items-center justify-center gap-2">
            <Button disabled={isLoading} variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button disabled={isLoading} type="submit">
              <Icon
                name={isLoading ? "LoaderCircle" : "Plus"}
                className={cn("h-4 w-4", {
                  "animate-spin": isLoading,
                })}
              />
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
