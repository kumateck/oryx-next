import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui";
import { LeaveTypeDto } from "@/lib/redux/api/openapi.generated";
import { DialogTitle } from "@radix-ui/react-dialog";
import React from "react";

interface Props {
  open: boolean;
  setOpen: () => void;
  leaveType: LeaveTypeDto;
}
export function DetailsDialog({ open, setOpen, leaveType }: Props) {
  //TODO: CALL THE API TO GET THE LEAVE TYPE DETAILS
  console.log(leaveType);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl w-full">
        <DialogHeader>
          <DialogTitle>{leaveType.name}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col md:flex-row w-full items-center justify-between gap-5">
          <div className="flex items-center justify-start gap-1">
            <div className="text-gray-600 whitespace-nowrap">Paid Leave:</div>
            <div className="font-semibold text-gray-800">
              {leaveType.isPaid ? "Yes" : "No"}
            </div>
          </div>
          <div className="flex items-center justify-start gap-1">
            <div className="text-gray-600 whitespace-nowrap">
              Deduct from balance:
            </div>
            <div className="font-semibold text-gray-800">
              {leaveType.deductFromBalance ? "Yes" : "No"}
            </div>
          </div>
          <div className="flex items-center justify-start gap-1">
            <div className="text-gray-600 whitespace-nowrap">
              Max leave duration:
            </div>
            <div className="font-semibold text-gray-800">
              {leaveType.numberOfDays} <span>Days</span>
            </div>
          </div>
        </div>
        <DialogFooter className="w-full">
          <div className="w-full">
            <p className="mr-auto font-semibold text-gray-800">
              Designation List
            </p>
            <div className="flex items-center justify-start">
              {leaveType?.designations?.map((designation) => (
                <span
                  key={designation.id}
                  className="flex items-center justify-center size-8 rounded-full bg-primary-default -ml-2 text-white font-semibold"
                >
                  {designation?.name?.[0]?.toUpperCase() ?? ""}
                </span>
              ))}
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
