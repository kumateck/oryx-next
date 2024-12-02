import { useState } from "react";

import { ErrorProps, FormTextInput } from ".";

interface FormPasswordInputProps {
  autoFocus?: boolean;
  label: string;
  placeholder?: string;
  required?: boolean;
  errors?: ErrorProps;
  register: any;
}
export default function FormPasswordInput({
  autoFocus,
  label,
  required,
  errors,
  register,
  placeholder,
}: FormPasswordInputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <FormTextInput
      label={label}
      required={required}
      errors={errors}
      autoFocus={autoFocus}
      placeholder={placeholder}
      type={showPassword ? "text" : "password"}
      register={register}
      suffix={showPassword ? "Eye" : "EyeOff"}
      onSuffixClick={() => setShowPassword(!showPassword)}
      suffixClass={errors?.error ? "text-destructive" : "text-gray-400"}
    />
  );
}
