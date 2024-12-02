import { icons } from "lucide-react";

import { cn } from "@/lib/utils";

import { ErrorProps, FormError } from ".";
import { Input } from "../ui";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
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
  suffix?: keyof typeof icons;
  suffixClass?: string;
  onSuffixClick?: () => void;
}
export default function FormTextInput({
  label,
  required,
  errors,
  autoFocus,
  register,
  labelExtra,
  readOnly,
  placeholder,
  suffix,
  suffixClass,
  type,
  description,
  onSuffixClick,
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
        <Input
          autoFocus={autoFocus}
          readOnly={readOnly}
          type={type ? type : "text"}
          placeholder={placeholder}
          {...register}
          suffix={suffix}
          suffixClass={suffixClass}
          className={cn("", {
            "border-danger-500": errors?.error,
          })}
          onSuffixClick={onSuffixClick}
          {...rest}
        />
        {description && <div>{description}</div>}
        <FormError error={errors?.error} message={errors?.message} />
      </label>
    </div>
  );
}
