import { FormWizard } from "@/components/form-inputs";
import { InputTypes } from "@/lib";
import {
  Control,
  FieldArrayWithId,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { uniqueId } from "lodash";
import { daysOfWeek } from "./types";

interface FormProps<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  errors: FieldErrors<TFieldValues>;
  fields: FieldArrayWithId<TFieldValues>[];
}

const Form = <TFieldValues extends FieldValues, TContext>({
  fields,
  errors,
  control,
}: FormProps<TFieldValues, TContext>) => {
  return (
    <div className="w-full ">
      <div className="mt-6 font-semibold text-gray-900">
        Choose Working day time
      </div>
      <hr />
      <div className="space-y-4 w-full max-w-3xl">
        <div
          key={uniqueId()}
          className="grid mt-4 font-medium text-gray-900 grid-cols-12 gap-6 "
        >
          <div className="col-span-3">Days</div>
          <div className="col-span-4">Start Time</div>
          <div className="col-span-4">End Time</div>
        </div>
        {fields?.map((workingDay, idx) => (
          <div key={workingDay.id} className="grid grid-cols-12 w-fit gap-6 ">
            <div className="col-span-3">{daysOfWeek[workingDay?.day]}</div>
            <div className="col-span-4">
              <FormWizard
                className=" w-32"
                config={[
                  {
                    label: "",
                    control: control as Control,
                    type: InputTypes.CLOCK,
                    name: `workingDays.${idx}.startTime` as Path<TFieldValues>,
                    required: false,
                    placeholder: "Select start time",
                    errors,
                  },
                ]}
              />
            </div>
            <div className=" col-span-4">
              <FormWizard
                config={[
                  {
                    label: "",
                    control: control as Control,
                    type: InputTypes.CLOCK,
                    name: `workingDays.${idx}.endTime` as Path<TFieldValues>,
                    required: false,
                    placeholder: "Select end time",
                    errors,
                  },
                ]}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Form;
