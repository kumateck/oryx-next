import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Icon,
} from "@/components/ui";
import { useEffect, useRef } from "react";
import { SegmentedBar } from "./segmentedBar";
import {
  HrDashboardDtoRead,
  usePostApiV1AttendanceRecordsUploadMutation as useUploadAttendance,
} from "@/lib/redux/api/openapi.generated";
import { Control, useForm } from "react-hook-form";
import {
  AttendanceReportDto,
  AttendanceReportSchema,
} from "../../hr/attendance-report/types";
import { toast } from "sonner";
import { AuditModules, InputTypes } from "@/lib";
import { useRouter } from "next/navigation";
import ThrowErrorMessage from "@/lib/throw-error";
import { FormWizard } from "@/components/form-inputs";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  data: HrDashboardDtoRead;
}
export function AttendanceCard({ data }: Props) {
  return (
    <Card className="col-span-5 xl:col-span-4 row-span-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Attendance Rate</CardTitle>
          <Icon
            name="UserRound"
            className="size-5 font-semibold text-primary-default"
          />
        </div>
        <CardDescription className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">99%</h1>
          <span className="mr-10 text-lg">
            <span className="text-green-700 font-medium">+45%</span> in last
            quarter
          </span>
        </CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto">
        <SegmentedBar data={data} />
      </CardFooter>
    </Card>
  );
}

export const AttendanceReportUpload = () => {
  const [uploadAttendance, { isLoading }] = useUploadAttendance({});
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const {
    control,
    watch,
    reset,
    handleSubmit,
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
    } finally {
      reset();
    }
  };
  const file = watch("file");
  useEffect(() => {
    if (!file || isLoading) {
      console.log("File selected:", file);
      return;
    }
    if (file && formRef.current) {
      handleSubmit(onSubmit)();
      console.log("Form submitted with file:", file);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);
  return (
    <Card className="lg:col-span-3 col-span-2">
      <CardHeader>
        <div className="flex w-full items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            Attendance Report Upload
          </CardTitle>
          <Icon name="Upload" className="text-primary-default" />
        </div>
      </CardHeader>
      <CardContent>
        <form ref={formRef}>
          <FormWizard
            className="w-full"
            config={[
              {
                type: InputTypes.DRAGNDROP,
                label: "",
                name: `file`,
                single: true,
                defaultValue: null,
                control: control as Control,
                errors,
              },
            ]}
          />
        </form>
      </CardContent>
    </Card>
  );
};
