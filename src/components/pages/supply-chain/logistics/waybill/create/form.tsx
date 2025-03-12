import React, { Dispatch, SetStateAction } from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
import { Card, CardContent, CardTitle } from "@/components/ui";
import { InputTypes, Option } from "@/lib";
import ScrollablePageWrapper from "@/shared/page-wrapper";

import TableForData from "./table";
import { MaterialRequestDto } from "./types";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  invoiceOptions: Option[];
  materialLists: MaterialRequestDto[];
  setMaterialLists: Dispatch<SetStateAction<MaterialRequestDto[]>>;
}
const WaybillForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  invoiceOptions,
  materialLists,
  setMaterialLists,
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
      <Card className="my-5 space-y-4 p-5">
        <CardTitle>Invoice Item</CardTitle>
        <CardContent>
          <TableForData
            lists={materialLists}
            // Remove setItemLists if not used for editing
            setItemLists={setMaterialLists}
          />
        </CardContent>
      </Card>

      <div>
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
    </ScrollablePageWrapper>
  );
};

export default WaybillForm;
