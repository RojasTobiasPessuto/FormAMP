import { motion } from "motion/react";
import { FormInput } from "./FormInput";
import { User } from "lucide-react";

interface FormStep1Props {
  data: {
    nombre_completo: string;
    email: string;
    telefono: string;
    cargo: string;
  };
  onChange: (field: string, value: string) => void;
  errors: Record<string, string>;
}

export function FormStep1({ data, onChange, errors }: FormStep1Props) {
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
            <User className="w-6 h-6 text-teal-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Información Personal
            </h2>
            <p className="text-sm text-slate-600">
              Empecemos conociéndonos un poco
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <FormInput
            label="Nombre Completo"
            name="nombre_completo"
            placeholder="Ej: Juan Pérez"
            required
            value={data.nombre_completo}
            onChange={(value) => onChange("nombre_completo", value)}
            error={errors.nombre_completo}
            success={!errors.nombre_completo && data.nombre_completo.length > 0}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Email"
              name="email"
              type="email"
              placeholder="nombre@empresa.com"
              required
              value={data.email}
              onChange={(value) => onChange("email", value)}
              error={errors.email}
              success={!errors.email && data.email.length > 0}
              helperText="Te enviaremos la propuesta a este correo"
            />

            <FormInput
              label="Teléfono"
              name="telefono"
              type="tel"
              placeholder="+54 9 11 1234-5678"
              required
              value={data.telefono}
              onChange={(value) => onChange("telefono", value)}
              error={errors.telefono}
              success={!errors.telefono && data.telefono.length > 0}
              helperText="Preferiblemente con WhatsApp"
            />
          </div>

          <FormInput
            label="Cargo o Posición"
            name="cargo"
            placeholder="Ej: Director de Marketing"
            required
            value={data.cargo}
            onChange={(value) => onChange("cargo", value)}
            error={errors.cargo}
            success={!errors.cargo && data.cargo.length > 0}
          />
        </div>
      </div>
    </motion.div>
  );
}