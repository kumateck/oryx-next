"use client";
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
  CreateShiftTypeRequest,
  usePutApiV1ShiftTypeByIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { ErrorResponse, cn, isErrorResponse } from "@/lib/utils";

import { ShiftTypeRequestDto, CreateShiftTypeValidator } from "./types";
import { rotationType, StartDay } from "@/lib";
import { DayOfWeek } from "@/lib/enum";
import { commonActions } from "@/lib/redux/slices/common";
import { useDispatch } from "react-redux";
import ShiftTypeConfiguration from "./form";
// import "./types";

interface Props {
  details: ShiftTypeRequestDto;
  isOpen: boolean;
  id: string;
  onClose: () => void;
}
const EditShiftTypes = ({ isOpen, onClose, details, id }: Props) => {
  const [updateShiftType, { isLoading }] = usePutApiV1ShiftTypeByIdMutation();
  const dispatch = useDispatch();

  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<ShiftTypeRequestDto>({
    resolver: CreateShiftTypeValidator,
    defaultValues: details,
  });

  const applicableDaysOptions = Object.entries(DayOfWeek)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key, value]) => ({
      label: key,
      value: String(value),
    }));

  const rotationTypeOptions = Object.entries(rotationType)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key, value]) => ({
      label: key,
      value: String(value),
    }));
  //this converts an enum to a label/value pair which is needed for the SELECT input
  const startDayOptions = Object.entries(StartDay)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key, value]) => ({
      label: key,
      value: String(value),
    }));

  const onSubmit = async (data: ShiftTypeRequestDto) => {
    try {
      const payload = {
        shiftName: data.shiftName ?? "",
        rotationType: parseInt(
          data.rotationType.value,
        ) as unknown as rotationType,
        startTime: data.startTime,
        endTime: data.endTime,
        applicableDays: data.applicableDays.map((day) =>
          parseInt(day.value),
        ) as DayOfWeek[],
      } satisfies CreateShiftTypeRequest;
      await updateShiftType({
        id: id,
        createShiftTypeRequest: payload,
      }).unwrap();
      reset();
      onClose();
      toast.success("Shift Type updated successfully");
      dispatch(commonActions.setTriggerReload());
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Shift Type configuration </DialogTitle>
        </DialogHeader>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <ShiftTypeConfiguration
            register={register}
            control={control}
            errors={errors}
            defaultValues={details}
            rotationTypeOptions={rotationTypeOptions}
            applicableDaysOptions={applicableDaysOptions}
            startDayOptions={startDayOptions}
          />
          <DialogFooter className="justify-end gap-4 py-6">
            <Button type="reset" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              variant={"default"}
              className="flex items-center gap-2"
            >
              <Icon
                name={isLoading ? "LoaderCircle" : "Plus"}
                className={cn("h-4 w-4", {
                  "animate-spin": isLoading,
                })}
              />
              <span>Save</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditShiftTypes;
