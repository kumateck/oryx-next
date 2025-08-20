import { FormWizard } from "@/components/form-inputs";
import { InputTypes } from "@/lib";
import {
  Control,
  Path,
  FieldErrors,
  FieldValues,
  UseFormRegister,
  FieldArrayWithId,
} from "react-hook-form";
import { CreateMemoSchema } from "./types";

interface Props<TFieldValues extends FieldValues, TContext> {
  register: UseFormRegister<TFieldValues>;
  control: Control<TFieldValues, TContext>;
  errors: FieldErrors<TFieldValues>;
  fields: FieldArrayWithId<CreateMemoSchema["body"]>[];
}

export const MemoArdForm = <TFieldValues extends FieldValues, TContext>({
  register,
  errors,
  control,
  fields,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full space-y-4">
      {fields.map((field, index) => (
        <div key={field.id} className="space-y-4">
          <FormWizard
            config={[
              {
                label: "Total Value",
                register: register(
                  `body.${index}.totalValue` as Path<TFieldValues>,
                ),
                type: InputTypes.TEXT,
                required: true,
                readOnly: true,
                errors,
              },
            ]}
          />
          <FormWizard
            config={[
              {
                label: "Terms of Payment",
                register: register(
                  `body.${index}.termsOfPayment` as Path<TFieldValues>,
                ),
                type: InputTypes.TEXTAREA,
                required: false,
                readOnly: true,
                errors,
              },
            ]}
          />
          <FormWizard
            config={[
              {
                label: "Estimated Delivery Date",
                register: register(`body.${index}.date` as Path<TFieldValues>),
                type: InputTypes.TEXTAREA,
                required: false,
                readOnly: true,
                errors,
              },
            ]}
          />
        </div>
      ))}
      <FormWizard
        config={[
          {
            label: "Attachments",
            control: control as Control,
            name: "attachments",
            type: InputTypes.DRAGNDROP,
            defaultValue: null,
            required: false,
            errors,
          },
        ]}
      />
    </div>
  );
};
