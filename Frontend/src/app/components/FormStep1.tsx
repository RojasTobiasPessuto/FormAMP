import { motion } from "motion/react";
import { UserCircle } from "lucide-react";
import { FormInput } from "./FormInput";
import { FormRadioGroup } from "./FormRadioGroup";
import { FormDatePicker } from "./FormDatePicker";

interface FormStep1Props {
  data: {
    first_name: string;
    last_name: string;
    sexo: string;
    fecha_nacimiento: string;
  };
  onChange: (field: string, value: string) => void;
  errors: Record<string, string>;
}

export function FormStep1({ data, onChange, errors }: FormStep1Props) {
  const sexoOptions = [
    { value: "masculino", label: "Masculino" },
    { value: "femenino", label: "Femenino" },
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
            <UserCircle className="w-6 h-6 text-teal-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Datos Personales
            </h2>
            <p className="text-sm text-slate-500">
              Información básica del profesional
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Nombre"
            name="first_name"
            value={data.first_name}
            onChange={(value) => onChange("first_name", value)}
            placeholder="Ingrese su nombre"
            error={errors.first_name}
            required
          />

          <FormInput
            label="Apellido"
            name="last_name"
            value={data.last_name}
            onChange={(value) => onChange("last_name", value)}
            placeholder="Ingrese su apellido"
            error={errors.last_name}
            required
          />
        </div>

        <FormRadioGroup
          label="Sexo"
          name="sexo"
          value={data.sexo}
          onChange={(value) => onChange("sexo", value)}
          options={sexoOptions}
          error={errors.sexo}
          required
        />

        <FormDatePicker
          label="Fecha de nacimiento"
          name="fecha_nacimiento"
          value={data.fecha_nacimiento}
          onChange={(value) => onChange("fecha_nacimiento", value)}
          error={errors.fecha_nacimiento}
          helperText="Formato: dd/mm/aaaa"
          required
        />
      </div>
    </motion.div>
  );
}
