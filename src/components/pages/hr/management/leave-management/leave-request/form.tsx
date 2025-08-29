import React from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
import { InputTypes, Option } from "@/lib";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  leaveTypesOptions: Option[];
  employeeOptions: Option[];
  defaultValues?: TFieldValues;
  isExitPass: boolean;
  isOfficialDuty: boolean;
  isLeaveOrAbsence: boolean;
}

const LeaveRequestForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  leaveTypesOptions,
  employeeOptions,
  isOfficialDuty,
  defaultValues,
  isExitPass,
  // isLeaveOrAbsence,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full space-y-3">
      <FormWizard
        className="w-full space-y-5"
        config={[
          {
            readOnly: true,
            label: "Leave Category",
            register: register("leaveCategory" as Path<TFieldValues>),
            type: InputTypes.TEXT,
            required: true,
            // placeholder: "Enter official duty location",
            errors,
          },
        ]}
      />
      {/* {!isOfficialDuty && !isExitPass && ( */}
      <div className="w-full my-5">
        <FormWizard
          className="w-full space-y-5"
          config={[
            {
              label: "Leave Type",
              control: control as Control,
              type: InputTypes.SELECT,
              name: "leaveTypeId",
              required: true,
              defaultValue: defaultValues?.leaveTypesId,
              placeholder: "Select leave type",
              options: leaveTypesOptions,
              errors,
            },
          ]}
        />
      </div>
      {/* )} */}
      {/* {isExitPass && (
        <FormWizard
          config={[
            {
              label: "Date",
              control: control as Control,
              type: InputTypes.DATE,
              disabled: {
                before: new Date(),
              },
              name: "date",
              required: true,
              placeholder: "Select exit pass date",
              errors,
            },
          ]}
        />
      )} */}
      {!isExitPass && (
        <div className="w-full my-5 gap-4 grid grid-cols-2">
          <FormWizard
            config={[
              {
                label: "Start Date",
                control: control as Control,
                type: InputTypes.DATE,
                disabled: {
                  before: new Date(),
                },
                name: "startDate",
                required: true,
                placeholder: "Select start date",
                errors,
              },
            ]}
          />
          <FormWizard
            config={[
              {
                label: "End Date",
                control: control as Control,
                type: InputTypes.DATE,
                disabled: {
                  before: new Date(),
                },
                name: "endDate",
                required: true,
                placeholder: "Select end date",
                errors,
              },
            ]}
          />
        </div>
      )}
      <FormWizard
        className="w-full space-y-5"
        config={[
          {
            label: "Staff Name",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "employeeId",
            required: true,
            defaultValue: defaultValues?.employeeId,
            placeholder: "Select staff name",
            options: employeeOptions,
            errors,
          },
        ]}
      />
      {!isOfficialDuty && !isExitPass && (
        <div className="w-full flex items-center my-5 gap-4">
          <FormWizard
            config={[
              {
                register: register("contactPerson" as Path<TFieldValues>),
                label: "Contact Person",
                placeholder: "Enter contact person name",
                type: InputTypes.TEXT,
                required: true,
                errors,
              },
            ]}
          />
          <FormWizard
            config={[
              {
                register: register("contactPersonNumber" as Path<TFieldValues>),
                label: "Contact Person Number",
                placeholder: "Enter contact person number",
                type: InputTypes.TEXT,
                required: true,
                errors,
              },
            ]}
          />
        </div>
      )}
      {isOfficialDuty && (
        <FormWizard
          className="w-full my-5 gap-4"
          config={[
            {
              label: "Destination",
              register: register("destination" as Path<TFieldValues>),
              type: InputTypes.TEXT,
              required: true,
              placeholder: "Enter official duty location",
              errors,
            },
          ]}
        />
      )}
      <FormWizard
        className="w-full space-y-5 my-5"
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
      <FormWizard
        className="w-full"
        config={[
          {
            label: "Justification",
            control: control as Control,
            type: InputTypes.RICHTEXT,
            name: "justification",
            autoFocus: true,
            placeholder: "Enter justification for leave",
            suggestions: [],
            errors,
          },
        ]}
      />
    </div>
  );
};

export default LeaveRequestForm;
