"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Control, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { FormWizard } from "@/components/form-inputs";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import { InputTypes, Option } from "@/lib";

import { checklistBatchRequestSchema } from "./types";

interface AddBatchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  // uomOptions: Option[];
  packingUomOptions: Option[];
  remainingQty: number;
  qtyUnit: string;
}

const AddBatchDialog = ({
  isOpen,
  onClose,
  onSave,
  // uomOptions,
  packingUomOptions,
  remainingQty,
  qtyUnit,
}: AddBatchDialogProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checklistBatchRequestSchema),
    mode: "all",
  });

  console.log(errors, "errors");

  const onSubmit = (data: any) => {
    try {
      const filteredWeights = data.weights.filter(
        (weight: any) => weight.srNumber && weight.grossWeight,
      );

      if (filteredWeights.length === 0) {
        toast.error("At least one SR Number and Gross Weight pair is required");
        return;
      }

      const validatedData = checklistBatchRequestSchema.parse({
        ...data,
        weights: filteredWeights,
      });

      onSave(validatedData);
      reset();
      onClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error("Please fix validation errors before submitting");
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Add Batch Information</DialogTitle>
        </DialogHeader>
        <div>
          <p>
            Material Quantity: {remainingQty}
            {qtyUnit}
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit)(e);
          }}
        >
          <FormWizard
            className="w-full gap-x-2 space-y-0"
            fieldWrapperClassName="flex-grow"
            config={[
              {
                register: register("batchNumber"),
                label: "Batch Number",
                type: InputTypes.TEXT,
                errors,
                // required: true,
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
                type: InputTypes.NUMBER,
                errors,
                required: true,
              },
              {
                name: "numberOfContainersUom",
                label: "Unit of Measure",
                type: InputTypes.SELECT,
                control: control as Control,
                required: true,
                options: packingUomOptions,
                errors,
              },
              {
                register: register("quantityPerContainer"),
                label: "Quantity per Container/bag/shipper",
                type: InputTypes.NUMBER,
                errors,
                required: true,
              },
              {
                // name: "uom",
                // label: "Unit of Measure",
                // type: InputTypes.SELECT,
                // control: control as Control,
                // required: true,
                // options: uomOptions,
                // errors,
                type: InputTypes.LABEL,
                label: ".",
                title: qtyUnit,
              },
            ]}
          />
          <FormWizard
            className="w-full gap-x-2 space-y-2"
            fieldWrapperClassName="flex-grow"
            config={[
              {
                label: "Manufacturing Date",
                control: control as Control,
                type: InputTypes.DATE,
                name: "manufacturingDate",
                required: true,
                disabled: {
                  before: new Date(2023, 0, 1),
                  after: new Date(2027, 0, 1),
                },
                errors,
              },
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
                label: "Restest Date",
                control: control as Control,
                type: InputTypes.DATE,
                name: "retestDate",
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
            {Array.from({ length: 18 }).map((_, i) => (
              <FormWizard
                key={i}
                className="grid w-full grid-cols-2 gap-2 space-y-0"
                fieldWrapperClassName="flex-grow"
                config={[
                  {
                    register: register(`weights.${i}.srNumber`),
                    label: "",
                    type: InputTypes.TEXT,
                    errors,
                  },
                  {
                    register: register(`weights.${i}.grossWeight`),
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
            <Button type="button" onClick={handleSubmit(onSubmit)}>
              Add
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBatchDialog;
