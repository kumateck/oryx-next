import { Icon } from "../icon";

interface Props {
  title: string;
  onClick?: () => void;
}
const ActiveStep = ({ title, onClick }: Props) => {
  return (
    <li className="w-full hover:cursor-pointer" onClick={onClick}>
      <div className="flex w-full items-center text-info-500 after:inline-block after:h-0.5 after:w-full after:border-4 after:border-b after:border-info-500 after:content-['']">
        <div className="h-9 w-9 rounded-full bg-info-500 p-1.5">
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
