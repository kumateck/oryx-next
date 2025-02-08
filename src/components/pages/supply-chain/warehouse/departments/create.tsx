// import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
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
import { CODE_SETTINGS, Option } from "@/lib";
import {
  CreateDepartmentRequest,
  GetApiV1ConfigurationByModelTypeAndPrefixApiArg,
  NamingType,
  useGetApiV1WarehouseQuery,
  useLazyGetApiV1ConfigurationByModelTypeAndPrefixQuery,
  useLazyGetApiV1ConfigurationByModelTypeByModelTypeQuery,
  useLazyGetApiV1DepartmentQuery,
  usePostApiV1DepartmentMutation,
} from "@/lib/redux/api/openapi.generated";
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
  const [loadDepartments] = useLazyGetApiV1DepartmentQuery();
  const [createDepartment, { isLoading }] = usePostApiV1DepartmentMutation();
  const [loadCodeSettings] =
    useLazyGetApiV1ConfigurationByModelTypeByModelTypeQuery();
  const [loadCodeMyModel] =
    useLazyGetApiV1ConfigurationByModelTypeAndPrefixQuery();

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

  const { data: result } = useGetApiV1WarehouseQuery({
    page: 1,
    pageSize: 100,
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
    setValue("code", code);
  };

  useEffect(() => {
    handleLoadCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   const response = result?.data?.find((r) => r.id === warehouse?.value);
  //   const warehouseId = response?.id || "";

  //   if (warehouseId && warehouseId !== watch("warehouseIds")) {
  //     setValue("warehouseIds", warehouseId);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [warehouse, result, setValue]);

  const data = result?.data ?? [];
  const warehouseOptions = data?.map((item) => ({
    label: item?.name,
    value: item?.id,
  })) as Option[];
  console.log(data, "Warehouses");

  const onSubmit = async (data: DepartmentRequestDto) => {
    try {
      const payload = {
        ...data,
        warehouses: data?.warehouseIds?.map((item) => {
          return {
            warehouseId: item.value,
          };
        }),
      } satisfies CreateDepartmentRequest;
      await createDepartment({
        createDepartmentRequest: payload,
      });
      toast.success("Department created successfully");
      loadDepartments({
        page: 1,
        pageSize: 10,
      });
      reset(); // Reset the form after submission
      onClose(); // Close the form/modal if applicable
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

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
            warehouseOptions={warehouseOptions}
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
