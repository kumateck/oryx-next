import { Button, Icon } from "@/components/ui";

import { Question } from "../types";

interface Props {
  question: Question;
  number: number;
  onEdit: (details: Question) => void;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}
const QuestionCard = ({
  question,
  number,
  onEdit,
  onDelete,
  isDeleting,
}: Props) => {
  const capitalizeFirstWord = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  return (
    <div className="mt-2 w-full">
      <div className="rounded-md border border-neutral-200 bg-background px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="text-left">
            <div className="text-primary-500 flex flex-1 gap-1 text-sm">
              <span>{number}.</span>
              <span>{capitalizeFirstWord(question?.label)}</span>
            </div>
            <div>
              <span className="text-sm text-neutral-400">
                {question?.type?.title}
              </span>
            </div>
          </div>

          <div className="flex w-2/6 items-center justify-end gap-1 px-2">
            <Button
              onClick={() => onEdit(question)}
              variant={"outline"}
              className="flex items-center gap-1.5 border-neutral-300 bg-white text-neutral-700"
            >
              <Icon name="Pencil" size={14} />
              <span>Edit</span>
            </Button>

            <Button
              onClick={() => onDelete(question.id)}
              variant={"outline"}
              className="border-danger-500 text-destructive-500 flex items-center gap-1.5"
            >
              {isDeleting ? (
                <Icon name="LoaderCircle" size={14} className="animate-spin" />
              ) : (
                <Icon
                  name="Trash2"
                  size={14}
                  className="text-destructive-500"
                />
              )}
              <span>Delete</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
