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
  TemplateSection,
  templateQuestions,
} from "./type";
import { useUserPermissions } from "@/hooks/use-permission";
import NoAccess from "@/shared/no-access";

const EditTemplate = () => {
  const { id } = useParams();
  const formId = id as string;
  const router = useRouter();

  const [sections, setSections] = useState<TemplateSection[]>([]);
  const [currentSectionId, setCurrentSectionId] = useState<string | null>(null);
  const [isAddQuestionsOpen, setIsAddQuestionsOpen] = useState(false);
  const [highlightedQuestion, setHighlightedQuestion] = useState<QuestionDto>();

  const [loadFormbyId] = useLazyGetApiV1FormByFormIdQuery();
  const [updateMutation, { isLoading: updateLoading }] =
    usePutApiV1FormByFormIdMutation();

  const {
    register,
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
    try {
      const response = await loadFormbyId({ formId }).unwrap();
      setValue("name", response.name as string);

      // Transform API response to our section structure
      const apiSections = response?.sections || [];
      const transformedSections: TemplateSection[] = apiSections.map(
        (apiSection, index) => ({
          id: `section-${index}-${Date.now()}`,
          name: apiSection.name || `Section ${index + 1}`,
          questions: (apiSection.fields || []).map((field) => ({
            id: field?.question?.id as string,
            required: field.required || false,
            label: field?.question?.label as string,
            type: field?.question?.type as QuestionType,
            options: (field?.question?.options || []).map((opt) => ({
              name: opt.name as string,
            })),
          })) as templateQuestions[],
        }),
      );

      // Ensure at least one section exists
      if (transformedSections.length === 0) {
        transformedSections.push({
          id: `section-${Date.now()}`,
          name: "",
          questions: [],
        });
      }

      setSections(transformedSections);
    } catch (error) {
      console.error("Error loading form:", error);
      toast.error("Error loading template data");
    }
  };

  const onSubmit = async (data: TemplateRequestDto) => {
    // Validate sections
    const validSections = sections.filter((s) => s.name.trim() !== "");

    if (validSections.length === 0) {
      toast.warning("Please add at least one section with a name");
      return;
    }

    const sectionsWithQuestions = validSections.filter(
      (s) => s.questions.length > 0,
    );

    if (sectionsWithQuestions.length === 0) {
      toast.warning("Please add at least one question to any section");
      return;
    }

    const payload = {
      formId: id as string,
      createFormRequest: {
        name: data.name,
        sections: validSections.map((section) => ({
          name: section.name,
          fields: section.questions.map((item) => ({
            questionId: item.id,
            required: item.required || false,
          })),
        })),
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

  // Check Permissions
  const { hasPermissionAccess } = useUserPermissions();
  const hasAccessToWorkFlowFormQuestions = hasPermissionAccess(
    PermissionKeys.workflowForms.questions.view,
  );
  const hasAccessToWorkFlowFormTemplate = hasPermissionAccess(
    PermissionKeys.workflowForms.templates.view,
  );

  if (!hasAccessToWorkFlowFormQuestions && !hasAccessToWorkFlowFormTemplate) {
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

export default EditTemplate;
