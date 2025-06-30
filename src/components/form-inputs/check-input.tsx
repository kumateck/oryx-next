import { FieldErrors, FieldValues } from "react-hook-form";

import { Option, cn } from "@/lib";

import { Label, Checkbox } from "../ui";
import { FormError } from "./error";

interface Props {
  autoFocus?: boolean;
  label: string;
  required?: boolean;
  errors: FieldErrors<FieldValues>;
  value: string[] | any[];
  onChange: (value: string[]) => void;
  options: Option[];
  disabled?: boolean;
  name: string;
}

export const FormCheckInput = ({
  label,
  required,
  errors,
  onChange,
  value,
  options,
  disabled,
  name,
}: Props) => {
  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <Label className={cn("flex items-center gap-1")}>
          <span>{label}</span>
          {required && <span className="text-red-500"> * </span>}
        </Label>
      )}
      <div className="w-full">
        {options?.map((item: Option, key: number) => {
          return (
            <div className="flex items-center gap-2 space-y-1" key={key}>
              <Checkbox
                disabled={disabled}
                className="h-4 w-4"
                id={"option-" + (key + 1) + item?.value}
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
                className="text-base text-neutral-500"
                htmlFor={"option-" + (key + 1) + item?.value}
              >
                <span className="text-base font-medium capitalize">
                  {item?.label}
                </span>
              </Label>{" "}
            </div>
          );
        })}
      </div>
      <FormError errors={errors} fieldName={name} />
    </div>
  );
};
