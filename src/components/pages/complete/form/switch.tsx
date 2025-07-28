import { FormWizard } from "@/components/form-inputs";
import {
  ExpressionKind,
  InputTypes,
  Option,
  QuestionType,
  referenceOptions,
} from "@/lib";
import { FormFieldDto } from "@/lib/redux/api/openapi.generated";
import React from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  field: FormFieldDto;
}
const FormResponseSwitch = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  field,
}: Props<TFieldValues, TContext>) => {
  const type = Number(field.question?.type);
  const name = field?.id as Path<TFieldValues>;
  const label = field?.question?.label as string;
  const required = field.required;
  const options = field?.question?.options?.map((option) => ({
    label: option.name as string,
    value: option.name as string,
  })) as Option[];
  const option = field?.question?.options?.[0]?.name as string;
  switch (type) {
    case QuestionType.ShortAnswer:
      return (
        <FormWizard
          config={[
            {
              register: register(name),
              label,
              required,
              type: InputTypes.TEXT,
              errors,
            },
          ]}
        />
      );
    case QuestionType.LongAnswer:
    case QuestionType.Paragraph:
      return (
        <FormWizard
          config={[
            {
              label,
              control: control as Control,
              name,
              type: InputTypes.RICHTEXT,
              required,
              errors,
            },
          ]}
        />
      );
    case QuestionType.Datepicker:
      return (
        <FormWizard
          config={[
            {
              label,
              control: control as Control,
              type: InputTypes.DATE,
              name,
              required,
              errors,
            },
          ]}
        />
      );
    case QuestionType.SingleChoice:
      return (
        <FormWizard
          config={[
            {
              label,
              control: control as Control,
              type: InputTypes.RADIO,
              name,
              required,
              options,
              errors,
            },
          ]}
        />
      );
    case QuestionType.Dropdown:
      return (
        <FormWizard
          config={[
            {
              label,
              control: control as Control,
              type: InputTypes.SELECT,
              name,
              required,
              options,
              errors,
            },
          ]}
        />
      );
    case QuestionType.Checkbox:
      return (
        <FormWizard
          config={[
            {
              label,
              control: control as Control,
              type: InputTypes.CHECKBOX,
              name,
              required,
              options,
              errors,
            },
          ]}
        />
      );
    case QuestionType.FileUpload:
      return (
        <FormWizard
          config={[
            {
              type: InputTypes.DRAGNDROP,
              label,
              name,
              defaultValue: null,
              control: control as Control,
              errors,
            },
          ]}
        />
      );
    case QuestionType.Signature:
      return (
        <FormWizard
          config={[
            {
              label,
              control: control as Control,
              name,
              type: InputTypes.SIGNATURE,
              required,
              errors,
            },
          ]}
        />
      );
    case QuestionType.Formular:
      return (
        <FormWizard
          config={[
            {
              label,
              control: control as Control,
              name,
              type: InputTypes.FORMULAR,
              kind: ExpressionKind.Evaluation,
              required,
              errors,
              option,
            },
          ]}
        />
      );

    case QuestionType.Specification:
      return (
        <FormWizard
          config={[
            {
              label,
              control: control as Control,
              name,
              type: InputTypes.SELECT,
              options: referenceOptions,
              required,
              errors,
            },
          ]}
        />
      );
    default:
      return (
        <div>
          Unsupported question {field.question?.label} : {field.question?.type}
        </div>
      );
  }
};

export default FormResponseSwitch;
