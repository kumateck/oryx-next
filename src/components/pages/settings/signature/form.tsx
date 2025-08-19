import React from "react";
import { SignatureTab } from "./types";
import { FormWizard } from "@/components/form-inputs";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { InputTypes } from "@/lib";
interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  type: SignatureTab;
}
const SignatureForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  type,
}: Props<TFieldValues, TContext>) => {
  return (
    <>
      {type === "SIGNATURE" && (
        <FormWizard
          config={[
            {
              control: control as Control,
              type: InputTypes.SIGNATURE,
              name: "signature",
              errors: errors,
              label: "",
            },
          ]}
        />
      )}
      {type === "ATTATCHMENT" && (
        <FormWizard
          config={[
            {
              type: InputTypes.DRAGNDROP,
              label: "Attach Documents",
              name: `attatchment`,
              defaultValue: null,
              control: control as Control,
              errors,
            },
          ]}
        />
      )}
      {type === "TEXT" && (
        <FormWizard
          config={[
            {
              register: register("signature" as Path<TFieldValues>),
              label: "title",
              placeholder: "Enter style",
              type: InputTypes.TEXT,
              errors,
            },
          ]}
        />
      )}
    </>
  );
};

export default SignatureForm;
