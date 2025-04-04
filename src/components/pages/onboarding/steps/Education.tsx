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

import { EducationItem } from "../types";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  fields: FieldArrayWithId<TFieldValues>[];
  remove: UseFieldArrayRemove;
  append: UseFieldArrayAppend<TFieldValues>;
}

const defaultEducationItem: EducationItem = {
  schoolName: "",
  startDate: new Date(),
  endDate: new Date(),
  major: "",
  qualification: "",
};

const EducationStep = <TFieldValues extends FieldValues, TContext>({
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
          <h3 className="text-lg font-medium">Education History</h3>
          <Button
            type="button"
            onClick={() => append(defaultEducationItem as any)}
            variant="ghost"
          >
            <Icon name="Plus" />
            <span>Add Education</span>
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
                      `education.${index}.schoolName` as Path<TFieldValues>,
                    ),
                    label: "School Name",
                    type: InputTypes.TEXT,
                    placeholder: "Enter your school name",
                    required: true,
                    errors,
                  },
                  {
                    name: `education.${index}.startDate`,
                    label: "Start Date",
                    type: InputTypes.DATE,
                    placeholder: "Select your start date",
                    control: control as Control,
                    required: true,
                    errors,
                  },
                  {
                    name: `education.${index}.endDate`,
                    label: "End Date",
                    type: InputTypes.DATE,
                    placeholder: "Select your end date",
                    control: control as Control,
                    required: true,
                    errors,
                  },
                  {
                    register: register(
                      `education.${index}.major` as Path<TFieldValues>,
                    ),
                    label: "Major",
                    type: InputTypes.TEXT,
                    placeholder: "Enter your major",
                    required: true,
                    errors,
                  },
                  {
                    register: register(
                      `education.${index}.qualification` as Path<TFieldValues>,
                    ),
                    label: "Qualification Attained",
                    type: InputTypes.TEXT,
                    placeholder: "Enter your attained qualification",
                    required: true,
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

export default EducationStep;
