import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowLeft, Send } from "lucide-react";
import { HeroSection } from "./components/HeroSection";
import { ProgressBar } from "./components/ProgressBar";
import { FormStep1 } from "./components/FormStep1";
import { FormStep2 } from "./components/FormStep2";
import { FormStep3 } from "./components/FormStep3";
import { FormStep4 } from "./components/FormStep4";
import { ThankYouState } from "./components/ThankYouState";
import { WhatsAppButton } from "./components/WhatsAppButton";

interface FormData {
  // Step 1: Datos Personales
  first_name: string;
  last_name: string;
  sexo: string;
  fecha_nacimiento: string;

  // Step 2: Información Profesional + Fiscal
  profesion: string;
  profesion_otra: string;
  matricula: string;
  cuit_cuil: string;
  monotributo: string;

  // Step 3: Contacto + Domicilio
  telefono: string;
  email: string;
  localidad: string;
  domicilio: string;
  barrio: string;
  aclaraciones_domicilio: string;

  // Step 4: Documentación + Observaciones
  cv_upload: File[];
  observaciones: string;
}

// 👇 Base del backend (setear en .env del front con VITE_API_BASE)
const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:3001";

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    sexo: "",
    fecha_nacimiento: "",
    profesion: "",
    profesion_otra: "",
    matricula: "",
    cuit_cuil: "",
    monotributo: "",
    telefono: "",
    email: "",
    localidad: "",
    domicilio: "",
    barrio: "",
    aclaraciones_domicilio: "",
    cv_upload: [],
    observaciones: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalSteps = 4;

  const handleFieldChange = (field: string, value: string | File[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.first_name.trim()) {
        newErrors.first_name = "El nombre es obligatorio";
      }
      if (!formData.last_name.trim()) {
        newErrors.last_name = "El apellido es obligatorio";
      }
      if (!formData.sexo) {
        newErrors.sexo = "Seleccione una opción";
      }
      if (!formData.fecha_nacimiento) {
        newErrors.fecha_nacimiento = "La fecha de nacimiento es obligatoria";
      }
    }

    if (step === 2) {
      if (!formData.profesion) {
        newErrors.profesion = "Seleccione una profesión";
      }
      if (formData.profesion === "otros" && !formData.profesion_otra.trim()) {
        newErrors.profesion_otra = "Especifique su profesión";
      }
      if (!formData.cuit_cuil.trim()) {
        newErrors.cuit_cuil = "El CUIT/CUIL es obligatorio";
      } else if (!/^\d{2}-\d{8}-\d{1}$/.test(formData.cuit_cuil)) {
        newErrors.cuit_cuil = "Formato inválido. Use: XX-XXXXXXXX-X";
      }
      if (!formData.monotributo) {
        newErrors.monotributo = "Seleccione una opción";
      }
    }

    if (step === 3) {
      if (!formData.telefono.trim()) {
        newErrors.telefono = "El teléfono es obligatorio";
      } else if (!/^\d{10}$/.test(formData.telefono)) {
        newErrors.telefono = "Ingrese un número válido de 10 dígitos";
      }
      if (!formData.email.trim()) {
        newErrors.email = "El email es obligatorio";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Ingrese un email válido";
      }
      if (!formData.localidad.trim()) {
        newErrors.localidad = "La localidad es obligatoria";
      }
      if (!formData.domicilio.trim()) {
        newErrors.domicilio = "El domicilio es obligatorio";
      }
      if (!formData.barrio.trim()) {
        newErrors.barrio = "El barrio es obligatorio";
      }
    }

    if (step === 4) {
      if (formData.cv_upload.length === 0) {
        newErrors.cv_upload = "Debe adjuntar al menos un archivo";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    const fd = new FormData();

    try {
      const fd = new FormData();

      // Step 1
      fd.append("first_name", formData.first_name);
      fd.append("last_name", formData.last_name);
      fd.append("sexo", formData.sexo);
      fd.append("fecha_nacimiento", formData.fecha_nacimiento);

      // Step 2
      // ✅ Importante: mandar "profesion" como código (incluido "otros")
      // y "profesion_otra" separado. El backend se encarga del mapping.
      fd.append("profesion", formData.profesion);
      fd.append("profesion_otra", formData.profesion_otra);
      fd.append("matricula", formData.matricula);
      fd.append("cuit_cuil", formData.cuit_cuil);
      fd.append("monotributo", formData.monotributo);

      // Step 3
      fd.append("telefono", formData.telefono);
      fd.append("email", formData.email);
      fd.append("localidad", formData.localidad);
      fd.append("domicilio", formData.domicilio);
      fd.append("barrio", formData.barrio);
      fd.append("aclaraciones_domicilio", formData.aclaraciones_domicilio);

      // Step 4
      fd.append("observaciones", formData.observaciones);

      // ✅ Archivos: mismo key "cv_upload"
      formData.cv_upload.forEach((file) => fd.append("cv_upload", file));

      const res = await fetch(`${API_BASE}/leads/submit`, {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status} - ${text}`);
      }

      const json = await res.json();
      console.log("Backend OK:", json);

      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Error enviando al backend:", err);
      alert("Ocurrió un error enviando el formulario. Revisá consola.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <ThankYouState />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8 md:py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <HeroSection />

        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <FormStep1
              key="step1"
              data={{
                first_name: formData.first_name,
                last_name: formData.last_name,
                sexo: formData.sexo,
                fecha_nacimiento: formData.fecha_nacimiento,
              }}
              onChange={handleFieldChange}
              errors={errors}
            />
          )}

          {currentStep === 2 && (
            <FormStep2
              key="step2"
              data={{
                profesion: formData.profesion,
                profesion_otra: formData.profesion_otra,
                matricula: formData.matricula,
                cuit_cuil: formData.cuit_cuil,
                monotributo: formData.monotributo,
              }}
              onChange={handleFieldChange}
              errors={errors}
            />
          )}

          {currentStep === 3 && (
            <FormStep3
              key="step3"
              data={{
                telefono: formData.telefono,
                email: formData.email,
                localidad: formData.localidad,
                domicilio: formData.domicilio,
                barrio: formData.barrio,
                aclaraciones_domicilio: formData.aclaraciones_domicilio,
              }}
              onChange={handleFieldChange}
              errors={errors}
            />
          )}

          {currentStep === 4 && (
            <FormStep4
              key="step4"
              data={{
                cv_upload: formData.cv_upload,
                observaciones: formData.observaciones,
              }}
              onChange={handleFieldChange}
              errors={errors}
            />
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <motion.div
          className="flex items-center justify-between gap-4 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {currentStep > 1 ? (
            <button
              onClick={handleBack}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-3.5 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors font-medium disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-5 h-5" />
              Atrás
            </button>
          ) : (
            <div />
          )}

          {currentStep < totalSteps ? (
            <button
              onClick={handleNext}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-8 py-3.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium shadow-lg shadow-teal-600/20 ml-auto disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Continuar
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-lg hover:from-teal-700 hover:to-teal-600 transition-all font-medium shadow-lg shadow-teal-600/30 ml-auto disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Enviando..." : "Enviar Información"}
              <Send className="w-5 h-5" />
            </button>
          )}
        </motion.div>

        {/* Privacy Notice */}
        <motion.div
          className="mt-8 text-center text-sm text-slate-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Al enviar este formulario, aceptás que procesemos tu información de
          acuerdo con nuestra{" "}
          <a href="#" className="text-teal-600 hover:underline">
            Política de Privacidad
          </a>
          . Tus datos están protegidos y nunca serán compartidos con terceros.
        </motion.div>

        {/* WhatsApp Button */}
        <WhatsAppButton />
      </div>
    </div>
  );
}

export default App;
