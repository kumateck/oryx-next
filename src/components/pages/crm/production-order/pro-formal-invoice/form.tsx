import { Option } from "@/lib";
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
  productionsOrderOpt: Option[];
}
export const ProFormalInvoiceForm = <
  TFieldValues extends FieldValues,
  TContext,
>(
  {
    // control,
    // register,
    // productionsOrderOpt,
    // errors,
  }: Props<TFieldValues, TContext>,
) => {
  return <div>form</div>;
};

export default ProFormalInvoiceForm;
