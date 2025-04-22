"use client";
import { Button, Icon } from "@/components/ui";
import PageTitle from "@/shared/title";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { ApprovalRequestDto, ApprovalValidator } from "../types";
import ApprovalForm from "./form";
import { COLLECTION_TYPES, Option } from "@/lib";
import { usePostApiV1CollectionMutation } from "@/lib/redux/api/openapi.generated";

const CreateApproval = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ApprovalRequestDto>({
    resolver: ApprovalValidator,
    mode: "onSubmit",
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "approvalStages",
  });
  const [loadCollection, { data: collectionResponse }] =
    usePostApiV1CollectionMutation();
  useEffect(() => {
    loadCollection({
      body: [COLLECTION_TYPES.Role, COLLECTION_TYPES.User],
    }).unwrap();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const roleOptions = collectionResponse?.[COLLECTION_TYPES.Role]?.map(
    (role) => ({
      label: role.name,
      value: role.id,
    }),
  ) as Option[];

  const userOptions = collectionResponse?.[COLLECTION_TYPES.User]?.map(
    (user) => ({
      label: user.name,
      value: user.id,
    }),
  ) as Option[];
  const onSubmit = async (data: ApprovalRequestDto) => {
    console.log(data, "data");
  };

  const typeValues =
    useWatch({
      control,
      name: "approvalStages",
    })?.map((stage) => stage?.type) || [];
  return (
    <div className="w-full space-y-5">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon
              name="ArrowLeft"
              className="h-5 w-5 text-black hover:cursor-pointer"
              onClick={() => {
                router.back();
              }}
            />
            <PageTitle title="Create Template" />
          </div>
          <Button
            type="submit"
            variant="default"
            size="default"
            className="flex h-9 items-center gap-2"
          >
            {/* {isLoading && (
              <Icon name="LoaderCircle" className="h-4 w-4 animate-spin" />
            )} */}
            <span>Save Changes</span>
          </Button>
        </div>
        <ApprovalForm
          register={register}
          control={control}
          errors={errors}
          fields={fields}
          append={append}
          remove={remove}
          typeValues={typeValues}
          roleOptions={roleOptions}
          userOptions={userOptions}
        />
      </form>
    </div>
  );
};

export default CreateApproval;
