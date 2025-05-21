// // components/TestTemplateBuilder.tsx

// "use client";
// import React, { useState } from "react";
// import { Button } from "../ui";

// interface Variable {
//   key: string;
//   value: string;
// }

// const TestTemplateBuilder: React.FC = () => {
//   const [testName, setTestName] = useState("");
//   const [outputLabel, setOutputLabel] = useState("");
//   const [formula, setFormula] = useState("");
//   const [variables, setVariables] = useState<Variable[]>([]);

//   const handleAddVariable = () => {
//     setVariables([...variables, { key: "", value: "" }]);
//   };

//   const handleVariableChange = (
//     index: number,
//     field: "key" | "value",
//     value: string,
//   ) => {
//     const updated = [...variables];
//     updated[index][field] = value;
//     setVariables(updated);
//   };

//   const handleSave = () => {
//     const template = {
//       testName,
//       outputLabel,
//       formula,
//       variables,
//     };
//     console.log("Saved Template:", template);
//     alert("Test saved to console log!");
//   };

//   const handleOperationClicked = (operation: string) => {
//     setFormula((prevFormula) => prevFormula + " :" + operation);
//   };

//   const handleSubmitFormular = () => {
//     // evaluateExpressionWithOperator
//   };
//   return (
//     <div className="max-w-md mx-auto p-4 border rounded shadow space-y-4 bg-white">
//       <h2 className="text-xl font-semibold">Add Test Template</h2>

//       <div>
//         <label className="block text-sm font-medium">Test Name:</label>
//         <input
//           type="text"
//           className="w-full p-2 border rounded"
//           value={testName}
//           onChange={(e) => setTestName(e.target.value)}
//           placeholder="Assay: UV"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium">
//           Formula Label: {formula}
//         </label>
//         <ul className="flex gap-2 items-center flex-wrap">
//           {MathOperatorsButtons?.map((item, idx) => (
//             <li key={idx}>
//               <Button
//                 className="border"
//                 variant={"ghost"}
//                 onClick={() => handleOperationClicked(item.key)}
//               >
//                 {item.label}
//               </Button>
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div>
//         <label className="block text-sm font-medium">Variables:</label>
//         {variables.map((v, i) => (
//           <div key={i} className="flex items-center space-x-2 my-1">
//             <input
//               type="text"
//               className="w-1/3 p-2 border rounded"
//               value={v.key}
//               placeholder="Key"
//               onChange={(e) => handleVariableChange(i, "key", e.target.value)}
//             />
//             <span>→</span>
//             <input
//               type="text"
//               className="w-2/3 p-2 border rounded"
//               value={v.value}
//               placeholder="Value or Label"
//               onChange={(e) => handleVariableChange(i, "value", e.target.value)}
//             />
//           </div>
//         ))}
//         <button
//           className="mt-2 text-sm text-blue-600 hover:underline"
//           onClick={handleAddVariable}
//         >
//           + Add Variable
//         </button>
//       </div>

//       <div>
//         <label className="block text-sm font-medium">Formula:</label>
//         <input
//           type="text"
//           className="w-full p-2 border rounded"
//           value={formula}
//           onChange={(e) => setFormula(e.target.value)}
//           placeholder="(avg_abs / A1) * (dil / wt) * (cut / claim) * 100"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium">Output Label:</label>
//         <input
//           type="text"
//           className="w-full p-2 border rounded"
//           value={outputLabel}
//           onChange={(e) => setOutputLabel(e.target.value)}
//           placeholder="Assay Result (%)"
//         />
//       </div>

//       <button
//         className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
//         onClick={handleSave}
//       >
//         Save Test
//       </button>
//     </div>
//   );
// };

// export default TestTemplateBuilder;

// const MathOperatorsButtons = [
//   {
//     label: "(",
//     value: "(",
//     key: "open_p",
//   },
//   {
//     label: ")",
//     value: ")",
//     key: "close_p",
//   },
//   {
//     label: "+",
//     value: "+",
//     key: "plus",
//   },
//   {
//     label: "-",
//     value: "-",
//     key: "minus",
//   },
//   {
//     label: "*",
//     value: "*",
//     key: "times",
//   },
//   {
//     label: "/",
//     value: "/",
//     key: "over",
//   },
//   {
//     label: "%",
//     value: "%",
//     key: "percent",
//   },
//   {
//     label: "^",
//     value: "^",
//     key: "power",
//   },
//   {
//     label: "sqrt",
//     value: "sqrt",
//     key: "sqrt",
//   },
//   {
//     label: "abs",
//     value: "abs",
//     key: "abs",
//   },
//   {
//     label: "log",
//     value: "log",
//     key: "log",
//   },
//   {
//     label: "exp",
//     value: "exp",
//     key: "exp",
//   },
//   {
//     label: "sin",
//     value: "sin",
//     key: "sin",
//   },
//   {
//     label: "cos",
//     value: "cos",
//     key: "cos",
//   },
//   {
//     label: "tan",
//     value: "tan",
//     key: "tan",
//   },
// ];
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const operators = ["+", "-", "*", "/", "%", "^", "sqrt", "abs", "log", "exp"];
const parentheses = ["(", ")"];

export default function ExpressionBuilder() {
  const [expressionParts, setExpressionParts] = useState<string[]>([]);
  const [valueMap, setValueMap] = useState<Record<string, number>>({});
  const [inputKey, setInputKey] = useState("");
  const [inputValue, setInputValue] = useState("");
  const lastPart = expressionParts[expressionParts.length - 1] || "";

  const lastPartIsOperator = () => {
    const last = expressionParts[expressionParts.length - 1];
    return operators.includes(last.trim());
  };

  const lastPartIsOperand = () => {
    const last = expressionParts[expressionParts.length - 1];
    return /^:\w+$/.test(last);
  };
  const lastPartIsOpenParen = () => lastPart === "(";
  const lastPartIsCloseParen = () => lastPart === ")";
  const addOperator = (op: string) => {
    if (expressionParts.length === 0 || lastPartIsOperator()) return;
    setExpressionParts([...expressionParts, ` ${op} `]);
  };

  const addOperand = () => {
    if (!inputKey || inputValue === "") return;
    const key = inputKey.trim();
    const value = parseFloat(inputValue);
    if (isNaN(value)) return;
    if (expressionParts.length > 0 && lastPartIsOperand()) return;

    setValueMap((prev) => ({ ...prev, [key]: value }));
    setExpressionParts([...expressionParts, `:${key}`]);
    setInputKey("");
    setInputValue("");
  };
  const addParenthesis = (paren: string) => {
    if (paren === "(") {
      // allow '(' at start or after operator or after '('
      if (
        expressionParts.length === 0 ||
        lastPartIsOperator() ||
        lastPartIsOpenParen()
      ) {
        setExpressionParts([...expressionParts, "("]);
      }
    } else if (paren === ")") {
      // allow ')' only after operand or after ')'
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
  };

  const buildExpression = () => expressionParts.join("");

  const renderExpression = (expr: string) => {
    return expr.replace(/:(\w+)/g, (_, key) => {
      if (key in valueMap) return valueMap[key].toString();
      throw new Error(`Missing value for parameter: ${key}`);
    });
  };

  const evaluate = (expr: string) => {
    try {
      return new Function(`return ${expr}`)();
    } catch {
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
          <div className="flex gap-2">
            <Input
              placeholder="Key (e.g. a)"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
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
        </CardContent>
      </Card>
    </div>
  );
}
