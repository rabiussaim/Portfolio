import { useEffect, useRef, useState, useMemo } from 'react';
import { ArrowDown, Mail, Phone, MapPin, ExternalLink, FileDown, ChevronRight } from 'lucide-react';

const ROLES = [
  'MERN Stack Developer',
  'React & Node.js Specialist',
  'Full Stack Engineer',
  'UI/UX Enthusiast',
];

// Pre-generate stable particle data so it doesn't re-randomize on re-render
const PARTICLES = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  size: (((i * 7 + 3) % 6) + 2),
  color: i % 3 === 0 ? '#06b6d4' : i % 3 === 1 ? '#3b82f6' : '#8b5cf6',
  left: ((i * 37 + 11) % 100),
  top: ((i * 53 + 17) % 100),
  duration: (((i * 13 + 4) % 8) + 5),
  delay: ((i * 29) % 5),
}));

function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size + 'px',
            height: p.size + 'px',
            background: p.color,
            left: p.left + '%',
            top: p.top + '%',
            opacity: 0.25,
            animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIdx];
    let timeout;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIdx((prev) => (prev + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIdx]);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden">
      {/* Gradient Orbs - all have animate-float with will-change for GPU acceleration */}
      <div className="orb w-96 h-96 bg-blue-600 top-1/4 -left-48 animate-float" style={{ willChange: 'transform' }} />
      <div className="orb w-80 h-80 bg-cyan-500 bottom-1/4 -right-40 animate-float" style={{ animationDelay: '2s', willChange: 'transform' }} />
      <div className="orb w-64 h-64 bg-violet-600 top-3/4 left-1/3 animate-float" style={{ animationDelay: '4s', willChange: 'transform' }} />

      <ParticleField />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-24 sm:pt-28">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full text-sm text-blue-400 font-mono mb-8 border border-blue-500/20">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Available for freelance &amp; full-time roles
        </div>

        {/* Name */}
        <h1 className="text-3xl min-[380px]:text-4xl min-[480px]:text-5xl sm:text-6xl md:text-7xl font-black mb-4 leading-tight tracking-tight">
          <span className="text-white block sm:inline">Hafiz </span>
          <span className="text-gradient block sm:inline-block whitespace-nowrap">Rabi-Us-Saim</span>
        </h1>

        {/* Animated role */}
        <div className="h-12 flex items-center justify-center mb-6">
          <span className="font-mono text-xl sm:text-2xl text-cyan-400">
            {displayed}
            <span className="animate-[blink_0.8s_ease-in-out_infinite] border-r-2 border-cyan-400 ml-1">&nbsp;</span>
          </span>
        </div>

        {/* Tagline */}
        <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Building{' '}
          <span className="text-blue-400 font-semibold">scalable web applications</span>,{' '}
          sleek UI/UX, and{' '}
          <span className="text-cyan-400 font-semibold">AI-driven solutions</span>.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            id="hero-view-projects"
            onClick={scrollToProjects}
            className="btn-primary flex items-center justify-center gap-2 group"
          >
            <span>View Projects</span>
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <a
            id="hero-download-resume"
            href="#"
            className="btn-outline flex items-center justify-center gap-2"
          >
            <FileDown size={18} />
            Download Resume
          </a>
        </div>

        {/* Contact info pills */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-slate-400 text-sm">
          <a
            href="mailto:hafizrabiussaim@gmail.com"
            className="flex items-center gap-2 hover:text-blue-400 transition-colors group"
          >
            <Mail size={15} className="text-blue-400" />
            hafizrabiussaim@gmail.com
          </a>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-slate-600" />
          <a
            href="tel:+923367947525"
            className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
          >
            <Phone size={15} className="text-cyan-400" />
            +92 336-7947525
          </a>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-slate-600" />
          <span className="flex items-center gap-2">
            <MapPin size={15} className="text-purple-400" />
            Lahore, Pakistan
          </span>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex justify-center">
          <button
            onClick={scrollToProjects}
            className="text-slate-500 hover:text-blue-400 transition-colors animate-bounce"
            aria-label="Scroll down"
          >
            <ArrowDown size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
