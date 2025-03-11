// import { useForm } from "react-hook-form";
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
import { InputTypes } from "@/lib";

import { CreateFinishedValidator, FinishedRequestDto } from "./types";

// import "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  setItemLists: React.Dispatch<React.SetStateAction<FinishedRequestDto[]>>;
}
const Create = ({ isOpen, onClose, setItemLists }: Props) => {
  const {
    register,
    // control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<FinishedRequestDto>({
    resolver: CreateFinishedValidator,
    mode: "all",
  });

  // const [loadCollection, { data: collectionResponse }] =
  //   usePostApiV1CollectionMutation({});

  // useEffect(() => {
  //   loadCollection({
  //     body: [COLLECTION_TYPES.UnitOfMeasure, COLLECTION_TYPES.ProductCategory],
  //   } as PostApiV1CollectionApiArg).unwrap();

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const unitOfMeasureOptions = collectionResponse?.[
  //   COLLECTION_TYPES.UnitOfMeasure
  // ]?.map((uom) => ({
  //   label: uom.name,
  //   value: uom.id,
  // })) as Option[];

  const onSubmit = (data: FinishedRequestDto) => {
    setItemLists((prevState) => {
      return [...prevState, data]; // Add new item to the array
    });

    reset(); // Reset the form after submission
    onClose(); // Close the form/modal if applicable
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-200">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
        </DialogHeader>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <FormWizard
            className="grid w-full grid-cols-2 gap-6 space-y-0"
            fieldWrapperClassName="flex-grow"
            config={[
              {
                register: register("name"),
                label: "Name",
                placeholder: "Enter name",
                type: InputTypes.TEXT,
                required: true,
                errors,
              },
              // {
              //   label: "Unit of Measurement",
              //   control: control as Control,
              //   type: InputTypes.SELECT,
              //   name: "uoMId",
              //   required: true,
              //   onModal: true,
              //   placeholder: "Unit of Measurement",
              //   options: unitOfMeasureOptions,
              //   errors
              // },

              {
                register: register("standardCost", {
                  valueAsNumber: true,
                }),
                label: "Cost Price",
                placeholder: "Enter price",
                type: InputTypes.TEXT,
                errors,
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
                errors,
              },

              {
                register: register("dosageForm"),
                label: "Dosage Form",
                placeholder: "Enter dosage",
                type: InputTypes.TEXTAREA,

                errors,
              },
              {
                register: register("strength"),
                label: "Strength",
                placeholder: "Enter strength",
                type: InputTypes.TEXTAREA,

                errors,
              },
            ]}
          />
          <DialogFooter className="justify-end gap-4 py-6">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>

            <Button variant={"default"} className="flex items-center gap-2">
              <Icon name="Plus" className="h-4 w-4" />
              <span>Add Product</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Create;
