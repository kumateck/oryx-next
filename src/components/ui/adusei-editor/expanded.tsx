import { Button } from "../button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../dialog";
import AduseiEditor from "./editor";
import { SuggestionProps } from "./suggestion";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  placeholder?: string;
  autoFocus?: boolean;
  editorValue: string;
  handleOnChange: (value: string) => void;
  suggestions?: SuggestionProps[];
}
const ExpandedEditor = ({
  isOpen,
  onClose,
  title,
  placeholder,
  autoFocus,
  editorValue,
  handleOnChange,
  suggestions,
}: Props) => {
  const handleModalChange = (value: string) => {
    handleOnChange(value); // Directly update main state
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        onClose();
      }}
    >
      <DialogContent className="max-w-[1200px] space-y-5" noClose>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="max-h-[700px] overflow-y-auto py-5">
          <AduseiEditor
            placeholder={placeholder}
            autoFocus={autoFocus}
            value={editorValue}
            onChange={handleModalChange} // Update main state directly
            suggestions={suggestions ?? []}
            isExpanded={isOpen}
          />
        </div>
        <DialogFooter className="justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => {
              onClose();
            }}
            variant="default"
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default ExpandedEditor;
