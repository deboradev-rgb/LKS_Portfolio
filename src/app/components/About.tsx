import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { GraduationCap, Code2, Sparkles, Zap } from 'lucide-react';

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const highlights = [
    {
      icon: Code2,
      title: '2 ans',
      description: 'd\'expérience',
    },
    {
      icon: GraduationCap,
      title: 'Licence',
      description: 'Systèmes & Logiciels',
    },
    {
      icon: Zap,
      title: 'Performante',
      description: '& évolutive',
    },
    {
      icon: Sparkles,
      title: 'Innovation',
      description: '& créativité',
    },
  ];

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            À Propos de <span className="text-neon">Moi</span>
          </h2>
          <div className="w-20 h-1 bg-[#87F414] mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Profile Info - Concis et Innovant */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-strong rounded-2xl p-6 sm:p-8 border border-[#87F414]/20 relative overflow-hidden"
          >
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#87F414]/10 rounded-bl-full" />
            
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-[#87F414] relative">
              Développeuse Full Stack
              <div className="absolute -bottom-2 left-0 w-16 h-1 bg-[#87F414] rounded-full" />
            </h3>

            <div className="space-y-4 relative z-10">
              <motion.p 
                className="text-gray-200 leading-relaxed text-sm sm:text-base"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: 0.4 }}
              >
                <span className="text-[#87F414] font-semibold">2 ans d'expérience</span> dans la création 
                d'applications web modernes, performantes et évolutives.
              </motion.p>

              <motion.p 
                className="text-gray-200 leading-relaxed text-sm sm:text-base"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: 0.5 }}
              >
                Titulaire d'une <span className="text-[#87F414] font-semibold">licence en systèmes informatiques 
                et logiciels</span>, j'allie rigueur académique et créativité technique.
              </motion.p>

              <motion.p 
                className="text-gray-200 leading-relaxed text-sm sm:text-base"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: 0.6 }}
              >
                Passionnée par les <span className="text-[#87F414] font-semibold">technologies modernes</span> et 
                l'<span className="text-[#87F414] font-semibold">innovation</span>, je m'efforce de livrer des 
                solutions élégantes qui dépassent les attentes.
              </motion.p>
            </div>

            {/* Decorative glow */}
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#87F414]/5 rounded-tr-full blur-2xl" />
          </motion.div>

          {/* Right: Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 gap-4 sm:gap-6"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass rounded-xl p-4 sm:p-6 text-center border border-[#87F414]/20 hover:border-[#87F414]/50 transition-all duration-300 hover:neon-glow"
              >
                <item.icon className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-[#87F414]" />
                <h4 className="text-xl sm:text-2xl font-bold text-white mb-2">{item.title}</h4>
                <p className="text-gray-400 text-xs sm:text-sm">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-[#87F414]/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-[#0A6207]/5 rounded-full blur-3xl -z-10" />
    </section>
  );
}