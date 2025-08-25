import React from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { expressionToMathJax } from "./util";

interface Props {
  expression: string;
}

const ExpressionRenderer: React.FC<Props> = ({ expression }) => {
  const formula = expressionToMathJax(expression);

  return (
    <MathJaxContext>
      <div className="flex justify-center p-4 text-xl">
        <MathJax dynamic inline>{`\\(${formula}\\)`}</MathJax>
      </div>
    </MathJaxContext>
  );
};

export default ExpressionRenderer;
