import { Card } from "@/components/ui";
import { fullname, RequisitionType } from "@/lib";
import { useGetApiV1RequisitionByRequisitionIdQuery } from "@/lib/redux/api/openapi.generated";
import { ClientDatatable } from "@/shared/datatable";
import React from "react";
import { columns } from "./column";

interface Props {
  id: string;
}
const PurchaseRequisition = ({ id }: Props) => {
  const { data: requisition } = useGetApiV1RequisitionByRequisitionIdQuery({
    requisitionId: id,
  });
  return (
    <div>
      <Card className="p-5 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="w-full space-y-2">
            <ul>
              <li>
                <span className="text-sm font-semibold">Requisition Code:</span>{" "}
                <span>{requisition?.code}</span>
              </li>
              <li>
                <span className="text-sm font-semibold">Requisition Type:</span>{" "}
                <span>
                  {
                    RequisitionType[
                      requisition?.requisitionType as RequisitionType
                    ]
                  }
                </span>
              </li>
              <li>
                <span className="text-sm font-semibold">Deparment:</span>{" "}
                <span>{requisition?.requestedBy?.department?.name}</span>
                <span>
                  {" "}
                  by: (
                  {fullname(
                    requisition?.requestedBy?.firstName as string,
                    requisition?.requestedBy?.lastName as string,
                  )}
                  )
                </span>
              </li>
              <li>
                <span className="text-sm font-semibold">Comments</span>
                <p>{requisition?.comments}</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="space-y-2">
          <ClientDatatable data={requisition?.items ?? []} columns={columns} />
        </div>
      </Card>
    </div>
  );
};

export default PurchaseRequisition;
