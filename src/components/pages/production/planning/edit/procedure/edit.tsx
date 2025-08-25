import { useEffect, useState } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
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
import {
  AuditModules,
  COLLECTION_TYPES,
  OperationActionOptions,
  Option,
} from "@/lib";
import {
  PostApiV1CollectionApiArg,
  useGetApiV1ProductArdProductByProductIdQuery,
  usePostApiV1CollectionMutation,
} from "@/lib/redux/api/openapi.generated";

import { RoutingRequestDto, CreateRoutingValidator } from "./types";
import ProcedureForm from "./form";
import _ from "lodash";
import { useParams } from "next/navigation";
import SecondForm from "./form-2";

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
  const { id } = useParams();
  const productId = id as string;
  const { data: productARD } = useGetApiV1ProductArdProductByProductIdQuery({
    productId,
  });
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
    getValues,
  } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "personnels",
  });
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

  const ardOptions = productARD?.map((ard) => ({
    label: `${ard.productStandardTestProcedure?.stpNumber} (Stage-${ard.stage})`,
    value: ard.id,
  })) as Option[];

  const onSubmit = (data: RoutingRequestDto) => {
    const success = onUpdateItem(data);
    if (success) {
      toast.success("Procedure item updated successfully");
      onClose();
    }
  };

  const handleClose = () => {
    reset(details);
    onClose();
  };

  const [activeIndex, setActiveIndex] = useState(0);

  const dots = [0, 1];
  const typeValues =
    useWatch({
      control,
      name: "personnels",
    })?.map((stage) => stage?.type) || [];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit Procedure Item</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {activeIndex === 0 && (
            <ProcedureForm
              control={control}
              errors={errors}
              operationOptions={operationOptions}
              workCenterOptions={workCenterOptions}
              register={register}
            />
          )}
          {activeIndex === 1 && (
            <SecondForm
              fields={fields}
              append={append}
              remove={remove}
              register={register}
              control={control}
              errors={errors}
              roleOptions={roleOptions}
              userOptions={userOptions}
              operationActionOptions={OperationActionOptions}
              typeValues={typeValues}
              ardOptions={ardOptions}
              getValues={getValues}
            />
          )}
          <div className="flex space-x-2 w-full justify-center items-center py-5">
            {dots.map((_, index) => (
              <button
                type="button"
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-4 h-4 rounded-full transition-colors duration-200 ${
                  activeIndex === index
                    ? "bg-primary-default"
                    : "bg-neutral-secondary"
                }`}
              />
            ))}
          </div>
          <DialogFooter className="justify-end gap-4 py-6">
            <Button type="button" variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            {activeIndex === 0 && (
              <Button
                type="button"
                variant="default"
                className="flex items-center gap-2"
                onClick={() => setActiveIndex(1)}
              >
                <Icon name="Plus" className="h-4 w-4" />
                <span>Next</span>
              </Button>
            )}
            {activeIndex === 1 && (
              <Button
                type="submit"
                variant="default"
                className="flex items-center gap-2"
                disabled={!isValid || !isDirty}
              >
                <Icon name="Check" className="h-4 w-4" />
                <span>Update Changes</span>
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Edit;
