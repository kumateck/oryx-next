// import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useDispatch } from "react-redux";
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
import { CODE_SETTINGS } from "@/lib";
import {
  CreateDepartmentRequest,
  GetApiV1ConfigurationByModelTypeAndPrefixApiArg,
  NamingType,
  useGetApiV1DepartmentQuery,
  useLazyGetApiV1ConfigurationByModelTypeAndPrefixQuery,
  useLazyGetApiV1ConfigurationByModelTypeByModelTypeQuery,
  usePostApiV1DepartmentMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import {
  ErrorResponse,
  GenerateCodeOptions,
  cn,
  generateCode,
  getFirstCharacter,
  isErrorResponse,
} from "@/lib/utils";

import DepartmentForm from "./form";
import { CreateDepartmentValidator, DepartmentRequestDto } from "./types";

// import "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const Create = ({ isOpen, onClose }: Props) => {
  const dispatch = useDispatch();
  const [createDepartment, { isLoading }] = usePostApiV1DepartmentMutation();
  const [loadCodeSettings] =
    useLazyGetApiV1ConfigurationByModelTypeByModelTypeQuery();
  const { data: departments } = useGetApiV1DepartmentQuery({
    page: 1,
    pageSize: 1000,
  });
  const [loadCodeMyModel] =
    useLazyGetApiV1ConfigurationByModelTypeAndPrefixQuery();
  // const [loadCodeModelCount] = useLazyGetApiV1DepartmentQuery();

  const {
    register,
    control,
    formState: { errors },
    reset,
    setValue,
    handleSubmit,
    // watch
  } = useForm<DepartmentRequestDto>({
    resolver: CreateDepartmentValidator,
    mode: "all",
  });

  const name = useWatch<DepartmentRequestDto>({
    name: "name",
    control,
  }) as string;

  // const warehouse = useWatch<DepartmentRequestDto>({
  //   name: "warehouse",
  //   control,
  // }) as Option;

  const handleLoadCode = async () => {
    const getCodeSettings = await loadCodeSettings({
      modelType: CODE_SETTINGS.modelTypes.Department,
    }).unwrap();
    const prefix = getCodeSettings?.prefix;
    const codePrefix = prefix + getFirstCharacter(name);

    const payload = {
      modelType: CODE_SETTINGS.modelTypes.Department,
      prefix: codePrefix,
    } as GetApiV1ConfigurationByModelTypeAndPrefixApiArg;
    const res = await loadCodeMyModel(payload).unwrap();
    const generatePayload: GenerateCodeOptions = {
      maxlength: Number(getCodeSettings?.maximumNameLength),
      minlength: Number(getCodeSettings?.minimumNameLength),
      prefix: codePrefix,
      type: getCodeSettings?.namingType as NamingType,
      seriesCounter: res + 1,
    };
    const code = await generateCode(generatePayload);
    console.log(code, "this is the generated code");
    setValue("code", code);
  };

  useEffect(() => {
    handleLoadCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data: DepartmentRequestDto) => {
    try {
      const payload = {
        ...data,
        parentDepartmentId: data.parentDepartmentId?.value,
      } satisfies CreateDepartmentRequest;
      await createDepartment({
        createDepartmentRequest: payload,
      }).unwrap();
      toast.success("Department created successfully");
      dispatch(commonActions.setTriggerReload());
      reset(); // Reset the form after submission
      onClose(); // Close the form/modal if applicable
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  // const fetchCount = async () => {
  //   const countResponse = await loadCodeModelCount({}).unwrap();
  //   return { totalRecordCount: countResponse?.totalRecordCount };
  // };

  // const setCodeToInput = (code: string) => {
  //   setValue("code", code ?? "");
  // };
  // useCodeGen(CODE_SETTINGS.modelTypes.Department, fetchCount, setCodeToInput);
  const departmentOptions =
    departments?.data?.map((department) => {
      return {
        value: department.id as string,
        label: department.name as string,
      };
    }) || [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Department</DialogTitle>
        </DialogHeader>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <DepartmentForm
            control={control}
            register={register}
            errors={errors}
            departmentOptions={departmentOptions}
          />
          <DialogFooter className="justify-end gap-4 py-6">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>

            <Button variant={"default"} className="flex items-center gap-2">
              <Icon
                name={isLoading ? "LoaderCircle" : "Plus"}
                className={cn("h-4 w-4", {
                  "animate-spin": isLoading,
                })}
              />
              <span>Add Department</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Create;
