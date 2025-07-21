"use client";
import PageTitle from "@/shared/title";
import React, { useEffect, useRef, useState } from "react";
import StaffAndGenderRatioReportTable from "./table";
import DropdownBtns from "@/shared/btns/drop-btn";
import {
  StaffGenderRatioReportRead,
  useLazyGetApiV1ReportStaffGenderRatioReportQuery,
} from "@/lib/redux/api/openapi.generated";
import LoadingTable from "../tableSkeleton";
import { useForm } from "react-hook-form";
import { FilterFormValues, FilterValidator } from "../type";
import FilterForm from "../filterForm";
import logo from "@/assets/oryx_logo_dark.png";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  Icon,
} from "@/components/ui";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import { ErrorResponse, isErrorResponse } from "@/lib";
import { toast } from "sonner";
import Image from "next/image";
import { useReactToPrint } from "react-to-print";

function Index() {
  const [open, setOpen] = useState(false);
  const [print, setPrint] = useState(false);
  const [loadReports, { data, isLoading }] =
    useLazyGetApiV1ReportStaffGenderRatioReportQuery({});

  const contentRef = useRef<HTMLDivElement>(null);

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<FilterFormValues>({
    resolver: FilterValidator,
  });

  const onSubmit = async (data: FilterFormValues) => {
    try {
      await loadReports({
        startDate: data.startDate?.toUTCString(),
        endDate: data.endDate?.toUTCString(),
      }).unwrap();
      setOpen(false);
      reset();
    } catch (error) {
      toast.error(
        isErrorResponse(error as ErrorResponse)?.description ||
          "An error occurred",
      );
    }
    console.log("Form submitted with data:", data);
  };

  useEffect(() => {
    try {
      loadReports({
        startDate: new Date().toISOString(),
      }).unwrap();
    } catch (error) {
      toast.error(
        isErrorResponse(error as ErrorResponse)?.description ||
          "An error occurred",
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePrint = useReactToPrint({
    contentRef,
    onBeforePrint: async () => {
      setPrint(true);
    },
    onAfterPrint: async () => {
      setPrint(false);
    },

    documentTitle: `Staff Gender Report`,
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

  if (isLoading) {
    return <LoadingTable pagetitle="" />;
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
                  disabled={isLoading}
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
        <div className="w-full flex items-center justify-between gap-4">
          <PageTitle title="Sfaff Gender Report" />
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
      </div>
      <div ref={contentRef}>
        {print && (
          <div className="flex items-center justify-center ml-auto">
            <Image src={logo} alt="logo" width={130} height={130} />
          </div>
        )}
        <StaffAndGenderRatioReportTable
          data={data ?? ([] as StaffGenderRatioReportRead)}
        />
      </div>
    </ScrollablePageWrapper>
  );
}

export default Index;
