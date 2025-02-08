import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

// import { FormWizard } from "@/components/form-inputs";
// import { FormInput } from "@/components/form-inputs/wizard";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Icon,
} from "@/components/ui";
import {
  // COLLECTION_TYPES,
  ErrorResponse,
  // InputTypes,
  // Option,
  // RequisitionType,
  isErrorResponse,
} from "@/lib";
import {
  PostApiV1ApprovalApiArg,
  usePostApiV1ApprovalMutation,
  // usePostApiV1CollectionMutation,
} from "@/lib/redux/api/openapi.generated";

import { ApprovalRequestDto, ApprovalValidator } from "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddApproval = ({ isOpen, onClose }: Props) => {
  const [saveApproval, { isLoading }] = usePostApiV1ApprovalMutation();
  // const [loadCollection, { data: collectionResponse }] =
  //   usePostApiV1CollectionMutation();
  const {
    control,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm<ApprovalRequestDto>({
    resolver: ApprovalValidator,
    mode: "all",
  });

  // useEffect(() => {
  //   loadCollection({
  //     body: [COLLECTION_TYPES.Role, COLLECTION_TYPES.User],
  //   }).unwrap();

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const roleOptions = collectionResponse?.[COLLECTION_TYPES.Role]?.map(
  //   (role) => ({
  //     label: role.name,
  //     value: role.id,
  //   }),
  // ) as Option[];

  // const userOptions = collectionResponse?.[COLLECTION_TYPES.User]?.map(
  //   (user) => ({
  //     label: user.name,
  //     value: user.id,
  //   }),
  // ) as Option[];

  // const requisitionTypeOptions = Object.keys(RequisitionType)
  //   .filter((key) => isNaN(Number(key))) // Filter out numeric keys
  //   .map((key, index) => ({
  //     label: key,
  //     value: index.toString(),
  //   }));

  const { fields, append, remove } = useFieldArray({
    control,
    name: "approvalStages",
  });

  const onSubmit = async (data: ApprovalRequestDto) => {
    const requisitionType = Number(data.requisitionType?.value);
    const approvalStages = data.approvalStages?.map((stage) => ({
      roleId: stage.roleId?.value,
      userId: stage.userId?.value,
      required: stage.required ? true : false,
      order: Number(stage.order?.value),
    }));
    const payload = {
      createApprovalRequest: {
        approvalStages,
        requisitionType,
      },
    } as PostApiV1ApprovalApiArg;
    try {
      await saveApproval(payload).unwrap();
      toast.success("Approval created successfully");
      reset();
      onClose();
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  // const typeValues =
  //   useWatch({
  //     control,
  //     name: "approvalStages",
  //   })?.map((stage) => stage?.type) || [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <span className="text-2xl font-semibold text-neutral-900">
              Add Approval
            </span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full">
            {/* <FormWizard
              config={[
                {
                  label: "Approval Type",
                  control,
                  type: InputTypes.SELECT,
                  name: "requisitionType",
                  onModal: true,
                  required: true,
                  placeholder: "Select item",
                  options: requisitionTypeOptions,
                  errors: {
                    message: errors.requisitionType?.message,
                    error: !!errors.requisitionType,
                  },
                },
              ]}
            /> */}

            <div>
              <div className="flex justify-between px-2 py-5">
                <span>Approval Stages</span>
                <Button
                  type="button"
                  onClick={() =>
                    append({
                      type: "User",
                      required: false,
                    })
                  }
                >
                  Add Stage
                </Button>
              </div>
            </div>

            <div className="max-h-[500px] min-h-[400px] w-full space-y-4 overflow-y-auto">
              {fields.map((field, index) => {
                // const type = typeValues[index];
                // const roleForm = {
                //   label: "Role",
                //   control,
                //   type: InputTypes.SELECT,
                //   name: `approvalStages.${index}.roleId`,
                //   required: true,
                //   onModal: true,
                //   placeholder: "Role",
                //   options: roleOptions,
                //   errors: {
                //     message:
                //       errors.approvalStages?.[
                //         index
                //       ]?.roleId?.message?.toString(),
                //     error: !!errors.approvalStages?.[index]?.roleId,
                //   },
                // };
                // const userForm = {
                //   label: "User",
                //   control,
                //   type: InputTypes.SELECT,
                //   name: `approvalStages.${index}.userId`,
                //   required: true,
                //   placeholder: "User",
                //   onModal: true,
                //   options: userOptions,
                //   errors: {
                //     message:
                //       errors.approvalStages?.[
                //         index
                //       ]?.userId?.message?.toString(),
                //     error: !!errors.approvalStages?.[index]?.userId,
                //   },
                // };
                // const typeSelect = type === "Role" ? roleForm : userForm;
                return (
                  <div
                    key={field.id}
                    className="relative rounded-2xl border p-2"
                  >
                    <div className="absolute right-2 top-2">
                      <Icon
                        onClick={() => remove(index)}
                        name="CircleMinus"
                        className="text-danger-500 h-5 w-5 hover:cursor-pointer"
                      />
                    </div>
                    {/* <FormWizard
                      config={[
                        {
                          label: "Type",
                          control,
                          type: InputTypes.RADIO,
                          name: `approvalStages.${index}.type`,
                          required: true,
                          options: ["User", "Role"].map((option) => ({
                            label: option,
                            value: option,
                          })),
                          errors: {
                            message:
                              (
                                errors?.approvalStages?.[index]
                                  ?.type as FieldError
                              )?.message || "",
                            error: !!errors?.approvalStages?.[index]?.type,
                          },
                        },
                      ]}
                    /> */}
                    {/* <div className="flex w-full gap-2">
                      <FormWizard
                        className="grid w-full grid-cols-2 gap-1 space-y-0"
                        fieldWrapperClassName="flex-grow"
                        config={[
                          typeSelect as FormInput,
                          {
                            label: "Rank",
                            control,
                            type: InputTypes.SELECT,
                            name: `approvalStages.${index}.order`,
                            required: true,
                            onModal: true,
                            placeholder: "Rank",
                            options: rankOptions,
                            errors: {
                              message:
                                errors.approvalStages?.[
                                  index
                                ]?.order?.message?.toString(),
                              error: !!errors.approvalStages?.[index]?.order,
                            },
                          },
                        ]}
                      />
                      <FormWizard
                        config={[
                          {
                            type: InputTypes.SWITCH,
                            label: "Required",
                            control,
                            name: `approvalStages.${index}.required`,
                            errors: {
                              message:
                                (
                                  errors?.approvalStages?.[index]
                                    ?.required as FieldError
                                )?.message || "",
                              error:
                                !!errors?.approvalStages?.[index]?.required,
                            },
                          },
                        ]}
                      />
                    </div> */}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 flex justify-end space-x-2">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {isLoading && (
                <Icon name="LoaderCircle" className="mr-2 animate-spin" />
              )}
              <span>Save</span>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// const rankOptions = [
//   { label: "Level 1", value: "1" },
//   { label: "Level 2", value: "2" },
//   { label: "Level 3", value: "3" },
//   { label: "Level 4", value: "4" },
//   { label: "Level 5", value: "5" },
//   { label: "Level 6", value: "6" },
//   { label: "Level 7", value: "7" },
// ];

export default AddApproval;
