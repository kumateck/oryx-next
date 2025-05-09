"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import PageWrapper from "@/components/layout/wrapper";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Icon,
  Label,
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui";
import {
  ErrorResponse,
  ProcurementType,
  Quotations,
  SupplierType,
  cn,
  findSelectedQuotation,
  isErrorResponse,
} from "@/lib";
import {
  useLazyGetApiV1RequisitionSourceMaterialPriceComparisonQuery,
  usePostApiV1RequisitionSourceQuotationProcessPurchaseOrderMutation,
} from "@/lib/redux/api/openapi.generated";
import AccessTabs from "@/shared/access";
import EmptyState from "@/shared/empty";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import SkeletonLoadingPage from "@/shared/skeleton-page-loader";
import PageTitle from "@/shared/title";

const Page = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const type = searchParams.get("type") as unknown as SupplierType; // Extracts 'type' from URL

  const pathname = usePathname();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleTabClick = (tabType: SupplierType) => {
    router.push(pathname + "?" + createQueryString("type", tabType.toString()));
  };

  const [saveProcess, { isLoading }] =
    usePostApiV1RequisitionSourceQuotationProcessPurchaseOrderMutation();

  const [loadPrices, { isLoading: isLoadingData, isFetching }] =
    useLazyGetApiV1RequisitionSourceMaterialPriceComparisonQuery();

  const [state, setState] = useState<Quotations[]>([]);
  useEffect(() => {
    handleLoadPriceComparison(type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const handleLoadPriceComparison = async (type: SupplierType) => {
    setState([]);
    try {
      const response = await loadPrices({
        supplierType: type ?? SupplierType.Foreign,
      }).unwrap();
      setState(() => []);
      const prices = response?.map((item) => {
        return {
          materialCode: item?.material?.code,
          materialId: item?.material?.id,
          materialName: item?.material?.name,
          uomName: item?.uoM?.name,
          uomId: item?.uoM?.id,
          quantity: item?.quantity,
          supplierQuotations: item?.supplierQuotation?.map((p) => {
            return {
              supplierId: p?.supplier?.id,
              sourceRequisitionId: p?.sourceRequisition?.id,
              supplierName: p?.supplier?.name,
              price: p?.price,
              selected: false,
            };
          }),
        };
      }) as Quotations[];
      setState(() => prices);
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (value: string, index: number) => {
    setState((prev) => {
      return prev?.map((item, idx) => {
        if (idx === index) {
          return {
            ...item,
            supplierQuotations: item?.supplierQuotations?.map((quote) => {
              if (quote.supplierId === value) {
                return {
                  ...quote,
                  selected: true,
                };
              }
              return {
                ...quote,
                selected: false,
              };
            }),
          };
        }
        return item;
      });
    });
  };

  const onSubmit = async () => {
    try {
      const body = findSelectedQuotation(state);
      await saveProcess({
        supplierType: type || SupplierType.Foreign,
        body,
      }).unwrap();
      toast.success("Supplier Selected successfully");
      handleLoadPriceComparison(type);
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  return (
    <PageWrapper className="w-full space-y-2 py-1">
      <div className="flex justify-between gap-4 py-5">
        <PageTitle title="Price Comparison" />
        <AccessTabs
          handleTabClick={handleTabClick}
          type={type}
          tabs={[
            {
              label: ProcurementType.Foreign,
              value: SupplierType.Foreign.toString(),
            },
            {
              label: ProcurementType.Local,
              value: SupplierType.Local.toString(),
            },
          ]}
        />
        <Button
          onClick={() => onSubmit()}
          disabled={findSelectedQuotation(state).length === 0}
        >
          {isLoading && (
            <Icon name="LoaderCircle" className="animate-spin" size={16} />
          )}
          <span>Apply Changes</span>
        </Button>
      </div>
      {isLoadingData || isFetching ? (
        <SkeletonLoadingPage />
      ) : (
        <div>
          {state.length === 0 && <EmptyState />}
          <ScrollablePageWrapper>
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue={"group-0"}
            >
              {state?.map((item, idx) => (
                <AccordionItem
                  key={idx}
                  value={`group-${idx}`}
                  className="shadow-shadow2a rounded-2xl bg-white"
                >
                  <AccordionTrigger className="w-full gap-4 px-5">
                    <div>
                      {item?.materialCode} - {item?.materialName}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="border-t bg-white p-5">
                    <RadioGroup
                      className="flex flex-col gap-6 lg:flex-row"
                      onValueChange={(v) => onChange(v, idx)}
                    >
                      {item?.supplierQuotations?.map((quote, index) => (
                        <div
                          key={index}
                          // className="rounded-lg border p-4 transition hover:bg-stone-100"
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
                                checked={quote?.selected}
                              >
                                <Icon
                                  name="CheckCheck"
                                  className="h-7 w-7 text-current"
                                />
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
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollablePageWrapper>
        </div>
      )}
    </PageWrapper>
  );
};

export default Page;
