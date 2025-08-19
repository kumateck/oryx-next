// import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
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
  CreateWarehouseLocationShelfRequest,
  WarehouseLocationShelfDto,
  useGetApiV1WarehouseRackQuery,
  usePutApiV1WarehouseShelfByShelfIdMutation,
} from "@/lib/redux/api/openapi.generated";
import {
  ErrorResponse,
  cn,
  generateShelfCode,
  isErrorResponse,
} from "@/lib/utils";

import ShelfForm from "./form";
import { CreateShelfValidator, ShelfRequestDto } from "./types";
import { useDispatch } from "react-redux";
import { commonActions } from "@/lib/redux/slices/common";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  details: WarehouseLocationShelfDto;
}
const Edit = ({ isOpen, onClose, details }: Props) => {
  const dispatch = useDispatch();
  const { data: result } = useGetApiV1WarehouseRackQuery({
    page: 1,
    pageSize: 100,
  });
  const [editRack, { isLoading }] =
    usePutApiV1WarehouseShelfByShelfIdMutation();

  const defaultRack = {
    label: details?.warehouseLocationRack?.name as string,
    value: details?.warehouseLocationRack?.id as string,
  };

  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
    setValue,
  } = useForm<ShelfRequestDto>({
    resolver: CreateShelfValidator,
    mode: "all",
    defaultValues: {
      name: details.name as string,
      description: details.description as string,
      rackId: defaultRack,
      code: details.code as string,
    },
  });

  const name = useWatch<ShelfRequestDto>({
    name: "name",
    control,
  }) as string;

  const rack = useWatch<ShelfRequestDto>({
    name: "rackId",
    control,
  }) as Option;

  useEffect(() => {
    const response = result?.data?.find((r) => r.id === rack?.value);
    const floorName = response?.warehouseLocation?.floorName as string;
    const rackName = response?.name as string;

    const code = generateShelfCode(floorName, rackName, name);
    setValue("code", code);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rack, name]);

  const data = result?.data ?? [];
  const rackOptions = data?.map((item) => ({
    label: item?.warehouseLocation?.name + "-" + item.name,
    value: item.id,
  })) as Option[];

  const onSubmit = async (data: ShelfRequestDto) => {
    try {
      const payload = {
        ...data,
      } satisfies CreateWarehouseLocationShelfRequest;
      await editRack({
        shelfId: details.id as string,
        createWarehouseLocationShelfRequest: payload,
      }).unwrap();
      toast.success("Rack updated successfully");
      dispatch(commonActions.setTriggerReload());

      reset();
      onClose();
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Shelf</DialogTitle>
        </DialogHeader>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <ShelfForm
            control={control}
            register={register}
            errors={errors}
            rackOptions={rackOptions}
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
              <span>Update Shelf</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Edit;
