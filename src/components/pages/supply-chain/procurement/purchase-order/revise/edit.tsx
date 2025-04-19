import React from "react";

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui";

import { CreateRevisionValidator, RevisionRequestDto } from "./type";
import { useForm } from "react-hook-form";
import { EMaterialKind, Option } from "@/lib";
import RevisionForm from "./form";
import {
  useGetApiV1CollectionUomQuery,
  useLazyGetApiV1MaterialQuery,
} from "@/lib/redux/api/openapi.generated";

interface Props {
  setItemLists: React.Dispatch<React.SetStateAction<RevisionRequestDto[]>>;
  isOpen: boolean;
  details: RevisionRequestDto;
  onClose: () => void;
  itemLists: RevisionRequestDto[];
  currency: Option;
  isMaterialType?: EMaterialKind;
}
const Edit = ({
  currency,
  isOpen,
  onClose,
  setItemLists,
  isMaterialType,
  details,
}: Props) => {
  const {
    register,
    control,
    formState: { errors },
    reset,
    trigger,
    getValues,
  } = useForm<RevisionRequestDto>({
    resolver: CreateRevisionValidator,
    mode: "all",
    defaultValues: details,
  });
  const onSubmit = async () => {
    const isValid = await trigger();
    if (isValid) {
      const data = getValues() as RevisionRequestDto;
      // setItemLists((prevState) => {
      //   const payload = {
      //     ...data,
      //     idIndex: (prevState.length + 1).toString(),
      //     type: RevisionType.AddItem,
      //   };
      //   return [...prevState, payload]; // Add new item to the array
      // });
      setItemLists((prev) =>
        prev.map((item) =>
          item.idIndex === details.idIndex ? { ...item, ...data } : item,
        ),
      );
      reset(); // Reset the form after submission
      onClose(); // Close the form/modal if applicable
    }
  };

  const { data: uomResponse } = useGetApiV1CollectionUomQuery({
    isRawMaterial: isMaterialType === EMaterialKind.Raw ? true : false,
  });

  const uomOptions = uomResponse?.map((uom) => ({
    label: uom.symbol,
    value: uom.id,
  })) as Option[];
  const [
    loadMaterials,
    { isLoading: isLoadingMaterials, isFetching: isFetchingMaterials },
  ] = useLazyGetApiV1MaterialQuery();
  const loadDataOrSearch = async (searchQuery: string, page: number) => {
    const res = await loadMaterials({
      searchQuery,
      page,
      kind: isMaterialType,
    }).unwrap();
    const response = {
      options: res?.data?.map((item) => ({
        label: item.name,
        value: item.id,
      })) as Option[],
      hasNext: (res?.pageIndex || 0) < (res?.stopPageIndex as number),
      hasPrevious: (res?.pageIndex as number) > 1,
    };
    return response;
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Create</DialogTitle>
        <RevisionForm
          control={control}
          register={register}
          errors={errors}
          fetchOptions={loadDataOrSearch}
          isLoading={isLoadingMaterials || isFetchingMaterials}
          uomOptions={uomOptions}
          currency={currency}
        />
        <DialogFooter>
          <Button variant={"outline"} onClick={onClose} type="button">
            Cancel
          </Button>
          <Button onClick={onSubmit}>
            <span>Save Changes</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Edit;
