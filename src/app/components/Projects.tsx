import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Plateforme e-commerce moderne avec panier d\'achat, gestion des commandes et paiement en ligne.',
    technologies: ['React', 'TypeScript', 'Laravel', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1760226642567-a5315592c810?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBwbGF0Zm9ybSUyMG1vZGVybnxlbnwxfHx8fDE3NzMyNDUzNjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    liveDemo: '#',
    github: '#',
  },
  {
    id: 2,
    title: 'Application de Gestion',
    description: 'Système de gestion complet pour les entreprises avec tableau de bord analytique.',
    technologies: ['React', 'TypeScript', 'PHP', 'MySQL'],
    image: 'https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGRhc2hib2FyZCUyMGFuYWx5dGljc3xlbnwxfHx8fDE3NzMxNjU4NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    liveDemo: '#',
    github: '#',
  },
  {
    id: 3,
    title: 'Portfolio Interactif',
    description: 'Portfolio moderne avec animations 3D et interface utilisateur futuriste.',
    technologies: ['React', 'Three.js', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1760548425425-e42e77fa38f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NzMyMzE3NzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    liveDemo: '#',
    github: '#',
  },
  {
    id: 4,
    title: 'API REST Laravel',
    description: 'API RESTful complète avec authentification JWT et documentation Swagger.',
    technologies: ['Laravel', 'PHP', 'MySQL', 'JWT'],
    image: 'https://images.unsplash.com/photo-1760952851538-17a59f691efe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGklMjBkZXZlbG9wbWVudCUyMGNvZGluZ3xlbnwxfHx8fDE3NzMyMjI5MTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    liveDemo: '#',
    github: '#',
  },
];

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Mes <span className="text-neon">Projets</span>
          </h2>
          <div className="w-20 h-1 bg-[#87F414] mx-auto rounded-full" />
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Découvrez quelques-uns de mes projets récents qui démontrent mes compétences en développement full stack
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-strong rounded-2xl overflow-hidden border border-[#87F414]/20 hover:border-[#87F414]/50 transition-all duration-300 group"
            >
              {/* Project Image */}
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07141A] via-transparent to-transparent opacity-60" />
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#87F414] transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs rounded-full bg-[#1C3A40] text-[#87F414] border border-[#87F414]/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  <a
                    href={project.liveDemo}
                    className="flex items-center gap-2 px-4 py-2 bg-[#87F414] text-[#07141A] rounded-lg hover:neon-glow transition-all duration-300 flex-1 justify-center"
                  >
                    <ExternalLink size={18} />
                    <span>Démo Live</span>
                  </a>
                  <a
                    href={project.github}
                    className="flex items-center gap-2 px-4 py-2 glass rounded-lg hover:border-[#87F414] transition-all duration-300 flex-1 justify-center border border-[#87F414]/30"
                  >
                    <Github size={18} />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#0A6207]/5 rounded-full blur-3xl -z-10" />
    </section>
  );
}