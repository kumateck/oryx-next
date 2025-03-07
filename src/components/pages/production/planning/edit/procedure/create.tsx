import _ from "lodash";
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
  itemLists?: RoutingRequestDto[];
}
const Create = ({ isOpen, onClose, setItemLists, itemLists }: Props) => {
  const {
    register,
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
        COLLECTION_TYPES.Role,
        COLLECTION_TYPES.User,
      ],
    } as PostApiV1CollectionApiArg).unwrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const typeValues = useWatch({
    control,
    name: "type",
  }) as ProcedureType;
  // const operationOptions = collectionResponse?.[
  //   COLLECTION_TYPES.Operation
  // ]?.map((uom) => ({
  //   label: uom.name,
  //   value: uom.id,
  // })) as Option[];

  const operationOptions = _.isEmpty(itemLists)
    ? (collectionResponse?.[COLLECTION_TYPES.Operation]?.map((uom) => ({
        label: uom.name,
        value: uom.id,
      })) as Option[])
    : (_.filter(
        collectionResponse?.[COLLECTION_TYPES.Operation],
        (itemA) =>
          !_.some(itemLists, (itemB) => itemA?.id === itemB?.operationId.value),
      )?.map((uom) => ({
        label: uom.name,
        value: uom.id,
      })) as Option[]);

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
  const onSubmit = (data: RoutingRequestDto) => {
    setItemLists((prevState) => {
      const payload = {
        ...data,
        idIndex: (prevState.length + 1).toString(),
      };
      return [...prevState, payload]; // Add new item to the array
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
          <ProcedureForm
            control={control}
            errors={errors}
            operationOptions={operationOptions}
            resourceOptions={resourceOptions}
            workCenterOptions={workCenterOptions}
            register={register}
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
              <span>Add Procedure</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Create;
