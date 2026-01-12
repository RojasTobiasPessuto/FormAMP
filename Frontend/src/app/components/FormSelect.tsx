import { motion } from "motion/react";
import { AlertCircle, ChevronDown } from "lucide-react";

interface FormSelectProps {
  label: string;
  name: string;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  options: { value: string; label: string }[];
}

export function FormSelect({
  label,
  name,
  placeholder = "Seleccionar opción",
  helperText,
  required = false,
  value,
  onChange,
  error,
  options,
}: FormSelectProps) {
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
      
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full px-4 py-3.5 rounded-lg border transition-all outline-none appearance-none bg-white cursor-pointer ${
            error
              ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-100"
              : "border-slate-300 focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
          } ${!value ? "text-slate-400" : "text-slate-900"}`}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
        
        {error && (
          <AlertCircle className="absolute right-10 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
        )}
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