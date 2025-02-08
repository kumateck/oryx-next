import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button, Icon, Separator, Skeleton } from "@/components/ui";
import TheAduseiEditorViewer from "@/components/ui/adusei-editor/viewer";
import { ErrorResponse, isErrorResponse } from "@/lib";
import {
  CreateProductRequest,
  PutApiV1ProductPackageDescriptionByProductIdApiArg,
  useLazyGetApiV1ProductByProductIdQuery,
  usePutApiV1ProductPackageDescriptionByProductIdMutation,
} from "@/lib/redux/api/openapi.generated";
import PageTitle from "@/shared/title";
import StepWrapper from "@/shared/wrapper";

import PackOrderForm from "./form";
import { CreatePackOrderValidator, PackOrderRequestDto } from "./types";

const Create = () => {
  const { id } = useParams();
  const productId = id as string;
  // const router = useRouter();
  const [productMutation, { isLoading }] =
    usePutApiV1ProductPackageDescriptionByProductIdMutation();
  const [loadProductInfo, { isLoading: isLoadingProduct }] =
    useLazyGetApiV1ProductByProductIdQuery();
  const {
    register,
    control,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<PackOrderRequestDto>({
    resolver: CreatePackOrderValidator,
    mode: "all",
  });

  const [packOrderItems, setPackOrderItems] = React.useState({
    primaryPackDescription: "",
    secondaryPackDescription: "",
    tertiaryPackDescription: "",
  });

  useEffect(() => {
    handleLoadProduct(productId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);
  const handleLoadProduct = async (productId: string) => {
    const product = await loadProductInfo({
      productId,
    }).unwrap();

    const defaultProduct = {
      primaryPackDescription: product?.primaryPackDescription as string,
      secondaryPackDescription: product?.secondaryPackDescription as string,
      tertiaryPackDescription: product?.tertiaryPackDescription as string,
    } as PackOrderRequestDto;
    setValue("primaryPackDescription", defaultProduct.primaryPackDescription);
    setValue(
      "secondaryPackDescription",
      defaultProduct.secondaryPackDescription,
    );
    setValue("tertiaryPackDescription", defaultProduct.tertiaryPackDescription);
    setPackOrderItems(defaultProduct);
  };
  const onSubmit = async (data: PackOrderRequestDto) => {
    const payload = data satisfies CreateProductRequest;

    try {
      await productMutation({
        productId,
        updateProductPackageDescriptionRequest: payload,
      } as PutApiV1ProductPackageDescriptionByProductIdApiArg).unwrap();
      toast.success("Product Info updated successfully");
      await handleLoadProduct(productId);
      setIsEditing(false);
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  const [isEditing, setIsEditing] = React.useState(false);
  return (
    <StepWrapper className="w-full pb-3">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex w-full justify-between">
          <PageTitle title="Package Order Preparation" />
          <div className="flex gap-2">
            <Button
              type="button"
              variant={"secondary"}
              className="flex items-center gap-2"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Icon name="Plus" className="h-4 w-4" />
              {isEditing ? <span>Done</span> : <span>Edit</span>}
            </Button>

            <Button
              disabled={!isEditing}
              type="submit"
              variant={"default"}
              className="flex items-center gap-2"
            >
              {isLoading ? (
                <Icon name="LoaderCircle" className="h-4 w-4 animate-spin" />
              ) : (
                <Icon name="Save" className="h-4 w-4" />
              )}
              <span>Save Changes</span>{" "}
            </Button>
          </div>
        </div>
        {isLoadingProduct ? (
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-36 w-full rounded-xl bg-neutral-input" />
            <Skeleton className="h-36 w-full bg-neutral-input" />
            <Skeleton className="h-36 w-full bg-neutral-input" />
          </div>
        ) : (
          <div className="w-full py-6">
            {isEditing ? (
              <PackOrderForm
                control={control}
                register={register}
                errors={errors}
              />
            ) : (
              <div className="space-y-4">
                {packOrderItems?.primaryPackDescription && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="size-2 rounded-xs bg-neutral-dark" />
                      <span className="text-xl font-semibold italic">
                        Primary Pack
                      </span>
                    </div>
                    <TheAduseiEditorViewer
                      content={packOrderItems?.primaryPackDescription}
                    />
                  </div>
                )}
                <Separator />
                {packOrderItems?.secondaryPackDescription && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="size-2 rounded-xs bg-neutral-dark" />
                      <span className="text-xl font-semibold italic">
                        Secondary Pack
                      </span>
                    </div>
                    <TheAduseiEditorViewer
                      content={packOrderItems?.secondaryPackDescription}
                    />
                  </div>
                )}
                <Separator />
                {packOrderItems?.tertiaryPackDescription && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="size-2 rounded-xs bg-neutral-dark" />
                      <span className="text-xl font-semibold italic">
                        Tertiary Pack
                      </span>
                    </div>
                    <TheAduseiEditorViewer
                      content={packOrderItems?.tertiaryPackDescription}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </form>
    </StepWrapper>
  );
};

export default Create;
