import { motion } from "motion/react";
import { CheckCircle2, Calendar, Mail } from "lucide-react";

export function ThankYouState() {
  return (
    <motion.div
      className="w-full max-w-2xl mx-auto text-center py-12"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <CheckCircle2 className="w-10 h-10 text-green-600" />
      </motion.div>

      <motion.h2
        className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        ¡Listo! Recibimos tu información
      </motion.h2>

      <motion.p
        className="text-lg text-slate-600 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Gracias por tomarte el tiempo de completar el formulario. Ya estamos
        trabajando en tu propuesta personalizada.
      </motion.p>

      <motion.div
        className="bg-teal-50 rounded-2xl p-6 mb-8 border border-teal-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          ¿Qué sigue ahora?
        </h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3 text-left">
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <p className="font-medium text-slate-900">
                Revisión de tu información
              </p>
              <p className="text-sm text-slate-600">
                Nuestro equipo analizará tus necesidades en las próximas 24 horas
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 text-left">
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <p className="font-medium text-slate-900">
                Te contactaremos pronto
              </p>
              <p className="text-sm text-slate-600">
                Recibirás un email con la propuesta personalizada y los próximos pasos
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="text-sm text-slate-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Si tenés alguna consulta urgente, escribinos a{" "}
        <a href="mailto:contacto@empresa.com" className="text-teal-600 hover:underline">
          contacto@empresa.com
        </a>
      </motion.div>
    </motion.div>
  );
}