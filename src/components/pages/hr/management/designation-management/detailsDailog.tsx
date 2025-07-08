import { Dialog, DialogContent, DialogHeader } from "@/components/ui";
import { DesignationDto } from "@/lib/redux/api/openapi.generated";
import { DialogTitle } from "@radix-ui/react-dialog";
import React from "react";

interface Props {
  open: boolean;
  setOpen: () => void;
  designation: DesignationDto;
}
export function DetailsDialog({ open, setOpen, designation }: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl w-full">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {designation.name}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-wrap items-start justify-start gap-6">
          <p className="flex items-center justify-start gap-1">
            <span className="whitespace-nowrap">Designation Name:</span>
            <span className="whitespace-nowrap font-semibold">
              {designation.name}
            </span>
          </p>
          <p className="flex items-center justify-start gap-1">
            <span className="whitespace-nowrap">Associated Department:</span>
            <span className="whitespace-nowrap font-semibold">
              {designation?.departments?.map((d) => d.name).join(", ")}
            </span>
          </p>
          <p className="flex items-center justify-start gap-1">
            <span className="whitespace-nowrap">
              Paid Leave Days entitlement:
            </span>
            <span className="whitespace-nowrap font-semibold">
              {designation?.maximumLeaveDays} days
            </span>
          </p>
          <p className="flex items-center justify-start gap-1">
            <span className="whitespace-nowrap">Description:</span>
            <div
              className="whitespace-nowrap font-semibold"
              dangerouslySetInnerHTML={{
                __html: designation?.description ?? "",
              }}
            ></div>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
