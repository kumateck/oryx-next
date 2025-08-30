"use client";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";
import React, { useState } from "react";
import StaffTotalReport from "./table";
import DropdownBtns from "@/shared/btns/drop-btn";
import {
  StaffTotalReportRead,
  useLazyGetApiV1ReportStaffTotalReportQuery,
} from "@/lib/redux/api/openapi.generated";
import LoadingTable from "../tableSkeleton";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  Icon,
} from "@/components/ui";
import { FilterFormValues, FilterValidator } from "../type";
import { useForm } from "react-hook-form";
import { ErrorResponse, isErrorResponse } from "@/lib";
import { toast } from "sonner";
import FilterForm from "../filterForm";
import PrintPreview from "../print-preview";

function Index() {
  const [loadReports, { data, isLoading }] =
    useLazyGetApiV1ReportStaffTotalReportQuery({});
  const [open, setOpen] = useState(false);
  const [openPrint, setOpenPrint] = useState(false);

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
  if (isLoading) {
    return <LoadingTable pagetitle="Staff Total Report" />;
  }
  return (
    <ScrollablePageWrapper className="space-y-4">
      {openPrint && (
        <PrintPreview
          isLoading={false}
          onClose={() => setOpenPrint(false)}
          isOpen={openPrint}
          title="Staff Total Report"
        >
          <StaffTotalReport data={data ?? ([] as StaffTotalReportRead)} />
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
      <div className="w-full flex items-center justify-between gap-4">
        <PageTitle title="Staff Total Report" />
        <div className="flex items-center gap-2">
          <Button onClick={() => setOpen(true)}>Filter</Button>
          <DropdownBtns
            variant="default"
            icon="Download"
            title="Export"
            menus={[
              {
                name: "PDF File",
                onClick: () => {
                  if (!data?.departments || data.departments.length === 0) {
                    toast.warning("No data available to print");
                    return;
                  }
                  setOpenPrint(true);
                },
              },
            ]}
          />
        </div>
      </div>
      <StaffTotalReport data={data ?? ([] as StaffTotalReportRead)} />
    </ScrollablePageWrapper>
  );
}

export default Index;
