// "use client";
// import PageWrapper from "@/components/layout/wrapper";
// import {
//   Button,
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   Icon,
// } from "@/components/ui";
// import PageTitle from "@/shared/title";
// import {
//   DaysIndexTypes,
//   daysOfWeek,
//   DaysOfWeekTypes,
//   WorkDaysDto,
//   WorkDaysValidator,
// } from "./types";
// import Form from "./Form";
// import ScrollableWrapper from "@/shared/scroll-wrapper";
// import { useState } from "react";
// import { useFieldArray, useForm } from "react-hook-form";
// import {
//   CompanyWorkingDaysDto,
//   CompanyWorkingDaysDtoIEnumerablePaginateable,
//   useGetApiV1WorkingDaysQuery,
//   usePostApiV1WorkingDaysMutation,
// } from "@/lib/redux/api/openapi.generated";
// import { toast } from "sonner";
// import { ErrorResponse, isErrorResponse } from "@/lib";
// import { useRouter } from "next/navigation";

// function Page() {
//   const router = useRouter();
//   const [workingDays, setWorkingDays] = useState<DaysOfWeekTypes[]>([]);
//   const [saveMutation, { isLoading }] = usePostApiV1WorkingDaysMutation();
//   const { data: workingDaysData } = useGetApiV1WorkingDaysQuery({});

//   const workingDaysList =
//     (workingDaysData?.data as CompanyWorkingDaysDto[]) || [];

//   console.log(workingDaysList, "workingDaysList");
//   const {
//     handleSubmit,
//     formState: { errors },
//     control,
//   } = useForm<WorkDaysDto>({
//     resolver: WorkDaysValidator,
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "workingDays",
//   });

//   //function to pic a day
//   const handlePickWorkingDay = (day: DaysOfWeekTypes) => {
//     const existingIndex = fields.findIndex(
//       (d) => d.day === daysOfWeek.indexOf(day),
//     );
//     if (existingIndex !== -1) {
//       remove(existingIndex);
//       setWorkingDays((prev) => prev.filter((d) => d !== day));
//     } else {
//       append({
//         day: daysOfWeek.indexOf(day) as DaysIndexTypes,
//         startTime: "",
//         isWorkingDay: true,
//         endTime: "",
//       });
//       setWorkingDays((prev) => [...prev, day]);
//     }
//   };
//   const onSubmit = async (data: WorkDaysDto) => {
//     try {
//       const resData = await saveMutation({ body: data.workingDays }).unwrap();
//       console.log({ resData, data });
//       toast.success("Schedule created successfully");
//       setWorkingDays([]);
//       remove();
//     } catch (error) {
//       toast.error(isErrorResponse(error as ErrorResponse)?.description);
//     }
//   };

//   return (
//     <PageWrapper>
//       <div className="flex items-center gap-2 ">
//         <Icon
//           name="ArrowLeft"
//           className="h-5 w-5 text-black hover:cursor-pointer"
//           onClick={() => {
//             router.back();
//           }}
//         />

//         <PageTitle title={"Working Days"} />
//       </div>
//       <ScrollableWrapper>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <Card className="mt-6">
//             <CardHeader>
//               <CardTitle>Select Working Days</CardTitle>
//               <hr />
//             </CardHeader>
//             <CardContent>
//               <div className="flex w-full items-center justify-start gap-6">
//                 {daysOfWeek.map((day) => (
//                   <Button
//                     type="button"
//                     disabled={isLoading}
//                     onClick={() => handlePickWorkingDay(day)}
//                     variant={workingDays.includes(day) ? "default" : "outline"}
//                     key={day}
//                   >
//                     {day}
//                   </Button>
//                 ))}
//               </div>
//               <Form fields={fields} errors={errors} control={control} />
//             </CardContent>
//           </Card>
//           <div className="flex mt-4 w-fit ml-auto gap-2 items-center justify-center">
//             <Button
//               onClick={() => router.back()}
//               disabled={isLoading}
//               type="button"
//               variant="secondary"
//             >
//               Cancel
//             </Button>
//             <Button disabled={isLoading}>
//               {isLoading && (
//                 <Icon name="LoaderCircle" className="animate-spin" />
//               )}
//               Save
//             </Button>
//           </div>
//         </form>
//       </ScrollableWrapper>
//     </PageWrapper>
//   );
// }

