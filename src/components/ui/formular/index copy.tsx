// import React, { useState } from "react";
// import { Input } from "../input";
// import { Label } from "../label";
// import { Button } from "../button";
// import { Icon } from "../icon";
// import { cn } from "@/lib";

// // List of basic arithmetic operators (without sqrt)
// const operators = [
//   "+",
//   "-",
//   "*",
//   "/",
//   "%",
//   "^", // No sqrt here, sqrt has its own list
// ];

// const parentheses = ["(", ")"];

// const TheAduseiFormular = () => {
//   const [expressionParts, setExpressionParts] = useState<string[]>([]);
//   const [valueMap, setValueMap] = useState<Record<string, number>>({});
//   const [inputKey, setInputKey] = useState("");
//   const [inputValue, setInputValue] = useState("");
//   const [inputLabel, setInputLabel] = useState(""); // Label input
//   const [generatedFields, setGeneratedFields] = useState<
//     { key: string; label: string }[]
//   >([]);

//   const [isSqrtOpen, setIsSqrtOpen] = useState(false); // State to track if sqrt() is open

//   const lastPart = expressionParts[expressionParts.length - 1] || "";

//   const lastPartIsOperator = () => operators.includes(lastPart.trim());
//   const lastPartIsOperand = () => /^:\w+$/.test(lastPart); // Updated regex to handle full keys
//   const lastPartIsOpenParen = () => lastPart === "(";
//   const lastPartIsCloseParen = () => lastPart === ")";
//   const lastPartIsSqrt = () => lastPart.trim() === "sqrt";

//   const addOperator = (op: string) => {
//     if (expressionParts.length === 0 || lastPartIsOperator()) return;
//     setExpressionParts([...expressionParts, ` ${op} `]);
//   };

//   const addOperand = () => {
//     if (!inputKey || inputValue === "" || inputLabel === "") return; // Ensure label is present
//     const key = inputKey.trim();
//     const value = parseFloat(inputValue);
//     if (isNaN(value)) return;
//     if (expressionParts.length > 0 && lastPartIsOperand()) return;

//     setValueMap((prev) => ({ ...prev, [key]: value }));
//     setGeneratedFields([...generatedFields, { key, label: inputLabel }]); // Add both key and label to generatedFields
//     setExpressionParts([...expressionParts, `:${key}`]);
//     setInputKey("");
//     setInputValue("");
//     setInputLabel(""); // Clear the label input
//   };

//   const addParenthesis = (paren: string) => {
//     if (paren === "(") {
//       if (
//         expressionParts.length === 0 ||
//         lastPartIsOperator() ||
//         lastPartIsOpenParen()
//       ) {
//         setExpressionParts([...expressionParts, "("]);
//       }
//     } else if (paren === ")") {
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
//     setGeneratedFields([]);
//     setInputLabel("");
//   };

//   const buildExpression = () => expressionParts.join("");

//   // Fix potential syntax issues before evaluating
//   const renderExpression = (expr: string) => {
//     let rendered = expr;
//     // Replace full keys (e.g., :ddd) with their corresponding values from valueMap
//     for (const key in valueMap) {
//       const regex = new RegExp(`:${key}`, "g"); // Global replace for full key: :key
//       rendered = rendered.replace(regex, valueMap[key].toString());
//     }
//     // Remove any unwanted characters like multiple spaces
//     rendered = rendered.replace(/\s+/g, " ").trim();
//     // Replace sqrt() with Math.sqrt() for correct evaluation
//     rendered = rendered.replace(/sqrt\(/g, "Math.sqrt(");
//     return rendered;
//   };

//   const evaluate = (expr: string) => {
//     try {
//       // Evaluate the expression after replacing placeholders with actual values
//       const fixedExpr = renderExpression(expr); // Ensure expression is valid
//       return new Function(`return ${fixedExpr}`)(); // Now sqrt() is handled correctly as Math.sqrt()
//     } catch (e) {
//       console.error("Evaluation Error: ", e);
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

//   const removeLastPart = () => {
//     if (expressionParts.length === 0) return;
//     const newExpressionParts = [...expressionParts];
//     const last = newExpressionParts.pop()!;
//     setExpressionParts(newExpressionParts);

//     // If the removed part was an operand, also remove it from valueMap and generatedFields
//     if (/^:\w+$/.test(last)) {
//       const key = last.slice(1);
//       setValueMap((prev) => {
//         const newValueMap = { ...prev };
//         delete newValueMap[key];
//         return newValueMap;
//       });
//       setGeneratedFields((prev) => prev.filter((field) => field.key !== key));
//     }
//   };

