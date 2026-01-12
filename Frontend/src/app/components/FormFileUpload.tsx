import { useState } from "react";
import { Upload, X, FileText } from "lucide-react";

interface FormFileUploadProps {
  label: string;
  name: string;
  value: File[];
  onChange: (files: File[]) => void;
  error?: string;
  required?: boolean;
  helperText?: string;
  maxFiles?: number;
  maxSizeMB?: number;
  acceptedFormats?: string[];
}

export function FormFileUpload({
  label,
  name,
  value,
  onChange,
  error,
  required = false,
  helperText,
  maxFiles = 5,
  maxSizeMB = 10,
  acceptedFormats = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"],
}: FormFileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const validFiles = fileArray.filter((file) => {
        const sizeInMB = file.size / (1024 * 1024);
        return sizeInMB <= maxSizeMB;
      });

      const totalFiles = [...value, ...validFiles].slice(0, maxFiles);
      onChange(totalFiles);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files) {
      const fileArray = Array.from(files);
      const validFiles = fileArray.filter((file) => {
        const sizeInMB = file.size / (1024 * 1024);
        return sizeInMB <= maxSizeMB;
      });

      const totalFiles = [...value, ...validFiles].slice(0, maxFiles);
      onChange(totalFiles);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeFile = (index: number) => {
    const newFiles = value.filter((_, i) => i !== index);
    onChange(newFiles);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative border-2 border-dashed rounded-lg p-6 transition-all ${
          isDragging
            ? "border-teal-500 bg-teal-50"
            : error
            ? "border-red-300 bg-red-50"
            : "border-slate-300 bg-white hover:border-teal-400"
        }`}
      >
        <input
          type="file"
          id={name}
          name={name}
          onChange={handleFileChange}
          multiple
          accept={acceptedFormats.join(",")}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="text-center pointer-events-none">
          <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <p className="text-sm font-medium text-slate-700 mb-1">
            Click para seleccionar o arrastre archivos aquí
          </p>
          <p className="text-xs text-slate-500">
            Máximo {maxFiles} archivos · {maxSizeMB}MB por archivo
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Formatos: {acceptedFormats.join(", ")}
          </p>
        </div>
      </div>

      {/* File List */}
      {value.length > 0 && (
        <div className="mt-4 space-y-2">
          {value.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200"
            >
              <FileText className="w-5 h-5 text-teal-600 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-700 truncate">
                  {file.name}
                </p>
                <p className="text-xs text-slate-500">{formatFileSize(file.size)}</p>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="p-1 hover:bg-slate-200 rounded transition-colors"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>
          ))}
        </div>
      )}

      {helperText && !error && (
        <p className="mt-2 text-sm text-slate-500">{helperText}</p>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
          <span className="text-red-500">⚠</span>
          {error}
        </p>
      )}
    </div>
  );
}
