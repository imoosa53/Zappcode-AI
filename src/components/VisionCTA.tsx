import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Play, Shield, Clock, Sparkles } from 'lucide-react';
import dashboardImg from '../assets/sections/dashboard.png';

const ease: [number, number, number, number] = [0.23, 1, 0.32, 1];

const trustBadges = [
    { icon: Shield, text: 'Enterprise-grade security' },
    { icon: Clock, text: 'Live in under 48 hours' },
    { icon: Sparkles, text: 'No code changes required' },
];

export default function VisionCTA() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    const [form, setForm] = useState({ name: '', company: '', email: '', phone: '' });
    const [focusedField, setFocusedField] = useState<string | null>(null);

    return (
        <section ref={ref} id="contact" className="section-light" style={{ padding: 'clamp(48px, 8vw, 80px) 0 0' }}>
            <div className="max-w-350 mx-auto" style={{ padding: '0 clamp(24px, 5vw, 64px)' }}>
                {/* Dark container */}
                <motion.div initial={{ opacity: 0, y: 60 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, ease }}
                    className="dark-container noise-overlay" style={{ padding: 'clamp(48px, 7vw, 88px) clamp(32px, 5vw, 64px)', position: 'relative' }}
                >
                    {/* BG image */}
                    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 'inherit' }}>
                        <img src={dashboardImg} alt="" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.06, filter: 'blur(3px)' }} />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(15,23,42,0.97), rgba(15,23,42,0.92))' }} />
                    </div>

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-24 items-center">
                        {/* Left */}
                        <div>
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, ease }}>
                                <span className="eyebrow eyebrow-dark">Ready to Transform</span>
                            </motion.div>
                            <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2, ease }}
                                style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', color: '#f1f5f9', lineHeight: 1.1, margin: '28px 0 20px' }}
                            >
                                Ready to predict your<br />
                                <span style={{ color: '#60a5fa' }}>next demand shift?</span>
                            </motion.h2>
                            <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
                                style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.7, maxWidth: '440px', marginBottom: '32px' }}
                            >
                                Book a 30-minute live demo. We&apos;ll show you exactly how AigentG9 performs on your data — before you invest a single rupee.
                            </motion.p>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4, ease }}
                                className="flex flex-wrap items-center" style={{ gap: '12px', marginBottom: '32px' }}
                            >
                                <button type="button" className="btn-primary">Book a Demo <ArrowRight size={16} /></button>
                                <button type="button" className="btn-ghost-dark"><Play size={13} style={{ fill: 'currentColor' }} /> Watch Overview</button>
                            </motion.div>

                            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
                                style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
                            >
                                {trustBadges.map((b) => (
                                    <div key={b.text} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <b.icon size={14} style={{ color: '#60a5fa', flexShrink: 0 }} />
                                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#475569', letterSpacing: '0.06em' }}>{b.text}</span>
                                    </div>
                                ))}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                                    <span className="active-dot" />
                                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#60a5fa' }}>
                                        50+ enterprises on the waitlist
                                    </span>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right — Form */}
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3, ease }}
                            className="glass-card" style={{ padding: 'clamp(24px, 4vw, 40px)', boxShadow: '0 24px 64px rgba(0,0,0,0.3)' }}
                        >
                            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '24px', color: '#f1f5f9', marginBottom: '4px' }}>Get Started</h3>
                            <p style={{ fontSize: '13px', color: '#475569', marginBottom: '28px', lineHeight: 1.5 }}>
                                Fill in your details and we&apos;ll reach out within 24 hours.
                            </p>
                            <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {[
                                    { name: 'name', placeholder: 'Your Name', type: 'text' },
                                    { name: 'company', placeholder: 'Company', type: 'text' },
                                    { name: 'email', placeholder: 'Work Email', type: 'email' },
                                    { name: 'phone', placeholder: 'Phone Number', type: 'tel' },
                                ].map((field) => (
                                    <input key={field.name} name={field.name} type={field.type}
                                        placeholder={field.placeholder}
                                        value={form[field.name as keyof typeof form]}
                                        onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                                        aria-label={field.placeholder}
                                        className="w-full outline-none"
                                        style={{
                                            padding: '14px 20px', borderRadius: '14px',
                                            background: focusedField === field.name ? 'rgba(99,102,241,0.06)' : 'rgba(255,255,255,0.03)',
                                            border: `1px solid ${focusedField === field.name ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.06)'}`,
                                            color: '#e2e8f0', fontFamily: "'Instrument Sans', sans-serif", fontSize: '14px',
                                            transition: 'all 0.4s ease',
                                            boxShadow: focusedField === field.name ? '0 0 0 3px rgba(99,102,241,0.1)' : 'none',
                                        }}
                                        onFocus={() => setFocusedField(field.name)}
                                        onBlur={() => setFocusedField(null)}
                                    />
                                ))}
                                <button type="submit" className="btn-primary w-full" style={{ marginTop: '8px', borderRadius: '14px' }}>
                                    Request Your Demo <ArrowRight size={14} />
                                </button>
                                <p style={{ textAlign: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: '#475569', letterSpacing: '0.08em', marginTop: '4px' }}>
                                    No commitment · Response within 24 hours
                                </p>
                            </form>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
