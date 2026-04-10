import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Briefcase, Mail } from 'lucide-react';

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // États pour l'animation du prénom
  const [displayedFirstName, setDisplayedFirstName] = useState('');
  const fullFirstName = "Débora Conceptia";
  
  // États pour l'animation du nom de famille
  const [displayedLastName, setDisplayedLastName] = useState('');
  const fullLastName = "LOKOSSOU";
  
  // États pour l'animation des titres
  const titles = [
    "Développeuse Full Stack",
    "Développeuse Passionnée",
    "Développeuse Créative",
    "Développeuse Innovante"
  ];
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 5;

    // Create Particle System
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.015,
      color: 0x87F414,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      particlesMesh.rotation.y += 0.0005;
      particlesMesh.rotation.x += 0.0002;
      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  // Animation du prénom lettre par lettre
  useEffect(() => {
    if (displayedFirstName.length < fullFirstName.length) {
      const timeout = setTimeout(() => {
        setDisplayedFirstName(fullFirstName.slice(0, displayedFirstName.length + 1));
      }, 80);
      return () => clearTimeout(timeout);
    }
  }, [displayedFirstName, fullFirstName]);

  // Animation du nom de famille (commence après le prénom)
  useEffect(() => {
    if (displayedFirstName.length === fullFirstName.length) {
      if (displayedLastName.length < fullLastName.length) {
        const timeout = setTimeout(() => {
          setDisplayedLastName(fullLastName.slice(0, displayedLastName.length + 1));
        }, 80);
        return () => clearTimeout(timeout);
      }
    }
  }, [displayedFirstName, displayedLastName, fullFirstName, fullLastName]);

  // Animation des titres (typewriter avec boucle)
  useEffect(() => {
    // Attendre que le nom complet soit affiché avant de commencer les titres
    if (displayedLastName.length < fullLastName.length) return;
    
    const currentTitle = titles[currentTitleIndex];
    
    if (!isDeleting) {
      // Mode écriture
      if (displayedTitle.length < currentTitle.length) {
        const timeout = setTimeout(() => {
          setDisplayedTitle(currentTitle.slice(0, displayedTitle.length + 1));
        }, 80);
        return () => clearTimeout(timeout);
      } else {
        // Une fois le titre complet, attendre 2 secondes puis effacer
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      // Mode effacement
      if (displayedTitle.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedTitle(currentTitle.slice(0, displayedTitle.length - 1));
        }, 40);
        return () => clearTimeout(timeout);
      } else {
        // Une fois effacé, passer au titre suivant
        setIsDeleting(false);
        setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
      }
    }
  }, [displayedTitle, isDeleting, currentTitleIndex, titles, displayedLastName, fullLastName]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };


  const handleDownloadCV = () => {
  const cvUrl = '/CV_Conceptia_LOKOSSOU.pdf';  // Le / fait référence à public/
  const link = document.createElement('a');
  link.href = cvUrl;
  link.download = 'CV_Conceptia_LOKOSSOU.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Three.js Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'radial-gradient(circle at center, #0B340F 0%, #07141A 100%)' }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Titre avec animation typewriter - CENTRALISÉ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center"
          >
            <div className="h-12 mb-6 flex items-center justify-center">
              <p className="text-[#87F414] tracking-widest uppercase text-sm sm:text-base md:text-lg font-mono">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={displayedTitle}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="inline-block"
                  >
                    {displayedTitle}
                    <span className="animate-pulse ml-1 text-[#87F414]">|</span>
                  </motion.span>
                </AnimatePresence>
              </p>
            </div>

            {/* Nom complet avec animation lettre par lettre - CENTRALISÉ */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white flex flex-col items-center justify-center space-y-4">
              {/* Prénom avec animation */}
              <span className="block text-white">
                {displayedFirstName}
                {displayedFirstName.length < fullFirstName.length && (
                  <span className="animate-pulse ml-1 text-[#87F414]">|</span>
                )}
              </span>
              
              {/* Nom de famille avec animation et effet néon */}
              <span className="text-neon block font-mono tracking-wider text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
                {displayedLastName}
                {displayedLastName.length < fullLastName.length && (
                  <span className="animate-pulse ml-1 text-[#87F414]">|</span>
                )}
              </span>
            </h1>

            {/* Description avec animation */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: displayedLastName.length === fullLastName.length ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto px-4"
            >
              Je conçois des sites web modernes, évolutives et élégantes.
            </motion.p>
          </motion.div>

          {/* Boutons avec apparition progressive */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: displayedLastName.length === fullLastName.length ? 1 : 0,
              y: displayedLastName.length === fullLastName.length ? 0 : 20 
            }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center px-4"
          >
            <button
              onClick={() => scrollToSection('projects')}
              className="glass-strong px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-white hover:neon-glow transition-all duration-300 flex items-center justify-center gap-2 border border-[#87F414]/30 hover:border-[#87F414] text-sm sm:text-base"
            >
              <Briefcase size={18} className="sm:w-5 sm:h-5" />
              Voir mes Projets
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-[#87F414] px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-[#07141A] font-semibold neon-glow hover:neon-glow-strong transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Mail size={18} className="sm:w-5 sm:h-5" />
              Me Contacter
            </button>
           
<button 
  onClick={handleDownloadCV}
  className="glass px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-white hover:border-[#87F414] transition-all duration-300 flex items-center justify-center gap-2 border border-[#87F414]/20 text-sm sm:text-base"
>
  <Download size={18} className="sm:w-5 sm:h-5" />
  Télécharger CV
</button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: displayedLastName.length === fullLastName.length ? 1 : 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-[#87F414]/50 rounded-full flex justify-center p-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-[#87F414] rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#07141A] pointer-events-none" />
    </section>
  );
}