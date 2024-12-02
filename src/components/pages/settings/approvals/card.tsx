import { Button, Icon } from "@/components/ui";
import { RequisitionType } from "@/lib";
import { ApprovalDto } from "@/lib/redux/api/openapi.generated";

interface Props {
  approval: ApprovalDto;
  number: number;
}
const ApprovalCard = ({ approval, number }: Props) => {
  const isDeleting = false;
  return (
    <div className="mt-2 w-full">
      <div className="rounded-lg border border-neutral-200 bg-white px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="text-left">
            <div className="flex flex-1 gap-1 text-sm capitalize text-neutral-900">
              <span>{number + 1}.</span>
              <span>
                {RequisitionType[approval?.requisitionType as RequisitionType]}
              </span>
            </div>
            <div>
              <span className="text-sm text-neutral-400">
                {/* {question?.type?.title} */}
              </span>
              <ul className="flex flex-wrap gap-2">
                {approval?.approvalStages?.map((res, index) => (
                  <li key={index}>
                    <div className="whitespace-nowrap rounded-3xl border border-neutral-300 p-1 px-2 text-sm text-neutral-700">
                      <span className="text-base text-danger-500">
                        {res.required ? "*" : ""}
                      </span>
                      <span className="text-neutral-500">
                        {res?.role?.name ?? res?.user?.name}{" "}
                        <small className="text-warning-500">
                          (Level {res.order})
                        </small>
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex w-2/6 items-center justify-end gap-1 px-2">
            <Button
              // onClick={() => onEdit(question)}
              variant={"outline"}
              className="flex items-center gap-1.5 border-neutral-300 bg-white text-neutral-700"
            >
              <Icon name="Pencil" size={14} />
              <span>Edit</span>
            </Button>
            <Button
              // onClick={() => onDelete(question.id)}
              variant={"outline"}
              className="text-destructive-500 flex items-center gap-1.5 border-danger-500"
            >
              {isDeleting ? (
                <Icon name="LoaderCircle" size={14} className="animate-spin" />
              ) : (
                <Icon
                  name="Trash2"
                  size={14}
                  className="text-destructive-500"
                />
              )}
              <span>Delete</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovalCard;
