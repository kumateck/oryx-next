import { useEffect } from "react";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import { Button, DialogFooter, Icon, Label, Switch } from "@/components/ui";
import { ErrorResponse, Option, QuestionType, isErrorResponse } from "@/lib";
import {
  CreateQuestionRequest,
  PostApiV1FormQuestionApiArg,
  usePostApiV1FormQuestionMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";

import QuestionForm from "./form";
import { CreateQuestionValidator, QuestionRequestDto } from "./type";
interface Props {
  defaultOptions: { name: string }[] | [];
  selectedQType: Option;
  onClose: () => void;
  onCloseAll: () => void;
}

const OtherForm = ({
  defaultOptions,
  selectedQType,
  onClose,
  onCloseAll,
}: Props) => {
  const dispatch = useDispatch();
  const [saveMutation, { isLoading }] = usePostApiV1FormQuestionMutation();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<QuestionRequestDto>({
    resolver: CreateQuestionValidator,
    defaultValues: {
      options: defaultOptions,
      label: "",
      type: selectedQType,
    },
  });
  const typeWatch = useWatch({
    control,
    name: "type",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  useEffect(() => {
    if (
      Number(typeWatch?.value) === QuestionType.SingleChoice ||
      Number(typeWatch?.value) === QuestionType.Checkbox ||
      Number(typeWatch?.value) === QuestionType.Dropdown
    ) {
      setValue("options", [{ name: "Option 1" }]);
    } else {
      setValue("options", []);
    }
  }, [typeWatch.value, setValue]);
  const onSubmit = async (data: QuestionRequestDto) => {
    const createQuestionRequest = {
      label: data.label,
      type: Number(data.type.value) as QuestionType,
      isMultiSelect: data.isMultiSelect,
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
        type: data.type, // Maintain the current type
        options: [],
      });
      onCloseAll();
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <QuestionForm
          fields={fields}
          register={register}
          errors={errors}
          showOptions={
            Number(typeWatch?.value) === QuestionType.SingleChoice ||
            Number(typeWatch?.value) === QuestionType.Checkbox ||
            Number(typeWatch?.value) === QuestionType.Dropdown
          }
          control={control}
          remove={remove}
          append={append}
        />

        <DialogFooter className="items-center justify-between gap-4 pt-2">
          {(Number(typeWatch?.value) === QuestionType.Dropdown ||
            Number(typeWatch?.value) === QuestionType.FileUpload) && (
            <div className="flex w-full items-center gap-2">
              <Label>Allow Multiple Selection</Label>
              <Controller
                name="isMultiSelect"
                control={control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
          )}
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
      </form>
    </div>
  );
};

export default OtherForm;
