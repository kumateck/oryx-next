import { icons } from "lucide-react";

import { cn } from "@/lib/utils";

import { Icon } from "../icon";

interface IProps {
  title?: string;
  active?: string;
  icon?: keyof typeof icons;
  onClick: () => void;
}
const MenuButton = ({ onClick, title, icon, active }: IProps) => {
  return (
    <button
      onClick={onClick}
      className={cn("w-full px-2 text-left hover:bg-gray-200", { active })}
    >
      {title}
      {icon && <Icon name={icon} />}
    </button>
  );
};

export default MenuButton;
