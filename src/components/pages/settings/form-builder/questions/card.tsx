"use client";
import { Button, Icon } from "@/components/ui";
import {
  PermissionKeys,
  QuestionType,
  Section,
  capitalizeFirstWord,
  findRecordWithAccess,
  splitWords,
} from "@/lib";
import { QuestionDto } from "@/lib/redux/api/openapi.generated";
import { useSelector } from "@/lib/redux/store";

interface Props {
  question: QuestionDto;
  number: number;
  onEdit: (details: QuestionDto) => void;
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
  const permissions = useSelector(
    (state) => state.persistedReducer?.auth?.permissions,
  ) as Section[];

  return (
    <div className="mt-2 w-full">
      <div className="rounded-2xl border border-neutral-200 bg-white px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="text-left">
            <div className="text-primary-500 flex flex-1 gap-1 text-sm">
              <span>{number}.</span>
              <span>{capitalizeFirstWord(question?.label as string)}</span>
            </div>
            <div>
              <span className="text-sm text-neutral-400">
                {splitWords(QuestionType[Number(question?.type)])}
              </span>
            </div>
          </div>

          <div className="flex w-2/6 items-center justify-end gap-1 px-2">
            {findRecordWithAccess(
              permissions,
              PermissionKeys.workflowForms.questions.edit,
            ) && (
              <Button
                onClick={() => onEdit(question)}
                variant={"outline"}
                className="flex items-center gap-1.5 border-neutral-300 bg-white text-neutral-700"
              >
                <Icon name="Pencil" size={14} />
                <span>Edit</span>
              </Button>
            )}

            {findRecordWithAccess(
              permissions,
              PermissionKeys.workflowForms.questions.delete,
            ) && (
              <Button
                onClick={() => onDelete(question.id as string)}
                variant={"destructive"}
              >
                {isDeleting ? (
                  <Icon
                    name="LoaderCircle"
                    size={14}
                    className="animate-spin"
                  />
                ) : (
                  <Icon
                    name="Trash2"
                    size={14}
                    className="text-destructive-500"
                  />
                )}
                <span>Delete</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
