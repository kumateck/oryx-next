"use client";
import PageWrapper from "@/components/layout/wrapper";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Icon,
} from "@/components/ui";
import PageTitle from "@/shared/title";
import {
  DaysIndexTypes,
  daysOfWeek,
  DaysOfWeekTypes,
  WorkDaysDto,
  WorkDaysValidator,
} from "./types";
import Form from "./Form";
import ScrollableWrapper from "@/shared/scroll-wrapper";
import { useEffect, useState, useCallback } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  CompanyWorkingDaysDto,
  useGetApiV1WorkingDaysQuery,
  usePostApiV1WorkingDaysMutation,
} from "@/lib/redux/api/openapi.generated";
import { toast } from "sonner";
import { ErrorResponse, isErrorResponse } from "@/lib";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  const [workingDays, setWorkingDays] = useState<DaysOfWeekTypes[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [saveMutation, { isLoading: isSaving }] =
    usePostApiV1WorkingDaysMutation();
  const {
    data: workingDaysData,
    isLoading: isLoadingWorkingDays,
    error: workingDaysError,
    refetch,
  } = useGetApiV1WorkingDaysQuery({});

  const {
    handleSubmit,
    formState: { errors, isDirty },
    control,
    reset,
  } = useForm<WorkDaysDto>({
    resolver: WorkDaysValidator,
    defaultValues: {
      workingDays: [],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "workingDays",
  });

  // Helper function to safely get working days list
  const getWorkingDaysList = useCallback((): CompanyWorkingDaysDto[] => {
    return (workingDaysData?.data as CompanyWorkingDaysDto[]) || [];
  }, [workingDaysData?.data]);

  // Load existing working days as defaults
  useEffect(() => {
    if (workingDaysError) {
      toast.error("Failed to load working days data");
      return;
    }

    const workingDaysList = getWorkingDaysList();

    if (
      workingDaysList?.length > 0 &&
      !isInitialized &&
      !isLoadingWorkingDays
    ) {
      try {
        const existingWorkingDays = workingDaysList.map((workDay) => ({
          day: (workDay.day ?? 0) as DaysIndexTypes,
          isWorkingDay: workDay.isWorkingDay ?? true,
          startTime: workDay.startTime ?? "",
          endTime: workDay.endTime ?? "",
        }));

        const selectedDays = workingDaysList
          .map((workDay) => {
            const dayIndex = workDay.day ?? 0;
            return daysOfWeek[dayIndex as DaysIndexTypes];
          })
          .filter(Boolean); // Remove any undefined values

        // Replace the form fields with existing data
        replace(existingWorkingDays);
        setWorkingDays(selectedDays);
        setIsInitialized(true);
      } catch (error) {
        console.error("Error loading existing working days:", error);
        toast.error("Error loading existing working days");
      }
    } else if (
      !isLoadingWorkingDays &&
      workingDaysList?.length === 0 &&
      !isInitialized
    ) {
      // No existing data, mark as initialized
      setIsInitialized(true);
    }
  }, [
    workingDaysData?.data,
    isInitialized,
    isLoadingWorkingDays,
    replace,
    workingDaysError,
    getWorkingDaysList,
  ]);

  // Function to pick a day
  const handlePickWorkingDay = useCallback(
    (day: DaysOfWeekTypes) => {
      const dayIndex = daysOfWeek.indexOf(day) as DaysIndexTypes;

      if ((dayIndex as number) === -1) {
        console.error("Invalid day selected:", day);
        return;
      }

      const existingIndex = fields.findIndex((d) => d.day === dayIndex);
      const workingDaysList = getWorkingDaysList();

      if (existingIndex !== -1) {
        // Remove the day
        remove(existingIndex);
        setWorkingDays((prev) => prev.filter((d) => d !== day));
      } else {
        // Add the day
        const existingWorkDay = workingDaysList.find((w) => w.day === dayIndex);

        append({
          day: dayIndex,
          startTime: existingWorkDay?.startTime ?? "",
          isWorkingDay: existingWorkDay?.isWorkingDay ?? true,
          endTime: existingWorkDay?.endTime ?? "",
        });
        setWorkingDays((prev) => [...prev, day]);
      }
    },
    [fields, append, remove, getWorkingDaysList],
  );

  const onSubmit = async (data: WorkDaysDto) => {
    try {
      // Validate that we have working days selected
      if (!data.workingDays || data.workingDays?.length === 0) {
        toast.error("Please select at least one working day");
        return;
      }

      // Validate that all selected days have start and end times
      const invalidDays = data.workingDays.filter(
        (day) => !day.startTime || !day.endTime,
      );

      if (invalidDays?.length > 0) {
        toast.error("Please set start and end times for all selected days");
        return;
      }

      const resData = await saveMutation({ body: data.workingDays }).unwrap();
      console.log({ resData, data });
      toast.success("Schedule updated successfully");

      // Refresh the data to show updated values
      await refetch();

      // Optionally navigate back
      // router.back();
    } catch (error) {
      console.error("Error saving working days:", error);
      const errorMessage =
        isErrorResponse(error as ErrorResponse)?.description ||
        "Failed to save working days";
      toast.error(errorMessage);
    }
  };

  const handleReset = useCallback(() => {
    const workingDaysList = getWorkingDaysList();

    if (workingDaysList?.length > 0) {
      // Reset to original data
      try {
        const existingWorkingDays = workingDaysList.map((workDay) => ({
          day: (workDay.day ?? 0) as DaysIndexTypes,
          isWorkingDay: workDay.isWorkingDay ?? true,
          startTime: workDay.startTime ?? "",
          endTime: workDay.endTime ?? "",
        }));

        const selectedDays = workingDaysList
          .map((workDay) => {
            const dayIndex = workDay.day ?? 0;
            return daysOfWeek[dayIndex as DaysIndexTypes];
          })
          .filter(Boolean);

        replace(existingWorkingDays);
        setWorkingDays(selectedDays);
        toast.success("Reset to original values");
      } catch (error) {
        console.error("Error resetting form:", error);
        toast.error("Error resetting form");
      }
    } else {
      // Clear all if no existing data
      replace([]);
      setWorkingDays([]);
      reset({ workingDays: [] });
      toast.success("Form cleared");
    }
  }, [getWorkingDaysList, replace, reset]);

  const handleCancel = useCallback(() => {
    if (isDirty) {
      const confirmCancel = window.confirm(
        "You have unsaved changes. Are you sure you want to cancel?",
      );
      if (!confirmCancel) return;
    }
    router.back();
  }, [isDirty, router]);

  // Show loading state while fetching data
  if (isLoadingWorkingDays) {
    return (
      <PageWrapper>
        <div className="flex items-center gap-2">
          <Icon
            name="ArrowLeft"
            className="h-5 w-5 text-black hover:cursor-pointer"
            onClick={() => router.back()}
          />
          <PageTitle title={"Working Days"} />
        </div>
        <div className="flex items-center justify-center h-64">
          <Icon name="LoaderCircle" className="animate-spin h-8 w-8" />
          <span className="ml-2">Loading working days...</span>
        </div>
      </PageWrapper>
    );
  }

  // Show error state if there's an error loading data
  if (workingDaysError) {
    return (
      <PageWrapper>
        <div className="flex items-center gap-2">
          <Icon
            name="ArrowLeft"
            className="h-5 w-5 text-black hover:cursor-pointer"
            onClick={() => router.back()}
          />
          <PageTitle title={"Working Days"} />
        </div>
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <Icon name="CircleAlert" className="h-8 w-8 text-red-500" />
          <span>Failed to load working days data</span>
          <Button onClick={() => refetch()} variant="outline">
            <Icon name="RefreshCw" className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="flex items-center gap-2">
        <Icon
          name="ArrowLeft"
          className="h-5 w-5 text-black hover:cursor-pointer"
          onClick={() => router.back()}
        />
        <PageTitle title={"Working Days"} />
      </div>
      <ScrollableWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Select Working Days</CardTitle>
              <hr />
            </CardHeader>
            <CardContent>
              <div className="flex w-full items-center justify-start gap-6 flex-wrap">
                {daysOfWeek.map((day) => (
                  <Button
                    type="button"
                    disabled={isSaving}
                    onClick={() => handlePickWorkingDay(day)}
                    variant={workingDays.includes(day) ? "default" : "outline"}
                    key={day}
                    className="min-w-fit"
                  >
                    {day}
                  </Button>
                ))}
              </div>
              <Form fields={fields} errors={errors} control={control} />
            </CardContent>
          </Card>
          <div className="flex mt-4 w-fit ml-auto gap-2 items-center justify-center">
            <Button
              onClick={handleReset}
              disabled={isSaving}
              type="button"
              variant="outline"
            >
              Reset
            </Button>
            <Button
              onClick={handleCancel}
              disabled={isSaving}
              type="button"
              variant="secondary"
            >
              Cancel
            </Button>
            <Button disabled={isSaving || !isDirty} type="submit">
              {isSaving && (
                <Icon name="LoaderCircle" className="animate-spin mr-2" />
              )}
              Save Changes
            </Button>
          </div>
        </form>
      </ScrollableWrapper>
    </PageWrapper>
  );
}

export default Page;
