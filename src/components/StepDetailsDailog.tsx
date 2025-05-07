import { useForm } from "react-hook-form";
import { FormWizard } from "./form-inputs";
import {
  AlertDialogHeader,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { InputTypes } from "@/lib";

export const CreateGoodsTranferSchema = z.object({
  productName: z.string().min(1, {
    message: "Name is required",
  }),
  transfereTo: z.string().min(1, {
    message: "Production destination is required",
  }),
  batchNumber: z.string().min(1, { message: "Batch number is required" }),
  menufacturedDate: z.date(),
  expiryDate: z.date(),
  quantityPerPack: z
    .number()
    .min(1, { message: "Quantity per pack is required" }),
  QARNumber: z.number().min(1, { message: "QAR number is required" }),
  totalTranfareQuantity: z
    .number()
    .min(1, { message: "Totoal quantity to transfare is required" }),
  unitMeasure: z.string(),
});

type GoodTransfereDto = z.infer<typeof CreateGoodsTranferSchema>;
const CreateGoodsValidator = zodResolver(CreateGoodsTranferSchema);

type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

function StepDetailsDailog({ isOpen, onClose }: DialogProps) {
  const {
    register,
    formState: { errors },
  } = useForm<GoodTransfereDto>({
    resolver: CreateGoodsValidator,
    mode: "all",
    defaultValues: {
      productName: "",
    },
  });
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button variant="default" className="ml-auto mb-4">
          Perform Activity
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl w-full">
        <AlertDialogHeader>
          <DialogTitle className="text-lg">
            Finished Goods Transfare Notes
          </DialogTitle>
          <DialogDescription>Production id</DialogDescription>
        </AlertDialogHeader>
        <div>
          <form className="w-full gap-2 flex flex-col">
            <FormWizard
              config={[
                {
                  register: register("productName"),
                  label: "Product name",
                  placeholder: "Kofin Suppressant",
                  type: InputTypes.TEXT,
                  errors,
                },
              ]}
            />
            <FormWizard
              config={[
                {
                  register: register("transfereTo"),
                  label: "Transfere To",
                  placeholder: "None-Beta Finished Goods Warehouse",
                  type: InputTypes.TEXT,
                  errors,
                },
              ]}
            />
            <FormWizard
              config={[
                {
                  register: register("batchNumber"),
                  label: "Batch Number",
                  placeholder: "L012H017",
                  type: InputTypes.TEXT,
                  errors,
                },
              ]}
            />
            <FormWizard
              config={[
                {
                  register: register("menufacturedDate"),
                  label: "Manufacturing Date",
                  placeholder: "5th March, 2025",
                  type: InputTypes.TEXT,
                  errors,
                },
              ]}
            />
            <FormWizard
              config={[
                {
                  register: register("expiryDate"),
                  label: "Expiry Date",
                  placeholder: "5th March, 2025",
                  type: InputTypes.TEXT,
                  errors,
                },
              ]}
            />
            <FormWizard
              config={[
                {
                  register: register("quantityPerPack"),
                  label: "Quantity Per Pack",
                  placeholder: "69",
                  type: InputTypes.TEXT,
                  errors,
                },
              ]}
            />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
              <div className="flex flex-col w-full gap-2">
                <FormWizard
                  config={[
                    {
                      register: register("QARNumber"),
                      label: "QAR Number",
                      placeholder: "81",
                      type: InputTypes.NUMBER,
                      errors,
                    },
                  ]}
                />
                <FormWizard
                  config={[
                    {
                      register: register("totalTranfareQuantity"),
                      label: "Total Tansfare Quantity",
                      placeholder: "81",
                      type: InputTypes.NUMBER,
                      errors,
                    },
                  ]}
                />
              </div>
              <div className="flex flex-col w-full gap-2">
                <FormWizard
                  config={[
                    {
                      register: register("unitMeasure"),
                      label: "Unit Of Measure",
                      placeholder: "81",
                      type: InputTypes.TEXT,
                      errors,
                    },
                  ]}
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 ml-auto">
              <Button onClick={onClose} variant="outline">
                Cancel
              </Button>
              <Button>Save</Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default StepDetailsDailog;
