import { Icon } from "@/components/ui";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AlertForm from "./form";
import {
  AlertDto,
  usePostApiV1AlertMutation,
} from "@/lib/redux/api/openapi.generated";
import { useForm } from "react-hook-form";
import { CreateAlertDtoValidator } from "./types";

export function CreateAlert() {
  const [createAlert, { isLoading }] = usePostApiV1AlertMutation();
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<AlertDto>({
    resolver: CreateAlertDtoValidator,
  });
  const onSubmit = async (data: AlertDto) => {
    await createAlert({
      createAlertRequest: data,
    });
  };
  return (
    <Dialog>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTrigger asChild>
          <Button>
            <Icon name="Plus" />
            Create Alert
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Alert</DialogTitle>
          </DialogHeader>
          <AlertForm errors={errors} register={register} control={control} />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">
              {isLoading && <Icon name="LoaderCircle" />}{" "}
              <span>Save changes</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
