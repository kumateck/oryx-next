import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import { Option, QuestionType, QuestionTypeOptions, splitWords } from "@/lib";

import CreateQuestionTypes from ".";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const LoadQuestionTypes = ({ isOpen, onClose }: Props) => {
  const [selectedQType, setSelectedQType] = useState<Option>({
    value: QuestionType.ShortAnswer.toString(),
    label: splitWords(QuestionType[QuestionType.ShortAnswer]),
  });
  const [defaultOptions, setDefaultOptions] = useState<{ name: string }[]>([]);
  const [isOpenQuestion, setIsOpenQuestion] = useState(false);
  const handleSelect = (option: Option) => {
    setSelectedQType(option);
    if (
      Number(option?.value) === QuestionType.SingleChoice ||
      Number(option?.value) === QuestionType.Checkbox ||
      Number(option?.value) === QuestionType.Dropdown
    ) {
      setDefaultOptions([{ name: "Option 1" }]);
    } else if (Number(option?.value) === QuestionType.Formular) {
      setDefaultOptions([{ name: "" }]);
    } else {
      setDefaultOptions([]);
    }
    setIsOpenQuestion(true);
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle> Question Types</DialogTitle>
        </DialogHeader>
        <ul className="flex gap-4 flex-wrap py-5">
          {QuestionTypeOptions.map((option) => (
            <div
              className="border rounded-2xl px-5 py-2 text-lg hover:cursor-pointer shadow hover:bg-neutral-hover "
              key={option.value}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </ul>
        {selectedQType && isOpenQuestion && (
          <CreateQuestionTypes
            isOpen={isOpenQuestion}
            onClose={() => setIsOpenQuestion(false)}
            defaultOptions={defaultOptions}
            selectedQType={selectedQType}
            onCloseAll={() => {
              setIsOpenQuestion(false);
              onClose();
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LoadQuestionTypes;