//   // Handle clicking on sqrt to toggle between open and close state
//   const toggleSqrt = () => {
//     if (isSqrtOpen) {
//       // Close sqrt by adding the closing parenthesis
//       setExpressionParts([...expressionParts, ")"]);
//     } else {
//       // Open sqrt by adding the function and an opening parenthesis
//       setExpressionParts([...expressionParts, "sqrt("]);
//     }
//     setIsSqrtOpen(!isSqrtOpen); // Toggle the open/close state
//   };

//   return (
//     <div className="space-y-3 py-5">
//       <div className="grid grid-cols-5 gap-2 align-center">
//         <div className="col-span-2">
//           <span className="text-sm">
//             Label <small className="text-danger-default"> *</small>
//           </span>
//           <Input
//             placeholder="Enter the label"
//             value={inputLabel}
//             onChange={(e) => setInputLabel(e.target.value)}
//           />
//         </div>
//         <div>
//           <span className="text-sm">
//             Key <small className="text-danger-default"> *</small>
//           </span>
//           <Input
//             placeholder="Key"
//             value={inputKey}
//             onChange={(e) => setInputKey(e.target.value)}
//           />
//         </div>
//         <div>
//           <span className="text-sm">Value</span>
//           <Input
//             placeholder="Value"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//           />
//         </div>
//         <div className="">
//           <span>.</span>
//           <Button size={"sm"} onClick={addOperand} className="w-full">
//             <Icon name="Plus" />
//             <span>Add</span>
//           </Button>
//         </div>
//       </div>

//       {/* List of available operators (excluding sqrt) */}
//       <div className="mt-4">
//         <Label>Arithmetic Operators</Label>
//         <div className="flex gap-2">
//           {operators.map((op, idx) => (
//             <Button
//               key={idx}
//               variant={"ghost"}
//               size="sm"
//               onClick={() => addOperator(op)}
//               className="border rounded-md px-2 py-1 text-xs bg-blue-50 text-primary-pressed"
//             >
//               {op}
//             </Button>
//           ))}
//         </div>
//       </div>

//       {/* Separate button for sqrt */}
//       <div className="mt-4">
//         <Button
//           variant={"ghost"}
//           size="sm"
//           onClick={toggleSqrt}
//           className={cn(
//             "border rounded-md px-2 py-1 text-xs bg-blue-50 text-primary-pressed",
//             {
//               "border-primary-default": isSqrtOpen,
//             },
//           )}
//         >
//           sqrt
//         </Button>
//       </div>

//       {/* List of parentheses */}
//       <div className="mt-4">
//         <Label>Parentheses</Label>
//         <div className="flex gap-2">
//           {parentheses.map((p, idx) => (
//             <Button
//               key={idx}
//               variant={"ghost"}
//               size="sm"
//               onClick={() => addParenthesis(p)}
//               className="border rounded-md px-2 py-1 text-xs bg-blue-50 text-primary-pressed"
//             >
//               {p}
//             </Button>
//           ))}
//         </div>
//       </div>

//       {/* Expression display */}
//       <div>
//         <Label>Expression</Label>
//         <div className="text-sm rounded-2xl border border-neutral-200 bg-white p-2 h-8">
//           <code>{rawExpression}</code>
//         </div>
//       </div>

//       {/* Preview and result */}
//       <div className="flex flex-col gap-2">
//         <Label>
//           Preview: <code>{preview}</code>
//         </Label>
//         <Label>
//           Result: <code>{result}</code>
//         </Label>
//       </div>

//       {/* Buttons to remove last part or reset */}
//       <div className="flex gap-2 mt-4">
//         <Button
//           variant={"secondary"}
//           size={"sm"}
//           onClick={removeLastPart}
//           className="bg-neutral-default text-white hover:text-neutral-dark"
//         >
//           <Icon name="Delete" />
//           <span>Delete Last</span>
//         </Button>
//         <Button
//           variant={"destructive"}
//           size={"sm"}
//           onClick={resetBuilder}
//           className="bg-red-500 text-white hover:bg-red-600"
//         >
//           <Icon name="Trash2" />
//           <span>Clear</span>
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default TheAduseiFormular;

import React, { useState } from "react";
import { Input } from "../input";
import { Label } from "../label";
import { Button } from "../button";
import { Icon } from "../icon";
import { cn } from "@/lib";

// List of basic arithmetic operators (without sqrt)
const operators = [
  "+",
  "-",
  "*",
  "/",
  "%",
  "^", // No sqrt here, sqrt has its own list
];

const parentheses = ["(", ")"];

