import { icons } from "lucide-react";

import { ErrorProps, FormTextInput } from ".";

interface FormInputProps {
  autoFocus?: boolean;
  label: string;
  placeholder?: string;
  required?: boolean;
  errors?: ErrorProps;
  register: any;
  suffix?: keyof typeof icons;
  suffixClass?: string;
}
export default function FormEmailInput({
  label,
  required,
  errors,
  autoFocus,
  register,
  placeholder,
  suffix,
  suffixClass,
}: FormInputProps) {
  return (
    <FormTextInput
      label={label}
      required={required}
      errors={errors}
      autoFocus={autoFocus}
      type="email"
      register={register}
      placeholder={placeholder}
      suffix={suffix}
      suffixClass={suffixClass}
    />
  );
}
