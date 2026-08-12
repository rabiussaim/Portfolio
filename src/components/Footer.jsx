import { GitFork, Link2, Mail, Heart, ArrowUp } from 'lucide-react';

const socials = [
  { href: 'mailto:hafizrabiussaim@gmail.com', icon: Mail, label: 'Email' },
  { href: '#', icon: GitFork, label: 'GitHub' },
  { href: '#', icon: Link2, label: 'LinkedIn' },
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative border-t border-slate-800/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="font-mono text-xl font-bold text-gradient mb-1">&lt;HRS /&gt;</p>
            <p className="text-slate-500 text-sm">MERN Stack Developer · Lahore, Pakistan</p>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-4">
            {socials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-10 h-10 glass-card rounded-full flex items-center justify-center
                  text-slate-400 hover:text-blue-400 hover:border-blue-500/40 transition-all duration-200 hover:scale-110"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          {/* Back to top */}
          <button
            onClick={scrollTop}
            className="w-10 h-10 glass-card rounded-full flex items-center justify-center
              text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all duration-200 hover:scale-110"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800/50 text-center">
          <p className="text-slate-500 text-sm flex items-center justify-center gap-1">
            Built with <Heart size={12} className="text-red-400 animate-pulse" /> by Hafiz Rabi-Us-Saim · {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