const TheAduseiFormular = () => {
  const [expressionParts, setExpressionParts] = useState<string[]>([]);
  const [valueMap, setValueMap] = useState<Record<string, number>>({});
  const [inputKey, setInputKey] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [inputLabel, setInputLabel] = useState(""); // Label input
  const [generatedFields, setGeneratedFields] = useState<
    { key: string; label: string }[]
  >([]);

  const lastPart = expressionParts[expressionParts.length - 1] || "";

  const lastPartIsOperator = () => operators.includes(lastPart.trim());
  const lastPartIsOperand = () => /^:\w+$/.test(lastPart); // Updated regex to handle full keys
  const lastPartIsOpenParen = () => lastPart === "(";
  const lastPartIsCloseParen = () => lastPart === ")";
  const lastPartIsSqrt = () => lastPart.trim() === "sqrt(";

  // Helper function to check if there's an unclosed sqrt that can be closed
  const hasUnclosedSqrt = () => {
    const expression = expressionParts.join("");
    const sqrtCount = (expression.match(/sqrt\(/g) || []).length;
    const closeParenCount = (expression.match(/\)/g) || []).length;
    const openParenCount = (expression.match(/\(/g) || []).length;

    // If we have more sqrt( than we can account for with closing parens
    return sqrtCount > closeParenCount - (openParenCount - sqrtCount);
  };

  // Helper function to count unclosed sqrt functions
  // const getUnclosedSqrtCount = () => {
  //   const expression = expressionParts.join("");
  //   const sqrtCount = (expression.match(/sqrt\(/g) || []).length;
  //   const closeParenCount = (expression.match(/\)/g) || []).length;
  //   const openParenCount = (expression.match(/\(/g) || []).length;

  //   return Math.max(
  //     0,
  //     sqrtCount - Math.max(0, closeParenCount - (openParenCount - sqrtCount)),
  //   );
  // };

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
        lastPartIsOpenParen() ||
        lastPartIsSqrt()
      ) {
        setExpressionParts([...expressionParts, "("]);
      }
    } else if (paren === ")") {
      if (lastPartIsOperand() || lastPartIsCloseParen()) {
        setExpressionParts([...expressionParts, ")"]);
      }
    }
  };

  // Toggle sqrt function - open or close based on current state
  const toggleSqrt = () => {
    if (hasUnclosedSqrt() && (lastPartIsOperand() || lastPartIsCloseParen())) {
      // If there's an unclosed sqrt and we can close it (last part is operand or closing paren)
      setExpressionParts([...expressionParts, ")"]);
    } else if (
      // Can add sqrt if:
      expressionParts.length === 0 ||
      lastPartIsOperator() ||
      lastPartIsOpenParen() ||
      lastPartIsSqrt()
    ) {
      // Add new sqrt function
      setExpressionParts([...expressionParts, "sqrt("]);
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
    // Replace full keys (e.g., :ddd) with their corresponding values from valueMap
    for (const key in valueMap) {
      const regex = new RegExp(`:${key}`, "g"); // Global replace for full key: :key
      rendered = rendered.replace(regex, valueMap[key].toString());
    }
    // Remove any unwanted characters like multiple spaces
    rendered = rendered.replace(/\s+/g, " ").trim();
    // Replace sqrt( with Math.sqrt( for correct evaluation
    rendered = rendered.replace(/sqrt\(/g, "Math.sqrt(");
    // Handle exponentiation operator ^ to **
    rendered = rendered.replace(/\^/g, "**");
    return rendered;
  };

  const evaluate = (expr: string) => {
    try {
      // Evaluate the expression after replacing placeholders with actual values
      const fixedExpr = renderExpression(expr);

      // Basic validation - check for balanced parentheses
      const openParens = (fixedExpr.match(/\(/g) || []).length;
      const closeParens = (fixedExpr.match(/\)/g) || []).length;

      if (openParens !== closeParens) {
        return "Unbalanced parentheses";
      }

      // Check for empty Math.sqrt()
      if (fixedExpr.includes("Math.sqrt()")) {
        return "Empty sqrt function";
      }

      const result = new Function(`return ${fixedExpr}`)();
      return typeof result === "number" && !isNaN(result)
        ? result
        : "Invalid result";
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
    result = evaluate(rawExpression);
  } catch (e) {
    console.log(e);
    preview = "Invalid preview";
    result = "N/A";
  }

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

  // const unclosedSqrtCount = getUnclosedSqrtCount();
  const isSqrtActive = hasUnclosedSqrt();

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
        <div className="">
          <span>.</span>
          <Button size={"sm"} onClick={addOperand} className="w-full">
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
        >
          <Icon name="Delete" />
          <span>Delete Last</span>
        </Button>
        <Button
          variant={"destructive"}
          size={"sm"}
          onClick={resetBuilder}
          className="bg-red-500 text-white hover:bg-red-600"
        >
          <Icon name="Trash2" />
          <span>Clear</span>
        </Button>
      </div>
    </div>
  );
};

export default TheAduseiFormular;
