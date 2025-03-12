import { useForm } from "react-hook-form";

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Icon,
} from "@/components/ui";
import { Option } from "@/lib";
import { useGetApiV1CollectionUomQuery } from "@/lib/redux/api/openapi.generated";

import Form from "./form";
import {
  CreateFinishedGoodsNoteValidator,
  FinishedGoodsNoteRequestDto,
} from "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const Create = ({ isOpen, onClose }: Props) => {
  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<FinishedGoodsNoteRequestDto>({
    resolver: CreateFinishedGoodsNoteValidator,
    mode: "all",
  });
  const { data: packingUomResponse } = useGetApiV1CollectionUomQuery({
    isRawMaterial: false,
  });
  const packingUomOptions = packingUomResponse?.map((uom) => ({
    label: uom.symbol,
    value: uom.id,
  })) as Option[];

  const onSubmit = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Finished Goods Transfer Number</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Form
            register={register}
            errors={errors}
            control={control}
            packingUomOptions={packingUomOptions}
          />
          <DialogFooter className="justify-end gap-4 py-6">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>

            <Button variant={"default"} className="flex items-center gap-2">
              <Icon name="Plus" className="h-4 w-4" />
              <span>Save</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Create;
