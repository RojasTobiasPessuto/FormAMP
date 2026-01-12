import { motion } from "motion/react";
import { Briefcase, FileText } from "lucide-react";
import { FormRadioGroup } from "./FormRadioGroup";
import { FormInput } from "./FormInput";

interface FormStep2Props {
  data: {
    profesion: string;
    profesion_otra: string;
    matricula: string;
    cuit_cuil: string;
    monotributo: string;
  };
  onChange: (field: string, value: string) => void;
  errors: Record<string, string>;
}

export function FormStep2({ data, onChange, errors }: FormStep2Props) {
  const profesionOptions = [
    { value: "medico", label: "Médico/a" },
    { value: "enfermero", label: "Enfermero/a" },
    { value: "cuidador", label: "Cuidador/a" },
    { value: "kinesiologo", label: "Kinesiólogo/a" },
    { value: "psicomotricista", label: "Psicomotricista" },
    { value: "psicologo", label: "Psicólogo/a" },
    { value: "fonoaudiologo", label: "Fonoaudiólogo/a" },
    { value: "paramedico", label: "Paramédico/a" },
    { value: "otros", label: "Otros" },
  ];

  const monotributoOptions = [
    { value: "si", label: "Sí" },
    { value: "no", label: "No" },
  ];

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
            <Briefcase className="w-6 h-6 text-teal-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Información Profesional
            </h2>
            <p className="text-sm text-slate-500">
              Datos profesionales y fiscales
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <FormRadioGroup
          label="Profesión"
          name="profesion"
          value={data.profesion}
          onChange={(value) => onChange("profesion", value)}
          options={profesionOptions}
          error={errors.profesion}
          required
        />

        {data.profesion === "otros" && (
          <FormInput
            label="Especifique su profesión"
            name="profesion_otra"
            value={data.profesion_otra}
            onChange={(value) => onChange("profesion_otra", value)}
            placeholder="Ingrese su profesión"
            error={errors.profesion_otra}
            required
          />
        )}

        <FormInput
          label="Nº de matrícula"
          name="matricula"
          value={data.matricula}
          onChange={(value) => onChange("matricula", value)}
          placeholder="Ingrese su número de matrícula"
          helperText="Solo si corresponde"
          error={errors.matricula}
        />

        <div className="border-t border-slate-200 pt-6">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="w-5 h-5 text-teal-600" />
            <h3 className="text-lg font-semibold text-slate-900">
              Información Fiscal
            </h3>
          </div>

          <div className="space-y-6">
            <FormInput
              label="CUIT / CUIL"
              name="cuit_cuil"
              value={data.cuit_cuil}
              onChange={(value) => onChange("cuit_cuil", value)}
              placeholder="XX-XXXXXXXX-X"
              helperText="Formato con guiones. Máximo 13 caracteres"
              error={errors.cuit_cuil}
              required
            />

            <FormRadioGroup
              label="¿Se encuentra inscripto en el monotributo?"
              name="monotributo"
              value={data.monotributo}
              onChange={(value) => onChange("monotributo", value)}
              options={monotributoOptions}
              error={errors.monotributo}
              required
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
