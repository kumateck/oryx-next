import { Dialog, DialogContent, DialogTitle } from "@/components/ui";
import React from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

interface FilterFormProps<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  open: boolean;
  setOpen: (open: boolean) => void;
}
const FilterForm = <TFieldValues extends FieldValues, TContext>({
  open,
  setOpen,
}: FilterFormProps<TFieldValues, TContext>) => {
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent>
        <DialogTitle>Filter</DialogTitle>
      </DialogContent>
    </Dialog>
  );
};

export default FilterForm;
