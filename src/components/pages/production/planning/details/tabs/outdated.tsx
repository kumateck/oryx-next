import { ProductBillOfMaterialDto } from "@/lib/redux/api/openapi.generated";

import { Bom } from "./bom";

interface IProps {
  data?: ProductBillOfMaterialDto[];
}
export const OutdatedBom = ({ data }: IProps) => {
  console.log(data, "outdated");
  return (
    <div className="space-y-4">
      {data?.map((item, idx) => (
        <div key={idx}>
          <Bom data={item} />
        </div>
      ))}
    </div>
  );
};
