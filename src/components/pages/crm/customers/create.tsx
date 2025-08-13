import { useForm } from "react-hook-form";
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
import {
  CreateCustomerRequest,
  useLazyGetApiV1DesignationQuery,
  usePostApiV1CustomersMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { ErrorResponse, cn, isErrorResponse } from "@/lib/utils";

import { CreateCustomerValidator, CustomerRequestDto } from "./types";
import CustomerForm from "./form";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Create = ({ isOpen, onClose }: Props) => {
  const [loadDesignations] = useLazyGetApiV1DesignationQuery();
  const [createCustomer, { isLoading }] = usePostApiV1CustomersMutation();

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<CustomerRequestDto>({
    resolver: CreateCustomerValidator,
    mode: "all",
  });
  const dispatch = useDispatch();
  const onSubmit = async (data: CustomerRequestDto) => {
    try {
      const payload = {
        name: data.name,
        address: data.address || "",
        phone: String(data.phone) || "",
        email: data.email || "",
      } satisfies CreateCustomerRequest;

      await createCustomer({
        createCustomerRequest: payload,
      }).unwrap();

      toast.success("Customer created successfully");
      loadDesignations({ page: 1, pageSize: 10 });
      reset();
      onClose();
      dispatch(commonActions.setTriggerReload());
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Customer</DialogTitle>
        </DialogHeader>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <CustomerForm register={register} errors={errors} />
          <DialogFooter className="justify-end gap-4 py-6">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>

            <Button
              variant={"default"}
              type="submit"
              className="flex items-center gap-2"
            >
              <Icon
                name={isLoading ? "LoaderCircle" : "Plus"}
                className={cn("h-4 w-4", {
                  "animate-spin": isLoading,
                })}
              />
              <span>Save</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Create;
