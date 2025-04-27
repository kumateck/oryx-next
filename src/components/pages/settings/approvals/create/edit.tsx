"use client";
import { Button, Icon } from "@/components/ui";
import PageTitle from "@/shared/title";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { ApprovalRequestDto, ApprovalValidator } from "../types";
import ApprovalForm from "./form";
import {
  ApprovalDocument,
  COLLECTION_TYPES,
  formatClock24,
  InterestType,
  Option,
  parseClock,
  routes,
  splitWords,
} from "@/lib";
import {
  PostApiV1ApprovalApiArg,
  useLazyGetApiV1ApprovalByApprovalIdQuery,
  usePostApiV1CollectionMutation,
  usePutApiV1ApprovalByApprovalIdMutation,
} from "@/lib/redux/api/openapi.generated";
import ThrowErrorMessage from "@/lib/throw-error";
import { toast } from "sonner";

const EditApproval = () => {
  const { id } = useParams();
  const approvalId = id as string;
  const [saveApproval, { isLoading }] =
    usePutApiV1ApprovalByApprovalIdMutation();
  const [loadApprovalById, { isLoading: isApprovalsQueryLoading }] =
    useLazyGetApiV1ApprovalByApprovalIdQuery();

  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ApprovalRequestDto>({
    resolver: ApprovalValidator,
    mode: "onSubmit",
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "approvalStages",
  });

  const handleLoadingApproval = async (id: string) => {
    const response = await loadApprovalById({
      approvalId: id,
    }).unwrap();
    console.log(response, "response");

    const approvalStages = response?.approvalStages?.map((stage) => ({
      type: stage.role?.id ? InterestType.Role : InterestType.User,
      roleId: stage.role?.id
        ? { value: stage.role.id, label: stage.role?.name || "" }
        : undefined,
      userId: stage.user?.id
        ? { value: stage.user.id, label: stage.user?.name || "" }
        : undefined,
      required: true,
    }));

    setValue("approvalStages", approvalStages);
    // setValue("escalationDuration", response.)
    setValue("itemType", {
      value: response.itemType as string,
      label: splitWords(response.itemType as ApprovalDocument),
    });
  };

  useEffect(() => {
    handleLoadingApproval(approvalId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [approvalId]);
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

  // console.log(errors, "errors");
  const onSubmit = async (data: ApprovalRequestDto) => {
    const itemType = data.itemType?.value;

    const approvalStages = data.approvalStages?.map((stage, i) => ({
      roleId:
        stage.type === InterestType.Role ? stage.roleId?.value : undefined,
      userId:
        stage.type === InterestType.User ? stage.userId?.value : undefined,
      required: true, //stage.required ? true : false,
      order: i + 1,
    }));
    const formatClock24Input = parseClock(data.escalationDuration);
    const payload = {
      createApprovalRequest: {
        approvalStages,
        itemType,
        escalationDuration: formatClock24(
          formatClock24Input.hours,
          formatClock24Input.minutes,
          formatClock24Input.light,
          formatClock24Input.days,
        ),
      },
    } as PostApiV1ApprovalApiArg;
    try {
      await saveApproval({
        approvalId,
        createApprovalRequest: payload.createApprovalRequest,
      }).unwrap();
      toast.success("Approval created successfully");
      router.push(routes.approvals());
    } catch (error) {
      ThrowErrorMessage(error);
    }
  };
  const typeValues =
    useWatch({
      control,
      name: "approvalStages",
    })?.map((stage) => stage?.type) || [];
  return (
    <div className="w-full space-y-5">
      {isApprovalsQueryLoading && (
        <div className="flex w-full items-center justify-center">
          <Icon name="LoaderCircle" className="h-6 w-6 animate-spin" />
        </div>
      )}
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
            <PageTitle title="Edit Approval" />
          </div>
          <Button
            type="submit"
            variant="default"
            size="default"
            className="flex h-9 items-center gap-2"
          >
            {isLoading && (
              <Icon name="LoaderCircle" className="h-4 w-4 animate-spin" />
            )}
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

export default EditApproval;
