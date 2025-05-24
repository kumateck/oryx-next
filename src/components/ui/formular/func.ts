// Fix potential syntax issues before evaluating
export const renderExpression = (
  expr: string,
  valueMap: Record<string, number>,
) => {
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

export const evaluate = (expr: string, valueMap: Record<string, number>) => {
  try {
    // Evaluate the expression after replacing placeholders with actual values
    const fixedExpr = renderExpression(expr, valueMap);

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

// Helper function to check if there's an unclosed sqrt that can be closed

export const hasUnclosedSqrt = (expressionParts: string[]) => {
  const expression = expressionParts.join("");
  const sqrtCount = (expression.match(/sqrt\(/g) || []).length;
  const closeParenCount = (expression.match(/\)/g) || []).length;
  const openParenCount = (expression.match(/\(/g) || []).length;

  // If we have more sqrt( than we can account for with closing parens
  return sqrtCount > closeParenCount - (openParenCount - sqrtCount);
};

// List of basic arithmetic operators (without sqrt)
export const operators = [
  "+",
  "-",
  "*",
  "/",
  "%",
  "^", // No sqrt here, sqrt has its own list
];

export const parentheses = ["(", ")"];
