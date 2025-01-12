import { cn } from "@/lib/utils";

import { ErrorProps, FormError } from ".";
import { SelectComponents, SelectDropDown } from "../ui";

// import { formValuesToUppercase } from "~/lib/utils";
interface Option {
  label: string;
  value: string;
}
type Props = {
  onModal?: boolean;
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
      value: Option;
    }
  | {
      isMulti: true;
      onChange: (option: Option[]) => void;
      defaultValue?: Option[];
      value: Option[];
    }
);
export default function FormSelectInput({
  label,
  required,
  errors,
  options,
  defaultValue,
  value,
  onChange,
  placeholder,
  isMulti,
  components,
  onModal,
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
          onModal={onModal}
          isMulti={isMulti}
          classNames={{
            container: () =>
              cn("text-sm border-neutral-300", {
                "border-danger-500": errors && errors.error,
              }),
          }}
          options={options?.map((opt) => opt)}
          defaultValue={defaultValue}
          value={value ?? defaultValue}
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
