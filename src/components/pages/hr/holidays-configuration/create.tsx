import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Icon,
} from "@/components/ui";
import { AuditModules, ErrorResponse, isErrorResponse } from "@/lib";
import { cn } from "@/lib";
import { HolidayForm } from "./form";
import { useForm } from "react-hook-form";
import { CreateHolidayDto, CreateHolidayValidator } from "./types";
import { usePostApiV1HolidaysMutation } from "@/lib/redux/api/openapi.generated";
import { toast } from "sonner";
import { commonActions } from "@/lib/redux/slices/common";
import { useDispatch } from "react-redux";

interface Props {
  onClose: () => void;
  isOpen: boolean;
}
export const Create = ({ isOpen, onClose }: Props) => {
  const dispatch = useDispatch();
  const [createHoliday, { isLoading }] = usePostApiV1HolidaysMutation();

  //use form hook
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateHolidayDto>({ resolver: CreateHolidayValidator });

  //form submissinon handler
  const onSubmit = async (data: CreateHolidayDto) => {
    try {
      await createHoliday({
        module: AuditModules.settings.name,
        subModule: AuditModules.settings.holidays,
        createHolidayRequest: { ...data, date: data.date.toISOString() },
      }).unwrap();
      toast.success("Holiday add successfully!");
      onClose();
      reset();
      dispatch(commonActions.setTriggerReload());
    } catch (error) {
      toast.error(
        isErrorResponse(error as ErrorResponse)?.description ||
          "Error occurred",
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Holiday</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <HolidayForm register={register} errors={errors} control={control} />
          <DialogFooter className="justify-end gap-4 py-6">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant={"default"}
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
