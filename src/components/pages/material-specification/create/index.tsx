"use client";
import { FormWizard } from "@/components/form-inputs";
import { Button, Card, Icon } from "@/components/ui";
import {
  EMaterialKind,
  ErrorResponse,
  InputTypes,
  isErrorResponse,
} from "@/lib";
import React, { useEffect } from "react";
import { Control, useFieldArray, useForm } from "react-hook-form";
import {
  CreateMaterialSpecificationDto,
  CreateMaterialSpecificationValidator,
  MaterialSpecificationReference,
  TestType,
} from "../types";
import SpecificationForm from "./form";
import PageWrapper from "@/components/layout/wrapper";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import { useRouter, useSearchParams } from "next/navigation";
import {
  MaterialSpecificationReference as MaterialSpecificationReferenceEnum,
  TestType as TestTypeEnum,
  useGetApiV1MaterialDepartmentQuery,
  usePostApiV1MaterialSpecificationsMutation,
} from "@/lib/redux/api/openapi.generated";
import { toast } from "sonner";

function Page() {
  return (
    <PageWrapper>
      <ScrollablePageWrapper>
        <MaterialSpecPage />
      </ScrollablePageWrapper>
    </PageWrapper>
  );
}

export default Page;

export function MaterialSpecPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const kind = searchParams.get("kind") as unknown as EMaterialKind;
  const { data: materials } = useGetApiV1MaterialDepartmentQuery({
    kind: kind ?? EMaterialKind.Raw,
  });
  const [createMaterialSpecification, { isLoading }] =
    usePostApiV1MaterialSpecificationsMutation();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateMaterialSpecificationDto>({
    resolver: CreateMaterialSpecificationValidator,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "testSpecifications",
  });

  const materialOptions =
    materials?.data?.map((material) => ({
      label: material?.material?.name as string,
      value: material?.material?.id as string,
    })) || [];

  //TODO: Implement onSubmit function
  const onSubmit = async (data: CreateMaterialSpecificationDto) => {
    const payload = {
      specificationNumber: data.specificationNumber,
      revisionNumber: data.revisionNumber,
      supersedesNumber: data.supersedesNumber,
      effectiveDate: data.effectiveDate
        ? new Date(data.effectiveDate).toISOString()
        : "",
      reviewDate: data.reviewDate
        ? new Date(data.reviewDate).toISOString()
        : "",
      testSpecifications: data.testSpecifications.map((test) => ({
        srNumber: test.srNumber,
        testName: test.testName.value as unknown as TestTypeEnum,
        releaseSpecification: test.releaseSpecification,
        reference: test.reference
          .value as unknown as MaterialSpecificationReferenceEnum,
      })),
      materialId: data.materialId.value as string,
    };
    console.log("Submitting data", payload);
    try {
      await createMaterialSpecification({
        createMaterialSpecificationRequest: payload,
      }).unwrap();
      toast.success("Supplier Selected successfully");
      router.back();
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  useEffect(() => {
    console.log("form data", errors);
  }, [errors]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <SpecificationForm
        control={control}
        register={register}
        materialOptions={materialOptions}
        kind={kind}
        errors={errors}
      />
      <div className="flex justify-between items-center mt-4">
        <span className="font-semibold">Tests & Specification</span>
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            append({
              reference: {
                value: "",
                label: "",
              },
              releaseSpecification: "",
              srNumber: 0,
              testName: {
                value: "",
                label: "",
              },
            })
          }
        >
          <Icon name="Plus" className="h-4 w-4 mr-2" /> Test & Specification
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field, index) => (
          <Card key={field.id}>
            <div key={field.id} className="p-4 rounded-md relative space-y-3">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="absolute top-2 right-2 text-red-500"
                onClick={() => remove(index)}
              >
                <Icon name="Trash" className="h-4 w-4" />
              </Button>
              <FormWizard
                config={[
                  {
                    label: "Test Name",
                    type: InputTypes.SELECT,
                    name: `testSpecifications.${index}.testName`,
                    control: control as unknown as Control,
                    placeholder: "Select Test Name",
                    options: Object.keys(TestType) // get only labels
                      .map((label) => ({
                        label: String(label),
                        value: String(TestType[label]),
                      })),
                    errors,
                  },
                  {
                    label: "Release Specification",
                    type: InputTypes.TEXTAREA,
                    register: register(
                      `testSpecifications.${index}.releaseSpecification`,
                    ),
                    errors,
                  },
                  {
                    label: "Reference",
                    type: InputTypes.SELECT,
                    name: `testSpecifications.${index}.reference`,
                    control: control as unknown as Control,
                    placeholder: "Select Reference",
                    options: Object.keys(MaterialSpecificationReference) // get only labels
                      .map((label) => ({
                        label: String(label),
                        value: String(MaterialSpecificationReference[label]),
                      })),
                    errors,
                  },
                ]}
              />
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-end gap-4">
        <Button
          onClick={() => router.back()}
          disabled={isLoading}
          type="button"
          variant="outline"
        >
          Cancel
        </Button>
        <Button disabled={isLoading} type="submit">
          {isLoading && (
            <Icon name="LoaderCircle" className="animate-spin h-4 w-4 mr-2" />
          )}
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
}
