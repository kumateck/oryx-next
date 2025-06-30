// // import { useCallback, useState } from "react";

// // // List of basic arithmetic operators (without sqrt)
// // const operators = ["+", "-", "*", "/", "%", "^"];
// // const parentheses = ["(", ")"];

// // export const useExpressionBuilder = () => {
// //   const [expressionParts, setExpressionParts] = useState<string[]>([]);
// //   const [valueMap, setValueMap] = useState<Record<string, number>>({});
// //   const [inputKey, setInputKey] = useState("");
// //   const [inputValue, setInputValue] = useState("");
// //   const [inputLabel, setInputLabel] = useState("");
// //   const [generatedFields, setGeneratedFields] = useState<
// //     { key: string; label: string }[]
// //   >([]);

// //   const lastPart = expressionParts[expressionParts.length - 1] || "";

// //   const lastPartIsOperator = () => operators.includes(lastPart.trim());
// //   const lastPartIsOperand = () => /^:\w+$/.test(lastPart);
// //   const lastPartIsOpenParen = () => lastPart === "(";
// //   const lastPartIsCloseParen = () => lastPart === ")";
// //   const lastPartIsSqrt = () => lastPart.trim() === "sqrt(";

// //   const hasUnclosedSqrt = () => {
// //     const expression = expressionParts.join("");
// //     const sqrtCount = (expression.match(/sqrt\(/g) || []).length;
// //     const closeParenCount = (expression.match(/\)/g) || []).length;
// //     const openParenCount = (expression.match(/\(/g) || []).length;
// //     return sqrtCount > closeParenCount - (openParenCount - sqrtCount);
// //   };

// //   const getUnclosedSqrtCount = () => {
// //     const expression = expressionParts.join("");
// //     const sqrtCount = (expression.match(/sqrt\(/g) || []).length;
// //     const closeParenCount = (expression.match(/\)/g) || []).length;
// //     const openParenCount = (expression.match(/\(/g) || []).length;
// //     return Math.max(
// //       0,
// //       sqrtCount - Math.max(0, closeParenCount - (openParenCount - sqrtCount)),
// //     );
// //   };

// //   const addOperator = (op: string) => {
// //     if (expressionParts.length === 0 || lastPartIsOperator()) return;
// //     setExpressionParts([...expressionParts, ` ${op} `]);
// //   };

// //   const addOperand = () => {
// //     if (!inputKey || inputValue === "" || inputLabel === "") return;
// //     const key = inputKey.trim();
// //     const value = parseFloat(inputValue);
// //     if (isNaN(value)) return;
// //     if (expressionParts.length > 0 && lastPartIsOperand()) return;

// //     setValueMap((prev) => ({ ...prev, [key]: value }));
// //     setGeneratedFields([...generatedFields, { key, label: inputLabel }]);
// //     setExpressionParts([...expressionParts, `:${key}`]);
// //     setInputKey("");
// //     setInputValue("");
// //     setInputLabel("");
// //   };

// //   const addParenthesis = (paren: string) => {
// //     if (paren === "(") {
// //       if (
// //         expressionParts.length === 0 ||
// //         lastPartIsOperator() ||
// //         lastPartIsOpenParen() ||
// //         lastPartIsSqrt()
// //       ) {
// //         setExpressionParts([...expressionParts, "("]);
// //       }
// //     } else if (paren === ")") {
// //       if (lastPartIsOperand() || lastPartIsCloseParen()) {
// //         setExpressionParts([...expressionParts, ")"]);
// //       }
// //     }
// //   };

// //   const toggleSqrt = () => {
// //     if (hasUnclosedSqrt() && (lastPartIsOperand() || lastPartIsCloseParen())) {
// //       setExpressionParts([...expressionParts, ")"]);
// //     } else if (
// //       expressionParts.length === 0 ||
// //       lastPartIsOperator() ||
// //       lastPartIsOpenParen() ||
// //       lastPartIsSqrt()
// //     ) {
// //       setExpressionParts([...expressionParts, "sqrt("]);
// //     }
// //   };

// //   const resetBuilder = () => {
// //     setExpressionParts([]);
// //     setValueMap({});
// //     setInputKey("");
// //     setInputValue("");
// //     setGeneratedFields([]);
// //     setInputLabel("");
// //   };

