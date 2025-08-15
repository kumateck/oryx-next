import Image from "next/image";
import React from "react";

import logo from "@/assets/oryx_logo_dark.png";
import { SupplierDto } from "@/lib/redux/api/openapi.generated";

interface Props {
  supplier?: SupplierDto;
}
const InvoiceHeader = ({ supplier }: Props) => {
  return (
    <div>
      <div className="flex justify-between gap-4">
        <div className="flex flex-col gap-0.5 text-sm">
          <Image src={logo} alt="logo" width={100} height={100} />
          <span>+233559585203</span>
          <span>supplychainmanager@entrance.com</span>
          <span>www.entrancepharmaceuticals.com</span>
        </div>
        <div className="flex flex-col gap-0.5 text-sm">
          <span className="text-lg font-semibold capitalize">
            {supplier?.name}
          </span>
          <span>{supplier?.contactPerson}</span>
          <span>{supplier?.email}</span>
          <span>{supplier?.contactNumber}</span>
        </div>
      </div>
    </div>
  );
};

export default InvoiceHeader;
