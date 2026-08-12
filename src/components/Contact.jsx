import { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hafizrabiussaim@gmail.com',
    href: 'mailto:hafizrabiussaim@gmail.com',
    color: 'text-blue-400',
    bg: 'from-blue-600/20 to-blue-500/5',
    border: 'border-blue-500/20',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+92 336-7947525',
    href: 'tel:+923367947525',
    color: 'text-cyan-400',
    bg: 'from-cyan-600/20 to-cyan-500/5',
    border: 'border-cyan-500/20',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Lahore, Pakistan',
    href: 'https://maps.google.com/?q=Lahore,Pakistan',
    color: 'text-violet-400',
    bg: 'from-violet-600/20 to-violet-500/5',
    border: 'border-violet-500/20',
  },
];

const INITIAL = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email address';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setStatus('loading');
    // Simulate send
    await new Promise(r => setTimeout(r, 1500));
    setStatus('success');
    setTimeout(() => { setStatus('idle'); setForm(INITIAL); }, 4000);
  };

  const inputCls = (field) =>
    `w-full bg-slate-900/50 border rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm
     focus:outline-none focus:border-blue-500/60 focus:bg-slate-900/70 transition-all duration-200
     ${errors[field] ? 'border-red-500/60' : 'border-slate-700/50'}`;

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-mono text-blue-400 text-sm mb-2">// GET IN TOUCH</p>
          <h2 className="section-title text-gradient">Contact Me</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto mb-4" />
          <p className="section-subtitle">
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold text-white mb-8">Let's Connect</h3>
            {contactInfo.map(({ icon: Icon, label, value, href, color, bg, border }) => (
              <a
                key={label}
                href={href}
                target={label === 'Location' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className={`flex items-center gap-4 glass-card glass-card-hover p-5 rounded-2xl bg-gradient-to-br ${bg} border ${border} group`}
              >
                <div className={`p-3 rounded-xl bg-white/5 ${color} group-hover:scale-110 transition-transform`}>
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">{label}</p>
                  <p className="text-sm text-white font-medium group-hover:text-blue-300 transition-colors">
                    {value}
                  </p>
                </div>
              </a>
            ))}

            {/* Availability banner */}
            <div className="glass-card p-5 rounded-2xl border border-green-500/20 bg-gradient-to-br from-green-600/10 to-green-400/5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 font-semibold text-sm">Currently Available</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Open to freelance projects, internships, and full-time opportunities.
                Typical response time: within 24 hours.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="glass-card rounded-2xl p-8 border border-slate-700/50">
              {status === 'success' ? (
                <div className="text-center py-12">
                  <CheckCircle size={56} className="text-green-400 mx-auto mb-4" />
                  <h3 className="text-white text-xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-slate-400">Thanks for reaching out. I'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5" htmlFor="contact-name">Name *</label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        placeholder="Your name"
                        value={form.name}
                        onChange={handleChange}
                        className={inputCls('name')}
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} />{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5" htmlFor="contact-email">Email *</label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={handleChange}
                        className={inputCls('email')}
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} />{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-slate-400 mb-1.5" htmlFor="contact-subject">Subject</label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      placeholder="Project inquiry, collaboration..."
                      value={form.subject}
                      onChange={handleChange}
                      className={inputCls('subject')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-slate-400 mb-1.5" htmlFor="contact-message">Message *</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={6}
                      placeholder="Tell me about your project or opportunity..."
                      value={form.message}
                      onChange={handleChange}
                      className={`${inputCls('message')} resize-none`}
                    />
                    {errors.message && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} />{errors.message}</p>}
                  </div>

                  <button
                    id="contact-submit"
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader size={16} className="animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-slate-500 text-xs">
                    Or email directly at{' '}
                    <a href="mailto:hafizrabiussaim@gmail.com" className="text-blue-400 hover:underline">
                      hafizrabiussaim@gmail.com
                    </a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
