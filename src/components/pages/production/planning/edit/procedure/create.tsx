import { useEffect, useState } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

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
import SecondForm from "./form-2";
import { useParams } from "next/navigation";

interface Props {
  onAddItem: (item: RoutingRequestDto) => boolean;
  existingItems: RoutingRequestDto[];
  isOpen: boolean;
  onClose: () => void;
}

const Create = ({ onAddItem, existingItems, isOpen, onClose }: Props) => {
  const { id } = useParams();
  const productId = id as string;
  const { data: productARD } = useGetApiV1ProductArdProductByProductIdQuery({
    productId,
  });

  const form = useForm<RoutingRequestDto>({
    resolver: CreateRoutingValidator,
    mode: "onChange",
    defaultValues: {
      estimatedTime: "0",
      function: "",
      grade: "",
      operationId: {
        label: "",
        value: "",
      },
      rowId: uuidv4(),
      resources: [],
      // responsibleRoles: [],
      workCenters: [],
    },
  });

  const {
    register,
    control,
    formState: { errors, isValid },
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

  const ardOptions = productARD?.map((ard) => ({
    label: `${ard.productStandardTestProcedure?.stpNumber}(${ard.stage})`,
    value: ard.id,
  })) as Option[];

  const onSubmit = (data: RoutingRequestDto) => {
    const success = onAddItem(data);
    if (success) {
      toast.success("Procedure item added successfully");
      reset();
      onClose();
    }
  };

  const handleClose = () => {
    reset();
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
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Add Procedure </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {activeIndex === 0 && (
              <ProcedureForm
                control={control}
                errors={errors}
                operationOptions={operationOptions}
                resourceOptions={resourceOptions}
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
                  disabled={!isValid}
                >
                  <Icon name="Plus" className="h-4 w-4" />
                  <span>Add Procedure</span>
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Create;
