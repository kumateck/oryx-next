import { FormWizard } from "@/components/form-inputs";
import { FetchOptionsResult } from "@/components/ui";
import { InputTypes } from "@/lib";
import {
  Control,
  Path,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

interface Props<TFieldValues extends FieldValues, TContext> {
  register: UseFormRegister<TFieldValues>;
  control: Control<TFieldValues, TContext>;
  errors: FieldErrors<TFieldValues>;
  isLoadingStp: boolean;
  isLoadingForm: boolean;
  isLoadingSpec?: boolean;
  fetchStp: (search: string, page: number) => Promise<FetchOptionsResult>;
  fetchForm: (search: string, page: number) => Promise<FetchOptionsResult>;
}

export const MaterialArdForm = <TFieldValues extends FieldValues, TContext>({
  register,
  errors,
  control,
  isLoadingStp,
  isLoadingForm,
  isLoadingSpec,
  fetchForm,
  fetchStp,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full space-y-6">
      <FormWizard
        className="py-3"
        config={[
          {
            label: "Stp Number",
            control: control as Control,
            type: InputTypes.ASYNC_SELECT,
            name: "stpId",
            required: true,
            placeholder: "Select stp number",
            fetchOptions: fetchStp,
            isLoading: isLoadingStp,
            errors,
          },
        ]}
      />
      <FormWizard
        config={[
          {
            label: "Spec Number",
            register: register("specNumber" as Path<TFieldValues>),
            type: InputTypes.TEXT,
            readOnly: true,
            className: "disabled",
            required: true,
            placeholder: isLoadingSpec
              ? "Loading..."
              : "Select Stp to view Spec Number",
            errors,
          },
        ]}
      />
      <FormWizard
        config={[
          {
            label: "Description",
            register: register("description" as Path<TFieldValues>),
            type: InputTypes.TEXTAREA,
            required: false,
            placeholder: "Description",
            errors,
          },
        ]}
      />
      <FormWizard
        className="w-full space-y-5 my-5"
        config={[
          {
            label: "Template",
            control: control as Control,
            type: InputTypes.ASYNC_SELECT,
            name: "formId",
            required: true,
            placeholder: "Select Template",
            fetchOptions: fetchForm,
            isLoading: isLoadingForm,
            errors,
          },
        ]}
      />
      <FormWizard
        config={[
          {
            type: InputTypes.DRAGNDROP,
            label: "Attach Documents",
            name: `attachments`,
            defaultValue: null,
            control: control as Control,
            errors,
          },
        ]}
      />
    </div>
  );
};
