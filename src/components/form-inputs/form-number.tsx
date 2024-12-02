import { cn } from "@/lib/utils";

import { ErrorProps, FormTextInput } from ".";

interface FormInputProps {
  autoFocus?: boolean;
  label: string;
  required?: boolean;
  errors?: ErrorProps;
  register: any;
}
export default function FormNumberInput({
  label,
  required,
  errors,
  autoFocus,
  register,
}: FormInputProps) {
  return (
    <FormTextInput
      errors={errors}
      label={label}
      required={required}
      autoFocus={autoFocus}
      type="number"
      step="0.01"
      register={register}
      // onWheel={(e: {
      //   currentTarget: { blur: () => void };
      //   stopPropagation: () => void;
      // }) => {
      //   //prevent value from changing on scroll
      //   e.currentTarget.blur();
      //   e.stopPropagation();
      // }}
      onWheel={(e: any) => {
        e.preventDefault(); // Prevents changing the value when scrolling
      }}
      className={cn("text-base", { "border-danger-500": errors?.error })}
    />
  );
}
