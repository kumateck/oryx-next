import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { FormWizard } from "@/components/form-inputs";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Icon,
} from "@/components/ui";
import { CODE_SETTINGS, InputTypes, Option } from "@/lib/constants";
import {
  CreateConfigurationRequest,
  NamingType,
  useLazyGetApiV1ConfigurationQuery,
  usePostApiV1ConfigurationMutation,
} from "@/lib/redux/api/openapi.generated";
import { ErrorResponse, isErrorResponse, splitWords } from "@/lib/utils";

import { CodeRequestDto, CreateCodeValidator } from "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const CreateCode = ({ isOpen, onClose }: Props) => {
  const [codeMutation, { isLoading }] = usePostApiV1ConfigurationMutation();
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
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CodeRequestDto>({
    resolver: CreateCodeValidator,
    mode: "all",
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
      }).unwrap();
      toast.success("Code created successfully");
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
            <DialogTitle>Create New Code</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <FormWizard
              config={[
                {
                  label: "Item Type",
                  control,
                  type: InputTypes.SELECT,
                  name: "modelType",
                  required: true,
                  placeholder: "Select item",
                  options: codeModelTypesOptions,
                  errors: {
                    message: errors.modelType?.message,
                    error: !!errors.modelType,
                  },
                },
                {
                  label: "Naming Type",
                  control,
                  type: InputTypes.SELECT,
                  name: "namingType",
                  placeholder: "Select item",
                  options: codeNameTypesOptions,
                  errors: {
                    message: errors.namingType?.message,
                    error: !!errors.namingType,
                  },
                },
                {
                  register: { ...register("prefix") },
                  label: "Prefix",
                  placeholder: "Add Prefix",
                  type: InputTypes.TEXT,
                  errors: {
                    message: errors.prefix?.message,
                    error: !!errors.prefix,
                  },
                },
                {
                  register: {
                    ...register("minimumNameLength", { valueAsNumber: true }),
                  },
                  label: "Minimum Code Length",
                  placeholder: "Add Min",
                  type: InputTypes.NUMBER,
                  errors: {
                    message: errors.minimumNameLength?.message,
                    error: !!errors.minimumNameLength,
                  },
                },
                {
                  register: {
                    ...register("maximumNameLength", { valueAsNumber: true }),
                  },
                  label: "Minimum Code Length",
                  placeholder: "Add Min",
                  type: InputTypes.NUMBER,
                  errors: {
                    message: errors.maximumNameLength?.message,
                    error: !!errors.maximumNameLength,
                  },
                },
              ]}
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
              <span>Create Code</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCode;
