import React, { useEffect, useState } from "react";
import { FieldErrors, FieldValues } from "react-hook-form";

import { Option, cn } from "@/lib";

import { AsyncSelect, FetchOptionsResult, Label } from "../ui";
import { FormError } from "./error";

interface Props {
  autoFocus?: boolean;
  label: string;
  required?: boolean;
  isLoading: boolean;
  errors: FieldErrors<FieldValues>;
  name: string;
  fetchOptions: (search: string, page: number) => Promise<FetchOptionsResult>;
  defaultValue?: Option;
  placeholder?: string;
  onChange: (option: Option) => void;
  searchPlaceholder?: string;
  value: Option;
}

export const FormAsyncSelect = ({
  label,
  required,
  errors,
  fetchOptions,
  isLoading,
  defaultValue,
  onChange,
  placeholder,
  value: propValue,
  searchPlaceholder,
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

      <AsyncSelect
        onChange={(option) => {
          onChange(option);
          setValue(option);
        }}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        isLoading={isLoading}
        fetchOptions={fetchOptions}
        searchPlaceholder={searchPlaceholder}
        className={cn("border-neutral-300 text-sm hover:ring-0", {
          "border-danger-500": errors && errors.error,
        })}
      />

      <FormError errors={errors} fieldName={name} />
    </div>
  );
};
