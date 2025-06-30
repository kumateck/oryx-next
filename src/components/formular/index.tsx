"use client";

// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent } from "@/components/ui/card";

// const operators = ["+", "-", "*", "/", "%", "^", "sqrt", "abs", "log", "exp"];
// const parentheses = ["(", ")"];

// export default function ExpressionBuilder() {
//   const [expressionParts, setExpressionParts] = useState<string[]>([]);
//   const [valueMap, setValueMap] = useState<Record<string, number>>({});
//   const [inputKey, setInputKey] = useState("");
//   const [inputValue, setInputValue] = useState("");
//   const [generatedFields, setGeneratedFields] = useState<
//     { key: string; label: string }[]
//   >([]);
//   const lastPart = expressionParts[expressionParts.length - 1] || "";

//   const lastPartIsOperator = () => {
//     const last = expressionParts[expressionParts.length - 1];
//     return operators.includes(last.trim());
//   };

//   const lastPartIsOperand = () => {
//     const last = expressionParts[expressionParts.length - 1];
//     return /^:\w+$/.test(last);
//   };
//   const lastPartIsOpenParen = () => lastPart === "(";
//   const lastPartIsCloseParen = () => lastPart === ")";
//   const addOperator = (op: string) => {
//     if (expressionParts.length === 0 || lastPartIsOperator()) return;
//     setExpressionParts([...expressionParts, ` ${op} `]);
//   };

//   const addOperand = () => {
//     if (!inputKey || inputValue === "") return;
//     const key = inputKey.trim();
//     const value = parseFloat(inputValue);
//     if (isNaN(value)) return;
//     if (expressionParts.length > 0 && lastPartIsOperand()) return;

//     setValueMap((prev) => ({ ...prev, [key]: value }));
//     setExpressionParts([...expressionParts, `:${key}`]);
//     setInputKey("");
//     setInputValue("");
//   };
//   const addParenthesis = (paren: string) => {
//     if (paren === "(") {
//       // allow '(' at start or after operator or after '('
//       if (
//         expressionParts.length === 0 ||
//         lastPartIsOperator() ||
//         lastPartIsOpenParen()
//       ) {
//         setExpressionParts([...expressionParts, "("]);
//       }
//     } else if (paren === ")") {
//       // allow ')' only after operand or after ')'
//       if (lastPartIsOperand() || lastPartIsCloseParen()) {
//         setExpressionParts([...expressionParts, ")"]);
//       }
//     }
//   };
//   const resetBuilder = () => {
//     setExpressionParts([]);
//     setValueMap({});
//     setInputKey("");
//     setInputValue("");
//   };

//   const buildExpression = () => expressionParts.join("");

//   const renderExpression = (expr: string) => {
//     return expr.replace(/:(\w+)/g, (_, key) => {
//       if (key in valueMap) return valueMap[key].toString();
//       throw new Error(`Missing value for parameter: ${key}`);
//     });
//   };

//   const evaluate = (expr: string) => {
//     try {
//       return new Function(`return ${expr}`)();
//     } catch {
//       return "Invalid expression";
//     }
//   };

//   const rawExpression = buildExpression();
//   let preview = "";
//   let result: string | number = "";
//   try {
//     preview = renderExpression(rawExpression);
//     result = evaluate(preview);
//   } catch (e) {
//     console.log(e);
//     preview = "Invalid preview";
//     result = "N/A";
//   }

//   const extractOperands = () => {
//     const operands = rawExpression.match(/:(\w+)/g);
//     if (operands) {
//       const uniqueOperands = [
//         ...new Set(operands.map((operand) => operand.slice(1))),
//       ];
//       setGeneratedFields(uniqueOperands); // Set unique operands to be used for input fields
//       // setIsReadyForValues(true); // Now ready to ask for user inputs
//     }
//   };

//   console.log(rawExpression, "rawExpression");
//   console.log(expressionParts, "expressionParts");
//   console.log(valueMap, "valueMap");
//   console.log(generatedFields, "generatedFields");
//   return (
//     <div className="p-4 space-y-4 max-w-xl mx-auto">
//       <Card>
//         <CardContent className="p-4 space-y-4">
//           <div className="flex gap-2 flex-wrap">
//             {operators.map((op) => (
//               <Button
//                 variant={"ghost"}
//                 className="border"
//                 key={op}
//                 onClick={() => addOperator(op)}
//               >
//                 {op}
//               </Button>
//             ))}

//             {parentheses.map((p) => (
//               <Button
//                 variant="ghost"
//                 className="border"
//                 key={p}
//                 onClick={() => addParenthesis(p)}
//               >
//                 {p}
//               </Button>
//             ))}
//             <Button variant="destructive" onClick={resetBuilder}>
//               Reset
//             </Button>
//             <Button variant="success" onClick={extractOperands}>
//               Generate Fields
//             </Button>
//           </div>
//           <div className="flex gap-2">
//             <Input
//               placeholder="Key (e.g. a)"
//               value={inputKey}
//               onChange={(e) => setInputKey(e.target.value)}
//             />
//             <Input
//               placeholder="Value (e.g. 5)"
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//             />
//             <Button onClick={addOperand}>Add</Button>
//           </div>
//           <div className="text-sm">
//             Raw Expression: <code>{rawExpression}</code>
//           </div>
//           <div className="text-sm">
//             Preview: <code>{preview}</code>
//           </div>
//           <div className="text-sm font-bold">Result: {result}</div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
// import FormularBuilder from "./evaluate";

const operators = ["+", "-", "*", "/", "%", "^", "sqrt", "abs", "log", "exp"];
const parentheses = ["(", ")"];

export default function ExpressionBuilder() {
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

  const extractOperands = () => {
    const operands = rawExpression.match(/:(\w+)/g);
    if (operands) {
      const uniqueOperands = [
        ...new Set(operands.map((operand) => operand.slice(1))),
      ];
      console.log(uniqueOperands);
      // setIsReadyForValues(true); // Now ready to ask for user inputs
    }
  };

  // console.log(rawExpression, generatedFields);
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
            <Button variant="success" onClick={extractOperands}>
              Generate Fields
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
          <div className="text-sm font-bold">Result: {result}</div>

          {/* Display generated fields with labels */}
          <div className="mt-4">
            <h3 className="font-medium">Operands with Labels:</h3>
            {generatedFields.map((field, idx) => (
              <div key={idx} className="flex items-center space-x-2 my-2">
                <span className="text-sm font-semibold">{field.label}:</span>
                <code className="text-sm">:{field.key}</code>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
