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
import { SampleForm } from "./sampleForm";

interface Props {
  open: boolean;
  onClose: () => void;
}
export const CreateSample = ({ open, onClose }: Props) => {
  const {
    register,
    control,
    formState: { errors },
  } = useForm({});
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Sample</DialogTitle>
        </DialogHeader>
        <form>
          <SampleForm control={control} register={register} errors={errors} />
          <DialogFooter className="justify-end gap-4 py-6">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>

            <Button variant={"default"} className="flex items-center gap-2">
              <Icon
                name={"Plus"}
                // className={cn("h-4 w-4", {
                //   "animate-spin": isLoading,
                // })}
              />
              <span>Save</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
