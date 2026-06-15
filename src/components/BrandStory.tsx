import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Crown, Check } from 'lucide-react';
import agentsImg from '../assets/sections/agents_visual.png';

const ease: [number, number, number, number] = [0.23, 1, 0.32, 1];

const comparisons = [
    { name: 'Alibaba DAMO', origin: 'China', power: 'Massive consumer data scale', features: ['Consumer analytics', 'E-comm optimization'], color: '#ef4444' },
    { name: 'Oracle Demantra', origin: 'USA', power: 'Deep ERP integration', features: ['Legacy ERP sync', 'Batch processing'], color: '#f97316' },
    { name: 'Palantir Foundry', origin: 'USA', power: 'Complex data modelling', features: ['Data integration', 'Custom workflows'], color: '#8b5cf6' },
    { name: 'AigentG9', origin: 'India', power: '9-agent autonomous intelligence', highlight: true, features: ['9 autonomous agents', 'Real-time decisions', '48hr deployment', 'No code changes'], color: '#2563EB' },
];

export default function BrandStory() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section ref={ref} id="story" className="section-light" style={{ padding: 'clamp(80px, 12vw, 160px) 0' }}>
            <div className="max-w-350 mx-auto" style={{ padding: '0 clamp(24px, 5vw, 64px)' }}>

                {/* ─── TWO-COLUMN GRID ─── */}
                <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 'clamp(32px, 5vw, 64px)', alignItems: 'center' }}>

                    {/* LEFT — Image */}
                    <motion.div initial={{ opacity: 0, x: -40, scale: 0.96 }} animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}} transition={{ duration: 1, ease }}>
                        <div className="img-showcase" style={{ overflow: 'hidden', borderRadius: '28px' }}>
                            <img src={agentsImg} alt="9 AI Agent Constellation" loading="lazy" decoding="async" style={{ objectPosition: 'center', width: '100%', height: '100%', objectFit: 'cover', minHeight: 'clamp(220px, 38vw, 480px)' }} />
                        </div>
                    </motion.div>

                    {/* RIGHT — Content */}
                    <div>
                        {/* Header */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, ease }}>
                            <span className="eyebrow">The Story</span>
                        </motion.div>
                        <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2, ease }}
                            style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#0F172A', lineHeight: 1.15, margin: '24px 0 20px' }}
                        >
                            Named after the legend.{' '}<br /><span className="gradient-text">Built for the future.</span>
                        </motion.h2>

                        {/* Quote */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3, ease }}
                            className="card-light" style={{ padding: '24px', marginBottom: '20px', borderLeft: '3px solid #2563EB' }}
                        >
                            <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: '16px', fontStyle: 'italic', color: '#2563EB', lineHeight: 1.6, margin: 0 }}>
                                &ldquo;Just as Gunmaster G9 anticipated every threat — AigentG9 sees your demand shifts before your competition does.&rdquo;
                            </p>
                        </motion.div>

                        {/* Description */}
                        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}
                            style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8, marginBottom: '16px' }}
                        >
                            9 autonomous AI agents working in concert to give your enterprise a decisive edge. This isn&apos;t another dashboard — it&apos;s an autonomous intelligence layer.
                        </motion.p>

                        {/* Chips */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: 'clamp(28px, 4vw, 40px)' }}>
                            {['Autonomous', 'Real-time', 'Multi-agent', 'Enterprise'].map((chip) => (
                                <span key={chip} className="metric-badge" style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2563EB' }}>
                                    {chip}
                                </span>
                            ))}
                        </div>

                        {/* Comparison Grid */}
                        <div className="grid grid-cols-2" style={{ gap: '10px' }}>
                            {comparisons.map((c, i) => (
                                <motion.div key={c.name} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease }}
                                    className="card-light relative"
                                    style={{
                                        padding: '20px',
                                        borderColor: (c as any).highlight ? '#2563EB' : 'rgba(0,0,0,0.06)',
                                        boxShadow: (c as any).highlight ? '0 8px 32px rgba(37,99,235,0.12)' : '0 2px 12px rgba(0,0,0,0.03)',
                                        background: (c as any).highlight ? 'rgba(37,99,235,0.02)' : '#FFFFFF',
                                    }}
                                >
                                    {(c as any).highlight && (
                                        <div style={{
                                            position: 'absolute', top: '10px', right: '10px',
                                            display: 'flex', alignItems: 'center', gap: '4px',
                                            background: 'linear-gradient(135deg, #2563EB, #4f46e5)',
                                            color: '#fff', padding: '3px 8px', borderRadius: '6px',
                                            fontSize: '8px', fontWeight: 700,
                                            fontFamily: "'JetBrains Mono', monospace",
                                        }}>
                                            <Crown size={9} /> OURS
                                        </div>
                                    )}
                                    <div style={{
                                        width: '8px', height: '8px', borderRadius: '50%',
                                        background: c.color, marginBottom: '10px',
                                        boxShadow: `0 0 8px ${c.color}30`,
                                    }} />
                                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>{c.origin}</p>
                                    <h4 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '15px', color: (c as any).highlight ? '#2563EB' : '#0F172A', marginBottom: '4px' }}>{c.name}</h4>
                                    <p style={{ fontSize: '11px', color: '#64748b', lineHeight: 1.5, margin: '0 0 10px' }}>{c.power}</p>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                        {c.features.map((f) => (
                                            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '10px', color: (c as any).highlight ? '#2563EB' : '#94a3b8' }}>
                                                <Check size={9} style={{ flexShrink: 0 }} /> {f}
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
