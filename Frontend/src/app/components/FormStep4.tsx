import { motion } from "motion/react";
import { Upload, MessageSquare } from "lucide-react";
import { FormFileUpload } from "./FormFileUpload";
import { FormTextarea } from "./FormTextarea";

interface FormStep4Props {
  data: {
    cv_upload: File[];
    observaciones: string;
  };
  onChange: (field: string, value: string | File[]) => void;
  errors: Record<string, string>;
}

export function FormStep4({ data, onChange, errors }: FormStep4Props) {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
            <Upload className="w-6 h-6 text-teal-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Documentación</h2>
            <p className="text-sm text-slate-500">
              Adjunte su CV y observaciones adicionales
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <FormFileUpload
          label="Adjunte su Curriculum Vitae"
          name="cv_upload"
          value={data.cv_upload}
          onChange={(files) => onChange("cv_upload", files)}
          error={errors.cv_upload}
          helperText="Formatos permitidos: PDF, DOC, DOCX, JPG, PNG · Máximo 5 archivos · 10MB por archivo"
          maxFiles={5}
          maxSizeMB={10}
          acceptedFormats={[".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"]}
          required
        />

        <div className="border-t border-slate-200 pt-6">
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="w-5 h-5 text-teal-600" />
            <h3 className="text-lg font-semibold text-slate-900">
              Observaciones
            </h3>
          </div>

          <FormTextarea
            label="Observaciones"
            name="observaciones"
            value={data.observaciones}
            onChange={(value) => onChange("observaciones", value)}
            placeholder="Puede contarnos más sobre usted, su experiencia o cualquier dato que considere relevante..."
            error={errors.observaciones}
            rows={6}
          />
        </div>
      </div>
    </motion.div>
  );
}
