"use client";

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
import { cn, ErrorResponse, isErrorResponse, Option } from "@/lib";
import {
  CreateJobRequest,
  useLazyGetApiV1DepartmentQuery,
  useLazyGetApiV1ProductEquipmentQuery,
  usePostApiV1JobRequestsMutation,
} from "@/lib/redux/api/openapi.generated";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { commonActions } from "@/lib/redux/slices/common";
import JobeRequestForm from "./form";
import { CreateJobRequestDto, CreateJobRequestValidator } from "./types";
import { useSelector } from "@/lib/redux/store";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Create = ({ isOpen, onClose }: Props) => {
  const [createJobRequest, { isLoading }] = usePostApiV1JobRequestsMutation();
  const [loadDepartments, { isLoading: isLoadingDepartments }] =
    useLazyGetApiV1DepartmentQuery();
  const [loadEquipment, { isLoading: isLoadingEquipment }] =
    useLazyGetApiV1ProductEquipmentQuery();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.persistedReducer.auth);

  const loadDataOrSearchDepartments = async (
    searchQuery: string,
    page: number,
  ) => {
    const res = await loadDepartments({
      searchQuery,
      page,
    }).unwrap();
    const response = {
      options: res?.data?.map((department) => ({
        label: department?.name,
        value: department.id,
      })) as Option[],
      hasNext: (res?.pageIndex || 0) < (res?.stopPageIndex as number),
      hasPrevious: (res?.pageIndex as number) > 1,
    };
    return response;
  };
  const loadDataOrSearchEquipment = async (
    searchQuery: string,
    page: number,
  ) => {
    const res = await loadEquipment({
      searchQuery,
      page,
    }).unwrap();
    const response = {
      options: res?.data?.map((equipment) => ({
        label: equipment?.name,
        value: equipment.id,
      })) as Option[],
      hasNext: (res?.pageIndex || 0) < (res?.stopPageIndex as number),
      hasPrevious: (res?.pageIndex as number) > 1,
    };
    return response;
  };
  const {
    register,
    formState: { errors },
    reset,
    control,
    handleSubmit,
  } = useForm<CreateJobRequestDto>({
    resolver: CreateJobRequestValidator,
  });

  const onSubmit = async (data: CreateJobRequestDto) => {
    try {
      const payload: CreateJobRequest = {
        dateOfIssue: data.dateOfIssue.toISOString(),
        departmentId: data.departmentId.value,
        equipmentId: data.equipmentId.value,
        descriptionOfWork: data.descriptionOfWork,
        issuedById: currentUser?.userId as string,
        location: data.location,
        preferredCompletionDate: data.preferredCompletionDate.toISOString(),
      };
      await createJobRequest({
        createJobRequest: payload,
      }).unwrap();
      dispatch(commonActions.setTriggerReload());
      toast.success("Job request created successfully.");
      reset();
      onClose();
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent className="max-w-2xl w-full">
        <DialogHeader>
          <DialogTitle>Create Job Request</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <JobeRequestForm
            errors={errors}
            control={control}
            register={register}
            isLoadingDepartments={isLoadingDepartments}
            isLoadingEquipment={isLoadingEquipment}
            fetchDepartments={loadDataOrSearchDepartments}
            fetchEquipment={loadDataOrSearchEquipment}
          />
          <DialogFooter className="justify-end gap-4 py-6">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button
              disabled={isLoading}
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

export default Create;
