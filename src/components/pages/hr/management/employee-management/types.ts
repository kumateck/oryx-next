import {
  EmployeeActiveStatus,
  EmployeeInactiveStatus,
  EmployeeStatusType,
  splitWords,
} from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
