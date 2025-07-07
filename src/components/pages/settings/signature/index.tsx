"use client";
import PageWrapper from "@/components/layout/wrapper";
import {
  Button,
  Icon,
  Skeleton,
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import PageTitle from "@/shared/title";
import Link from "next/link";
import React, { useState } from "react";
import {
  CreateSignatureValidator,
  SIGNATURE_TABS,
  SignatureSchemaType,
  SignatureTab,
  tabsStyles,
} from "./types";
import { TabsContent } from "@radix-ui/react-tabs";
import SignatureForm from "./form";
import { useForm } from "react-hook-form";
import {
  UploadFileRequest,
  useGetApiV1UserAuthenticatedQuery,
  usePostApiV1UserSignatureByIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { toast } from "sonner";
import { AuditModules, ErrorResponse, isErrorResponse } from "@/lib";
import { useSelector } from "@/lib/redux/store";
import Image from "next/image";

function SignatureSettings() {
  const [activeTab, setActiveTab] = useState<SignatureTab>("SIGNATURE");
  const [signature, setSignature] = useState<string | null>(null);
  const [createSignature, { isLoading }] =
    usePostApiV1UserSignatureByIdMutation({});

  const userId = useSelector((state) => state.persistedReducer?.auth?.userId);
  const { data: user, isLoading: loadingUser } =
    useGetApiV1UserAuthenticatedQuery({
      module: AuditModules.settings.name,
      subModule: AuditModules.settings.authUser,
    });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignatureSchemaType>({
    resolver: CreateSignatureValidator,
  });

  const onSubmit = async (data: SignatureSchemaType) => {
    console.log(data);
    if (!userId) return;
    try {
      const result = await createSignature({
        id: userId as string,
        module: AuditModules.settings.name,
        uploadFileRequest: {
          file: data.signature,
        } as UploadFileRequest,
        subModule: AuditModules.settings.signature,
      });
      if (!result.error) {
        toast.success("Signature saved successfully!");
        setSignature(data.signature);
        return;
      }
      throw result.error;
    } catch (error) {
      console.error("Error submitting signature:", error);
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };
  return (
    <PageWrapper className="w-full">
      <div className="flex w-full items-center justify-between gap-4 mb-3">
        <Link
          href={"/settings"}
          className="flex items-center gap-2 hover:underline"
        >
          <Icon name="ArrowLeft" className="size-5" />
          Settings
        </Link>
        <Button>Edit</Button>
      </div>
      <PageTitle title="Digital Signature" />

      {/* signature container */}
      {loadingUser ? (
        <div className="w-full px-4 min-w-60 h-32 rounded-lg flex items-center justify-start border">
          <Skeleton className="h-24 w-48 rounded-md" />
        </div>
      ) : user?.signature || signature ? (
        <div className="w-full px-4 min-w-60 h-32 rounded-lg flex items-center justify-start">
          <Image
            src={signature ?? user?.signature ?? ""}
            alt="Signature"
            className="max-h-full max-w-full object-contain"
            width={300}
            height={200}
          />
        </div>
      ) : (
        <div className="w-full min-w-60 h-32 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">No signature Yet</p>
        </div>
      )}
      <Tabs value={activeTab} className="w-full my-4">
        <TabsList className="w-full flex justify-between gap-2">
          {Object.entries(SIGNATURE_TABS).map(([key, label]) => (
            <TabsTrigger
              key={key + label}
              value={key as SignatureTab}
              onClick={() => setActiveTab(key as SignatureTab)}
              className={`${tabsStyles} w-full gap-3`}
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col"
        >
          {Object.entries(SIGNATURE_TABS).map(([key, label]) => (
            <TabsContent value={key} key={key + label}>
              <SignatureForm
                errors={errors}
                control={control}
                register={register}
                type={key as SignatureTab}
              />
            </TabsContent>
          ))}
          <Button disabled={isLoading} className="mt-4 ml-auto">
            Save Changes
          </Button>
        </form>
      </Tabs>
    </PageWrapper>
  );
}

export default SignatureSettings;
