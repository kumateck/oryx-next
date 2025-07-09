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
  kind: EMaterialKind;
}
const SpecificationForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  materialOptions,
  errors,
  kind,
}: Props<TFieldValues, TContext>) => {
  const isRawMaterial = kind === EMaterialKind.Raw;
  return (
    <>
      <Card>
        <CardHeader className="font-semibold">Material Information</CardHeader>
        <CardContent className="w-full flex items-center justify-between gap-4 md:flex-row flex-col">
          <FormWizard
            className="w-full"
            config={[
              {
                label: isRawMaterial ? "Raw Material" : "Packing Material",
                type: InputTypes.SELECT,
                name: "materialId",
                control: control as Control,
                placeholder: "Select Material",
                options: materialOptions,
                errors,
              },
              {
                label: "SPC Number",
                type: InputTypes.TEXT,
                placeholder: "SPC Number",
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
            ]}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default SpecificationForm;
