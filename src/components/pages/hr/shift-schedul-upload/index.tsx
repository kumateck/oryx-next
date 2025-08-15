"use client";
import PageWrapper from "@/components/layout/wrapper";
import PageTitle from "@/shared/title";
import { useForm } from "react-hook-form";
import {
  allowedMimeTypes,
  ShiftScheduleUploadDto,
  ShiftScheduleUploadSchema,
  ShiftsReportSummary,
} from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileUpload } from "./FileUpload";
import { AuditModules, Option } from "@/lib";
import { toast } from "sonner";
import ThrowErrorMessage from "@/lib/throw-error";
import { useEffect, useState } from "react";
import {
  useGetApiV1DepartmentQuery,
  useLazyGetApiV1ShiftSchedulesDepartmentByIdQuery,
  usePostApiV1ShiftSchedulesAssignImportMutation,
} from "@/lib/redux/api/openapi.generated";
import { Button, Icon } from "@/components/ui";
import { parseExcelFile } from "./parseExcelfile";
import { ExcelPreviewTable } from "./table";
import ScrollablePageWrapper from "@/shared/page-wrapper";

function Index() {
  const [results, setResults] = useState<Record<string, any>[]>([]);
  const [loadShiftSchedules, { data: shiftSchedules }] =
    useLazyGetApiV1ShiftSchedulesDepartmentByIdQuery();

  const { data: departments } = useGetApiV1DepartmentQuery({
    page: 1,
    pageSize: 1000,
  });

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

  const departmentId = watch("departmentId");
  useEffect(() => {
    if (departmentId?.value) {
      loadShiftSchedules({
        id: departmentId.value as string,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departmentId?.value]);

  const onSubmit = async (data: ShiftScheduleUploadDto) => {
    const files = Array.isArray(data.file) ? data.file : Array.from(data.file);
    const file = files[0];
    console.log(file);
    const formData = new FormData();
    formData.append("file", file, file.name);
    try {
      const result = await uploadShiftSchedule({
        body: formData as unknown as {
          file: Blob;
        },
        departmentId: data.departmentId.value,
        shiftId: data.shiftScheduleId.value,
        module: AuditModules.management.name,
        subModule: AuditModules.management.shiftUpload,
      });

      //  const formData = new FormData();
      //         const attachmentsArray = Array.isArray(data.attachments)
      //           ? data.attachments
      //           : Array.from(data.attachments); // Convert FileList to an array
      //         attachmentsArray.forEach((attachment: File) => {
      //           formData.append("files", attachment, attachment.name);
      //         });

      //         await uploadAttachment({
      //           modelType: CODE_SETTINGS.modelTypes.Item,
      //           modelId: itemId as string,
      //           body: formData,
      //         } as PostApiV1FileByModelTypeAndModelIdApiArg).unwrap();

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

  //handle excel selected File and convert it to JSON
  const fileChange = watch("file");

  useEffect(() => {
    if (fileChange && fileChange.length > 0) {
      const file = fileChange[0];
      parseExcelFile(file, allowedMimeTypes).then((result) => {
        if (result.error) {
          toast.error(result.error);
        } else {
          setResults(result.data ?? []);
        }
      });
    }
  }, [fileChange]);

  const departmentOptions =
    departments?.data?.map((d) => ({
      label: d.name as string,
      value: d.id as string,
    })) || [];

  //TODO: implement shift schedule options mapping

  const shiftScheduleOptions = shiftSchedules?.map((item) => {
    return {
      label: item.scheduleName as string,
      value: item.id as string,
    };
  }) as Option[];

  return (
    <PageWrapper>
      <PageTitle title="Shift Schedule Report Upload" />
      <p className="text-lg font-medium text-gray-700">
        Upload shift schedule report in an excel sheet.
      </p>
      <ScrollablePageWrapper className=" px-4 py-2">
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

        {results?.length > 0 && <ExcelPreviewTable data={results} />}
      </ScrollablePageWrapper>
    </PageWrapper>
  );
}

export default Index;
