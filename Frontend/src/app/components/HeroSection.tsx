import { motion } from "motion/react";
import { Sparkles, Shield } from "lucide-react";

export function HeroSection() {
  return (
    <motion.div
      className="text-center mb-12"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 rounded-full mb-6">
        <Sparkles className="w-4 h-4 text-teal-600" />
        <span className="text-sm text-teal-700 font-medium">
          Personaliza tu experiencia
        </span>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 max-w-3xl mx-auto">
        + Trabaja con nosotros
      </h1>
      
      <p className="text-lg text-slate-600 mb-6 max-w-2xl mx-auto">
        Siempre estamos en la búsqueda de profesionales de la salud, que les interese sumarse a nuestro equipo profesional, que trabajen con pasión por la gente, proactividad y flexibilidad para adaptarse a los cambios, con ganas de asumir nuevos desafíos y que compartan nuestros valores de responsabilidad, cercanía, compromiso, innovación y entusiasmo. Si contas con estos requisitos te dejamos éste formulario para que completes con tus datos y podamos comunicarnos a la brevedad.
      </p>
      
      <div className="inline-flex items-center gap-2 text-sm text-slate-500">
        <Shield className="w-4 h-4 text-teal-600" />
        <span>Tus datos están seguros. Nos permiten personalizar la propuesta para vos.</span>
      </div>
    </motion.div>
  );
}