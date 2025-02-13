import type { Identifier, XYCoord } from "dnd-core";
import { Images } from "lucide-react";
import type { FC } from "react";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import { Icon } from "@/components/ui";
import { QuestionTypes, cn } from "@/lib";
import { QuestionDto } from "@/lib/redux/api/openapi.generated";

import { ItemTypes } from "./type";

const style = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "move",
};

export interface CardProps {
  id: any;
  question: QuestionDto;
  highlightedQuestion?: QuestionDto;
  setHighlightedQuestion: React.Dispatch<
    React.SetStateAction<QuestionDto | undefined>
  >;
  onDeleteQuestion: (questionId: string) => void;

  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const Card: FC<CardProps> = ({
  id,
  question,
  highlightedQuestion,
  setHighlightedQuestion,
  onDeleteQuestion,
  index,
  moveCard,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <div ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId}>
      <div
        className={cn("relative w-full rounded-md border bg-white p-8", {
          "border-secondary-500 shadow-secondary-500 shadow-sm":
            highlightedQuestion?.id === question.id,
        })}
        onClick={() => setHighlightedQuestion(question)}
      >
        {highlightedQuestion?.id === question.id && (
          <div className="absolute left-1/2 top-0 translate-x-1 translate-y-1/2 transform">
            <Icon name="GripHorizontal" className="h-6 w-8 text-neutral-300" />
          </div>
        )}
        <div className="flex items-center justify-between gap-6">
          <div className="w-full space-y-1">
            <span className="font-Medium block text-sm text-neutral-900">
              {question?.label}
            </span>

            {(QuestionTypes.ShortAnswer === question.type ||
              QuestionTypes.LongAnswer === question.type) && (
              <div className="rounded-md border px-3 py-2.5">
                <span className="text-sm text-neutral-400">Short Answer</span>
              </div>
            )}

            {QuestionTypes.Paragraph === question.type && (
              <div className="h-28 rounded-md border px-3 py-2.5">
                <span className="text-sm text-neutral-400">Paragraph</span>
              </div>
            )}
            {(question.type === QuestionTypes.SingleChoice ||
              question.type === QuestionTypes.Checkbox) && (
              <ul className="space-y-2">
                {question?.options?.map((option, idx) => (
                  <li className="flex items-center gap-2" key={idx}>
                    <div
                      className={cn("h-6 w-6 border border-neutral-400", {
                        "rounded-full":
                          question.type === QuestionTypes.SingleChoice,
                        "rounded-md": question.type === QuestionTypes.Checkbox,
                      })}
                    />
                    <span className="text-sm text-black">{option.name}</span>
                  </li>
                ))}
              </ul>
            )}

            {QuestionTypes.Dropdown === question.type && (
              <div className="flex w-full max-w-md items-center justify-between rounded-md border px-3 py-2.5">
                <span className="text-sm text-neutral-400">Select One</span>
                <Icon name="ChevronDown" className="h-5 w-5 text-neutral-500" />
              </div>
            )}
            {QuestionTypes.Datepicker === question.type && (
              <div className="flex w-full max-w-md items-center justify-between rounded-md border px-3 py-2.5">
                <span className="text-sm text-neutral-400">DD/MM/YY</span>
                <Icon name="Calendar" className="h-5 w-5 text-neutral-500" />
              </div>
            )}
            {/* {QuestionTypes.Time === question.type && (
              <div className="flex w-full max-w-md items-center justify-between rounded-md border px-3 py-2.5">
                <span className="text-sm text-neutral-400">12:00</span>
                <Icon name="Clock" className="h-5 w-5 text-neutral-500" />
              </div>
            )} */}

            {QuestionTypes.FileUpload === question.type && (
              <div className="flex w-full flex-col items-center rounded-md border border-dashed border-neutral-400 p-4">
                <div className="w-full max-w-md text-center">
                  <input
                    type="file"
                    id="fileUpload"
                    className="hidden"
                    multiple
                    disabled
                  />
                  <label
                    htmlFor="fileUpload"
                    className="inline-flex cursor-pointer flex-col items-center justify-center rounded-md px-4 py-2"
                  >
                    <Images size={30} className="text-neutral-900" />
                    <span className="text-base">
                      <b className="text-info-500">Upload a file</b> or drag and
                      drop
                    </span>
                  </label>
                  <p className="text-sm text-neutral-400">
                    PNG, JPG, JPEG, WEBP, PDF, DOC, DOCX, XLSX up to 5MB
                  </p>
                </div>
              </div>
            )}
          </div>

          {highlightedQuestion?.id === question.id && (
            <Icon
              name="Trash2"
              className="h-5 w-5 text-neutral-400"
              onClick={() => onDeleteQuestion(question.id as string)}
            />
          )}
        </div>
        {/* {highlightedQuestion?.id === question.id && (
          <div className="pt-5">
            <Switch
              className="h-4 w-7"
              checked={question.}
              onCheckedChange={(e) =>
                setQuestions((prevState) =>
                  prevState.map((item) =>
                    item.questionId === question.questionId
                      ? { ...item, required: e }
                      : item,
                  ),
                )
              }
            />
          </div>
        )} */}
      </div>
    </div>
  );
};
