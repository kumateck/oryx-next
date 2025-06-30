"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Icon,
} from "@/components/ui";
import {
  EMaterialKind,
  ErrorResponse,
  Option,
  Units,
  convertToLargestUnit,
  convertToSmallestUnit,
  isErrorResponse,
} from "@/lib";
import {
  MaterialBatchDto,
  SupplyMaterialBatchRequest,
  useGetApiV1WarehouseRackByDepartmentQuery,
  usePostApiV1MaterialBatchSupplyMutation,
} from "@/lib/redux/api/openapi.generated";

import AssignLocationForm from "./form";
import { LocationRequestDto, LocationValidator } from "./type";

interface AssignLocationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  selectedBatch: MaterialBatchDto | null;
  kind?: EMaterialKind;
}

const AssignLocationDialog = ({
  open,
  onOpenChange,
  onSuccess,
  selectedBatch,
  kind,
}: AssignLocationDialogProps) => {
  const [supplyShelf, { isLoading }] =
    usePostApiV1MaterialBatchSupplyMutation();

  // const { data: racks } = useGetApiV1WarehouseRackQuery({
  //   page: 1,
  //   pageSize: 100,
  // });

  // const { data: shelves } = useGetApiV1WarehouseShelfQuery({
  //   page: 1,
  //   pageSize: 100,
  // });

  const { data: racks } = useGetApiV1WarehouseRackByDepartmentQuery({
    kind: kind ?? EMaterialKind.Raw,
  });

  // console.log(racks);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    // trigger,
  } = useForm<LocationRequestDto>({
    resolver: LocationValidator,
    mode: "onSubmit",
    defaultValues: {
      locations: [
        {
          rackId: { label: "", value: "" },
          shelfId: { label: "", value: "" },
          quantity: 0,
          note: "",
        },
      ],
    },
  });

  const locations = useWatch({
    control,
    name: "locations",
  });

  // Memoize derived values
  const typeValues = useMemo(() => {
    return locations?.map((item) => item?.rackId) || [];
  }, [locations]);
  // const shelfOptions = shelves?.data?.map((item) => ({
  //   label: `${item?.warehouseLocationRack?.name}-${item.name}`,
  //   value: item.id,
  // })) as Option[];
  const [shelfOptionsMap, setShelfOptionsMap] = useState<{
    [key: string]: Option[];
  }>({});
  const [fetchedRacks, setFetchedRacks] = useState<Set<string>>(new Set());
  useEffect(() => {
    typeValues.forEach((rack) => {
      const rackId = rack?.value;
      if (rackId && !fetchedRacks.has(rackId)) {
        // Mark the material as fetched
        setFetchedRacks((prev) => new Set(prev).add(rackId));
        const rackShelves = racks?.find((item) => item.id === rackId);
        setShelfOptionsMap((prev) => {
          const shelfs = rackShelves?.shelves?.map((item) => ({
            label:
              `${item?.warehouseLocationRack?.name}-${item.name}` as string,
            value: item.id as string,
          })) as Option[];

          return {
            ...prev,
            [rackId]: shelfs,
          };
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeValues, fetchedRacks]);

  const rackOptions = racks?.map((item) => ({
    label: `${item?.warehouseLocation?.name}-${item.name}`,
    value: item.id,
  })) as Option[];

  const handleAssignLocation = async (data: LocationRequestDto) => {
    try {
      if (!selectedBatch) {
        toast.error("No batch selected");
        return;
      }

      // const totalQtyToShare = selectedBatch.totalQuantity

      //  const sources = data.sources?.map((item) => {
      //       // console.log(
      //       //   getSmallestUnit(materialInfo.baseUoM?.symbol as Units),
      //       //   materialInfo.baseUoM?.symbol,
      //       // );
      //       return {
      //         quantity: convertToSmallestUnit(
      //           item.quantity,
      //           getLargestUnit(materialInfo.baseUoM?.symbol as Units),
      //         ).value,
      //       };
      //     });
      //     // console.log(sources);
      //     const sourceTotalQty = sources?.reduce((accumulator, item) => {
      //       return accumulator + (item.quantity || 0);
      //     }, 0);

      //     if (
      //       Number(sourceTotalQty.toFixed(2)) !== Number(totalQtyNeeded?.toFixed(2))
      //     ) {
      //       toast.warning("U cannot source partial");
      //       return;
      //     }

      const SelectedUnit = convertToLargestUnit(
        selectedBatch?.totalQuantity as number,
        selectedBatch?.uoM?.symbol as Units,
      ).unit as Units;
      const payload = {
        materialBatchId: selectedBatch.id,
        shelfMaterialBatches: data.locations.map((location) => ({
          warehouseLocationShelfId: location.shelfId.value,
          quantity: convertToSmallestUnit(location.quantity, SelectedUnit)
            .value,
          uomId: selectedBatch?.uoM?.id as string,
          note: location.note || "",
        })),
      } satisfies SupplyMaterialBatchRequest;

      console.log(payload);
      await supplyShelf({
        supplyMaterialBatchRequest: payload,
      });

      toast.success("Location assigned successfully");
      onSuccess();
      handleClose();
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  const handleClose = () => {
    reset(); // Reset form values
    onOpenChange(false);
  };

  useEffect(() => {
    if (!open) reset(); // Reset form when closing
  }, [open, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[80vh] min-h-[400px] max-w-2xl flex-col">
        <DialogTitle>Assign Location</DialogTitle>

        <form
          onSubmit={handleSubmit(handleAssignLocation)}
          className="flex flex-1 flex-col overflow-hidden"
        >
          <div className="flex-1 overflow-y-auto">
            <AssignLocationForm
              control={control}
              register={register}
              errors={errors}
              rackOptions={rackOptions}
              shelfOptionsMap={shelfOptionsMap}
              selectedBatch={selectedBatch}
              typeValues={typeValues}
            />
          </div>

          {/* Fixed footer */}
          <div className="sticky bottom-0 bg-background pt-4">
            <div className="flex justify-end gap-2 border-t pt-4">
              <Button type="button" variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" className="flex items-center gap-2">
                <Icon name="Plus" className="h-4 w-4" />
                <span>{isLoading ? "Assigning..." : "Assign"}</span>
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AssignLocationDialog;
