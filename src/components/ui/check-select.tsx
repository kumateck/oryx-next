import React, { forwardRef } from "react";
import ReactSelect, { GroupBase, OptionProps, components } from "react-select";

import { cn } from "@/lib";

import { Checkbox } from "./checkbox";
import { Label } from "./label";

const Option = <
  Option_16,
  IsMulti_16 extends boolean,
  Group_16 extends GroupBase<Option_16>,
>(
  props: OptionProps<Option_16, IsMulti_16, Group_16>,
) => {
  return (
    <div>
      <components.Option {...props} className="items-center">
        <Checkbox checked={props.isSelected} onChange={() => null} />{" "}
        <Label>{props.label}</Label>
      </components.Option>
    </div>
  );
};

export const CheckMultiSelect = forwardRef<
  React.ElementRef<typeof ReactSelect>,
  React.ComponentPropsWithoutRef<typeof ReactSelect>
>((props, ref) => {
  return (
    <ReactSelect
      isMulti
      components={{
        Option,
      }}
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      className={cn(
        "focus:border-primary focus:ring-primary border-primary-300 focus-within:ring-secondary-500 focus:ring-secondary-500 appearance-none rounded-md border bg-white outline-none focus-within:ring-4 focus:outline-none focus:ring-1",
        props.className,
      )}
      classNamePrefix="react-select"
      ref={ref}
      styles={{
        control: (base, state) => ({
          ...base,
          borderColor: state.isFocused ? "transparent" : "",
          boxShadow: "none",
          outline: "none",
          border: state.isFocused ? "transparent" : "none",
          borderRadius: "1rem",
          "&:hover": {
            borderColor: state.isFocused ? "transparent" : "",
            border: "none",
            outline: "none",
            boxShadow: "none",
          },
        }),
        indicatorSeparator: (base) => ({
          ...base,
          backgroundColor: "transparent",
        }),
        input: (base) => ({
          ...base,
          height: "2rem",
          verticalAlign: "middle",
        }),
        multiValue: (base) => ({
          ...base,
          borderRadius: "24px",
          backgroundColor: "var(--dropdown-highlighter)",
          color: "var(--dropdown-text)",
          fontSize: "14px",
          padding: "2px, 10px, 2px, 10px",
        }),
        multiValueRemove: (base) => ({
          ...base,
          color: "var(--dropdown-text)",
          fontWeight: "300",
          ":hover": {
            backgroundColor: "none",
          },
        }),
        option: (base, state) => ({
          ...base,
          color: state.isSelected ? "var(--black)" : "var(--black)",
          backgroundColor: state.isSelected
            ? "var(--dropdown-highlighter)"
            : state.isFocused
              ? "var(--dropdown-highlighter)"
              : "",
          "&:active": {
            backgroundColor: state.isSelected
              ? "var(--dropdown-highlighter)"
              : state.isFocused
                ? "var(--dropdown-highlighter)"
                : "",
          },
        }),
      }}
      {...props}
    />
  );
});

CheckMultiSelect.displayName = "Select";
