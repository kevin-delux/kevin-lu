import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { assetPath } from '../utils/assetPath';
import { Download } from 'lucide-react';

export const HeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-slate-800">
              <img
                src={assetPath('/images/not your average student researcher.webp')}
                alt="Portrait"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative frame */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-cyan-500/30 rounded-2xl -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-cyan-500 text-sm tracking-[0.3em] uppercase mb-4">
              About Me
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-medium mb-8">
              Not your Average Student Scientist!
            </h2>
            <div className="space-y-6 text-slate-400 font-body">
              <p>
                My interest in biomedical, particularly cancer-related research stems from a personal battle with childhood cancer. 
                During my 14th birthday, I was diagnosed with Stage IV Hodgekin's Lymphoma, which had metastasized to multiple lymph nodes, my chest, some bones and my legs.
                I underwent intensive chemotherapy and radiation therapy, which not only saved my life but also ignited a deep passion for understanding disease mechanisms and improving patient outcomes.
                That unfortunate but character-building experience is what drove me to pursuing a degree in Medical Sciences, with the hope of contributing to advancements in cancer research and treatment.
                I believe that I will greatly contribute to the scientific community and improve or even save the lives of those who need help the most, just like me only a couple years ago.
              </p>
            </div>
            <a
              href="https://drive.google.com/file/d/1pNh-qtKSs5XLMDiXTp7-94tKooxEBSz8/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold rounded-lg transition-colors duration-300"
            >
              <Download size={20} />
              Resume
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
