// TheAduseiFormular.tsx
import React, { useEffect } from "react";

import { cn } from "@/lib";
import { useExpressionBuilder } from "./use-express";
import { Input } from "../../input";
import { Button } from "../../button";
import { Icon } from "../../icon";
import { Label } from "../../label";

interface TheAduseiFormularProps {
  value?: string; // JSON string containing expression and fields
  onChange?: (value: string) => void; // Callback with JSON string
  disabled?: boolean;
}

const TheAduseiFormular: React.FC<TheAduseiFormularProps> = ({
  value = "",
  onChange,
  disabled = false,
}) => {
  const {
    inputKey,
    inputValue,
    inputLabel,
    rawExpression,
    preview,
    result,
    isSqrtActive,
    generatedFields,
    setInputKey,
    setInputValue,
    setInputLabel,
    addOperator,
    addOperand,
    addParenthesis,
    toggleSqrt,
    resetBuilder,
    removeLastPart,
    loadFromJson,
    operators,
    parentheses,
  } = useExpressionBuilder();

  // Load initial value when component mounts or value prop changes
  useEffect(() => {
    if (value && value.trim() !== "") {
      try {
        const parsed = JSON.parse(value);
        loadFromJson(parsed);
      } catch (error) {
        console.error("Failed to parse initial value:", error);
      }
    }
  }, [value, loadFromJson]);

  // Call onChange whenever expression or fields change
  useEffect(() => {
    if (onChange) {
      const outputValue = JSON.stringify({
        expression: rawExpression,
        fields: generatedFields,
      });
      onChange(outputValue);
    }
  }, [rawExpression, generatedFields, onChange]);

  return (
    <div className="space-y-3 py-5">
      <div className="grid grid-cols-5 gap-2 align-center">
        <div className="col-span-2">
          <span className="text-sm">
            Label <small className="text-danger-default"> *</small>
          </span>
          <Input
            placeholder="Enter the label"
            value={inputLabel}
            onChange={(e) => setInputLabel(e.target.value)}
            disabled={disabled}
          />
        </div>
        <div>
          <span className="text-sm">
            Key <small className="text-danger-default"> *</small>
          </span>
          <Input
            placeholder="Key"
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
            disabled={disabled}
          />
        </div>
        <div>
          <span className="text-sm">Value</span>
          <Input
            placeholder="Value"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={disabled}
          />
        </div>
        <div className="">
          <span>.</span>
          <Button
            size={"sm"}
            onClick={addOperand}
            className="w-full"
            disabled={disabled}
          >
            <Icon name="Plus" />
            <span>Add</span>
          </Button>
        </div>
      </div>

      {/* List of available operators (excluding sqrt) */}
      <div className="mt-4">
        <div className="flex gap-2">
          {operators.map((op, idx) => (
            <Button
              key={idx}
              variant={"ghost"}
              size="sm"
              onClick={() => addOperator(op)}
              className="border rounded-md px-2 py-1 text-xs bg-blue-50 text-primary-pressed"
              disabled={disabled}
            >
              {op}
            </Button>
          ))}

          {parentheses.map((p, idx) => (
            <Button
              key={idx}
              variant={"ghost"}
              size="sm"
              onClick={() => addParenthesis(p)}
              className="border rounded-md px-2 py-1 text-xs bg-blue-50 text-primary-pressed"
              disabled={disabled}
            >
              {p}
            </Button>
          ))}
          <Button
            variant={"ghost"}
            size="sm"
            onClick={toggleSqrt}
            className={cn(
              "border rounded-md px-2 py-1 text-xs bg-blue-50 text-primary-pressed",
              {
                "border-primary-default": isSqrtActive,
              },
            )}
            disabled={disabled}
          >
            sqrt {isSqrtActive ? "(close)" : ""}
          </Button>
        </div>
      </div>

      {/* Expression display */}
      <div>
        <Label>Expression</Label>
        <div className="text-sm rounded-2xl border border-neutral-200 bg-white p-2 h-8">
          <code>{rawExpression}</code>
        </div>
      </div>

      {/* Preview and result */}
      <div className="flex flex-col gap-2">
        <Label>
          Preview: <code>{preview}</code>
        </Label>
        <Label>
          Result: <code>{result}</code>
        </Label>
      </div>

      {/* Buttons to remove last part or reset */}
      <div className="flex gap-2 mt-4">
        <Button
          variant={"secondary"}
          size={"sm"}
          onClick={removeLastPart}
          className="bg-neutral-default text-white hover:text-neutral-dark"
          disabled={disabled}
        >
          <Icon name="Delete" />
          <span>Delete Last</span>
        </Button>
        <Button
          variant={"destructive"}
          size={"sm"}
          onClick={resetBuilder}
          className="bg-red-500 text-white hover:bg-red-600"
          disabled={disabled}
        >
          <Icon name="Trash2" />
          <span>Clear</span>
        </Button>
      </div>
    </div>
  );
};

export default TheAduseiFormular;
