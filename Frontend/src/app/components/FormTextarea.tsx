import { motion } from "motion/react";
import { AlertCircle } from "lucide-react";

interface FormTextareaProps {
  label: string;
  name: string;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  rows?: number;
}

export function FormTextarea({
  label,
  name,
  placeholder,
  helperText,
  required = false,
  value,
  onChange,
  error,
  rows = 4,
}: FormTextareaProps) {
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label htmlFor={name} className="block text-sm font-medium text-slate-900 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`w-full px-4 py-3.5 rounded-lg border transition-all outline-none resize-none ${
          error
            ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-100"
            : "border-slate-300 bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
        }`}
      />
      
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