import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  Icon,
} from "@/components/ui";
import { cn } from "@/lib";
import { usePostApiV1FormGenerateCertificateProductByBatchManufacturingRecordIdMutation } from "@/lib/redux/api/openapi.generated";
import ThrowErrorMessage from "@/lib/throw-error";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  productBatchId: string;
  children: React.ReactNode;
}
const PreviewCoa = ({ isOpen, onClose, children, productBatchId }: Props) => {
  const router = useRouter();
  const [genereateCertificate, { isLoading }] =
    usePostApiV1FormGenerateCertificateProductByBatchManufacturingRecordIdMutation();

  const handleGenerate = async () => {
    try {
      await genereateCertificate({
        batchManufacturingRecordId: productBatchId,
      }).unwrap();
      toast.success("COA generated successfully");
      onClose();
      router.back();
    } catch (error) {
      ThrowErrorMessage(error);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl">
        <DialogHeader>
          <DialogTitle>Preview Certificate of Analysis</DialogTitle>
        </DialogHeader>
        {children}
        <DialogFooter className="justify-end gap-4 py-6">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>

          <Button
            variant={"default"}
            type="button"
            className="flex items-center gap-2"
            onClick={handleGenerate}
            disabled={isLoading}
          >
            <Icon
              name={isLoading ? "LoaderCircle" : "Plus"}
              className={cn("h-4 w-4", {
                "animate-spin": isLoading,
              })}
            />
            <span>Generate COA</span>{" "}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewCoa;
