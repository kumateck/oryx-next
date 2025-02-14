interface Props {
  title: string;
  step: number;
  setCurrentStep: (step: number) => void;
}
const Step = ({ title, setCurrentStep, step }: Props) => {
  return (
    <li
      className="w-full hover:cursor-pointer"
      onClick={() => setCurrentStep(step)}
    >
      <div className="flex w-full items-center after:inline-block after:h-1 after:w-full after:border-4 after:border-b after:border-neutral-200 after:content-['']">
        <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-neutral-200 bg-white p-2 text-white">
          NA
        </div>
      </div>
      <div className="pt-2">
        <span className="text-base font-medium">{title}</span>
      </div>
    </li>
  );
};

export default Step;
