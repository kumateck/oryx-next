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
  register: UseFormRegister<TFieldValues>;
  control: Control<TFieldValues, TContext>;
  errors: FieldErrors<TFieldValues>;
}
export const Form = <TFieldValues extends FieldValues, TContext>({
  register,
  control,
  errors,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full gap-3 flex items-center justify-center">
      <FormWizard
        config={[
          {
            control: control as Control,
            label: "Date",
            name: "date",
            type: InputTypes.DATE,
            errors: errors,
          },
          {
            control: control as Control,
            label: "Time",
            name: "time",
            type: InputTypes.TIME,
            errors: errors,
          },
          {
            register: register("waybillNumber" as Path<TFieldValues>),
            label: "Waybill Number",
            type: InputTypes.TEXT,
            errors: errors,
          },
          {
            register: register("driversName" as Path<TFieldValues>),
            label: "Driver's Name",
            type: InputTypes.TEXT,
            errors: errors,
          },
        ]}
      />
      <FormWizard
        config={[
          {
            register: register("customerName" as Path<TFieldValues>),
            label: "Customer Name",
            type: InputTypes.TEXT,
            errors: errors,
          },
          {
            register: register("customerAddress" as Path<TFieldValues>),
            label: "Customer Address",
            type: InputTypes.TEXT,
            errors: errors,
          },
          {
            register: register("vehicleNumber" as Path<TFieldValues>),
            label: "Vehicle Number",
            type: InputTypes.TEXT,
            errors: errors,
          },
          {
            register: register("dispatchedBy" as Path<TFieldValues>),
            label: "Dispatched By",
            type: InputTypes.TEXT,
            errors: errors,
          },
        ]}
      />
    </div>
  );
};

export default Form;
