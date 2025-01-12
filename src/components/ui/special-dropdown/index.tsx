"use client";

import { useEffect, useState } from "react";

import { Option } from "@/lib/constants";
import { cn } from "@/lib/utils";

import { Checkbox } from "../checkbox";
import { Label } from "../label";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import FormInput from "./form-input";

export interface BaseProps {
  classNames?: string;
  placeholder?: string;
}

interface SpecialDropdownProps extends BaseProps {
  options: Option[];
  defaultValue: Option[];
  onChange?: (option: Option[]) => void;
  onModal?: boolean;
}
export const SpecialDropdown = ({
  options,
  defaultValue,
  classNames,
  onChange,
  placeholder,
}: SpecialDropdownProps) => {
  const [selectedOptions, setSelectedOptions] = useState(defaultValue);
  const handleCheckboxChange = (item: { label: string; value: string }) => {
    setSelectedOptions((prevSelected) =>
      prevSelected?.some((opt) => opt.value === item.value)
        ? prevSelected?.filter((opt) => opt.value !== item.value)
        : [...prevSelected, item],
    );
  };

  useEffect(() => {
    onChange?.(selectedOptions);
  }, [selectedOptions, onChange]);

  return (
    <div className="">
      <Popover>
        <PopoverTrigger className="w-full p-0 py-0">
          <FormInput
            placeholder={placeholder}
            classNames={classNames}
            selectedOptions={selectedOptions}
            onValueChange={handleCheckboxChange}
          />
        </PopoverTrigger>
        <PopoverContent align="start" className="w-80 overflow-hidden p-0">
          <ul className="brand-scrollbar h-full max-h-56 overflow-auto py-2">
            {options?.map((item, index) => (
              <li
                onClick={() => handleCheckboxChange(item)}
                key={index}
                className={cn(
                  "group flex cursor-pointer items-center gap-2 bg-white px-4 py-2 hover:cursor-pointer hover:bg-neutral-300",
                  {
                    "bg-neutral-200": selectedOptions.some(
                      (opt) => opt.value === item.value,
                    ),
                  },
                )}
              >
                <Checkbox
                  className="h-4 w-4"
                  // checkClassName="h-3 w-3"
                  onClick={(e) => e.stopPropagation()}
                  value={item.value}
                  checked={selectedOptions.some(
                    (opt) => opt.value === item.value,
                  )}
                  onCheckedChange={() => {
                    handleCheckboxChange(item);
                  }}
                />{" "}
                <Label className="text-sm">{item.label}</Label>
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
};
