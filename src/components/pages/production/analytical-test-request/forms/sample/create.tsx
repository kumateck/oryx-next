import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Icon,
} from "@/components/ui";
import React from "react";
import { useForm } from "react-hook-form";
import SampleForm from "./form";
import { CreateATRDto, CreateATRValidator } from "./types";
import { usePutApiV1QaAnalyticalTestsByIdMutation } from "@/lib/redux/api/openapi.generated";
import { toast } from "sonner";
import ThrowErrorMessage from "@/lib/throw-error";
import { AnalyticalTestRequestStatus } from "@/lib";
import { useDispatch } from "react-redux";
import { commonActions } from "@/lib/redux/slices/common";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  id: string; // Assuming you have an ID to update
}
export const TakeSample = ({ isOpen, onClose, id }: Props) => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<CreateATRDto>({
    resolver: CreateATRValidator,
  });
  const [updateMutation, { isLoading }] =
    usePutApiV1QaAnalyticalTestsByIdMutation();
  const onSubmit = async (data: CreateATRDto) => {
    try {
      // Call the API to create the service provider
      await updateMutation({
        // Assuming you have an ID to update
        id,
        createAnalyticalTestRequest: {
          sampledQuantity: data.sampledQuantity,
          status: AnalyticalTestRequestStatus.Sampled,
          // containerSampled: data.containerSampled,
        },
      });
      toast.success("ATR Sampled Taken successfully");
      dispatch(commonActions.setTriggerReload());
      reset();
      onClose();
    } catch (error) {
      ThrowErrorMessage(error);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Take Sample</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SampleForm register={register} errors={errors} />
          <DialogFooter className="justify-end gap-4 py-6">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>

            <Button variant={"default"} className="flex items-center gap-2">
              {isLoading ? (
                <Icon name="LoaderCircle" className="animate-spin" />
              ) : (
                <Icon name={"Plus"} />
              )}
              <span>Save</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
