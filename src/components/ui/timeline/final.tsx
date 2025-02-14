interface Props {
  title: string;
  step: number;
  setCurrentStep: (step: number) => void;
}
const FinalStep = ({ title, setCurrentStep, step }: Props) => {
  return (
    <li
      className="w-full hover:cursor-pointer"
      onClick={() => setCurrentStep(step)}
    >
      <div className="flex w-full items-center">
        <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-neutral-200 bg-white p-1.5 text-white">
          NA
        </div>
      </div>
      <div className="pt-2">
        <span className="text-base font-medium">{title}</span>
      </div>
    </li>
  );
};

export default FinalStep;
