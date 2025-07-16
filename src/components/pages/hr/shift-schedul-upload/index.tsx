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
import { useEffect, useState } from "react";
import { usePostApiV1ShiftSchedulesAssignImportMutation } from "@/lib/redux/api/openapi.generated";
import { ClientDatatable } from "@/shared/datatable";
import { columns, ShiftsReportSummary } from "./column";
import ScrollableWrapper from "@/shared/scroll-wrapper";

function Index() {
  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);
  const [results, setResults] = useState<ShiftsReportSummary[]>([]);

  const [uploadShiftSchedule, { isLoading }] =
    usePostApiV1ShiftSchedulesAssignImportMutation({});
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<ShiftScheduleUploadDto>({
    resolver: zodResolver(ShiftScheduleUploadSchema),
  });

  const selectedFile = watch("file");
  useEffect(() => {
    if (selectedFile && selectedFile.length > 0) {
      const url = URL.createObjectURL(selectedFile[0]);
      setSelectedFileUrl(url);
    }
  }, [selectedFile]);

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

  useEffect(() => {
    //trigger file submission when a file is selected
    if (selectedFileUrl) {
      handleSubmit(onSubmit)();
      console.log("File submitted:", results);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFileUrl]);

  return (
    <PageWrapper>
      <PageTitle title="Shift Schedule Report Upload" />
      <p className="text-lg font-medium text-gray-700">
        Upload the daily attendance report to generate departmental attendance
        excel sheet.
      </p>
      <ScrollableWrapper>
        <form className="w-full my-8" onSubmit={handleSubmit(onSubmit)}>
          <FileUpload control={control} errors={errors} />
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
