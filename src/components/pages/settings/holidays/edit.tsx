import {
  HolidayDto,
  usePutApiV1HolidaysByIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { CreateHolidayValidator } from "./types";
import { useForm } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Icon,
} from "@/components/ui";
import { HolidayForm } from "./form";
import { AuditModules, cn, ErrorResponse, isErrorResponse } from "@/lib";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { commonActions } from "@/lib/redux/slices/common";

type PayloadType = {
  name: string;
  date: string;
  description?: string | null;
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  details: HolidayDto;
}
export const Edit = ({ isOpen, onClose, details }: Props) => {
  const dispatch = useDispatch();
  const [editHoliday, { isLoading }] = usePutApiV1HolidaysByIdMutation();

  //useform hook
  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<HolidayDto>({
    resolver: CreateHolidayValidator,
    mode: "all",
    defaultValues: {
      name: details.name as string,
      date: details.date,
      description: details.description,
    },
  });

  //submit handler
  const onSubmit = async (data: HolidayDto) => {
    try {
      const { id, ...payload } = data;
      await editHoliday({
        id: id as string,
        module: AuditModules.settings.name,
        subModule: AuditModules.settings.holidays,
        createHolidayRequest: payload as PayloadType,
      });
      reset();
      onClose();
      toast.success("Holiday updated successfully");
      dispatch(commonActions.setTriggerReload());
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
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
