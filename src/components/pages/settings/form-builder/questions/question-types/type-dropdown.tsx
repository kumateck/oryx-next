import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icon,
  IconProps,
} from "@/components/ui";
import { cn } from "@/lib/utils";

export interface List {
  name: string;
  icon?: IconProps["name"];
  title?: string;
}
interface ActionDropdownProps {
  lists: List[];
  children?: React.ReactNode;
  onSelect?: (value: List) => void;
  active: List;
}
const TypesDropdown = ({
  lists,
  children,
  onSelect,
  active,
}: ActionDropdownProps) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none ring-0 active:outline-none active:ring-0">
          {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="max-h-[40vh] space-y-2 overflow-y-auto rounded-xl bg-neutral-50 p-4"
          side="bottom"
          align="end"
        >
          {lists?.map((child, idx) => (
            <DropdownMenuItem
              key={idx}
              className={cn("flex items-center gap-1.5 px-4 py-2 text-black", {
                "rounded-md bg-neutral-200 text-black":
                  active?.name === child.name,
              })}
              onClick={() => {
                if (onSelect) onSelect(child);
              }}
            >
              {child.icon && <Icon name={child.icon} />}
              <span>{child.title}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TypesDropdown;
