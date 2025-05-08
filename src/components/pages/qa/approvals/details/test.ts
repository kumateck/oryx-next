import { ApprovalStatus } from "@/lib";

export const mockApprovalLogs = [
  {
    user: {
      name: "John Doe",
    },
    approvedAt: "2024-03-15T09:30:00Z",
    status: ApprovalStatus.Approved,
    // comments: "Looks good, approved for processing",
  },
  {
    user: {
      name: "Jane Smith",
    },
    approvedAt: "2024-03-14T14:45:00Z",
    status: ApprovalStatus.Rejected,
    comments: "Missing required documentation",
  },
  {
    user: {
      name: "Michael Chen",
    },
    approvedAt: "2024-03-13T11:15:00Z",
    status: ApprovalStatus.Pending,
  },
  {
    user: {
      name: "Sarah Johnson",
    },
    approvedAt: "2024-03-12T16:20:00Z",
    status: ApprovalStatus.Approved,
    comments: "Approved with minor revisions",
  },
];
