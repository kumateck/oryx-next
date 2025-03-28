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
  DialogTitle,
  Icon,
  Input,
} from "@/components/ui";
import { QuestionType } from "@/lib";
import {
  QuestionDto,
  QuestionDtoRead,
  useLazyGetApiV1FormQuestionQuery,
} from "@/lib/redux/api/openapi.generated";
import { cn, splitWords } from "@/lib/utils";

import { templateQuestions } from "./type";

interface Props {
  questions: QuestionDto[];
  setQuestions: React.Dispatch<React.SetStateAction<templateQuestions[]>>;
  isOpen: boolean;
  onClose: () => void;
}
const PAGE_SIZE = 10; // or whatever your API page size is

const AddQuestions = ({ questions, setQuestions, isOpen, onClose }: Props) => {
  const [state, setState] = useState<QuestionDtoRead[]>([]); // Set initial state to null
  const [loadQuestions, { isLoading, isFetching }] =
    useLazyGetApiV1FormQuestionQuery();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [searchInput, setSearchInput] = useState("");

  const debouncedSearchTerm = useDebounce(searchInput, 300);

  const fetchInitialQuestions = async () => {
    setPage(1);
    setState([]);
    await fetchQuestions();
  };
  useEffect(() => {
    fetchInitialQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);
  // Function to fetch questions based on the current page
  const fetchQuestions = async () => {
    try {
      // Assuming your query accepts a page parameter (adjust if necessary)
      const response = await loadQuestions({
        page,
        searchQuery: debouncedSearchTerm,
      }).unwrap();
      const loadedQuestions = response.data || [];

      // Append new questions to the existing list
      setState((prevQuestions) => {
        const existingIds = new Set(prevQuestions.map((q) => q.id));
        const uniqueQuestions = loadedQuestions.filter(
          (q) => !existingIds.has(q.id),
        );
        return [...prevQuestions, ...uniqueQuestions];
      });

      // Increase the page count for the next fetch
      setPage((prevPage) => prevPage + 1);

      // If the number of returned questions is less than PAGE_SIZE, there are no more questions to load
      if (loadedQuestions?.length < PAGE_SIZE) {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error loading questions:", err);
      setHasMore(false);
    }
  };
  // const LoadData = async () => {
  //   if (page === 1) {
  //     setIsLoadingFirst(true);
  //   }
  //   const response = await loadQuestions({
  //     pageSize: 30,
  //     page,
  //     searchQuery: searchInput,
  //   }).unwrap();
  //   const results = response?.data;

  //   setState((prevState) => {
  //     if (searchInput) {
  //       return { ...response, data: results || [] };
  //     }
  //     if (!prevState) {
  //       // Reset state if it's the first load or after deletion
  //       return { ...response, data: results || [] };
  //     }
  //     // Append new data to the existing state
  //     return {
  //       ...response,
  //       data: [...(prevState.data || []), ...(results || [])],
  //     };
  //   });
  //   setIsLoadingFirst(false);
  // };

  const handleCheckboxChange = (item: templateQuestions) => {
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
          <DialogTitle className="font-Medium text-2xl text-neutral-default">
            Add Questions
          </DialogTitle>
        </DialogHeader>

        <div className="max-w-xs">
          <Input
            prefix="Search"
            prefixClass="text-neutral-default"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search"
          />
        </div>
        <div
          className="w-full"
          id="scrollableDiv"
          style={{
            height: "calc(100vh - 500px)",
            overflow: "auto",
          }}
        >
          <InfiniteScroll
            className="h-full w-full space-y-2 pr-4"
            scrollableTarget="scrollableDiv"
            dataLength={state?.length || 0}
            next={fetchQuestions}
            hasMore={hasMore}
            loader={
              isLoading || isFetching ? (
                <Icon name="LoaderCircle" className="h-5 w-5 animate-spin" />
              ) : null
            }
            endMessage={<p></p>}
          >
            {state?.map((item, index) => (
              <label
                htmlFor={item.id}
                className={cn(
                  "flex w-full cursor-pointer items-center justify-start gap-4 rounded-2xl border border-neutral-200 bg-background px-8 py-4 text-sm text-primary-default shadow-sm",
                  {
                    "border-neutral-default": questions.some(
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
                      id: item.id as string,
                      label: item.label as string,
                      type: Number(item.type),
                      options:
                        item?.options?.map((item) => ({
                          name: item.name as string,
                        })) || [],
                      required: false,
                    } satisfies templateQuestions;

                    handleCheckboxChange(payload);
                  }}
                />
                <div className="space-y-1">
                  <span className="block">
                    {capitalizeFirstWord(item?.label ?? "")}
                  </span>
                  <span className="text-sm text-neutral-400">
                    {splitWords(QuestionType[Number(item?.type)])}
                  </span>
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
