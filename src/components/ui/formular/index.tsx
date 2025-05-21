import React, { useState } from "react";
import { Input } from "../input";
import { Label } from "../label";
import { Button } from "../button";
import { Icon } from "../icon";
const operators = ["+", "-", "*", "/", "%", "^", "sqrt", "abs", "log", "exp"];
const parentheses = ["(", ")"];
const TheAduseiFormular = () => {
  const [expressionParts, setExpressionParts] = useState<string[]>([]);
  const [valueMap, setValueMap] = useState<Record<string, number>>({});
  const [inputKey, setInputKey] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [inputLabel, setInputLabel] = useState(""); // New state for the label input
  const [generatedFields, setGeneratedFields] = useState<
    { key: string; label: string }[]
  >([]);
  const lastPart = expressionParts[expressionParts.length - 1] || "";

  const lastPartIsOperator = () => operators.includes(lastPart.trim());
  const lastPartIsOperand = () => /^:\w+$/.test(lastPart);
  const lastPartIsOpenParen = () => lastPart === "(";
  const lastPartIsCloseParen = () => lastPart === ")";

  const addOperator = (op: string) => {
    if (expressionParts.length === 0 || lastPartIsOperator()) return;
    setExpressionParts([...expressionParts, ` ${op} `]);
  };

  const addOperand = () => {
    if (!inputKey || inputValue === "" || inputLabel === "") return; // Ensure label is present
    const key = inputKey.trim();
    const value = parseFloat(inputValue);
    if (isNaN(value)) return;
    if (expressionParts.length > 0 && lastPartIsOperand()) return;

    setValueMap((prev) => ({ ...prev, [key]: value }));
    setGeneratedFields([...generatedFields, { key, label: inputLabel }]); // Add both key and label to generatedFields
    setExpressionParts([...expressionParts, `:${key}`]);
    setInputKey("");
    setInputValue("");
    setInputLabel(""); // Clear the label input
  };

  const addParenthesis = (paren: string) => {
    if (paren === "(") {
      if (
        expressionParts.length === 0 ||
        lastPartIsOperator() ||
        lastPartIsOpenParen()
      ) {
        setExpressionParts([...expressionParts, "("]);
      }
    } else if (paren === ")") {
      if (lastPartIsOperand() || lastPartIsCloseParen()) {
        setExpressionParts([...expressionParts, ")"]);
      }
    }
  };

  const resetBuilder = () => {
    setExpressionParts([]);
    setValueMap({});
    setInputKey("");
    setInputValue("");
    setGeneratedFields([]);
    setInputLabel("");
  };

  const buildExpression = () => expressionParts.join("");

  // Fix potential syntax issues before evaluating
  const renderExpression = (expr: string) => {
    let rendered = expr;
    for (const key in valueMap) {
      const regex = new RegExp(`:${key}`, "g"); // Global replace for all occurrences of :key
      rendered = rendered.replace(regex, valueMap[key].toString());
    }
    // Remove any unwanted characters like multiple spaces
    rendered = rendered.replace(/\s+/g, " ").trim();
    return rendered;
  };

  const evaluate = (expr: string) => {
    try {
      // Evaluate the expression after replacing placeholders with actual values
      const fixedExpr = renderExpression(expr); // Ensure expression is valid
      return new Function(`return ${fixedExpr}`)();
    } catch (e) {
      console.error("Evaluation Error: ", e);
      return "Invalid expression";
    }
  };

  const rawExpression = buildExpression();
  let preview = "";
  let result: string | number = "";
  try {
    preview = renderExpression(rawExpression);
    result = evaluate(preview);
  } catch (e) {
    console.log(e);
    preview = "Invalid preview";
    result = "N/A";
  }

  // const extractOperands = () => {
  //   const operands = rawExpression.match(/:(\w+)/g);
  //   if (operands) {
  //     const uniqueOperands = [
  //       ...new Set(operands.map((operand) => operand.slice(1))),
  //     ];
  //     // setIsReadyForValues(true); // Now ready to ask for user inputs
  //   }
  // };
  const removeLastPart = () => {
    if (expressionParts.length === 0) return;
    const newExpressionParts = [...expressionParts];
    const last = newExpressionParts.pop()!;
    setExpressionParts(newExpressionParts);

    // If the removed part was an operand, also remove it from valueMap and generatedFields
    if (/^:\w+$/.test(last)) {
      const key = last.slice(1);
      setValueMap((prev) => {
        const newValueMap = { ...prev };
        delete newValueMap[key];
        return newValueMap;
      });
      setGeneratedFields((prev) => prev.filter((field) => field.key !== key));
    }
  };
  return (
    <div className="space-y-3 py-5">
      <div className="grid grid-cols-4 gap-2 ">
        <div className="col-span-2">
          <span className="text-sm">
            Label <small className="text-danger-default"> *</small>
          </span>
          <Input
            placeholder="Enter the label"
            value={inputLabel}
            onChange={(e) => setInputLabel(e.target.value)}
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
          />
        </div>
        <div>
          <span className="text-sm">Value</span>
          <Input
            placeholder="Value"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
      </div>
      <div>
        <Label>Arithmetic Operators</Label>
        <div className="flex itecems-center gap-2">
          <ul className="flex gap-2 items-center">
            {operators.map((op, idx) => (
              <li key={idx}>
                <button
                  onClick={() => addOperator(op)}
                  className="border rounded-md px-2 py-1 bg-blue-50 text-primary-pressed text-xs border-primary-default"
                >
                  {op}
                </button>
              </li>
            ))}
          </ul>
          <ul className="flex gap-2 items-center">
            {parentheses.map((op, idx) => (
              <li key={idx}>
                <button
                  onClick={() => addParenthesis(op)}
                  className="border rounded-md px-2 py-1 bg-blue-50 text-primary-pressed text-xs border-primary-default"
                >
                  {op}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between gap-2 items-end">
          <Label>Expression</Label>
          <ul className="flex gap-2">
            <Button size={"sm"} onClick={addOperand}>
              <Icon name="Plus" />
              <span>Add</span>
            </Button>
            <Button variant={"secondary"} size={"sm"} onClick={removeLastPart}>
              <Icon name="Delete" />
              <span>Delete</span>
            </Button>
            <Button variant={"destructive"} size={"sm"} onClick={resetBuilder}>
              <Icon name="Trash2" />
              <span>Clear</span>
            </Button>
          </ul>
        </div>
        <div className="text-sm rounded-2xl border border-neutral-200 bg-white p-2">
          <code>{rawExpression}</code>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label>
          Preview: <code>{preview}</code>
        </Label>
        <Label>
          Result: <code>{result}</code>
        </Label>
      </div>
    </div>
  );
};

export default TheAduseiFormular;
