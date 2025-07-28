import { FormWizard } from "@/components/form-inputs";
import { Card, CardContent, CardHeader, Label, Switch } from "@/components/ui";
import { cn, EMaterialKind, InputTypes, Option } from "@/lib";
import React from "react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  formOptions: Option[];
  materialOptions: Option[];
  userOptions: Option[];
  kind: EMaterialKind;
  assignSpec: boolean;
}
const SpecificationForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  materialOptions,
  formOptions,
  errors,
  kind,
  assignSpec,
  userOptions,
}: Props<TFieldValues, TContext>) => {
  const isRawMaterial = kind?.toString() === EMaterialKind.Raw.toString();
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="font-semibold">Material Information</CardHeader>
        <CardContent className="w-full flex items-start gap-4 md:flex-row flex-col">
          <FormWizard
            className="w-full"
            config={[
              {
                label: isRawMaterial ? "Raw Material" : "Packing Material",
                type: InputTypes.SELECT,
                name: "materialId",
                required: true,
                control: control as Control,
                placeholder: "Select Material",
                options: materialOptions,
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
                label: "Due Date",
                type: InputTypes.DATE,
                placeholder: "Due Date",
                name: "dueDate",
                required: true,
                control: control as Control,
                errors,
              },
              {
                label: "Effective Date",
                type: InputTypes.DATE,
                placeholder: "Effective Date",
                name: "effectiveDate",
                required: true,
                control: control as Control,
                errors,
              },
              {
                label: "Description",
                type: InputTypes.TEXTAREA,
                placeholder: "Description",
                register: register("description" as Path<TFieldValues>),
                errors,
              },
            ]}
          />
          <FormWizard
            className="w-full"
            config={[
              {
                label: "Assigned User",
                type: InputTypes.SELECT,
                name: "userId",
                control: control as Control,
                placeholder: "Select User",
                options: userOptions,
                errors,
              },
              {
                label: "Template",
                type: InputTypes.SELECT,
                name: "formId",
                control: control as Control,
                placeholder: "Select Template",
                options: formOptions,
                errors,
              },
              {
                label: "Revision Date",
                type: InputTypes.DATE,
                name: "reviewDate",
                placeholder: "Revision Date",
                control: control as Control,
                required: true,
                errors,
              },
              {
                label: "Revision",
                type: InputTypes.TEXT,
                placeholder: "Revision",
                register: register("revisionNumber" as Path<TFieldValues>),
                required: true,
                errors,
              },

              {
                label: "Supersedes",
                type: InputTypes.TEXT,
                placeholder: "Supersedes",
                required: true,
                register: register("supersedesNumber" as Path<TFieldValues>),
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
                {
                  type: InputTypes.DATE,
                  label: "Due Date",
                  name: "dueDate",
                  control: control as Control,
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
