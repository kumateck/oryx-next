import { FormWizard } from "@/components/form-inputs";
import { Card, CardContent, CardHeader } from "@/components/ui";
import { InputTypes } from "@/lib";
import React from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface Props<TFieldValues extends FieldValues> {
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
}
const InventoryForm = <TFieldValues extends FieldValues>({
  register,
  errors,
}: Props<TFieldValues>) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="font-semibold">Report Item</CardHeader>
        <CardContent>
          <div className="flex justify-start w-full gap-4">
            <FormWizard
              className=""
              config={[
                {
                  label: "Item Name",
                  type: InputTypes.TEXT,
                  placeholder: "Item Name",
                  register: register("materialName" as Path<TFieldValues>),
                  required: true,
                  errors,
                },
              ]}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryForm;
