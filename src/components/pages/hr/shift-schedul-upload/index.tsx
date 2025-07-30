"use client";
import PageWrapper from "@/components/layout/wrapper";
import PageTitle from "@/shared/title";
import { useForm } from "react-hook-form";
import { ShiftScheduleUploadDto, ShiftScheduleUploadSchema } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileUpload } from "./FileUpload";
import { AuditModules } from "@/lib";
import { toast } from "sonner";
import ThrowErrorMessage from "@/lib/throw-error";
import { useState } from "react";
import {
  useGetApiV1DepartmentQuery,
  useGetApiV1ShiftSchedulesQuery,
  usePostApiV1ShiftSchedulesAssignImportMutation,
} from "@/lib/redux/api/openapi.generated";
import { ClientDatatable } from "@/shared/datatable";
import { columns, ShiftsReportSummary } from "./column";
import ScrollableWrapper from "@/shared/scroll-wrapper";
import { Button, Icon } from "@/components/ui";

function Index() {
  const [results, setResults] = useState<ShiftsReportSummary[]>([]);
  const { data: departments } = useGetApiV1DepartmentQuery({
    page: 1,
    pageSize: 1000,
  });
  const { data: shiftSchedules } = useGetApiV1ShiftSchedulesQuery({
    page: 1,
    pageSize: 1000,
  });

  const [uploadShiftSchedule, { isLoading }] =
    usePostApiV1ShiftSchedulesAssignImportMutation({});
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ShiftScheduleUploadDto>({
    resolver: zodResolver(ShiftScheduleUploadSchema),
  });

  const onSubmit = async (data: ShiftScheduleUploadDto) => {
    const files = Array.isArray(data.file) ? data.file : Array.from(data.file);
    const file = files[0];
    const formData = new FormData();
    // files.forEach((file) => {
    // });
    formData.append("attendance", file, file.name);
    try {
      const result = await uploadShiftSchedule({
        body: formData as unknown as {
          file: Blob;
        },
        departmentId: data.departmentId.value,
        shiftId: data.shiftScheduleId.value,
        module: AuditModules.warehouse.name,
        subModule: AuditModules.warehouse.attendanceReport,
      });
      if (!result.error) {
        toast.success("Shift schedule uploaded successfully");
        console.log(result);
        setResults(result as unknown as ShiftsReportSummary[]);
        return;
      }
      console.log(result);
    } catch (error) {
      ThrowErrorMessage(error);
      console.error("Error uploading shift schedule:", error);
    }
  };

  const departmentOptions =
    departments?.data?.map((d) => ({
      label: d.name as string,
      value: d.id as string,
    })) || [];
  const shiftScheduleOptions =
    shiftSchedules?.data?.map((shift) => ({
      label: shift.scheduleName as string,
      value: shift.id as string,
    })) || [];

  return (
    <PageWrapper>
      <PageTitle title="Shift Schedule Report Upload" />
      <p className="text-lg font-medium text-gray-700">
        Upload shift schedule report in an excel sheet.
      </p>
      <ScrollableWrapper>
        <form
          className="w-full flex flex-col my-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FileUpload
            departmentOptions={departmentOptions}
            shiftScheduleOptions={shiftScheduleOptions}
            control={control}
            errors={errors}
          />
          <Button
            disabled={isLoading}
            type="submit"
            className="ml-auto flex items-center gap-2"
          >
            {isLoading && <Icon name="LoaderCircle" className="animate-spin" />}
            Submit
          </Button>
        </form>

        {results?.length > 0 && (
          <ClientDatatable
            columns={columns}
            data={results}
            isLoading={isLoading}
          />
        )}
      </ScrollableWrapper>
    </PageWrapper>
  );
}

export default Index;
