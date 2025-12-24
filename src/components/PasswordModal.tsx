import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, Mail, Linkedin, X, Microscope, Dna, Heart, Beaker, Pill } from 'lucide-react';

interface PasswordModalProps {
  isOpen: boolean;
  onUnlock: () => void;
}

export const PasswordModal = ({ isOpen, onUnlock }: PasswordModalProps) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showContactModal, setShowContactModal] = useState(false);

  const correctPassword = 'kevin2026'; // Change this to your desired password

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setError('');
      onUnlock();
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  if (!isOpen) return null;

  // Biomedical icons for floating animation
  const floatingIcons = [
    { icon: Microscope, delay: 0, x: '8%', y: '12%' },
    { icon: Dna, delay: 0.4, x: '88%', y: '18%' },
    { icon: Heart, delay: 0.8, x: '12%', y: '82%' },
    { icon: Beaker, delay: 1.2, x: '82%', y: '78%' },
    { icon: Pill, delay: 1.6, x: '50%', y: '5%' },
    { icon: Microscope, delay: 2, x: '72%', y: '45%' },
    { icon: Dna, delay: 2.4, x: '28%', y: '50%' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-950/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-hidden"
    >
      {/* Starry background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              opacity: Math.random() * 0.7 + 0.3,
            }}
            animate={{
              opacity: [Math.random() * 0.5 + 0.2, Math.random() * 0.8 + 0.3, Math.random() * 0.5 + 0.2],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Floating biomedical icons background */}
      {floatingIcons.map((item, idx) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: item.delay }}
            className="absolute pointer-events-auto cursor-pointer"
            style={{ left: item.x, top: item.y }}
            whileHover={{ opacity: 1, transition: { duration: 0 } }}
          >
            <motion.div
              animate={{
                y: [0, -40, 0],
                x: [0, 20, -20, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8 + item.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              whileHover={{
                scale: 1.3,
                transition: { duration: 0 }
              }}
            >
              <Icon size={52} className="text-cyan-400" strokeWidth={1.2} style={{ filter: 'drop-shadow(0 0 15px rgba(34, 211, 238, 0.8)) drop-shadow(0 0 30px rgba(34, 211, 238, 0.6)) drop-shadow(0 0 45px rgba(34, 211, 238, 0.4))', transition: 'all 0s ease' }} />
            </motion.div>
          </motion.div>
        );
      })}

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8 space-y-6">
          {/* Lock Icon */}
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-cyan-500/20 border border-cyan-500/50">
              <Lock className="text-cyan-500" size={32} />
            </div>
          </div>

          {/* Title */}
          <div className="text-center">
            <h2 className="font-display text-2xl font-semibold text-slate-100 mb-2">
              Welcome to Kevin Lu!
            </h2>
            <p className="text-slate-400">
              Please enter the password to unlock my full potential.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors pr-12"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              className="w-full px-4 py-3 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold rounded-lg transition-colors duration-300"
            >
              Unlock
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-xs text-slate-500">
            <button
              onClick={() => setShowContactModal(true)}
              className="text-cyan-400 hover:text-cyan-300 transition-colors underline"
            >
              Contact Kevin for access
            </button>
          </p>

          {/* Contact Modal */}
          {showContactModal && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 bg-slate-950/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowContactModal(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8 space-y-6 max-w-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl font-semibold text-slate-100">Contact Me</h3>
                  <button
                    onClick={() => setShowContactModal(false)}
                    className="text-slate-400 hover:text-slate-300 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Email */}
                  <a
                    href="mailto:kevin.y.lu2007@gmail.com"
                    className="flex items-center gap-4 p-4 rounded-lg border border-slate-700 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all group"
                  >
                    <Mail className="text-cyan-500 flex-shrink-0 group-hover:scale-110 transition-transform" size={24} />
                    <div>
                      <p className="text-sm font-medium text-slate-100">Email</p>
                      <p className="text-xs text-slate-400">kevin.y.lu2007[at]gmail[dot]com</p>
                    </div>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/kevin-lu-434568273/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-lg border border-slate-700 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all group"
                  >
                    <Linkedin className="text-blue-400 flex-shrink-0 group-hover:scale-110 transition-transform" size={24} />
                    <div>
                      <p className="text-sm font-medium text-slate-100">LinkedIn</p>
                      <p className="text-xs text-slate-400">Connect with me</p>
                    </div>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
