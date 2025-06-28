import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Icon,
} from "@/components/ui";
import { AuditModules, COLLECTION_TYPES, Option } from "@/lib";
import {
  PostApiV1CollectionApiArg,
  usePostApiV1CollectionMutation,
} from "@/lib/redux/api/openapi.generated";

import { RoutingRequestDto, CreateRoutingValidator } from "./types";
import ProcedureForm from "./form";
import _ from "lodash";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  details: RoutingRequestDto;
  onUpdateItem: (updatedItem: RoutingRequestDto) => boolean;
  existingItems: RoutingRequestDto[];
  currentIndex: number;
}

const Edit = ({
  isOpen,
  onClose,
  details,
  onUpdateItem,
  existingItems,
}: Props) => {
  const form = useForm<RoutingRequestDto>({
    resolver: CreateRoutingValidator,
    mode: "onChange",
    defaultValues: details,
  });

  const {
    register,
    control,
    formState: { errors, isValid, isDirty },
    reset,
    handleSubmit,
  } = form;

  const [loadCollection, { data: collectionResponse }] =
    usePostApiV1CollectionMutation();

  // const typeValues = useWatch({
  //   control,
  //   name: "type",
  // }) as ProcedureType;

  useEffect(() => {
    if (isOpen) {
      loadCollection({
        module: AuditModules.general.name,
        subModule: AuditModules.general.collection,
        body: [
          COLLECTION_TYPES.WorkCenter,
          COLLECTION_TYPES.Operation,
          COLLECTION_TYPES.Resource,
          COLLECTION_TYPES.Role,
          COLLECTION_TYPES.User,
        ],
      } as PostApiV1CollectionApiArg);
    }
  }, [isOpen, loadCollection]);

  const operationOptions = _.isEmpty(existingItems)
    ? (collectionResponse?.[COLLECTION_TYPES.Operation]?.map((uom) => ({
        label: uom.name,
        value: uom.id,
      })) as Option[])
    : (_.filter(
        collectionResponse?.[COLLECTION_TYPES.Operation],
        (itemA) =>
          !_.some(
            existingItems,
            (itemB) => itemA?.id === itemB?.operationId.value,
          ),
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

  console.log(userOptions, "userOptions", roleOptions);
  const onSubmit = (data: RoutingRequestDto) => {
    const success = onUpdateItem(data);
    if (success) {
      toast.success("BOM item updated successfully");
      onClose();
    }
  };

  const handleClose = () => {
    reset(details);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit Procedure Item</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <ProcedureForm
            control={control}
            errors={errors}
            operationOptions={operationOptions}
            resourceOptions={resourceOptions}
            workCenterOptions={workCenterOptions}
            register={register}
            // selectedType={typeValues}
            // roleOptions={roleOptions}
            // userOptions={userOptions}
          />

          <DialogFooter className="justify-end gap-4 py-6">
            <Button type="button" variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              className="flex items-center gap-2"
              disabled={!isValid || !isDirty}
            >
              <Icon name="Check" className="h-4 w-4" />
              <span>Update Changes</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Edit;
