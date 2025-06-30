// import { useForm } from "react-hook-form";
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
import {
  CreateWarehouseRequest,
  WarehouseType, // GetApiV1ConfigurationByModelTypeAndPrefixApiArg,
  // NamingType,
  // useLazyGetApiV1ConfigurationByModelTypeAndPrefixQuery,
  // useLazyGetApiV1ConfigurationByModelTypeByModelTypeQuery,
  useLazyGetApiV1WarehouseQuery,
  usePostApiV1WarehouseMutation,
} from "@/lib/redux/api/openapi.generated";
import {
  ErrorResponse, // GenerateCodeOptions,
  cn, // generateCode,
  // getFirstCharacter,
  isErrorResponse,
} from "@/lib/utils";

import WarehousesForm from "./form";
import { CreateWarehouseValidator, WarehouseRequestDto } from "./types";

// import "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const Create = ({ isOpen, onClose }: Props) => {
  const [loadWarehouses] = useLazyGetApiV1WarehouseQuery();
  // const [loadCodeSettings] =
  //   useLazyGetApiV1ConfigurationByModelTypeByModelTypeQuery();
  // const [loadCodeMyModel] =
  //   useLazyGetApiV1ConfigurationByModelTypeAndPrefixQuery();
  const [createWarehouse, { isLoading }] = usePostApiV1WarehouseMutation();
  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
    // setValue,
  } = useForm<WarehouseRequestDto>({
    resolver: CreateWarehouseValidator,
    mode: "all",
  });

  // const name = useWatch<WarehouseRequestDto>({
  //   name: "name",
  //   control,
  // }) as string;

  // const handleLoadCode = async () => {
  //   const getCodeSettings = await loadCodeSettings({
  //     modelType: CODE_SETTINGS.modelTypes.Warehouse,
  //   }).unwrap();
  //   const prefix = getCodeSettings?.prefix;
  //   const codePrefix = prefix + getFirstCharacter(name);

  //   const payload = {
  //     modelType: CODE_SETTINGS.modelTypes.Warehouse,
  //     prefix: codePrefix,
  //   } as GetApiV1ConfigurationByModelTypeAndPrefixApiArg;
  //   const res = await loadCodeMyModel(payload).unwrap();
  //   const generatePayload: GenerateCodeOptions = {
  //     maxlength: Number(getCodeSettings?.maximumNameLength),
  //     minlength: Number(getCodeSettings?.minimumNameLength),
  //     prefix: codePrefix,
  //     type: getCodeSettings?.namingType as NamingType,
  //     seriesCounter: res + 1,
  //   };
  //   const code = await generateCode(generatePayload);
  //   setValue("code", code);
  // };

  // useEffect(() => {
  //   handleLoadCode();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const onSubmit = async (data: WarehouseRequestDto) => {
    try {
      const payload = {
        ...data,
        type: data.type as WarehouseType,
      } satisfies CreateWarehouseRequest;
      await createWarehouse({
        createWarehouseRequest: payload,
      });
      toast.success("Warehouse created successfully");
      loadWarehouses({
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
          <DialogTitle>Add Warehouse</DialogTitle>
        </DialogHeader>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <WarehousesForm
            register={register}
            errors={errors}
            control={control}
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
              <span>Add Warehouse</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Create;
