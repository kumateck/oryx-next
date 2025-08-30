"use client";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  Icon,
} from "@/components/ui";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import DropdownBtns from "@/shared/btns/drop-btn";
import LeaveEntitlementTable from "./table";
import FilterForm from "../filterForm";
import { FilterFormValues, FilterValidator } from "../type";
import { useForm } from "react-hook-form";
import { useLazyGetApiV1ReportStaffLeaveReportQuery } from "@/lib/redux/api/openapi.generated";
import { ErrorResponse, isErrorResponse } from "@/lib";
import { toast } from "sonner";
import PrintPreview from "../print-preview";

function Index() {
  const [open, setOpen] = useState(false);
  const [openPrint, setOpenPrint] = useState(false);
  const router = useRouter();

  const [loadReports, { data, isLoading }] =
    useLazyGetApiV1ReportStaffLeaveReportQuery({});

  //use form
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FilterFormValues>({
    resolver: FilterValidator,
  });

  const onSubmit = async (data: FilterFormValues) => {
    setOpen(false);
    try {
      await loadReports({
        startDate: data.startDate?.toUTCString(),
        endDate: data.endDate?.toUTCString(),
      }).unwrap();
      reset();
    } catch (error) {
      toast.error(
        isErrorResponse(error as ErrorResponse)?.description ||
          "An error occurred",
      );
    }
  };
  return (
    <ScrollablePageWrapper className="space-y-6">
      {openPrint && (
        <PrintPreview
          isLoading={false}
          title="Leave Management Overview"
          onClose={() => setOpenPrint(false)}
          isOpen={openPrint}
        >
          <LeaveEntitlementTable data={data ?? {}} />
        </PrintPreview>
      )}
      <Dialog onOpenChange={() => setOpen(false)} open={open}>
        <DialogContent>
          <DialogTitle>Report Filter</DialogTitle>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FilterForm errors={errors} control={control} register={register} />
            <DialogFooter>
              <div className="flex ml-auto">
                <Button
                  // disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  <Icon
                    name="LoaderCircle"
                    className={`${isLoading ? "animate-spin flex" : "hidden"}`}
                  />
                  <span>Submit</span>
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon
            onClick={() => router.back()}
            name="ArrowLeft"
            className="cursor-pointer"
          />
          <PageTitle title="Leave Management Overview" />
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setOpen(true)}>Filter</Button>
          <DropdownBtns
            variant="default"
            icon="Download"
            title="Export"
            menus={[
              {
                name: "PDF File",
                onClick: () => setOpenPrint(true),
              },
            ]}
          />
        </div>
      </div>

      <LeaveEntitlementTable data={data ?? {}} />
    </ScrollablePageWrapper>
  );
}

export default Index;
