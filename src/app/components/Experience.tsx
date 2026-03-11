import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Briefcase, Calendar } from 'lucide-react';
import { experiences } from '../data/portfolio-data';

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Mon <span className="text-neon">Expérience</span>
          </h2>
          <div className="w-20 h-1 bg-[#87F414] mx-auto rounded-full" />
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Mon parcours professionnel dans le développement web
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#87F414] via-[#0A6207] to-[#87F414]" />

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-[#87F414] rounded-full border-4 border-[#07141A] neon-glow z-10" />

                {/* Content */}
                <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="glass-strong rounded-2xl p-6 border border-[#87F414]/20 hover:border-[#87F414]/50 transition-all duration-300 hover:neon-glow"
                  >
                    <div className="flex items-center gap-2 text-[#87F414] mb-3">
                      <Calendar size={18} />
                      <span className="text-sm">{exp.period}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                    <div className="flex items-center gap-2 text-gray-400 mb-4">
                      <Briefcase size={18} />
                      <span>{exp.company}</span>
                    </div>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs rounded-full bg-[#1C3A40] text-[#87F414] border border-[#87F414]/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Empty space for desktop layout */}
                <div className="hidden md:block w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#87F414]/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0A6207]/5 rounded-full blur-3xl -z-10" />
    </section>
  );
}