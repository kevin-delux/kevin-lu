import { motion } from 'framer-motion';
import { assetPath } from '../utils/assetPath';

export const LandingSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-950 to-slate-900/20" />
      
      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 2 }}
        className="absolute top-20 right-20 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-teal-500/10 blur-3xl"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Text content */}
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-cyan-500 text-xs tracking-[0.4em] uppercase font-semibold mb-6"
            >
              Hi! I'm
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-display text-7xl md:text-8xl font-bold leading-[0.95] tracking-tight mb-4"
            >
              Kevin Lu
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-3 mb-8"
            >
              <p className="text-xl md:text-2xl text-slate-200 font-medium">
                Medical Sciences Student @ Western University
              </p>
              <p className="text-xl md:text-2xl text-cyan-400 font-semibold">
                Aspiring Biomedical Researcher
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed"
            >
              Medical Sciences student focused on conducting deep research on disease mechanisms, with growing interest in cancer research.
            </motion.p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-slate-800/50">
              {[
                { number: '4.0/4.0', label: 'GPA (to date)' },
                { number: '2029', label: 'Expected Graduation' },
                { number: 'Top 250', label: 'Class of \'29 Rank', noWrap: true },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  className="group"
                >
                  <p className="font-display text-4xl md:text-5xl font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors whitespace-nowrap">
                    {stat.number}
                  </p>
                  <p className="text-xs md:text-sm text-slate-400 mt-2 font-medium tracking-wide">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-slate-800">
              <img
                src={assetPath('/images/new landing.png')}
                alt="Kevin Lu"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative frame */}
            <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-cyan-500/30 rounded-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
