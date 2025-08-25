export const expressionToMathJax = (expr: string): string => {
  // Replace variables (:var) → \text{var}
  let result = expr.replace(/:([a-zA-Z0-9_]+)/g, (_, v) => `\\\\text{${v}}`);

  // Replace division → fraction
  result = result.replace(
    /\((.*?)\s*\/\s*(.*?)\)/g,
    (_, num, den) => `\\\\frac{${num.trim()}}{${den.trim()}}`,
  );

  // Replace * with ×
  result = result.replace(/\*/g, " \\\\times ");

  return result;
};
