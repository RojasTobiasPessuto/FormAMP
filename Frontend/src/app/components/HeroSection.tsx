import { motion } from "motion/react";
import { FileText, Shield } from "lucide-react";

export function HeroSection() {
  return (
    <motion.div
      className="text-center mb-12"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 rounded-full mb-6">
        <FileText className="w-4 h-4 text-teal-600" />
        <span className="text-sm text-teal-700 font-medium">
          Registro Profesional
        </span>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 max-w-3xl mx-auto">
        Formulario de Registro Profesional
      </h1>
      
      <p className="text-lg text-slate-600 mb-3 max-w-2xl mx-auto">
        Complete la siguiente información con atención. Los datos serán utilizados únicamente para fines administrativos.
      </p>
      
      <p className="text-base text-slate-500 mb-6 max-w-2xl mx-auto">
        Por favor revise que la información sea correcta antes de enviarla.
      </p>
      
      <div className="inline-flex items-center gap-2 text-sm text-slate-500">
        <Shield className="w-4 h-4 text-teal-600" />
        <span>Sus datos serán tratados de forma confidencial.</span>
      </div>
    </motion.div>
  );
}