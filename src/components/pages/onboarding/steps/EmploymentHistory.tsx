import {
  Control,
  FieldArrayWithId,
  FieldErrors,
  FieldValues,
  Path,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
import { Button, Card, CardContent, Icon } from "@/components/ui";
import { InputTypes } from "@/lib";

import { EmploymentItem } from "../types";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  fields: FieldArrayWithId<TFieldValues>[];
  remove: UseFieldArrayRemove;
  append: UseFieldArrayAppend<TFieldValues>;
}

const defaultEmploymentItem: EmploymentItem = {
  companyName: "",
  position: "",
  startDate: new Date(),
  endDate: new Date(),
};

const EmploymentHistoryStep = <TFieldValues extends FieldValues, TContext>({
  register,
  control,
  errors,
  fields,
  append,
  remove,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="h-full space-y-6">
      <div className="mt-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Employment Details</h3>
          <Button
            type="button"
            onClick={() => append(defaultEmploymentItem as any)}
            variant="ghost"
          >
            <Icon name="Plus" />
            <span>Add Employment</span>
          </Button>
        </div>
        {fields.map((field, index) => (
          <Card key={field.id} className="relative my-4 p-4">
            <div className="absolute right-2 top-2">
              <Icon
                name="CircleMinus"
                onClick={() => remove(index)}
                className="h-5 w-5 cursor-pointer text-red-500"
              />
            </div>
            <CardContent className="p-0">
              <FormWizard
                className="grid w-full grid-cols-2 gap-x-10 gap-y-5 space-y-0"
                config={[
                  {
                    register: register(
                      `employment.${index}.companyName` as Path<TFieldValues>,
                    ),
                    label: "Company Name",
                    type: InputTypes.TEXT,
                    placeholder: "Enter the company name",
                    required: true,
                    errors,
                  },
                  {
                    register: register(
                      `employment.${index}.position` as Path<TFieldValues>,
                    ),
                    label: "Position",
                    type: InputTypes.TEXT,
                    placeholder: "Enter the your position at the company",
                    required: true,
                    errors,
                  },
                  {
                    name: `employment.${index}.startDate`,
                    label: "Start Date",
                    type: InputTypes.DATE,
                    placeholder: "Select your start date",
                    control: control as Control,
                    required: true,
                    disabled: { after: new Date() },
                    errors,
                  },
                  {
                    name: `employment.${index}.endDate`,
                    label: "End Date",
                    type: InputTypes.DATE,
                    placeholder: "Select your end date",
                    control: control as Control,
                    required: true,
                    disabled: { after: new Date() },
                    errors,
                  },
                ]}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EmploymentHistoryStep;
