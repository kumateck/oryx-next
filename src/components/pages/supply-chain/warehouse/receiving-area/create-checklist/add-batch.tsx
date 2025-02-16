"use client";

import React, { useEffect } from "react";
import { Control, useForm } from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import { COLLECTION_TYPES, InputTypes, Option } from "@/lib";
import {
  PostApiV1CollectionApiArg,
  usePostApiV1CollectionMutation,
} from "@/lib/redux/api/openapi.generated";

interface AddBatchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

const AddBatchDialog = ({ isOpen, onClose, onSave }: AddBatchDialogProps) => {
  const [loadCollection, { data: collectionResponse }] =
    usePostApiV1CollectionMutation();

  useEffect(() => {
    loadCollection({
      body: [COLLECTION_TYPES.UnitOfMeasure, COLLECTION_TYPES.ProductCategory],
    } as PostApiV1CollectionApiArg).unwrap();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  //   const {
  //     register,
  //     control,
  //     formState: { errors },
  //     reset,
  //     handleSubmit,
  //   } = useForm<RackRequestDto>({
  //     resolver: CreateRackValidator,
  //     mode: "all",
  //   });
  const onSubmit = (data: any) => {
    onSave(data);
    onClose();
  };

  const categoryOptions = collectionResponse?.[
    COLLECTION_TYPES.ProductCategory
  ]?.map((uom) => ({
    label: uom.name,
    value: uom.id,
  })) as Option[];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Add Batch Information</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormWizard
            className="w-full gap-x-2 space-y-0"
            fieldWrapperClassName="flex-grow"
            config={[
              {
                register: register("batchNumber"),
                label: "Batch Number",
                type: InputTypes.TEXT,
                errors,
                className: "col-span-2",
              },
            ]}
          />
          <FormWizard
            className="grid w-full grid-cols-2 gap-x-2 space-y-0"
            fieldWrapperClassName="flex-grow"
            config={[
              {
                register: register("numberOfContainers"),
                label: "Number of Containers/Bags/Shippers",
                type: InputTypes.TEXT,
                errors,
              },
              {
                name: "uom",
                label: "Unit of Measure",
                type: InputTypes.SELECT,
                control: control as Control,
                required: true,
                onModal: true,
                placeholder: "Select Category",
                options: categoryOptions,
                errors,
              },
              {
                register: register("quantityPerContainer"),
                label: "Quantity per Container/bag/shipper",
                type: InputTypes.TEXT,
                errors,
              },
              {
                register: register("uom"),
                label: "Unit of Measure",
                type: InputTypes.TEXT,
                readOnly: true,
                errors,
              },
            ]}
          />
          <FormWizard
            className="w-full gap-x-2 space-y-0"
            fieldWrapperClassName="flex-grow"
            config={[
              {
                label: "Expiry Date",
                control: control as Control,
                type: InputTypes.DATE,
                name: "expiryDate",
                required: true,
                disabled: {
                  before: new Date(),
                  after: new Date(2027, 0, 1),
                },
                errors,
              },
              {
                label: "Manufacturing Date",
                control: control as Control,
                type: InputTypes.DATE,
                name: "manufacturingDate",
                required: true,
                disabled: {
                  before: new Date(),
                  after: new Date(2027, 0, 1),
                },
                errors,
              },
              {
                label: "Restest Date",
                control: control as Control,
                type: InputTypes.DATE,
                name: "retestDate",
                required: true,
                disabled: {
                  before: new Date(),
                  after: new Date(2027, 0, 1),
                },
                errors,
              },
            ]}
          />
          <div className="mt-5 grid grid-cols-3 gap-x-4 gap-y-1">
            <div className="col-span-1 grid grid-cols-2 gap-2 text-sm font-semibold">
              <span>SR Number</span>
              <span>Gross Weight</span>
            </div>
            <div className="col-span-1 grid grid-cols-2 gap-2 text-sm font-semibold">
              <span>SR Number</span>
              <span>Gross Weight</span>
            </div>
            <div className="col-span-1 grid grid-cols-2 gap-2 text-sm font-semibold">
              <span>SR Number</span>
              <span>Gross Weight</span>
            </div>
            {[...Array(18)].map((_, i) => (
              <FormWizard
                key={i}
                className="grid w-full grid-cols-2 gap-2 space-y-0"
                fieldWrapperClassName="flex-grow"
                config={[
                  {
                    register: register(`srNumber${i}`),
                    label: "",
                    type: InputTypes.TEXT,
                    errors,
                  },
                  {
                    register: register(`grossWeight${i}`),
                    label: "",
                    type: InputTypes.TEXT,
                    errors,
                  },
                ]}
              />
            ))}
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBatchDialog;
