// import { useForm } from "react-hook-form";

import { useFieldArray, useForm } from "react-hook-form";

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
import { usePostApiV1CollectionUomPaginatedMutation } from "@/lib/redux/api/openapi.generated";

import PackingStyleForm from "./form";
import { CreatePackingalidator, PackingStyleRequestDto } from "./types";
import { useEffect, useState } from "react";

// import "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  setItemLists: React.Dispatch<React.SetStateAction<PackingStyleRequestDto[]>>;
  details: PackingStyleRequestDto;
  itemLists: PackingStyleRequestDto[];
}
const Edit = ({ isOpen, onClose, setItemLists, details }: Props) => {
  console.log(details, "details");
  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<PackingStyleRequestDto>({
    resolver: CreatePackingalidator,
    mode: "all",
    defaultValues: details,
  });
  const { append, fields, remove } = useFieldArray({
    control,
    name: "packingLists",
  });

  const onSubmit = (data: PackingStyleRequestDto) => {
    setItemLists((prevState) => {
      // Check if the item already exists in the list
      const itemIndex = prevState.findIndex(
        (item) => item.idIndex === details.idIndex,
      );

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
  const [loadUom] = usePostApiV1CollectionUomPaginatedMutation();

  const [uomOptions, setUomOptions] = useState<Option[]>([]);

  const handleLoadUom = async () => {
    try {
      const response = await loadUom({
        filterUnitOfMeasure: {
          pageSize: 100,
        },
      }).unwrap();
      const uom = response.data;
      const uomOpt = uom?.map((uom) => ({
        label: `${uom.name} (${uom.symbol})`,
        value: uom.id,
      })) as Option[];

      setUomOptions(uomOpt);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleLoadUom();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit Package</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <PackingStyleForm
            register={register}
            control={control}
            errors={errors}
            append={append}
            fields={fields}
            remove={remove}
            uomOptions={uomOptions}
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
