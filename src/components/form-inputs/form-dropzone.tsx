import { cn } from "@/lib/utils";

import { ErrorProps, FormError } from ".";
import { DropZone } from "../ui/dragzone";

interface Props {
  label: string;
  required?: boolean;
  errors?: ErrorProps;
  onChange: (files: FileList | null) => void;
  defaultValue: FileList | null;
}
export default function FormFilesDropzoneInput({
  label,
  required,
  errors,
  defaultValue,
  onChange,
}: Props) {
  return (
    <div>
      <label className="space-y-1 capitalize">
        <div
          className={cn("text-base font-medium", {
            "text-danger-500": errors?.error,
          })}
        >
          {label} {required && <span className="text-danger-400">*</span>}
        </div>

        <DropZone onChange={onChange} defaultValue={defaultValue} />
        <FormError error={errors?.error} message={errors?.message} />
      </label>
    </div>
  );
}
