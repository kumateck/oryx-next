import React from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { InputTypes, Option } from "@/lib";
import ScrollablePageWrapper from "@/shared/page-wrapper";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  invoiceOptions: Option[];
}
const WaybillForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  invoiceOptions,
}: Props<TFieldValues, TContext>) => {
  return (
    <ScrollablePageWrapper className="w-full">
      <FormWizard
        className="grid w-full grid-cols-2 gap-x-10 gap-y-5 space-y-0"
        fieldWrapperClassName="flex-grow"
        config={[
          {
            label: "Invoice Number",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "invoiceId",
            required: true,
            placeholder: "Select Invoice",
            options: invoiceOptions,
            errors,
          },
          {
            register: register("supplierName" as Path<TFieldValues>),
            label: "Supplier Name",
            placeholder: "Enter Supplier Name",
            type: InputTypes.TEXT,
            errors,
          },
        ]}
      />

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Attachments</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </ScrollablePageWrapper>
  );
};

export default WaybillForm;
