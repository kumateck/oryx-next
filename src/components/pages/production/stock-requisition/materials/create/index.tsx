"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { FormWizard } from "@/components/form-inputs";
import { Button, Card, Icon, Label, SelectDropDown } from "@/components/ui";
import {
  CODE_SETTINGS,
  ErrorResponse,
  GenerateCodeOptions,
  InputTypes,
  Option,
  RequisitionType,
  generateCode,
  isErrorResponse,
} from "@/lib";
import {
  NamingType,
  PostApiV1RequisitionApiArg,
  useGetApiV1ConfigurationByModelTypeByModelTypeQuery,
  useGetApiV1ProductQuery,
  useLazyGetApiV1ProductByProductIdQuery,
  useLazyGetApiV1RequisitionQuery,
  usePostApiV1RequisitionMutation,
} from "@/lib/redux/api/openapi.generated";

import TableForData from "./table";
import {
  CreateRequisitionValidator,
  MaterialRequestDto,
  RequisitionRequestDto,
  itemsRequestSchema,
} from "./type";

const Page = () => {
  const router = useRouter();
  const { data: response } = useGetApiV1ProductQuery({
    page: 1,
    pageSize: 100,
  });
  const { data: codeConfig } =
    useGetApiV1ConfigurationByModelTypeByModelTypeQuery({
      modelType: CODE_SETTINGS.modelTypes.Requisition,
    });
  const [loadProduct] = useLazyGetApiV1RequisitionQuery();
  const [loadPlanning, { data: planning }] =
    useLazyGetApiV1ProductByProductIdQuery();
  const [saveMutation, { isLoading }] = usePostApiV1RequisitionMutation();
  const products = response?.data || [];
  const productOptions = products.map((product) => ({
    label: product.name,
    value: product.id,
  })) as Option[];

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
    const materials = [...packageLists, ...rawLists];
    const items = materials?.map((item) => ({
      materialId: item.materialId,
      quantity: item.quantity,
      uomId: item.uomId,
    }));
    const payload = {
      createRequisitionRequest: {
        requisitionType: RequisitionType.StockVoucher,
        comments: data.comments,
        code: data.code,
        // expectedDelivery: data.expectedDelivery,
        items,
      },
    } satisfies PostApiV1RequisitionApiArg;

    const validate = itemsRequestSchema.safeParse(items);

    if (!validate.success) {
      const errors = validate.error.issues.map(
        ({ message, path }) =>
          `${materials[path[0] as number].materialName}: ${message}`,
      );

      toast.error(errors.join(". "));
    } else {
      try {
        const res = await saveMutation(payload).unwrap();
        console.log(res, "res");
        toast.success("Requisition created successfully");
        router.push(`/production/stock-requisition`);
      } catch (error) {
        toast.error(isErrorResponse(error as ErrorResponse)?.description);
      }
    }

    //
  };
  const [rawLists, setRawLists] = useState<MaterialRequestDto[]>([]);
  const [packageLists, setPackageLists] = useState<MaterialRequestDto[]>([]);
  useEffect(() => {
    if (planning) {
      const raw = planning?.currentBillOfMaterial?.billOfMaterial?.items?.map(
        (material) => ({
          materialName: material.componentMaterial?.name,
          materialId: material.componentMaterial?.id,
          quantity: 0,
          uoMId: "",
        }),
      ) as unknown as MaterialRequestDto[];
      const packagings = planning?.packages?.map((packaging) => ({
        materialName: packaging.material?.name,
        materialId: packaging.material?.id,
        quantity: 0,
        uoMId: "",
      })) as unknown as MaterialRequestDto[];
      setRawLists(raw);
      setPackageLists(packagings);
    }
  }, [planning]);

  return (
    <div className="space-y-4">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full justify-between gap-4">
          <span className="text-2xl font-semibold">
            Stock Requisition Voucher
          </span>
          <Button className="flex gap-2" variant={"primary"}>
            {isLoading && <Icon name="LoaderCircle" className="animate-spin" />}
            <span>Save</span>
          </Button>
        </div>
        <Card className="p-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="w-full space-y-2">
              <FormWizard
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
                ]}
              />
              <div>
                <Label>Load Product Plan</Label>
                <SelectDropDown
                  options={productOptions}
                  onChange={async (opt) => {
                    const option = opt as Option;
                    await loadPlanning({
                      productId: option.value,
                    }).unwrap();
                  }}
                />
              </div>
              <FormWizard
                config={[
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
                ]}
              />
            </div>
            <div className="w-full">
              <FormWizard
                config={[
                  {
                    register: { ...register("comments") },
                    label: "Justification for Request",
                    placeholder: "Enter Reason for Requisition",
                    type: InputTypes.TEXTAREA,
                    rows: 10,
                    errors: {
                      message: errors.comments?.message,
                      error: !!errors.comments,
                    },
                  },
                ]}
              />
            </div>
          </div>
        </Card>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Raw Material</Label>
            <TableForData lists={rawLists} setItemLists={setRawLists} />
          </div>
          <div className="space-y-2">
            <Label>Packaging Material</Label>
            <TableForData lists={packageLists} setItemLists={setPackageLists} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Page;
