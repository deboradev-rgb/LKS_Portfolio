import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X, Sparkles } from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Accueil', href: '#hero' },
    { label: 'À Propos', href: '#about' },
    { label: 'Compétences', href: '#skills' },
    { label: 'Projets', href: '#projects' },
    { label: 'Expérience', href: '#experience' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
    setActiveSection(href.replace('#', ''));
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-strong py-4 shadow-lg shadow-[#87F414]/10' : 'py-6'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Logo LKS - Modern & Animated */}
          <motion.button
            onClick={() => scrollToSection('#hero')}
            whileHover={{ scale: 1.05 }}
            className="relative group cursor-pointer -ml-2 md:ml-0"
          >
            <div className="flex items-center gap-1">
              {/* L */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <span className="text-3xl font-bold text-white group-hover:text-[#87F414] transition-colors duration-300">
                  L
                </span>
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#87F414]"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                />
              </motion.div>

              {/* K with neon effect */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative mx-1"
              >
                <span className="text-3xl font-bold text-neon neon-glow">K</span>
                <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-[#87F414] animate-pulse" />
              </motion.div>

              {/* S */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative"
              >
                <span className="text-3xl font-bold text-white group-hover:text-[#87F414] transition-colors duration-300">
                  S
                </span>
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#87F414]"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                />
              </motion.div>
            </div>

            {/* Decorative box around logo */}
            <motion.div
              className="absolute inset-0 -m-2 border border-[#87F414]/0 rounded-lg group-hover:border-[#87F414]/50 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
            />

            {/* Rotating border effect */}
            <div className="absolute inset-0 -m-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#87F414] rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#87F414] rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#87F414] rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#87F414] rounded-br-lg" />
            </div>
          </motion.button>

          {/* Desktop Menu - Modern Pills */}
          <div className="hidden md:flex items-center gap-2 glass rounded-full px-4 py-2 ml-auto">
            {menuItems.map((item, index) => (
              <motion.button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative ${
                  activeSection === item.href.replace('#', '')
                    ? 'bg-[#87F414] text-[#07141A] neon-glow'
                    : 'text-gray-300 hover:text-white hover:bg-[#1C3A40]/50'
                }`}
              >
                {item.label}
                {activeSection === item.href.replace('#', '') && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 bg-[#87F414] rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button - Futuristic */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            className="md:hidden relative w-12 h-12 rounded-xl glass-strong flex items-center justify-center border border-[#87F414]/30 hover:border-[#87F414] transition-all duration-300"
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMobileMenuOpen ? (
                <X size={24} className="text-[#87F414]" />
              ) : (
                <Menu size={24} className="text-white" />
              )}
            </motion.div>
            {isMobileMenuOpen && (
              <motion.div
                className="absolute inset-0 rounded-xl neon-glow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu - Enhanced */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 glass-strong rounded-2xl p-2 border border-[#87F414]/20 overflow-hidden"
          >
            {menuItems.map((item, index) => (
              <motion.button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ x: 5 }}
                className={`block w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                  activeSection === item.href.replace('#', '')
                    ? 'bg-[#87F414] text-[#07141A] neon-glow'
                    : 'text-gray-300 hover:text-white hover:bg-[#1C3A40]/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{item.label}</span>
                  {activeSection === item.href.replace('#', '') && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 rounded-full bg-[#07141A]"
                    />
                  )}
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}