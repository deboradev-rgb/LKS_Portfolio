import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { skills } from '../data/portfolio-data';

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const frontendSkills = skills.filter(skill => skill.category === 'Frontend');
  const backendSkills = skills.filter(skill => skill.category === 'Backend');

  return (
    <section id="skills" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Mes <span className="text-neon">Compétences</span>
          </h2>
          <div className="w-20 h-1 bg-[#87F414] mx-auto rounded-full" />
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-sm sm:text-base px-4">
            Technologies et outils que j'utilise pour créer des applications web modernes et performantes
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12">
          {/* Frontend Skills */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-strong rounded-2xl p-6 sm:p-8 border border-[#87F414]/20"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-[#87F414]">Frontend Development</h3>
            <div className="space-y-6">
              {frontendSkills.map((skill, index) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-medium">{skill.name}</span>
                    <span className="text-[#87F414]">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-[#1C3A40] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.4 + index * 0.1 }}
                      className="h-full bg-gradient-to-r from-[#87F414] to-[#0A6207] rounded-full relative"
                    >
                      <div className="absolute right-0 top-0 bottom-0 w-2 bg-[#87F414] neon-glow" />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Backend Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-strong rounded-2xl p-6 sm:p-8 border border-[#87F414]/20"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-[#87F414]">Backend Development</h3>
            <div className="space-y-6">
              {backendSkills.map((skill, index) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-medium">{skill.name}</span>
                    <span className="text-[#87F414]">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-[#1C3A40] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.4 + index * 0.1 }}
                      className="h-full bg-gradient-to-r from-[#87F414] to-[#0A6207] rounded-full relative"
                    >
                      <div className="absolute right-0 top-0 bottom-0 w-2 bg-[#87F414] neon-glow" />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Skill Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.05 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="glass rounded-xl p-4 text-center border border-[#87F414]/20 hover:border-[#87F414] transition-all duration-300 hover:neon-glow cursor-pointer"
            >
              <p className="text-white font-medium">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#87F414]/5 rounded-full blur-3xl -z-10" />
    </section>
  );
}