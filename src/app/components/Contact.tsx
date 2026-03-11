import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Mail, MapPin, Phone, Github, Linkedin, Send } from 'lucide-react';
import { socialLinks } from '../data/portfolio-data';

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert('Merci pour votre message ! Je vous répondrai bientôt.');
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: socialLinks.email,
      href: `mailto:${socialLinks.email}`,
    },
    {
      icon: Phone,
      label: 'WhatsApp',
      value: '+229 XX XX XX XX',
      href: socialLinks.whatsapp,
    },
    {
      icon: MapPin,
      label: 'Localisation',
      value: 'Cotonou, Bénin',
      href: '#',
    },
  ];

  const socialMedia = [
    {
      icon: Github,
      label: 'GitHub',
      href: socialLinks.github,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: socialLinks.linkedin,
    },
  ];

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Me <span className="text-neon">Contacter</span>
          </h2>
          <div className="w-20 h-1 bg-[#87F414] mx-auto rounded-full" />
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            N'hésitez pas à me contacter pour discuter de votre projet ou pour toute question
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-strong rounded-2xl p-8 border border-[#87F414]/20"
          >
            <h3 className="text-2xl font-bold mb-6 text-[#87F414]">Envoyez-moi un message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#1C3A40]/50 border border-[#87F414]/20 text-white focus:border-[#87F414] focus:outline-none focus:neon-glow transition-all duration-300"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#1C3A40]/50 border border-[#87F414]/20 text-white focus:border-[#87F414] focus:outline-none focus:neon-glow transition-all duration-300"
                  placeholder="votre.email@exemple.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-white mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl bg-[#1C3A40]/50 border border-[#87F414]/20 text-white focus:border-[#87F414] focus:outline-none focus:neon-glow transition-all duration-300 resize-none"
                  placeholder="Votre message..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-4 bg-[#87F414] text-[#07141A] rounded-xl font-semibold neon-glow hover:neon-glow-strong transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="glass-strong rounded-2xl p-8 border border-[#87F414]/20">
              <h3 className="text-2xl font-bold mb-6 text-[#87F414]">Informations de contact</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-[#1C3A40]/30 border border-[#87F414]/10 hover:border-[#87F414]/50 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#87F414] to-[#0A6207] flex items-center justify-center group-hover:neon-glow transition-all duration-300">
                      <info.icon className="w-6 h-6 text-[#07141A]" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">{info.label}</p>
                      <p className="text-white font-medium">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="glass-strong rounded-2xl p-8 border border-[#87F414]/20">
              <h3 className="text-2xl font-bold mb-6 text-[#87F414]">Réseaux sociaux</h3>
              <div className="flex gap-4">
                {socialMedia.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#87F414] to-[#0A6207] flex items-center justify-center hover:neon-glow-strong transition-all duration-300"
                  >
                    <social.icon className="w-7 h-7 text-[#07141A]" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="glass rounded-2xl p-6 border border-[#87F414]/20"
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-[#87F414] rounded-full animate-pulse neon-glow" />
                <p className="text-white">Disponible pour de nouvelles opportunités</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#87F414]/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0A6207]/5 rounded-full blur-3xl -z-10" />
    </section>
  );
}