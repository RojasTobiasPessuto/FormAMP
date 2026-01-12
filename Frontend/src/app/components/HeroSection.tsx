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
        Queremos conocerte mejor para darte la mejor solución
      </h1>
      
      <p className="text-lg text-slate-600 mb-6 max-w-2xl mx-auto">
        Completá este breve formulario y te ayudaremos a encontrar la solución
        perfecta para tus necesidades. Solo nos tomará 3 minutos.
      </p>
      
      <div className="inline-flex items-center gap-2 text-sm text-slate-500">
        <Shield className="w-4 h-4 text-teal-600" />
        <span>Tus datos están seguros. Nos permiten personalizar la propuesta para vos.</span>
      </div>
    </motion.div>
  );
}