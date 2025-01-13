// import { useForm } from "react-hook-form";
import _ from "lodash";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

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
  MaterialDto,
  PostApiV1CollectionApiArg,
  useGetApiV1MaterialQuery,
  usePostApiV1CollectionMutation,
} from "@/lib/redux/api/openapi.generated";

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
    pageSize: 100,
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
          !_.some(
            itemLists,
            (itemB) => itemA?.id === itemB?.componentMaterialId?.value,
          ),
      )?.map((uom: MaterialDto) => ({
        label: uom.name,
        value: uom.id,
      })) as Option[]);
  // const materialOptions = materialResponse?.data
  //   // ?.filter((item) => item.kind === 0)
  //   ?.map((uom: MaterialDto) => ({
  //     label: uom.name,
  //     value: uom.id,
  //   })) as Option[];

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
    setItemLists((prevState) => {
      return [...prevState, data]; // Add new item to the array
    });

    reset(); // Reset the form after submission
    onClose(); // Close the form/modal if applicable
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add BOM</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormWizard
            className="grid w-full grid-cols-2 gap-6 space-y-0"
            fieldWrapperClassName="flex-grow"
            config={[
              {
                label: "Ingredient Type",
                control,
                type: InputTypes.SELECT,
                name: "materialTypeId",
                required: true,

                onModal: true,
                placeholder: "Ingredient Type",
                options: materialTypeOptions,
                errors: {
                  message: errors.materialTypeId?.message,
                  error: !!errors.materialTypeId,
                },
              },
              {
                label: "Material",
                control,
                type: InputTypes.SELECT,
                name: "componentMaterialId",
                required: true,
                onModal: true,
                placeholder: "Material",
                options: materialOptions,
                errors: {
                  message: errors.componentMaterialId?.message,
                  error: !!errors.componentMaterialId,
                },
              },
              {
                register: { ...register("grade") },
                label: "Grade/Purity",
                placeholder: "Enter Grade/Purity",
                type: InputTypes.TEXT,

                errors: {
                  message: errors.grade?.message,
                  error: !!errors.grade,
                },
              },
              // {
              //   label: "Order of Insertion",
              //   control,
              //   type: InputTypes.SELECT,
              //   name: "order",
              //   required: true,
              //   placeholder: "Order of Insertion",
              //   options: orderOfInsertionOptions,
              //   errors: {
              //     message: errors.order?.message,
              //     error: !!errors.order,
              //   },
              // },
              {
                register: { ...register("casNumber") },
                label: "CAS Number",
                placeholder: "Enter CAS Number",
                type: InputTypes.TEXT,

                errors: {
                  message: errors.casNumber?.message,
                  error: !!errors.casNumber,
                },
              },
              {
                register: { ...register("function") },
                label: "Function",
                placeholder: "Enter function",
                type: InputTypes.TEXTAREA,

                errors: {
                  message: errors.function?.message,
                  error: !!errors.function,
                },
              },
            ]}
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
