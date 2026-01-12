import { motion } from "motion/react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-slate-600">
          Paso {currentStep} de {totalSteps}
        </span>
        <span className="text-sm font-medium text-slate-900">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-teal-600 to-teal-500"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      <div className="flex justify-between mt-3">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                index + 1 < currentStep
                  ? "bg-teal-600 text-white"
                  : index + 1 === currentStep
                  ? "bg-teal-600 text-white ring-4 ring-teal-100"
                  : "bg-slate-200 text-slate-500"
              }`}
            >
              {index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div className="w-8 md:w-16 h-0.5 bg-slate-200" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}