import React from "react";
import {
  Control,
  FieldArrayWithId,
  FieldErrors,
  FieldValues,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";

import { FormInput, FormWizard } from "@/components/form-inputs";

import { InputTypes, Option } from "@/lib";

import ScrollablePageWrapper from "@/shared/page-wrapper";
import StepWrapper from "@/shared/wrapper";

import DropdownBtns from "@/shared/btns/drop-btn";
interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;

  fields: FieldArrayWithId<TFieldValues>[];
  remove: UseFieldArrayRemove;
  append: UseFieldArrayAppend<TFieldValues>;
  roleOptions: Option[];
  userOptions: Option[];
  typeValues: string[];
}

const defaultStage = {
  type: "User",
  required: false,
  userId: { label: "", value: "" },
  roleId: { label: "", value: "" },
};
const ApprovalForm = <TFieldValues extends FieldValues, TContext>({
  errors,
  fields,
  append,
  // remove,
  control,
  roleOptions,
  userOptions,
  typeValues,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full">
      <div>
        <FormWizard config={[]} />
      </div>

      <div className="flex justify-between px-2 py-5">
        <span>Approval Stages</span>
        <DropdownBtns
          title="Add Level Type"
          icon="Plus"
          menus={[
            {
              name: "User",
              onClick: () => append((defaultStage.type = "User" as any)),
            },
            {
              name: "Role",
              onClick: () => append((defaultStage.type = "Role" as any)),
            },
          ]}
        />
      </div>
      <ScrollablePageWrapper className="space-y-5 pb-60">
        {fields?.map((field, index) => {
          const type = typeValues[index];
          const roleForm = {
            label: "Role",
            control,
            type: InputTypes.SELECT,
            name: `approvalStages.${index}.roleId`,
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
            name: `approvalStages.${index}.userId`,
            required: true,
            placeholder: "User",
            onModal: true,
            options: userOptions,
            errors,
          };
          const typeSelect = type === "Role" ? roleForm : userForm;

          return (
            <StepWrapper className="w-full" key={field.id}>
              <FormWizard
                className="grid w-full grid-cols-2 gap-10 space-y-0"
                fieldWrapperClassName="flex-grow"
                config={[typeSelect as FormInput<FieldValues, TContext>]}
              />
            </StepWrapper>
          );
        })}
      </ScrollablePageWrapper>
    </div>
  );
};

export default ApprovalForm;
