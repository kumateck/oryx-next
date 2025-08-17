"use client";
import { useRouter } from "next/navigation";

import { Button, Icon } from "@/components/ui";
import { FormDto } from "@/lib/redux/api/openapi.generated";
import { FormTypeEnum, getEnumBadgeWithHexColors, PermissionKeys } from "@/lib";
import { useUserPermissions } from "@/hooks/use-permission";
import StatusBadge from "@/shared/status-badge";

interface Props {
  template: FormDto;
  number: number;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

const TemplateCard = ({ template, number, onDelete, isDeleting }: Props) => {
  const navigate = useRouter();
  const { hasPermissionAccess } = useUserPermissions();
  const templateType = template.type as FormTypeEnum;
  const { label, style } = getEnumBadgeWithHexColors(
    FormTypeEnum,
    templateType,
  );
  return (
    <div className="mt-2 w-full">
      <div className="rounded-lg border border-neutral-light bg-white px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="text-left space-y-3">
            <div className="text-primary-500 flex flex-1 gap-1 text-sm">
              <span>{number}.</span>
              <span className="capitalize">{template?.name}</span>
            </div>
            <div>
              <StatusBadge label={label} style={style} />
            </div>
          </div>

          <div className="flex w-2/6 items-center justify-center gap-1 px-2">
            {hasPermissionAccess(
              PermissionKeys.workflowForms.templates.edit,
            ) && (
              <Button
                onClick={() =>
                  navigate.push(`/settings/template/${template.id}/edit`)
                }
                variant={"outline"}
                className="flex items-center gap-1.5 border-neutral-300 bg-white text-neutral-700"
              >
                <Icon name="Pencil" size={14} />
                <span>Edit</span>
              </Button>
            )}
            {hasPermissionAccess(
              PermissionKeys.workflowForms.templates.delete,
            ) && (
              <Button
                onClick={() => onDelete(template?.id as string)}
                variant={"outline"}
                className="flex items-center gap-1.5 border-danger-default text-danger-default"
              >
                {isDeleting ? (
                  <Icon
                    name="LoaderCircle"
                    size={14}
                    className="animate-spin"
                  />
                ) : (
                  <Icon
                    name="Trash2"
                    size={14}
                    className="text-danger-default"
                  />
                )}
                <span>Delete</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
