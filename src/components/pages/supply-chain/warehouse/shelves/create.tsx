// import { useForm } from "react-hook-form";
// import { useEffect } from "react";
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
  useGetApiV1WarehouseRackQuery,
  // useGetApiV1WarehouseLocationByLocationIdQuery,
  // useGetApiV1WarehouseRackByRackIdQuery,
  useLazyGetApiV1WarehouseShelfQuery,
  usePostApiV1WarehouseByRackIdShelfMutation,
} from "@/lib/redux/api/openapi.generated";
import {
  ErrorResponse,
  cn,
  generateShelfCode,
  isErrorResponse,
} from "@/lib/utils";

import ShelfForm from "./form";
import { CreateShelfValidator, ShelfRequestDto } from "./types";

// import "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const Create = ({ isOpen, onClose }: Props) => {
  const [loadShelves] = useLazyGetApiV1WarehouseShelfQuery();
  const { data: result } = useGetApiV1WarehouseRackQuery({
    page: 1,
    pageSize: 100,
  });
  const [createShelf, { isLoading }] =
    usePostApiV1WarehouseByRackIdShelfMutation();
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
  console.log(data, "Racks");

  const onSubmit = async (data: ShelfRequestDto) => {
    try {
      const payload = {
        ...data,
      } satisfies CreateWarehouseLocationShelfRequest;
      await createShelf({
        rackId: data.rackId.value,
        createWarehouseLocationShelfRequest: payload,
      });
      toast.success("Shelf created successfully");
      loadShelves({
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
          <DialogTitle>Add Shelf</DialogTitle>
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
              <span>Add Shelf</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Create;
