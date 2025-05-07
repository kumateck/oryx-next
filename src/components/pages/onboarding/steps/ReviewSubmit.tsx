import { Control, FieldValues, useWatch } from "react-hook-form";

import { Button, Card, CardContent } from "@/components/ui";

import { OnboardingFormValues } from "../types";
import Image from "next/image";

interface ReviewItem {
  label: string;
  value: string;
}

interface SubSection {
  heading?: string;
  details: ReviewItem[];
}

interface Section {
  title: string;
  stepIndex: number;
  subSections?: SubSection[];
}

interface ReviewSubmitStepProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  onEdit: (stepIndex: number) => void;
}

const ReviewSubmitStep = <TFieldValues extends FieldValues>({
  control,
  onEdit,
}: ReviewSubmitStepProps<TFieldValues>) => {
  // Use an explicit cast so that 'data' has the full shape.
  const data = useWatch<OnboardingFormValues>({
    control: control as unknown as Control<OnboardingFormValues>,
  });

  const sections: Section[] = [
    {
      title: "Personal Information",
      stepIndex: 0,
      subSections: [
        {
          // No heading provided; render details in a 3-column grid.
          details: [
            { label: "First Name", value: data.firstName || "" },
            { label: "Last Name", value: data.lastName || "" },
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
      ],
    },
    {
      title: "Family Information (Part 1)",
      stepIndex: 1,
      subSections: [
        {
          heading: "Father",
          details: [
            { label: "Full Name", value: data.father?.fullName || "" },
            {
              label: "Contact Number",
              value: data.father?.contactNumber || "",
            },
            {
              label: "Life Status",
              value: data.father?.lifeStatus?.label || "",
            },
            { label: "Occupation", value: data.father?.occupation || "" },
          ],
        },
        {
          heading: "Mother",
          details: [
            { label: "Full Name", value: data.mother?.fullName || "" },
            {
              label: "Contact Number",
              value: data.mother?.contactNumber || "",
            },
            {
              label: "Life Status",
              value: data.mother?.lifeStatus?.label || "",
            },
            { label: "Occupation", value: data.mother?.occupation || "" },
          ],
        },
        // Only render spouse if data is present.
        ...(data.spouse && data.spouse.fullName
          ? [
              {
                heading: "Spouse",
                details: [
                  { label: "Full Name", value: data.spouse?.fullName || "" },
                  {
                    label: "Contact Number",
                    value: data.spouse?.contactNumber || "",
                  },
                  {
                    label: "Life Status",
                    value: data.spouse?.lifeStatus?.label || "",
                  },
                  { label: "Occupation", value: data.spouse?.occupation || "" },
                ],
              },
            ]
          : []),
      ],
    },
    {
      title: "Family Information (Part 2)",
      stepIndex: 2,
      subSections: [
        {
          heading: "Emergency Contact",
          details: [
            {
              label: "Full Name",
              value: data.emergencyContact?.fullName || "",
            },
            {
              label: "Contact Number",
              value: data.emergencyContact?.contactNumber || "",
            },
            { label: "Address", value: data.emergencyContact?.address || "" },
            { label: "Relation", value: data.emergencyContact?.relation || "" },
          ],
        },
        {
          heading: "Next of Kin",
          details: [
            { label: "Full Name", value: data.nextOfKin?.fullName || "" },
            {
              label: "Contact Number",
              value: data.nextOfKin?.contactNumber || "",
            },
            { label: "Address", value: data.nextOfKin?.address || "" },
            { label: "Relation", value: data.nextOfKin?.relation || "" },
          ],
        },
        // Render each child as its own sub-section
        ...(data.children && data.children.length > 0
          ? data.children.map((child, i) => ({
              heading: `Child ${i + 1}`,
              details: [
                { label: "Full Name", value: child.fullName || "" },
                {
                  label: "Date of Birth",
                  value: child.dob
                    ? new Date(child.dob).toLocaleDateString()
                    : "",
                },
                { label: "Gender", value: child.sex?.label || "" },
              ],
            }))
          : []),
        // Render each sibling (if any) as its own sub-section
        ...(data.siblings && data.siblings.length > 0
          ? data.siblings.map((sibling, i) => ({
              heading: `Sibling ${i + 1}`,
              details: [
                { label: "Full Name", value: sibling.fullName || "" },
                {
                  label: "Contact Number",
                  value: sibling.contactNumber || "",
                },
                { label: "Gender", value: sibling.sex?.label || "" },
              ],
            }))
          : []),
      ],
    },
    {
      title: "Education & Training Background",
      stepIndex: 3,
      subSections:
        data.education && data.education.length > 0
          ? data.education.map((edu, i) => ({
              heading: `Education ${i + 1}`,
              details: [
                { label: "School Name", value: edu.schoolName || "" },
                { label: "Major", value: edu.major || "" },
                { label: "Qualification", value: edu.qualification || "" },
                {
                  label: "Start Date",
                  value: edu.startDate
                    ? new Date(edu.startDate).toLocaleDateString()
                    : "",
                },
                {
                  label: "End Date",
                  value: edu.endDate
                    ? new Date(edu.endDate).toLocaleDateString()
                    : "",
                },
              ],
            }))
          : [],
    },
    {
      title: "Employment History",
      stepIndex: 4,
      subSections:
        data.employment && data.employment.length > 0
          ? data.employment.map((emp, i) => ({
              heading: `Employment ${i + 1}`,
              details: [
                { label: "Company Name", value: emp.companyName || "" },
                { label: "Position", value: emp.position || "" },
                {
                  label: "Start Date",
                  value: emp.startDate
                    ? new Date(emp.startDate).toLocaleDateString()
                    : "",
                },
                {
                  label: "End Date",
                  value: emp.endDate
                    ? new Date(emp.endDate).toLocaleDateString()
                    : "",
                },
              ],
            }))
          : [],
    },
    {
      title: "Payment Information",
      stepIndex: 5,
      subSections: [
        {
          // No heading provided; render details in a 3-column grid.
          details: [
            { label: "Account Number", value: data.accountNumber || "" },
            { label: "SSNIT Number", value: data.ssnitNumber || "" },
            { label: "Ghana Card Number", value: data.ghanaCardNumber || "" },
          ],
        },
      ],
    },
  ];

  const imagePreview =
    data.passportPhoto &&
    data.passportPhoto.type.startsWith("image") &&
    URL.createObjectURL(data.passportPhoto);

  return (
    <div className="space-y-6 p-4">
      <div></div>
      <div className=" w-48 h-48 overflow-hidden relative rounded-2xl">
        <Image
          src={imagePreview}
          alt="Image Preview"
          className="w-full h-full object-cover"
        />
      </div>
      {sections.map((section) => (
        <Card key={section.title} className="mb-4 border-0 pt-5">
          <CardContent>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-2xl font-bold">{section.title}</h3>
              <Button onClick={() => onEdit(section.stepIndex)} variant="ghost">
                Edit
              </Button>
            </div>
            {section.subSections?.map((sub, idx) => {
              if (!sub.heading) {
                return (
                  <div key={idx} className="grid grid-cols-3">
                    {sub.details.map((item, i) => (
                      <div key={i} className="flex gap-2 text-sm">
                        <span className="font-light text-gray-500">
                          {item.label}:
                        </span>
                        <span className="font-semibold">
                          {item.value || "N/A"}
                        </span>
                      </div>
                    ))}
                  </div>
                );
              }
              return null;
            })}

            {/* Render subsections with headings */}
            {section.subSections?.some((sub) => sub.heading) && (
              <div className="grid grid-cols-3 gap-4">
                {section.subSections
                  .filter((sub) => sub.heading)
                  .map((sub, idx) => (
                    <div key={idx} className="mb-4">
                      <h4 className="mb-2 font-medium text-gray-400">
                        {sub.heading}
                      </h4>
                      <div className="space-y-1">
                        {sub.details.map((item, i) => (
                          <div key={i} className="flex gap-2 text-sm">
                            <span className="font-light text-gray-500">
                              {item.label}:
                            </span>
                            <span className="font-semibold">
                              {item.value || "N/A"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ReviewSubmitStep;
