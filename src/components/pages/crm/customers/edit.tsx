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
  CustomerDto,
  usePutApiV1CustomersByIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { ErrorResponse, cn, isErrorResponse } from "@/lib/utils";

import { CreateCustomerValidator, CustomerRequestDto } from "./types";
import CustomerForm from "./form";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  details: CustomerDto;
}
const Edit = ({ isOpen, onClose, details }: Props) => {
  const [editDesignation, { isLoading }] = usePutApiV1CustomersByIdMutation();

  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<CustomerRequestDto>({
    resolver: CreateCustomerValidator,
    mode: "all",
    defaultValues: {
      name: details.name as string,
      address: details.address as string,
      phone: details.phone as string,
      email: details.email as string,
    },
  });
  const onSubmit = async (data: CustomerRequestDto) => {
    try {
      const payload = {
        name: data.name,
        phone: data.phone,
        address: data.address,
        email: data.email,
      } satisfies CreateCustomerRequest;
      await editDesignation({
        id: details.id as string,
        createCustomerRequest: payload,
      }).unwrap();
      toast.success("Customer updated successfully");
      dispatch(commonActions.setTriggerReload());
      reset();
      onClose();
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Customer</DialogTitle>
        </DialogHeader>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <CustomerForm register={register} errors={errors} />
          <DialogFooter className="justify-end gap-4 py-6">
            <Button
              disabled={isLoading}
              type="button"
              variant="secondary"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button
              disabled={isLoading}
              variant={"default"}
              className="flex items-center gap-2"
            >
              <Icon
                name={isLoading ? "LoaderCircle" : "Plus"}
                className={cn("h-4 w-4", {
                  "animate-spin": isLoading,
                })}
              />
              <span>Save Change</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Edit;
