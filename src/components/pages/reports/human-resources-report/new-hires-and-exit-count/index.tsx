"use client";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import React, { useEffect, useState } from "react";
import { Table } from "./table";
import PageTitle from "@/shared/title";
import DropdownBtns from "@/shared/btns/drop-btn";
import FilterForm from "../filterForm";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  Icon,
} from "@/components/ui";
import { useForm } from "react-hook-form";
import { FilterFormValues, FilterValidator } from "../type";
import { ErrorResponse, isErrorResponse } from "@/lib";
import { toast } from "sonner";
import {
  EmployeeMovementReportDtoRead,
  useLazyGetApiV1ReportEmployeeMovementQuery,
} from "@/lib/redux/api/openapi.generated";
import LoadingTable from "../tableSkeleton";
import PrintPreview from "../print-preview";

function Index() {
  const [open, setOpen] = useState(false);
  const [print, setPrint] = useState(false);

  const [loadReports, { data, isLoading }] =
    useLazyGetApiV1ReportEmployeeMovementQuery({});

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

  //load data onmount
  useEffect(() => {
    try {
      loadReports({
        startDate: new Date().toUTCString(),
      }).unwrap();
    } catch (error) {
      toast.error(
        isErrorResponse(error as ErrorResponse)?.description ||
          "An error occurred",
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    console.log("Form submitted with data:", data);
  };

  if (isLoading) {
    return <LoadingTable pagetitle="New hires and exits count report" />;
  }
  const tableData = data as EmployeeMovementReportDtoRead;
  return (
    <ScrollablePageWrapper className="space-y-4">
      {print && (
        <PrintPreview
          isLoading={false}
          onClose={() => setPrint(false)}
          isOpen={print}
          title="New hires and exits count report"
        >
          <Table data={tableData} />
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
        <PageTitle title="New hires and exits count report" />
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
                  if (
                    tableData?.departments &&
                    tableData?.departments?.length <= 0
                  ) {
                    toast.warning("No data available to print");
                    return;
                  }
                  setPrint(true);
                },
              },
            ]}
          />
        </div>
      </div>
      <Table data={tableData} />
    </ScrollablePageWrapper>
  );
}

export default Index;
