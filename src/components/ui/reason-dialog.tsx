import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Icon,
  LucideIconProps,
  Textarea,
} from ".";

interface Props {
  onConfirm?: (reason: string) => void;
  onClose?: () => void;
  open?: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  icon?: LucideIconProps;
  bgClassName?: string;
  textClassName?: string;
  buttonClassName?: string;
  subTitle?: string;
  isLoading?: boolean;
  hideCancel?: boolean;
  textareaPlaceholder?: string;
  minLength?: number;
}

export const ReasonDialog = ({
  title = "Provide Reason",
  description = "Please provide a reason for this action.",
  confirmText = "Save",
  onConfirm,
  onClose,
  open,
  icon,
  bgClassName,
  textClassName,
  buttonClassName,
  subTitle,
  isLoading,
  hideCancel,
  textareaPlaceholder = "Type your reason here...",
  minLength = 3,
}: Props) => {
  const [reason, setReason] = useState("");

  const handleConfirm = () => {
    if (onConfirm) onConfirm(reason.trim());
    setReason("");
  };

  return (
    <AlertDialog onOpenChange={onClose} open={open}>
      <AlertDialogContent>
        <div className="flex h-12 items-center justify-between">
          {icon && (
            <div
              className={cn(
                "bg-primary-100 flex h-12 w-12 items-center justify-center rounded-full shrink-0",
                bgClassName,
              )}
            >
              <Icon
                name={icon}
                className={cn("h-6 w-6 text-primary-inverted", textClassName)}
              />
            </div>
          )}

          <AlertDialogCancel className="border-0 p-0 shrink-0">
            <Icon name="X" className="h-6 w-6 text-neutral-500" />
          </AlertDialogCancel>
        </div>

        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {subTitle && (
            <div className="pb-3 font-medium text-neutral-800">
              RE: {subTitle}
            </div>
          )}
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <div className="mt-4">
          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={textareaPlaceholder}
            className="w-full rounded-md border border-neutral-300 p-2 text-sm focus:border-primary-default focus:outline-none focus:ring-1 focus:ring-primary-default"
            rows={4}
          />
        </div>

        <AlertDialogFooter>
          {!hideCancel && (
            <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          )}
          <AlertDialogAction
            className={cn(
              "bg-primary-default text-white hover:bg-primary-pressed",
              buttonClassName,
            )}
            onClick={handleConfirm}
            disabled={reason.trim().length < minLength || isLoading}
          >
            {isLoading && (
              <Icon name="LoaderCircle" className="h-4 w-4 animate-spin" />
            )}
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
