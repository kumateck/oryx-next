import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Icon,
  Label,
} from "@/components/ui";
import { AuditModules, CollectionTypes, Option } from "@/lib";
import {
  PostApiV1CollectionApiArg,
  useLazyGetApiV1EmployeeQuery,
  usePostApiV1CollectionMutation,
  usePostApiV1ShiftSchedulesAssignMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { cn } from "@/lib/utils";

import AssignForm from "./form";
import { AssignRequestDto, CreateAssignValidator, ShiftDefault } from "./types";
import ThrowErrorMessage from "@/lib/throw-error";
import { useEffect } from "react";
import { format } from "date-fns";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultValues?: ShiftDefault;
}

const AssignShiftSchedule = ({ isOpen, onClose, defaultValues }: Props) => {
  const dispatch = useDispatch();

  const [createAssigned, { isLoading: creating }] =
    usePostApiV1ShiftSchedulesAssignMutation();

  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<AssignRequestDto>({
    resolver: CreateAssignValidator,
    mode: "all",
  });

  const [loadCollection, { data: collectionResponse }] =
    usePostApiV1CollectionMutation({});

  useEffect(() => {
    loadCollection({
      body: [CollectionTypes.ShiftCategory],
    } as PostApiV1CollectionApiArg).unwrap();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const categoryOptions = collectionResponse?.[
    CollectionTypes.ShiftCategory
  ]?.map((opt) => ({
    label: opt.name,
    value: opt.id,
  })) as Option[];
  const onSubmit = async (data: AssignRequestDto) => {
    try {
      // 1. Create the leave request

      const payload = {
        employeeIds: data?.employeeIds?.map((item) => item.value) || [],
        shiftScheduleId: defaultValues?.schedule?.value || "",
        shiftCategoryId: data?.scheduleCategory?.value || "",
        shiftTypeId: defaultValues?.type?.value || "",
        scheduleDate: defaultValues?.scheduleDate || "",
      };

      await createAssigned({
        assignShiftRequest: payload,
        module: AuditModules.general,
        subModule: AuditModules.general.AssignShift,
      }).unwrap();

      dispatch(commonActions.setTriggerReload());
      toast.success("Assignment done successfully");
      // 2. Immediately reset & close the form

      // 3. Refresh the table

      // 4. Then, upload attachments in the background

      reset();
      onClose();
    } catch (error) {
      ThrowErrorMessage(error);
    }
  };

  const [
    loadEmployee,
    { isLoading: loadingEmployee, isFetching: fetchingEmployees },
  ] = useLazyGetApiV1EmployeeQuery();

  const loadDataOrSearch = async (searchQuery: string, page = 1) => {
    const res = await loadEmployee({
      searchQuery,
      page,
      pageSize: 10,
    }).unwrap();
    const options = res?.data?.map((item) => ({
      label: `${item.firstName} ${item.lastName}`,
      value: item.id,
    })) as Option[];
    const response = {
      options: options as Option[],
      hasNext: (res?.pageIndex || 0) < (res?.stopPageIndex as number),
      hasPrevious: (res?.pageIndex as number) > 1,
    };
    return response;
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Assign Employee(s) to Shift Schedule</DialogTitle>
        </DialogHeader>

        <div>
          <ul className="space-y-3">
            <li>
              <Label>Schedule Name</Label>
              <div className="border rounded-2xl px-4 py-2">
                {defaultValues?.schedule?.label}
              </div>
            </li>
            <li>
              <Label>Schedule Type</Label>
              <div className="border rounded-2xl px-4 py-2">
                {defaultValues?.type?.label}
              </div>
            </li>{" "}
            <li>
              <Label>Schedule Date</Label>
              <div className="border rounded-2xl px-4 py-2">
                {defaultValues?.scheduleDate
                  ? format(new Date(defaultValues.scheduleDate), "dd MMMM yyyy")
                  : "No date available"}
              </div>
            </li>
          </ul>
        </div>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <AssignForm
            control={control}
            errors={errors}
            categoryOptions={categoryOptions}
            fetchOptions={loadDataOrSearch}
            isLoading={loadingEmployee || fetchingEmployees}
          />

          <DialogFooter className="justify-end gap-4 py-6">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>

            <Button
              type="submit"
              variant="default"
              disabled={creating}
              className="flex items-center gap-2"
            >
              <Icon
                name={creating ? "LoaderCircle" : "Plus"}
                className={cn("h-4 w-4", {
                  "animate-spin": creating,
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

export default AssignShiftSchedule;
