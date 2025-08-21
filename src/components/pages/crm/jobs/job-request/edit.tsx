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
  InventoryPurchaseRequisitionDto,
  usePostApiV1JobRequestsMutation,
  useLazyGetApiV1DepartmentQuery,
  useLazyGetApiV1ProductEquipmentQuery,
  CreateJobRequest,
} from "@/lib/redux/api/openapi.generated";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { commonActions } from "@/lib/redux/slices/common";
import JobeRequestForm from "./form";
import { CreateJobRequestDto, CreateJobRequestValidator } from "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  details: InventoryPurchaseRequisitionDto;
}

const Edit = ({ isOpen, onClose }: Props) => {
  const [createJobRequest] = usePostApiV1JobRequestsMutation();
  const [loadDepartments, { isLoading: isLoadingDepartments }] =
    useLazyGetApiV1DepartmentQuery();
  const [loadEquipment, { isLoading: isLoadingEquipment }] =
    useLazyGetApiV1ProductEquipmentQuery();
  const dispatch = useDispatch();

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
    //TODO: use the right function when available
    try {
      const payload: CreateJobRequest = {
        dateOfIssue: data.dateOfIssue,
        departmentId: data.departmentId.value,
        equipmentId: data.equipmentId.value,
        descriptionOfWork: data.descriptionOfWork,
        issuedById: "",
        location: data.location,
        preferredCompletionDate: data.preferredCompletionDate,
      };
      await createJobRequest({
        createJobRequest: payload,
      }).unwrap();
      dispatch(commonActions.setTriggerReload());
      toast.success("Job request updated successfully.");
      reset();
      onClose();
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  const updating = false;

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent className="max-w-2xl w-full">
        <DialogHeader>
          <DialogTitle>Edit Job Request</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <JobeRequestForm
            control={control}
            fetchDepartments={loadDataOrSearchDepartments}
            isLoadingDepartments={isLoadingDepartments}
            isLoadingEquipment={isLoadingEquipment}
            fetchEquipment={loadDataOrSearchEquipment}
            errors={errors}
            register={register}
          />
          <DialogFooter className="justify-end gap-4 py-6">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button
              disabled={updating}
              type="submit"
              className="flex items-center gap-2"
            >
              <Icon
                name={updating ? "LoaderCircle" : "Plus"}
                className={cn("h-4 w-4", {
                  "animate-spin": updating,
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

export default Edit;
