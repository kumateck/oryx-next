import _ from "lodash";
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
import { EMaterialKind, Option } from "@/lib";
import {
  MaterialDto,
  useGetApiV1MaterialQuery,
} from "@/lib/redux/api/openapi.generated";

import PackageForm from "./form";
import { CreatePackagingValidator, PackagingRequestDto } from "./types";

// import "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  setItemLists: React.Dispatch<React.SetStateAction<PackagingRequestDto[]>>;
  itemLists?: PackagingRequestDto[];
}
const Create = ({ isOpen, onClose, setItemLists, itemLists }: Props) => {
  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<PackagingRequestDto>({
    resolver: CreatePackagingValidator,
    mode: "all",
    defaultValues: {
      packingExcessMargin: 0,
      unitCapacity: 0,
    },
  });

  const { data: materialResponse } = useGetApiV1MaterialQuery({
    page: 1,
    pageSize: 10000,
    kind: EMaterialKind.Packing,
  });

  const materialOptions = _.isEmpty(itemLists)
    ? (materialResponse?.data?.map((uom: MaterialDto) => ({
        label: uom.name,
        value: uom.id,
      })) as Option[])
    : (_.filter(
        materialResponse?.data,
        (itemA) =>
          !_.some(itemLists, (itemB) => itemA?.id === itemB?.material.value),
      )?.map((uom: MaterialDto) => ({
        label: uom.name,
        value: uom.id,
      })) as Option[]);

  const directLinkMaterialOptions = materialResponse?.data?.map(
    (uom: MaterialDto) => ({
      label: uom.name,
      value: uom.id,
    }),
  ) as Option[];

  const onSubmit = (data: PackagingRequestDto) => {
    setItemLists((prevState) => {
      const payload = {
        ...data,
        idIndex: (prevState.length + 1).toString(),
      };
      return [...prevState, payload]; // Add new item to the array
    });

    reset(); // Reset the form after submission
    onClose(); // Close the form/modal if applicable
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Add Package</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <PackageForm
            register={register}
            control={control}
            errors={errors}
            materialOptions={materialOptions}
            directLinkMaterialOptions={directLinkMaterialOptions}
          />
          <DialogFooter className="justify-end gap-4 py-6">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>

            <Button variant={"default"} className="flex items-center gap-2">
              <Icon name="Plus" className="h-4 w-4" />
              <span>Add Package</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Create;
