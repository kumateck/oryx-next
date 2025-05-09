"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";

import { Button, Icon } from "@/components/ui";
import {
  CODE_SETTINGS,
  EmployeeType,
  ErrorResponse,
  Gender,
  LifeStatus,
  MaritalStatus,
  Religions,
  cn,
  isErrorResponse,
} from "@/lib";
import {
  CreateEmployeeRequest,
  EmployeeDto,
  PostApiV1FileByModelTypeAndModelIdApiArg,
  useGetApiV1EmployeeByIdQuery,
  usePostApiV1FileByModelTypeAndModelIdMutation,
  usePutApiV1EmployeeByIdMutation,
} from "@/lib/redux/api/openapi.generated";
import PageTitle from "@/shared/title";

import { ProgressIndicator } from "./ProgressIndicator";
import EducationStep from "./steps/Education";
import EmploymentHistoryStep from "./steps/EmploymentHistory";
import FamilyInfo1Step from "./steps/FamilyInfo1";
import FamilyInfo2Step from "./steps/FamilyInfo2";
import PaymentInformationStep from "./steps/PaymentInformation";
import PersonalInfoStep from "./steps/PersonalInfo";
import ReviewSubmitStep from "./steps/ReviewSubmit";
import {
  OnboardingFormValues,
  fullOnboardingSchema,
  stepSchemas,
} from "./types";

const steps = [
  {
    component: PersonalInfoStep,
    schema: stepSchemas.personalInfo,
    title: "Personal Information",
  },
  {
    component: FamilyInfo1Step,
    schema: stepSchemas.familyInfo1,
    title: "Family Information (Part 1)",
  },
  {
    component: FamilyInfo2Step,
    schema: stepSchemas.familyInfo2,
    title: "Family Information (Part 2)",
  },
  {
    component: EducationStep,
    schema: stepSchemas.education,
    title: "Education & Training Background",
  },
  {
    component: EmploymentHistoryStep,
    schema: stepSchemas.employment,
    title: "Employment History",
  },
  {
    component: PaymentInformationStep,
    schema: stepSchemas.paymentInformation,
    title: "Payment Information",
  },
  {
    component: ReviewSubmitStep,
    schema: null,
    title: "Review & Submit",
  },
];

const transformApiDataToFormValues = (
  data: EmployeeDto,
): OnboardingFormValues => ({
  passportPhoto: data.attachments,
  firstName: data.firstName as string,
  lastName: data.lastName as string,
  address: data.residentialAddress as string,
  email: data.email as string,
  contactNumber: data.phoneNumber as string,
  gender: {
    value: data.gender?.toString() as string,
    label: Gender[data.gender ?? 0] || "",
  },
  dob: new Date(data.dateOfBirth as string),
  dateEmployed: new Date(data.dateEmployed as string),
  accountNumber: data.bankAccountNumber as string,
  ssnitNumber: data.ssnitNumber as string,
  ghanaCardNumber: data.ghanaCardNumber as string,
  region: data.region as string,
  nationality: {
    value: data.nationality as string,
    label: data.nationality as string,
  },
  maritalStatus: {
    value: data.maritalStatus?.toString() as string,
    label: MaritalStatus[data.maritalStatus ?? 0] || "",
  },
  religion: {
    value: data.religion?.toString() as string,
    label: Religions[data.religion ?? 0] || "",
  },
  father: {
    fullName: data.father?.fullName as string,
    contactNumber: data.father?.phoneNumber as string,
    lifeStatus: {
      value: data.father?.lifeStatus.toString() as string,
      label: LifeStatus[data.father?.lifeStatus ?? 0] || "",
    },
    occupation: data.father?.occupation as string,
  },
  mother: {
    fullName: data.mother?.fullName as string,
    contactNumber: data.mother?.phoneNumber as string,
    lifeStatus: {
      value: data.mother?.lifeStatus.toString() as string,
      label: LifeStatus[data.mother?.lifeStatus ?? 0] || "",
    },
    occupation: data.mother?.occupation as string,
  },
  spouse:
    data.maritalStatus === MaritalStatus.Married && data.spouse
      ? {
          fullName: data.spouse.fullName as string,
          contactNumber: data.spouse.phoneNumber as string,
          occupation: data.spouse.occupation as string,
          lifeStatus: {
            value: data.spouse.lifeStatus.toString() as string,
            label: LifeStatus[data.spouse.lifeStatus as LifeStatus] as string,
          },
        }
      : undefined,
  emergencyContact: {
    fullName: data.emergencyContact?.fullName as string,
    contactNumber: data.emergencyContact?.contactNumber as string,
    relation: data.emergencyContact?.relationship as string,
    address: data.emergencyContact?.residentialAddress as string,
  },
  nextOfKin: {
    fullName: data.nextOfKin?.fullName as string,
    contactNumber: data.nextOfKin?.contactNumber as string,
    relation: data.nextOfKin?.relationship as string,
    address: data.nextOfKin?.residentialAddress as string,
  },
  children:
    data.children?.map((child) => ({
      fullName: child.fullName,
      dob: new Date(child.dateOfBirth),
      sex: {
        value: child.gender.toString(),
        label: Gender[child.gender] || "",
      },
    })) || [],
  siblings:
    data.siblings?.map((sibling) => ({
      fullName: sibling.fullName as string,
      contactNumber: sibling.contact as string,
      sex: {
        value: sibling.gender.toString(),
        label: Gender[sibling.gender] || "",
      },
    })) || [],
  education:
    data.educationBackground?.map((edu) => ({
      schoolName: edu.schoolName,
      startDate: new Date(edu.startDate),
      endDate: new Date(edu.endDate),
      major: edu.major,
      qualification: edu.qualificationEarned,
    })) || [],
  employment:
    data.employmentHistory?.map((emp) => ({
      companyName: emp.companyName as string,
      startDate: new Date(emp.startDate as string),
      endDate: new Date(emp.endDate as string),
      position: emp.position as string,
    })) || [],
});

