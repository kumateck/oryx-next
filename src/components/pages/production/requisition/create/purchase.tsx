import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { FormWizard } from "@/components/form-inputs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import {
  CODE_SETTINGS,
  ErrorResponse,
  GenerateCodeOptions,
  InputTypes, // Option,
  RequisitionType,
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

import { getPurchaseColumns } from "./columns";
import TableForData from "./table";
import {
  CreateRequisitionValidator,
  MaterialRequestDto,
  RequisitionRequestDto,
  itemsRequestSchema,
} from "./type";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  lists: MaterialRequestDto[];
}
const Purchase = ({ isOpen, onClose, lists }: Props) => {
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
        pageSize: 100000,
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
    // console.log(data);
    // const materials = [...packageLists, ...rawLists];
    const items = purchaseLists?.map((item) => ({
      materialId: item.materialId,
      quantity: item.quantity,
      uomId: item.uomId,
    }));
    const payload = {
      createRequisitionRequest: {
        requisitionType: RequisitionType.Purchase,
        comments: data.comments,
        code: data.code,
        expectedDelivery: data.expectedDelivery,
        items,
      },
    } satisfies PostApiV1RequisitionApiArg;

    console.log(items, "items");
    const validate = itemsRequestSchema.safeParse(items);

    if (!validate.success) {
      const errors = validate.error.issues.map(
        ({ message, path }) =>
          `${purchaseLists[path[0] as number].materialName}: ${message}`,
      );

      toast.error(errors.join(". "));
    } else {
      try {
        const res = await saveMutation(payload).unwrap();
        console.log(res, "res");
        toast.success("Purchase Requisition created successfully");
        router.push(`/production/requisition`);
      } catch (error) {
        toast.error(isErrorResponse(error as ErrorResponse)?.description);
      }
    }

    //
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Create New Purchase Requisition Voucher</DialogTitle>
        </DialogHeader>
        <form className="spacey-6 w-full" onSubmit={handleSubmit(onSubmit)}>
          <FormWizard
            className="grid grid-cols-2 gap-2 space-y-0"
            fieldWrapperClassName="flex-grow"
            config={[
              {
                register: { ...register("code") },
                label: "Requisition Number",
                readOnly: true,
                required: true,
                description: (
                  <span className="text-sm text-neutral-500">
                    You can’t change the requisition number
                  </span>
                ),
                placeholder: "Code will be generated",
                type: InputTypes.TEXT,
                errors: {
                  message: errors.code?.message,
                  error: !!errors.code,
                },
              },

              {
                type: InputTypes.SUBMIT,
                title: "Create Requisition",
                loading: isLoading,
              },
              {
                type: InputTypes.DATE,
                label: "Expected Delivery Date",
                name: "expectedDelivery",
                kind: "extensive",
                control,
                errors: {
                  message: errors.expectedDelivery?.message,
                  error: !!errors.expectedDelivery,
                },
                disabled: {
                  // after: new Date(),
                  before: new Date(),
                },
              },

              {
                register: { ...register("comments") },
                type: InputTypes.TEXTAREA,
                label: "Remarks",
                placeholder: "Remarks",
                rows: 6,
                errors: {
                  message: errors.comments?.message,
                  error: !!errors.comments,
                },
              },
            ]}
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
