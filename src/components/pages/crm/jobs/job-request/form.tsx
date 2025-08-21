import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
import { InputTypes } from "@/lib";
import { FetchOptionsResult } from "@/components/ui";

interface Props<TFieldValues extends FieldValues, TContext> {
  register: UseFormRegister<TFieldValues>;
  control: Control<TFieldValues, TContext>;
  errors: FieldErrors<TFieldValues>;
  fetchDepartments: (
    search: string,
    page: number,
  ) => Promise<FetchOptionsResult>;
  isLoadingEquipment: boolean;
  isLoadingDepartments: boolean;
  fetchEquipment: (search: string, page: number) => Promise<FetchOptionsResult>;
}
const JobeRequestForm = <TFieldValues extends FieldValues, TContext>({
  register,
  errors,
  control,
  fetchDepartments,
  isLoadingDepartments,
  fetchEquipment,
  isLoadingEquipment,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full space-y-3">
      <div className="flex items-center  gap-2 w-full">
        <FormWizard
          fieldWrapperClassName="flex-grow"
          config={[
            {
              control: control as Control,
              label: "Department",
              name: "departmentId",
              fetchOptions: fetchDepartments,
              isLoading: isLoadingDepartments,
              type: InputTypes.ASYNC_SELECT,
              required: true,
              errors,
            },
          ]}
        />
        <FormWizard
          fieldWrapperClassName="flex-grow"
          config={[
            {
              control: control as Control,
              label: "Equipment",
              name: "equipmentId",
              fetchOptions: fetchEquipment,
              isLoading: isLoadingEquipment,
              type: InputTypes.ASYNC_SELECT,
              required: true,
              errors,
            },
          ]}
        />
      </div>
      <div className="flex items-center gap-2 w-full">
        <FormWizard
          fieldWrapperClassName="flex-grow"
          config={[
            {
              control: control as Control,
              label: "Issued Date",
              name: "dateOfIssue",
              placeholder: "Select issued date",
              type: InputTypes.DATE,
              required: true,
              errors,
            },
          ]}
        />
        <FormWizard
          fieldWrapperClassName="flex-grow"
          config={[
            {
              control: control as Control,
              label: "Preferred Completion Date",
              placeholder: "Select preferred completion date",
              name: "preferredCompletionDate",
              type: InputTypes.DATE,
              required: true,
              errors,
            },
          ]}
        />
      </div>
      <FormWizard
        fieldWrapperClassName="flex-grow"
        config={[
          {
            register: register("location" as Path<TFieldValues>),
            label: "Location",
            placeholder: "Enter location",
            type: InputTypes.TEXT,
            required: true,
            errors,
          },
        ]}
      />
      <FormWizard
        fieldWrapperClassName="flex-grow"
        config={[
          {
            control: control as Control,
            label: "Description of Work",
            name: "descriptionOfWork",
            placeholder: "Enter description of work",
            type: InputTypes.RICHTEXT,
            required: true,
            errors,
          },
        ]}
      />
    </div>
  );
};

export default JobeRequestForm;
