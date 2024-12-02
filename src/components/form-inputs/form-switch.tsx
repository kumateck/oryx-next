import { cn } from "@/lib/utils";

import { ErrorProps, FormError } from ".";
import { Switch } from "../ui";

interface Props {
  label: string;
  required?: boolean;
  errors?: ErrorProps;
  value?: string | undefined;
  onChange: (checked: boolean) => void;

  className?: string;
  thumbClassName?: string;
}
export default function FormSwitchInput({
  label,
  required,
  errors,
  value,
  onChange,
  className,
  thumbClassName,
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
        <Switch
          className={cn("", className)}
          thumbClassName={cn("", thumbClassName)}
          onCheckedChange={onChange}
          value={value}
        />
        <FormError error={errors?.error} message={errors?.message} />
      </label>
    </div>
  );
}
