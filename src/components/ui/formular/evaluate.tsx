import { Input } from "@/components/ui";
import React, { useEffect, useMemo, useState } from "react";
import { evaluate } from "mathjs";
import { sanitizeNumber } from "@/lib";

function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

interface Field {
  key: string;
  label: string;
  value?: number;
}

interface ExpressionData {
  expression: string;
  fields: Field[];
}

interface Props {
  option: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const TheAduseiEvaluation = ({ option, onChange }: Props) => {
  const [data, setData] = useState<ExpressionData | null>(null);
  const [fieldValues, setFieldValues] = useState<Record<string, number>>({});
  const [result, setResult] = useState<number | null>(null);
  const [previewExpr, setPreviewExpr] = useState<string>("");

  // console.log(fieldValues, option, "fieldValues");
  useEffect(() => {
    try {
      const parsed = JSON.parse(option) as ExpressionData;
      const cleanedFields = parsed.fields.map(({ key, label }) => ({
        key,
        label,
      }));
      // console.log(parsed, cleanedFields, "cleanedFields");
      setData({ expression: parsed.expression, fields: cleanedFields });

      const initialValues = Object.fromEntries(
        cleanedFields.map((f) => [f.key, 0]),
      );
      setFieldValues(initialValues);
    } catch (err) {
      console.error("Invalid JSON passed to FormExpression:", err);
    }
  }, [option]);

  function updateFields(
    fields: Field[],
    updates: Record<string, number>,
  ): Field[] {
    return fields.map((field) => ({
      ...field,
      value: updates[field.key] ?? field.value, // update if key exists, else keep old
    }));
  }

  const handleFieldValueChange = (key: string, val: string) => {
    const num = parseFloat(val);
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

    setPreviewExpr(expr);
    return expr;
  }, [data, fieldValues]);

  const debouncedExpression = useDebounce(computedExpression, 300);

  useEffect(() => {
    if (!data) return;

    const allFilled = data.fields.every(
      (f) => typeof fieldValues[f.key] === "number",
    );

    if (!allFilled || !debouncedExpression) return;

    try {
      const evalResult = evaluate(debouncedExpression);
      const roundedResult = {
        result: sanitizeNumber(evalResult),
        fieldValues: updateFields(data.fields, fieldValues),
      };
      console.log(roundedResult, "roundedResult");
      setResult(evalResult);
      if (onChange) {
        onChange(evalResult.toString());
      }
    } catch (err) {
      console.error("Math.js evaluation error:", err);
      setResult(NaN);
      if (onChange) onChange("");
    }
  }, [debouncedExpression, data, fieldValues, onChange]);

  if (!data) return null;

  return (
    <div>
      <h3 className="text-sm font-semibold mb-4 text-primary-default">
        Expression:) {data.expression}
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

      <div className="mt-4 text-sm text-neutral-600 font-mono">
        <strong>Live expression:</strong> {previewExpr}
      </div>

      <div className="mt-4 text-lg font-semibold">
        Result:{" "}
        <span className="text-blue-600">
          {result !== null && !isNaN(result) ? result : "—"}
        </span>
      </div>
    </div>
  );
};
