"use client";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import React, { useRef, useState } from "react";
import { Table } from "./table";
import logo from "@/assets/oryx_logo_dark.png";
import PageTitle from "@/shared/title";
import DropdownBtns from "@/shared/btns/drop-btn";
import { useReactToPrint } from "react-to-print";
import Image from "next/image";
import FilterForm from "./filterForm";
import { Button } from "@/components/ui";
import { useForm } from "react-hook-form";
import { FilterFormValues, FilterValidator } from "./type";

function Index() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  //use form
  const {
    register,
    control,
    // handleSubmit,
    formState: { errors },
  } = useForm<FilterFormValues>({
    resolver: FilterValidator,
    defaultValues: {
      startDate: "",
      endDate: "",
    },
  });

  // Function to handle printing the content
  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: `Quotation`,
    pageStyle: `
        @media print {
            html, body {
              font-size: 12px;
            }
          }
          @page {
            margin: 2mm 15mm;
          }`,
  });
  return (
    <ScrollablePageWrapper className="space-y-4">
      <FilterForm
        errors={errors}
        register={register}
        control={control}
        open={open}
        setOpen={setOpen}
      />
      <div className="w-full flex items-center justify-between gap-4">
        <PageTitle title="New hires and exits count report" />
        <div className="flex items-center gap-2">
          <Button onClick={() => setOpen(true)}>Filter</Button>
          <DropdownBtns
            variant="default"
            icon="Download"
            title="Export"
            menus={[
              {
                name: "PDF File",
                onClick: handlePrint,
              },
            ]}
          />
        </div>
      </div>
      <div ref={contentRef}>
        <Image src={logo} alt="logo" width={100} height={100} />
        <Table />
      </div>
    </ScrollablePageWrapper>
  );
}

export default Index;
