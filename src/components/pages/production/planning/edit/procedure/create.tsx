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

import { CreateRoutingValidator, RoutingRequestDto } from "./types";

// import "./types";
interface Props {
  isOpen: boolean;
  onClose: () => void;
  setItemLists: React.Dispatch<React.SetStateAction<RoutingRequestDto[]>>;
  productId?: string;
}
const Create = ({ isOpen, onClose, setItemLists }: Props) => {
  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<RoutingRequestDto>({
    resolver: CreateRoutingValidator,
    mode: "all",
  });
  const [loadCollection, { data: collectionResponse }] =
    usePostApiV1CollectionMutation({});

  useEffect(() => {
    loadCollection({
      body: [
        COLLECTION_TYPES.WorkCenter,
        COLLECTION_TYPES.Operation,
        COLLECTION_TYPES.Resource,
      ],
    } as PostApiV1CollectionApiArg).unwrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const operationOptions = collectionResponse?.[
    COLLECTION_TYPES.Operation
  ]?.map((uom) => ({
    label: uom.name,
    value: uom.id,
  })) as Option[];

  const workCenterOptions = collectionResponse?.[
    COLLECTION_TYPES.WorkCenter
  ]?.map((uom) => ({
    label: uom.name,
    value: uom.id,
  })) as Option[];
  const resourceOptions = collectionResponse?.[COLLECTION_TYPES.Resource]?.map(
    (uom) => ({
      label: uom.name,
      value: uom.id,
    }),
  ) as Option[];
  const onSubmit = (data: RoutingRequestDto) => {
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
          <DialogTitle>Add Procedure</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormWizard
            className="grid w-full grid-cols-2 gap-6 space-y-0"
            fieldWrapperClassName="flex-grow"
            config={[
              {
                label: "Operation",
                control,
                type: InputTypes.SELECT,
                name: "operationId",
                required: true,
                placeholder: "Operation",
                options: operationOptions,
                errors: {
                  message: errors.operationId?.message,
                  error: !!errors.operationId,
                },
              },
              {
                label: "Work Center",
                control,
                type: InputTypes.SELECT,
                name: "workCenterId",
                required: true,
                placeholder: "Work Center",
                options: workCenterOptions,
                errors: {
                  message: errors.workCenterId?.message,
                  error: !!errors.workCenterId,
                },
              },
              {
                control,
                name: "estimatedTime",
                label: "Estimated Time",
                placeholder: "Select Time",
                type: InputTypes.MOMENT,
                required: true,
                errors: {
                  message: errors.estimatedTime?.message,
                  error: !!errors.estimatedTime,
                },
              },
              {
                label: "Resources",
                control,
                type: InputTypes.MULTIPLE,
                name: "resourceIds",
                required: true,
                placeholder: "Resources",
                options: resourceOptions,
                errors: {
                  message: errors.resourceIds?.message,
                  error: !!errors.resourceIds,
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
              <span>Add Route</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Create;
