// import { useForm } from "react-hook-form";
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
  PostApiV1CollectionApiArg,
  usePostApiV1CollectionMutation,
} from "@/lib/redux/api/openapi.generated";

import { CreateFinishedValidator, FinishedRequestDto } from "./types";

// import "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  setItemLists: React.Dispatch<React.SetStateAction<FinishedRequestDto[]>>;
  details: FinishedRequestDto;
}
const Edit = ({ isOpen, onClose, setItemLists, details }: Props) => {
  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<FinishedRequestDto>({
    resolver: CreateFinishedValidator,
    mode: "all",
    defaultValues: {
      ...details,
    },
  });

  const [loadCollection, { data: collectionResponse }] =
    usePostApiV1CollectionMutation({});
  useEffect(() => {
    loadCollection({
      body: [COLLECTION_TYPES.UnitOfMeasure, COLLECTION_TYPES.ProductCategory],
    } as PostApiV1CollectionApiArg).unwrap();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const unitOfMeasureOptions = collectionResponse?.[
    COLLECTION_TYPES.UnitOfMeasure
  ]?.map((uom) => ({
    label: uom.name,
    value: uom.id,
  })) as Option[];

  const onSubmit = (data: FinishedRequestDto) => {
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
      <DialogContent className="max-w-200">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <FormWizard
            className="grid w-full grid-cols-2 gap-6 space-y-0"
            fieldWrapperClassName="flex-grow"
            config={[
              {
                register: { ...register("name") },
                label: "Name",
                placeholder: "Enter name",
                type: InputTypes.TEXT,
                required: true,
                errors: {
                  message: errors.name?.message,
                  error: !!errors.name,
                },
              },
              {
                label: "Unit of Measurement",
                control,
                type: InputTypes.SELECT,
                name: "uoMId",
                required: true,
                onModal: true,
                placeholder: "Unit of Measurement",
                options: unitOfMeasureOptions,
                defaultValue: details?.uoMId,
                errors: {
                  message: errors.uoMId?.message,
                  error: !!errors.uoMId,
                },
              },

              {
                register: {
                  ...register("standardCost", {
                    valueAsNumber: true,
                  }),
                },
                label: "Cost Price",
                placeholder: "Enter price",
                type: InputTypes.TEXT,
                errors: {
                  message: errors.standardCost?.message,
                  error: !!errors.standardCost,
                },
              },

              {
                register: {
                  ...register("sellingPrice", {
                    valueAsNumber: true,
                  }),
                },
                label: "Selling Price",
                placeholder: "Enter price",
                type: InputTypes.TEXT,
                errors: {
                  message: errors.sellingPrice?.message,
                  error: !!errors.sellingPrice,
                },
              },

              {
                register: { ...register("dosageForm") },
                label: "Dosage Form",
                placeholder: "Enter dosage",
                type: InputTypes.TEXTAREA,

                errors: {
                  message: errors.dosageForm?.message,
                  error: !!errors.dosageForm,
                },
              },
              {
                register: { ...register("strength") },
                label: "Strength",
                placeholder: "Enter strength",
                type: InputTypes.TEXTAREA,

                errors: {
                  message: errors.strength?.message,
                  error: !!errors.strength,
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
              <span>Update Changes</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Edit;
