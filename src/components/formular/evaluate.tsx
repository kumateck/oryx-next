"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const operators = ["+", "-", "*", "/", "%", "^", "sqrt", "abs", "log", "exp"];
const parentheses = ["(", ")"];

export default function FormularBuilder() {
  const [expressionParts, setExpressionParts] = useState<string[]>([]);
  const [valueMap, setValueMap] = useState<Record<string, number>>({});
  const [inputKey, setInputKey] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [inputLabel, setInputLabel] = useState(""); // New state for the label
  const [generatedFields, setGeneratedFields] = useState<
    { key: string; label: string }[]
  >([]);
  const [isReadyForValues, setIsReadyForValues] = useState(false);
  const [finalResult, setFinalResult] = useState<string | number>("");
  const [isCalculated, setIsCalculated] = useState(false);

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
    if (!inputKey || inputValue === "" || inputLabel === "") return;
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
    setIsReadyForValues(false);
    setFinalResult("");
    setIsCalculated(false);
  };

  const buildExpression = () => expressionParts.join("");

  // Replace :key placeholders with actual values
  const renderExpression = (expr: string) => {
    let rendered = expr;
    for (const key in valueMap) {
      const regex = new RegExp(`:${key}`, "g"); // Global replace for all occurrences of :key
      rendered = rendered.replace(regex, valueMap[key].toString());
    }
    return rendered;
  };

  const evaluate = (expr: string) => {
    try {
      // Evaluate the expression after replacing placeholders with actual values
      return new Function(`return ${expr}`)();
    } catch (e) {
      console.error("Evaluation Error: ", e);
      return "Invalid expression";
    }
  };

  const rawExpression = buildExpression();
  let preview = "";
  try {
    preview = renderExpression(rawExpression); // Render preview with actual values
  } catch (e) {
    console.log(e);
    preview = "Invalid preview";
  }

  const extractOperands = () => {
    const operands = rawExpression.match(/:(\w+)/g);
    if (operands) {
      const uniqueOperands = [
        ...new Set(operands.map((operand) => operand.slice(1))),
      ];
      console.log(uniqueOperands);
      setIsReadyForValues(true); // Now ready to ask for user inputs
    }
  };

  const handleFieldValueChange = (key: string, value: string) => {
    setValueMap((prev) => ({
      ...prev,
      [key]: parseFloat(value),
    }));
  };

  const calculateResult = () => {
    const exprToEvaluate = renderExpression(rawExpression); // Get the rendered expression
    const evaluatedResult = evaluate(exprToEvaluate);
    setFinalResult(evaluatedResult);
    setIsCalculated(true); // Set calculated state to true
  };

  return (
    <div className="p-4 space-y-4 max-w-xl mx-auto">
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="flex gap-2 flex-wrap">
            {operators.map((op) => (
              <Button
                variant={"ghost"}
                className="border"
                key={op}
                onClick={() => addOperator(op)}
              >
                {op}
              </Button>
            ))}

            {parentheses.map((p) => (
              <Button
                variant="ghost"
                className="border"
                key={p}
                onClick={() => addParenthesis(p)}
              >
                {p}
              </Button>
            ))}
            <Button variant="destructive" onClick={resetBuilder}>
              Reset
            </Button>
          </div>

          {/* Operand and label input section */}
          <div className="flex gap-2">
            <Input
              placeholder="Key (e.g. a)"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
            />
            <Input
              placeholder="Label (e.g. Concentration)"
              value={inputLabel}
              onChange={(e) => setInputLabel(e.target.value)}
            />
            <Input
              placeholder="Value (e.g. 5)"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button onClick={addOperand}>Add</Button>
          </div>

          <div className="text-sm">
            Raw Expression: <code>{rawExpression}</code>
          </div>
          <div className="text-sm">
            Preview: <code>{preview}</code>
          </div>
          <div className="text-sm font-bold">Result: {finalResult}</div>

          {/* Show list of generated fields with labels */}
          {isReadyForValues && (
            <div>
              <h3 className="text-lg font-medium">
                Enter values for operands:
              </h3>
              {generatedFields.map((field, idx) => (
                <div key={idx} className="flex items-center space-x-2 my-2">
                  <label className="block text-sm">
                    {field.label} ({field.key}):
                  </label>
                  <Input
                    type="number"
                    value={valueMap[field.key] || ""}
                    onChange={(e) =>
                      handleFieldValueChange(field.key, e.target.value)
                    }
                    placeholder={`Enter value for ${field.label}`}
                  />
                </div>
              ))}
              <Button
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                onClick={calculateResult}
              >
                Calculate Result
              </Button>
            </div>
          )}

          {/* New preview section for expression and result */}
          {isCalculated && (
            <div className="mt-6">
              <h3 className="text-lg font-medium">Final Expression:</h3>
              <div className="text-sm">
                <code>{rawExpression}</code>
              </div>
              <h3 className="text-lg font-medium">Final Result:</h3>
              <div className="text-sm font-bold">{finalResult}</div>
            </div>
          )}
        </CardContent>
      </Card>

      <Button
        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        onClick={extractOperands}
      >
        Generate Fields
      </Button>
    </div>
  );
}
