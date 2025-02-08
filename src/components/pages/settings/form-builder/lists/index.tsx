import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { QuestionDto } from "@/lib/redux/api/openapi.generated";

import { Container } from "./container";

interface Props {
  questions: QuestionDto[];
  highlightedQuestion?: QuestionDto;
  setHighlightedQuestion: React.Dispatch<
    React.SetStateAction<QuestionDto | undefined>
  >;
  onDeleteQuestion: (questionId: string) => void;
}
const DragLists = ({
  questions,
  highlightedQuestion,
  setHighlightedQuestion,
  onDeleteQuestion,
}: Props) => {
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <Container
          highlightedQuestion={highlightedQuestion}
          onDeleteQuestion={onDeleteQuestion}
          questions={questions}
          setHighlightedQuestion={setHighlightedQuestion}
        />
      </DndProvider>
    </div>
  );
};

export default DragLists;
