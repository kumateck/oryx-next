import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import React from "react";
import { Control, FieldErrors, FieldValues, useForm } from "react-hook-form";
import { DelegateApprovalRequestDto, DelegateApprovalValidator } from "./types";
import { FormWizard } from "@/components/form-inputs";
import { InputTypes } from "@/lib";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}
function DelegateApproval({ open, setOpen }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DelegateApprovalRequestDto>({
    resolver: DelegateApprovalValidator,
  });

  const onSubmit = (data: DelegateApprovalRequestDto) => {
    console.log("Submitted Data:", data);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delegate Approval</DialogTitle>
        </DialogHeader>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <DelegateApprovalForm control={control} errors={errors} />
          <DialogFooter className="flex gap-2">
            <Button
              variant="ghost"
              type="button"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default DelegateApproval;

interface DelegateApprovalFormProps<
  TFieldValues extends FieldValues,
  TContext,
> {
  control: Control<TFieldValues, TContext>;
  errors: FieldErrors<TFieldValues>;
}

const DelegateApprovalForm = <TFieldValues extends FieldValues, TContext>({
  control,
  errors,
}: DelegateApprovalFormProps<TFieldValues, TContext>) => {
  return (
    <>
      <div className="flex w-full gap-2">
        <FormWizard
          config={[
            {
              label: "Start Date",
              control: control as Control,
              type: InputTypes.DATE,
              name: `startDate`,
              required: true,
              placeholder: "Select start date",
              errors,
            },
          ]}
        />
        <FormWizard
          config={[
            {
              label: "End Date",
              control: control as Control,
              type: InputTypes.DATE,
              name: "endDate",
              required: true,
              placeholder: "Select end date",
              errors,
            },
          ]}
        />
      </div>
      <FormWizard
        config={[
          {
            label: "Designated User",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "user",
            required: true,
            placeholder: "Select designated user",
            options: [],
            errors,
          },
        ]}
      />
    </>
  );
};
