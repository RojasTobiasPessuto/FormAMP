import { motion } from "motion/react";
import { FormTextarea } from "./FormTextarea";
import { FormRadioGroup } from "./FormRadioGroup";
import { FormSelect } from "./FormSelect";
import { Target } from "lucide-react";

interface FormStep3Props {
  data: {
    objetivo_principal: string;
    presupuesto_estimado: string;
    timeline_proyecto: string;
    desafios_actuales: string;
  };
  onChange: (field: string, value: string) => void;
  errors: Record<string, string>;
}

export function FormStep3({ data, onChange, errors }: FormStep3Props) {
  const objetivoOptions = [
    {
      value: "aumentar_ventas",
      label: "Aumentar Ventas",
      description: "Generar más ingresos y cerrar más clientes",
    },
    {
      value: "mejorar_eficiencia",
      label: "Mejorar Eficiencia Operativa",
      description: "Optimizar procesos y reducir costos",
    },
    {
      value: "expansion",
      label: "Expandir el Negocio",
      description: "Crecer a nuevos mercados o regiones",
    },
    {
      value: "digital_transformation",
      label: "Transformación Digital",
      description: "Modernizar tecnología y procesos",
    },
    {
      value: "otro",
      label: "Otro Objetivo",
      description: "Tengo un objetivo específico diferente",
    },
  ];

  const presupuestoOptions = [
    { value: "menos_10k", label: "Menos de USD 10K" },
    { value: "10k-25k", label: "USD 10K - 25K" },
    { value: "25k-50k", label: "USD 25K - 50K" },
    { value: "50k-100k", label: "USD 50K - 100K" },
    { value: "100k+", label: "Más de USD 100K" },
    { value: "por_definir", label: "Por definir" },
  ];

  const timelineOptions = [
    { value: "inmediato", label: "Inmediato (1-2 semanas)" },
    { value: "corto_plazo", label: "Corto plazo (1-3 meses)" },
    { value: "mediano_plazo", label: "Mediano plazo (3-6 meses)" },
    { value: "largo_plazo", label: "Largo plazo (+6 meses)" },
    { value: "explorando", label: "Solo estoy explorando" },
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
            <Target className="w-6 h-6 text-teal-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Tus Objetivos
            </h2>
            <p className="text-sm text-slate-600">
              Ayudanos a entender qué necesitás
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <FormRadioGroup
            label="¿Cuál es tu objetivo principal?"
            name="objetivo_principal"
            required
            value={data.objetivo_principal}
            onChange={(value) => onChange("objetivo_principal", value)}
            error={errors.objetivo_principal}
            options={objetivoOptions}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormSelect
              label="Presupuesto Estimado"
              name="presupuesto_estimado"
              placeholder="Selecciona un rango"
              required
              value={data.presupuesto_estimado}
              onChange={(value) => onChange("presupuesto_estimado", value)}
              error={errors.presupuesto_estimado}
              options={presupuestoOptions}
              helperText="Ayuda a dimensionar la solución"
            />

            <FormSelect
              label="¿Cuándo querés comenzar?"
              name="timeline_proyecto"
              placeholder="Selecciona un plazo"
              required
              value={data.timeline_proyecto}
              onChange={(value) => onChange("timeline_proyecto", value)}
              error={errors.timeline_proyecto}
              options={timelineOptions}
            />
          </div>

          <FormTextarea
            label="¿Cuáles son los principales desafíos que enfrentás?"
            name="desafios_actuales"
            placeholder="Contanos los problemas o dificultades que te gustaría resolver. Cuanto más detalle, mejor podremos ayudarte."
            required
            value={data.desafios_actuales}
            onChange={(value) => onChange("desafios_actuales", value)}
            error={errors.desafios_actuales}
            rows={5}
            helperText="Sé específico. Esto nos permite crear una propuesta a tu medida."
          />
        </div>
      </div>
    </motion.div>
  );
}