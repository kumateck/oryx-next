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
  errors,
  invoiceOptions,
  materialLists,
  register,
  setMaterialLists,
}: Props<TFieldValues, TContext>) => {
  return (
    <ScrollablePageWrapper className="w-full">
      <FormWizard
        className="grid w-full grid-cols-2 gap-x-10 gap-y-5 space-y-0"
        fieldWrapperClassName="flex-grow"
        config={[
          {
            register: register("code" as Path<TFieldValues>),
            label: "Waybill Code",
            placeholder: "Code will be generated",
            type: InputTypes.TEXT,
            readOnly: true,
            required: true,
            description: (
              <span className="text-neutral-seondary text-sm">
                You can’t change the waybill code
              </span>
            ),
            errors,
          },
          {
            label: "Invoice Number",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "shipmentInvoiceId",
            required: true,
            placeholder: "Select Invoice",
            options: invoiceOptions,
            errors,
          },
        ]}
      />
      <Card className="my-5 space-y-4 p-5">
        <CardTitle className="px-5">Invoice Item</CardTitle>
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
