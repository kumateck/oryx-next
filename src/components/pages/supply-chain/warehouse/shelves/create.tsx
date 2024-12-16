// import { useForm } from "react-hook-form";
// import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { FormWizard } from "@/components/form-inputs";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Icon,
} from "@/components/ui";
import { COLLECTION_TYPES, InputTypes, Option } from "@/lib";
import {
  CreateWarehouseLocationShelfRequest,
  useGetApiV1CollectionByItemTypeQuery, // useGetApiV1WarehouseLocationByLocationIdQuery,
  // useGetApiV1WarehouseRackByRackIdQuery,
  useLazyGetApiV1WarehouseShelfQuery,
  usePostApiV1WarehouseByRackIdShelfMutation,
} from "@/lib/redux/api/openapi.generated";
import { ErrorResponse, cn, isErrorResponse } from "@/lib/utils";

import { CreateShelfValidator, ShelfRequestDto } from "./types";

// import "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const Create = ({ isOpen, onClose }: Props) => {
  const [loadShelves] = useLazyGetApiV1WarehouseShelfQuery();
  const [createShelf, { isLoading }] =
    usePostApiV1WarehouseByRackIdShelfMutation();
  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
    // setValue,
  } = useForm<ShelfRequestDto>({
    resolver: CreateShelfValidator,
    mode: "all",
  });

  // const name = useWatch<ShelfRequestDto>({
  //   name: "name",
  //   control,
  // }) as string;

  // const rack = useWatch<ShelfRequestDto>({
  //   name: "rackId",
  //   control,
  // }) as Option;

  const { data } = useGetApiV1CollectionByItemTypeQuery({
    itemType: COLLECTION_TYPES.WarehouseLocationRack,
  });

  const rackOptions = data?.map((item) => ({
    label: item.name,
    value: item.id,
  })) as Option[];
  console.log(data, "Racks");

  // const { data: rackData } = useGetApiV1WarehouseRackByRackIdQuery({
  //   rackId: rack?.value,
  // });

  // const locationId = rackData?.warehouseLocation?.id;

  // const { data: locationData } = useGetApiV1WarehouseLocationByLocationIdQuery({
  //   locationId
  // });

  // const floor = locationData?.floorName;

  // async function generateShelfCode(
  //   floor: string | null | undefined,
  //   rackNumber: string,
  //   shelfLevel: string,
  // ) {
  //   console.log("Shelf code generation function called")
  //   // Ensure all parameters are provided
  //   if (!floor || !rackNumber || !shelfLevel) {
  //     return "";
  //   }
  //   // Get the first letter of floor and shelfLevel, convert to uppercase
  //   const floorCode = floor.trim()[0].toUpperCase();
  //   const shelfCode = shelfLevel.trim()[0].toUpperCase();
  //   // Combine into the desired format
  //   const code = `${floorCode}/${rackNumber}/${shelfCode}`;
  //   return code;
  // }

  // useEffect(() => {
  //   if (name && rack && floor) {
  //     handleLoadCode();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [floor, name, rack]);

  // const handleLoadCode = async () => {
  //   console.log("Handle load code called")
  //   const code = await generateShelfCode(floor, name, rack.value);
  //   setValue("code", code);
  // };

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
          <FormWizard
            config={[
              // {
              //   register: { ...register("code") },
              //   label: "Shelf Code",
              //   readOnly: true,
              //   required: true,
              //   description: (
              //     <span className="text-sm text-neutral-500">
              //       You can’t change the shelf code
              //     </span>
              //   ),
              //   placeholder: "Code will be generated",
              //   type: InputTypes.TEXT,
              //   errors: {
              //     message: errors.code?.message,
              //     error: !!errors.code,
              //   },
              // },
              {
                register: { ...register("name") },
                label: "Shelf Name",
                required: true,
                placeholder: "Enter Shelf Name",
                type: InputTypes.TEXT,

                errors: {
                  message: errors.name?.message,
                  error: !!errors.name,
                },
              },
              {
                label: "Rack",
                control,
                type: InputTypes.SELECT,
                name: "rackId",
                required: true,

                options: rackOptions,
                errors: {
                  message: errors.rackId?.message,
                  error: !!errors.rackId,
                },
              },
              {
                register: { ...register("description") },
                label: "Description",
                required: true,
                placeholder: "Enter Description",
                type: InputTypes.TEXT,

                errors: {
                  message: errors.description?.message,
                  error: !!errors.description,
                },
              },
            ]}
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
