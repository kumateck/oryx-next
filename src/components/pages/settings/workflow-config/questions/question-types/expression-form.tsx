import { FormWizard } from "@/components/form-inputs";
import { Button, DialogFooter, Icon } from "@/components/ui";
import { InputTypes, Option, QuestionTypeOptions } from "@/lib";
import {
  CreateQuestionRequest,
  PostApiV1FormQuestionApiArg,
  QuestionType,
  usePostApiV1FormQuestionMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import ThrowErrorMessage from "@/lib/throw-error";

import React from "react";
import { Control, useFieldArray, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import { CreateExpressionValidator, ExpressionRequestDto } from "./type";
interface Props {
  selectedQType: Option;
  onClose: () => void;
  onCloseAll: () => void;
}
const ExpressionQuestionForm = ({
  selectedQType,
  onClose,
  onCloseAll,
}: Props) => {
  const dispatch = useDispatch();
  const [saveMutation, { isLoading }] = usePostApiV1FormQuestionMutation();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<ExpressionRequestDto>({
    resolver: CreateExpressionValidator,
    mode: "all",
    defaultValues: {
      label: "",
      options: [{ name: "" }],
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "options",
  });
  const onSubmit = async (data: ExpressionRequestDto) => {
    const createQuestionRequest = {
      label: data.label,
      description: data.description,
      type: Number(selectedQType.value) as QuestionType,
      isMultiSelect: false,
      options: data.options,
    } satisfies CreateQuestionRequest;
    const payload = {
      createQuestionRequest,
    } satisfies PostApiV1FormQuestionApiArg;

    try {
      await saveMutation(payload).unwrap();
      toast.success("Question created successfully");
      dispatch(commonActions.setTriggerReload());
      reset({
        label: "",
        options: [],
      });
      onCloseAll();
    } catch (error) {
      ThrowErrorMessage(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormWizard
            config={[
              {
                register: register("label"),
                label: "Question",
                placeholder: "Enter your question",
                type: InputTypes.TEXT,
                required: true,
                errors,
              },
              {
                register: register("description"),
                label: "Description (Specification)",
                placeholder: "Enter your description",
                type: InputTypes.TEXT,
                errors,
              },
            ]}
          />
          <div className="flex flex-col gap-2">
            <span className="block text-sm">Type</span>
            <div className="h-8 rounded-2xl border w-full px-3 bg-neutral-bg flex items-center">
              {QuestionTypeOptions[QuestionTypeOptions.length - 1].label}
            </div>
          </div>
          <div>
            {fields.map((field, index) => (
              <FormWizard
                key={field.id}
                config={[
                  {
                    control: control as unknown as Control,
                    name: `options.${index}.name` as const,
                    label: "Expression Builder",
                    placeholder: "Define the Expression",
                    type: InputTypes.FORMULAR,
                    required: true,
                    errors,
                  },
                ]}
              />
            ))}
          </div>
          <DialogFooter className="items-center justify-between gap-4 pt-2">
            <div className="flex w-full items-center justify-end gap-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant={"default"}
                className="flex items-center gap-2"
              >
                {isLoading ? (
                  <Icon name="LoaderCircle" className="h-4 w-4 animate-spin" />
                ) : (
                  <Icon name="Plus" className="h-4 w-4" />
                )}
                <span>Create Question</span>
              </Button>
            </div>
          </DialogFooter>
        </div>
      </form>
    </div>
  );
};

export default ExpressionQuestionForm;
