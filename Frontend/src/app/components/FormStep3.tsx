import { motion } from "motion/react";
import { Phone, MapPin } from "lucide-react";
import { FormInput } from "./FormInput";
import { FormTextarea } from "./FormTextarea";

interface FormStep3Props {
  data: {
    telefono: string;
    email: string;
    localidad: string;
    domicilio: string;
    barrio: string;
    aclaraciones_domicilio: string;
  };
  onChange: (field: string, value: string) => void;
  errors: Record<string, string>;
}

export function FormStep3({ data, onChange, errors }: FormStep3Props) {
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
            <Phone className="w-6 h-6 text-teal-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Contacto</h2>
            <p className="text-sm text-slate-500">
              Información de contacto y domicilio
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Nº de Teléfono"
            name="telefono"
            type="tel"
            value={data.telefono}
            onChange={(value) => onChange("telefono", value)}
            placeholder="3514555555"
            helperText="Sin 0 y sin 15"
            error={errors.telefono}
            required
          />

          <FormInput
            label="Mail"
            name="email"
            type="email"
            value={data.email}
            onChange={(value) => onChange("email", value)}
            placeholder="ejemplo@email.com"
            error={errors.email}
            required
          />
        </div>

        <div className="border-t border-slate-200 pt-6">
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="w-5 h-5 text-teal-600" />
            <h3 className="text-lg font-semibold text-slate-900">Domicilio</h3>
          </div>

          <div className="space-y-6">
            <FormInput
              label="Localidad"
              name="localidad"
              value={data.localidad}
              onChange={(value) => onChange("localidad", value)}
              placeholder="Ingrese su localidad"
              helperText="Por favor sin errores de ortografía ni aclaraciones"
              error={errors.localidad}
              required
            />

            <FormInput
              label="Domicilio"
              name="domicilio"
              value={data.domicilio}
              onChange={(value) => onChange("domicilio", value)}
              placeholder="Calle y numeración"
              error={errors.domicilio}
              required
            />

            <FormInput
              label="Barrio"
              name="barrio"
              value={data.barrio}
              onChange={(value) => onChange("barrio", value)}
              placeholder="Ingrese su barrio"
              error={errors.barrio}
              required
            />

            <FormTextarea
              label="Aclaraciones domicilio"
              name="aclaraciones_domicilio"
              value={data.aclaraciones_domicilio}
              onChange={(value) => onChange("aclaraciones_domicilio", value)}
              placeholder="Información adicional sobre el domicilio..."
              helperText="Agregar solo si el domicilio o localidad no se encuentra en los listados. También puede agregar zona de trabajo si es distinta al barrio donde reside."
              error={errors.aclaraciones_domicilio}
              rows={4}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
