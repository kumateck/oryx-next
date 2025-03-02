// import { useForm } from "react-hook-form";
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
import { Option } from "@/lib/constants";
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
  details: PackagingRequestDto;
  itemLists: PackagingRequestDto[];
}
const Edit = ({ isOpen, onClose, setItemLists, details, itemLists }: Props) => {
  console.log(details, "details");
  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<PackagingRequestDto>({
    resolver: CreatePackagingValidator,
    mode: "all",
    defaultValues: details,
  });

  const { data: materialResponse } = useGetApiV1MaterialQuery({
    page: 1,
    pageSize: 10000,
    kind: 1,
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

  // const onSubmit = (data: PackagingRequestDto) => {
  //   setItemLists((prevState) => {
  //     return [...prevState, data]; // Add new item to the array
  //   });

  //   reset(); // Reset the form after submission
  //   onClose(); // Close the form/modal if applicable
  // };
  const onSubmit = (data: PackagingRequestDto) => {
    setItemLists((prevState) => {
      // Check if the item already exists in the list
      const itemIndex = prevState.findIndex((item) => item === details);

      if (itemIndex !== -1) {
        // Update the existing item if found
        const updatedList = [...prevState];
        updatedList[itemIndex] = data;
        return updatedList;
      } else {
        // Add new item if not found
        return [...prevState, data];
      }
    });

    reset(); // Reset the form after submission
    onClose(); // Close the form/modal if applicable
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit Package</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <PackageForm
            register={register}
            control={control}
            errors={errors}
            materialOptions={materialOptions}
            directLinkMaterialOptions={directLinkMaterialOptions}
            defaultValues={details}
          />
          <DialogFooter className="justify-end gap-4 py-6">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>

            <Button variant={"default"} className="flex items-center gap-2">
              <Icon name="Plus" className="h-4 w-4" />
              <span>Update Changes</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Edit;
