import { Icon } from "@/components/ui";
import { getKeyByValue, splitWords } from "@/lib";
import { ConfigurationDto } from "@/lib/redux/api/openapi.generated";

interface Props {
  codeGen: ConfigurationDto;
  setCodeToEdit: (code: ConfigurationDto) => void;
  onDelete: () => void;
  isDeleteLoading?: boolean;
}

export default function CodeContainer({
  codeGen,
  setCodeToEdit,
  onDelete,
  isDeleteLoading,
}: Props) {
  return (
    <>
      <div className="mt-2 w-full">
        <div className="rounded-lg border border-neutral-200 bg-background px-8 py-4">
          <div className="flex items-center justify-around">
            <p className="font-rig-sans w-1/4 text-base font-medium">
              {splitWords(codeGen.modelType as string)}
            </p>

            <div className="flex w-1/3 items-center justify-center gap-[3px]">
              <p className="text-sm font-medium text-neutral-500">
                {getKeyByValue(Number(codeGen?.namingType))}
              </p>
            </div>
            <div className="flex w-1/3 items-center justify-center gap-[3px]">
              <p className="text-sm font-medium text-neutral-500">
                {codeGen?.prefix}
              </p>
            </div>
            <div className="flex w-1/3 items-center justify-center gap-[3px]">
              <p className="text-sm font-medium text-neutral-500">
                {codeGen?.minimumNameLength}
              </p>
            </div>
            <div className="flex w-1/3 items-center justify-center gap-[3px]">
              <p className="text-sm font-medium text-neutral-500">
                {codeGen?.maximumNameLength}
              </p>
            </div>
            <div className="flex w-1/6 items-center justify-center gap-1">
              <button onClick={() => setCodeToEdit(codeGen)}>
                <Icon name="Pencil" size={14} />
              </button>
              <button onClick={() => onDelete()}>
                {isDeleteLoading ? (
                  <Icon name="LoaderCircle" className="animate-spin" />
                ) : (
                  <Icon
                    name="Trash2"
                    size={14}
                    className="text-destructive-500"
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
