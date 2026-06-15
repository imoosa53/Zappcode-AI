import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const ease: [number, number, number, number] = [0.23, 1, 0.32, 1];

const testimonials = [
    { quote: 'We reduced forecast error by 31% in Q1. The Forecast Agent alone paid for the entire platform.', name: 'Rajesh Mehta', title: 'VP Supply Chain', company: '$2B FMCG Company', initials: 'RM', gradient: 'linear-gradient(135deg, #2563EB, #4f46e5)', metric: '31%', metricLabel: 'Error Reduction' },
    { quote: 'The ERP Action Agent eliminated our weekly planning meeting. 3-day decisions now happen in 20 minutes.', name: 'Sarah Chen', title: 'Chief Operations Officer', company: 'National Retail Group', initials: 'SC', gradient: 'linear-gradient(135deg, #7c3aed, #a855f7)', metric: '20min', metricLabel: 'Decision Time' },
    { quote: 'We caught a competitor pricing shift 11 days before our team would have spotted it manually.', name: 'Arjun Patel', title: 'CEO', company: 'Mid-Market Manufacturer', initials: 'AP', gradient: 'linear-gradient(135deg, #059669, #22C55E)', metric: '11 days', metricLabel: 'Early Detection' },
];

const logoStrip = ['Manufacturing', 'FMCG', 'Retail', 'Pharma', 'Automotive', 'E-Commerce'];

export default function SocialProof() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section ref={ref} id="social-proof" className="section-light-alt" style={{ padding: 'clamp(80px, 12vw, 160px) 0' }}>
            <div className="max-w-350 mx-auto" style={{ padding: '0 clamp(24px, 5vw, 64px)' }}>
                {/* Header */}
                <div className="text-center" style={{ marginBottom: '24px' }}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease }}>
                        <span className="eyebrow" style={{ justifyContent: 'center' }}>Trust Signals</span>
                    </motion.div>
                    <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, ease }}
                        style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: '#0F172A', lineHeight: 1.08, margin: '28px 0 0' }}
                    >
                        Leaders who chose{' '}<span className="gradient-text">intelligence.</span>
                    </motion.h2>
                </div>

                {/* Logo strip */}
                <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
                    className="flex flex-wrap justify-center items-center"
                    style={{ marginBottom: '56px', gap: '10px 0', rowGap: '10px' }}
                >
                    {logoStrip.map((logo, i) => (
                        <div key={logo} className="flex items-center">
                            {i > 0 && <div className="hidden sm:block" style={{ width: '1px', height: '16px', background: 'rgba(0,0,0,0.08)', margin: '0 clamp(12px, 2.5vw, 28px)' }} />}
                            <span
                                className={i > 0 ? 'sm:pl-0 pl-4' : ''}
                                style={{
                                    fontFamily: "'JetBrains Mono', monospace", fontSize: '11px',
                                    letterSpacing: '0.1em', textTransform: 'uppercase', color: '#94a3b8',
                                    transition: 'color 0.3s ease', cursor: 'default',
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.color = '#2563EB'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; }}
                            >{logo}</span>
                        </div>
                    ))}
                </motion.div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '16px' }}>
                    {testimonials.map((t, i) => (
                        <motion.div key={t.name} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 + i * 0.12, ease }}
                            className="card-light flex flex-col overflow-hidden" style={{ padding: 0 }}
                        >
                            {/* Metric banner */}
                            <div style={{
                                padding: '24px 28px',
                                background: 'linear-gradient(135deg, #f8fafc, #eef2ff)',
                                borderBottom: '1px solid rgba(0,0,0,0.04)',
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            }}>
                                <div>
                                    <div className="gradient-text" style={{ fontFamily: "'DM Serif Display', serif", fontSize: '32px', lineHeight: 1 }}>{t.metric}</div>
                                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: '#94a3b8', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '4px' }}>{t.metricLabel}</div>
                                </div>
                                <Quote size={20} style={{ color: 'rgba(37,99,235,0.15)' }} />
                            </div>

                            <div style={{ padding: '24px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', gap: '2px', marginBottom: '16px' }}>
                                    {[...Array(5)].map((_, j) => <Star key={j} size={14} style={{ color: '#2563EB', fill: '#2563EB' }} />)}
                                </div>

                                <p className="flex-1" style={{
                                    fontFamily: "'DM Serif Display', serif", fontStyle: 'italic', fontSize: '15px',
                                    color: '#475569', lineHeight: 1.65, margin: '0 0 24px',
                                }}>&ldquo;{t.quote}&rdquo;</p>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{
                                        width: '44px', height: '44px', borderRadius: '14px',
                                        background: t.gradient,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '14px', fontWeight: 700, color: '#fff', flexShrink: 0,
                                    }}>{t.initials}</div>
                                    <div>
                                        <p style={{ fontSize: '14px', fontWeight: 600, color: '#0F172A', margin: '0 0 2px' }}>{t.name}</p>
                                        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#94a3b8', letterSpacing: '0.04em', margin: 0 }}>{t.title}, {t.company}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Badge */}
                <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.8 }}
                    className="flex justify-center" style={{ marginTop: '48px' }}
                >
                    <span className="metric-badge" style={{ gap: '10px' }}>
                        <span style={{ fontSize: '16px' }}>🇮🇳</span>
                        <span style={{ color: '#2563EB', fontWeight: 600 }}>Trusted by enterprises across India</span>
                    </span>
                </motion.div>
            </div>
        </section>
    );
}
