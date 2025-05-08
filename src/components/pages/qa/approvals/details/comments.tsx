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

import {
  ApprovalRequestBody,
  usePostApiV1ApprovalApproveByModelTypeAndModelIdMutation,
  usePostApiV1ApprovalRejectByModelTypeAndModelIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { ErrorResponse, cn, isErrorResponse, splitWords } from "@/lib/utils";

import { CreateCommentValidator, CommentRequestDto } from "./types";
import ApprovalForm from "./form";
import { useRouter } from "next/navigation";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  type: string;
  action: "approve" | "reject";
}
const Comments = ({ isOpen, onClose, id, type, action }: Props) => {
  const [approveRequest, { isLoading: isApproving }] =
    usePostApiV1ApprovalApproveByModelTypeAndModelIdMutation();
  const [rejectRequest, { isLoading: isRejecting }] =
    usePostApiV1ApprovalRejectByModelTypeAndModelIdMutation();
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
      if (action === "approve") {
        await approveRequest({
          modelId: id,
          modelType: type,
          approvalRequestBody: payload,
        }).unwrap();
        toast.success("Request approved successfully");
      } else {
        await rejectRequest({
          modelId: id,
          modelType: type,
          approvalRequestBody: payload,
        }).unwrap();
        toast.success("Request rejected successfully");
      }
      reset();
      onClose();
      router.push("/qa/pending-approvals");
    } catch (error) {
      console.error("Error approving request:", error);
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {action === "approve" ? "Approve" : "Reject"} {splitWords(type)}
          </DialogTitle>
        </DialogHeader>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <ApprovalForm register={register} control={control} errors={errors} />
          <DialogFooter className="justify-end gap-4 py-6">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>

            <Button
              type="submit"
              variant={action === "approve" ? "default" : "destructive"}
              className="flex items-center gap-2"
            >
              <Icon
                name={
                  action === "approve"
                    ? isApproving
                      ? "LoaderCircle"
                      : "Plus"
                    : isRejecting
                      ? "LoaderCircle"
                      : "X"
                }
                className={cn("h-4 w-4", {
                  "animate-spin": isApproving || isRejecting,
                })}
              />
              <span>{action === "approve" ? "Approve" : "Reject"}</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Comments;
