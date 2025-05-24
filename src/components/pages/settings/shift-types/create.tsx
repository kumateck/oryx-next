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
  usePostApiV1ShiftTypeMutation,
} from "@/lib/redux/api/openapi.generated";
import { ErrorResponse, cn, isErrorResponse } from "@/lib/utils";

import { ShiftTypeRequestDto, CreateShiftTypeValidator } from "./types";
import ShiftScheduleForm from "./form";
import { rotationType, StartDay } from "@/lib";
import { DayOfWeek } from "@/lib/enum";
// import "./types";

interface Props {
  clear;
  isOpen: boolean;
  onClose: () => void;
}
const Create = ({ isOpen, onClose }: Props) => {
  const [loadShiftTypes] = useLazyGetApiV1ShiftTypeQuery();
  const [createShiftType, { isLoading }] = usePostApiV1ShiftTypeMutation();

  // const pageSize = 30;
  // const page = 1;

  //this gets the shift types from the API so we can display them in the SELECT input
  {
    /*const { data: applicableDaysResults } = useGetApiV1ShiftTypeQuery({
    page,
    pageSize,
  });*/
  }

  // const applicableDays = applicableDaysResults?.data ?? [];

  //this is the form that is used to create the shift schedule
  const {
    register, //this is used to register the form fields
    control, //this is used to control the form fields
    formState: { errors }, //this is used to get the errors from the form
    reset, //this is used to reset the form
    handleSubmit, //this is used to handle the form submission
  } = useForm<ShiftTypeRequestDto>({
    resolver: CreateShiftTypeValidator, //this is used to validate the form fields
    mode: "all",
  });

  //this converts data from the API to a label/value pair which is needed for the SELECT input
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
        //change the value to an integer, and then convert it to the rotationalType enum
        rotationType: parseInt(
          data.rotationType.value,
        ) as unknown as rotationType,
        startTime: data.startTime,
        endTime: data.endTime,
        // applicableDays: data.applicableDays.map((applicableDays) => StartDay[applicableDays.value as keyof typeof StartDay]),
        applicableDays: data.applicableDays.map((day) =>
          parseInt(day.value),
        ) as DayOfWeek[],
      } satisfies CreateShiftTypeRequest;
      await createShiftType({
        createShiftTypeRequest: payload,
      }).unwrap();
      toast.success("Shift Schedule created successfully");
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
            rotationTypeOptions={rotationTypeOptions}
            applicableDaysOptions={applicableDaysOptions}
            startDayOptions={startDayOptions}
          />
          <DialogFooter className="justify-end gap-4 py-6">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>

            <Button variant={"default"} className="flex items-center gap-2">
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

export default Create;
