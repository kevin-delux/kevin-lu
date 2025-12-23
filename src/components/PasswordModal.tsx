import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, Mail, Linkedin, X } from 'lucide-react';

interface PasswordModalProps {
  isOpen: boolean;
  onUnlock: () => void;
}

export const PasswordModal = ({ isOpen, onUnlock }: PasswordModalProps) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showContactModal, setShowContactModal] = useState(false);

  const correctPassword = 'kevin2025'; // Change this to your desired password

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-950/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
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
