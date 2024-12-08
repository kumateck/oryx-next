import { Check, ChevronsUpDown } from "lucide-react";
import React, { useEffect, useState } from "react";

// Import react-select
import { Input, SelectDropDown } from "@/components/ui";
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
  extraEvents?: (rowIndex: number, value: unknown) => void;
  type?: ColumnType;
  min?: boolean;
  cellContext: any; // Type this based on your row data
  updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  options?: { label: string; value: string }[]; // Options for react-select and combobox
}

const EditableCell: React.FC<EditableCellProps> = ({
  extraEvents,
  cellContext,
  updateData,
  type = ColumnType.TEXT,
  options = [],
  min,
}) => {
  const { row, column, value, getValue } = cellContext;
  const columnId = column.id;
  const rowIndex = row.index;
  const [editingValue, setEditingValue] = useState(getValue() || "");

  const setMin = min ? getValue() : 0;
  useEffect(() => {
    setEditingValue(getValue() || "");
  }, [getValue]);

  const handleBlur = () => {
    if (editingValue !== value) {
      updateData(rowIndex, columnId, editingValue);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const value = e.target ? e.target.value : e.value;
    setEditingValue(value); // Handle value for select and combobox
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const evalue = e.target ? e.target.value : e.value;
    setEditingValue(evalue); // Handle value for select and combobox

    if (evalue !== value) {
      updateData(rowIndex, columnId, evalue);
    }
    if (extraEvents) {
      extraEvents(rowIndex, evalue);
    }
  };

  return (
    <InputSwitch
      type={type}
      editingValue={editingValue}
      handleChange={handleChange}
      handleSelectChange={handleSelectChange}
      handleBlur={handleBlur}
      options={options}
      setMin={setMin}
    />
  );
};

const InputSwitch = ({
  type,
  editingValue,
  handleChange,
  handleSelectChange,
  handleBlur,
  options,
  setMin,
}: {
  type: ColumnType;
  editingValue: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement> | any) => void;
  handleSelectChange: (e: React.ChangeEvent<HTMLInputElement> | any) => void;
  handleBlur: () => void;
  options?: { label: string; value: string }[];
  setMin?: number;
}) => {
  switch (type) {
    case ColumnType.NUMBER:
      return (
        <Input
          type="number"
          value={editingValue}
          onChange={handleChange}
          onBlur={handleBlur}
          min={setMin || 0}
        />
      );
    case ColumnType.SELECT:
      return (
        <SelectDropDown
          value={options?.find((option) => option.value === editingValue)}
          options={options}
          onChange={(option) => handleChange(option)}
          onBlur={handleBlur}
          isClearable
        />
      );
    case ColumnType.MULTI:
      return (
        <SelectDropDown
          isMulti
          value={options?.filter((option) =>
            Array.isArray(editingValue)
              ? editingValue.includes(option.value)
              : option.value === editingValue,
          )}
          options={options}
          onChange={(selectedOptions) => {
            const opts = selectedOptions as Option[];
            const values = Array.isArray(opts) && opts.map((opt) => opt.value);
            handleChange({ value: values });
          }}
          onBlur={handleBlur}
          isClearable
        />
      );
    case ColumnType.COMBOBOX:
      return (
        <SelectComboBox
          editingValue={editingValue}
          handleChange={handleSelectChange}
          options={options || []}
        />
      );
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

const SelectComboBox = ({
  editingValue,
  handleChange,
  options,
}: {
  editingValue: string;
  handleChange: (option: Option) => void;
  options: Option[];
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(editingValue);

  const handleSelect = (currentValue: string) => {
    const selectedOption = options.find(
      (option) => option.value === currentValue,
    );
    if (selectedOption) {
      handleChange(selectedOption);
      setValue(selectedOption.value);
    }
    setOpen(false);
  };

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
            ? options.find((option) => option.value === value)?.label
            : "Select..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search options..." />
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => handleSelect(option.value)}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.value ? "opacity-100" : "opacity-0",
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
};
