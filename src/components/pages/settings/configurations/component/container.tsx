import { icons } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button, Icon, Skeleton } from "@/components/ui";
import { FormOption } from "@/lib";

import { FormOptionNode } from "./node";

interface Props {
  formOptions: FormOption[];
  refetchFormOptions: () => unknown;
  title: string;
  icon: keyof typeof icons;
  isLoading?: boolean;
  modelType: string;
  dropDownType: string;
  // setActiveComponent: React.Dispatch<React.SetStateAction<string>>;
}
export const FormOptionContainer = ({
  formOptions,
  title,
  icon,
  isLoading,
  modelType,
  dropDownType,
  refetchFormOptions,
}: Props) => {
  const [editMode, setEditMode] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [itemCount, setItemCount] = useState(0);
  useEffect(() => {
    if (editMode === false) {
      setFocusedId(null);
    }

    setItemCount(formOptions.length || 10);
  }, [editMode, formOptions.length]);

  return (
    <div className="space-y-6 rounded-lg border border-neutral-200 bg-white px-10 py-7">
      <div className="flex justify-between">
        <div className="font-Bold flex items-center justify-center gap-1">
          <Icon name={icon} className="" size={20} />
          <span className="text-lg">{title}</span>
        </div>

        {/* actions */}
        <div className="flex gap-2">
          <Button
            className="h-fit gap-2 px-4 py-2 text-sm text-neutral-700"
            variant="outline"
            size="sm"
            onClick={() => {
              setEditMode(!editMode);
            }}
          >
            {editMode ? (
              <Icon name="Import" size={20} />
            ) : (
              <Icon name="Pencil" size={20} />
            )}
            {editMode ? "Done" : "Edit"}
          </Button>
          <Button
            className="h-fit gap-2 px-4 py-2 text-sm"
            variant="secondary"
            size="sm"
            onClick={() => setCreateMode(true)}
          >
            <Icon name="Plus" size={20} />
            Create New
          </Button>
        </div>
      </div>

      <div className="">
        {isLoading && (
          <div className="brand-scrollbar flex max-h-[400px] w-full flex-wrap gap-2 overflow-y-auto">
            {Array.from({ length: itemCount }, (_, index) => index + 1)?.map(
              (x) => <Skeleton key={x} className="h-10 w-[8ch]" />,
            )}
          </div>
        )}
      </div>
      <div className="brand-scrollbar flex max-h-[230px] flex-wrap gap-2 overflow-y-auto">
        {createMode && (
          <FormOptionNode
            modelType={modelType}
            dropDownType={dropDownType}
            createMode={true}
            editMode={false}
            id=""
            name=""
            onCreate={() => {
              toast.success("Added Successfully");
              setCreateMode(false);
              refetchFormOptions();
            }}
            onDelete={() => setCreateMode(false)}
            onUpdate={refetchFormOptions}
            cancelCreating={() => setCreateMode(false)}
          />
        )}
        {formOptions.map((formOption, idx) => {
          return (
            <div
              key={idx}
              onClick={() => editMode && setFocusedId(formOption.id)}
            >
              <FormOptionNode
                modelType={modelType}
                dropDownType={dropDownType}
                onDelete={() => {
                  toast.success("Deleted Successfully");
                  refetchFormOptions();
                }}
                onUpdate={() => {
                  toast.success("Updated Successfully");
                  setFocusedId(null);
                  refetchFormOptions();
                }}
                onCancelEditing={() => {
                  setFocusedId(null);
                }}
                key={formOption.id}
                editMode={focusedId === formOption.id && editMode}
                allowEdit={editMode}
                createMode={false}
                {...formOption}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
