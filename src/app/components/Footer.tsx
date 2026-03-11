import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 sm:py-8 px-4 sm:px-6 border-t border-[#87F414]/20 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-gray-400 text-sm flex items-center gap-2"
          >
            © {currentYear} Débora Conceptia LOKOSSOU. Tous droits réservés.
          </motion.p>

          {/* Made with love */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-400 text-sm flex items-center gap-2"
          >
            Conçu avec <Heart className="w-4 h-4 text-[#87F414] fill-[#87F414] animate-pulse" /> et Code
          </motion.p>

          {/* Back to top */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-[#87F414] hover:text-white transition-colors duration-300 text-sm"
          >
            ↑ Retour en haut
          </motion.button>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-[#87F414]/50 to-transparent" />
    </footer>
  );
}