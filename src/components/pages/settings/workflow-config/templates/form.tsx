import React from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
import { Button, Icon, Input } from "@/components/ui";
import { InputTypes } from "@/lib";
import { QuestionDto } from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import StepWrapper from "@/shared/wrapper";

import DragLists from "../lists";
import AddQuestions from "./add-questions";
import { templateQuestions, TemplateSection } from "./type";

interface Props<TFieldValues extends FieldValues> {
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  sections: TemplateSection[];
  setSections: React.Dispatch<React.SetStateAction<TemplateSection[]>>;
  currentSectionId: string | null;
  setCurrentSectionId: React.Dispatch<React.SetStateAction<string | null>>;
  isAddQuestionsOpen: boolean;
  setIsAddQuestionsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  highlightedQuestion: QuestionDto | undefined;
  setHighlightedQuestion: React.Dispatch<
    React.SetStateAction<QuestionDto | undefined>
  >;
}

const QuestionForm = <TFieldValues extends FieldValues>({
  register,
  errors,
  sections,
  setSections,
  currentSectionId,
  setCurrentSectionId,
  isAddQuestionsOpen,
  setIsAddQuestionsOpen,
  highlightedQuestion,
  setHighlightedQuestion,
}: Props<TFieldValues>) => {
  const addNewSection = () => {
    const newSection: TemplateSection = {
      id: `section-${Date.now()}`,
      name: "",
      questions: [],
    };
    setSections((prev) => [...prev, newSection]);
  };

  const updateSectionName = (sectionId: string, name: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId ? { ...section, name } : section,
      ),
    );
  };

  const deleteSection = (sectionId: string) => {
    setSections((prev) => prev.filter((section) => section.id !== sectionId));
    if (currentSectionId === sectionId) {
      setCurrentSectionId(null);
    }
  };

  const onDeleteQuestion = (sectionId: string, questionId: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              questions: section.questions.filter((q) => q.id !== questionId),
            }
          : section,
      ),
    );
  };

  const updateSectionQuestions = (
    sectionId: string,
    questions: templateQuestions[],
  ) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId ? { ...section, questions } : section,
      ),
    );
  };

  const currentSection = sections.find((s) => s.id === currentSectionId);

  return (
    <div className="w-full">
      {isAddQuestionsOpen && currentSectionId && (
        <AddQuestions
          setQuestions={(questions) => {
            if (typeof questions === "function") {
              const currentQuestions = currentSection?.questions || [];
              const newQuestions = questions(currentQuestions);
              updateSectionQuestions(currentSectionId, newQuestions);
            } else {
              updateSectionQuestions(currentSectionId, questions);
            }
          }}
          questions={currentSection?.questions || []}
          isOpen={isAddQuestionsOpen}
          onClose={() => setIsAddQuestionsOpen(false)}
        />
      )}

      <ScrollablePageWrapper className="space-y-5 pb-60">
        {/* Template Name */}
        <StepWrapper className="w-full">
          <FormWizard
            className="grid w-full grid-cols-2 gap-10 space-y-0"
            fieldWrapperClassName="flex-grow"
            config={[
              {
                register: register("name" as Path<TFieldValues>),
                label: "Template Title",
                placeholder: "Enter Template Title",
                type: InputTypes.TEXT,
                errors,
              },
            ]}
          />
        </StepWrapper>

        {/* Sections */}
        <StepWrapper className="w-full space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-neutral-700">Sections</h3>
            <Button
              type="button"
              variant="outline"
              onClick={addNewSection}
              className="flex items-center gap-2"
            >
              <Icon name="Plus" className="h-4 w-4" />
              Add Section
            </Button>
          </div>

          {sections.map((section, index) => (
            <div
              key={section.id}
              className="rounded-2xl border border-neutral-200 p-4 space-y-4"
            >
              {/* Section Header */}
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    value={section.name}
                    onChange={(e) =>
                      updateSectionName(section.id, e.target.value)
                    }
                    placeholder={`Section ${index + 1} Name`}
                  />
                </div>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => {
                    setCurrentSectionId(section.id);
                    setIsAddQuestionsOpen(true);
                  }}
                  className="flex items-center gap-2 "
                >
                  <Icon name="Plus" className="h-4 w-4" />
                  Add Question
                </Button>
                {sections.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => deleteSection(section.id)}
                    className="text-danger-default border-danger-default hover:bg-danger-50"
                  >
                    <Icon name="Trash2" className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Section Questions */}
              {section.questions.length > 0 ? (
                <DragLists
                  questions={section.questions}
                  highlightedQuestion={highlightedQuestion}
                  setHighlightedQuestion={setHighlightedQuestion}
                  onDeleteQuestion={(questionId) =>
                    onDeleteQuestion(section.id, questionId)
                  }
                  setQuestions={(questions) => {
                    if (typeof questions === "function") {
                      const newQuestions = questions(section.questions);
                      updateSectionQuestions(section.id, newQuestions);
                    } else {
                      updateSectionQuestions(section.id, questions);
                    }
                  }}
                />
              ) : (
                <div className="text-center py-8 text-neutral-400">
                  <Icon name="CircleHelp" className="h-8 w-8 mx-auto mb-2" />
                  <p>No questions added yet</p>
                  <p className="text-sm">
                    Click {`"Add Question"`} to get started
                  </p>
                </div>
              )}
            </div>
          ))}

          {sections.length === 0 && (
            <div className="text-center py-8 border-2 border-dashed border-neutral-input rounded-2xl">
              <Icon
                name="FolderPlus"
                className="h-8 w-8 mx-auto mb-2 text-neutral-default"
              />
              <p className="text-neutral-default mb-2">
                No sections created yet
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={addNewSection}
                className="flex items-center gap-2 mx-auto"
              >
                <Icon name="Plus" className="h-4 w-4" />
                Create First Section
              </Button>
            </div>
          )}
        </StepWrapper>
      </ScrollablePageWrapper>
    </div>
  );
};

export default QuestionForm;
