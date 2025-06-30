import { Input } from "@/components/ui";
import React, { useEffect, useMemo, useState } from "react";

interface Field {
  key: string;
  label: string;
  value: number;
}

interface ExpressionData {
  expression: string;
  fields: Field[];
}

interface Props {
  option: string; // expects JSON string
}

const safeEval = (expression: string): number => {
  try {
    return new Function(`return (${expression})`)();
  } catch (err) {
    console.error("Evaluation error:", err);
    return NaN;
  }
};

const FormExpression = ({ option }: Props) => {
  const [data, setData] = useState<ExpressionData | null>(null);
  const [fieldValues, setFieldValues] = useState<Record<string, number>>({});
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    try {
      const parsed: ExpressionData = JSON.parse(option);
      setData(parsed);
      const initialValues = Object.fromEntries(
        parsed.fields.map((f) => [f.key, f.value]),
      );
      setFieldValues(initialValues);
    } catch (err) {
      console.error("Invalid JSON passed to FormExpression:", err);
    }
  }, [option]);

  const handleFieldValueChange = (key: string, value: string) => {
    const num = parseFloat(value);
    setFieldValues((prev) => ({
      ...prev,
      [key]: isNaN(num) ? 0 : num,
    }));
  };

  const computedExpression = useMemo(() => {
    if (!data) return "";
    let expr = data.expression;
    Object.entries(fieldValues).forEach(([key, value]) => {
      const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`:${escapedKey}`, "g");
      expr = expr.replace(regex, value.toString());
    });
    return expr;
  }, [data, fieldValues]);

  useEffect(() => {
    if (computedExpression) {
      const evalResult = safeEval(computedExpression);
      setResult(evalResult);
    }
  }, [computedExpression]);

  if (!data) return null;

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">
        Enter values for expression{" "}
        <span className="text-blue-600">{data?.expression}</span>
      </h3>
      {data.fields.map((field) => (
        <div key={field.key} className="flex items-center space-x-2 my-2">
          <label className="block text-sm w-40">
            {field.label} ({field.key}):
          </label>
          <Input
            type="number"
            name={field.key}
            value={fieldValues[field.key]}
            onChange={(e) => handleFieldValueChange(field.key, e.target.value)}
            placeholder={`Enter value for ${field.label}`}
          />
        </div>
      ))}
      <div className="mt-6 text-lg font-semibold">
        Result:{" "}
        <span className="text-blue-600">
          {result !== null ? result : "Invalid expression"}
        </span>
      </div>
    </div>
  );
};

export default FormExpression;
