import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Icon,
} from "@/components/ui";
import {
  CODE_SETTINGS,
  ErrorResponse,
  RequisitionType,
  Units,
  convertToSmallestUnit,
  isErrorResponse,
} from "@/lib";
import { useCodeGen } from "@/lib/code-gen";
import {
  PostApiV1RequisitionApiArg,
  useLazyGetApiV1RequisitionQuery,
  usePostApiV1RequisitionMutation,
} from "@/lib/redux/api/openapi.generated";

import { getPurchaseColumns } from "../columns";
import TableForData from "../table";
import {
  CreateRequisitionValidator,
  MaterialRequestDto,
  RequisitionRequestDto,
  itemsRequestSchema,
} from "../type";
import PurchaseForm from "./form";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  lists: MaterialRequestDto[];
  productId?: string;
  productionScheduleId?: string;
}
const Purchase = ({
  isOpen,
  onClose,
  lists,
  productId,
  productionScheduleId,
}: Props) => {
  const router = useRouter();

  const [loadCodeModelCount] = useLazyGetApiV1RequisitionQuery();

  const [saveMutation, { isLoading }] = usePostApiV1RequisitionMutation();

  const [purchaseLists, setPurchaseLists] =
    useState<MaterialRequestDto[]>(lists);
  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<RequisitionRequestDto>({
    resolver: CreateRequisitionValidator,
    mode: "all",
  });
  const fetchCount = async () => {
    const countResponse = await loadCodeModelCount({
      type: RequisitionType.Purchase,
    }).unwrap();

    return { totalRecordCount: countResponse?.totalRecordCount };
  };

  const setCodeToInput = (code: string) => {
    setValue("code", code ?? "");
  };
  const { regenerateCode, loading } = useCodeGen(
    CODE_SETTINGS.modelTypes.Requisition,
    fetchCount,
    setCodeToInput,
  );

  // useEffect(() => {
  //   const loadCodes = async () => {
  //     const generatePayload: GenerateCodeOptions = {
  //       maxlength: Number(codeConfig?.maximumNameLength),
  //       minlength: Number(codeConfig?.minimumNameLength),
  //       prefix: codeConfig?.prefix as string,
  //       type: codeConfig?.namingType as NamingType,
  //     };
  //     const productsResponse = await loadProduct({
  //       page: 1,
  //       pageSize: 100000,
  //     }).unwrap();

  //     const products = productsResponse?.totalRecordCount ?? 0;
  //     generatePayload.seriesCounter = products + 1;
  //     const code = await generateCode(generatePayload);
  //     setValue("code", code);
  //   };

  //   loadCodes();

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [codeConfig]);
  const onSubmit = async (data: RequisitionRequestDto) => {
    const newCode = await regenerateCode();
    // console.log(ren, "ren");
    const items = purchaseLists?.map((item) => ({
      materialId: item.materialId,
      quantity: convertToSmallestUnit(
        item.quantity as number,
        item.uom as Units,
      ).value, //,
      uomId: item.uomId,
    }));
    const payload = {
      createRequisitionRequest: {
        requisitionType: RequisitionType.Purchase,
        comments: data.comments,
        code: newCode ?? data.code,
        expectedDelivery: data.expectedDelivery?.toISOString(),
        items,
        productId,
        productionScheduleId,
      },
    } satisfies PostApiV1RequisitionApiArg;

    // console.log(items, "items");
    const validate = itemsRequestSchema.safeParse(items);

    if (!validate.success) {
      const errors = validate.error.issues.map(
        ({ message, path }) =>
          `${purchaseLists[path[0] as number].materialName}: ${message}`,
      );

      toast.error(errors.join(". "));
    } else {
      try {
        await saveMutation(payload).unwrap();

        toast.success("Purchase Requisition created successfully");
        router.push(`/production/requisition`);
      } catch (error) {
        console.log(error, "error");
        toast.error(isErrorResponse(error as ErrorResponse)?.description);
      }
    }
  };
  // console.log(generatedCode, "generatedCode");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Create New Purchase Requisition Voucher</DialogTitle>
        </DialogHeader>
        <form className="spacey-6 w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex items-center gap-2"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex items-center gap-2">
              {isLoading ? (
                <Icon name="LoaderCircle" className="animate-spin" />
              ) : (
                <Icon name="Save" />
              )}
              Save
            </Button>
          </div>
          <PurchaseForm
            loading={loading}
            register={register}
            control={control}
            errors={errors}
          />
          <div className="py-5">
            <TableForData
              lists={purchaseLists}
              setItemLists={setPurchaseLists}
              defaultColumns={getPurchaseColumns(setPurchaseLists)}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Purchase;
