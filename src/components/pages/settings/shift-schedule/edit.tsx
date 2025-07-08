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
  ShiftScheduleDtoRead,
  useGetApiV1DepartmentQuery,
  useGetApiV1ShiftTypeQuery,
  usePutApiV1ShiftSchedulesByIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { ErrorResponse, cn, isErrorResponse } from "@/lib/utils";

import { ShiftScheduleRequestDto, CreateShiftScheduleValidator } from "./types";
import ShiftScheduleForm from "./form";
import { Option, ShiftFrequency } from "@/lib";

import { useDispatch } from "react-redux";
import { commonActions } from "@/lib/redux/slices/common";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultValues?: ShiftScheduleDtoRead;
}
const Edit = ({ isOpen, onClose, defaultValues }: Props) => {
  const dispatch = useDispatch();
  const [updateShiftSchedule, { isLoading }] =
    usePutApiV1ShiftSchedulesByIdMutation();

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
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<ShiftScheduleRequestDto>({
    resolver: CreateShiftScheduleValidator,
    mode: "all",
    defaultValues: {
      departmentId: {
        value: defaultValues?.department?.id,
        label: defaultValues?.department?.name as string,
      },
      frequency: {
        value: String(defaultValues?.frequency),
        label: ShiftFrequency[defaultValues?.frequency as ShiftFrequency]
          ? ShiftFrequency[defaultValues?.frequency as ShiftFrequency]
          : "",
      },
      scheduleName: defaultValues?.scheduleName ?? "",
      shiftTypeIds:
        defaultValues?.shiftType?.map((type) => ({
          value: type.id,
          label: type.shiftName ?? "",
        })) || [],
      startDate: defaultValues?.startDate
        ? new Date(defaultValues.startDate)
        : undefined,
    },
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

  const onSubmit = async (data: ShiftScheduleRequestDto) => {
    try {
      const payload = {
        scheduleName: data.scheduleName,
        frequency: parseInt(data.frequency.value) as unknown as ShiftFrequency,
        startDate: data.startDate.toISOString(),
        shiftTypeIds: data.shiftTypeIds.map((shiftType) => shiftType.value),
        departmentId: data.departmentId.value,
      } satisfies CreateShiftScheduleRequest;
      await updateShiftSchedule({
        id: defaultValues?.id as string,
        createShiftScheduleRequest: payload,
      }).unwrap();
      toast.success("Shift Schedule updated successfully");
      dispatch(commonActions.setTriggerReload());
      reset();
      onClose();
    } catch (error) {
      console.error("Error updating shift schedule:", error);
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Shift Schedule</DialogTitle>
        </DialogHeader>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <ShiftScheduleForm
            register={register}
            control={control}
            errors={errors}
            frequencyOptions={frequencyOptions}
            shiftTypesOptions={shiftTypesOptions}
            departmentOptions={departmentOptions}
          />
          <DialogFooter className="justify-end gap-4 py-6">
            <Button
              disabled={isLoading}
              type="button"
              variant="secondary"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button
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

export default Edit;
