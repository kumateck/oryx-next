import { FormWizard } from "@/components/form-inputs";
import { Card, CardContent, CardHeader, Label, Switch } from "@/components/ui";
import { cn, InputTypes, Option } from "@/lib";
import React from "react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { TestStageValues } from "../types";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  productOptions: Option[];
  userOptions: Option[];
  formOptions: Option[];
  assignSpec: boolean;
}
const SpecificationForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  productOptions,
  formOptions,
  userOptions,
  errors,
  assignSpec,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="font-semibold">Product Information</CardHeader>
        <CardContent className="w-full flex items-start justify-between gap-4 md:flex-row flex-col">
          <FormWizard
            className="w-full"
            config={[
              {
                label: "Product",
                type: InputTypes.SELECT,
                name: "productId",
                control: control as Control,
                placeholder: "Select Product",
                options: productOptions,
                errors,
              },
              {
                label: "SPEC Number",
                type: InputTypes.TEXT,
                placeholder: "SPEC Number",
                register: register("specificationNumber" as Path<TFieldValues>),
                required: true,
                errors,
              },
              {
                label: "Effective Date",
                type: InputTypes.DATE,
                placeholder: "Effective Date",
                name: "effectiveDate",
                control: control as Control,
                errors,
              },

              {
                label: "Packing Style",
                type: InputTypes.TEXT,
                placeholder: "Packing Style",
                readOnly: true,
                register: register("packingStyle" as Path<TFieldValues>),
                required: true,
                errors,
              },
              {
                label: "Shelf Life",
                type: InputTypes.TEXT,
                placeholder: "Shelf Life",
                readOnly: true,
                register: register("shelfLife" as Path<TFieldValues>),
                required: true,
                errors,
              },
              {
                label: "Label Claim",
                type: InputTypes.TEXTAREA,
                readOnly: true,
                required: false,
                placeholder: "Label Claim",
                register: register(`labelClaim` as Path<TFieldValues>),
                errors,
              },
            ]}
          />
          <FormWizard
            className="w-full"
            config={[
              {
                label: "Revision Date",
                type: InputTypes.DATE,
                name: "reviewDate",
                placeholder: "Revision Date",
                control: control as Control,
                errors,
              },
              {
                label: "Revision",
                type: InputTypes.TEXT,
                placeholder: "Revision",
                register: register("revisionNumber" as Path<TFieldValues>),
                errors,
              },
              {
                label: "Supersedes",
                type: InputTypes.TEXT,
                placeholder: "Supersedes",
                register: register("supersedesNumber" as Path<TFieldValues>),
                errors,
              },
              {
                label: "Test Stage",
                type: InputTypes.SELECT,
                name: `testStage`,
                control: control as unknown as Control,
                // TODO: update to show the right test stage options
                placeholder: "Select Test Stage",
                options: Object.keys(TestStageValues) // get only labels
                  .map((label) => ({
                    label: String(label),
                    value: String(TestStageValues[label]),
                  })),
                errors,
              },
            ]}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="font-semibold">Assignee Information</CardHeader>

        <CardContent>
          <FormWizard
            className="grid w-full grid-cols-2 gap-10 space-y-0"
            fieldWrapperClassName="flex-grow"
            config={[
              {
                label: "Template",
                control: control as Control,
                type: InputTypes.SELECT,
                name: "formId",
                required: true,
                placeholder: "Select Template",
                options: formOptions,
                errors,
              },
              {
                type: InputTypes.DATE,
                label: "Due Date",
                name: "dueDate",
                control: control as Control,
                errors,
              },
            ]}
          />
          <div className="flex items-center gap-3 py-5">
            <Controller
              control={control}
              name={"assignSpec" as Path<TFieldValues>}
              render={({ field }) => (
                <Switch className="h-4 w-7" onCheckedChange={field.onChange} />
              )}
            />

            <Label>Assign Specification</Label>
          </div>
          <div
            className={cn("space-y-6", {
              "pointer-events-none opacity-50": !assignSpec,
            })}
          >
            <FormWizard
              className="grid w-full grid-cols-2 gap-10 space-y-0"
              fieldWrapperClassName="flex-grow"
              config={[
                {
                  label: "Assignee",
                  control: control as Control,
                  type: InputTypes.SELECT,
                  name: "userId",
                  placeholder: "Assignee",
                  options: userOptions,
                  errors,
                },
              ]}
            />
            <FormWizard
              config={[
                {
                  label: "Notes",
                  control: control as Control,
                  type: InputTypes.RICHTEXT,
                  name: "description",
                  required: true,
                  placeholder: "Enter Notes",
                  errors,
                },
              ]}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpecificationForm;
