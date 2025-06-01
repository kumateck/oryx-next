import {
  Button,
  DialogContent,
  DialogFooter,
  DialogTitle,
  Icon,
} from "@/components/ui";
import { Dialog } from "@radix-ui/react-dialog";
import SampleForm from "./form";
import { useForm } from "react-hook-form";
import { CreateSampleFormData, CreateSampleFormResolver } from "./types";

type CreateSampleMaterialProps = {
  isOpen: boolean;
  onClose: () => void;
};
export const CreateSampleMaterial = ({
  isOpen,
  onClose,
}: CreateSampleMaterialProps) => {
  const {
    register,
    formState: { errors },
  } = useForm<CreateSampleFormData>({
    resolver: CreateSampleFormResolver,
  });
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle className="text-lg font-medium">
          {" "}
          Sample Material
        </DialogTitle>
        <form>
          {/* Form fields go here */}
          <SampleForm register={register} errors={errors} />
          {/* dialog footer */}
          <DialogFooter className="flex items-center justify-center gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              <Icon name="Plus" className="h-5 w-5" />
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
