import { FormWizard } from "@/components/form-inputs";
import { Card, CardContent, CardHeader } from "@/components/ui";
import { EMaterialKind, InputTypes, Option } from "@/lib";
import React from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  materialOptions: Option[];
  formOptions: Option[];
  userOptions: Option[];
  kind: EMaterialKind;
}
const SpecificationForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  materialOptions,
  errors,
  userOptions,
  formOptions,
  kind,
}: Props<TFieldValues, TContext>) => {
  const isRawMaterial = kind?.toString() === EMaterialKind.Raw.toString();
  return (
    <>
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
    </>
  );
};

export default SpecificationForm;
