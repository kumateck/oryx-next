import { forwardRef } from "react";

import { InputTypes } from "@/lib";
import { cn } from "@/lib/utils";

import { Icon, type LucideIconProps } from "./icon";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onSuffixClick?: () => void;
  onPrefixClick?: () => void;
  suffixClass?: string;
  prefixClass?: string;
  prefixText?: string;
  prefix?: LucideIconProps;
  suffix?: LucideIconProps;
  overflowCount?: number;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      suffix,
      onSuffixClick,
      suffixClass,
      prefix,
      onPrefixClick,
      prefixClass,
      prefixText,
      overflowCount,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex cursor-pointer items-center pl-2">
          {prefixText && (
            <div className="h-6 w-6">
              <span className="text-xs">{prefixText}</span>
            </div>
          )}
          {prefix && (
            <Icon
              name={prefix}
              onClick={onPrefixClick}
              className={cn("h-5 w-5 text-neutral-default", prefixClass)}
            />
          )}
        </div>
        <input
          className={cn(
            "flex h-8 w-full rounded-md border border-neutral-input bg-white px-3 py-2 text-sm text-black ring-offset-neutral-secondary transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-secondary focus-within:border-b-2 focus-within:border-b-primary-default focus-visible:outline-none focus-visible:ring-neutral-secondary disabled:cursor-not-allowed disabled:opacity-50",
            {
              "cursor-not-allowed bg-neutral-hover text-neutral-tertiary":
                props.readOnly,
              "pl-8": prefix,
              "pl-10": prefixText,
              "pr-8": suffix,
            },
            className,
          )}
          ref={ref}
          step={props.type === InputTypes.NUMBER ? "0.001" : undefined}
          onWheel={(e: {
            currentTarget: { blur: () => void };
            stopPropagation: () => void;
          }) => {
            //prevent value from changing on scroll
            e.currentTarget.blur();
            e.stopPropagation();
          }}
          {...props}
        />
        <div
          className={cn(
            "absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3",
            {
              "pr-0.5": overflowCount,
            },
          )}
        >
          {suffix && (
            <Icon
              name={suffix}
              onClick={onSuffixClick}
              className={cn("h-5 w-5 text-neutral-default", suffixClass)}
            />
          )}
          {overflowCount && (
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-dark p-1 text-white shadow-sm">
              <span className="text-xs font-normal">+{overflowCount}</span>
            </div>
          )}
        </div>
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
