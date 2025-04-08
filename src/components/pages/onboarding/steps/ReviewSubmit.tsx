import { Control, useWatch } from "react-hook-form";

import { Button, Card, CardContent } from "@/components/ui";

import { OnboardingFormValues } from "../types";

interface ReviewItem {
  label: string;
  value: string;
}

interface Section {
  title: string;
  content: ReviewItem[];
  stepIndex: number;
}

interface ReviewSubmitStepProps {
  control: Control<OnboardingFormValues>;
  onEdit: (stepIndex: number) => void;
}

const ReviewSubmitStep = ({ control, onEdit }: ReviewSubmitStepProps) => {
  // Explicitly annotate the data using OnboardingFormValues, so you know the data shape
  // const data = useWatch<OnboardingFormValues>({ control });
  const data = useWatch<OnboardingFormValues>({
    control: control as Control<OnboardingFormValues>,
  });

  // Build a review summary for each section.
  const sections: Section[] = [
    {
      title: "Personal Information",
      stepIndex: 0,
      content: [
        { label: "Full Name", value: data.fullName || "" },
        {
          label: "Date of Birth",
          value: data.dob ? new Date(data.dob).toLocaleDateString() : "",
        },
        { label: "Gender", value: data.gender?.label || "" },
        { label: "Residential Address", value: data.address || "" },
        {
          label: "Date Employed",
          value: data.dateEmployed
            ? new Date(data.dateEmployed).toLocaleDateString()
            : "",
        },
        { label: "Email", value: data.email || "" },
        { label: "Contact Number", value: data.contactNumber || "" },
        { label: "Nationality", value: data.nationality?.label || "" },
        { label: "State/Region", value: data.region || "" },
        { label: "Marital Status", value: data.maritalStatus?.label || "" },
        { label: "Religion", value: data.religion?.label || "" },
      ],
    },
    {
      title: "Family Information (Part 1)",
      stepIndex: 1,
      content: [
        { label: "Father's Full Name", value: data.father?.fullName || "" },
        {
          label: "Father's Contact Number",
          value: data.father?.contactNumber || "",
        },
        {
          label: "Father's Life Status",
          value: data.father?.lifeStatus?.label || "",
        },
        { label: "Father's Occupation", value: data.father?.occupation || "" },
        { label: "Mother's Full Name", value: data.mother?.fullName || "" },
        {
          label: "Mother's Contact Number",
          value: data.mother?.contactNumber || "",
        },
        {
          label: "Mother's Life Status",
          value: data.mother?.lifeStatus?.label || "",
        },
        { label: "Mother's Occupation", value: data.mother?.occupation || "" },
        { label: "Spouse's Full Name", value: data.spouse?.fullName || "" },
        {
          label: "Spouse's Contact Number",
          value: data.spouse?.contactNumber || "",
        },
        {
          label: "Spouse's Life Status",
          value: data.spouse?.lifeStatus?.label || "",
        },
        { label: "Spouse's Occupation", value: data.spouse?.occupation || "" },
      ],
    },
    {
      title: "Family Information (Part 2)",
      stepIndex: 2,
      content: [
        {
          label: "Emergency Contact Full Name",
          value: data.emergencyContact?.fullName || "",
        },
        {
          label: "Emergency Contact Number",
          value: data.emergencyContact?.contactNumber || "",
        },
        {
          label: "Emergency Contact Address",
          value: data.emergencyContact?.address || "",
        },
        {
          label: "Emergency Contact Relation",
          value: data.emergencyContact?.relation || "",
        },
        {
          label: "Next of Kin Full Name",
          value: data.nextOfKin?.fullName || "",
        },
        {
          label: "Next of Kin Contact Number",
          value: data.nextOfKin?.contactNumber || "",
        },
        { label: "Next of Kin Address", value: data.nextOfKin?.address || "" },
        {
          label: "Next of Kin Relation",
          value: data.nextOfKin?.relation || "",
        },
        {
          label: "Children",
          value:
            data.children && data.children.length > 0
              ? data.children
                  .map(
                    (child, i: number) =>
                      // Since child.sex is an object of type { value: string; label: string }
                      `Child ${i + 1}: ${child.fullName}, ${child.dob ? new Date(child.dob).toLocaleDateString() : ""}, ${child.sex?.label}`,
                  )
                  .join(" | ")
              : "N/A",
        },
      ],
    },
    {
      title: "Education & Training Background",
      stepIndex: 3,
      content: [
        {
          label: "Education",
          value:
            data.education && data.education.length > 0
              ? data.education
                  .map(
                    (edu, i: number) =>
                      `Edu ${i + 1}: ${edu.schoolName}, ${edu.major}, ${edu.qualification}, ${
                        edu.startDate
                          ? new Date(edu.startDate).toLocaleDateString()
                          : ""
                      } - ${
                        edu.endDate
                          ? new Date(edu.endDate).toLocaleDateString()
                          : ""
                      }`,
                  )
                  .join(" | ")
              : "N/A",
        },
      ],
    },
    {
      title: "Employment History",
      stepIndex: 4,
      content: [
        {
          label: "Employment",
          value:
            data.employment && data.employment.length > 0
              ? data.employment
                  .map(
                    (emp, i: number) =>
                      `Emp ${i + 1}: ${emp.companyName}, ${emp.position}, ${
                        emp.startDate
                          ? new Date(emp.startDate).toLocaleDateString()
                          : ""
                      } - ${
                        emp.endDate
                          ? new Date(emp.endDate).toLocaleDateString()
                          : ""
                      }`,
                  )
                  .join(" | ")
              : "N/A",
        },
      ],
    },
    {
      title: "Payment Information",
      stepIndex: 5,
      content: [
        { label: "Account Number", value: data.accountNumber || "" },
        { label: "SSNIT Number", value: data.ssnitNumber || "" },
        { label: "Ghana Card Number", value: data.ghanaCardNumber || "" },
      ],
    },
  ];

  return (
    <div className="space-y-6 p-4 pb-16">
      {sections.map((section) => (
        <Card key={section.title}>
          <CardContent>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold">{section.title}</h3>
              <Button onClick={() => onEdit(section.stepIndex)} variant="ghost">
                Edit
              </Button>
            </div>
            {/* Display the items in a grid of 3 columns */}
            <div className="grid grid-cols-3 gap-4">
              {section.content.map((item) => (
                <div key={item.label} className="flex flex-col">
                  <span className="font-medium">{item.label}:</span>
                  <span>{item.value || "N/A"}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ReviewSubmitStep;
