"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";

import BillingSheetForm from "./form";
import { BillingSheetRequestDto, CreateBillingSheetValidator } from "./types";

const CreateBillingSheet = () => {
  const router = useRouter();
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<BillingSheetRequestDto>({
    resolver: CreateBillingSheetValidator,
    mode: "all",
  });

  const onSubmit = async () => {};

  return (
    <ScrollablePageWrapper>
      <PageTitle title="Create Billing Sheet" />
      <form className="mt-5 w-full" onSubmit={handleSubmit(onSubmit)}>
        <BillingSheetForm
          register={register}
          control={control}
          errors={errors}
        />

        <div className="flex justify-end gap-4 py-6">
          <Button type="button" variant="secondary" onClick={router.back}>
            Cancel
          </Button>

          <Button variant={"default"} className="flex items-center gap-2">
            {/* <Icon
                 name={isLoading ? "LoaderCircle" : "Plus"}
                 className={cn("h-4 w-4", {
                   "animate-spin": isLoading,
                 })}
               /> */}
            <span>Create</span>{" "}
          </Button>
        </div>
      </form>
    </ScrollablePageWrapper>
  );
};

export default CreateBillingSheet;
