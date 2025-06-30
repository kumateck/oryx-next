import { FormFieldDto } from "@/lib/redux/api/openapi.generated";
import React from "react";
import FormResponseSwitch from "./switch";
import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  field: FormFieldDto;
}
const FormResponse = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  field,
}: Props<TFieldValues, TContext>) => {
  return (
    <FormResponseSwitch
      control={control}
      field={field}
      register={register}
      errors={errors}
    />
  );
};

export default FormResponse;
