"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import { ManufacturerMap } from "@/components/pages/supply-chain/procurement/vendors/create";
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
  CodeModelTypes,
  ErrorResponse,
  Option,
  Units,
  convertToSmallestUnit,
  getLargestUnit,
  getSmallestUnit,
  isErrorResponse,
} from "@/lib";
import { useCodeGen } from "@/lib/code-gen";
import {
  ProductionScheduleProcurementDto,
  useGetApiV1UserAuthenticatedQuery,
  useLazyGetApiV1MaterialByMaterialIdDepartmentStockAndQuantityQuery,
  usePostApiV1ProductionScheduleStockTransferMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";

import TransferForm from "./form";
import { CreateTransferValidator, TransferRequestDto } from "./type";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  materialInfo: ProductionScheduleProcurementDto;
}

const InternalTransfers = ({ isOpen, onClose, materialInfo }: Props) => {
  const dispatch = useDispatch();
  const { id, pid } = useParams();
  const scheduleId = id as string;
  const productId = pid as string;
  const { data: authUser } = useGetApiV1UserAuthenticatedQuery();
  const myDepartment = authUser?.department?.id;
  // const [loadCodeModelCount] = useLazyGetApiV1RequisitionQuery();

  const [saveMutation, { isLoading }] =
    usePostApiV1ProductionScheduleStockTransferMutation();

  const {
    register,
    control,
    formState: { errors },
    setValue,
    // reset,
    handleSubmit,
  } = useForm<TransferRequestDto>({
    resolver: CreateTransferValidator,
    mode: "all",
    defaultValues: {
      sources: [
        {
          department: { label: "", value: "" },
          quantity: 0,
          id: new Date().toISOString(),
        },
      ],
    },
  });
  const fetchCount = async () => {
    // const countResponse = await loadCodeModelCount({
    //   type: RequisitionType.Purchase,
    // }).unwrap();

    return { totalRecordCount: 0 };
  };

  const setCodeToInput = (code: string) => {
    setValue("code", code ?? "");
  };
  const { loading } = useCodeGen(
    CodeModelTypes.StockTransfer,
    fetchCount,
    setCodeToInput,
  );
  const onSubmit = async (data: TransferRequestDto) => {
    console.log(data);

    try {
      await saveMutation({
        createStockTransferRequest: {
          productionScheduleId: scheduleId,
          productId,
          reason: data.reason,
          requiredQuantity: materialInfo.quantityNeeded,
          materialId: materialInfo.material?.id as string,
          uoMId: materialInfo.baseUoM?.id as string,
          sources: data.sources?.map((item) => {
            return {
              fromDepartmentId: item.department?.value as string,
              quantity: convertToSmallestUnit(
                item.quantity,
                getSmallestUnit(materialInfo.baseUoM?.symbol as Units),
              ).value,
            };
          }),
        },
      });
      toast.success("Transfer created successfully");
      dispatch(commonActions.setTriggerReload());
      onClose();
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sources",
  });
  const sources = useWatch({
    control,
    name: "sources",
  });

  const [loadQuantityByDepartment] =
    useLazyGetApiV1MaterialByMaterialIdDepartmentStockAndQuantityQuery();

  // Memoize derived values
  const typeValues = useMemo(() => {
    return sources?.map((item) => item.id as string) || [];
  }, [sources]);

  const [departmentOptionsMap, setManufacturerOptionsMap] =
    useState<ManufacturerMap>({}); // To store manufacturers by material ID

  useEffect(() => {
    handleAllEligibles(
      sources,
      materialInfo?.material?.id as string,
      materialInfo?.baseUoM?.symbol as Units,
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materialInfo?.material, sources]);
  const handleAllEligibles = async (
    sources: TransferRequestDto["sources"],
    materialId: string,
    unit: Units,
  ) => {
    sources.forEach((source) => {
      if (source.quantity > 0) {
        handleLoadDepartmentEligible(
          source.id as string,
          materialId,
          source.quantity,
          unit,
        );
      }
    });
  };
  const handleLoadDepartmentEligible = async (
    id: string,
    materialId: string,
    quantity: number,
    unit: Units,
  ) => {
    try {
      const qty = convertToSmallestUnit(quantity, getLargestUnit(unit));
      const response = await loadQuantityByDepartment({
        materialId,
        quantity: qty.value,
      }).unwrap();
      setManufacturerOptionsMap((prev) => {
        const departments = response
          ?.filter((d) => d.id !== myDepartment)
          ?.map((item) => ({
            label: item.name as string,
            value: item.id as string,
          })) as Option[];

        return {
          ...prev,
          [id]: departments,
        };
      });
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Stock Transfer Request</DialogTitle>
        </DialogHeader>
        <div
          onClick={() =>
            append({
              quantity: 0,
              department: {
                value: "",
                label: "",
              },
              id: new Date().toISOString(),
            })
          }
        >
          Add NEW
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TransferForm
            register={register}
            errors={errors}
            control={control}
            fields={fields}
            remove={remove}
            typeValues={typeValues}
            departmentOptionsMap={departmentOptionsMap}
            append={append}
            loading={loading}
          />
          <DialogFooter className="justify-end gap-4 py-6">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>

            <Button variant={"default"} className="flex items-center gap-2">
              {isLoading ? (
                <Icon name="LoaderCircle" className="animate-spin" />
              ) : (
                <Icon name="Plus" className="h-4 w-4" />
              )}
              <span>Save Request</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InternalTransfers;
