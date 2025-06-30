"use client";

import { Icon } from "@/components/ui";
import { fullname } from "@/lib";
import BgWrapper from "@/shared/bg-wrapper";

import useCurrentUser from "@/hooks/use-current";
import FormularBuilder from "@/components/formular/evaluate";

const Page = () => {
  const { user, isLoading } = useCurrentUser();

  return (
    <BgWrapper>
      <div className="flex flex-col gap-0.5">
        <span className="text-2xl font-medium text-primary-inverted">
          Welcome{" "}
          {isLoading ? (
            <Icon name="LoaderCircle" className="animate-spin" />
          ) : (
            fullname(user?.firstName as string, user?.lastName as string)
          )}
        </span>
        <span className="text-sm font-normal text-neutral-default">
          Work smarter with Oryx and skip the back and forth.
        </span>
      </div>

      <FormularBuilder />
    </BgWrapper>
  );
};

export default Page;
