import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import { Button } from './ui/button';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Experiences', href: '#work' },
  { name: 'Skills', href: '#skills' },
  { name: 'Awards', href: '#awards' },
  { name: 'Contact', href: '#contact' },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-950/80 backdrop-blur-lg border-b border-slate-800' : ''
      }`}
    >
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="font-display text-2xl font-semibold tracking-tight">
          Kevin Lu<span className="text-cyan-500">.</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-body text-sm text-slate-400 hover:text-slate-100 transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
          <Button 
            variant="hero" 
            size="sm"
            onClick={() => setShowContactModal(true)}
          >
            Let's Talk
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-100"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="md:hidden overflow-hidden bg-slate-950 border-b border-slate-800"
      >
        <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="font-body text-lg text-slate-400 hover:text-slate-100 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <Button 
            variant="hero" 
            className="w-full mt-2"
            onClick={() => {
              setShowContactModal(true);
              setIsOpen(false);
            }}
          >
            Let's Talk
          </Button>
        </div>
      </motion.div>

      {/* Contact Modal */}
      <AnimatePresence>
        {showContactModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowContactModal(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-sm w-full mx-4"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-display font-semibold">Contact Info</h3>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="text-slate-400 hover:text-slate-100"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <a
                  href="mailto:kevin.y.lu2007@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors group"
                >
                  <Mail className="text-cyan-400 flex-shrink-0" size={24} />
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Email</p>
                    <p className="text-sm font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors">kevin.y.lu2007[at]gmail[dot]com</p>
                  </div>
                </a>

                <div
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50"
                >
                  <Phone className="text-cyan-400 flex-shrink-0" size={24} />
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Phone</p>
                    <p className="text-sm font-semibold text-slate-100">Available upon request. Please email me.</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50">
                  <MapPin className="text-cyan-400 flex-shrink-0" size={24} />
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Location</p>
                    <p className="text-sm font-semibold text-slate-100">Southwestern Ontario</p>
                  </div>
                </div>

                <a
                  href="https://www.linkedin.com/in/kevin-lu-434568273/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors group"
                >
                  <Linkedin className="text-blue-400 flex-shrink-0" size={24} />
                  <div>
                    <p className="text-xs text-slate-400 font-medium">LinkedIn - Connect with Me!</p>
                    <p className="text-sm font-semibold text-slate-100 group-hover:text-blue-400 transition-colors">Kevin Lu</p>
                  </div>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
