import ReactSelect, { components as defaultComponents } from "react-select";

import { cn } from "@/lib/utils";

export type SelectComponents = typeof defaultComponents;

interface Props extends React.ComponentPropsWithoutRef<typeof ReactSelect> {
  components?: Partial<SelectComponents>;
}
export const SelectDropDown = (props: Props) => {
  return (
    <ReactSelect
      className={cn(
        "focus:border-primary focus:ring-primary appearance-none rounded-md border shadow-sm outline-none focus:outline-none focus:ring-0",
        props.className,
      )}
      classNamePrefix="react-select"
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
          height: "1.2rem",
          verticalAlign: "middle",
        }),
        option: (base, state) => ({
          ...base,
          color: state.isSelected ? "var(--black)" : "var(--black)",
          fontWeight: state.isSelected ? "600" : "500",
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
          borderRadius: "6px",
          fontSize: "14px",
        }),
        menu: (base) => ({
          ...base,
          width: "fit-content",
          right: 0,
          padding: `8px 12px`,
          border: "none",
        }),
        menuList: (base) => ({
          ...base,
          borderRadius: "8px",
        }),
      }}
      {...props}
      classNames={{
        ...props.classNames,
        menuList: () => "brand-scrollbar",
        option: (state) => {
          return cn(state.isSelected && "font-Medium", "px-4! py-2");
        },
      }}
      components={{
        ...defaultComponents,
        ...props.components,
      }}
    />
  );
};

SelectDropDown.displayName = "Select";
