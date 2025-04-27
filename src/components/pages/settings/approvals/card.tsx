import { Button, Icon } from "@/components/ui";
import { ApprovalDocument, splitWords } from "@/lib";
import { ApprovalDto } from "@/lib/redux/api/openapi.generated";
import Link from "next/link";

interface Props {
  approval: ApprovalDto;
  number: number;
  deleteHandler: (id: string) => void;
  isDeleteMutationLoading?: boolean;
}
const ApprovalCard = ({
  approval,
  number,
  deleteHandler,
  isDeleteMutationLoading,
}: Props) => {
  return (
    <div className="mt-2 w-full">
      <div className="rounded-lg border border-neutral-200 bg-white px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="text-left space-y-4">
            <div className="flex flex-1 gap-1 text-sm capitalize text-neutral-900">
              <span>{number + 1}.</span>
              <span>
                {approval?.itemType &&
                  splitWords(approval?.itemType as ApprovalDocument)}
              </span>
            </div>
            <div>
              <ul className="flex flex-wrap gap-2">
                {approval?.approvalStages?.map((res, index) => (
                  <li key={index}>
                    <div className="whitespace-nowrap rounded-3xl border border-neutral-secondaryAlt p-1 px-2 text-sm text-neutral-dark flex flex-col justify-center items-center">
                      <span className="text-neutral-default text-xl font-semibold px-5">
                        {res?.role?.name ?? res?.user?.name}{" "}
                      </span>
                      <span className="text-neutral-tertiary">
                        (Level {Number(res.order)})
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex w-2/6 items-center justify-end gap-1 px-2">
            <Link href={`/settings/approvals/edit/${approval.id}`}>
              <Button
                // onClick={() =>}
                variant={"outline"}
                className="flex items-center gap-1.5 border-neutral-default bg-white text-neutral-dark"
              >
                <Icon name="Pencil" size={14} />
                <span>Edit</span>
              </Button>
            </Link>
            <Button
              onClick={() => deleteHandler(approval.id as string)}
              variant={"outline"}
              className="text-danger-default border-danger-default flex items-center gap-1.5"
            >
              {isDeleteMutationLoading ? (
                <Icon
                  name="LoaderCircle"
                  size={14}
                  className="animate-spin text-neutral-dark"
                />
              ) : (
                <Icon name="Trash2" size={14} className="text-danger-default" />
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
