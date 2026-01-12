import { Calendar } from "lucide-react";

interface FormDatePickerProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  helperText?: string;
}

export function FormDatePicker({
  label,
  name,
  value,
  onChange,
  error,
  required = false,
  helperText,
}: FormDatePickerProps) {
  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative">
        <input
          type="date"
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full px-4 py-3.5 pr-10 rounded-lg border transition-all outline-none ${
            error
              ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-100"
              : "border-slate-300 bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
          }`}
        />
        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
      </div>

      {helperText && !error && (
        <p className="mt-1.5 text-sm text-slate-500">{helperText}</p>
      )}

      {error && (
        <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
          <span className="text-red-500">⚠</span>
          {error}
        </p>
      )}
    </div>
  );
}
