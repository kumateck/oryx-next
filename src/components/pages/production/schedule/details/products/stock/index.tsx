import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
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
  GenerateCodeOptions,
  RequisitionType,
  Units,
  convertToSmallestUnit,
  generateCode,
  isErrorResponse,
} from "@/lib";
import {
  NamingType,
  PostApiV1RequisitionApiArg,
  useGetApiV1ConfigurationByModelTypeByModelTypeQuery, // useGetApiV1ProductQuery, // useLazyGetApiV1ProductByProductIdQuery,
  useLazyGetApiV1RequisitionQuery,
  usePostApiV1RequisitionMutation,
} from "@/lib/redux/api/openapi.generated";

import { getColumns } from "../columns";
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
  notEdittable?: boolean;
  productId?: string;
  productionScheduleId?: string;
  productionActivityStepId?: string;
}
const Stock = ({
  isOpen,
  onClose,
  lists,
  productId,
  productionScheduleId,
  productionActivityStepId,
}: Props) => {
  const router = useRouter();
  // const { data: response } = useGetApiV1ProductQuery({
  //   page: 1,
  //   pageSize: 100,
  // });
  const { data: codeConfig } =
    useGetApiV1ConfigurationByModelTypeByModelTypeQuery({
      modelType: CODE_SETTINGS.modelTypes.Requisition,
    });
  const [loadProduct] = useLazyGetApiV1RequisitionQuery();
  // const [loadPlanning, { data: planning }] =
  //   useLazyGetApiV1ProductByProductIdQuery();
  const [saveMutation, { isLoading }] = usePostApiV1RequisitionMutation();
  // const products = response?.data || [];
  // const productOptions = products.map((product) => ({
  //   label: product.name,
  //   value: product.id,
  // })) as Option[];

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
    defaultValues: {
      expectedDelivery: new Date(),
    },
  });

  useEffect(() => {
    const loadCodes = async () => {
      const generatePayload: GenerateCodeOptions = {
        maxlength: Number(codeConfig?.maximumNameLength),
        minlength: Number(codeConfig?.minimumNameLength),
        prefix: codeConfig?.prefix as string,
        type: codeConfig?.namingType as NamingType,
      };
      const productsResponse = await loadProduct({
        page: 1,
        pageSize: 1,
      }).unwrap();

      const products = productsResponse?.totalRecordCount ?? 0;
      generatePayload.seriesCounter = products + 1;
      const code = await generateCode(generatePayload);
      setValue("code", code);
    };

    loadCodes();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeConfig]);
  const onSubmit = async (data: RequisitionRequestDto) => {
    const items = lists?.map((item) => ({
      materialId: item.materialId,
      quantity: convertToSmallestUnit(
        item.quantity as number,
        item.uom as Units,
      ).value, //,
      uomId: item.uomId,
    }));

    const payload = {
      createRequisitionRequest: {
        requisitionType: RequisitionType.StockVoucher,
        comments: data.comments,
        code: data.code,
        expectedDelivery: data.expectedDelivery?.toISOString(),
        items,
        productId,
        productionScheduleId,
        productionActivityStepId,
      },
    } satisfies PostApiV1RequisitionApiArg;

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
        toast.error(isErrorResponse(error as ErrorResponse)?.description);
      }
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Create New Stock Requisition Voucher</DialogTitle>
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
          <PurchaseForm register={register} control={control} errors={errors} />
          <div className="py-5">
            <TableForData
              lists={lists}
              setItemLists={setPurchaseLists}
              defaultColumns={getColumns}
              notEdittable
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Stock;
