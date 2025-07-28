"use client";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import React, { useEffect, useRef, useState } from "react";
import DepartmentTable from "./table";
import logo from "@/assets/oryx_logo_dark.png";
import PageTitle from "@/shared/title";
import DropdownBtns from "@/shared/btns/drop-btn";
import {
  PermanentStaffGradeReportDtoRead,
  useGetApiV1DepartmentQuery,
  useLazyGetApiV1ReportStaffReportQuery,
} from "@/lib/redux/api/openapi.generated";
import { toast } from "sonner";
import { FilterFormSchemaValidator, FilterFormValues } from "./types";
import { useForm } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  Icon,
} from "@/components/ui";
import { ErrorResponse, isErrorResponse, Option } from "@/lib";
import GradeCountFilterForm from "./filterForm";
import { useReactToPrint } from "react-to-print";
import Image from "next/image";
import LoadingTable from "../tableSkeleton";

function Index() {
  const [open, setOpen] = useState(false);
  const [loadReports, { data, isLoading }] =
    useLazyGetApiV1ReportStaffReportQuery({});
  const [print, setPrint] = useState(false);
  const { data: departmentData, isLoading: departmentLoading } =
    useGetApiV1DepartmentQuery({});

  const contentRef = useRef<HTMLDivElement>(null);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FilterFormValues>({
    resolver: FilterFormSchemaValidator,
  });

  useEffect(() => {
    try {
      loadReports({});
    } catch (error) {
      toast.error(
        isErrorResponse(error as ErrorResponse)?.description ||
          "An error occurred",
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departmentData]);

  const handlePrint = useReactToPrint({
    contentRef,
    onBeforePrint: async () => {
      setPrint(true);
    },
    onAfterPrint: async () => {
      setPrint(false);
    },
    documentTitle: `New hires and exits count report`,
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
    try {
      await loadReports({
        departmentId: data.departmentId.value,
      });
      setOpen(false);
      reset();
    } catch (error) {
      toast.error(
        isErrorResponse(error as ErrorResponse)?.description ||
          "An error occurred",
      );
    }
  };

  const departmentOptions = departmentData?.data?.map((dept) => ({
    label: dept.name,
    value: dept.id,
  })) as Option[];

  if (isLoading || departmentLoading) {
    return <LoadingTable pagetitle="Permanent Staff Grade Count Report" />;
  }

  return (
    <ScrollablePageWrapper className="space-y-4">
      <div className="w-full flex items-center justify-between gap-4">
        <PageTitle title="Permanent Staff Grade Count Report" />
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
                  if (!contentRef.current) return;
                  if (!data || data?.departments?.length === 0) {
                    toast.warning("No data to export");
                    return;
                  }
                  handlePrint();
                },
              },
            ]}
          />
        </div>
      </div>
      <Dialog onOpenChange={() => setOpen(false)} open={open}>
        <DialogContent>
          <DialogTitle>Report Filter</DialogTitle>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <GradeCountFilterForm
              errors={errors}
              control={control}
              register={register}
              departmentOptions={departmentOptions}
            />
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
      <div ref={contentRef}>
        {print && (
          <div className="flex items-center justify-center ml-auto">
            <Image src={logo} alt="logo" width={130} height={130} />
          </div>
        )}
        <DepartmentTable
          data={data ?? ({} as PermanentStaffGradeReportDtoRead)}
        />
      </div>
    </ScrollablePageWrapper>
  );
}

export default Index;
