// import { useEffect, useState } from "react";
// import { DEFAULT_API_PAYLOAD } from "@/lib/constants";
// import { handleError } from "@/lib/error";
import { useState } from "react";

import { Skeleton } from "../skeleton";
import AduseiEditor from "./editor";
import ExpandedEditor from "./expanded";
import { SuggestionProps } from "./suggestion";

// import { restructureArrayToSuggestionProps } from "./type";

interface Props {
  onChange: (value: string) => void;
  defaultValue?: string;
  suggestions?: SuggestionProps[];
  title?: string;
  autoFocus?: boolean;
  placeholder?: string;
  className?: string;
  isLoading?: boolean;
}

const TheAduseiEditor = ({
  defaultValue,
  onChange,
  title,
  autoFocus,
  placeholder,
  className,
  suggestions,
  isLoading,
}: Props) => {
  // const [loadSuggestions, { isLoading }] = restApi.useGetSuggestionsMutation();
  const [editorValue, setEditorValue] = useState(defaultValue || "");
  // const [suggestions, setSuggestions] = useState<SuggestionProps[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // useEffect(() => {
  //   handleLoadSuggestions();

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const handleLoadSuggestions = async () => {
  //   try {
  //     const response = await loadSuggestions({
  //       ...DEFAULT_API_PAYLOAD,
  //       getLinkCollectionRequest: { types: [] },
  //     }).unwrap();
  //     const data = response.result || [];
  //     setSuggestions(restructureArrayToSuggestionProps(data));
  //   } catch (error) {
  //     handleError(error);
  //   }
  // };

  const handleOnChange = (value: string) => {
    setEditorValue(value);
    onChange(value); // Notify parent
  };

  return (
    <div className="w-full">
      {isLoading ? (
        <Skeleton className="min-h-64 w-full rounded-md border-neutral-input bg-white" />
      ) : (
        <div className="w-full">
          {!isOpen && (
            <AduseiEditor
              placeholder={placeholder}
              autoFocus={autoFocus}
              value={editorValue}
              onChange={handleOnChange}
              suggestions={suggestions ?? []}
              onExpand={() => setIsOpen(true)}
              isExpanded={isOpen}
              className={className}
            />
          )}
        </div>
      )}
      <ExpandedEditor
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title || ""}
        autoFocus={autoFocus}
        editorValue={editorValue}
        handleOnChange={handleOnChange} // Directly update main state
        suggestions={suggestions}
      />
    </div>
  );
};
export default TheAduseiEditor;
