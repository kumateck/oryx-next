// import React, { useEffect, useState } from "react";
// import { Input, SelectDropDown } from "@/components/ui";
// interface EditableCellProps {
//   type?: string;
//   cellContext: any; // Type this appropriately based on your row data
//   updateData: (rowIndex: number, columnId: string, value: unknown) => void;
// }
// const EditableCell: React.FC<EditableCellProps> = ({
//   cellContext,
//   updateData,
//   type,
// }) => {
//   const { row, column, value, getValue } = cellContext; // Get the rowIndex, columnId, and the current value from the context
//   const columnId = column.id;
//   const rowIndex = row.id;
//   const [editingValue, setEditingValue] = useState(getValue(columnId) || "0"); // Initialize the state with the current value
//   // Update editingValue when the value changes (useEffect ensures this happens on value changes)
//   useEffect(() => {
//     setEditingValue(value || "0");
//   }, [value]);
//   // Handle blur event (when input loses focus)
//   const handleBlur = () => {
//     if (editingValue !== value) {
//       // Update the value in the table when the input field loses focus
//       updateData(rowIndex, columnId, editingValue);
//     }
//   };
//   // Handle input changes
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setEditingValue(e.target.value);
//   };
//   return <div>{InputSwitch(formInput)}</div>;
// };
// const InputSwitch = (formInput: any) => {
//   switch (formInput.type) {
//     case "number":
//       return (
//         <Input
//           type={"number"} // Default to "text" if no type is provided
//           value={formInput.editingValue}
//           onChange={formInput.handleChange} // Update local state on input change
//           onBlur={formInput.handleBlur} // Update parent state when input loses focus
//         />
//       );
//     case "select":
//       return <SelectDropDown options={formInput.options} />;
//     default:
//       return (
//         <Input
//           type={"text"} // Default to "text" if no type is provided
//           value={formInput.editingValue}
//           onChange={formInput.handleChange} // Update local state on input change
//           onBlur={formInput.handleBlur} // Update parent state when input loses focus
//         />
//       );
//   }
// };
// export default EditableCell;
// Adjust as needed for your other input imports
import { Check, ChevronsUpDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import Select from "react-select";

// Import react-select
import { Input } from "@/components/ui";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Option } from "@/lib";
import { cn } from "@/lib/utils";

import { ColumnType } from ".";

interface EditableCellProps {
  type?: ColumnType;
  cellContext: any; // Type this based on your row data
  updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  options?: Option[]; // Options for react-select
}

const EditableCell: React.FC<EditableCellProps> = ({
  cellContext,
  updateData,
  type = ColumnType.TEXT,
  options = [],
}) => {
  const { row, column, value, getValue } = cellContext;
  const columnId = column.id;
  const rowIndex = row.index;
  const [editingValue, setEditingValue] = useState(getValue() || "");

  useEffect(() => {
    setEditingValue(getValue() || "");
  }, [getValue]);

  // Handle blur event
  const handleBlur = () => {
    if (editingValue !== value) {
      updateData(rowIndex, columnId, editingValue);
    }
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    setEditingValue(e.target ? e.target.value : e.value); // Handle value for select
  };

  return (
    <InputSwitch
      type={type}
      editingValue={editingValue}
      handleChange={handleChange}
      handleBlur={handleBlur}
      options={options}
    />
  );
};

const InputSwitch = ({
  type,
  editingValue,
  handleChange,
  handleBlur,
  options,
}: {
  type: ColumnType;
  editingValue: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement> | any) => void;
  handleBlur: () => void;
  options?: { label: string; value: string }[];
}) => {
  switch (type) {
    case "number":
      return (
        <Input
          type="number"
          value={editingValue}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      );
    case "select":
      return (
        <Select
          value={options?.find((option) => option.value === editingValue)} // Set value based on current state
          options={options} // Pass options for dropdown
          onChange={(option) => handleChange(option)} // Update state on selection
          onBlur={handleBlur}
          isClearable
        />
      );
    case "combobox":
      return <SelectComboBox />;
    default:
      return (
        <Input
          type="text"
          value={editingValue}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      );
  }
};

export default EditableCell;

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export function SelectComboBox() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
