import React from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
import { EMaterialKind, InputTypes, Option } from "@/lib";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  categoryOptions: Option[];
  defaultValues?: TFieldValues;
  kind?: EMaterialKind;
}
const MaterialForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  categoryOptions,
  defaultValues,
  kind,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full space-y-5">
      <FormWizard
        // className="grid w-full grid-cols-2 gap-x-10 gap-y-5 space-y-0"
        // fieldWrapperClassName="flex-grow"
        config={[
          {
            label: "Kind",
            control: control as Control,
            type: InputTypes.RADIO,
            name: "kind",
            required: true,
            disabled: true,
            options: Object.entries(EMaterialKind)
              .filter(([, value]) => typeof value === "number")
              .map(([key, value]) => ({
                label: key, // "Raw" or "Package"
                value: value.toString(), // 0 or 1
              })),
            errors,
          },
          {
            label: "Material Category",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "materialCategoryId",
            required: true,
            onModal: true,
            defaultValue: defaultValues?.materialCategoryId,
            placeholder: "Material Category",
            options: categoryOptions,
            errors,
          },
          {
            register: register("name" as Path<TFieldValues>),
            label: "Material Name",
            placeholder: "Enter Name",
            type: InputTypes.TEXT,
            errors,
          },
          {
            register: register("code" as Path<TFieldValues>),
            label: "Material Code",
            readOnly: true,
            required: true,
            description: (
              <span className="text-sm text-neutral-500">
                You can’t change the material code
              </span>
            ),
            placeholder: "Code will be generated",
            type: InputTypes.TEXT,
            errors,
          },
        ]}
      />
      {kind === EMaterialKind.Raw && (
        <FormWizard
          config={[
            {
              register: register("pharmacopoeia" as Path<TFieldValues>),
              label: "Pharmacopoeia",
              placeholder: "Enter Pharmacopoeia",
              type: InputTypes.TEXT,
              errors,
            },
          ]}
        />
      )}
      <FormWizard
        config={[
          {
            register: register("description" as Path<TFieldValues>),
            label: "Description",
            placeholder: "Enter description",
            type: InputTypes.TEXTAREA,
            errors,
          },
        ]}
      />
    </div>
  );
};

export default MaterialForm;
