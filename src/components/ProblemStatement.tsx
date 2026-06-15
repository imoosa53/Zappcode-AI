import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { AlertTriangle, TrendingDown, Clock, Radio } from 'lucide-react';
import productImg from '../assets/sections/product_light.png';

const ease: [number, number, number, number] = [0.23, 1, 0.32, 1];

function useCountUp(target: number, active: boolean, suffix = '', prefix = '') {
    const [display, setDisplay] = useState(prefix + '0' + suffix);
    useEffect(() => {
        if (!active) return;
        let start: number | null = null;
        let raf: number;
        const step = (ts: number) => {
            if (!start) start = ts;
            const t = Math.min((ts - start) / 2000, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            const val = target * eased;
            const formatted = target % 1 !== 0 ? val.toFixed(1) : String(Math.round(val));
            setDisplay(prefix + formatted + suffix);
            if (t < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [active, target, suffix, prefix]);
    return display;
}

const stats = [
    { value: 73, suffix: '%', label: 'Forecast Error Rate', icon: AlertTriangle, color: '#ef4444', bg: 'rgba(239,68,68,0.06)' },
    { value: 2.3, suffix: 'Cr', prefix: '₹', label: 'Annual Waste / SKU', icon: TrendingDown, color: '#f97316', bg: 'rgba(249,115,22,0.06)' },
    { value: 4.7, suffix: ' days', label: 'Avg. Reaction Time', icon: Clock, color: '#eab308', bg: 'rgba(234,179,8,0.06)' },
    { value: 62, suffix: '%', label: 'Missed Demand Signals', icon: Radio, color: '#ef4444', bg: 'rgba(239,68,68,0.06)' },
];

export default function ProblemStatement() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section ref={ref} id="problem" className="section-light" style={{ padding: 'clamp(80px, 12vw, 160px) 0' }}>
            <div className="max-w-350 mx-auto" style={{ padding: '0 clamp(24px, 5vw, 64px)' }}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Left — Content */}
                    <div>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease }}>
                            <span className="eyebrow">The Problem</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.1, ease }}
                            style={{
                                fontFamily: "'DM Serif Display', serif",
                                fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                                color: '#0F172A', lineHeight: 1.08,
                                margin: '28px 0 20px',
                            }}
                        >
                            Your supply chain is{' '}
                            <span className="gradient-text">flying blind.</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2, ease }}
                            style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.7, maxWidth: '460px', marginBottom: '40px' }}
                        >
                            Most enterprises still forecast with spreadsheets and gut instinct. The result? Billions lost to invisible demand signals every quarter.
                        </motion.p>

                        {/* Stats grid */}
                        <div className="grid grid-cols-2" style={{ gap: '12px' }}>
                            {stats.map((stat, i) => {
                                const Icon = stat.icon;
                                return <StatCard key={stat.label} stat={stat} Icon={Icon} index={i} inView={inView} />;
                            })}
                        </div>
                    </div>

                    {/* Right — Product Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                        transition={{ duration: 1, delay: 0.3, ease }}
                    >
                        <div className="img-showcase" style={{ animation: 'float 6s ease-in-out infinite', maxHeight: '480px' }}>
                            <img src={productImg} alt="AI Demand Intelligence Platform" loading="lazy" decoding="async" style={{ maxHeight: '480px', objectFit: 'cover', objectPosition: 'center' }} />
                            <div style={{
                                position: 'absolute', bottom: '20px', left: '20px', zIndex: 10,
                                display: 'flex', alignItems: 'center', gap: '8px',
                                padding: '10px 18px', borderRadius: '12px',
                                background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)',
                                border: '1px solid rgba(0,0,0,0.06)',
                                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                            }}>
                                <span className="active-dot" />
                                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#0F172A', letterSpacing: '0.08em', fontWeight: 600 }}>
                                    LIVE INTELLIGENCE
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function StatCard({ stat, Icon, index, inView }: { stat: (typeof stats)[number]; Icon: typeof AlertTriangle; index: number; inView: boolean }) {
    const display = useCountUp(stat.value, inView, stat.suffix, stat.prefix || '');
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.08, ease: [0.23, 1, 0.32, 1] }}
            className="card-light"
            style={{ padding: '22px' }}
        >
            <div style={{
                width: '36px', height: '36px', borderRadius: '10px',
                background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '14px',
            }}>
                <Icon size={16} style={{ color: stat.color }} />
            </div>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: '28px', color: stat.color, lineHeight: 1, marginBottom: '8px' }}>
                {display}
            </div>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#94a3b8', margin: 0 }}>
                {stat.label}
            </p>
        </motion.div>
    );
}
