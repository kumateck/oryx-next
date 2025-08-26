import React, { useEffect, useState } from "react";

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui";

import { CreateRevisionValidator, RevisionRequestDto } from "./type";
import { useForm } from "react-hook-form";
import { EMaterialKind, Option, RevisionType, UoMType } from "@/lib";
import RevisionForm from "./form";
import {
  useLazyGetApiV1MaterialQuery,
  usePostApiV1CollectionUomPaginatedMutation,
} from "@/lib/redux/api/openapi.generated";

interface Props {
  setItemLists: React.Dispatch<React.SetStateAction<RevisionRequestDto[]>>;
  isOpen: boolean;
  onClose: () => void;
  itemLists: RevisionRequestDto[];
  currency: Option;
  isMaterialType?: EMaterialKind;
}
const Create = ({
  currency,
  isOpen,
  onClose,
  setItemLists,
  isMaterialType,
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
    defaultValues: {
      type: RevisionType.AddItem.toString() as unknown as RevisionType,
      currency: currency,
    },
  });
  const onSubmit = async () => {
    const isValid = await trigger();
    if (isValid) {
      const data = getValues() as RevisionRequestDto;
      setItemLists((prevState) => {
        const payload = {
          ...data,
          idIndex: (prevState.length + 1).toString(),
          type: RevisionType.AddItem,
        };
        return [...prevState, payload]; // Add new item to the array
      });
      reset(); // Reset the form after submission
      onClose(); // Close the form/modal if applicable
    }
  };

  const [loadUom] = usePostApiV1CollectionUomPaginatedMutation();

  const [uomOptions, setUomOptions] = useState<Option[]>([]);

  const handleLoadUom = async (type: UoMType) => {
    try {
      const response = await loadUom({
        filterUnitOfMeasure: {
          pageSize: 100,
          types: [type],
        },
      }).unwrap();
      const uom = response.data;
      const uomOpt = uom?.map((uom) => ({
        label: `${uom.name} (${uom.symbol})`,
        value: uom.id,
      })) as Option[];

      setUomOptions(uomOpt);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleLoadUom(isMaterialType as unknown as UoMType);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMaterialType]);

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
            <span>Save</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Create;
