"use client";
import { WorkflowFormType } from "@/lib";

import { useParams } from "next/navigation";

import FormResponseForMaterial from "./material";
import FormResponseForProduct from "./product";

const Complete = () => {
  const { type } = useParams();

  const formType = Number(type) as WorkflowFormType;

  return (
    <div>
      {formType === WorkflowFormType.Material && <FormResponseForMaterial />}
      {formType === WorkflowFormType.Product && <FormResponseForProduct />}
    </div>
  );
};

export default Complete;
