import { cn } from "@/lib/utils";

import { ErrorProps, FormError } from ".";
import { SelectComponents, SelectDropDown } from "../ui";

// import { formValuesToUppercase } from "~/lib/utils";
interface Option {
  label: string;
  value: string;
}
type Props = {
  autoFocus?: boolean;
  label: string;
  required?: boolean;
  errors?: ErrorProps;
  options: Option[];
  placeholder?: string;
  components?: Partial<SelectComponents>;
} & (
  | {
      isMulti: false;
      onChange: (option: Option) => void;
      defaultValue?: Option;
    }
  | {
      isMulti: true;
      onChange: (option: Option[]) => void;
      defaultValue?: Option[];
    }
);
export default function FormSelectInput({
  label,
  required,
  errors,
  options,
  defaultValue,
  onChange,
  placeholder,
  isMulti,
  components,
}: Props) {
  return (
    <div>
      <label className="space-y-1">
        <div
          className={cn("font-Medium text-sm", {
            "text-danger-500": errors?.error,
          })}
        >
          {label} {required && <span className="text-danger-400">*</span>}
        </div>
        <SelectDropDown
          isMulti={isMulti}
          classNames={{
            container: () =>
              cn("text-sm border-neutral-300", {
                "border-danger-500": errors && errors.error,
              }),
          }}
          options={options?.map((opt) => opt)}
          value={defaultValue}
          onChange={(option) => {
            isMulti ? onChange(option as Option[]) : onChange(option as Option);
          }}
          placeholder={placeholder}
          components={components}
        />
        <FormError error={errors?.error} message={errors?.message} />
      </label>
    </div>
  );
}
