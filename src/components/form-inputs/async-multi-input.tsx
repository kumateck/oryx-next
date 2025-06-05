import React, { useEffect, useState } from "react";
import { FieldErrors, FieldValues } from "react-hook-form";

import { Option, cn } from "@/lib";

import { FetchOptionsResult, Label } from "../ui";

import { FormError } from "./error";

import { AsyncMultiSelect } from "../ui/special-multi-select/async";

interface Props {
  autoFocus?: boolean;
  label: string;
  required?: boolean;
  errors: FieldErrors<FieldValues>;
  defaultValue?: Option[];
  placeholder?: string;
  coverTriggerWidth?: boolean;
  value: Option[];
  name: string;
  isLoading: boolean;
  onChange: (option: Option[]) => void;
  fetchOptions: (search: string, page: number) => Promise<FetchOptionsResult>;
  searchPlaceholder?: string;
}

export const FormAsyncMultiSelect = ({
  label,
  required,
  errors,
  defaultValue,
  onChange,
  placeholder,
  name,
  fetchOptions,
  isLoading,
  value: propValue,
  searchPlaceholder,
}: Props) => {
  const [value, setValue] = useState<Option[] | undefined>(
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
      <AsyncMultiSelect
        placeholder={placeholder}
        classNames={cn("", {
          "border-red-500": errors && errors.error,
        })}
        isLoading={isLoading}
        fetchOptions={fetchOptions}
        value={value}
        searchPlaceholder={searchPlaceholder}
        defaultValue={defaultValue || []}
        onChange={(option) => {
          onChange(option);
          setValue(option);
        }}
      />
      <FormError errors={errors} fieldName={name} />
    </div>
  );
};
