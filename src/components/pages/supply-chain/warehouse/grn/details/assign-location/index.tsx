"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Icon,
} from "@/components/ui";
import { ErrorResponse, Option, isErrorResponse } from "@/lib";
import { useGetApiV1WarehouseRackQuery } from "@/lib/redux/api/openapi.generated";

import AssignLocationForm from "./form";
import { LocationRequestDto, LocationValidator } from "./type";

interface AssignLocationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const AssignLocationDialog = ({
  open,
  onOpenChange,
  onSuccess,
}: AssignLocationDialogProps) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm<LocationRequestDto>({
    resolver: LocationValidator,
    mode: "onSubmit", // Changed to onSubmit for better validation timing
    defaultValues: {
      locations: [], // Start with empty array for dynamic fields
    },
  });

  const { data: racks } = useGetApiV1WarehouseRackQuery({
    page: 1,
    pageSize: 100,
  });

  const rackOptions = racks?.data?.map((item) => ({
    label: `${item?.warehouseLocation?.name}-${item.name}`,
    value: item.id,
  })) as Option[];

  const handleAssignLocation = async (data: LocationRequestDto) => {
    try {
      if (!(await trigger())) return; // Manually trigger validation
      console.log("Submitted Data::", data);
      toast.success("Location assigned successfully");
      onSuccess();
      handleClose();
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  const handleClose = () => {
    reset(); // Reset form values
    onOpenChange(false);
  };

  useEffect(() => {
    if (!open) reset(); // Reset form when closing
  }, [open, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[80vh] min-h-[400px] max-w-2xl flex-col">
        <DialogTitle>Assign Location</DialogTitle>

        <form
          onSubmit={handleSubmit(handleAssignLocation)}
          className="flex flex-1 flex-col overflow-hidden"
        >
          <div className="flex-1 overflow-y-auto">
            <AssignLocationForm
              control={control}
              register={register}
              errors={errors}
              rackOptions={rackOptions}
            />
          </div>

          {/* Fixed footer */}
          <div className="sticky bottom-0 bg-background pt-4">
            <div className="flex justify-end gap-2 border-t pt-4">
              <Button type="button" variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" className="flex items-center gap-2">
                <Icon name="Plus" className="h-4 w-4" />
                <span>Assign</span>
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AssignLocationDialog;
