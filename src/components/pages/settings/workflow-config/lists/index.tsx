import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { QuestionDto } from "@/lib/redux/api/openapi.generated";

import { templateQuestions } from "../templates/type";
import { Container } from "./container";

interface Props {
  questions: templateQuestions[];
  highlightedQuestion?: QuestionDto;
  setHighlightedQuestion: React.Dispatch<
    React.SetStateAction<QuestionDto | undefined>
  >;
  setQuestions: React.Dispatch<React.SetStateAction<templateQuestions[]>>;

  onDeleteQuestion: (questionId: string) => void;
}
const DragLists = ({
  questions,
  highlightedQuestion,
  setHighlightedQuestion,
  onDeleteQuestion,
  setQuestions,
}: Props) => {
  return (
    <div className="w-full">
      <DndProvider backend={HTML5Backend}>
        {questions?.length > 0 && (
          <Container
            highlightedQuestion={highlightedQuestion}
            onDeleteQuestion={onDeleteQuestion}
            questions={questions}
            setHighlightedQuestion={setHighlightedQuestion}
            setQuestions={setQuestions}
          />
        )}
      </DndProvider>
    </div>
  );
};

export default DragLists;
