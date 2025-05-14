"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button, Icon } from "@/components/ui";
import {
  ErrorResponse,
  PermissionKeys,
  QuestionType,
  Section,
  findRecordWithFullAccess,
  isErrorResponse,
} from "@/lib";
import {
  PutApiV1FormByFormIdApiArg,
  QuestionDto,
  useLazyGetApiV1FormByFormIdQuery,
  usePutApiV1FormByFormIdMutation,
} from "@/lib/redux/api/openapi.generated";

import QuestionForm from "./form";
import {
  CreateTemplateValidator,
  TemplateRequestDto,
  templateQuestions,
} from "./type";
import { useSelector } from "@/lib/redux/store";
import NoAccess from "@/shared/no-access";

const EditTemplate = () => {
  const { id } = useParams();

  const formId = id as string;

  const router = useRouter();
  const [isAddQuestionsOpen, setIsAddQuestionsOpen] = useState(false);
  const [questions, setQuestions] = useState<templateQuestions[]>([]);
  const [highlightedQuestion, setHighlightedQuestion] = useState<QuestionDto>();

  const [loadFormbyId] = useLazyGetApiV1FormByFormIdQuery();

  const [updateMutation, { isLoading: updateLoading }] =
    usePutApiV1FormByFormIdMutation();
  const {
    register,
    // control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TemplateRequestDto>({
    resolver: CreateTemplateValidator,
    mode: "onSubmit",
  });

  useEffect(() => {
    loadFormHandler(formId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formId]);
  const loadFormHandler = async (formId: string) => {
    const response = await loadFormbyId({
      formId,
    }).unwrap();
    setValue("name", response.name as string);
    const section = response?.sections?.[0];
    const formFields = section?.fields;
    const questions = formFields?.map((item) => ({
      id: item?.question?.id as string,
      required: item.required,
      label: item?.question?.label as string,
      type: item?.question?.type as QuestionType,
      options: item?.question?.options?.map((opt) => ({
        name: opt.name as string,
      })) as { name: string }[],
    })) as templateQuestions[];
    setQuestions(questions);
  };

  const onSubmit = async (data: TemplateRequestDto) => {
    // console.log(data);
    if (questions.length === 0) {
      toast.warning("Please add at least one question");
      return;
    }
    const payload = {
      formId: id as string,
      createFormRequest: {
        name: data.name,
        sections: [
          {
            fields: questions?.map((item) => ({
              questionId: item.id,
              required: item.required,
            })),
          },
        ],
      },
    } satisfies PutApiV1FormByFormIdApiArg;
    try {
      await updateMutation(payload).unwrap();
      toast.success("Template updated successfully");
      router.back();
    } catch (error) {
      console.log(error);
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  const onDeleteQuestion = (questionId: string) => {
    setQuestions((prev) => prev.filter((item) => item.id !== questionId));
  };

  //Check Permision
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  // check permissions here
  const permissions = useSelector(
    (state) => state.persistedReducer?.auth?.permissions,
  ) as Section[];
  // check permissions access
  const hasAccessToWorkFlowFormQuestions = findRecordWithFullAccess(
    permissions,
    PermissionKeys.workflowForms.questions.view,
  );
  const hasAccessToWorkFlowFormTemplate = findRecordWithFullAccess(
    permissions,
    PermissionKeys.workflowForms.templates.view,
  );
  if (
    isClient &&
    !hasAccessToWorkFlowFormQuestions &&
    !hasAccessToWorkFlowFormTemplate
  ) {
    //redirect to no access
    return <NoAccess />;
  }

  return (
    <div className="w-full space-y-5">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon
              name="ArrowLeft"
              className="h-5 w-5 text-black hover:cursor-pointer"
              onClick={() => {
                router.back();
              }}
            />
            <span className="font-Medium text-primary-500 text-xl">
              Edit Template
            </span>
          </div>
          <Button
            type="submit"
            variant="default"
            size="default"
            className="flex h-9 items-center gap-2"
          >
            {updateLoading && (
              <Icon name="LoaderCircle" className="h-4 w-4 animate-spin" />
            )}
            <span>Save Changes</span>
          </Button>
        </div>

        <QuestionForm
          setQuestions={setQuestions}
          questions={questions}
          highlightedQuestion={highlightedQuestion}
          setHighlightedQuestion={setHighlightedQuestion}
          onDeleteQuestion={onDeleteQuestion}
          isAddQuestionsOpen={isAddQuestionsOpen}
          setIsAddQuestionsOpen={setIsAddQuestionsOpen}
          register={register}
          errors={errors}
        />
      </form>
    </div>
  );
};

export default EditTemplate;
