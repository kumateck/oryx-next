"use client";
import PageWrapper from "@/components/layout/wrapper";
import { Icon } from "@/components/ui";
import PageTitle from "@/shared/title";
import { useRouter } from "next/navigation";
import { ChangePasswordForm } from "./form";

function Page() {
  const router = useRouter();
  return (
    <PageWrapper className="w-full">
      <div className="flex items-center gap-2 mb-4">
        <Icon
          name="ArrowLeft"
          className="h-5 w-5 text-black hover:cursor-pointer"
          onClick={() => {
            router.back();
          }}
        />
        <span className=" text-sm font-medium">Settings</span>
      </div>
      <PageTitle title={"Change Password"} />
      <p className="text-sm">
        Enter current password then new password to reset
      </p>
      <ChangePasswordForm />
    </PageWrapper>
  );
}

export default Page;
