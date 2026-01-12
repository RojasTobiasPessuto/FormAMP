import { motion } from "motion/react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  success?: boolean;
}

export function FormInput({
  label,
  name,
  type = "text",
  placeholder,
  helperText,
  required = false,
  value,
  onChange,
  error,
  success,
}: FormInputProps) {
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
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full px-4 py-3.5 rounded-lg border transition-all outline-none ${
            error
              ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-100"
              : success
              ? "border-green-300 bg-green-50 focus:border-green-500 focus:ring-4 focus:ring-green-100"
              : "border-slate-300 bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
          }`}
        />
        
        {error && (
          <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
        )}
        
        {success && !error && (
          <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
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
          {error}
        </motion.p>
      )}
    </motion.div>
  );
}