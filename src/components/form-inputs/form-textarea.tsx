import { cn } from "@/lib/utils";

import { ErrorProps, FormError } from ".";
import { Textarea } from "../ui";

interface FormInputProps {
  autoFocus?: boolean;
  readOnly?: boolean;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  errors?: ErrorProps;
  register: any;
  labelExtra?: React.ReactNode;
  description?: React.ReactNode;
  rows?: number;
}
export default function FormTextareaInput({
  label,
  required,
  errors,
  autoFocus,
  register,
  labelExtra,
  readOnly,
  placeholder,
  type,
  description,
  rows,
  ...rest
}: FormInputProps) {
  return (
    <div>
      <label className="space-y-1">
        <div className="flex gap-2">
          <div
            className={cn("font-Medium text-sm", {
              "text-danger-500": errors?.error,
            })}
          >
            {label} {required && <span className="text-danger-400">*</span>}
          </div>
          {labelExtra}
        </div>
        <Textarea
          autoFocus={autoFocus}
          readOnly={readOnly}
          type={type ? type : "text"}
          placeholder={placeholder}
          rows={rows || 3}
          {...register}
          className={cn("", {
            "border-danger-500": errors?.error,
          })}
          {...rest}
        />
        {description && <div>{description}</div>}
        <FormError error={errors?.error} message={errors?.message} />
      </label>
    </div>
  );
}
