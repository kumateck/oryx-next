"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import EmptyIcon from "@/app/assets/empty-icon.svg";
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
  cn,
  findSelectedQuotation,
  isErrorResponse,
} from "@/lib";
import {
  useGetApiV1RequisitionSourceMaterialPriceComparisonQuery,
  usePostApiV1RequisitionSourceQuotationProcessPurchaseOrderMutation,
} from "@/lib/redux/api/openapi.generated";

import { Quotations } from "./type";

const Page = () => {
  const [saveProcess, { isLoading }] =
    usePostApiV1RequisitionSourceQuotationProcessPurchaseOrderMutation({});
  const { data } = useGetApiV1RequisitionSourceMaterialPriceComparisonQuery({
    supplierType: 0,
  });

  const [state, setState] = useState<Quotations[]>([]);
  useEffect(() => {
    if (data) {
      const response = data?.map((item) => {
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
              supplierName: p?.supplier?.name,
              price: p?.price,
              selected: false,
            };
          }),
        };
      }) as Quotations[];
      setState(response);
    }
  }, [data]);

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
      await saveProcess({
        body: findSelectedQuotation(state),
      }).unwrap();
      toast.success("Vendors Selected successfully");
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  return (
    <div className="">
      <div className="flex justify-between gap-4 py-5">
        <span className="text-3xl font-bold text-secondary-500">
          Price Comparison
        </span>
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
      {state.length === 0 && <EmptyState />}
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
            className="shadow-shadow2a rounded-md bg-white"
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
                        "border-primary-500 bg-stone-100 shadow-lg ring-1 ring-primary-500":
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
    </div>
  );
};
const EmptyState = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <div className="mb-6 text-neutral-400">
        <Image src={EmptyIcon} alt="empty-icon" />
      </div>
      <h3 className="mb-2 text-lg font-bold text-neutral-800">OOOPS!</h3>
      <p className="font-semibold text-neutral-800">
        You currently have no items or actions to view.
      </p>
      <p className="text-neutral-500">
        Please enter Foreign Sales Quotation Responses
      </p>
    </div>
  );
};
export default Page;
