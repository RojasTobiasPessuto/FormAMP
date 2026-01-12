import { motion } from "motion/react";
import { FormInput } from "./FormInput";
import { FormSelect } from "./FormSelect";
import { Building2 } from "lucide-react";

interface FormStep2Props {
  data: {
    nombre_empresa: string;
    industria: string;
    tamano_empresa: string;
    facturacion_anual: string;
  };
  onChange: (field: string, value: string) => void;
  errors: Record<string, string>;
}

export function FormStep2({ data, onChange, errors }: FormStep2Props) {
  const industriasOptions = [
    { value: "tecnologia", label: "Tecnología" },
    { value: "servicios", label: "Servicios Profesionales" },
    { value: "retail", label: "Retail / Comercio" },
    { value: "salud", label: "Salud y Bienestar" },
    { value: "educacion", label: "Educación" },
    { value: "finanzas", label: "Finanzas y Seguros" },
    { value: "manufactura", label: "Manufactura" },
    { value: "real_estate", label: "Real Estate / Inmobiliaria" },
    { value: "hosteleria", label: "Hostelería y Turismo" },
    { value: "otro", label: "Otro" },
  ];

  const tamanoOptions = [
    { value: "1-10", label: "1-10 empleados" },
    { value: "11-50", label: "11-50 empleados" },
    { value: "51-200", label: "51-200 empleados" },
    { value: "201-500", label: "201-500 empleados" },
    { value: "501+", label: "Más de 500 empleados" },
  ];

  const facturacionOptions = [
    { value: "0-100k", label: "Menos de USD 100K" },
    { value: "100k-500k", label: "USD 100K - 500K" },
    { value: "500k-1m", label: "USD 500K - 1M" },
    { value: "1m-5m", label: "USD 1M - 5M" },
    { value: "5m+", label: "Más de USD 5M" },
    { value: "prefiero_no_decir", label: "Prefiero no decir" },
  ];

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
            <Building2 className="w-6 h-6 text-teal-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Tu Empresa
            </h2>
            <p className="text-sm text-slate-600">
              Cuéntanos sobre tu organización
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <FormInput
            label="Nombre de la Empresa"
            name="nombre_empresa"
            placeholder="Ej: Acme Corp"
            required
            value={data.nombre_empresa}
            onChange={(value) => onChange("nombre_empresa", value)}
            error={errors.nombre_empresa}
            success={!errors.nombre_empresa && data.nombre_empresa.length > 0}
          />

          <FormSelect
            label="Industria o Sector"
            name="industria"
            placeholder="Selecciona tu industria"
            required
            value={data.industria}
            onChange={(value) => onChange("industria", value)}
            error={errors.industria}
            options={industriasOptions}
            helperText="Esto nos ayuda a personalizar nuestra recomendación"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormSelect
              label="Tamaño de la Empresa"
              name="tamano_empresa"
              placeholder="Selecciona el tamaño"
              required
              value={data.tamano_empresa}
              onChange={(value) => onChange("tamano_empresa", value)}
              error={errors.tamano_empresa}
              options={tamanoOptions}
            />

            <FormSelect
              label="Facturación Anual (USD)"
              name="facturacion_anual"
              placeholder="Selecciona un rango"
              value={data.facturacion_anual}
              onChange={(value) => onChange("facturacion_anual", value)}
              error={errors.facturacion_anual}
              options={facturacionOptions}
              helperText="Opcional"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}