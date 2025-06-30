import { useEffect } from "react";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Icon,
  Label,
  Switch,
} from "@/components/ui";
import { ErrorResponse, QuestionType, isErrorResponse } from "@/lib";
import {
  CreateQuestionRequest,
  PutApiV1FormQuestionByQuestionIdApiArg,
  usePutApiV1FormQuestionByQuestionIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";

import QuestionForm from "./form";
import { CreateQuestionValidator, QuestionRequestDto } from "./type";

interface Props {
  details: QuestionRequestDto;
  isOpen: boolean;
  onClose: () => void;
}
const EditQuestionTypes = ({ details, isOpen, onClose }: Props) => {
  const dispatch = useDispatch();
  const [saveMutation, { isLoading }] =
    usePutApiV1FormQuestionByQuestionIdMutation();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<QuestionRequestDto>({
    resolver: CreateQuestionValidator,
    defaultValues: details,
  });
  const typeWatch = useWatch({
    control,
    name: "type",
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
  }, [typeWatch, setValue]);
  const onSubmit = async (data: QuestionRequestDto) => {
    const createQuestionRequest = {
      label: data.label,
      description: data.description,
      type: Number(data.type.value) as QuestionType,
      isMultiSelect: data.isMultiSelect,
      options: data.options,
    } satisfies CreateQuestionRequest;
    const payload = {
      createQuestionRequest,
      questionId: details.id as string,
    } satisfies PutApiV1FormQuestionByQuestionIdApiArg;
    try {
      await saveMutation(payload).unwrap();
      toast.success("Question updated successfully");
      dispatch(commonActions.setTriggerReload());
      reset({
        label: "",
        type: data.type, // Maintain the current type
        options: [],
      });
      onClose();
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <DialogHeader>
            <DialogTitle>Create Question</DialogTitle>
          </DialogHeader>
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
                <span>Save Changes</span>
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditQuestionTypes;
