import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Award, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const awards = {
  academic: [
    { title: 'Western Scholarship of Excellence', year: 'Awarded to the top 250 students entering Western University based on admission average' },
    { title: '4x Honour Roll with Distinction', year: 'Achieved an average of 90% or higher in all years of high school' },
    { title: 'Western Scholars', year: 'Part of the Western Scholars Program' },
  ],
  extracurricular: [
    { title: 'FIRST Robotics Awards', year: '2023 FIRST Robotics Provincial Finalist\nWon the 2023 Sandwich Off-Season event\nWon the Industrial Design award at the 2023 Windsor-Essex Great Lakes event' },
    { title: 'Masseyhacks 2nd Best Overall', year: 'Created CollisionTech with my team\nDeveloped a computer vision program to help vehicles detect and avoid obstacles' },
    { title: 'Masseyhacks Best Hardware', year: 'Created <a href="https://devpost.com/software/fourguys-mecanumbase" target="_blank" rel="noopener noreferrer" style="color: #22d3ee; text-decoration: underline; cursor: pointer;" onMouseEnter="this.style.color=\'#06b6d4\'" onMouseLeave="this.style.color=\'#22d3ee\'">FourGuys-MechanumBase</a> with my team\nAssembled a remote mechanum car\nCan be mounted with anything; we added a nerf turret!' },
  ],
  contest: [
    { title: 'UWaterloo CEMC Math Contests', year: 'Featured in Group V Honour roll in Hypatia 2024\nDistinction in Euclid 2024, Euclid 2025, and CSMC 2024\nTop 6% of scorers in Fermat 2024' },
    { title: 'UofT National Biology Competition', year: 'Scored in the top 10% of participants in the National Biology Competition, hosted by the University of Toronto' },
    { title: '"Reach for the Top" Provincials', year: 'Team ranked 1st in our region and represented our county at provincials in Toronto' },
  ],
};

const AwardItem = ({ award, index, isInView }: { award: typeof awards.academic[0]; index: number; isInView: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      key={award.title}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
      className="border border-slate-800 rounded-lg overflow-hidden hover:border-cyan-500/50 transition-colors"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-800/50 transition-colors"
      >
        <div className="flex items-start gap-3 text-left flex-1">
          <span className="text-cyan-500 mt-1 flex-shrink-0">•</span>
          <span className="text-slate-300">{award.title}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown size={20} className="text-cyan-500" />
        </motion.div>
      </button>
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden border-t border-slate-800"
      >
        <div className="px-4 py-3 bg-slate-900/30 text-slate-400 text-sm">
          <ul className="space-y-2">
            {award.year.split('\n').map((item, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="text-cyan-500 flex-shrink-0">•</span>
                <span dangerouslySetInnerHTML={{ __html: item.trim() }} />
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const AwardsSection = () => {
  const headerRef = useRef(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-100px' });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 100);
    }
  };

  return (
    <section id="awards" className="py-20 bg-slate-800/30">
      <div className="container mx-auto px-6">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-500 text-sm tracking-[0.3em] uppercase mb-4">
            Recognition
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-medium">
            Awards & <span className="italic text-slate-400">Achievements</span>
          </h2>
        </motion.div>

        {/* Scroll buttons for mobile/tablet */}
        <div className="flex justify-center gap-2 mb-6 md:hidden">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`p-2 rounded-lg border transition-all ${
              canScrollLeft
                ? 'border-cyan-500/50 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-500 cursor-pointer'
                : 'border-slate-700 bg-slate-900/30 text-slate-600 cursor-not-allowed opacity-50'
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`p-2 rounded-lg border transition-all ${
              canScrollRight
                ? 'border-cyan-500/50 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-500 cursor-pointer'
                : 'border-slate-700 bg-slate-900/30 text-slate-600 cursor-not-allowed opacity-50'
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div 
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="grid md:grid-cols-3 gap-8 overflow-x-auto md:overflow-x-visible pb-4"
          style={{ scrollBehavior: 'smooth' }}
        >
          {/* Academic Awards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-8 rounded-2xl border border-slate-800 bg-slate-900/50 hover:border-cyan-500/50 transition-colors"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-cyan-500/20">
                <Award className="text-cyan-500" size={24} />
              </div>
              <h3 className="font-display text-2xl font-medium">Academic</h3>
            </div>
            <ul className="space-y-3">
              {awards.academic.map((award, index) => (
                <AwardItem key={award.title} award={award} index={index} isInView={isHeaderInView} />
              ))}
            </ul>
          </motion.div>

          {/* Extracurricular Awards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 rounded-2xl border border-slate-800 bg-slate-900/50 hover:border-cyan-500/50 transition-colors"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-cyan-500/20">
                <Award className="text-cyan-500" size={24} />
              </div>
              <h3 className="font-display text-2xl font-medium">Extracurricular</h3>
            </div>
            <ul className="space-y-3">
              {awards.extracurricular.map((award, index) => (
                <AwardItem key={award.title} award={award} index={index} isInView={isHeaderInView} />
              ))}
            </ul>
          </motion.div>

          {/* Contest Awards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-8 rounded-2xl border border-slate-800 bg-slate-900/50 hover:border-cyan-500/50 transition-colors"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-cyan-500/20">
                <Award className="text-cyan-500" size={24} />
              </div>
              <h3 className="font-display text-2xl font-medium">Contest</h3>
            </div>
            <ul className="space-y-3">
              {awards.contest.map((award, index) => (
                <AwardItem key={award.title} award={award} index={index} isInView={isHeaderInView} />
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
