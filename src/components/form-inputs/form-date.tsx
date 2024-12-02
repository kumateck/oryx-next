import { useState } from "react";

import { cn } from "@/lib/utils";

import { ErrorProps, FormError } from ".";
import { DatePicker } from "../ui";

interface Props {
  label: string;
  required?: boolean;
  errors?: ErrorProps;
  value?: string | undefined;
  onChange: (option: string | undefined) => void;
  disabled?: { after?: Date };
  fromYear?: number;
  className?: string;
}
export default function FormDateInput({
  label,
  required,
  errors,
  value,
  onChange,
  disabled,
  fromYear = 1913,
  className,
}: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <label className="space-y-1">
        <div
          className={cn("font-Medium text-sm", {
            "text-danger-500": errors?.error,
          })}
        >
          {label} {required && <span className="text-danger-400">*</span>}
        </div>
        <DatePicker
          open={open}
          onToggle={() => setOpen(!open)}
          mode="single"
          selected={value ? new Date(value) : undefined}
          onSelect={(day) => {
            onChange(day?.toISOString());
          }}
          defaultMonth={value ? new Date(value) : undefined}
          fromYear={fromYear}
          disabled={{ after: disabled?.after as Date }}
          className={cn(
            "text-base",
            {
              "border-danger-500": errors && errors.error,
            },
            className,
          )}
        />
        <FormError error={errors?.error} message={errors?.message} />
      </label>
    </div>
  );
}
