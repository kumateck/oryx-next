import React from "react";
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
import { Button } from "@/components/ui";
import { cn, InputTypes, QuestionTypeOptions } from "@/lib";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  fields: FieldArrayWithId<TFieldValues>[];
  remove: UseFieldArrayRemove;
  append: UseFieldArrayAppend<TFieldValues>;
  showOptions?: boolean;
  showFormular?: boolean;
  showIsMultiSelect?: boolean;
}
const QuestionForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  fields,
  append,
  remove,
  showOptions,
  showFormular,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full">
      <FormWizard
        config={[
          {
            register: register("label" as Path<TFieldValues>),
            label: "Question",
            placeholder: "Enter your question",
            type: InputTypes.TEXT,
            required: true,
            errors,
          },
          {
            register: register("description" as Path<TFieldValues>),
            label: "Description (Specification)",
            placeholder: "Enter your description",
            type: InputTypes.TEXT,
            errors,
          },
          {
            label: "Answer Type",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "type",
            required: true,
            onModal: true,
            placeholder: "Answer Type",
            options: QuestionTypeOptions,
            errors,
          },
        ]}
      />

      {/* <div className="py-5">
        {fields.map((field, index) => {
          return (
            <div key={field.id} className="">
              <FormWizard
                config={[
                  {
                    control: control as Control,
                    name: `options.${index}.name` as const,
                    label: "Generate Expression",
                    placeholder: "Enter your question",
                    type: InputTypes.FORMULAR,
                    required: true,
                    errors,
                  },
                ]}
              />
            </div>
          );
        })}
      </div> */}

      {showOptions && (
        <div>
          {!showFormular && (
            <div className="flex justify-between px-2 py-5">
              <span className="font-medium">Options</span>
              <Button type="button" onClick={() => append({ name: "" } as any)}>
                Add Option
              </Button>
            </div>
          )}
          <div
            className={cn("grid w-full grid-cols-3 gap-2 overflow-y-auto", {
              "grid-cols-1": showFormular,
            })}
          >
            {fields.map((field, index) => {
              return (
                <div key={field.id} className="relative">
                  {showFormular ? (
                    <>
                      <input
                        className="w-full"
                        {...register(
                          `options.${index}.name` as Path<TFieldValues>,
                        )}
                      />
                      <FormWizard
                        config={[
                          {
                            control: control as Control,
                            name: `options.${index}.name` as const,
                            label: "Generate Expression",
                            placeholder: "Enter your question",
                            type: InputTypes.FORMULAR,
                            required: true,
                            errors,
                          },
                        ]}
                      />
                    </>
                  ) : (
                    <FormWizard
                      config={[
                        {
                          register: register(
                            `options.${index}.name` as Path<TFieldValues>,
                          ),
                          label: "",
                          placeholder: `Option ${index + 1}`,
                          type: InputTypes.TEXT,
                          required: true,
                          errors,
                          suffix: "CircleX",
                          onSuffixClick: () => remove(index),
                          suffixClass: "text-danger-default ",
                        },
                      ]}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionForm;