// export default Page;

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
import { useEffect, useState } from "react";
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
  const [saveMutation, { isLoading }] = usePostApiV1WorkingDaysMutation();
  const { data: workingDaysData, isLoading: isLoadingWorkingDays } =
    useGetApiV1WorkingDaysQuery({});

  const {
    handleSubmit,
    formState: { errors },
    control,
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

  // Load existing working days as defaults
  useEffect(() => {
    const workingDaysList = workingDaysData?.data as CompanyWorkingDaysDto[];
    if (workingDaysList.length > 0 && !isInitialized && !isLoadingWorkingDays) {
      const existingWorkingDays = workingDaysList.map((workDay) => ({
        day: workDay.day as DaysIndexTypes,
        isWorkingDay: workDay.isWorkingDay || true,
        startTime: workDay.startTime || "",
        endTime: workDay.endTime || "",
      }));

      const selectedDays = workingDaysList.map(
        (workDay) => daysOfWeek[workDay.day as DaysIndexTypes],
      );

      // Replace the form fields with existing data
      replace(existingWorkingDays);
      setWorkingDays(selectedDays);
      setIsInitialized(true);
    }
  }, [workingDaysData?.data, isInitialized, isLoadingWorkingDays, replace]);

  //function to pick a day
  const handlePickWorkingDay = (day: DaysOfWeekTypes) => {
    const dayIndex = daysOfWeek.indexOf(day) as DaysIndexTypes;
    const existingIndex = fields.findIndex((d) => d.day === dayIndex);
    const workingDaysList = workingDaysData?.data as CompanyWorkingDaysDto[];

    if (existingIndex !== -1) {
      remove(existingIndex);
      setWorkingDays((prev) => prev.filter((d) => d !== day));
    } else {
      // Check if this day already exists in the database
      const existingWorkDay = workingDaysList.find((w) => w.day === dayIndex);

      append({
        day: dayIndex,
        startTime: existingWorkDay?.startTime || "",
        isWorkingDay: existingWorkDay?.isWorkingDay || true,
        endTime: existingWorkDay?.endTime || "",
      });
      setWorkingDays((prev) => [...prev, day]);
    }
  };

  const onSubmit = async (data: WorkDaysDto) => {
    try {
      const resData = await saveMutation({ body: data.workingDays }).unwrap();
      console.log({ resData, data });
      toast.success("Schedule updated successfully");

      // Optionally refresh the data or navigate away
      // router.back();
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  const handleReset = () => {
    const workingDaysList = workingDaysData?.data as CompanyWorkingDaysDto[];

    if (workingDaysList.length > 0) {
      // Reset to original data
      const existingWorkingDays = workingDaysList.map((workDay) => ({
        day: workDay.day as DaysIndexTypes,
        isWorkingDay: workDay.isWorkingDay || true,
        startTime: workDay.startTime || "",
        endTime: workDay.endTime || "",
      }));

      const selectedDays = workingDaysList.map(
        (workDay) => daysOfWeek[workDay.day as DaysIndexTypes],
      );

      replace(existingWorkingDays);
      setWorkingDays(selectedDays);
    } else {
      // Clear all if no existing data
      replace([]);
      setWorkingDays([]);
    }
  };

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
            <Button
              onClick={handleReset}
              disabled={isLoading}
              type="button"
              variant="outline"
            >
              Reset
            </Button>
            <Button
              onClick={() => router.back()}
              disabled={isLoading}
              type="button"
              variant="secondary"
            >
              Cancel
            </Button>
            <Button disabled={isLoading} type="submit">
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
