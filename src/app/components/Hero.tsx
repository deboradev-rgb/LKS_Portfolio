import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'motion/react';
import { Download, Briefcase, Mail } from 'lucide-react';

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    // Create connecting lines
    const linesGeometry = new THREE.BufferGeometry();
    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0x87F414,
      transparent: true,
      opacity: 0.1,
    });

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Rotate particles
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#87F414] mb-4 tracking-widest uppercase text-xs sm:text-sm">
              Développeuse Full Stack
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
              Débora Conceptia{' '}
              <span className="text-neon block mt-2">LOKOSSOU</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
              Je conçois des applications web modernes, évolutives et élégantes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
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
            <button className="glass px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-white hover:border-[#87F414] transition-all duration-300 flex items-center justify-center gap-2 border border-[#87F414]/20 text-sm sm:text-base">
              <Download size={18} className="sm:w-5 sm:h-5" />
              Télécharger CV
            </button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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