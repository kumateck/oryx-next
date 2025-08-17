import {
  Button,
  Dialog,
  DialogFooter,
  DialogHeader,
  Icon,
  DialogTitle,
  DialogContent,
} from "@/components/ui";
import React from "react";
import IssueForm from "./issueForm";
import { IssueFormSchema, IssueFormValues } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import {
  ItemDto,
  usePostApiV1RequisitionIssueStockRequisitionByStockRequisitionIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { toast } from "sonner";
import { isErrorResponse, ErrorResponse, cn } from "@/lib";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: ItemDto;
  id: string;
}

function Issue({ isOpen, onClose, id }: Props) {
  const [IssueStockRequisition, { isLoading }] =
    usePostApiV1RequisitionIssueStockRequisitionByStockRequisitionIdMutation();
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<IssueFormValues>({
    resolver: zodResolver(IssueFormSchema),
  });
  const { fields } = useFieldArray({
    control,
    name: "products",
  });

  const onSubmit = (data: IssueFormValues) => {
    console.log("Submitting issue:", data);
    try {
      IssueStockRequisition({
        stockRequisitionId: id as string,
      }).unwrap();
      toast.success("Stock requisition issued successfully");
    } catch (error) {
      console.error("Error issuing stock requisition:", error);
      toast.error(
        isErrorResponse(error as ErrorResponse)?.description ||
          "Failed to issue stock requisition. Please try again.",
      );
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Issue Stock Requisition</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <IssueForm register={register} errors={errors} fields={fields} />
          <DialogFooter>
            <div className="flex items-center gap-2">
              <Button type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button disabled={isLoading} type="submit">
                <Icon
                  className={cn("h-4 w-4", {
                    "animate-spin": isLoading,
                  })}
                  name={isLoading ? "LoaderCircle" : "Check"}
                />
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default Issue;
