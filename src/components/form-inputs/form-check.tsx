import { cn } from "@/lib/utils";

import { ErrorProps, FormError } from ".";
import { Checkbox, Label } from "../ui";

interface Option {
  label: string;
  value: string;
}

interface Props {
  autoFocus?: boolean;
  label: string;
  required?: boolean;
  errors?: ErrorProps;
  value: string[] | any[];
  onChange: (value: string[]) => void;
  options: Option[];
}
export default function FormCheckInput({
  label,
  required,
  errors,
  onChange,
  value,
  options,
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-2">
          {options?.map((item: Option, key: number) => {
            return (
              <div className="flex items-center gap-2 space-y-1" key={key}>
                <Checkbox
                  className="h-8 w-8"
                  id={"option-" + (key + 1)}
                  key={key}
                  checked={value?.includes(item?.value)}
                  onCheckedChange={(checked) => {
                    return checked
                      ? onChange([...value, item.value])
                      : onChange(
                          value?.filter((opt: string) => opt !== item.value),
                        );
                  }}
                />
                <Label
                  className="text-base text-slate-700"
                  htmlFor={"option-" + (key + 1)}
                >
                  <span className="text-base font-medium capitalize">
                    {item?.label}
                  </span>
                </Label>{" "}
              </div>
            );
          })}
        </div>

        <FormError error={errors?.error} message={errors?.message} />
      </label>
    </div>
  );
}
