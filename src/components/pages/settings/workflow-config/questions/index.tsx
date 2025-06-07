import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import { ConfirmDeleteDialog, Icon } from "@/components/ui";
import { ErrorResponse, QuestionType, isErrorResponse } from "@/lib";
import {
  QuestionDto,
  useDeleteApiV1FormQuestionByQuestionIdMutation,
  useLazyGetApiV1FormQuestionQuery,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { useSelector } from "@/lib/redux/store";

import QuestionCard from "./card";
import EditQuestionTypes from "./question-types/edit";
import { QuestionRequestDto } from "./question-types/type";

const PAGE_SIZE = 10; // or whatever your API page size is

const QuestionCards = () => {
  const dispatch = useDispatch();
  const triggerReload = useSelector((state) => state.common.triggerReload);
  const [loadQuestions, { isLoading, isFetching }] =
    useLazyGetApiV1FormQuestionQuery();
  const [deleteMutation, { isLoading: isDeleting }] =
    useDeleteApiV1FormQuestionByQuestionIdMutation();
  const [page, setPage] = useState(1);
  const [questions, setQuestions] = useState<QuestionDto[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [details, setDetails] = useState<QuestionRequestDto>();

  const fetchInitialQuestions = async () => {
    setPage(1);
    setQuestions([]);
    await fetchQuestions();
  };
  // Function to fetch questions based on the current page
  const fetchQuestions = async () => {
    try {
      // Assuming your query accepts a page parameter (adjust if necessary)
      const response = await loadQuestions({
        page,
        pageSize: PAGE_SIZE,
      }).unwrap();
      const loadedQuestions = response.data || [];

      // Append new questions to the existing list
      setQuestions((prevQuestions) => {
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
  // Load initial questions when component mounts
  useEffect(() => {
    fetchInitialQuestions();

    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerReload]);

  const onEdit = (details: QuestionDto) => {
    const payload = {
      id: details.id,
      label: details.label as string,
      type: {
        value: Number(details.type)?.toString(),
        label: QuestionType[Number(details.type)],
      },
      isMultiSelect: details.isMultiSelect,
      options:
        details?.options?.map((item) => ({ name: item.name as string })) || [],
    } satisfies QuestionRequestDto;
    setDetails(payload);
    setIsOpen(true);
  };
  const onDelete = async () => {
    try {
      await deleteMutation({
        questionId: selectedId as string,
      }).unwrap();
      toast.success("Deleted Successfully");
      dispatch(commonActions.setTriggerReload());
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };
  return (
    <div
      className="w-full"
      id="scrollableDiv"
      style={{
        height: "calc(100vh - 150px)",
        overflow: "auto",
      }}
    >
      <InfiniteScroll
        scrollableTarget="scrollableDiv"
        className="h-full w-full space-y-2 pb-20"
        dataLength={questions.length}
        next={fetchQuestions}
        hasMore={hasMore}
        loader={
          isLoading || isFetching ? (
            <Icon name="LoaderCircle" className="h-5 w-5 animate-spin" />
          ) : null
        }
        endMessage={<p></p>}
      >
        {questions.map((question, index) => (
          <QuestionCard
            key={index}
            number={index + 1}
            question={question}
            onEdit={onEdit}
            isDeleting={selectedId === question.id && isDeleting}
            onDelete={(id) => {
              setIsOpenConfirm(true);
              setSelectedId(id);
            }}
          />
        ))}
      </InfiniteScroll>
      {isOpen && details && (
        <EditQuestionTypes
          details={details}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
      <ConfirmDeleteDialog
        open={isOpenConfirm}
        onClose={() => setIsOpenConfirm(false)}
        onConfirm={onDelete}
      />
    </div>
  );
};

export default QuestionCards;
