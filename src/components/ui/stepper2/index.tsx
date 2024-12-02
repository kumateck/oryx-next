import { Fragment, useCallback } from "react";

import { Button } from "../button";
import { Icon } from "../icon";
import ActiveStep from "./active";
import FinalStep from "./final";
import FinalNextStep from "./final-next-step";
import NextStep from "./next-step";
import Step from "./step";

interface Props {
  leftBtns?: React.ReactNode;
  rightBtns?: React.ReactNode;
  children?: React.ReactNode;
  setCurrentStep: (value: React.SetStateAction<number>) => void;
  currentStep: number;
  steps: {
    title: string;
    description: string;
  }[];
  classNames?: {
    activeClassName?: string;
    inActiveClassName?: string;
    completedClassName?: string;
  };
}

export const NoIconStepper = ({
  currentStep,
  setCurrentStep,
  steps,
  children,
  leftBtns,
  rightBtns,
  classNames,
}: Props) => {
  const isFinalStep = (index: number) => index === steps.length - 1;
  const isLastActiveStep = (index: number) =>
    currentStep === index && isFinalStep(index);
  const isActiveStep = (index: number) => currentStep === index || index === 0;

  const isCompletedStep = (index: number) => currentStep > index;
  const isLastNotActiveStep = (index: number) => index === steps.length - 1;

  const goToNextStep = useCallback(() => {
    setCurrentStep((prev) => (prev === steps.length - 1 ? prev : prev + 1));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps.length]);

  const goToPreviousStep = useCallback(() => {
    setCurrentStep((prev) => (prev <= 0 ? prev : prev - 1));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="w-full">
      <div className="flex justify-end">
        <span className="text-neutral-500">
          Step {currentStep + 1}/{steps.length}
        </span>
      </div>
      <ol className="flex w-full items-center gap-8">
        {steps?.map((item, index) => {
          return (
            <Fragment key={index}>
              {isCompletedStep(index) ? (
                <ActiveStep
                  className={classNames?.completedClassName}
                  title={item.title}
                  onClick={() => setCurrentStep(index)}
                />
              ) : isLastActiveStep(index) ? (
                <FinalNextStep
                  className={classNames?.activeClassName}
                  title={item.title}
                  onClick={() => setCurrentStep(index)}
                />
              ) : isActiveStep(index) ? (
                <NextStep
                  className={classNames?.activeClassName}
                  title={item.title}
                  onClick={() => setCurrentStep(index)}
                />
              ) : isLastNotActiveStep(index) ? (
                <FinalStep
                  className={classNames?.inActiveClassName}
                  title={item.title}
                  onClick={() => setCurrentStep(index)}
                />
              ) : (
                <Step
                  className={classNames?.inActiveClassName}
                  title={item.title}
                  onClick={() => setCurrentStep(index)}
                />
              )}
            </Fragment>
          );
        })}
      </ol>
      <div className="w-full py-5">{children}</div>
      <div className="flex w-full items-center justify-end gap-4 py-8">
        {leftBtns}
        {currentStep > 0 && (
          <Button
            type="button"
            onClick={goToPreviousStep}
            variant={"secondary"}
            className="font-Medium flex items-center gap-1.5 px-4 py-2 text-sm"
          >
            <Icon name="ArrowLeft" className="h-5 w-5" />
            <span>Previous</span>
          </Button>
        )}
        {currentStep < steps.length - 1 && (
          <Button
            type="button"
            onClick={goToNextStep}
            variant={"default"}
            className="font-Medium flex items-center gap-1.5 px-4 py-2 text-sm"
          >
            <span>Next</span>
            <Icon name="ArrowRight" className="h-5 w-5" />
          </Button>
        )}
        {rightBtns}
      </div>
    </div>
  );
};
