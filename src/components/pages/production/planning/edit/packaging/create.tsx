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
import { COLLECTION_TYPES, InputTypes, Option } from "@/lib/constants";
import {
  MaterialDto,
  PostApiV1CollectionApiArg,
  useGetApiV1MaterialQuery,
  usePostApiV1CollectionMutation,
} from "@/lib/redux/api/openapi.generated";

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
  });

  const [loadCollection, { data: collectionResponse }] =
    usePostApiV1CollectionMutation({});

  const { data: materialResponse } = useGetApiV1MaterialQuery({
    page: 1,
    pageSize: 10000,
    kind: 1,
  });

  // const materialOptions = materialResponse?.data
  //   // ?.filter((item) => item.kind === 1)
  //   ?.map((uom: MaterialDto) => ({
  //     label: uom.name,
  //     value: uom.id,
  //   })) as Option[];

  // console.log(itemLists, "itemLists");
  const materialOptions = _.isEmpty(itemLists)
    ? (materialResponse?.data?.map((uom: MaterialDto) => ({
        label: uom.name,
        value: uom.id,
      })) as Option[])
    : (_.filter(
        materialResponse?.data,
        (itemA) =>
          !_.some(itemLists, (itemB) => itemA?.id === itemB?.materialId.value),
      )?.map((uom: MaterialDto) => ({
        label: uom.name,
        value: uom.id,
      })) as Option[]);

  useEffect(() => {
    loadCollection({
      body: [COLLECTION_TYPES.MaterialType, COLLECTION_TYPES.PackageType],
    } as PostApiV1CollectionApiArg).unwrap();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const packageTypeOptions = collectionResponse?.[
    COLLECTION_TYPES.PackageType
  ]?.map((uom) => ({
    label: uom.name,
    value: uom.id,
  })) as Option[];

  const onSubmit = (data: PackagingRequestDto) => {
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
          <DialogTitle>Add Package</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormWizard
            className="grid w-full grid-cols-2 gap-6 space-y-0"
            fieldWrapperClassName="flex-grow"
            config={[
              {
                label: "Package Type",
                control,
                type: InputTypes.SELECT,
                onModal: true,
                name: "packageTypeId",
                required: true,
                placeholder: "Package Type",
                options: packageTypeOptions,
                errors: {
                  message: errors.packageTypeId?.message,
                  error: !!errors.packageTypeId,
                },
              },
              {
                label: "Material",
                control,
                type: InputTypes.SELECT,
                onModal: true,
                name: "materialId",
                required: true,
                placeholder: "Material",
                options: materialOptions,
                errors: {
                  message: errors.materialId?.message,
                  error: !!errors.materialId,
                },
              },

              {
                register: { ...register("materialThickness") },
                label: "Material Thickness",
                placeholder: "Enter Thickness",
                type: InputTypes.TEXT,
                errors: {
                  message: errors.materialThickness?.message,
                  error: !!errors.materialThickness,
                },
              },

              {
                register: { ...register("otherStandards") },
                label: "Other Standards",
                placeholder: "Enter Other Standards",
                type: InputTypes.TEXTAREA,

                errors: {
                  message: errors.otherStandards?.message,
                  error: !!errors.otherStandards,
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
              <span>Add Package</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Create;
