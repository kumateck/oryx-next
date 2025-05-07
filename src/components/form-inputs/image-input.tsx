import { FieldErrors, FieldValues } from "react-hook-form";

import { cn } from "@/lib";

import { Label, ImageUpload } from "../ui";
import { FormError } from "./error";

interface Props {
  label: string;
  required?: boolean;
  errors: FieldErrors<FieldValues>;
  onChange: (file: File | null) => void;
  defaultValue: string | null;
  name: string;
}
export default function FormImageInput({
  label,
  required,
  errors,
  defaultValue,
  onChange,
  name,
}: Props) {
  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <Label className={cn("flex items-center gap-2")}>
          <span>{label}</span>
          {required && <span className="text-red-500"> * </span>}
        </Label>
      )}
      <ImageUpload
        name={name}
        onChange={onChange}
        defaultValue={defaultValue}
      />
      <FormError errors={errors} fieldName={name} />
    </div>
  );
}
