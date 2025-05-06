"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

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
  PostApiV1EmployeeApiArg,
  PostApiV1FileByModelTypeAndModelIdApiArg,
  usePostApiV1EmployeeMutation,
  usePostApiV1FileByModelTypeAndModelIdMutation,
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
import { useParams, usePathname, useRouter } from "next/navigation";

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

export default function OnboardingForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [createEmployee, { isLoading }] = usePostApiV1EmployeeMutation();
  const [uploadAttachment, { isLoading: isUploadingAttachment }] =
    usePostApiV1FileByModelTypeAndModelIdMutation();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { type } = useParams();
  const etype = type as unknown as EmployeeType;

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
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      email: "",
      contactNumber: "",
      gender: { value: "", label: "" },
      dob: undefined,
      dateEmployed: undefined,
      accountNumber: "",
      ssnitNumber: "",
      ghanaCardNumber: "",
      father: {
        fullName: "",
        contactNumber: "",
        lifeStatus: { value: "", label: "" },
        occupation: "",
      },
      mother: {
        fullName: "",
        contactNumber: "",
        lifeStatus: { value: "", label: "" },
        occupation: "",
      },
      emergencyContact: {
        fullName: "",
        contactNumber: "",
        address: "",
        relation: "",
      },
      nextOfKin: { fullName: "", contactNumber: "", address: "", relation: "" },
      education: [
        {
          schoolName: "",
          startDate: undefined,
          endDate: undefined,
          major: "",
          qualification: "",
        },
      ],
      employment: [
        {
          companyName: "",
          position: "",
          startDate: undefined,
          endDate: undefined,
        },
      ],
    },
  });

  const router = useRouter();
  const pathname = usePathname();

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

  const transformFormData = (
    data: OnboardingFormValues,
  ): CreateEmployeeRequest => ({
    employeeType: etype,
    firstName: data.firstName,
    lastName: data.lastName,
    dateOfBirth: data.dob.toISOString(),
    // gender: Number(data.gender.value as unknown as Gender),
    gender: parseInt(data.gender.value) as unknown as Gender,
    phoneNumber: data.contactNumber,
    // contact: data.contactNumber,
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
    staffNumber: "",
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
          fullName: data.spouse.fullName || "",
          phoneNumber: data.spouse.contactNumber || "",
          occupation: data.spouse.occupation || "",
          lifeStatus: data.spouse.lifeStatus
            ? (parseInt(data.spouse.lifeStatus.value) as unknown as LifeStatus)
            : 0,
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
  });

  const onSubmit = async (data: OnboardingFormValues) => {
    try {
      const payload = {
        createEmployeeRequest: transformFormData(data),
      };

      const employeeId = await createEmployee({
        createEmployeeRequest: payload.createEmployeeRequest,
      } as PostApiV1EmployeeApiArg).unwrap();

      // const employeeId = await createEmployee(payload).unwrap();

      //only after successful submission
      if (employeeId) {
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

      toast.success("Form sent successfully");
      reset();
      setIsSubmitted(true);
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  const StepComponent = steps[currentStep]
    .component as React.ComponentType<any>;

  return (
    <div className="mx-auto max-h-screen w-full space-y-6 overflow-y-auto p-6">
      {isSubmitted ? (
        <div className="flex min-h-screen flex-col items-center justify-center">
          <h1 className="mb-4 text-4xl font-bold">Thank You!</h1>
          <p className="text-xl">
            Thank you for filling out the form. We appreciate your time.
          </p>
        </div>
      ) : (
        <>
          {pathname?.includes("hr/employee-management") && (
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
          )}
          {currentStep !== steps.length - 1 && (
            <h1 className="mb-8 text-center text-3xl font-bold">
              ENTRANCE PHARMACEUTICALS EMPLOYEE REGISTRATION FORM
            </h1>
          )}

          <PageTitle title={steps[currentStep].title} />
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
                >
                  <Icon
                    name={
                      isLoading || isUploadingAttachment
                        ? "LoaderCircle"
                        : "Plus"
                    }
                    className={cn("h-4 w-4", { "animate-spin": isLoading })}
                  />
                  <span>Save</span>
                </Button>
              ) : (
                <Button type="button" onClick={handleNext}>
                  Next
                </Button>
              )}
            </div>
          </form>
        </>
      )}
    </div>
  );
}
