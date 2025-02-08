import { lowerFirst } from "lodash";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Icon,
} from "@/components/ui";
import { CODE_SETTINGS, Option, getKeyByValue } from "@/lib";
import {
  ConfigurationDto,
  CreateConfigurationRequest,
  NamingType,
  useLazyGetApiV1ConfigurationQuery,
  usePutApiV1ConfigurationByConfigurationIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { ErrorResponse, isErrorResponse, splitWords } from "@/lib/utils";

import CodeSettingsForm from "./form";
import { CodeRequestDto, CreateCodeValidator } from "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;

  details: ConfigurationDto | null;
}
const Edit = ({ isOpen, onClose, details }: Props) => {
  const [codeMutation, { isLoading }] =
    usePutApiV1ConfigurationByConfigurationIdMutation();

  const [loadCodes] = useLazyGetApiV1ConfigurationQuery();

  const modelTypes = CODE_SETTINGS.modelTypes;
  const nameTypes = CODE_SETTINGS.nameTypes;

  const codeModelTypesOptions = Object.values(modelTypes).map((modelType) => {
    return {
      label: splitWords(modelType),
      value: modelType,
    };
  }) as Option[];

  const codeNameTypesOptions = Object.entries(nameTypes).map(([key, value]) => {
    return {
      label: splitWords(key),
      value: value.toString(),
    };
  }) as Option[];

  const defaultModelType = {
    value: details?.modelType?.toString(),
    label: codeModelTypesOptions.find(
      (item) =>
        lowerFirst(item.value.toString()) ===
        lowerFirst(details?.modelType?.toString()),
    )?.label,
  } as Option;

  const defaultNamingType = {
    value: details?.namingType?.toString(),
    label: getKeyByValue(Number(details?.namingType)),
  } as Option;
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CodeRequestDto>({
    resolver: CreateCodeValidator,
    mode: "onSubmit",
    defaultValues: {
      ...details,
      prefix: details?.prefix?.toString(),
      namingType: defaultNamingType,
      modelType: defaultModelType,
    },
  });
  const onSubmit = async (data: CodeRequestDto) => {
    const payload = {
      ...data,
      modelType: data.modelType.value,
      namingType: Number(data.namingType.value) as NamingType,
    } satisfies CreateConfigurationRequest;

    try {
      await codeMutation({
        createConfigurationRequest: payload,
        configurationId: details?.id as string,
      }).unwrap();
      toast.success("Code updated successfully");

      loadCodes({
        pageSize: 30,
        page: 1,
      });

      reset();
      onClose();
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-9">
          <DialogHeader className="text-xl font-bold">
            <DialogTitle>Edit Code</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <CodeSettingsForm
              control={control}
              register={register}
              errors={errors}
              codeModelTypesOptions={codeModelTypesOptions}
              codeNameTypesOptions={codeNameTypesOptions}
              // defaultValues={details}
            />
          </div>
          <DialogFooter className="justify-end">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>

            <Button
              type="submit"
              onClick={(e) => e.stopPropagation()}
              variant={"default"}
              className="flex items-center gap-2"
            >
              {isLoading ? (
                <Icon name="LoaderCircle" className="h-4 w-4 animate-spin" />
              ) : (
                <Icon name="Plus" className="h-4 w-4" />
              )}
              <span>Update Code</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Edit;
