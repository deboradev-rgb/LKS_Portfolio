import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import kalan from '../../assets/kalan.png';
import kalan1 from '../../assets/kalan1.png';
import ajecb from '../../assets/ajecb.png';
import vibecro from '../../assets/vibecro.PNG';
import vibecro1 from '../../assets/vibecro1.png';
import crea from '../../assets/crea.png';
import crea1 from '../../assets/crea1.png';
import Borah from '../../assets/Borah.png';

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Plateforme e-commerce moderne avec panier d\'achat, gestion des commandes et paiement en ligne.',
    technologies: ['React', 'TypeScript', 'Laravel', 'Tailwind CSS'],
    images: [kalan, kalan1], // Changé en tableau d'images
    liveDemo: 'https://Kalan-mali.com',
    github: 'https://github.com/ezeckiel004/kalan',
  },
  {
    id: 2,
    title: 'Application de Gestion',
    description: 'Système de gestion complet pour les entreprises avec tableau de bord analytique.',
    technologies: ['React', 'TypeScript', 'PHP', 'MySQL'],
    images: [ajecb],
    liveDemo: 'https://Ajecb.com',
    github: 'https://github.com/deboradev-rgb/Ajecb.app',
  },
  {
    id: 3,
    title: 'Portfolio Interactif',
    description: 'Portfolio moderne avec animations 3D et interface utilisateur futuriste.',
    technologies: ['React', 'Three.js', 'Tailwind CSS'],
    images: [crea, crea1, Borah],
    liveDemo: 'https://jojo-creative.vercel.app',
    github: 'https://github.com/deboradev-rgb/JojoCreative',
  },
  {
    id: 4,
    title: 'API REST Laravel',
    description: 'API RESTful complète avec authentification JWT et documentation Swagger.',
    technologies: ['Laravel', 'PHP', 'MySQL', 'JWT'],
    images: [vibecro, vibecro1], // Changé en tableau d'images
    liveDemo: 'https://newvibecroapi.vibecro.com/',
    github: 'https://github.com/deboradev-rgb/vibecro-api',
  },
];

function ProjectImage({ images, title }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return; // Pas de défilement si une seule image

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change d'image toutes les 3 secondes

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-64 overflow-hidden">
      {images.map((img, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: index === currentImageIndex ? 1 : 0,
            scale: index === currentImageIndex ? 1 : 1.1
          }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <ImageWithFallback
            src={img}
            alt={`${title} - Image ${index + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </motion.div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-[#07141A] via-transparent to-transparent opacity-60" />
      
      {/* Indicateurs de pagination */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'w-6 bg-[#87F414]' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Voir image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

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
              {/* Project Image avec défilement */}
              <ProjectImage images={project.images} title={project.title} />

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