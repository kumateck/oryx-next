import React from "react";

import { Dialog, DialogContent } from "@/components/ui";

import { RevisionRequestDto } from "./type";

interface Props {
  setItemLists: React.Dispatch<React.SetStateAction<RevisionRequestDto[]>>;
  details: RevisionRequestDto;
  isOpen: boolean;
  onClose: () => void;
  itemLists: RevisionRequestDto[];
}
const Edit = ({ isOpen, onClose }: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>Edit</DialogContent>
    </Dialog>
  );
};

export default Edit;
