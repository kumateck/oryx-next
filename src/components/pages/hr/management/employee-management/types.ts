import {
  EmployeeActiveStatus,
  EmployeeInactiveStatus,
  EmployeeStatusType,
  splitWords,
} from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const StatusColorsOptions = {
  statusColors: {
    [EmployeeStatusType.Active]: "bg-green-600 text-white",
    [EmployeeStatusType.Inactive]: "bg-yellow-500 text-white",
    [EmployeeStatusType.New]: "bg-blue-500 text-white",
  },
  inactiveStatus: {
    [EmployeeInactiveStatus.Deceased]: "bg-blue-500 text-white",
    [EmployeeInactiveStatus.VacatedPost]: "bg-gray-500 text-white",
    [EmployeeInactiveStatus.Resignation]: "bg-pink-500 text-white",
    [EmployeeInactiveStatus.SummaryDismissed]: "bg-gray-500 text-white",
    [EmployeeInactiveStatus.Termination]: "bg-red-500 text-white",
  },
  activeStatus: {
    [EmployeeActiveStatus.FinalWarning]: "bg-red-500 text-white",
    [EmployeeActiveStatus.Question]: "bg-blue-500 text-white",
    [EmployeeActiveStatus.Warning]: "bg-yellow-500 text-white",
    [EmployeeActiveStatus.Suspension]: "bg-gray-500 text-white",
  },
};

export function getDisplayStatus(
  status: EmployeeStatusType,
  activeStatus?: EmployeeActiveStatus | null,
  inactiveStatus?: EmployeeInactiveStatus | null,
): string {
  if (status === EmployeeStatusType.Active) {
    return activeStatus != null
      ? splitWords(EmployeeActiveStatus[activeStatus])
      : splitWords(EmployeeStatusType[status]);
  }

  if (status === EmployeeStatusType.Inactive) {
    return inactiveStatus != null
      ? splitWords(EmployeeInactiveStatus[inactiveStatus])
      : splitWords(EmployeeStatusType[status]);
  }

  return splitWords(EmployeeStatusType[status]);
}

export const associateEmployeesRequestSchema = z.object({
  employeeType: z.object(
    {
      value: z.string().min(1, { message: "Employee Type is required" }),
      label: z.string(),
    },
    {
      message: `Employee Type is required`,
    },
  ),
  email: z.string().email().min(1, { message: "Email is required" }),
});

export const CreateEmployeeSchema = z.object({
  employees: z.array(associateEmployeesRequestSchema),
});

export type EmployeeRequestDto = z.infer<typeof CreateEmployeeSchema>;
export const CreateEmployeeValidator = zodResolver(CreateEmployeeSchema);
export type EmployeeItemDto = z.infer<typeof associateEmployeesRequestSchema>;
