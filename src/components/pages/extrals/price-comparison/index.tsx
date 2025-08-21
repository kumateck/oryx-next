"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

import PageWrapper from "@/components/layout/wrapper";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Icon,
  Label,
  // Icon,
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui";
import {
  cn,
  InventoryRequisitionSource,
  splitWords,
  SupplierType,
} from "@/lib";
import {
  useLazyGetApiV1ProcurementInventoryPriceComparisonQuery,
  usePostApiV1RequisitionSourceQuotationProcessPurchaseOrderMutation,
} from "@/lib/redux/api/openapi.generated";
import AccessTabs from "@/shared/access";
import EmptyState from "@/shared/empty";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import SkeletonLoadingPage from "@/shared/skeleton-page-loader";
import PageTitle from "@/shared/title";
import { findSelectedQuotation, Quotations } from "./type";
import ThrowErrorMessage from "@/lib/throw-error";
import { toast } from "sonner";

const Page = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const type = searchParams.get(
    "type",
  ) as unknown as InventoryRequisitionSource; // Extracts 'type' from URL

  const pathname = usePathname();

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

  //TODO:
  usePostApiV1RequisitionSourceQuotationProcessPurchaseOrderMutation();

  const [loadPrices, { isLoading: isLoadingData, isFetching }] =
    useLazyGetApiV1ProcurementInventoryPriceComparisonQuery();

  const [state, setState] = useState<Quotations[]>([]);
  useEffect(() => {
    handleLoadPriceComparison(type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const handleLoadPriceComparison = async (
    type: InventoryRequisitionSource,
  ) => {
    setState([]);
    try {
      const response = await loadPrices({
        source: type ?? InventoryRequisitionSource.TrustedVendor,
      }).unwrap();
      setState(() => []);
      const prices = response?.map((item) => {
        return {
          itemCode: item?.item?.code ?? "",
          itemId: item?.item?.id ?? "",
          itemName: item?.item?.name ?? "",
          uomName: item?.uoM?.name ?? "",
          uomId: item?.uoM?.id ?? "",
          quantity: item?.quantity ?? 0,
          vendorQuotations:
            item?.vendorPrices?.map((p) => {
              return {
                vendorId: p?.vendor?.id ?? "",
                vendorName: p?.vendor?.name ?? "",
                price: p?.pricePerUnit ?? 0, // use correct property name from VendorPrice
                selected: false,
                sourceRequisitionId: "",
              };
            }) ?? [],
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
            vendorQuotations: item?.vendorQuotations?.map((quote) => {
              if (quote.vendorId === value) {
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
      // const body = findSelectedQuotation(state);
      // await saveProcess({
      //   sorce: type || SupplierType.Foreign,
      //   body,
      // }).unwrap();
      toast.success("Vendor Selected successfully");
      handleLoadPriceComparison(type);
    } catch (error) {
      ThrowErrorMessage(error);
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
              label: splitWords(
                InventoryRequisitionSource[
                  InventoryRequisitionSource.TrustedVendor
                ],
              ),
              value: InventoryRequisitionSource.TrustedVendor.toString(),
            },
            {
              label: splitWords(
                InventoryRequisitionSource[
                  InventoryRequisitionSource.OpenMarket
                ],
              ),
              value: InventoryRequisitionSource.OpenMarket.toString(),
            },
          ]}
        />
        <Button
          onClick={() => onSubmit()}
          disabled={findSelectedQuotation(state).length === 0}
        >
          {/* {isLoading && (
            <Icon name="LoaderCircle" className="animate-spin" size={16} />
          )} */}
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
              {state?.map((item, index) => (
                <AccordionItem
                  key={index + item?.itemId}
                  value={`group-${index}`}
                  className="shadow-shadow2a rounded-2xl bg-white"
                >
                  <AccordionTrigger className="w-full gap-4 px-5">
                    <div>
                      {item.itemCode} - {item?.itemName}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="border-t bg-white p-5">
                    <RadioGroup
                      className="flex flex-col gap-6 lg:flex-row"
                      onValueChange={(v) => onChange(v, index)}
                    >
                      {item?.vendorQuotations?.map((quote, index) => (
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
                                value={quote?.vendorId}
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
                                {quote?.vendorName}
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
