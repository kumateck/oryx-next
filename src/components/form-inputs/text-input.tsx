"use client";

import React, { useState } from "react";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";
import { FieldValues } from "react-hook-form";

import { InputTypes, cn } from "@/lib";

import { Input, Label, LucideIconProps } from "../ui";
import { FormError } from "./error";

interface Props<TFieldValues extends FieldValues> {
  labelExtra?: string;
  label?: string;
  required?: boolean;
  errors: FieldErrors<TFieldValues>;
  autoFocus?: boolean;
  readOnly?: boolean;
  type?: string;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  description?: React.ReactNode;
  suffix?: LucideIconProps;
  suffixClass?: string;
  onSuffixClick?: () => void;
  prefix?: LucideIconProps;
  prefixClass?: string;
  onPrefixClick?: () => void;
  className?: string;
}

export const FormTextInput = <TFieldValues extends FieldValues>({
  errors,
  labelExtra,
  required,
  label,
  register,
  ...rest
}: Props<TFieldValues>) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const isPassword = rest.type === InputTypes.PASSWORD;
  const isPasswordType = showPassword ? InputTypes.TEXT : InputTypes.PASSWORD;
  const passwordIcon = showPassword ? "Eye" : "EyeOff";

  const handleIsPasswordToggle = () => {
    if (!isPassword) return;
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <Label className={cn("flex items-center gap-1")}>
          <span>{label}</span>
          {required && <span className="text-red-500"> * </span>}
        </Label>
      )}
      <Input
        className={cn(rest.className, {
          "border-red-500": errors?.error,
        })}
        {...register}
        {...rest}
        type={showPassword ? isPasswordType : rest.type}
        suffix={isPassword ? passwordIcon : rest.suffix}
        onSuffixClick={() =>
          isPassword ? handleIsPasswordToggle() : rest?.onSuffixClick?.()
        }
      />
      <div className="w-full">
        {labelExtra && (
          <p className={cn("text-[0.8rem] text-neutral-secondary")}>
            {labelExtra}
          </p>
        )}
        <FormError
          errors={errors}
          fieldName={register?.name as keyof TFieldValues}
        />
      </div>
    </div>
  );
};
