import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Code2, Server, Palette, Zap } from 'lucide-react';

const services = [
  {
    id: 1,
    title: 'Développement d\'Applications Web',
    description: 'Création d\'applications web modernes, évolutives et performantes avec les dernières technologies.',
    icon: Code2,
  },
  {
    id: 2,
    title: 'Développement d\'API avec Laravel',
    description: 'Conception et développement d\'API RESTful sécurisées et documentées pour vos applications.',
    icon: Server,
  },
  {
    id: 3,
    title: 'Interface Utilisateur Moderne',
    description: 'Design et développement d\'interfaces utilisateur élégantes, intuitives et responsives.',
    icon: Palette,
  },
  {
    id: 4,
    title: 'Optimisation de Sites Web',
    description: 'Amélioration des performances, de l\'accessibilité et du référencement de vos sites web.',
    icon: Zap,
  },
];

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Mes <span className="text-neon">Services</span>
          </h2>
          <div className="w-20 h-1 bg-[#87F414] mx-auto rounded-full" />
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Services professionnels de développement web pour transformer vos idées en réalité
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="glass-strong rounded-2xl p-8 border border-[#87F414]/20 hover:border-[#87F414]/50 transition-all duration-300 hover:neon-glow group cursor-pointer"
            >
              <div className="flex items-start gap-6">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#87F414] to-[#0A6207] flex items-center justify-center group-hover:neon-glow-strong transition-all duration-300">
                    <service.icon className="w-8 h-8 text-[#07141A]" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#87F414] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Decorative element */}
              <div className="mt-6 h-1 w-0 bg-gradient-to-r from-[#87F414] to-transparent group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6">
            Prête à transformer votre projet en réalité ?
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('contact');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 bg-[#87F414] text-[#07141A] rounded-xl font-semibold neon-glow hover:neon-glow-strong transition-all duration-300"
          >
            Commençons à travailler ensemble
          </button>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-[#87F414]/5 rounded-full blur-3xl -z-10" />
    </section>
  );
}