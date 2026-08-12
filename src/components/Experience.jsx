import { useEffect, useRef, useState } from 'react';
import { GraduationCap, Briefcase, Calendar, MapPin, Award } from 'lucide-react';

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

const education = [
  {
    id: 'bcs',
    degree: 'Bachelor of Computer Science',
    institution: 'Govt. Science College Lahore',
    affiliation: 'PU Affiliated',
    period: '2023 — 2027',
    status: 'In Progress — 7th Semester',
    icon: GraduationCap,
    color: 'from-blue-600 to-blue-400',
    border: 'border-blue-500/20',
    bg: 'from-blue-600/10 to-blue-400/5',
    badgeColor: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  },
  {
    id: 'fsc',
    degree: 'FSc. Pre-Engineering',
    institution: 'Garrison College For Boys',
    affiliation: 'Lahore',
    period: '2021 — 2023',
    status: 'Completed',
    icon: GraduationCap,
    color: 'from-violet-600 to-violet-400',
    border: 'border-violet-500/20',
    bg: 'from-violet-600/10 to-violet-400/5',
    badgeColor: 'bg-violet-500/15 text-violet-400 border-violet-500/30',
  },
];

const training = [
  {
    id: 'qalam',
    title: 'Full Stack Web Development',
    org: 'Qalam Institute',
    type: 'Intensive Training Program',
    details: 'Comprehensive hands-on MERN Stack training including React, Node.js, Express, MongoDB, REST APIs, JWT auth, deployment, and AI integrations.',
    skills: ['React.js', 'Node.js', 'Express', 'MongoDB', 'REST APIs', 'JWT', 'Deployment'],
    icon: Award,
    color: 'from-cyan-600 to-cyan-400',
    border: 'border-cyan-500/20',
    bg: 'from-cyan-600/10 to-cyan-400/5',
  },
];

function TimelineCard({ item, delay, inView, isTraining = false }) {
  const { id, degree, title, institution, org, affiliation, type, period, status, details, skills, icon: Icon, color, border, bg, badgeColor } = item;
  const displayTitle = isTraining ? title : degree;
  const displaySub = isTraining ? org : institution;
  const displayNote = isTraining ? type : affiliation;

  return (
    <div
      className={`relative glass-card glass-card-hover rounded-2xl p-6 bg-gradient-to-br ${bg} border ${border}
        transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Icon header */}
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${color} shadow-lg flex-shrink-0`}>
          <Icon size={22} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-bold text-lg leading-tight">{displayTitle}</h3>
          <p className="text-slate-300 font-medium text-sm mt-0.5">{displaySub}</p>
          <p className="text-slate-500 text-xs mt-0.5">{displayNote}</p>
        </div>
        {period && (
          <div className="flex items-center gap-1 text-slate-500 text-xs flex-shrink-0">
            <Calendar size={12} />
            {period}
          </div>
        )}
      </div>

      {status && (
        <div className="mt-4">
          <span className={`text-xs font-medium px-3 py-1 rounded-full border ${badgeColor}`}>
            {status}
          </span>
        </div>
      )}

      {details && (
        <p className="mt-4 text-slate-400 text-sm leading-relaxed">{details}</p>
      )}

      {skills && (
        <div className="flex flex-wrap gap-2 mt-4">
          {skills.map(s => (
            <span key={s} className="skill-badge text-xs">{s}</span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref);

  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-mono text-blue-400 text-sm mb-2">// MY JOURNEY</p>
          <h2 className="section-title text-gradient">Experience &amp; Education</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Education column */}
          <div className="lg:col-span-2 space-y-6">
            <div className={`flex items-center gap-3 mb-6 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}>
              <GraduationCap size={20} className="text-blue-400" />
              <h3 className="text-lg font-bold text-white">Education</h3>
              <div className="flex-1 h-px bg-gradient-to-r from-blue-500/30 to-transparent" />
            </div>
            {education.map((item, i) => (
              <TimelineCard key={item.id} item={item} delay={i * 150} inView={inView} />
            ))}
          </div>

          {/* Training column */}
          <div className="space-y-6">
            <div className={`flex items-center gap-3 mb-6 transition-all duration-700 delay-300 ${inView ? 'opacity-100' : 'opacity-0'}`}>
              <Briefcase size={20} className="text-cyan-400" />
              <h3 className="text-lg font-bold text-white">Training</h3>
              <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />
            </div>
            {training.map((item, i) => (
              <TimelineCard key={item.id} item={item} delay={300 + i * 150} inView={inView} isTraining />
            ))}

            {/* Certifications mini card */}
            <div
              className={`glass-card rounded-2xl p-6 border border-amber-500/20 bg-gradient-to-br from-amber-600/10 to-amber-400/5
                transition-all duration-700 delay-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <Award size={18} className="text-amber-400" />
                <h4 className="text-white font-bold">Certifications</h4>
              </div>
              <ul className="space-y-2">
                {['MERN Stack Development', 'AI with Python', 'WordPress Development'].map(cert => (
                  <li key={cert} className="flex items-center gap-2 text-sm text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
