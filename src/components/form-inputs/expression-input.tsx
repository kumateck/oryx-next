import React from "react";
import { FieldErrors, FieldValues } from "react-hook-form";

import { Label } from "@/components/ui";
import { cn } from "@/lib";
import { FormError } from "./error";
import TheAduseiFormular from "../ui/formular";

interface Props {
  errors: FieldErrors<FieldValues>;
  className?: string;
  label?: string;
  required?: boolean;
  value?: string | undefined;
  defaultValue?: string | undefined;
  onChange: (option: string | undefined) => void;
  placeholder?: string;
  name: string;
}

export const ExpressionInput = ({
  errors,
  label,
  required,
  onChange,

  value, // explicitly extract value
  // defaultValue, // extract defaultValue if needed
  ...rest
}: Props) => {
  // Ensure value is controlled by falling back to an empty string if undefined
  const effectiveValue = value !== undefined ? value : "";

  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <Label className={cn("flex items-center gap-1")}>
          <span>{label}</span>
          {required && <span className="text-red-500"> * </span>}
        </Label>
      )}
      <TheAduseiFormular {...rest} value={effectiveValue} onChange={onChange} />

      <FormError errors={errors} fieldName={rest.name} />
    </div>
  );
};
