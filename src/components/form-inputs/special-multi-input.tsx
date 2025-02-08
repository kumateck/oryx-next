import React from "react";
import { FieldErrors, FieldValues } from "react-hook-form";

import { Option, cn } from "@/lib";

import { Label } from "../ui";
import { SpecialMultiSelect } from "../ui/special-multi-select";
import { FormError } from "./error";

interface Props {
  autoFocus?: boolean;
  label: string;
  required?: boolean;
  errors: FieldErrors<FieldValues>;
  options: Option[];
  defaultValue?: Option[];
  placeholder?: string;
  onChange: (option: Option[]) => void;
  coverTriggerWidth?: boolean;
  name: string;
}

export const FormSpecialMultiSelect = ({
  label,
  required,
  errors,
  options,
  defaultValue,
  onChange,
  placeholder,
  name,
}: Props) => {
  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <Label className={cn("flex items-center gap-1")}>
          <span>{label}</span>
          {required && <span className="text-red-500"> * </span>}
        </Label>
      )}
      <SpecialMultiSelect
        placeholder={placeholder}
        classNames={cn("", {
          "border-red-500": errors && errors.error,
        })}
        options={options}
        defaultValue={defaultValue || []}
        onChange={onChange}
      />
      <FormError errors={errors} fieldName={name} />
    </div>
  );
};
