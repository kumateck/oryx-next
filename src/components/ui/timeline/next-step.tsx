import { FaRegCircleDot } from "react-icons/fa6";

interface Props {
  title: string;
  step: number;
  setCurrentStep: (step: number) => void;
}
const NextStep = ({ title, setCurrentStep, step }: Props) => {
  return (
    <li
      className="w-full hover:cursor-pointer"
      onClick={() => setCurrentStep(step)}
    >
      {/* <div className="flex w-full items-center after:inline-block after:h-1 after:w-full after:border-4 after:border-b after:border-neutral-200 after:content-['']">
        <div className="bg-secondary-500 flex h-9 w-9 items-center justify-center rounded-full p-1.5">
          <FaRegCircleDot className="text-info-500 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white" />
        </div>
      </div> */}
      <div className="flex w-full items-center justify-center after:inline-block after:h-full after:w-1 after:border-4 after:border-l after:border-neutral-200 after:content-['']">
        <div className="bg-secondary-500 flex h-9 w-9 items-center justify-center rounded-full p-1.5">
          <FaRegCircleDot className="text-info-500 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white" />
        </div>
      </div>

      <div className="pt-2">
        <span className="text-base font-medium">{title}</span>
      </div>
    </li>
  );
};

export default NextStep;
