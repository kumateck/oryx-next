import { FormSectionDto } from "@/lib/redux/api/openapi.generated";
import React from "react";
import FormResponse from "../form";
import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

import StepWrapper from "@/shared/wrapper";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  section: FormSectionDto;
}

const FormSection = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  section,
}: Props<TFieldValues, TContext>) => {
  return (
    <StepWrapper>
      <div className=" border-b border-gray-100 pb-2">
        {section.name && (
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {section.name}
          </h2>
        )}
        {section.description && (
          <p className="text-gray-600 text-sm leading-relaxed">
            {section.description}
          </p>
        )}
      </div>
      <div className="space-y-4 py-5">
        {section.fields?.map((field, key) => (
          <FormResponse
            register={register}
            control={control}
            errors={errors}
            field={field}
            key={key}
          />
        ))}
      </div>
    </StepWrapper>
  );
};

export default FormSection;
