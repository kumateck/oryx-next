import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Icon,
} from "@/components/ui";
import { Option, WarehouseType } from "@/lib";
import {
  ApprovalRequestBody,
  useLazyGetApiV1WarehouseLocationQuery,
  usePostApiV1ApprovalApproveByModelTypeAndModelIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { ErrorResponse, cn, isErrorResponse, splitWords } from "@/lib/utils";

import { CreateCommentValidator, CommentRequestDto } from "./types";
import ApprovalForm from "./form";
import { useRouter } from "next/navigation";

// import "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  type: string;
}
const Comments = ({ isOpen, onClose, id, type }: Props) => {
  const [approveRequest, { isLoading }] =
    usePostApiV1ApprovalApproveByModelTypeAndModelIdMutation();
  const router = useRouter();
  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<CommentRequestDto>({
    resolver: CreateCommentValidator,
    mode: "all",
  });

  const onSubmit = async (data: CommentRequestDto) => {
    try {
      const payload = {
        comments: data.comment,
      } satisfies ApprovalRequestBody;
      await approveRequest({
        modelId: id as string,
        modelType: type as string,
        approvalRequestBody: payload,
      }).unwrap();
      toast.success("Approval request approved successfully");
      reset(); // Reset the form after submission
      onClose(); // Close the form/modal if applicable
      router.push("/qa/pending-approvals");
    } catch (error) {
      console.error("Error approving request:", error);
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  const [
    loadLocations,
    { isFetching: isFetchingLocation, isLoading: isLoadingLocation },
  ] = useLazyGetApiV1WarehouseLocationQuery();
  const loadDataOrSearch = async (searchQuery: string, page: number) => {
    const res = await loadLocations({
      searchQuery,
      page,
    }).unwrap();
    const options = res?.data?.map((item) => ({
      label:
        item.name +
        `(${splitWords(WarehouseType[item.warehouse?.type as number])})`,
      value: item.id,
    })) as Option[];

    const response = {
      options,
      hasNext: (res?.pageIndex || 0) < (res?.stopPageIndex as number),
      hasPrevious: (res?.pageIndex as number) > 1,
    };
    return response;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Approve {splitWords(type)}</DialogTitle>
        </DialogHeader>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <ApprovalForm
            register={register}
            control={control}
            errors={errors}
            fetchOptions={loadDataOrSearch}
            isLoading={isLoadingLocation || isFetchingLocation}
          />
          <DialogFooter className="justify-end gap-4 py-6">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>

            <Button variant={"default"} className="flex items-center gap-2">
              <Icon
                name={isLoading ? "LoaderCircle" : "Plus"}
                className={cn("h-4 w-4", {
                  "animate-spin": isLoading,
                })}
              />
              <span>Save</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Comments;
