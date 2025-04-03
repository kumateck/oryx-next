import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
import { InputTypes, LifeStatus } from "@/lib";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
}

const FamilyInfo1Step = <TFieldValues extends FieldValues, TContext>({
  register,
  control,
  errors,
}: Props<TFieldValues, TContext>) => {
  const lifeStatusOptions = Object.values(LifeStatus).map((status) => ({
    label: status,
    value: status,
  }));

  return (
    <div className="overflow-auto">
      <h2 className="text-lg font-medium text-black">Father</h2>
      <FormWizard
        className="mt-3 grid w-full grid-cols-2 gap-x-10 gap-y-2 space-y-0"
        config={[
          {
            register: register("father.fullName" as Path<TFieldValues>),
            label: "Father's Full Name",
            placeholder: "Enter your father's full name",
            type: InputTypes.TEXT,
            required: true,
            errors,
          },
          {
            register: register("father.contactNumber" as Path<TFieldValues>),
            label: "Father's Contact Number",
            placeholder: "Enter your father's phone number",
            type: InputTypes.TEXT,
            required: true,
            errors,
          },
          {
            name: "father.lifeStatus",
            label: "Father's Life Status",
            placeholder: "Select your father's life status",
            type: InputTypes.SELECT,
            control: control as Control,
            required: true,
            options: lifeStatusOptions,
            errors,
          },
          {
            register: register("father.occupation" as Path<TFieldValues>),
            label: "Father's Occupation",
            placeholder: "Enter your father's occupation",
            type: InputTypes.TEXT,
            required: true,
            errors,
          },
        ]}
      />
      <h2 className="mt-10 text-lg font-medium text-black">Mother</h2>
      <FormWizard
        className="mt-3 grid w-full grid-cols-2 gap-x-10 gap-y-2 space-y-0"
        config={[
          {
            register: register("mother.fullName" as Path<TFieldValues>),
            label: "Mother's Full Name",
            type: InputTypes.TEXT,
            placeholder: "Enter your mother's full name",
            required: true,
            errors,
          },
          {
            register: register("mother.contactNumber" as Path<TFieldValues>),
            label: "Mother's Contact Number",
            placeholder: "Enter your mother's phone number",
            type: InputTypes.TEXT,
            required: true,
            errors,
          },
          {
            name: "mother.lifeStatus",
            label: "Mother's Life Status",
            placeholder: "Enter your mother's life status",
            type: InputTypes.SELECT,
            control: control as Control,
            options: lifeStatusOptions,
            errors,
          },
          {
            register: register("mother.occupation" as Path<TFieldValues>),
            label: "Mother's Occupation",
            placeholder: "Enter your mother's occupation",
            type: InputTypes.TEXT,
            required: true,
            errors,
          },
        ]}
      />
      <h2 className="mt-10 text-lg font-medium text-black">Spouse</h2>
      <FormWizard
        className="mt-3 grid w-full grid-cols-2 gap-x-10 gap-y-2 space-y-0"
        config={[
          {
            register: register("spouse.fullName" as Path<TFieldValues>),
            label: "Spouse's Full Name",
            placeholder: "Enter your spouse's full name",
            type: InputTypes.TEXT,
            errors,
          },
          {
            register: register("spouse.contactNumber" as Path<TFieldValues>),
            label: "Spouse's Contact Number",
            placeholder: "Enter your spouse's phone number",
            type: InputTypes.TEXT,
            errors,
          },
          {
            name: "spouse.lifeStatus",
            label: "Spouse's Life Status",
            placeholder: "Enter your spouse's life status",
            type: InputTypes.SELECT,
            control: control as Control,
            options: lifeStatusOptions,
            errors,
          },
          {
            register: register("spouse.occupation" as Path<TFieldValues>),
            label: "Spouse's Occupation",
            placeholder: "Enter your spouse's occupation",
            type: InputTypes.TEXT,
            errors,
          },
        ]}
      />
    </div>
  );
};

export default FamilyInfo1Step;
