import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import { Option, QuestionType } from "@/lib";

import ExpressionQuestionForm from "./expression-form";
import OtherForm from "./other-form";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCloseAll: () => void;
  defaultOptions: { name: string }[] | [];
  selectedQType: Option;
}
const CreateQuestionTypes = ({
  isOpen,
  onClose,
  onCloseAll,
  defaultOptions,
  selectedQType,
}: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Question</DialogTitle>
        </DialogHeader>
        {Number(selectedQType.value) === QuestionType.Formular ? (
          <ExpressionQuestionForm
            selectedQType={selectedQType}
            onClose={onClose}
            onCloseAll={onCloseAll}
          />
        ) : (
          <OtherForm
            defaultOptions={defaultOptions}
            selectedQType={selectedQType}
            onClose={onClose}
            onCloseAll={onCloseAll}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateQuestionTypes;
