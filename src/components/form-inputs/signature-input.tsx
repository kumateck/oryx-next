import { cn } from "@/lib";
import { FormError } from ".";
import { Label, ReactSignature } from "../ui";
import { FieldErrors, FieldValues } from "react-hook-form";

interface Props {
  errors: FieldErrors<FieldValues>;
  className?: string;
  label?: string;
  required?: boolean;
  onChange: (option: string | undefined) => void;
  name: string;
}

export const FormSignatureInput = ({
  label,
  required,
  errors,
  onChange,
  name,
}: Props) => (
  <div className="flex w-full flex-col gap-2">
    {label && (
      <Label className={cn("flex items-center gap-1")}>
        <span>{label}</span>
        {required && <span className="text-red-500"> * </span>}
      </Label>
    )}
    <ReactSignature
      onChange={onChange}
      className={cn("", {
        "border-danger-500": errors?.error,
      })}
    />
    <FormError errors={errors} fieldName={name} />
  </div>
);
