import _ from "lodash";
import Image from "next/image";
import { Fragment, useState } from "react";

// import { ModelType } from "@/lib/constants";
// import { getModelActionsUrl } from "@/lib/utils";
import { SuggestionItem, SuggestionProps } from ".";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../../command";
import { Icon } from "../../icon";

const HashtagList: React.FC<{
  items: SuggestionProps[];
  command: (item: SuggestionItem) => void;
}> = ({ items, command }) => {
  // console.log(items, "items");
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTypeItem, setSelectedTypeItem] =
    useState<SuggestionProps | null>(null);

  const handleReset = () => {
    setIsExpanded(false);
    setSelectedTypeItem(null);
  };
  return (
    <div
      className="suggestions z-50 !rounded-md bg-white"
      style={{
        zIndex: 99,
      }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {/* <ScrollArea className="h-[480px]"> */}
      <Command className="rounded-md" onClick={(e) => e.stopPropagation()}>
        {!isExpanded ? (
          <CommandList className="max-h-[480px] p-4">
            <CommandEmpty>No results found.</CommandEmpty>
            {items?.map((item, index) => (
              <Fragment key={index}>
                <CommandGroup
                  className="[&_[cmdk-group-heading]]:font-Bold relative [&_[cmdk-group-heading]]:text-sm [&_[cmdk-group-heading]]:text-neutral-900"
                  heading={item.heading}
                >
                  <div className="absolute right-0 top-0">
                    <div className="py-2">
                      <Icon
                        name="ChevronRight"
                        className="size-4 cursor-pointer text-neutral-900"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          setIsExpanded(true);
                          setSelectedTypeItem(item);
                        }}
                      />
                    </div>
                  </div>
                  {_.take(item?.children, 5)?.map((child, idx) => (
                    <>
                      {child.type === "item" ? (
                        <ItemComponent
                          child={child}
                          index={idx}
                          key={idx}
                          command={command}
                          handleReset={handleReset}
                        />
                      ) : (
                        <UserComponent
                          child={child}
                          index={idx}
                          key={idx}
                          command={command}
                          handleReset={handleReset}
                        />
                      )}
                    </>
                  ))}
                </CommandGroup>
                {index < items.length - 1 && <CommandSeparator />}
              </Fragment>
            ))}
          </CommandList>
        ) : (
          <CommandList className="max-h-[480px] p-4">
            <CommandEmpty>No results found.</CommandEmpty>
            {selectedTypeItem && (
              <CommandGroup
                className="[&_[cmdk-group-heading]]:font-Bold relative [&_[cmdk-group-heading]]:text-sm [&_[cmdk-group-heading]]:text-neutral-900"
                heading={selectedTypeItem.heading}
              >
                <div className="absolute right-0 top-0">
                  <div className="py-2">
                    <Icon
                      name="ChevronDown"
                      className="size-4 cursor-pointer text-neutral-900"
                      onClick={() => setIsExpanded(false)}
                    />
                  </div>
                </div>
                {selectedTypeItem?.children?.map((child, idx) => (
                  <Fragment key={idx}>
                    {child.type === "item" ? (
                      <ItemComponent
                        child={child}
                        index={idx}
                        key={idx}
                        command={command}
                        handleReset={handleReset}
                      />
                    ) : (
                      <UserComponent
                        child={child}
                        index={idx}
                        key={idx}
                        command={command}
                        handleReset={handleReset}
                      />
                    )}
                  </Fragment>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        )}
      </Command>
      {/* </ScrollArea> */}
    </div>
  );
};

export default HashtagList;

const ItemComponent: React.FC<{
  child: SuggestionItem;
  command: (item: SuggestionItem) => void;
  index: number;
  handleReset: () => void;
}> = ({ child, command, index, handleReset }) => {
  return (
    <CommandItem
      key={index}
      className="cursor-pointer rounded-md hover:bg-neutral-200"
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          const payload = {
            label: `${child?.reference}-${child.label}`,
            id: child.label,
            // id: getModelActionsUrl(
            //   child.modelType as ModelType,
            //   child.id as string,
            // ),
          };
          command(payload);

          handleReset();
        }}
      >
        <div className="">
          <span className="font-Bold block text-sm">{child.reference}</span>
          <div className="flex items-center gap-1 text-sm text-neutral-500">
            <span className="inline-block max-w-[10ch] overflow-hidden text-ellipsis whitespace-nowrap capitalize">
              {" "}
              {child.label}
            </span>
            <div className="size-1 bg-neutral-500" />
            <span>{child.modelType}</span>
          </div>
        </div>
      </button>
    </CommandItem>
  );
};

const UserComponent: React.FC<{
  child: SuggestionItem;
  command: (item: SuggestionItem) => void;
  index: number;
  handleReset: () => void;
}> = ({ child, command, index, handleReset }) => {
  return (
    <CommandItem
      key={index}
      className="cursor-pointer rounded-md hover:bg-neutral-200"
    >
      <button
        key={index}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          command(child);
          handleReset();
        }}
        className="flex items-center"
      >
        {/* <Image
          src={child.image}
          alt={child.label}
          className="mr-3 h-10 w-10 rounded-full"
          onError={(e) => {
            e.currentTarget.src = `https://avatar.iran.liara.run/username?username=${child.label}`;
          }}
        /> */}
        <Image
          onError={(e) =>
            (e.currentTarget.src = `https://avatar.iran.liara.run/username?username=${child.label}`)
          }
          src={child.image as string}
          alt={child.label}
          className="mr-3 h-10 w-10 rounded-full"
        />
        <div>
          <div className="font-Bold text-sm">{child.label}</div>
          <div className="text-sm text-neutral-500">{child.role}</div>
        </div>
      </button>
    </CommandItem>
  );
};

// const genUrl = (modelType: ModelType, id: string) => {
//   return getModelActionsUrl(modelType, id);
//   // switch (modelType) {
//   //   case ModelType.ACTIONS:
//   //   case ModelType.INCIDENT:
//   //     return `/incident/view/${id}`;
//   //   case ModelType.INSPECTION:
//   //     return `/inspections/view/${id}`;
//   //   case ModelType.OBSERVATION:
//   //     return `/observations/view/${id}`;
//   //   case ModelType.AUDITS:
//   //     return `/audits/view/${id}`;
//   //   case ModelType.TRAININGS:
//   //     return `/trainings/view/${id}`;
//   //   case ModelType.CERTIFICATION:
//   //     return `/certifications/view/${id}`;
//   //   case ModelType.REGULATION:
//   //     return `/regulations/view/${id}`;
//   //   case ModelType.FINDINGS:
//   //     return `/findings/view/${id}`;
//   //   default:
//   //     break;
//   // }
// };
