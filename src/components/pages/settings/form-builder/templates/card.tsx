import { useRouter } from "next/navigation";

import { Button, Icon } from "@/components/ui";

import { FormTemplate } from "../types";

interface Props {
  template: FormTemplate;
  number: number;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

const TemplateCard = ({ template, number, onDelete, isDeleting }: Props) => {
  const navigate = useRouter();

  return (
    <div className="mt-2 w-full">
      <div className="rounded-lg border border-neutral-200 bg-background px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="text-left">
            <div className="text-primary-500 flex flex-1 gap-1 text-sm">
              <span>{number}.</span>
              <span className="capitalize">{template?.name}</span>
            </div>
            <div>
              <span className="text-sm text-neutral-400">
                {template?.formType.name}
              </span>
            </div>
          </div>

          <div className="flex w-2/6 items-center justify-center gap-1 px-2">
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
            <Button
              onClick={() => onDelete(template.id)}
              variant={"outline"}
              className="border-danger-500 text-destructive-500 flex items-center gap-1.5"
            >
              {isDeleting ? (
                <Icon name="LoaderCircle" size={14} className="animate-spin" />
              ) : (
                <Icon
                  name="Trash2"
                  size={14}
                  className="text-destructive-500"
                />
              )}
              <span>Delete</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
