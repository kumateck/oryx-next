import update from "immutability-helper";
import { useCallback, useState } from "react";

import { QuestionDto } from "@/lib/redux/api/openapi.generated";

import { Card } from "./card";

const style = {
  width: 400,
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
  onDeleteQuestion: (questionId: string) => void;
}
export const Container = ({
  questions,
  highlightedQuestion,
  setHighlightedQuestion,
  onDeleteQuestion,
}: ContainerProps) => {
  {
    const [cards, setCards] = useState<QuestionDto[]>(questions);

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
            onDeleteQuestion={onDeleteQuestion}
            moveCard={moveCard}
          />
        );
      },
      [highlightedQuestion, setHighlightedQuestion, onDeleteQuestion, moveCard],
    );

    return (
      <>
        <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
      </>
    );
  }
};
