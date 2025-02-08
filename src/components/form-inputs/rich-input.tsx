import { FieldErrors, FieldValues } from "react-hook-form";

import { cn } from "@/lib";

import { FormError } from ".";
import { Label } from "../ui";
import TheAduseiEditor from "../ui/adusei-editor";
import { SuggestionProps } from "../ui/adusei-editor/suggestion";

interface FormInputProps {
  autoFocus?: boolean;
  readOnly?: boolean;
  label?: string;
  type?: string;
  value?: string | undefined;
  onChange: (option: string | undefined) => void;
  suggestions?: SuggestionProps[];
  errors: FieldErrors<FieldValues>;
  required?: boolean;
  placeholder?: string;
  name: string;
}
export default function FormRichTextInput({
  label,
  required,
  errors,
  autoFocus,
  // readOnly,
  placeholder,
  value,
  suggestions,
  onChange,
  name,
}: FormInputProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <Label className={cn("flex items-center gap-1")}>
          <span>{label}</span>
          {required && <span className="text-red-500"> * </span>}
        </Label>
      )}
      <TheAduseiEditor
        defaultValue={value}
        onChange={onChange}
        suggestions={suggestions}
        title={label}
        autoFocus={autoFocus}
        className={cn("", {
          "border-danger-500": errors[name],
        })}
        placeholder={placeholder}
      />
      <FormError errors={errors} fieldName={name} />
    </div>
  );
}
