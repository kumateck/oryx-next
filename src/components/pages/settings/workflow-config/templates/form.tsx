import React from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
import { Icon } from "@/components/ui";
import { InputTypes } from "@/lib";
import { QuestionDto } from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import StepWrapper from "@/shared/wrapper";

import DragLists from "../lists";
import AddQuestions from "./add-questions";
import { templateQuestions } from "./type";

interface Props<TFieldValues extends FieldValues> {
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;

  isAddQuestionsOpen: boolean;
  setQuestions: React.Dispatch<React.SetStateAction<templateQuestions[]>>;
  questions: templateQuestions[];
  setIsAddQuestionsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  highlightedQuestion: QuestionDto | undefined;
  setHighlightedQuestion: React.Dispatch<
    React.SetStateAction<QuestionDto | undefined>
  >;
  onDeleteQuestion: (index: string) => void;
}
const QuestionForm = <TFieldValues extends FieldValues>({
  register,
  errors,
  isAddQuestionsOpen,
  setQuestions,
  questions,
  setIsAddQuestionsOpen,
  highlightedQuestion,
  setHighlightedQuestion,
  onDeleteQuestion,
}: Props<TFieldValues>) => {
  return (
    <div className="w-full">
      {isAddQuestionsOpen && (
        <AddQuestions
          setQuestions={setQuestions}
          questions={questions}
          isOpen={isAddQuestionsOpen}
          onClose={() => setIsAddQuestionsOpen(false)}
        />
      )}
      <ScrollablePageWrapper className="space-y-5 pb-60">
        <StepWrapper className="w-full">
          <FormWizard
            className="grid w-full grid-cols-2 gap-10 space-y-0"
            fieldWrapperClassName="flex-grow"
            config={[
              {
                register: register("name" as Path<TFieldValues>),
                label: "Title",
                placeholder: "Enter Title",
                type: InputTypes.TEXT,
                errors,
              },
            ]}
          />
        </StepWrapper>
        <StepWrapper className="w-full">
          <div
            className="flex w-full rounded-2xl bg-neutral-100 px-4 py-3 hover:cursor-pointer"
            onClick={() => setIsAddQuestionsOpen(true)}
          >
            <Icon name="Plus" className="text-primary-500 h-5 w-5" />
            <span className="font-Medium text-primary-500 text-base">
              Add Question
            </span>
          </div>
          <DragLists
            questions={questions}
            highlightedQuestion={highlightedQuestion}
            setHighlightedQuestion={setHighlightedQuestion}
            onDeleteQuestion={onDeleteQuestion}
            setQuestions={setQuestions}
          />
        </StepWrapper>
      </ScrollablePageWrapper>
    </div>
  );
};

export default QuestionForm;
