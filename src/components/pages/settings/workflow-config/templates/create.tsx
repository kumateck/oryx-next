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
  TemplateSection,
} from "./type";
import PageTitle from "@/shared/title";
import ThrowErrorMessage from "@/lib/throw-error";
import { FormType } from "@/lib";

const CreateTemplate = () => {
  const router = useRouter();
  const [sections, setSections] = useState<TemplateSection[]>([
    {
      id: `section-${Date.now()}`,
      name: "",
      description: "",
      questions: [],
    },
  ]);
  const [currentSectionId, setCurrentSectionId] = useState<string | null>(null);
  const [isAddQuestionsOpen, setIsAddQuestionsOpen] = useState(false);
  const [highlightedQuestion, setHighlightedQuestion] = useState<QuestionDto>();

  const [mutation, { isLoading }] = usePostApiV1FormMutation();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TemplateRequestDto>({
    resolver: CreateTemplateValidator,
    mode: "onSubmit",
  });

  const onSubmit = async (data: TemplateRequestDto) => {
    // Validate sections
    const validSections = sections; //.filter((s) => s.name.trim() !== "");

    // if (validSections.length === 0) {
    //   toast.warning("Please add at least one section with a name");
    //   return;
    // }

    const sectionsWithQuestions = validSections.filter(
      (s) => s.questions.length > 0,
    );

    if (sectionsWithQuestions.length === 0) {
      toast.warning("Please add at least one question to any section");
      return;
    }

    const payload = {
      createFormRequest: {
        name: data.name,
        type: data.type
          ? (Number(data.type.value) as FormType)
          : FormType.Default,
        sections: validSections.map((section) => ({
          name: section.name,
          description: section.description,
          fields: section.questions.map((item) => ({
            questionId: item.id,
            required: item.required || false,
            description: item.description,
          })),
        })),
      },
    } satisfies PostApiV1FormApiArg;

    try {
      await mutation(payload).unwrap();
      toast.success("Template created successfully");
      router.back();
    } catch (error) {
      console.log(error);
      ThrowErrorMessage(error);
    }
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
            <PageTitle title="Create Template" />
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
          control={control}
          sections={sections}
          setSections={setSections}
          currentSectionId={currentSectionId}
          setCurrentSectionId={setCurrentSectionId}
          isAddQuestionsOpen={isAddQuestionsOpen}
          setIsAddQuestionsOpen={setIsAddQuestionsOpen}
          highlightedQuestion={highlightedQuestion}
          setHighlightedQuestion={setHighlightedQuestion}
          register={register}
          errors={errors}
        />
      </form>
    </div>
  );
};

export default CreateTemplate;
