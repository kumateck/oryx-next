import React from "react";
import {
  Control,
  FieldArrayWithId,
  FieldErrors,
  FieldValues,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  // Path,
  UseFormRegister,
} from "react-hook-form";

import { FormInput, FormWizard } from "@/components/form-inputs";
import { InputTypes, Option } from "@/lib";

import { ProcedureType } from "./types";
import { Button, Icon } from "@/components/ui";
import ScrollableWrapper from "@/shared/scroll-wrapper";
import PageTitle from "@/shared/title";
import DropdownBtns from "@/shared/btns/drop-btn";
interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  roleOptions: Option[];
  userOptions: Option[];
  operationActionOptions: Option[];
  ardOptions: Option[];
  defaultValues?: TFieldValues;
  selectedType?: ProcedureType;
  fields: FieldArrayWithId<TFieldValues>[];
  remove: UseFieldArrayRemove;
  append: UseFieldArrayAppend<TFieldValues>;
  typeValues: string[];
}

const defaultStage = {
  type: ProcedureType.User,
  productAnalyticalRawDataId: { label: "", value: "" },
  action: { label: "", value: "" },
  userId: { label: "", value: "" },
  roleId: { label: "", value: "" },
};
const SecondForm = <TFieldValues extends FieldValues, TContext>({
  control,
  errors,
  roleOptions,
  userOptions,
  operationActionOptions,
  append,
  fields,
  remove,
  typeValues,
  ardOptions,
}: Props<TFieldValues, TContext>) => {
  return (
    <div>
      <div className="flex justify-between px-2 py-5">
        <PageTitle title="Personnel Details" />

        <DropdownBtns
          title="Add Type"
          icon="Plus"
          menus={[
            {
              name: "User",
              onClick: () => {
                const stage = { ...defaultStage, type: ProcedureType.User };
                append(stage as any);
              },
            },
            {
              name: "Role",
              onClick: () => {
                const stage = { ...defaultStage, type: ProcedureType.Role };
                append(stage as any);
              },
            },
          ]}
        />
      </div>
      <ScrollableWrapper>
        {fields?.map((field, index) => {
          const type = typeValues[index];
          const roleForm = {
            label: "Role",
            control,
            type: InputTypes.SELECT,
            name: `personnels.${index}.roleId`,
            required: true,
            onModal: true,
            placeholder: "Role",
            options: roleOptions,
            errors,
          };
          const userForm = {
            label: "User",
            control,
            type: InputTypes.SELECT,
            name: `personnels.${index}.userId`,
            required: true,
            placeholder: "User",
            onModal: true,
            options: userOptions,
            errors,
          };
          const typeSelect = type === ProcedureType.Role ? roleForm : userForm;

          return (
            <div
              className="w-full justify-between space-y-10 flex gap-0.5 items-center"
              key={field.id}
            >
              <div className="w-full ">
                <FormWizard
                  className="grid grid-cols-3 gap-x-5 space-y-0 w-full"
                  fieldWrapperClassName="flex-grow "
                  config={[
                    typeSelect as FormInput<FieldValues, TContext>,
                    {
                      label: "Action",
                      control: control as Control,
                      type: InputTypes.SELECT,
                      name: `personnels.${index}.action`,
                      required: true,
                      onModal: true,
                      placeholder: "Action",
                      options: operationActionOptions,
                      errors,
                    },
                    {
                      label: "ARD",
                      control: control as Control,
                      type: InputTypes.SELECT,
                      name: `personnels.${index}.productAnalyticalRawDataId`,
                      required: true,
                      onModal: true,
                      placeholder: "Analytical Raw Data",
                      options: ardOptions,
                      errors,
                    },
                  ]}
                />
              </div>
              <div className="">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => remove(index)}
                  className="rounded-full size-8"
                >
                  <Icon name="Trash2" className="text-danger-default " />
                </Button>
              </div>
            </div>
          );
        })}
      </ScrollableWrapper>
    </div>
  );
};

export default SecondForm;
