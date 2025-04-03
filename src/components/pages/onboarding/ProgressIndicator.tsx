interface ProgressIndicatorProps {
  steps: number;
  currentStep: number;
}

export function ProgressIndicator({
  steps,
  currentStep,
}: ProgressIndicatorProps) {
  return (
    <div className="mb-8 flex w-full gap-2">
      {Array.from({ length: steps }).map((_, index) => (
        <div
          key={index}
          className={`h-3 flex-1 transition-colors ${
            index < currentStep
              ? "bg-green-500" // Completed steps
              : index === currentStep
                ? "bg-green-200" // Current step
                : "bg-gray-200" // Future steps
          }`}
        />
      ))}
    </div>
  );
}
