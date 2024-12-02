// import { icons } from "lucide-react";
import { useState } from "react";

import { cn, formatTime } from "@/lib/utils";

import { ErrorProps, FormError } from ".";
// import { ErrorProps, FormTextInput } from ".";
import {
  Checkbox,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
  Slider,
} from "../ui";

interface Props {
  label: string;
  required?: boolean;
  errors?: ErrorProps;
  value?: string | undefined;
  defaultValue?: string | undefined;
  onChange: (option: string | undefined) => void;
  placeholder?: string;
}

export default function FormMomentInput({
  label,
  errors,
  value,
  onChange,
  placeholder,
  defaultValue,
}: Props) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const handleHoursChange = (values: number[]) => {
    setHours(values[0]);
    onChange(formatTime(values[0], minutes));
  };

  const handleMinutesChange = (values: number[]) => {
    setMinutes(values[0]);
    onChange(formatTime(hours, values[0]));
  };
  const resetTimeSelection = () => {
    setMinutes(0);
    setHours(0);
    onChange(formatTime(0, 0));
  };

  return (
    <Popover>
      <PopoverTrigger className="w-full p-0 py-0">
        <MomentInput
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          label={label}
          errors={errors}
          placeholder={placeholder}
        />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="relative w-80 space-y-4 overflow-hidden"
      >
        <div className="absolute right-0 top-0">
          <div className="flex justify-end p-1 pb-3">
            <span
              className="text-sm font-bold text-danger-500 hover:cursor-pointer"
              onClick={resetTimeSelection}
            >
              Reset
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-secondary-500">
            <span className="text-3xl font-bold text-white">{hours}</span>
          </div>
          <div>
            <span className="text-3xl font-bold text-black">:</span>
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-secondary-500">
            <span className="text-3xl font-bold text-white">{minutes}</span>
          </div>
        </div>
        <div>
          <Label className="text-xl">Hours:</Label>
          <Slider
            max={23}
            step={1}
            value={[hours]}
            onValueChange={handleHoursChange}
          />
        </div>
        <div className="">
          <Label className="text-xl">Minutes:</Label>
          <Slider
            max={59}
            step={1}
            value={[minutes]}
            onValueChange={handleMinutesChange}
          />
        </div>
        <div className="w-full px-5">
          <div className="flex items-center justify-center gap-2">
            <Separator />
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-neutral-900">
              <span>OR</span>
            </div>
            <Separator />
          </div>
        </div>
        <div className="flex items-center gap-4 pb-5">
          <Label className="text-xl">Time Varies:</Label>
          <Checkbox
            onCheckedChange={(chk) => {
              onChange(chk ? "Varies" : formatTime(hours, minutes));
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

const MomentInput = ({
  label,
  required,
  errors,
  value,
  onChange,
  placeholder,
  defaultValue,
}: Props) => (
  <div>
    <div className="space-y-1 text-left capitalize">
      <div
        className={cn("text-sm font-medium", {
          "text-danger-500": errors?.error,
        })}
      >
        {label} {required && <span className="text-danger-400">*</span>}
      </div>

      <div>
        <Input
          defaultValue={defaultValue}
          readOnly={true}
          value={value}
          prefix={"Watch"}
          prefixClass={"text-neutral-600"}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={cn("", {
            "border-danger-500": errors?.error,
          })}
        />
      </div>
      <FormError error={errors?.error} message={errors?.message} />
    </div>
  </div>
);
