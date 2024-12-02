import { cn } from "@/lib/utils";

import { ErrorProps, FormError } from ".";
import { SpecialDropdown } from "../ui";

interface Option {
  label: string;
  value: string;
}
type Props = {
  autoFocus?: boolean;
  label: string;
  required?: boolean;
  errors?: ErrorProps;
  options: Option[];
  defaultValue?: Option[];
  placeholder?: string;
  onChange: (option: Option[]) => void;
};

export default function FormMultiSelectInput({
  label,
  required,
  errors,
  options,
  defaultValue,
  onChange,
  placeholder,
}: Props) {
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
        <SpecialDropdown
          placeholder={placeholder}
          classNames={cn("h-full text-sm border-neutral-300 hover:ring-0", {
            "border-danger-500": errors && errors.error,
          })}
          options={options}
          defaultValue={defaultValue || []}
          onChange={onChange}
        />
        <FormError error={errors?.error} message={errors?.message} />
      </label>
    </div>
  );
}
