import { useEffect, useRef, useState } from 'react';
import { GraduationCap, Globe, Zap, Code2 } from 'lucide-react';

function useInView(ref, threshold = 0.2) {
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

const stats = [
  { value: '3+', label: 'Years Coding', icon: Code2 },
  { value: '10+', label: 'Projects Built', icon: Zap },
  { value: '3', label: 'Languages Spoken', icon: Globe },
  { value: '7th', label: 'Semester CS', icon: GraduationCap },
];

const languages = ['English', 'Urdu', 'Punjabi'];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref);

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="font-mono text-blue-400 text-sm mb-2">// WHO I AM</p>
          <h2 className="section-title text-gradient">About Me</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — avatar / decorative */}
          <div
            className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}`}
          >
            <div className="relative inline-block w-full max-w-sm mx-auto">
              {/* Avatar placeholder */}
              <div className="relative w-72 h-72 mx-auto rounded-2xl overflow-hidden glass-card animate-pulse-glow">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-cyan-500/30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mx-auto mb-4 text-4xl font-black text-white shadow-lg">
                      HR
                    </div>
                    <p className="font-mono text-blue-300 text-sm">@hafizrabiussaim</p>
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 glass-card px-4 py-2 rounded-xl border border-cyan-500/30">
                <p className="text-xs text-slate-400">Based in</p>
                <p className="text-sm font-semibold text-cyan-400">Lahore 🇵🇰</p>
              </div>
            </div>
          </div>

          {/* Right — text content */}
          <div
            className={`transition-all duration-1000 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}`}
          >
            <div className="space-y-5 text-slate-300 leading-relaxed">
              <p className="text-lg">
                I'm a <span className="text-blue-400 font-semibold">passionate MERN Stack Developer</span> currently
                pursuing my <span className="text-white font-semibold">Bachelor of Computer Science</span> (7th Semester)
                at Govt. Science College Lahore (PU Affiliated).
              </p>
              <p>
                I specialize in building <span className="text-cyan-400 font-medium">responsive frontends</span> with React.js
                and <span className="text-cyan-400 font-medium">secure, scalable backends</span> with Node.js and Express.
                My passion lies at the intersection of clean code, beautiful design, and meaningful user experiences.
              </p>
              <p>
                Beyond coding, I've completed specialized training in the{' '}
                <span className="text-white font-semibold">Qalam Full Stack Web Development Program</span>, giving me
                hands-on expertise across the entire modern web stack, including AI integration.
              </p>

              {/* Languages */}
              <div className="pt-2">
                <p className="text-sm text-slate-400 mb-3 font-mono">// Languages Spoken</p>
                <div className="flex gap-3 flex-wrap">
                  {languages.map(lang => (
                    <span key={lang} className="skill-badge">{lang}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div
          className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 delay-500 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {stats.map(({ value, label, icon: Icon }) => (
            <div
              key={label}
              className="glass-card glass-card-hover rounded-2xl p-6 text-center"
            >
              <Icon size={24} className="text-blue-400 mx-auto mb-3" />
              <p className="text-3xl font-black text-gradient mb-1">{value}</p>
              <p className="text-sm text-slate-400">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
