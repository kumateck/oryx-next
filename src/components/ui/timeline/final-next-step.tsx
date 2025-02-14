import { FaRegCircleDot } from "react-icons/fa6";

interface Props {
  title: string;
  step: number;
  setCurrentStep: (step: number) => void;
}
const FinalNextStep = ({ title, setCurrentStep, step }: Props) => {
  return (
    <li
      className="w-full hover:cursor-pointer"
      onClick={() => setCurrentStep(step)}
    >
      <div className="flex w-full items-center">
        <div className="bg-secondary-500 flex h-9 w-9 items-center justify-center rounded-full p-1.5">
          <FaRegCircleDot className="text-info-500 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white" />
        </div>{" "}
      </div>
      <div className="pt-2">
        <span className="text-base font-medium">{title}</span>
      </div>
    </li>
  );
};

export default FinalNextStep;
