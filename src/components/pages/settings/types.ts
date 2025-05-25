import { LucideIconProps } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export type Tag = {
  id: string;
  name: string;
};

export const ChangePwdSchema = z
  .object({
    oldPassword: z.string().min(1, { message: "Old Password is required" }),
    newPasswordConfirmation: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
    newPassword: z.string().min(1, { message: "New Password is required" }),
  })
  .refine(
    (data) => {
      if (
        data.oldPassword &&
        data.newPassword &&
        data.newPassword === data.oldPassword
      ) {
        return false;
      }
      return true;
    },
    {
      message: "New password cannot be the same as the old password",
      path: ["newPassword"],
    },
  )
  .refine(
    (data) => {
      if (
        data.newPassword &&
        data.newPasswordConfirmation &&
        data.newPassword !== data.newPasswordConfirmation
      ) {
        return false;
      }
      return true;
    },
    {
      message:
        "Passwords do not match. Please ensure both fields are identical",
      path: ["newPasswordConfirmation"],
    },
  )
  .superRefine(({ newPassword }, checkPassComplexity) => {
    const containsSpecialChar = (ch: string) =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\s])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\s]{8,}$/.test(
        ch,
      );
    if (!containsSpecialChar(newPassword)) {
      checkPassComplexity.addIssue({
        code: "custom",
        path: ["newPassword"],
        message:
          "Password must contain One Uppercase, One Lowercase, One Number and One Special Case Character.",
      });
    }
  });

export type TChangePwd = z.infer<typeof ChangePwdSchema>;
export const ChangePwdValidator = zodResolver(ChangePwdSchema);

// types.ts
export type SettingItem = {
  name: string;
  path: string;
  icon: LucideIconProps;
};

export type SettingCategory = {
  title: string;
  items: SettingItem[];
  icon: LucideIconProps;
};

// settingsData.ts
export const settingCategories: SettingCategory[] = [
  {
    title: "General Settings",
    icon: "Settings",
    items: [
      {
        name: "Configurations",
        path: "/settings/config",
        icon: "Settings",
      },
      { name: "Code Settings", path: "/settings/code-settings", icon: "Code" },
      {
        name: "Workflow Builder",
        path: "/settings/workflow-config",
        icon: "FileText",
      },
    ],
  },
  {
    title: "User Account Management",
    icon: "User",
    items: [
      { name: "Approvals", path: "/settings/approvals", icon: "ClipboardList" },
      {
        name: "Change Password",
        path: "/settings/change-password",
        icon: "Key",
      },
    ],
  },
  {
    title: "Inventory Management",
    icon: "Package",
    items: [
      {
        name: "Manufacturers",
        path: "/settings/manufacturers",
        icon: "Factory",
      },
      { name: "Suppliers", path: "/settings/suppliers", icon: "Truck" },
      { name: "Warehouses", path: "/settings/warehouses", icon: "Warehouse" },
      { name: "Locations", path: "/settings/locations", icon: "Layers2" },
      { name: "Racks", path: "/settings/racks", icon: "Rows3" },
      { name: "Shelves", path: "/settings/shelves", icon: "Rows4" },
      { name: "Equipment", path: "/settings/equipment", icon: "Wrench" },
    ],
  },
  {
    title: "Organizational Structure",
    icon: "Building2",
    items: [
      { name: "Departments", path: "/settings/departments", icon: "Building" },
      { name: "Working Days", path: "/settings/working-days", icon: "Clock" },
      { name: "Holidays", path: "/settings/holidays", icon: "Calendar" },
      {
        name: "Shifts Type",
        path: "/settings/shift-types",
        icon: "CalendarCheck2",
      },
      {
        name: "Shifts Schedule",
        path: "/settings/shift-schedule",
        icon: "CalendarCheck",
      },
    ],
  },
];