export default function EditEmployeeForm() {
  const router = useRouter();
  const params = useParams();
  const employeeId = params.id as string;
  const [currentStep, setCurrentStep] = useState(0);

  const { data: employeeData, isLoading: isFetching } =
    useGetApiV1EmployeeByIdQuery({ id: employeeId }, { skip: !employeeId });

  const [updateEmployee, { isLoading }] = usePutApiV1EmployeeByIdMutation();
  const [uploadAttachment] = usePostApiV1FileByModelTypeAndModelIdMutation();

  const { type } = useParams();
  const etype = type as string;

  const {
    register,
    handleSubmit,
    control,
    trigger,
    reset,
    formState: { errors },
  } = useForm<OnboardingFormValues>({
    resolver: zodResolver(fullOnboardingSchema),
    mode: "onTouched",
  });

  const {
    fields: childFields,
    append: appendChild,
    remove: removeChild,
  } = useFieldArray({ control, name: "children" });

  const {
    fields: siblingFields,
    append: appendSibling,
    remove: removeSibling,
  } = useFieldArray({ control, name: "siblings" });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({ control, name: "education" });

  const {
    fields: employmentFields,
    append: appendEmployment,
    remove: removeEmployment,
  } = useFieldArray({ control, name: "employment" });

  useEffect(() => {
    if (employeeData && !isFetching) {
      reset(transformApiDataToFormValues(employeeData));
    }
  }, [employeeData, isFetching, reset]);

  const handleNext = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (currentStep >= steps.length - 1) return;

    if (steps[currentStep].schema) {
      const currentSchema = steps[currentStep].schema;
      const isValid = await trigger(
        Object.keys(currentSchema.shape) as Array<keyof OnboardingFormValues>,
      );
      if (!isValid) return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrev = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const onSubmit = async (data: OnboardingFormValues) => {
    try {
      const payload: CreateEmployeeRequest = {
        employeeType: parseInt(etype) as unknown as EmployeeType,
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dob.toISOString(),
        gender: parseInt(data.gender.value) as unknown as Gender,
        phoneNumber: data.contactNumber,
        region: data.region,
        nationality: data.nationality.value,
        residentialAddress: data.address,
        maritalStatus: parseInt(
          data.maritalStatus.value,
        ) as unknown as MaritalStatus,
        religion: parseInt(data.religion.value) as unknown as Religions,
        dateEmployed: data.dateEmployed.toISOString(),
        bankAccountNumber: data.accountNumber,
        ssnitNumber: data.ssnitNumber,
        ghanaCardNumber: data.ghanaCardNumber,
        email: data.email,
        father: {
          fullName: data.father.fullName,
          phoneNumber: data.father.contactNumber,
          occupation: data.father.occupation,
          lifeStatus: parseInt(
            data.father.lifeStatus.value,
          ) as unknown as LifeStatus,
        },
        mother: {
          fullName: data.mother.fullName,
          phoneNumber: data.mother.contactNumber,
          occupation: data.mother.occupation,
          lifeStatus: parseInt(
            data.mother.lifeStatus.value,
          ) as unknown as LifeStatus,
        },
        spouse: data.spouse
          ? {
              fullName: data.spouse.fullName as string,
              phoneNumber: data.spouse.contactNumber as string,
              occupation: data.spouse.occupation as string,
              lifeStatus: parseInt(
                data.spouse.lifeStatus?.value as string,
              ) as unknown as LifeStatus,
            }
          : undefined,
        emergencyContact: {
          fullName: data.emergencyContact.fullName,
          contactNumber: data.emergencyContact.contactNumber,
          relationship: data.emergencyContact.relation,
          residentialAddress: data.emergencyContact.address,
        },
        nextOfKin: {
          fullName: data.nextOfKin.fullName,
          contactNumber: data.nextOfKin.contactNumber,
          relationship: data.nextOfKin.relation,
          residentialAddress: data.nextOfKin.address,
        },
        children:
          data.children?.map((child) => ({
            fullName: child.fullName || "",
            dateOfBirth: child.dob?.toISOString() || "",
            gender: parseInt(child.sex.value) as unknown as Gender,
          })) || [],
        educationBackground:
          data.education?.map((edu) => ({
            schoolName: edu.schoolName,
            startDate: edu.startDate.toISOString(),
            endDate: edu.endDate.toISOString(),
            major: edu.major,
            qualificationEarned: edu.qualification,
          })) || [],
        employmentHistory:
          data.employment?.map((emp) => ({
            companyName: emp.companyName,
            startDate: emp.startDate.toISOString(),
            endDate: emp.endDate.toISOString(),
            position: emp.position,
          })) || [],
      };

      await updateEmployee({
        id: employeeId,
        createEmployeeRequest: payload,
      }).unwrap();

      if (data.passportPhoto) {
        const formData = new FormData();
        // Ensure attachments are an array
        const attachmentsArray = Array.isArray(data.passportPhoto)
          ? data.passportPhoto
          : Array.from(data.passportPhoto); // Convert FileList to an array

        attachmentsArray.forEach((attachment: File) => {
          formData.append("files", attachment, attachment.name);
        });
        await uploadAttachment({
          modelType: CODE_SETTINGS.modelTypes.Employee,
          modelId: employeeId,
          body: formData,
        } as PostApiV1FileByModelTypeAndModelIdApiArg).unwrap();
      }

      toast.success("Employee updated successfully");
      router.push("/hr/employee-management");
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  if (isFetching) return <div className="p-6">Loading employee data...</div>;

  const StepComponent = steps[currentStep]
    .component as React.ComponentType<any>;

  return (
    <div className="mx-auto max-h-screen w-full space-y-6 overflow-y-auto p-6">
      <div>
        <div
          className="inline-flex items-center gap-2 mb-4 hover:cursor-pointer"
          onClick={() => router.back()}
        >
          <Icon name="ArrowLeft" className="h-5 w-5" />
          <h1 className="font-medium text-base text-primary-500">
            Employee List
          </h1>
        </div>
      </div>

      <PageTitle
        title={`Edit Employee - ${employeeData?.firstName || ""} ${employeeData?.lastName || ""}`}
      />
      <ProgressIndicator steps={steps.length} currentStep={currentStep} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && currentStep !== steps.length - 1) {
            e.preventDefault();
          }
        }}
        className="mt-8 space-y-6 p-4"
      >
        {currentStep === steps.length - 1 ? (
          <StepComponent
            control={control}
            onEdit={(stepIndex: number) => setCurrentStep(stepIndex)}
          />
        ) : (
          <StepComponent
            register={register}
            control={control}
            errors={errors}
            defaulValues={employeeData}
            fields={
              currentStep === 2
                ? childFields
                : currentStep === 3
                  ? educationFields
                  : currentStep === 4
                    ? employmentFields
                    : []
            }
            append={
              currentStep === 2
                ? appendChild
                : currentStep === 3
                  ? appendEducation
                  : currentStep === 4
                    ? appendEmployment
                    : ((() => {}) as any)
            }
            remove={
              currentStep === 2
                ? removeChild
                : currentStep === 3
                  ? removeEducation
                  : currentStep === 4
                    ? removeEmployment
                    : ((() => {}) as any)
            }
            siblingFields={currentStep === 2 ? siblingFields : undefined}
            appendSibling={currentStep === 2 ? appendSibling : undefined}
            removeSibling={currentStep === 2 ? removeSibling : undefined}
          />
        )}

        <div className="flex justify-between">
          <Button
            type="button"
            variant="secondary"
            onClick={handlePrev}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          {currentStep === steps.length - 1 ? (
            <Button
              type="submit"
              variant={"default"}
              className="flex items-center gap-2"
              disabled={isLoading}
            >
              <Icon
                name={isLoading ? "LoaderCircle" : "Save"}
                className={cn("h-4 w-4", { "animate-spin": isLoading })}
              />
              <span>{isLoading ? "Saving..." : "Save Changes"}</span>
            </Button>
          ) : (
            <Button type="button" onClick={handleNext}>
              Next
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
