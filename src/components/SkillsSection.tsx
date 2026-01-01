import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Code, Palette, Smartphone, Zap, ChevronDown } from 'lucide-react';

const skills = [
  {
    icon: Code,
    title: 'Collaboration',
    bulletPoints: [
      'Chess Teacher/Certified After-School Tutor for 3 years',
      'Strong teamwork across multidisciplinary projects',
      'Adaptable to novel research environments',
    ],
    technologies: ['Teamwork', 'Adaptability', 'Problem Solving', 'Resilience'],
  },
  {
    icon: Palette,
    title: 'Leadership',
    bulletPoints: [
      'Helped host the annual Children\'s Holiday Party at high school',
      'Lead initiatives in event outreach for BMSA\'s "Prof Panel" Event',
      'Mentor and support peer researchers',
    ],
    technologies: ['Flexibility', 'Quick-Thinking', 'Empathy', 'Vision'],
  },
  {
    icon: Smartphone,
    title: 'Scientific Communication',
    bulletPoints: [
      'Compiled research data using R on measles-vaccine correlation',
      'Presented findings at local symposium to panel of judges',
      '100% Lab grade in Year 1 lab courses',
    ],
    technologies: ['Rigour', 'Writing', 'Data Management', 'Patience'],
  },
  {
    icon: Zap,
    title: '3D Design & Software',
    bulletPoints: [
      'Creating detailed 3D models for hardware projects',
      'Proficient in CAD and 3D printing technologies',
      'Check out some of my projects!',
    ],
    technologies: ['AutoCAD', '3D Printing', 'Creativity', 'Visualization'],
    projects: [
      { name: 'FourGuys-MechanumBase', url: 'https://devpost.com/software/fourguys-mecanumbase' },
      { name: 'PulseAI', url: 'https://devpost.com/software/pulseai-quk5oc' },
      { name: 'CollisionTech', url: 'https://devpost.com/software/testingtechnologies' },
    ],
  },
];

const SkillCard = ({ skill, index, isInView }: { skill: typeof skills[0]; index: number; isInView: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      key={skill.title}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 text-left"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
              <skill.icon className="text-cyan-500" size={24} />
            </div>
            <div>
              <h3 className="font-display text-xl font-medium">{skill.title}</h3>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="text-cyan-500" size={24} />
          </motion.div>
        </div>
      </button>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-6 bg-slate-900/50 border border-t-0 border-slate-800 rounded-b-2xl space-y-4">
          <ul className="space-y-3">
            {'bulletPoints' in skill && skill.bulletPoints.map((point, idx) => (
              <li key={idx} className="flex gap-3 text-slate-300 text-sm">
                <span className="text-cyan-500 font-semibold mt-0.5">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
          
          {'projects' in skill && skill.projects && (
            <div className="pt-2 space-y-2 border-t border-slate-700">
              <p className="text-cyan-400 text-xs font-semibold uppercase tracking-wide">Projects</p>
              <div className="flex flex-col gap-2">
                {skill.projects.map((project) => (
                  <a
                    key={project.name}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 text-sm underline transition-colors"
                  >
                    → {project.name}
                  </a>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex flex-wrap gap-2 pt-2">
            {skill.technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs px-3 py-1.5 rounded-full bg-slate-800 text-cyan-400 border border-cyan-500/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-12">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-500 text-sm tracking-[0.3em] uppercase mb-4">
            Expertise
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-medium">
            Skills & <span className="italic text-slate-400">Capabilities</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {skills.map((skill, index) => (
            <SkillCard key={skill.title} skill={skill} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};
