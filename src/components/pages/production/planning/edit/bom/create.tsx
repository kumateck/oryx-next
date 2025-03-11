// import { useForm } from "react-hook-form";
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
  itemLists?: BomRequestDto[];
}
const Create = ({ isOpen, onClose, setItemLists, itemLists }: Props) => {
  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<BomRequestDto>({
    resolver: CreateBomValidator,
    mode: "all",
  });

  const [loadCollection, { data: collectionResponse }] =
    usePostApiV1CollectionMutation({});

  const { data: materialResponse } = useGetApiV1MaterialQuery({
    page: 1,
    pageSize: 1000,
    kind: 0,
  });

  // console.log(itemLists, "itemLists");
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
  const { data: uomResponse } = useGetApiV1CollectionUomQuery({
    isRawMaterial: true,
  });

  const uomOptions = uomResponse
    ?.filter((item) => item.isRawMaterial)
    ?.map((uom) => ({
      label: uom.symbol,
      value: uom.id,
    })) as Option[];

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

  const onSubmit = (data: BomRequestDto) => {
    // console.log(data);
    setItemLists((prevState) => {
      const payload = {
        ...data,
        // id: (prevState.length + 1).toString(),
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
          <DialogTitle>Add BOM</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <BomForm
            register={register}
            errors={errors}
            control={control}
            materialTypeOptions={materialTypeOptions}
            materialOptions={materialOptions}
            uomOptions={uomOptions}
          />
          <DialogFooter className="justify-end gap-4 py-6">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>

            <Button variant={"default"} className="flex items-center gap-2">
              <Icon name="Plus" className="h-4 w-4" />
              <span>Add BOM</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Create;
