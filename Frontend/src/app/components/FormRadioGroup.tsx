import { motion } from "motion/react";
import { AlertCircle } from "lucide-react";

interface FormRadioGroupProps {
  label: string;
  name: string;
  helperText?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  options: { value: string; label: string; description?: string }[];
}

export function FormRadioGroup({
  label,
  name,
  helperText,
  required = false,
  value,
  onChange,
  error,
  options,
}: FormRadioGroupProps) {
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label className="block text-sm font-medium text-slate-900 mb-3">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="space-y-3">
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
              value === option.value
                ? "border-teal-500 bg-teal-50"
                : error
                ? "border-red-200 bg-red-50 hover:border-red-300"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="mt-0.5 w-4 h-4 text-teal-600 border-slate-300 focus:ring-teal-500"
            />
            <div className="flex-1">
              <div className="text-sm font-medium text-slate-900">
                {option.label}
              </div>
              {option.description && (
                <div className="text-sm text-slate-500 mt-1">
                  {option.description}
                </div>
              )}
            </div>
          </label>
        ))}
      </div>
      
      {helperText && !error && (
        <p className="mt-2 text-sm text-slate-500">{helperText}</p>
      )}
      
      {error && (
        <motion.p
          className="mt-2 text-sm text-red-600 flex items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <AlertCircle className="w-4 h-4" />
          {error}
        </motion.p>
      )}
    </motion.div>
  );
}