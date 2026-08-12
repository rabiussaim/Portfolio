import { useEffect, useRef, useState } from 'react';
import { ExternalLink, GitFork, FileText, Brain, Layout, Zap } from 'lucide-react';

function useInView(ref, threshold = 0.1) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return inView;
}

const projects = [
  {
    id: 'doc-image-hub',
    title: 'Document & Image Processing Hub',
    icon: FileText,
    iconBg: 'from-blue-600 to-blue-400',
    description:
      'A full-stack platform for converting and processing files (PDF, Word, PPT) and compressing/enhancing images at scale.',
    highlights: [
      'Engineered a secure Node.js API to handle high-volume file uploads without memory leaks',
      'Supports PDF → Word, PPT → PDF, and lossless image compression/enhancement',
      'Multi-format processing pipeline with real-time progress feedback',
      'Optimized file streaming to avoid server memory exhaustion',
    ],
    tech: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Multer', 'Sharp'],
    gradient: 'from-blue-600/10 to-blue-400/5',
    border: 'border-blue-500/20',
    accentColor: 'text-blue-400',
    featured: true,
  },
  {
    id: 'ai-skincare-app',
    title: 'AI Skincare Analysis App',
    icon: Brain,
    iconBg: 'from-cyan-600 to-cyan-400',
    description:
      'Analyzes facial images to deliver personalized skincare diagnostics powered by computer vision AI.',
    highlights: [
      'Integrated 3rd-party computer vision APIs to extract biometric feature metrics securely',
      'Built for both React Web and React Native mobile platforms',
      'Generates personalized product & routine recommendations from AI-detected skin type',
      'End-to-end secure image transmission with HTTPS + JWT-guarded endpoints',
    ],
    tech: ['React', 'React Native', 'Node.js', 'Express', 'AI Vision API', 'JWT'],
    gradient: 'from-cyan-600/10 to-cyan-400/5',
    border: 'border-cyan-500/20',
    accentColor: 'text-cyan-400',
    featured: true,
  },
  {
    id: 'frontend-suite',
    title: 'Front-End Engineering Suite',
    subtitle: 'Fickflight & UltraEdit Clones',
    icon: Layout,
    iconBg: 'from-violet-600 to-violet-400',
    description:
      'Pixel-perfect recreation of complex real-world UIs — a flight booking app and a professional code editor — translated directly from Figma.',
    highlights: [
      'Translated complex Figma prototypes into pixel-perfect React interfaces for Fickflight booking app',
      'Built a high-fidelity UltraEdit clone with high Lighthouse performance scores',
      'Advanced CSS animations and custom component library built from scratch',
      'Fully responsive across all breakpoints with mobile-first design methodology',
    ],
    tech: ['React.js', 'CSS3', 'HTML5', 'Figma', 'Performance Optimization'],
    gradient: 'from-violet-600/10 to-violet-400/5',
    border: 'border-violet-500/20',
    accentColor: 'text-violet-400',
    featured: false,
  },
];

function ProjectCard({ project, delay, inView }) {
  const { id, title, subtitle, icon: Icon, iconBg, description, highlights, tech, gradient, border, accentColor } = project;

  return (
    <div
      className={`glass-card glass-card-hover rounded-2xl overflow-hidden bg-gradient-to-br ${gradient} border ${border}
        transition-all duration-700 flex flex-col ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="p-8 flex-1">
        {/* Header */}
        <div className="flex items-start gap-4 mb-5">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${iconBg} shadow-lg flex-shrink-0`}>
            <Icon size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-white font-bold text-xl leading-snug">{title}</h3>
            {subtitle && <p className={`text-sm ${accentColor} font-mono mt-0.5`}>{subtitle}</p>}
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-5">{description}</p>

        {/* Highlights */}
        <ul className="space-y-2 mb-6">
          {highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
              <Zap size={14} className={`${accentColor} mt-0.5 flex-shrink-0`} />
              {h}
            </li>
          ))}
        </ul>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {tech.map(t => (
            <span key={t} className="skill-badge text-xs">{t}</span>
          ))}
        </div>
      </div>

      {/* Footer actions */}
      <div className="px-8 py-5 border-t border-white/5 flex gap-3">
        <a
          id={`${id}-demo`}
          href="#"
          className="btn-primary flex-1 flex items-center justify-center gap-2 text-sm py-2.5"
          onClick={e => e.preventDefault()}
        >
          <span>Live Demo</span>
          <ExternalLink size={14} />
        </a>
        <a
          id={`${id}-github`}
          href="#"
          className="btn-outline flex-1 flex items-center justify-center gap-2 text-sm py-2.5"
          onClick={e => e.preventDefault()}
        >
          <GitFork size={14} />
          <span>GitHub</span>
        </a>
      </div>
    </div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref);

  return (
    <section id="projects" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-mono text-blue-400 text-sm mb-2">// WHAT I'VE BUILT</p>
          <h2 className="section-title text-gradient">Featured Projects</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto mb-4" />
          <p className="section-subtitle">
            Real-world projects showcasing full-stack capability, AI integration, and pixel-perfect UI engineering.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={i * 150} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
