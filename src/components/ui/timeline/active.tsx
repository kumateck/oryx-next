import { Icon } from "../icon";

interface Props {
  title: string;
  setCurrentStep: (step: number) => void;
  step: number;
}
const ActiveStep = ({ title, setCurrentStep, step }: Props) => {
  return (
    <li
      className="w-full hover:cursor-pointer"
      onClick={() => setCurrentStep(step)}
    >
      {/* <div className="text-info-500 after:border-info-500 flex w-full items-center after:inline-block after:h-full after:w-0.5 after:border-4 after:border-b after:content-['']">
        <div className="bg-info-500 h-9 w-9 rounded-full p-1.5">
          <Icon
            name="Check"
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white"
          />
        </div>
      </div> */}
      <div className="text-info-500 after:border-info-500 flex w-full items-center justify-center after:inline-block after:h-full after:w-0.5 after:border-4 after:border-l after:content-['']">
        <div className="bg-info-500 h-9 w-9 rounded-full p-1.5">
          <Icon
            name="Check"
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white"
          />
        </div>
      </div>
      <div className="pt-2">
        <span className="text-base font-medium">{title}</span>
      </div>
    </li>
  );
};

export default ActiveStep;
