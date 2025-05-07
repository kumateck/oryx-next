import update from "immutability-helper";
import { useCallback, useEffect, useState } from "react";

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
  questions: QuestionDto[];
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
  {
    const [cards, setCards] = useState<QuestionDto[]>(questions);
    useEffect(() => {
      setCards(questions);

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [questions?.length]);

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
      setCards((prevCards: QuestionDto[]) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex] as QuestionDto],
          ],
        }),
      );
    }, []);

    const renderCard = useCallback(
      (card: QuestionDto, index: number) => {
        return (
          <Card
            key={card.id}
            index={index}
            id={card.id}
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
          {cards.map((card, i) => renderCard(card, i))}
        </div>
      </>
    );
  }
};
