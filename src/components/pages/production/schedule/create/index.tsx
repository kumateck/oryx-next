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
  generateCode,
  isErrorResponse,
} from "@/lib";
import {
  NamingType,
  PostApiV1ProductionScheduleScheduleApiArg,
  useGetApiV1ConfigurationByModelTypeByModelTypeQuery,
  useGetApiV1ProductQuery,
  useLazyGetApiV1ProductByProductIdQuery,
  useLazyGetApiV1RequisitionQuery,
  usePostApiV1ProductionScheduleScheduleMutation,
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
      modelType: CODE_SETTINGS.modelTypes.ProductionSchedule,
    });
  const [loadProduct] = useLazyGetApiV1RequisitionQuery();
  const [loadPlanning, { data: planning }] =
    useLazyGetApiV1ProductByProductIdQuery();
  const [saveMutation, { isLoading }] =
    usePostApiV1ProductionScheduleScheduleMutation();
  const [selectedProduct, setSelectedProduct] = useState<Option>();
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

  // materialId?: string;
  // uomId?: string | null;
  // quantity?: number;

  const onSubmit = async (data: any) => {
    // console.log(data);
    const materials = [...packageLists, ...rawLists];
    const items = materials?.map((item) => ({
      materialId: item.materialId,
      quantity: item.quantity,
      uomId: item.uomId,
    }));
    const payload = {
      createProductionScheduleRequest: {
        code: data.code,
        items,
        productId: selectedProduct?.value,
        quantity: data.quantity,
        remarks: data.remarks,
        scheduledEndTime: data.scheduledEndTime,
        scheduledStartTime: data.scheduledStartTime,
      },
    } satisfies PostApiV1ProductionScheduleScheduleApiArg;

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
        toast.success("Schedule created successfully");
        router.push(`/production/schedules`);
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
          uomId: "",
        }),
      ) as unknown as MaterialRequestDto[];
      const packagings = planning?.packages?.map((packaging) => ({
        materialName: packaging.material?.name,
        materialId: packaging.material?.id,
        quantity: 0,
        uomId: "",
      })) as unknown as MaterialRequestDto[];
      setRawLists(raw);
      setPackageLists(packagings);
    }
  }, [planning]);
  console.log(packageLists, "materials", rawLists);

  return (
    <div className="space-y-4">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full justify-between gap-4">
          <span className="text-2xl font-semibold">Production Schedule</span>
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
                    label: "Schedule Code",
                    readOnly: true,
                    required: true,
                    description: (
                      <span className="text-sm text-neutral-500">
                        You can’t change the schedule code
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
                <Label> Production Plan</Label>
                <SelectDropDown
                  options={productOptions}
                  onChange={async (opt) => {
                    const option = opt as Option;
                    setSelectedProduct(option);
                    await loadPlanning({
                      productId: option.value,
                    }).unwrap();
                  }}
                />
              </div>
              <FormWizard
                config={[
                  {
                    register: {
                      ...register("quantity", { valueAsNumber: true }),
                    },
                    label: "Schedule Quantity",
                    required: true,
                    placeholder: "Enter Quantity",
                    type: InputTypes.NUMBER,
                    errors: {
                      message: errors.quantity?.message,
                      error: !!errors.quantity,
                    },
                  },
                  {
                    type: InputTypes.DATE,
                    label: "Schedule Start Date",
                    name: "scheduledStartTime",
                    kind: "extensive",
                    control,
                    errors: {
                      message: errors.scheduledStartTime?.message,
                      error: !!errors.scheduledStartTime,
                    },
                    disabled: {
                      // after: new Date(),
                      before: new Date(),
                    },
                  },
                  {
                    type: InputTypes.DATE,
                    label: "Schedule End Date",
                    name: "scheduledEndTime",
                    kind: "extensive",
                    control,
                    errors: {
                      message: errors.scheduledEndTime?.message,
                      error: !!errors.scheduledEndTime,
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
                    register: { ...register("remarks") },
                    label: "Remarks",
                    placeholder: "Enter remarks for schedule",
                    type: InputTypes.TEXTAREA,
                    rows: 13,
                    errors: {
                      message: errors.remarks?.message,
                      error: !!errors.remarks,
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
