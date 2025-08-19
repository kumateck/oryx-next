import { FormWizard } from "@/components/form-inputs";
import { Control, FieldErrors, FieldValues } from "react-hook-form";
import { InputTypes, Option } from "@/lib";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  errors: FieldErrors<TFieldValues>;
  departmentOptions: Option[];
  shiftScheduleOptions: Option[];
}

export const FileUpload = <TFieldValues extends FieldValues, TContext>({
  control,
  departmentOptions,
  shiftScheduleOptions,
  errors,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-center gap-10">
        <FormWizard
          className="w-full "
          config={[
            {
              type: InputTypes.SELECT,
              label: "Department",
              name: `departmentId`,
              options: departmentOptions,
              placeholder: "Select Department",
              control: control as Control,
              errors,
            },
          ]}
        />
        <FormWizard
          className="w-full "
          config={[
            {
              type: InputTypes.SELECT,
              label: "Shift Schedule",
              name: `shiftScheduleId`,
              options: shiftScheduleOptions,
              placeholder: "Select select shedule",
              control: control as Control,
              errors,
            },
          ]}
        />
      </div>

      <FormWizard
        className="w-full"
        config={[
          {
            type: InputTypes.DRAGNDROP,
            label: "",
            name: `file`,
            defaultValue: null,
            control: control as Control,
            errors,
            single: true,
          },
        ]}
      />
    </div>
  );
};
