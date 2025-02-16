import { ColumnDef } from "@tanstack/react-table";

import { DistributedRequisitionMaterialDto } from "@/lib/redux/api/openapi.generated";

export const getColumns =
  (): ColumnDef<DistributedRequisitionMaterialDto>[] => [
    {
      accessorKey: "batchNumber",
      header: "Batch Number",
      cell: ({ row }) => <div>{row.original.id}</div>,
    },
    {
      accessorKey: "materialName",
      header: "Material Name",
      cell: ({ row }) => <div>{row.original.material?.name}</div>,
    },
    {
      accessorKey: "manufacturerName",
      header: "Manufacturer Name",
      cell: ({ row }) => <div>{row.original.manufacturer?.name}</div>,
    },
    {
      accessorKey: "invoiceNumber",
      header: "Invoice Number",
      cell: ({ row }) => <div>{row.original.shipmentInvoice?.code}</div>,
    },
    {
      accessorKey: "batchQuantity",
      header: "Batch Quantity",
      cell: ({ row }) => <div>{row.original.quantity}</div>,
    },
    {
      accessorKey: "expiryDate",
      header: "Expiry Date",
      cell: ({ row }) => <div>{row.original.manufacturer?.country?.name}</div>,
    },
    {
      accessorKey: "manufacturingDate",
      header: "Manufacturing Date",
      cell: ({ row }) => <div>{row.original.manufacturer?.country?.name}</div>,
    },
    {
      accessorKey: "retestDate",
      header: "Retest Date",
      cell: ({ row }) => <div>{row.original.manufacturer?.country?.name}</div>,
    },
  ];
