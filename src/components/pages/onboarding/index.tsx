"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { Button } from "@/components/ui";
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

export default function OnboardingForm() {
  const [currentStep, setCurrentStep] = useState(0);

  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm<OnboardingFormValues>({
    resolver: zodResolver(fullOnboardingSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
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

  const {
    fields: childFields,
    append: appendChild,
    remove: removeChild,
  } = useFieldArray({ control, name: "children" });

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

  const handleNext = async () => {
    // For review step (final step) we don’t need to trigger validation
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

  const onSubmit = (data: OnboardingFormValues) => {
    console.log("Form data:", data);
    // Submit your data here
  };

  // Render the current step as a JSX component.
  // For the review step, pass the onEdit handler.
  const StepComponent = steps[currentStep]
    .component as React.ComponentType<any>;

  return (
    <div className="mx-auto max-h-screen w-full space-y-6 overflow-y-auto p-6">
      <PageTitle title={steps[currentStep].title} />
      <ProgressIndicator steps={steps.length} currentStep={currentStep} />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6 p-4">
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
            <Button type="submit">Submit</Button>
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
