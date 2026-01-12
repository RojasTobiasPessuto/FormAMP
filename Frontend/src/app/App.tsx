import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowLeft, Send } from "lucide-react";
import { HeroSection } from "./components/HeroSection";
import { ProgressBar } from "./components/ProgressBar";
import { FormStep1 } from "./components/FormStep1";
import { FormStep2 } from "./components/FormStep2";
import { FormStep3 } from "./components/FormStep3";
import { ThankYouState } from "./components/ThankYouState";
import { WhatsAppButton } from "./components/WhatsAppButton";

interface FormData {
  // Step 1: Personal Info
  nombre_completo: string;
  email: string;
  telefono: string;
  cargo: string;

  // Step 2: Company Info
  nombre_empresa: string;
  industria: string;
  tamano_empresa: string;
  facturacion_anual: string;

  // Step 3: Goals & Needs
  objetivo_principal: string;
  presupuesto_estimado: string;
  timeline_proyecto: string;
  desafios_actuales: string;
}

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nombre_completo: "",
    email: "",
    telefono: "",
    cargo: "",
    nombre_empresa: "",
    industria: "",
    tamano_empresa: "",
    facturacion_anual: "",
    objetivo_principal: "",
    presupuesto_estimado: "",
    timeline_proyecto: "",
    desafios_actuales: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalSteps = 3;

  const handleFieldChange = (field: string, value: string) => {
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
      if (!formData.nombre_completo.trim()) {
        newErrors.nombre_completo = "El nombre es obligatorio";
      }
      if (!formData.email.trim()) {
        newErrors.email = "El email es obligatorio";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Ingresá un email válido";
      }
      if (!formData.telefono.trim()) {
        newErrors.telefono = "El teléfono es obligatorio";
      }
      if (!formData.cargo.trim()) {
        newErrors.cargo = "El cargo es obligatorio";
      }
    }

    if (step === 2) {
      if (!formData.nombre_empresa.trim()) {
        newErrors.nombre_empresa = "El nombre de la empresa es obligatorio";
      }
      if (!formData.industria) {
        newErrors.industria = "Seleccioná una industria";
      }
      if (!formData.tamano_empresa) {
        newErrors.tamano_empresa = "Seleccioná el tamaño de la empresa";
      }
    }

    if (step === 3) {
      if (!formData.objetivo_principal) {
        newErrors.objetivo_principal = "Seleccioná un objetivo principal";
      }
      if (!formData.presupuesto_estimado) {
        newErrors.presupuesto_estimado = "Seleccioná un rango de presupuesto";
      }
      if (!formData.timeline_proyecto) {
        newErrors.timeline_proyecto = "Seleccioná un plazo";
      }
      if (!formData.desafios_actuales.trim()) {
        newErrors.desafios_actuales = "Contanos sobre tus desafíos";
      } else if (formData.desafios_actuales.trim().length < 20) {
        newErrors.desafios_actuales =
          "Por favor, sé más específico (mínimo 20 caracteres)";
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
    if (!validateStep(currentStep)) {
      return;
    }

    // Simulate API call to GoHighLevel
    console.log("Submitting to GoHighLevel:", formData);

    // Here you would make the actual API call:
    // const response = await fetch('YOUR_GOHIGHLEVEL_API_ENDPOINT', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer YOUR_API_KEY'
    //   },
    //   body: JSON.stringify(formData)
    // });

    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
              data={formData}
              onChange={handleFieldChange}
              errors={errors}
            />
          )}

          {currentStep === 2 && (
            <FormStep2
              key="step2"
              data={formData}
              onChange={handleFieldChange}
              errors={errors}
            />
          )}

          {currentStep === 3 && (
            <FormStep3
              key="step3"
              data={formData}
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
              className="flex items-center gap-2 px-6 py-3.5 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              Atrás
            </button>
          ) : (
            <div /> // Spacer
          )}

          {currentStep < totalSteps ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-3.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium shadow-lg shadow-teal-600/20 ml-auto"
            >
              Continuar
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-lg hover:from-teal-700 hover:to-teal-600 transition-all font-medium shadow-lg shadow-teal-600/30 ml-auto"
            >
              Enviar Información
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