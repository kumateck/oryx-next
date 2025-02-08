import React, { useEffect, useState } from "react";
import { FieldErrors, FieldValues } from "react-hook-form";

import { Option, cn } from "@/lib";

import { Label } from "../ui";
import { FetchOptionsResult, PaginatedSelect } from "../ui/paginated-select";
// import { SpecialSelect } from "../ui/special-select";
import { FormError } from "./error";

interface Props {
  autoFocus?: boolean;
  label: string;
  required?: boolean;
  errors: FieldErrors<FieldValues>;
  name: string;
  options: Option[];
  fetchOptions: (search: string, page: number) => Promise<FetchOptionsResult>;

  defaultValue?: Option;
  placeholder?: string;
  onChange: (option: Option) => void;
  searchPlaceholder?: string;
  value: Option;
}

export const FormPaginatedSelect = ({
  label,
  required,
  errors,
  fetchOptions,
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
      <PaginatedSelect
        onChange={(option) => {
          onChange(option);
          setValue(option);
        }}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
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
