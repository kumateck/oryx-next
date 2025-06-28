import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

interface FormProps<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  defaultValues?: TFieldValues;
}
export const SampleForm = <
  TFieldValues extends FieldValues,
  TContext,
>({}: FormProps<TFieldValues, TContext>) => {
  return <div>SampleForm</div>;
};
