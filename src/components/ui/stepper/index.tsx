import { Fragment } from "react";

import ActiveStep from "./active";
import FinalStep from "./final";
import FinalNextStep from "./final-next-step";
import NextStep from "./next-step";
import Step from "./step";

interface Props {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  steps: {
    title: string;
    description: string;
  }[];
}

export const Stepper = ({ currentStep, steps, setCurrentStep }: Props) => {
  const isFinalStep = (index: number) => index === steps.length - 1;
  const isLastActiveStep = (index: number) =>
    currentStep === index && isFinalStep(index);
  const isActiveStep = (index: number) => currentStep === index || index === 0;

  const isCompletedStep = (index: number) => currentStep > index;
  const isLastNotActiveStep = (index: number) => index === steps.length - 1;
  return (
    <div className="mx-auto w-full pl-0 pr-0 sm:pl-2 md:pl-4 lg:pl-6 xl:pl-12 2xl:pl-24">
      <ol className="flex w-full items-center">
        {steps?.map((item, index) => {
          return (
            <Fragment key={index}>
              {isCompletedStep(index) ? (
                <ActiveStep
                  title={item.title}
                  setCurrentStep={setCurrentStep}
                  step={index}
                />
              ) : isLastActiveStep(index) ? (
                <FinalNextStep
                  title={item.title}
                  setCurrentStep={setCurrentStep}
                  step={index}
                />
              ) : isActiveStep(index) ? (
                <NextStep
                  title={item.title}
                  setCurrentStep={setCurrentStep}
                  step={index}
                />
              ) : isLastNotActiveStep(index) ? (
                <FinalStep
                  title={item.title}
                  setCurrentStep={setCurrentStep}
                  step={index}
                />
              ) : (
                <Step
                  title={item.title}
                  setCurrentStep={setCurrentStep}
                  step={index}
                />
              )}
            </Fragment>
          );
        })}
      </ol>
    </div>
  );
};