// //   const loadFromJson = useCallback(
// //     (data: {
// //       expression?: string;
// //       fields?: { key: string; label: string; value?: number }[];
// //     }) => {
// //       if (data.expression && data.fields) {
// //         // Parse the expression back into parts
// //         const parts = data.expression
// //           .split(/(\s[\+\-\*\/\%\^]\s|sqrt\(|\(|\)|:\w+)/g)
// //           .filter((part) => part !== "");
// //         setExpressionParts(parts);

// //         // Rebuild valueMap from fields with their actual values
// //         const newValueMap: Record<string, number> = {};
// //         const fieldsWithoutValues: { key: string; label: string }[] = [];

// //         data.fields.forEach((field) => {
// //           newValueMap[field.key] = field.value || 0;
// //           fieldsWithoutValues.push({ key: field.key, label: field.label });
// //         });

// //         setValueMap(newValueMap);
// //         setGeneratedFields(fieldsWithoutValues);
// //       }
// //     },
// //     [],
// //   );

// //   const buildExpression = () => expressionParts.join("");

// //   const renderExpression = (expr: string) => {
// //     let rendered = expr;
// //     for (const key in valueMap) {
// //       const regex = new RegExp(`:${key}`, "g");
// //       rendered = rendered.replace(regex, valueMap[key].toString());
// //     }
// //     rendered = rendered.replace(/\s+/g, " ").trim();
// //     rendered = rendered.replace(/sqrt\(/g, "Math.sqrt(");
// //     rendered = rendered.replace(/\^/g, "**");
// //     return rendered;
// //   };

// //   const evaluate = (expr: string) => {
// //     try {
// //       const fixedExpr = renderExpression(expr);
// //       const openParens = (fixedExpr.match(/\(/g) || []).length;
// //       const closeParens = (fixedExpr.match(/\)/g) || []).length;

// //       if (openParens !== closeParens) {
// //         return "Unbalanced parentheses";
// //       }

// //       if (fixedExpr.includes("Math.sqrt()")) {
// //         return "Empty sqrt function";
// //       }

// //       const result = new Function(`return ${fixedExpr}`)();
// //       return typeof result === "number" && !isNaN(result)
// //         ? result
// //         : "Invalid result";
// //     } catch (e) {
// //       console.error("Evaluation Error: ", e);
// //       return "Invalid expression";
// //     }
// //   };

// //   const removeLastPart = () => {
// //     if (expressionParts.length === 0) return;
// //     const newExpressionParts = [...expressionParts];
// //     const last = newExpressionParts.pop()!;
// //     setExpressionParts(newExpressionParts);

// //     if (/^:\w+$/.test(last)) {
// //       const key = last.slice(1);
// //       setValueMap((prev) => {
// //         const newValueMap = { ...prev };
// //         delete newValueMap[key];
// //         return newValueMap;
// //       });
// //       setGeneratedFields((prev) => prev.filter((field) => field.key !== key));
// //     }
// //   };

// //   // Computed values
// //   const rawExpression = buildExpression();
// //   let preview = "";
// //   let result: string | number = "";

// //   try {
// //     preview = renderExpression(rawExpression);
// //     result = evaluate(rawExpression);
// //   } catch (e) {
// //     console.log(e);
// //     preview = "Invalid preview";
// //     result = "N/A";
// //   }

// //   const unclosedSqrtCount = getUnclosedSqrtCount();
// //   const isSqrtActive = hasUnclosedSqrt();

// //   return {
// //     // State
// //     inputKey,
// //     inputValue,
// //     inputLabel,
// //     generatedFields,
// //     rawExpression,
// //     preview,
// //     result,
// //     isSqrtActive,
// //     unclosedSqrtCount,

// //     // State setters
// //     setInputKey,
// //     setInputValue,
// //     setInputLabel,

// //     // Actions
// //     addOperator,
// //     addOperand,
// //     addParenthesis,
// //     toggleSqrt,
// //     resetBuilder,
// //     removeLastPart,
// //     loadFromJson,

// //     // Constants
// //     operators,
// //     parentheses,
// //   };
// // };

// import { useCallback, useState } from "react";
// import { toast } from "sonner";

