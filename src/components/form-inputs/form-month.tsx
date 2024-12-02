import { cn } from "@/lib/utils";

import { ErrorProps, FormError } from ".";
import { DateTimePicker } from "../ui";

interface Props {
  label: string;
  required?: boolean;
  errors?: ErrorProps;
  value?: string | undefined;
  onChange: (option: string | undefined) => void;
  maxDate?: Date | undefined;
}
const ClearDateTimePicker = ({ clear }: { clear(): void }) => (
  <div>
    <small className="cursor-pointer hover:underline" onClick={() => clear()}>
      Clear
    </small>
  </div>
);

export default function FormMonthInput({
  label,
  required,
  errors,
  value,
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

        <div>
          <DateTimePicker
            selected={value ? new Date(value) : undefined}
            onChange={(date: any) => {
              onChange(date?.toISOString());
            }}
            value={value && (new Date(value) as unknown as string)}
            showMonthYearPicker
            dateFormat="LLLL, yyy"
            className="text-base"
          />
          <ClearDateTimePicker clear={() => onChange("")} />
        </div>
        <FormError error={errors?.error} message={errors?.message} />
      </label>
    </div>
  );
}
