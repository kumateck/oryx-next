import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  Icon,
  Input,
} from "@/components/ui";
import {
  QuestionDto,
  QuestionDtoIEnumerablePaginateable,
  useLazyGetApiV1FormQuestionQuery,
} from "@/lib/redux/api/openapi.generated";
import { cn } from "@/lib/utils";

interface Props {
  questions: QuestionDto[];
  setQuestions: React.Dispatch<React.SetStateAction<QuestionDto[]>>;
  isOpen: boolean;
  onClose: () => void;
}

const AddQuestions = ({ questions, setQuestions, isOpen, onClose }: Props) => {
  const [state, setState] = useState<QuestionDtoIEnumerablePaginateable>(); // Set initial state to null
  const [loadQuestions, { isLoading, isFetching }] =
    useLazyGetApiV1FormQuestionQuery();
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [isLoadingFirst, setIsLoadingFirst] = useState(false); // Track if an item is deleted
  const debouncedSearchTerm = useDebounce(searchInput, 300);

  useEffect(() => {
    LoadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, debouncedSearchTerm]);

  const LoadData = async () => {
    if (page === 1) {
      setIsLoadingFirst(true);
    }
    const response = await loadQuestions({
      pageSize: 30,
      page,
      searchQuery: searchInput,
    }).unwrap();
    const results = response?.data;

    setState((prevState) => {
      if (searchInput) {
        return { ...response, data: results || [] };
      }
      if (!prevState) {
        // Reset state if it's the first load or after deletion
        return { ...response, data: results || [] };
      }
      // Append new data to the existing state
      return {
        ...response,
        data: [...(prevState.data || []), ...(results || [])],
      };
    });
    setIsLoadingFirst(false);
  };

  const handleCheckboxChange = (item: QuestionDto) => {
    setQuestions((prevSelected) => {
      const res = prevSelected?.some((opt) => opt?.id === item.id)
        ? prevSelected?.filter((opt) => opt?.id !== item.id)
        : [...prevSelected, item];

      return res;
    });
  };

  const capitalizeFirstWord = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-200 w-200">
        <DialogHeader>
          <span className="font-Medium text-2xl text-neutral-900">
            Add Questions
          </span>
        </DialogHeader>

        <div className="max-w-xs">
          <Input
            prefix="Search"
            prefixClass="text-neutral-400"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search"
          />
        </div>
        <div
          className="w-full"
          id="scrollableDiv"
          style={{
            height: "calc(100vh - 250px)",
            overflow: "auto",
          }}
        >
          {isLoadingFirst && (
            <div className="flex h-full w-full items-center justify-center">
              <Icon name="LoaderCircle" className="h-8 w-8 animate-spin" />
            </div>
          )}
          <InfiniteScroll
            className="h-full w-full space-y-2 pr-4"
            scrollableTarget="scrollableDiv"
            dataLength={state?.data?.length || 0}
            next={() => {
              setPage(page + 1);
            }}
            hasMore={
              (state?.data?.length || 0) < (state?.totalRecordCount || 0)
            }
            loader={
              isLoading || isFetching ? (
                <Icon name="LoaderCircle" className="h-5 w-5 animate-spin" />
              ) : null
            }
            endMessage={<p>{!isLoading && !isFetching && ""}</p>}
          >
            {state?.data?.map((item, index) => (
              <label
                htmlFor={item.id}
                className={cn(
                  "text-primary-500 flex w-full cursor-pointer items-center justify-start gap-4 rounded-md border border-neutral-200 bg-background px-8 py-4 text-sm shadow-sm",
                  {
                    "border-secondary-500": questions.some(
                      (opt) => opt.id === item.id,
                    ),
                  },
                )}
                key={index}
              >
                <Checkbox
                  value={item.id}
                  checked={questions.some((opt) => opt.id === item.id)}
                  id={item.id}
                  onCheckedChange={() => {
                    const payload = {
                      id: item.id,
                      label: item.label,
                      type: item.type,
                      options:
                        item?.options?.map((item) => ({
                          name: item.name,
                        })) || [],
                      // required: false,
                    } satisfies QuestionDto;

                    handleCheckboxChange(payload);
                  }}
                />
                <div className="space-y-1">
                  <span className="block">
                    {capitalizeFirstWord(item?.label ?? "")}
                  </span>
                  <span className="text-sm text-neutral-400">{item?.type}</span>
                </div>
              </label>
            ))}
          </InfiniteScroll>
        </div>
        <DialogFooter>
          <div className="flex w-full items-center justify-end gap-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={onClose}
              type="button"
              variant={"default"}
              className="flex items-center gap-2"
            >
              <span>Add Selected Question</span>
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddQuestions;
