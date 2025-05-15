// components/TestTemplateBuilder.tsx

"use client";
import React, { useState } from "react";

interface Variable {
  key: string;
  value: string;
}

const TestTemplateBuilder: React.FC = () => {
  const [testName, setTestName] = useState("");
  const [outputLabel, setOutputLabel] = useState("");
  const [formula, setFormula] = useState("");
  const [variables, setVariables] = useState<Variable[]>([
    { key: "avg_abs", value: "Absorbance Avg" },
    { key: "A1", value: "715" },
  ]);

  const handleAddVariable = () => {
    setVariables([...variables, { key: "", value: "" }]);
  };

  const handleVariableChange = (
    index: number,
    field: "key" | "value",
    value: string,
  ) => {
    const updated = [...variables];
    updated[index][field] = value;
    setVariables(updated);
  };

  const handleSave = () => {
    const template = {
      testName,
      outputLabel,
      formula,
      variables,
    };
    console.log("Saved Template:", template);
    alert("Test saved to console log!");
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow space-y-4 bg-white">
      <h2 className="text-xl font-semibold">Add Test Template</h2>

      <div>
        <label className="block text-sm font-medium">Test Name:</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
          placeholder="Assay: UV"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Variables:</label>
        {variables.map((v, i) => (
          <div key={i} className="flex items-center space-x-2 my-1">
            <input
              type="text"
              className="w-1/3 p-2 border rounded"
              value={v.key}
              placeholder="Key"
              onChange={(e) => handleVariableChange(i, "key", e.target.value)}
            />
            <span>→</span>
            <input
              type="text"
              className="w-2/3 p-2 border rounded"
              value={v.value}
              placeholder="Value or Label"
              onChange={(e) => handleVariableChange(i, "value", e.target.value)}
            />
          </div>
        ))}
        <button
          className="mt-2 text-sm text-blue-600 hover:underline"
          onClick={handleAddVariable}
        >
          + Add Variable
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium">Formula:</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={formula}
          onChange={(e) => setFormula(e.target.value)}
          placeholder="(avg_abs / A1) * (dil / wt) * (cut / claim) * 100"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Output Label:</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={outputLabel}
          onChange={(e) => setOutputLabel(e.target.value)}
          placeholder="Assay Result (%)"
        />
      </div>

      <button
        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        onClick={handleSave}
      >
        Save Test
      </button>
    </div>
  );
};

export default TestTemplateBuilder;
