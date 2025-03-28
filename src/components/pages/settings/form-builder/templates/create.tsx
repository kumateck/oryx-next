"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button, Icon } from "@/components/ui";
import {
  PostApiV1FormApiArg,
  QuestionDto,
  usePostApiV1FormMutation,
} from "@/lib/redux/api/openapi.generated";

import QuestionForm from "./form";
import {
  CreateTemplateValidator,
  TemplateRequestDto,
  templateQuestions,
} from "./type";

const CreateTemplate = () => {
  const router = useRouter();
  const [isAddQuestionsOpen, setIsAddQuestionsOpen] = useState(false);
  const [questions, setQuestions] = useState<templateQuestions[]>([]);
  const [highlightedQuestion, setHighlightedQuestion] = useState<QuestionDto>();
  const [mutation, { isLoading }] = usePostApiV1FormMutation();
  const {
    register,
    // control,
    handleSubmit,
    formState: { errors },
  } = useForm<TemplateRequestDto>({
    resolver: CreateTemplateValidator,
    mode: "onSubmit",
  });

  // Function to handle the drag and drop event

  const onSubmit = async (data: TemplateRequestDto) => {
    if (questions.length === 0) {
      toast.warning("Please add at least one question");
      return;
    }
    const payload = {
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
    } satisfies PostApiV1FormApiArg;
    try {
      await mutation(payload).unwrap();
      toast.success("Template created successfully");
      router.back();
    } catch (error) {
      console.log(error);
      // toast.error("Something went wrong");
    }
  };

  const onDeleteQuestion = (questionId: string) => {
    setQuestions((prev) => prev.filter((item) => item.id !== questionId));
  };

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
              Create Template
            </span>
          </div>
          <Button
            type="submit"
            variant="default"
            size="default"
            className="flex h-9 items-center gap-2"
          >
            {isLoading && (
              <Icon name="LoaderCircle" className="h-4 w-4 animate-spin" />
            )}
            <span>Create Template</span>
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

export default CreateTemplate;
