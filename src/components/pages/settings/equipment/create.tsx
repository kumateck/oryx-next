// import { useForm } from "react-hook-form";
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
} from "@/components/ui";
import { Option } from "@/lib";
import {
  CreateEquipmentRequest,
  useGetApiV1CollectionUomQuery,
  useLazyGetApiV1DepartmentQuery,
  usePostApiV1ProductEquipmentMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { ErrorResponse, cn, isErrorResponse } from "@/lib/utils";

import EquipmentForm from "./form";
import {
  CreateEquipmentValidator,
  EquipmentRequestDto,
  IsYesorNo,
} from "./types";

// import "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const Create = ({ isOpen, onClose }: Props) => {
  const dispatch = useDispatch();

  const [createEquipment, { isLoading }] =
    usePostApiV1ProductEquipmentMutation();

  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<EquipmentRequestDto>({
    resolver: CreateEquipmentValidator,
    mode: "all",
  });

  const [
    loadDepartments,
    { isLoading: isLoadingMaterials, isFetching: isFetchingMaterials },
  ] = useLazyGetApiV1DepartmentQuery();

  const { data: uomResponse } = useGetApiV1CollectionUomQuery();

  const uomOptions = uomResponse?.map((uom) => ({
    label: uom.symbol,
    value: uom.id,
  })) as Option[];

  const loadDataOrSearch = async (searchQuery: string, page: number) => {
    const res = await loadDepartments({
      searchQuery,
      page,
    }).unwrap();
    const response = {
      options: res?.data?.map((item) => ({
        label: item.name,
        value: item.id,
      })) as Option[],
      hasNext: (res?.pageIndex || 0) < (res?.stopPageIndex as number),
      hasPrevious: (res?.pageIndex as number) > 1,
    };
    return response;
  };
  const onSubmit = async (data: EquipmentRequestDto) => {
    try {
      const payload = {
        name: data?.name,
        machineId: data?.machineId,
        storageLocation: data?.storageLocation,
        isStorage: data?.isStorage === IsYesorNo.Yes ? true : false,
        relevanceCheck: data?.relevanceCheck === IsYesorNo.Yes ? true : false,
        capacityQuantity: data?.capacityQuantity,
        uoMId: data?.uoM?.value,
        departmentId: data?.department?.value,
      } satisfies CreateEquipmentRequest;
      await createEquipment({
        createEquipmentRequest: payload,
      });
      toast.success("Equipment created successfully");

      dispatch(commonActions.setTriggerReload());

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
          <DialogTitle>Add Equipment</DialogTitle>
        </DialogHeader>

        {/* <AsyncSelect
          fetchOptions={loadDataOrSearch}
          isLoading={isLoadingMaterials || isFetchingMaterials}
        /> */}
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <EquipmentForm
            register={register}
            control={control}
            uomOptions={uomOptions}
            errors={errors}
            fetchOptions={loadDataOrSearch}
            isLoading={isLoadingMaterials || isFetchingMaterials}
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
