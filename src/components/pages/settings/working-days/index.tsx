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
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { usePostApiV1WorkingDaysMutation } from "@/lib/redux/api/openapi.generated";
import { toast } from "sonner";
import { ErrorResponse, isErrorResponse } from "@/lib";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  const [workingDays, setWorkingDays] = useState<DaysOfWeekTypes[]>([]);
  const [saveMutation, { isLoading }] = usePostApiV1WorkingDaysMutation();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<WorkDaysDto>({
    resolver: WorkDaysValidator,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "workingDays",
  });

  //function to pic a day
  const handlePickWorkingDay = (day: DaysOfWeekTypes) => {
    const existingIndex = fields.findIndex(
      (d) => d.day === daysOfWeek.indexOf(day),
    );
    if (existingIndex !== -1) {
      remove(existingIndex);
      setWorkingDays((prev) => prev.filter((d) => d !== day));
    } else {
      append({
        day: daysOfWeek.indexOf(day) as DaysIndexTypes,
        startTime: "",
        isWorkingDay: true,
        endTime: "",
      });
      setWorkingDays((prev) => [...prev, day]);
    }
  };
  const onSubmit = async (data: WorkDaysDto) => {
    try {
      const resData = await saveMutation({ body: data.workingDays }).unwrap();
      console.log({ resData, data });
      toast.success("Schedule created successfully");
      setWorkingDays([]);
      remove();
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  return (
    <PageWrapper>
      <div className="flex items-center gap-2 ">
        <Icon
          name="ArrowLeft"
          className="h-5 w-5 text-black hover:cursor-pointer"
          onClick={() => {
            router.back();
          }}
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
              <div className="flex w-full items-center justify-start gap-6">
                {daysOfWeek.map((day) => (
                  <Button
                    type="button"
                    disabled={isLoading}
                    onClick={() => handlePickWorkingDay(day)}
                    variant={workingDays.includes(day) ? "default" : "outline"}
                    key={day}
                  >
                    {day}
                  </Button>
                ))}
              </div>
              <Form fields={fields} errors={errors} control={control} />
            </CardContent>
          </Card>
          <div className="flex mt-4 w-fit ml-auto gap-2 items-center justify-center">
            <Button disabled={isLoading} type="button" variant="secondary">
              Cancel
            </Button>
            <Button disabled={isLoading}>
              {isLoading && (
                <Icon name="LoaderCircle" className="animate-spin" />
              )}
              Save
            </Button>
          </div>
        </form>
      </ScrollableWrapper>
    </PageWrapper>
  );
}

export default Page;
