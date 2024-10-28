import { icons } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

import { Icon } from "./icon";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onSuffixClick?: () => void;
  onPrefixClick?: () => void;
  suffixClass?: string;
  prefixClass?: string;
  prefix?: keyof typeof icons;
  suffix?: keyof typeof icons;
  // error?: {

  // }
  // placeholder?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      suffix,
      onSuffixClick,
      suffixClass,
      prefix,
      onPrefixClick,
      prefixClass,
      type,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex cursor-pointer items-center pl-2">
          {prefix && (
            <Icon
              name={prefix}
              onClick={onPrefixClick}
              className={cn("text-text h-6 w-6", prefixClass)}
            />
          )}
        </div>
        <input
          type={type}
          className={cn(
            "text-text focus-within:border-b-compound-brand border-input shadow-shadow2a placeholder:text-muted-foreground flex h-9 w-full rounded-md border bg-white px-2 py-1 font-krub text-sm ring-offset-zinc-900 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-within:border-b focus-visible:outline-none focus-visible:ring-zinc-900 disabled:cursor-not-allowed disabled:opacity-50",
            prefix && "pl-8",
            suffix && "pr-8",
            className,
          )}
          ref={ref}
          {...props}
        />

        <div className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-2">
          {suffix && (
            <Icon
              name={suffix}
              onClick={onSuffixClick}
              className={cn("text-text h-6 w-6", suffixClass)}
              strokeWidth={1}
            />
          )}
        </div>
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
