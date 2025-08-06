"use client";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";
import React, { useRef, useState } from "react";
import StaffTotalReport from "./table";
import DropdownBtns from "@/shared/btns/drop-btn";
import {
  StaffTotalReportRead,
  useLazyGetApiV1ReportStaffTotalReportQuery,
} from "@/lib/redux/api/openapi.generated";
import LoadingTable from "../tableSkeleton";
import { useReactToPrint } from "react-to-print";
import logo from "@/assets/oryx_logo_dark.png";
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
import Image from "next/image";

function Index() {
  const [loadReports, { data, isLoading }] =
    useLazyGetApiV1ReportStaffTotalReportQuery({});
  const [open, setOpen] = useState(false);
  const [print, setPrint] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

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

  const handlePrint = useReactToPrint({
    contentRef,
    onBeforePrint: async () => {
      setPrint(true);
    },
    onAfterPrint: async () => {
      setPrint(false);
    },
    documentTitle: `Total Staff Report`,
    pageStyle: `
        @media print {
            html, body {
              font-size: 12px;
            }
          }
          @page {
            margin: 2mm 15mm;
          }`,
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
                  handlePrint();
                },
              },
            ]}
          />
        </div>
      </div>
      <div ref={contentRef}>
        {print && (
          <div className="flex items-center justify-center ml-auto">
            <Image src={logo} alt="logo" width={130} height={130} />
          </div>
        )}
        <StaffTotalReport data={data ?? ([] as StaffTotalReportRead)} />
      </div>
    </ScrollablePageWrapper>
  );
}

export default Index;
