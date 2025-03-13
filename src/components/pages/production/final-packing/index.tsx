"use client";

import { useParams } from "next/navigation";
import React, { useEffect } from "react";

import PageWrapper from "@/components/layout/wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import {
  useLazyGetApiV1ProductionScheduleActivityByProductionActivityIdQuery,
  useLazyGetApiV1ProductionScheduleFinalPackingByProductionScheduleIdAndProductIdQuery,
} from "@/lib/redux/api/openapi.generated";
import PageTitle from "@/shared/title";

const FinalPacking = () => {
  const { id } = useParams();
  const activityId = id as string;
  const [loadActivity, { isLoading: isLoadingActivity }] =
    useLazyGetApiV1ProductionScheduleActivityByProductionActivityIdQuery();

  const [loadFinalPacking, { isLoading: isLoadingFinalPacking }] =
    useLazyGetApiV1ProductionScheduleFinalPackingByProductionScheduleIdAndProductIdQuery();

  useEffect(() => {
    if (activityId) {
      handleFinalPacking(activityId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityId]);

  console.log(isLoadingActivity, isLoadingFinalPacking);
  const handleFinalPacking = async (activityId: string) => {
    const response = await loadActivity({
      productionActivityId: activityId,
    }).unwrap();
    const productId = response?.product?.id as string;
    const scheduleId = response?.productionSchedule?.id as string;

    const results = await loadFinalPacking({
      productionScheduleId: scheduleId,
      productId,
    });
    console.log(results, "finalPacking");
  };
  // const  {data:}
  // const [materialMatrix, setMaterialMatrix] = React.useState([]);
  return (
    <PageWrapper>
      <div className="flex items-center justify-between gap-4">
        <PageTitle title="Final Packing" />
      </div>
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you&apos;re
                done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2"></CardContent>
            <CardFooter></CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you&apos;ll be logged
                out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2"></CardContent>
            <CardFooter></CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </PageWrapper>
  );
};

export default FinalPacking;
