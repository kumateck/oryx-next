import { InputTypes } from "@/lib";
import {
  Control,
  FieldArrayWithId,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { CreateInvoiceSchema } from "./type";
import { FormWizard } from "@/components/form-inputs";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  fields: FieldArrayWithId<CreateInvoiceSchema, "products">[];
  errors: FieldErrors<TFieldValues>;
}
export const ProFormalInvoiceForm = <
  TFieldValues extends FieldValues,
  TContext,
>({
  register,
  // productionsOrderOpt,
  errors,
  fields,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="space-y-4">
      <FormWizard
        config={[
          {
            register: register(`productionOrderName` as Path<TFieldValues>),
            label: "Production Order Title",
            placeholder: "Enter Production Order Name",
            readOnly: true,
            type: InputTypes.TEXT,
            errors,
          },
        ]}
      />
      <div>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-center gap-2 mb-2 justify-center"
          >
            <FormWizard
              config={[
                {
                  register: register(
                    `products.${index}.productName` as Path<TFieldValues>,
                  ),
                  label: "Product",
                  placeholder: "Select Product",
                  readOnly: true,
                  type: InputTypes.TEXT,
                  errors,
                },
              ]}
            />
            <FormWizard
              config={[
                {
                  register: register(
                    `products.${index}.quantity` as Path<TFieldValues>,
                    { valueAsNumber: true },
                  ),
                  readOnly: true,
                  label: "Quantity",
                  type: InputTypes.NUMBER,
                  errors,
                },
              ]}
            />
            <FormWizard
              config={[
                {
                  register: register(
                    `products.${index}.price` as Path<TFieldValues>,
                    {
                      valueAsNumber: true,
                    },
                  ),
                  readOnly: true,
                  label: "Price",
                  type: InputTypes.NUMBER,
                  errors,
                },
              ]}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProFormalInvoiceForm;
