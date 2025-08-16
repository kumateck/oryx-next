"use client";

import { usePostApiV1AttendanceRecordsUploadMutation as useUploadAttendance } from "@/lib/redux/api/openapi.generated";

import PageWrapper from "@/components/layout/wrapper";
import PageTitle from "@/shared/title";
import { AttendanceReportDto, AttendanceReportSchema } from "./types";
import { useForm } from "react-hook-form";
import { AuditModules } from "@/lib";
import { toast } from "sonner";
import ThrowErrorMessage from "@/lib/throw-error";
import { Button, Icon } from "@/components/ui";
import { useRouter } from "next/navigation";
import { FileUpload } from "./FileUpload";
import { zodResolver } from "@hookform/resolvers/zod";

const Page = () => {
  const [uploadAttendance, { isLoading }] = useUploadAttendance({});
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AttendanceReportDto>({
    resolver: zodResolver(AttendanceReportSchema),
  });

  const onSubmit = async (data: AttendanceReportDto) => {
    const files = Array.isArray(data.file) ? data.file : Array.from(data.file);
    const file = files[0];
    const formData = new FormData();
    // files.forEach((file) => {
    // });
    formData.append("attendance", file, file.name);
    try {
      await uploadAttendance({
        body: formData as unknown as {
          attendance: Blob;
        },
        module: AuditModules.warehouse.name,
        subModule: AuditModules.warehouse.attendanceReport,
      }).unwrap();
      toast.success("Attendance report uploaded successfully");
      router.push("/hr/attendance-report-summary");
    } catch (error) {
      ThrowErrorMessage(error);
      console.error("Error uploading attendance report:", error);
    }
  };
  return (
    <PageWrapper>
      <div className="flex flex-col">
        <PageTitle title="Attendance Report Upload" />
        <span className="text-gray-600">
          Upload the daily attendance report to generate a departmental
          attendance Excel sheet
        </span>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" caret-slate-50 mt-10 max-w-4xl h-full"
      >
        <FileUpload errors={errors} control={control} />
        <div className="flex justify-end gap-2 mt-4">
          <Button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              router.back();
            }}
            disabled={isLoading}
            variant="outline"
          >
            Cancel
          </Button>
          <Button disabled={isLoading} type="submit">
            {isLoading && <Icon name="Loader" className="animate-spin" />}
            Submit
          </Button>
        </div>
      </form>
    </PageWrapper>
  );
};

export default Page;
