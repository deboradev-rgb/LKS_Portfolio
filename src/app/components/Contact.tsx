import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Mail, MapPin, Phone, Github, Linkedin, Send, X, Check } from 'lucide-react';
import { socialLinks } from '../data/portfolio-data';
import emailjs from '@emailjs/browser';

type ModalField = 'name' | 'email' | 'message' | null;

export function Contact() {
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [tempValue, setTempValue] = useState('');
  const [activeModal, setActiveModal] = useState<ModalField>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedFields, setCompletedFields] = useState<Set<string>>(new Set());

  // Initialiser EmailJS avec la clé publique
 useEffect(() => {
  console.log('Service ID:', import.meta.env.VITE_EMAILJS_SERVICE_ID);
  console.log('Admin Template ID:', 'template_k84u0q7');
  console.log('Auto-Reply Template ID:', 'auto_reply_debora');
  console.log('Public Key:', import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  
  emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
}, []);

  const handleOpenModal = (field: ModalField) => {
    if (field) {
      setTempValue(formData[field]);
      setActiveModal(field);
    }
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    setTempValue('');
  };

  const handleValidateField = () => {
    if (activeModal && validateField(activeModal, tempValue)) {
      setFormData({
        ...formData,
        [activeModal]: tempValue,
      });
      setCompletedFields(new Set([...completedFields, activeModal]));
      handleCloseModal();
    }
  };

  const validateField = (field: string, value: string): boolean => {
    switch (field) {
      case 'name':
        return value.trim().length >= 2;
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case 'message':
        return value.trim().length >= 10;
      default:
        return false;
    }
  };

  const getFieldError = (field: string, value: string): string => {
    switch (field) {
      case 'name':
        return value.trim().length < 2 ? 'Le nom doit contenir au moins 2 caractères' : '';
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value ? 'Email invalide' : '';
      case 'message':
        return value.trim().length < 10 ? 'Le message doit contenir au moins 10 caractères' : '';
      default:
        return '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (completedFields.size < 3) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    setIsSubmitting(true);

    try {
      // Préparer les paramètres du template
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: 'Admin', // Optionnel : le nom du destinataire
      };

      console.log('Envoi avec les paramètres:', templateParams);
      console.log('Service ID:', import.meta.env.VITE_EMAILJS_SERVICE_ID);
      console.log('Template ID:', import.meta.env.VITE_EMAILJS_TEMPLATE_ID);

      // Envoyer l'email
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams
      );

      console.log('Résultat:', result);

      if (result.status === 200) {
        alert('Merci pour votre message ! Je vous répondrai bientôt.');
        setFormData({ name: '', email: '', message: '' });
        setCompletedFields(new Set());
      }
    } catch (error) {
      console.error('Erreur complète:', error);
      alert('Une erreur est survenue. Veuillez réessayer plus tard.');
    } finally {
      setIsSubmitting(false);
    }
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

  const fields = [
    { id: 'name' as const, label: 'Nom complet', type: 'text', placeholder: 'Votre nom' },
    { id: 'email' as const, label: 'Email', type: 'email', placeholder: 'votre.email@exemple.com' },
    { id: 'message' as const, label: 'Message', type: 'textarea', placeholder: 'Votre message...' },
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
            Me <span className="text-[#87F414]">Contacter</span>
          </h2>
          <div className="w-20 h-1 bg-[#87F414] mx-auto rounded-full" />
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Cliquez sur chaque champ pour le remplir dans une fenêtre dédiée
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

            {/* Field Cards */}
            <div className="space-y-4 mb-8">
              {fields.map((field) => (
                <motion.div
                  key={field.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOpenModal(field.id)}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                    completedFields.has(field.id)
                      ? 'bg-gradient-to-r from-[#87F414]/20 to-transparent border-[#87F414]'
                      : 'bg-[#1C3A40]/30 border-[#87F414]/20 hover:border-[#87F414]/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">{field.label}</p>
                      <p className="text-white font-medium">
                        {formData[field.id] || 'Cliquez pour remplir'}
                      </p>
                    </div>
                    {completedFields.has(field.id) && (
                      <div className="w-8 h-8 rounded-full bg-[#87F414] flex items-center justify-center">
                        <Check size={20} className="text-[#07141A]" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || completedFields.size < 3}
              className="w-full px-6 py-4 bg-[#87F414] text-[#07141A] rounded-xl font-semibold neon-glow hover:neon-glow-strong transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
            </button>

            {/* Progress Indicator */}
            <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
              <span>Progression</span>
              <span className="text-[#87F414] font-semibold">
                {completedFields.size}/3 champs remplis
              </span>
            </div>
            <div className="w-full h-2 bg-[#1C3A40] rounded-full mt-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(completedFields.size / 3) * 100}%` }}
                className="h-full bg-gradient-to-r from-[#87F414] to-[#0A6207]"
              />
            </div>
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

      {/* Modal */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-strong rounded-2xl p-8 max-w-md w-full border border-[#87F414]/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-[#87F414]">
                  {fields.find(f => f.id === activeModal)?.label}
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-[#1C3A40] rounded-lg transition-colors"
                >
                  <X size={24} className="text-gray-400" />
                </button>
              </div>

              <div className="mb-6">
                {activeModal === 'message' ? (
                  <textarea
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    placeholder={fields.find(f => f.id === activeModal)?.placeholder}
                    rows={8}
                    className="w-full px-4 py-3 rounded-xl bg-[#1C3A40]/50 border border-[#87F414]/20 text-white focus:border-[#87F414] focus:outline-none focus:neon-glow transition-all duration-300 resize-none"
                    autoFocus
                  />
                ) : (
                  <input
                    type={fields.find(f => f.id === activeModal)?.type}
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    placeholder={fields.find(f => f.id === activeModal)?.placeholder}
                    className="w-full px-4 py-3 rounded-xl bg-[#1C3A40]/50 border border-[#87F414]/20 text-white focus:border-[#87F414] focus:outline-none focus:neon-glow transition-all duration-300"
                    autoFocus
                  />
                )}

                {getFieldError(activeModal, tempValue) && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-400 text-sm mt-2"
                  >
                    {getFieldError(activeModal, tempValue)}
                  </motion.p>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-3 bg-[#1C3A40] text-white rounded-xl font-semibold hover:bg-[#2C4A50] transition-all duration-300"
                >
                  Annuler
                </button>
                <button
                  onClick={handleValidateField}
                  disabled={!validateField(activeModal, tempValue)}
                  className="flex-1 px-6 py-3 bg-[#87F414] text-[#07141A] rounded-xl font-semibold hover:neon-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Check size={20} />
                  Valider
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#87F414]/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0A6207]/5 rounded-full blur-3xl -z-10" />
    </section>
  );
}