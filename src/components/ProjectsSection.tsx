import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { assetPath } from '../utils/assetPath';

const projects = [
  {
    title: 'BMSA Charity Executive',
    category: 'Leadership',
    description: 'Leading charitable initiatives and community engagement programs.',
    image: assetPath('/images/kevin-portrait.png'),
    images: [
      assetPath('/images/kevin-portrait.png'),
      assetPath('/images/bmsa-booth.png'),
      assetPath('/images/team-photo.png'),
    ],
    link: 'https://linktr.ee/bmsawestern?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGng-akPA4MoYBOvadDBvvpgAZGE74iZs065V_mG0DFO0qx7pZdEhCL5jQCL9o_aem_T9ZDRKAoL8XSSAXuiu8Trg',
  },
  {
    title: 'Children\'s Holiday Party (CHP) Host',
    category: 'Community',
    description: 'Organizing and hosting annual holiday celebration events for students.',
    image: assetPath('/images/gift wrapping.webp'),
    noImages: true,
    link: 'https://linktr.ee/masseychp?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGndmNEsmquR0wzsSVcGqdTnPBU2jX2La3yrfRJJhVpTxF6fxQuIRF0x1kr5hQ_aem_HtvAjonaUsHDsvG_VXq_sA',
  },
  {
    title: 'FIRST Robotics Design Team Leader',
    category: 'Engineering',
    description: 'Leading robotic design and innovation projects with team collaboration.',
    image: assetPath('/images/frc0.webp'),
    images: [
      assetPath('/images/frc0.webp'),
      assetPath('/images/frc1.webp'),
      assetPath('/images/frc2.jpg'),
    ],
  },
  {
    title: 'SSC Charity Committee',
    category: 'Volunteering',
    description: 'Organizing charitable events and community support initiatives.',
    image: assetPath('/images/ssc letters to veterans.jpg'),
    images: [
      assetPath('/images/ssc letters to veterans.jpg'),
    ],
  },
];

const PhotoGallery = ({ images, isOpen, onClose, title, noImages }: { images?: string[]; isOpen: boolean; onClose: () => void; title: string; noImages?: boolean }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => images && setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => images && setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-950/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="w-full max-w-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 text-slate-400 hover:text-cyan-500 transition-colors"
          >
            <X size={32} />
          </button>

          <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800">
            {noImages ? (
              <div className="relative bg-slate-800 flex items-center justify-center w-full p-12" style={{ aspectRatio: '4/3', maxHeight: '70vh' }}>
                <div className="text-center space-y-4">
                  <p className="text-slate-300 text-lg leading-relaxed">
                    No images for CHP, as the children I were responsible for did not have photo consent from guardians.
                  </p>
                  <p className="text-cyan-400 font-medium">
                    Ask me more about this event!
                  </p>
                </div>
              </div>
            ) : (
              <div className="relative bg-slate-800 flex items-center justify-center w-full" style={{ aspectRatio: '4/3', maxHeight: '70vh' }}>
                <img
                  src={images![currentIndex]}
                  alt={`${title} - ${currentIndex + 1}`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            )}

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl font-medium text-slate-100">{title}</h3>
                {!noImages && (
                  <span className="text-slate-400 text-sm">
                    {currentIndex + 1} / {images?.length}
                  </span>
                )}
              </div>

              {!noImages && (
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={prev}
                    className="p-3 rounded-full bg-slate-800 hover:bg-cyan-600/20 border border-slate-700 hover:border-cyan-500 transition-all text-slate-400 hover:text-cyan-500"
                  >
                    <ChevronLeft size={24} />
                  </button>

                  <div className="flex gap-2">
                    {images?.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === currentIndex ? 'bg-cyan-500 w-8' : 'bg-slate-600'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={next}
                    className="p-3 rounded-full bg-slate-800 hover:bg-cyan-600/20 border border-slate-700 hover:border-cyan-500 transition-all text-slate-400 hover:text-cyan-500"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [galleryOpen, setGalleryOpen] = useState(false);

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="group cursor-pointer"
      >
        <div
          onClick={() => setGalleryOpen(true)}
          className="relative overflow-hidden rounded-xl aspect-[4/3] bg-slate-800 mb-6"
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              whileHover={{ scale: 1.1 }}
              className="w-16 h-16 rounded-full bg-cyan-600 flex items-center justify-center"
            >
              <ArrowUpRight className="text-slate-950" size={24} />
            </motion.div>
          </div>
        </div>
        <p className="text-cyan-500 text-xs tracking-[0.2em] uppercase mb-2">
          {project.category}
        </p>
        <h3 className="font-display text-2xl font-medium mb-3 group-hover:text-cyan-500 transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-3">
          {project.description}
        </p>
        {'link' in project && project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
          >
            Learn More <ArrowUpRight size={16} />
          </a>
        )}
      </motion.div>
      <PhotoGallery
        images={project.images}
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        title={project.title}
        noImages={project.noImages}
      />
    </>
  );
};

export const ProjectsSection = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-100px' });

  return (
    <section id="work" className="py-20 bg-slate-800/30\">
      <div className="container mx-auto px-6">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-500 text-sm tracking-[0.3em] uppercase mb-4">
            Selected Work
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-medium">
            Background <span className="italic text-slate-400">Experiences</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
