import { useParams } from "next/navigation";
import React from "react";
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
import { ErrorResponse, Units, isErrorResponse } from "@/lib";
import {
  MaterialDistributionSection,
  usePostApiV1ProcurementByShipmentDocumentIdConfirmDistributionAndMaterialIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import ScrollableWrapper from "@/shared/scroll-wrapper";

import DistributeCard from "./card";

interface BreakdownProps {
  isOpen: boolean;
  onClose: () => void;
  details: MaterialDistributionSection | null;
}
const Breakdown = ({ isOpen, onClose, details }: BreakdownProps) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const shipmentDocumentId = id as string;

  const materialId = details?.material?.id as string;

  const [confirmDistribution, { isLoading }] =
    usePostApiV1ProcurementByShipmentDocumentIdConfirmDistributionAndMaterialIdMutation();

  const onConfirm = async () => {
    try {
      await confirmDistribution({
        shipmentDocumentId,
        materialId,
      });
      toast.success("Distribution confirmed successfully");
      onClose();
      dispatch(commonActions.setTriggerReload());
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          className="max-w-4xl"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>
              Distribution Breakdown of {details?.material?.name}
            </DialogTitle>
          </DialogHeader>

          <ScrollableWrapper>
            <ul className="space-y-5">
              {details?.items?.map((item, idx) => (
                <li key={idx}>
                  <DistributeCard
                    item={item}
                    uom={details?.uoM?.symbol as Units}
                  />
                </li>
              ))}
            </ul>
          </ScrollableWrapper>

          <DialogFooter className="justify-end gap-4 py-6">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>

            <Button
              variant={"default"}
              className="flex items-center gap-2"
              onClick={onConfirm}
            >
              {isLoading && (
                <Icon name="LoaderCircle" className="h-4 w-4 animate-spin" />
              )}
              <span>Confirm</span>{" "}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Breakdown;
