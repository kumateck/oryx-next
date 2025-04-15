import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  Icon,
  Label,
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui";
import { cn, Option } from "@/lib";
import React from "react";
import { RevisionRequestDto } from "./type";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  details: RevisionRequestDto;
  currency: Option;
}
const ReAssign = ({ isOpen, onClose }: Props) => {
  const onSubmit = () => {};
  const onChange = (value: string) => {
    console.log(value, "value");
  };
  const supplierQuotations = [
    {
      supplierId: "1",
      supplierName: "Supplier 1",
      selected: false,
      price: "$100",
    },
    {
      supplierId: "2",
      supplierName: "Supplier 2",
      selected: false,
      price: "$100",
    },
    {
      supplierId: "3",
      supplierName: "Supplier 3",
      selected: false,
      price: "$100",
    },
  ];
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogTitle>Re-Assign Supplier</DialogTitle>
        <RadioGroup
          className="flex flex-wrap gap-4 "
          onValueChange={(v) => onChange(v)}
        >
          {supplierQuotations?.map((quote, index) => (
            <div
              key={index}
              className={cn(
                "rounded-lg border p-4 transition hover:bg-stone-100",
                {
                  "border-primary-500 ring-primary-500 bg-stone-100 shadow-lg ring-1":
                    quote?.selected,
                },
              )}
            >
              <Label className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <RadioGroupItem
                    value={quote?.supplierId}
                    id="newPassport"
                    className="h-8 w-8"
                  >
                    <Icon name="CheckCheck" className="h-7 w-7 text-current" />
                  </RadioGroupItem>
                </div>
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold capitalize">
                    {quote?.supplierName}
                  </h3>
                  <p className="text-muted-foreground text-sm capitalize leading-normal">
                    {quote?.price}
                  </p>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>

        <DialogFooter>
          <Button variant={"outline"} onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSubmit}>
            <span>Save Changes</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReAssign;
