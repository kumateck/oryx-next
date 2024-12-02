import { cn } from "@/lib/utils";

import { ErrorProps, FormError } from ".";
import { RichTextEditor } from "../ui";

interface Props {
  autoFocus?: boolean;
  label: string;
  required?: boolean;
  errors?: ErrorProps;
  field: any;
}
export default function FormRichtextInput({
  label,
  required,
  errors,
  autoFocus,
  field,
}: Props) {
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
        <RichTextEditor autoFocus={autoFocus} {...field} />
        <FormError error={errors?.error} message={errors?.message} />
      </label>
    </div>
  );
}
