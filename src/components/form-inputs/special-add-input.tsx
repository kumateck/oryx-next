import React, { useEffect, useState } from "react";
import { FieldErrors, FieldValues } from "react-hook-form";

import { Option, cn } from "@/lib";

import { Label } from "../ui";
import { SpecialAddSelect } from "../ui/special-add-select";
import { FormError } from "./error";

interface Props {
  autoFocus?: boolean;
  label: string;
  required?: boolean;
  errors: FieldErrors<FieldValues>;
  options: Option[];
  defaultValue?: Option;
  placeholder?: string;
  onChange: (option: Option) => void;
  searchPlaceholder?: string;
  value: Option;
  handleCreateNew?: (input: string) => void;
  isBtnLoading?: boolean;
  name: string;
}

export const FormSpecialAddSelect = ({
  label,
  required,
  errors,
  options,
  defaultValue,
  onChange,
  placeholder,
  value: propValue,
  searchPlaceholder,
  handleCreateNew,
  isBtnLoading,
  name,
}: Props) => {
  const [value, setValue] = useState<Option | undefined>(
    defaultValue || propValue,
  );

  useEffect(() => setValue(propValue), [propValue]);
  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <Label className={cn("flex items-center gap-1")}>
          <span>{label}</span>
          {required && <span className="text-red-500"> * </span>}
        </Label>
      )}
      <SpecialAddSelect
        onChange={(option) => {
          onChange(option);
          setValue(option);
        }}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        options={options}
        searchPlaceholder={searchPlaceholder}
        className={cn("border-neutral-300 text-sm hover:ring-0", {
          "border-danger-500": errors && errors.error,
        })}
        handleCreateNew={handleCreateNew}
        isBtnLoading={isBtnLoading}
      />
      <FormError errors={errors} fieldName={name} />
    </div>
  );
};