// // List of basic arithmetic operators (without sqrt)
// const operators = ["+", "-", "*", "/", "%", "^"];
// const parentheses = ["(", ")"];

// export const useExpressionBuilder = () => {
//   const [expressionParts, setExpressionParts] = useState<string[]>([]);
//   const [valueMap, setValueMap] = useState<Record<string, number>>({});
//   const [inputKey, setInputKey] = useState("");
//   const [inputValue, setInputValue] = useState("");
//   const [inputLabel, setInputLabel] = useState("");
//   const [generatedFields, setGeneratedFields] = useState<
//     { key: string; label: string }[]
//   >([]);

//   const lastPart = expressionParts[expressionParts.length - 1] || "";

//   const lastPartIsOperator = () => operators.includes(lastPart.trim());
//   const lastPartIsOperand = () => /^:\w+$/.test(lastPart);
//   const lastPartIsOpenParen = () => lastPart === "(";
//   const lastPartIsCloseParen = () => lastPart === ")";
//   const lastPartIsSqrt = () => lastPart.trim() === "sqrt(";

//   const hasUnclosedSqrt = () => {
//     const expression = expressionParts.join("");
//     const sqrtCount = (expression.match(/sqrt\(/g) || []).length;
//     const closeParenCount = (expression.match(/\)/g) || []).length;
//     const openParenCount = (expression.match(/\(/g) || []).length;
//     return sqrtCount > closeParenCount - (openParenCount - sqrtCount);
//   };

//   const getUnclosedSqrtCount = () => {
//     const expression = expressionParts.join("");
//     const sqrtCount = (expression.match(/sqrt\(/g) || []).length;
//     const closeParenCount = (expression.match(/\)/g) || []).length;
//     const openParenCount = (expression.match(/\(/g) || []).length;
//     return Math.max(
//       0,
//       sqrtCount - Math.max(0, closeParenCount - (openParenCount - sqrtCount)),
//     );
//   };

//   // Check if there are unclosed parentheses (excluding sqrt)
//   const hasUnclosedParentheses = () => {
//     const expression = expressionParts.join("");
//     const openParenCount = (expression.match(/\(/g) || []).length;
//     const closeParenCount = (expression.match(/\)/g) || []).length;
//     return openParenCount > closeParenCount;
//   };

//   // Check if expression is complete (no trailing operators or incomplete structures)
//   const isExpressionComplete = () => {
//     if (expressionParts.length === 0) return false;
//     return !lastPartIsOperator() && !lastPartIsOpenParen() && !lastPartIsSqrt();
//   };

//   // Check if expression is valid for evaluation
//   const isValidForEvaluation = () => {
//     if (expressionParts.length === 0) return false;

//     // Check for trailing operators
//     if (lastPartIsOperator()) return false;

//     // Check for unclosed parentheses or sqrt
//     const expression = expressionParts.join("");
//     const openParenCount = (expression.match(/\(/g) || []).length;
//     const closeParenCount = (expression.match(/\)/g) || []).length;

//     if (openParenCount !== closeParenCount) return false;

//     // Check for incomplete sqrt functions
//     if (hasUnclosedSqrt()) return false;

//     return true;
//   };

//   const addOperator = (op: string) => {
//     if (expressionParts.length === 0 || lastPartIsOperator()) return;
//     setExpressionParts([...expressionParts, ` ${op} `]);
//   };

//   const addOperand = () => {
//     if (!inputKey || inputValue === "" || inputLabel === "") return;

//     const key = inputKey.trim();
//     const value = parseFloat(inputValue);

//     if (isNaN(value)) return;
//     if (expressionParts.length > 0 && lastPartIsOperand()) return;

//     // Check for duplicate key
//     if (valueMap.hasOwnProperty(key)) {
//       toast.error(`Key "${key}" already exists. Please use a unique key.`);
//       return;
//     }

//     setValueMap((prev) => ({ ...prev, [key]: value }));
//     setGeneratedFields([...generatedFields, { key, label: inputLabel }]);
//     setExpressionParts([...expressionParts, `:${key}`]);
//     setInputKey("");
//     setInputValue("");
//     setInputLabel("");
//   };

