import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, MapPin, Phone, Linkedin } from 'lucide-react';

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [showPopup, setShowPopup] = useState<string | null>(null);

  const contactLinks = [
    { 
      icon: Mail, 
      label: 'Email', 
      value: 'kevin.y.lu2007[at]gmail[dot]com',
      href: 'mailto:kevin.y.lu2007@gmail.com',
      color: 'hover:text-cyan-400'
    },
    { 
      icon: Phone, 
      label: 'Phone', 
      value: 'Available upon request. Please email me.',
      href: '#',
      color: 'hover:text-cyan-400'
    },
    { 
      icon: MapPin, 
      label: 'Location', 
      value: 'Southwestern Ontario',
      href: '#',
      color: 'hover:text-cyan-400'
    },
    { 
      icon: Linkedin, 
      label: 'LinkedIn', 
      href: 'https://www.linkedin.com/in/kevin-lu-434568273/',
      color: 'hover:text-blue-400',
      external: true
    },
  ];

  const handleClick = (e: React.MouseEvent, label: string) => {
    if (label === 'Email' || label === 'Location' || label === 'Phone') {
      e.preventDefault();
      setShowPopup(showPopup === label ? null : label);
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-800/30">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-500 text-sm tracking-[0.3em] uppercase mb-4">
            Get in Touch
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-medium">
            Contact <span className="italic text-slate-400">Information</span>
          </h2>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center items-center gap-8 relative min-h-32"
          >
            {contactLinks.map((link, index) => (
              <div key={link.label} className="relative flex justify-center">
                <motion.a
                  href={link.href}
                  onClick={(e) => handleClick(e, link.label)}
                  target={'external' in link && link.external ? '_blank' : undefined}
                  rel={'external' in link && link.external ? 'noopener noreferrer' : undefined}
                  aria-label={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 transition-all duration-300 group hover:border-cyan-500/50 hover:bg-slate-800/50"
                >
                  <link.icon size={28} className={`${link.color} transition-colors`} />
                </motion.a>
                
                {/* Popup for Email, Phone, Location */}
                {showPopup === link.label && 'value' in link && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -10 }}
                    className="absolute top-24 px-4 py-2 bg-slate-900 border border-cyan-500/50 rounded-lg text-cyan-400 text-sm font-medium whitespace-nowrap shadow-lg"
                  >
                    {link.value}
                  </motion.div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
