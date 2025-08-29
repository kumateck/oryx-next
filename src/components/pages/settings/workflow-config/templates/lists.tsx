import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import { ConfirmDeleteDialog, Icon } from "@/components/ui";
import { ErrorResponse, isErrorResponse } from "@/lib";
import {
  FormDto,
  FormType,
  useDeleteApiV1FormByFormIdMutation,
  useLazyGetApiV1FormQuery,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { useSelector } from "@/lib/redux/store";

import TemplateCard from "./card";
import PageWrapper from "@/components/layout/wrapper";
import { useDebounce } from "@uidotdev/usehooks";

const PAGE_SIZE = 30; // or whatever your API page size is
interface Props {
  type?: FormType;
}
const TemplateCards = ({ type }: Props) => {
  const [hasMore, setHasMore] = useState(true);
  const triggerReload = useSelector((state) => state.common.triggerReload);
  const searchValue = useSelector((state) => state.common.searchInput);
  const debouncedValue = useDebounce(searchValue, 500);

  const [workflowForms, setWorkflowForms] = useState<FormDto[]>([]);
  // const [state, setState] = useState<TResult<FormTemplate> | null>();
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>();

  const [deleteMutation, { isLoading: isDeleting }] =
    useDeleteApiV1FormByFormIdMutation();
  // const [loadTemplates] = restApi.useLazyGetFormForTemplatesQuery();
  // const searchInput = useSelector((state) => state.common.searchInput);
  // const selectedFormType = useSelector((state) => state.common.formTypes);
  const dispatch = useDispatch();
  const [loadTemplates, { isLoading, isFetching }] = useLazyGetApiV1FormQuery();
  // const [loadTemplatesByFormType] =
  //   restApi.useLazyGetFormForTemplatesByFormTypeQuery();
  const [page, setPage] = useState(1);

  const fetchInitialWorkflows = async () => {
    setPage(1);
    setWorkflowForms([]);
    await fetchWorkflows();
  };
  const fetchWorkflows = async () => {
    try {
      // Assuming your query accepts a page parameter (adjust if necessary)
      const response = await loadTemplates({
        page,
        pageSize: PAGE_SIZE,
        searchQuery: debouncedValue,
        type,
      }).unwrap();
      const loadedQuestions = response.data || [];

      // Append new questions to the existing list
      setWorkflowForms((workflowForms) => {
        const existingIds = new Set(workflowForms.map((q) => q.id));
        const uniqueForms = loadedQuestions.filter(
          (q) => !existingIds.has(q.id),
        );
        return [...workflowForms, ...uniqueForms];
      });

      // Increase the page count for the next fetch
      setPage((prevPage) => prevPage + 1);

      // If the number of returned questions is less than PAGE_SIZE, there are no more questions to load
      if (loadedQuestions?.length < PAGE_SIZE) {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error loading forms:", err);
      setHasMore(false);
    }
  };
  // // Load initial questions when component mounts
  // useEffect(() => {
  //   fetchInitialWorkflows();

  //   if (triggerReload) {
  //     dispatch(commonActions.unSetTriggerReload());
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [triggerReload, type]);

  useEffect(() => {
    // Reset everything when type or triggerReload changes
    setPage(1);
    setWorkflowForms([]);
    setHasMore(true);
    fetchInitialWorkflows();

    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerReload, type]); // 👈 add type here

  const onDelete = async () => {
    try {
      await deleteMutation({
        formId: selectedTemplateId as string,
      }).unwrap();
      dispatch(commonActions.setTriggerReload());
      toast.success("Deleted Successfully");
    } catch (error) {
      console.log(error);
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };
  return (
    <PageWrapper className="space-y-5">
      <div
        className="w-full"
        id="scrollableDiv"
        style={{
          height: "calc(100vh - 150px)",
          overflow: "auto",
        }}
      >
        <InfiniteScroll
          className="h-full w-full pr-4"
          scrollableTarget="scrollableDiv"
          dataLength={workflowForms.length}
          next={fetchWorkflows}
          hasMore={hasMore}
          loader={
            isLoading || isFetching ? (
              <Icon name="LoaderCircle" className="h-5 w-5 animate-spin" />
            ) : null
          }
          endMessage={<p>{!isLoading && !isFetching && ""}</p>}
        >
          {workflowForms?.map((item, index) => (
            <TemplateCard
              key={index}
              number={index + 1}
              template={item}
              onDelete={(id) => {
                setOpenDeleteModal(true);
                setSelectedTemplateId(id);
              }}
              isDeleting={selectedTemplateId === item.id && isDeleting}
            />
          ))}
        </InfiniteScroll>
      </div>
      <ConfirmDeleteDialog
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={onDelete}
      />
    </PageWrapper>
  );
};
export default TemplateCards;
