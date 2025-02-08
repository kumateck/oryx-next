import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Icon,
} from "@/components/ui";
import { COLLECTION_TYPES, Option } from "@/lib/constants";
import {
  PostApiV1CollectionApiArg,
  usePostApiV1CollectionMutation,
} from "@/lib/redux/api/openapi.generated";

import ProcedureForm from "./form";
import {
  CreateRoutingValidator,
  ProcedureType,
  RoutingRequestDto,
} from "./types";

// import "./types";
interface Props {
  isOpen: boolean;
  onClose: () => void;
  setItemLists: React.Dispatch<React.SetStateAction<RoutingRequestDto[]>>;
  productId?: string;
  details: RoutingRequestDto;
}
const Edit = ({ isOpen, onClose, setItemLists, details }: Props) => {
  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<RoutingRequestDto>({
    resolver: CreateRoutingValidator,
    mode: "all",
    defaultValues: details,
  });
  const [loadCollection, { data: collectionResponse }] =
    usePostApiV1CollectionMutation({});

  useEffect(() => {
    loadCollection({
      body: [
        COLLECTION_TYPES.WorkCenter,
        COLLECTION_TYPES.Operation,
        COLLECTION_TYPES.Resource,
        COLLECTION_TYPES.Role,
        COLLECTION_TYPES.User,
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
  const roleOptions = collectionResponse?.[COLLECTION_TYPES.Role]?.map(
    (role) => ({
      label: role.name,
      value: role.id,
    }),
  ) as Option[];

  const userOptions = collectionResponse?.[COLLECTION_TYPES.User]?.map(
    (user) => ({
      label: user.name,
      value: user.id,
    }),
  ) as Option[];

  const typeValues = useWatch({
    control,
    name: "type",
  }) as ProcedureType;
  const onSubmit = (data: RoutingRequestDto) => {
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Procedure</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ProcedureForm
            control={control}
            errors={errors}
            operationOptions={operationOptions}
            resourceOptions={resourceOptions}
            workCenterOptions={workCenterOptions}
            register={register}
            defaultValues={details}
            selectedType={typeValues}
            roleOptions={roleOptions}
            userOptions={userOptions}
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
