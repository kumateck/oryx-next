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
  useLazyGetApiV1ShiftTypeQuery,
  usePutApiV1ShiftTypeByIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { ErrorResponse, cn, isErrorResponse } from "@/lib/utils";

import { ShiftTypeRequestDto, CreateShiftTypeValidator } from "./types";
import ShiftScheduleForm from "./form";
import { rotationType, StartDay } from "@/lib";
import { DayOfWeek } from "@/lib/enum";
import { daysOfWeek } from "../working-days/types";
// import "./types";

interface Props {
  details: ShiftTypeRequestDto;
  isOpen: boolean;
  id: string;
  onClose: () => void;
}
const EditShiftTypes = ({ isOpen, onClose, details, id }: Props) => {
  const [loadShiftTypes] = useLazyGetApiV1ShiftTypeQuery();
  const [updateShiftType, { isLoading }] = usePutApiV1ShiftTypeByIdMutation();

  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<ShiftTypeRequestDto>({
    resolver: CreateShiftTypeValidator,
    defaultValues: {
      shiftName: details?.shiftName,
      rotationType: {
        label: rotationType[details?.rotationType?.label],
        value: rotationType[details?.rotationType?.value],
      },
      startTime: details?.startTime,
      endTime: details?.endTime,
      applicableDays: details?.applicableDays
        ? details.applicableDays.map((day) => ({
            label: daysOfWeek[day?.label],
            value: daysOfWeek[day?.value],
            uom: daysOfWeek[day?.uom as string],
          }))
        : undefined,
    },
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
        createShiftTypeRequest: payload,
        id: id,
      }).unwrap();
      toast.success("Shift Schedule edited successfully");
      loadShiftTypes({
        page: 1,
        pageSize: 10,
      });
      reset(); // Reset the form after submission
      onClose(); // Close the form/modal if applicable
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> Shift Type configuration </DialogTitle>
        </DialogHeader>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <ShiftScheduleForm
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
