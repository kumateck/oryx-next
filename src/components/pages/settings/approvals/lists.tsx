import { Option } from "@/lib";

// import ApprovalCard from "./card";
import { Approvals } from "./types";

interface Props {
  approvalLists: Approvals[];
  setApprovalLists: React.Dispatch<React.SetStateAction<Approvals[]>>;
  setChangesApplied: React.Dispatch<React.SetStateAction<boolean>>;
  employeesOptions: Option[];
  deleteHandler: (id: string) => void;
  isDeleteMutationLoading: boolean;
}
const ApprovalLists = ({
  approvalLists,
  // setApprovalLists,
  // employeesOptions,
  // deleteHandler,
  // isDeleteMutationLoading,
  // setChangesApplied,
}: Props) => {
  return (
    <ul className="w-full space-y-6">
      {approvalLists?.map((approval, idx) => (
        <li key={idx}>
          {/* <ApprovalCard
            number={idx}
            // deleteHandler={deleteHandler}
            // employeesOptions={employeesOptions}
            approval={approval}
            // index={idx}
            // setApprovalLists={setApprovalLists}
            // isDeleteMutationLoading={isDeleteMutationLoading}
            // setChangesApplied={setChangesApplied}
          /> */}
        </li>
      ))}
    </ul>
  );
};

export default ApprovalLists;
