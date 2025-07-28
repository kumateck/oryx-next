import update from "immutability-helper";
import { useCallback } from "react";

import { QuestionDto } from "@/lib/redux/api/openapi.generated";

import { templateQuestions } from "../templates/type";
import { Card } from "./card";

const style = {
  minWidth: 400,
};

export interface Item {
  id: number;
  text: string;
}

export interface ContainerState {
  cards: Item[];
}

interface ContainerProps {
  questions: templateQuestions[];
  highlightedQuestion?: QuestionDto;
  setHighlightedQuestion: React.Dispatch<
    React.SetStateAction<QuestionDto | undefined>
  >;
  setQuestions: React.Dispatch<React.SetStateAction<templateQuestions[]>>;
  onDeleteQuestion: (questionId: string) => void;
}

export const Container = ({
  questions,
  highlightedQuestion,
  setHighlightedQuestion,
  onDeleteQuestion,
  setQuestions,
}: ContainerProps) => {
  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setQuestions((prevQuestions: templateQuestions[]) =>
        update(prevQuestions, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevQuestions[dragIndex] as templateQuestions],
          ],
        }),
      );
    },
    [setQuestions],
  );

  const renderCard = useCallback(
    (card: templateQuestions, index: number) => {
      return (
        <Card
          key={card.id}
          index={index}
          id={card.id as string}
          question={card}
          highlightedQuestion={highlightedQuestion}
          setHighlightedQuestion={setHighlightedQuestion}
          setQuestions={setQuestions}
          onDeleteQuestion={onDeleteQuestion}
          moveCard={moveCard}
        />
      );
    },
    [
      highlightedQuestion,
      setHighlightedQuestion,
      onDeleteQuestion,
      moveCard,
      setQuestions,
    ],
  );

  return (
    <>
      <div style={style} className="w-full">
        {questions.map((card, i) => renderCard(card, i))}
      </div>
    </>
  );
};
