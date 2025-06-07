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
  CreateShiftScheduleRequest,
  useGetApiV1DepartmentQuery,
  useGetApiV1ShiftTypeQuery,
  useLazyGetApiV1ShiftSchedulesQuery,
  usePostApiV1ShiftSchedulesMutation,
} from "@/lib/redux/api/openapi.generated";
import { ErrorResponse, cn, isErrorResponse } from "@/lib/utils";

import { ShiftScheduleRequestDto, CreateShiftScheduleValidator } from "./types";
import ShiftScheduleForm from "./form";
import { Option, ShiftFrequency, StartDay } from "@/lib";

// import "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const Create = ({ isOpen, onClose }: Props) => {
  const [loadShiftSchedules] = useLazyGetApiV1ShiftSchedulesQuery();
  const [createShiftSchedule, { isLoading }] =
    usePostApiV1ShiftSchedulesMutation();

  const pageSize = 30;
  const page = 1;

  //this gets the departments from the API so we can display them in the SELECT input
  const { data: departmentResults } = useGetApiV1DepartmentQuery({
    page,
    pageSize,
  });
  const departments = departmentResults?.data ?? [];

  //this gets the shift types from the API so we can display them in the SELECT input
  const { data: shiftTypesResults } = useGetApiV1ShiftTypeQuery({
    page,
    pageSize,
  });
  const shiftTypes = shiftTypesResults?.data ?? [];

  //this is the form that is used to create the shift schedule
  const {
    register, //this is used to register the form fields
    control, //this is used to control the form fields
    formState: { errors }, //this is used to get the errors from the form
    reset, //this is used to reset the form
    handleSubmit, //this is used to handle the form submission
  } = useForm<ShiftScheduleRequestDto>({
    resolver: CreateShiftScheduleValidator, //this is used to validate the form fields
    mode: "all",
  });

  //this converts data from the API to a label/value pair which is needed for the SELECT input
  const departmentOptions = departments?.map((department) => ({
    label: department?.name,
    value: department.id,
  })) as Option[];

  //this converts data from the API to a label/value pair which is needed for the SELECT input
  const shiftTypesOptions = shiftTypes?.map((shiftType) => ({
    label: shiftType?.shiftName,
    value: shiftType.id,
  })) as Option[];

  const frequencyOptions = Object.entries(ShiftFrequency)
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

  const onSubmit = async (data: ShiftScheduleRequestDto) => {
    try {
      const payload = {
        scheduleName: data.scheduleName,
        //change the value to an integer, and then convert it to the ShiftFrequency enum
        frequency: parseInt(data.frequency.value) as unknown as ShiftFrequency,

        startDate: parseInt(data.startDay.value) as unknown as StartDay,
        shiftTypeIds: data.shiftTypeIds.map((shiftType) => shiftType.value),
        departmentId: data.departmentId.value,
      } satisfies CreateShiftScheduleRequest;
      await createShiftSchedule({
        createShiftScheduleRequest: payload,
      }).unwrap();
      toast.success("Shift Schedule created successfully");
      loadShiftSchedules({
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
          <DialogTitle>Add Shift Schedule</DialogTitle>
        </DialogHeader>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <ShiftScheduleForm
            register={register}
            control={control}
            errors={errors}
            frequencyOptions={frequencyOptions}
            shiftTypesOptions={shiftTypesOptions}
            departmentOptions={departmentOptions}
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
