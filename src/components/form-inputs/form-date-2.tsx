import { useState } from "react";

import { cn } from "@/lib/utils";

import { ErrorProps, FormError } from ".";
import { CalendarProps2, DatePicker2 } from "../ui";

interface Props extends CalendarProps2 {
  label: string;
  required?: boolean;
  errors?: ErrorProps;
  disabled?: { after?: Date; before?: Date };
  fromYear?: number;
}
export default function FormDate2Input({
  label,
  required,
  errors,
  value,
  onChange,
  disabled,
  fromYear,
}: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <label className="space-y-1 capitalize">
        <div
          className={cn("text-base font-medium", {
            "text-red-500": errors?.error,
          })}
        >
          {label} {required && <span className="text-red-400">*</span>}
        </div>
        <DatePicker2
          open={open}
          onToggle={() => setOpen(!open)}
          value={value}
          onChange={onChange}
          minDate={
            fromYear
              ? new Date(fromYear, 0, 1)
              : disabled?.before
                ? disabled?.before
                : undefined
          }
          maxDate={disabled?.after}
          className={cn("text-base", {
            "border-red-500": errors && errors.error,
          })}
        />
        <FormError error={errors?.error} message={errors?.message} />
      </label>
    </div>
  );
}