//   const addParenthesis = (paren: string) => {
//     if (paren === "(") {
//       if (
//         expressionParts.length === 0 ||
//         lastPartIsOperator() ||
//         lastPartIsOpenParen() ||
//         lastPartIsSqrt()
//       ) {
//         setExpressionParts([...expressionParts, "("]);
//       }
//     } else if (paren === ")") {
//       // Enhanced validation for closing parenthesis
//       if (!hasUnclosedParentheses()) {
//         toast.warning("Cannot add closing parenthesis: no matching open parenthesis found.");
//         return;
//       }

//       if (!isExpressionComplete()) {
//         toast.warning("Cannot close parenthesis: expression is incomplete.");
//         return;
//       }

//       if (lastPartIsOperand() || lastPartIsCloseParen()) {
//         setExpressionParts([...expressionParts, ")"]);
//       }
//     }
//   };

//   const toggleSqrt = () => {
//     if (hasUnclosedSqrt() && (lastPartIsOperand() || lastPartIsCloseParen())) {
//       setExpressionParts([...expressionParts, ")"]);
//     } else if (
//       expressionParts.length === 0 ||
//       lastPartIsOperator() ||
//       lastPartIsOpenParen() ||
//       lastPartIsSqrt()
//     ) {
//       setExpressionParts([...expressionParts, "sqrt("]);
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

//   const loadFromJson = useCallback(
//     (data: {
//       expression?: string;
//       fields?: { key: string; label: string; value?: number }[];
//     }) => {
//       if (data.expression && data.fields) {
//         // Parse the expression back into parts
//         const parts = data.expression
//           .split(/(\s[\+\-\*\/\%\^]\s|sqrt\(|\(|\)|:\w+)/g)
//           .filter((part) => part !== "");
//         setExpressionParts(parts);

//         // Rebuild valueMap from fields with their actual values
//         const newValueMap: Record<string, number> = {};
//         const fieldsWithoutValues: { key: string; label: string }[] = [];

//         data.fields.forEach((field) => {
//           newValueMap[field.key] = field.value || 0;
//           fieldsWithoutValues.push({ key: field.key, label: field.label });
//         });

//         setValueMap(newValueMap);
//         setGeneratedFields(fieldsWithoutValues);
//       }
//     },
//     [],
//   );

//   const buildExpression = () => expressionParts.join("");

//   const renderExpression = (expr: string) => {
//     let rendered = expr;
//     for (const key in valueMap) {
//       const regex = new RegExp(`:${key}`, "g");
//       rendered = rendered.replace(regex, valueMap[key].toString());
//     }
//     rendered = rendered.replace(/\s+/g, " ").trim();
//     rendered = rendered.replace(/sqrt\(/g, "Math.sqrt(");
//     rendered = rendered.replace(/\^/g, "**");
//     return rendered;
//   };

//   const evaluate = (expr: string) => {
//     // Don't evaluate if expression is invalid
//     if (!isValidForEvaluation()) {
//       return "Invalid expression";
//     }

//     try {
//       const fixedExpr = renderExpression(expr);
//       const openParens = (fixedExpr.match(/\(/g) || []).length;
//       const closeParens = (fixedExpr.match(/\)/g) || []).length;

//       if (openParens !== closeParens) {
//         return "Unbalanced parentheses";
//       }

//       if (fixedExpr.includes("Math.sqrt()")) {
//         return "Empty sqrt function";
//       }

//       const result = new Function(`return ${fixedExpr}`)();
//       return typeof result === "number" && !isNaN(result)
//         ? result
//         : "Invalid result";
//     } catch (e) {
//       console.error("Evaluation Error: ", e);
//       return "Invalid expression";
//     }
//   };

//   const removeLastPart = () => {
//     if (expressionParts.length === 0) return;
//     const newExpressionParts = [...expressionParts];
//     const last = newExpressionParts.pop()!;
//     setExpressionParts(newExpressionParts);

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

//   // Computed values
//   const rawExpression = buildExpression();
//   let preview = "";
//   let result: string | number = "";

//   try {
//     preview = renderExpression(rawExpression);
//     result = evaluate(rawExpression);
//   } catch (e) {
//     console.log(e);
//     preview = "Invalid preview";
//     result = "N/A";
//   }

//   const unclosedSqrtCount = getUnclosedSqrtCount();
//   const isSqrtActive = hasUnclosedSqrt();

