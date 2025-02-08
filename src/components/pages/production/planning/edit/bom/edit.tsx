"use client";

import _ from "lodash";
import { useEffect } from "react";
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
import { COLLECTION_TYPES, Option } from "@/lib";
import {
  MaterialDto,
  PostApiV1CollectionApiArg,
  useGetApiV1CollectionUomQuery,
  useGetApiV1MaterialQuery,
  usePostApiV1CollectionMutation,
} from "@/lib/redux/api/openapi.generated";

import BomForm from "./form";
import { BomRequestDto, CreateBomValidator } from "./types";

// import "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  setItemLists: React.Dispatch<React.SetStateAction<BomRequestDto[]>>;
  details: BomRequestDto;
  itemLists?: BomRequestDto[];
}
const Edit = ({ isOpen, onClose, setItemLists, details, itemLists }: Props) => {
  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<BomRequestDto>({
    resolver: CreateBomValidator,
    mode: "all",
    defaultValues: details,
  });

  const [loadCollection, { data: collectionResponse }] =
    usePostApiV1CollectionMutation({});

  const { data: materialResponse } = useGetApiV1MaterialQuery({
    page: 1,
    pageSize: 100,
    kind: 0,
  });

  const materialOptions = _.isEmpty(itemLists)
    ? (materialResponse?.data?.map((uom: MaterialDto) => ({
        label: uom.name,
        value: uom.id,
      })) as Option[])
    : (_.filter(
        materialResponse?.data,
        (itemA) =>
          !_.some(itemLists, (itemB) => itemA?.id === itemB?.materialId?.value),
      )?.map((uom: MaterialDto) => ({
        label: uom.name,
        value: uom.id,
      })) as Option[]);

  useEffect(() => {
    loadCollection({
      body: [COLLECTION_TYPES.MaterialType, COLLECTION_TYPES.ProductCategory],
    } as PostApiV1CollectionApiArg).unwrap();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const materialTypeOptions = collectionResponse?.[
    COLLECTION_TYPES.MaterialType
  ]?.map((uom) => ({
    label: uom.name,
    value: uom.id,
  })) as Option[];

  const { data: uomResponse } = useGetApiV1CollectionUomQuery();

  const uomOptions = uomResponse?.map((uom) => ({
    label: uom.symbol,
    value: uom.id,
  })) as Option[];

  const onSubmit = (data: BomRequestDto) => {
    setItemLists((prevState) => {
      // Check if the item already exists in the list
      const itemIndex = prevState.findIndex((item) => item.id === details.id);

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
          <DialogTitle>Edit BOM</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <BomForm
            register={register}
            errors={errors}
            control={control}
            materialTypeOptions={materialTypeOptions}
            materialOptions={materialOptions}
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
