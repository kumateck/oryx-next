import { FormWizard } from "@/components/form-inputs";
import { InputTypes } from "@/lib";
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
}

const Form = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  // isLeaveOrAbsence,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full gap-2 flex flex-col mb-3">
      <FormWizard
        config={[
          {
            name: "product",
            readOnly: true,
            control: control as Control,
            label: "Product name",
            placeholder: "Kofin Suppressant",
            type: InputTypes.SELECT,
            options: [],
            errors,
          },
        ]}
      />
      <FormWizard
        config={[
          {
            control: control as Control,
            name: "department",
            label: "Transfere To",
            placeholder: "None-Beta Finished Goods Warehouse",
            type: InputTypes.SELECT,
            options: [],
            readOnly: true,
            errors,
          },
        ]}
      />
      <FormWizard
        config={[
          {
            register: register("batchNumber" as Path<TFieldValues>),
            label: "Batch Number",
            readOnly: true,
            placeholder: "L012H017",
            type: InputTypes.TEXT,
            errors,
          },
        ]}
      />
      <FormWizard
        config={[
          {
            register: register("manufacturedDate" as Path<TFieldValues>),
            readOnly: true,
            label: "Manufacturing Date",
            placeholder: "5th March, 2025",
            type: InputTypes.TEXT,
            errors,
          },
        ]}
      />
      <FormWizard
        config={[
          {
            register: register("expiryDate" as Path<TFieldValues>),
            readOnly: true,
            label: "Expiry Date",
            placeholder: "5th March, 2025",
            type: InputTypes.TEXT,
            errors,
          },
        ]}
      />
      <FormWizard
        config={[
          {
            register: register("quantityPerPack" as Path<TFieldValues>),
            label: "Quantity Per Pack",
            placeholder: "69",
            readOnly: true,
            type: InputTypes.TEXT,
            errors,
          },
        ]}
      />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
        <div className="flex flex-col w-full gap-2">
          <FormWizard
            config={[
              {
                register: register(
                  "totalTranfareQuantity" as Path<TFieldValues>,
                ),
                label: "Total Tansfare Quantity",
                placeholder: "81",
                type: InputTypes.NUMBER,
                readOnly: true,
                errors,
              },
            ]}
          />
          <FormWizard
            config={[
              {
                control: control as Control,
                readOnly: true,
                name: "unitMeasure",
                options: [],
                label: "Unit Of Measure",
                placeholder: "81",
                type: InputTypes.SELECT,
                errors,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Form;
