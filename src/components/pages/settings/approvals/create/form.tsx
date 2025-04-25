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

import {
  ApprovalDocumentOptions,
  InputTypes,
  InterestType,
  Option,
} from "@/lib";

import ScrollablePageWrapper from "@/shared/page-wrapper";
import StepWrapper from "@/shared/wrapper";

import DropdownBtns from "@/shared/btns/drop-btn";
import { Button, Icon } from "@/components/ui";
import PageTitle from "@/shared/title";
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
  remove,
  control,
  roleOptions,
  userOptions,
  typeValues,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full">
      <div>
        <FormWizard
          className="grid w-full grid-cols-2 gap-x-4 space-y-0"
          // fieldWrapperClassName="flex-grow"
          config={[
            {
              label: "Approval Document",
              control: control as Control,
              type: InputTypes.SELECT,
              name: `itemType`,
              required: true,
              onModal: true,
              placeholder: "Document",
              options: ApprovalDocumentOptions,
              errors,
            },
            {
              control: control as Control,
              name: "escalationDuration",
              label: "Escalation Duration",
              placeholder: "Select Duration",
              type: InputTypes.TIME,
              showDays: true,
              required: true,
              errors,
            },
          ]}
        />
      </div>

      <div className="flex justify-between px-2 py-5">
        <PageTitle title="Approval Stages" />
        <DropdownBtns
          title="Add Level Type"
          icon="Plus"
          menus={[
            {
              name: "User",
              onClick: () => {
                const stage = { ...defaultStage, type: InterestType.User };
                append(stage as any);
              },
            },
            {
              name: "Role",
              onClick: () => {
                const stage = { ...defaultStage, type: InterestType.Role };
                append(stage as any);
              },
            },
          ]}
        />
      </div>
      <ScrollablePageWrapper className=" pb-60 grid grid-cols-2 gap-4">
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
          const typeSelect = type === InterestType.Role ? roleForm : userForm;

          return (
            <StepWrapper className="w-full space-y-5" key={field.id}>
              <div className="flex justify-between gap-2">
                <PageTitle title={`Level ${index + 1}`} />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => remove(index)}
                  className="rounded-full size-8"
                >
                  <Icon name="Trash2" className="text-danger-default " />
                </Button>
              </div>
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
