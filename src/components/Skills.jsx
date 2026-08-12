import { useEffect, useRef, useState } from 'react';
import {
  Monitor, Server, Wrench, Award
} from 'lucide-react';

function useInView(ref, threshold = 0.15) {
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

const skillGroups = [
  {
    title: 'Frontend',
    icon: Monitor,
    color: 'from-blue-600/20 to-blue-500/5',
    border: 'border-blue-500/20',
    iconColor: 'text-blue-400',
    skills: [
      { name: 'React.js', level: 90 },
      { name: 'JavaScript (ES6+)', level: 88 },
      { name: 'HTML5', level: 95 },
      { name: 'CSS3', level: 90 },
      { name: 'Responsive Web Design', level: 92 },
    ],
  },
  {
    title: 'Backend & Database',
    icon: Server,
    color: 'from-cyan-600/20 to-cyan-500/5',
    border: 'border-cyan-500/20',
    iconColor: 'text-cyan-400',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express.js', level: 85 },
      { name: 'MongoDB', level: 80 },
      { name: 'RESTful APIs', level: 88 },
      { name: 'JWT Authentication', level: 82 },
    ],
  },
  {
    title: 'Languages & Tools',
    icon: Wrench,
    color: 'from-violet-600/20 to-violet-500/5',
    border: 'border-violet-500/20',
    iconColor: 'text-violet-400',
    skills: [
      { name: 'C / C++', level: 75 },
      { name: 'Git / GitHub', level: 88 },
      { name: 'Figma', level: 78 },
      { name: 'UI/UX Principles', level: 82 },
    ],
  },
  {
    title: 'Certifications',
    icon: Award,
    color: 'from-amber-600/20 to-amber-500/5',
    border: 'border-amber-500/20',
    iconColor: 'text-amber-400',
    skills: [
      { name: 'MERN Stack', level: 90 },
      { name: 'AI (Python)', level: 70 },
      { name: 'WordPress', level: 75 },
    ],
  },
];

function SkillBar({ name, level, inView, delay }) {
  return (
    <div
      className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-slate-300 font-medium">{name}</span>
        <span className="text-xs font-mono text-slate-500">{level}%</span>
      </div>
      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-1000 ease-out"
          style={{ width: inView ? `${level}%` : '0%', transitionDelay: `${delay + 200}ms` }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref);

  return (
    <section id="skills" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-mono text-blue-400 text-sm mb-2">// WHAT I USE</p>
          <h2 className="section-title text-gradient">Skills &amp; Technologies</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillGroups.map(({ title, icon: Icon, color, border, iconColor, skills }, gi) => (
            <div
              key={title}
              className={`glass-card glass-card-hover rounded-2xl p-6 bg-gradient-to-br ${color} border ${border}
                transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${gi * 150}ms` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2 rounded-lg bg-white/5 ${iconColor}`}>
                  <Icon size={20} />
                </div>
                <h3 className="text-white font-bold text-lg">{title}</h3>
              </div>
              <div className="space-y-4">
                {skills.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    {...skill}
                    inView={inView}
                    delay={gi * 150 + si * 80}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Technology badge cloud */}
        <div className={`mt-16 text-center transition-all duration-700 delay-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="font-mono text-slate-500 text-sm mb-6">// TECH STACK AT A GLANCE</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'HTML5', 'CSS3', 'Git', 'REST APIs', 'JWT', 'Figma', 'C++', 'AI/ML'].map(tech => (
              <span key={tech} className="skill-badge cursor-default">{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