//   return {
//     // State
//     inputKey,
//     inputValue,
//     inputLabel,
//     generatedFields,
//     rawExpression,
//     preview,
//     result,
//     isSqrtActive,
//     unclosedSqrtCount,

//     // State setters
//     setInputKey,
//     setInputValue,
//     setInputLabel,

//     // Actions
//     addOperator,
//     addOperand,
//     addParenthesis,
//     toggleSqrt,
//     resetBuilder,
//     removeLastPart,
//     loadFromJson,

//     // Validation helpers
//     isValidForEvaluation,
//     isExpressionComplete,
//     hasUnclosedParentheses,

//     // Constants
//     operators,
//     parentheses,
//   };
// };

import { useCallback, useState } from "react";
import { toast } from "sonner";

// List of basic arithmetic operators (without sqrt)
const operators = ["+", "-", "*", "/", "%", "^"];
const parentheses = ["(", ")"];

export const useExpressionBuilder = () => {
  const [expressionParts, setExpressionParts] = useState<string[]>([]);
  const [valueMap, setValueMap] = useState<Record<string, number>>({});
  const [inputKey, setInputKey] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [inputLabel, setInputLabel] = useState("");
  const [generatedFields, setGeneratedFields] = useState<
    { key: string; label: string }[]
  >([]);

  const lastPart = expressionParts[expressionParts.length - 1] || "";

  const lastPartIsOperator = () => operators.includes(lastPart.trim());
  const lastPartIsOperand = () => /^:\w+$/.test(lastPart);
  const lastPartIsOpenParen = () => lastPart === "(";
  const lastPartIsCloseParen = () => lastPart === ")";
  const lastPartIsSqrt = () => lastPart.trim() === "sqrt(";

  const hasUnclosedSqrt = () => {
    const expression = expressionParts.join("");
    const sqrtCount = (expression.match(/sqrt\(/g) || []).length;
    const closeParenCount = (expression.match(/\)/g) || []).length;
    const openParenCount = (expression.match(/\(/g) || []).length;
    return sqrtCount > closeParenCount - (openParenCount - sqrtCount);
  };

  const getUnclosedSqrtCount = () => {
    const expression = expressionParts.join("");
    const sqrtCount = (expression.match(/sqrt\(/g) || []).length;
    const closeParenCount = (expression.match(/\)/g) || []).length;
    const openParenCount = (expression.match(/\(/g) || []).length;
    return Math.max(
      0,
      sqrtCount - Math.max(0, closeParenCount - (openParenCount - sqrtCount)),
    );
  };

  // Check if there are unclosed parentheses (excluding sqrt)
  const hasUnclosedParentheses = () => {
    const expression = expressionParts.join("");
    const openParenCount = (expression.match(/\(/g) || []).length;
    const closeParenCount = (expression.match(/\)/g) || []).length;
    return openParenCount > closeParenCount;
  };

  // Check if expression is complete (no trailing operators or incomplete structures)
  const isExpressionComplete = () => {
    if (expressionParts.length === 0) return false;
    return !lastPartIsOperator() && !lastPartIsOpenParen() && !lastPartIsSqrt();
  };

  // Check if expression is valid for evaluation
  const isValidForEvaluation = () => {
    if (expressionParts.length === 0) return false;

    // Check for trailing operators
    if (lastPartIsOperator()) return false;

    // Check for unclosed parentheses or sqrt
    const expression = expressionParts.join("");
    const openParenCount = (expression.match(/\(/g) || []).length;
    const closeParenCount = (expression.match(/\)/g) || []).length;

    if (openParenCount !== closeParenCount) return false;

    // Check for incomplete sqrt functions
    if (hasUnclosedSqrt()) return false;

    return true;
  };

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

    // Check for duplicate key
    if (valueMap.hasOwnProperty(key)) {
      toast.error(`Key "${key}" already exists. Please use a unique key.`);
      return;
    }

    setValueMap((prev) => ({ ...prev, [key]: value }));
    setGeneratedFields([...generatedFields, { key, label: inputLabel }]);
    setExpressionParts([...expressionParts, `:${key}`]);
    setInputKey("");
    setInputValue("");
    setInputLabel("");
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
      // Enhanced validation for closing parenthesis
      if (!hasUnclosedParentheses()) {
        toast.warning(
          "Cannot add closing parenthesis: no matching open parenthesis found.",
        );
        return;
      }

      if (!isExpressionComplete()) {
        toast.warning("Cannot close parenthesis: expression is incomplete.");
        return;
      }

      if (lastPartIsOperand() || lastPartIsCloseParen()) {
        setExpressionParts([...expressionParts, ")"]);
      }
    }
  };

  const toggleSqrt = () => {
    if (hasUnclosedSqrt() && (lastPartIsOperand() || lastPartIsCloseParen())) {
      setExpressionParts([...expressionParts, ")"]);
    } else if (
      expressionParts.length === 0 ||
      lastPartIsOperator() ||
      lastPartIsOpenParen() ||
      lastPartIsSqrt()
    ) {
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

  const loadFromJson = useCallback(
    (data: {
      expression?: string;
      fields?: { key: string; label: string; value?: number }[];
    }) => {
      if (data.expression && data.fields) {
        // Parse the expression back into parts
        const parts = data.expression
          .split(/(\s[\+\-\*\/\%\^]\s|sqrt\(|\(|\)|:\w+)/g)
          .filter((part) => part !== "");
        setExpressionParts(parts);

        // Rebuild valueMap from fields with their actual values
        const newValueMap: Record<string, number> = {};
        const fieldsWithoutValues: { key: string; label: string }[] = [];

        data.fields.forEach((field) => {
          newValueMap[field.key] = field.value || 0;
          fieldsWithoutValues.push({ key: field.key, label: field.label });
        });

        setValueMap(newValueMap);
        setGeneratedFields(fieldsWithoutValues);
      }
    },
    [],
  );

  const buildExpression = () => expressionParts.join("");

  const renderExpression = (expr: string) => {
    let rendered = expr;
    for (const key in valueMap) {
      const regex = new RegExp(`:${key}`, "g");
      rendered = rendered.replace(regex, valueMap[key].toString());
    }
    rendered = rendered.replace(/\s+/g, " ").trim();
    rendered = rendered.replace(/sqrt\(/g, "Math.sqrt(");
    rendered = rendered.replace(/\^/g, "**");
    return rendered;
  };

  const evaluate = (expr: string) => {
    // Don't evaluate if expression is invalid
    if (!isValidForEvaluation()) {
      return "Invalid expression";
    }

    try {
      const fixedExpr = renderExpression(expr);
      const openParens = (fixedExpr.match(/\(/g) || []).length;
      const closeParens = (fixedExpr.match(/\)/g) || []).length;

      if (openParens !== closeParens) {
        return "Unbalanced parentheses";
      }

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

  const removeLastPart = () => {
    if (expressionParts.length === 0) return;
    const newExpressionParts = [...expressionParts];
    const last = newExpressionParts.pop()!;
    setExpressionParts(newExpressionParts);

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

  const generateJson = () => {
    if (!isValidForEvaluation()) {
      // toast.error("Cannot generate JSON: Expression is invalid or incomplete.");
      return "";
    }

    const fieldsWithValues = generatedFields.map((field) => ({
      key: field.key,
      label: field.label,
      value: valueMap[field.key],
    }));

    return {
      expression: rawExpression,
      fields: fieldsWithValues,
      // result: result,
    };
  };

  const exportJson = () => {
    const jsonData = generateJson();
    if (jsonData) {
      return JSON.stringify(jsonData, null, 2);
    }
    return "";
  };

  // Computed values
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

  const unclosedSqrtCount = getUnclosedSqrtCount();
  const isSqrtActive = hasUnclosedSqrt();

  return {
    // State
    inputKey,
    inputValue,
    inputLabel,
    generatedFields,
    rawExpression,
    preview,
    result,
    isSqrtActive,
    unclosedSqrtCount,

    // State setters
    setInputKey,
    setInputValue,
    setInputLabel,

    // Actions
    addOperator,
    addOperand,
    addParenthesis,
    toggleSqrt,
    resetBuilder,
    removeLastPart,
    loadFromJson,
    generateJson,
    exportJson,

    // Validation helpers
    isValidForEvaluation,
    isExpressionComplete,
    hasUnclosedParentheses,

    // Constants
    operators,
    parentheses,
  };
};
