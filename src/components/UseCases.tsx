import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Store, Factory, Globe, Pill, ArrowRight } from 'lucide-react';

import imgFmcg from '../assets/usecases/fmcg.png';
import imgRetail from '../assets/usecases/retail.png';
import imgManufacturing from '../assets/usecases/manufacturing.png';
import imgEcommerce from '../assets/usecases/ecommerce.png';
import imgPharma from '../assets/usecases/pharma.png';

const ease: [number, number, number, number] = [0.23, 1, 0.32, 1];

const industries = [
    { id: 'fmcg', label: 'FMCG', icon: ShoppingCart, image: imgFmcg, color: '#f97316', scenario: 'Promotions spike demand 3× — the Promotion Agent pre-positions inventory, while the Pricing Agent adjusts margins in real time.', results: ['3× faster stock positioning', 'Real-time ROI per SKU', 'AI-simulated promotional uplift'] },
    { id: 'retail', label: 'Retail', icon: Store, image: imgRetail, color: '#2563EB', scenario: 'A competitor drops prices across 200 SKUs overnight. The Competitor Agent detects and recommends counter-moves before stores open.', results: ['Counter-pricing in < 4 hours', 'Continuous competitor monitoring', 'SKU-level elasticity pricing'] },
    { id: 'manufacturing', label: 'Manufacturing', icon: Factory, image: imgManufacturing, color: '#059669', scenario: 'Raw material costs surge 18%. The Scenario Agent models alternatives instantly and the ERP Agent adjusts purchase orders.', results: ['Real-time scenario simulation', 'Automated PO adjustment', 'Multi-source risk scoring'] },
    { id: 'ecommerce', label: 'E-Commerce', icon: Globe, image: imgEcommerce, color: '#7c3aed', scenario: 'A viral trend drives 5× traffic. The Market Signal Agent catches it early and inventory is repositioned before stockout.', results: ['Social sentiment in forecasts', 'Dynamic demand shaping', 'Auto warehouse transfers'] },
    { id: 'pharma', label: 'Pharma', icon: Pill, image: imgPharma, color: '#0891b2', scenario: 'A disease outbreak shifts demand across 3 regions. The Deviation Agent flags anomalies and distribution is rebalanced.', results: ['Daily regional recalibration', 'Auto-response in 24 hours', 'Zero-waste redistribution'] },
];

export default function UseCases() {
    const [active, setActive] = useState(0);
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    const current = industries[active];

    return (
        <section ref={ref} id="use-cases" className="section-light" style={{ padding: 'clamp(80px, 12vw, 160px) 0' }}>
            <div className="max-w-350 mx-auto" style={{ padding: '0 clamp(24px, 5vw, 64px)' }}>
                {/* Header */}
                <div className="text-center" style={{ marginBottom: '24px' }}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease }}>
                        <span className="eyebrow" style={{ justifyContent: 'center' }}>Industry Solutions</span>
                    </motion.div>
                    <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1, ease }}
                        style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: '#0F172A', lineHeight: 1.08, margin: '28px 0 0' }}
                    >
                        Built for{' '}<span className="gradient-text">your industry.</span>
                    </motion.h2>
                </div>

                {/* Tabs */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2, ease }}
                    className="flex flex-wrap justify-center" style={{ gap: '8px', marginBottom: 'clamp(40px, 5vw, 56px)' }}
                >
                    {industries.map((ind, i) => {
                        const Icon = ind.icon;
                        const isActive = i === active;
                        return (
                            <button key={ind.id} type="button" onClick={() => setActive(i)}
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                                    padding: '12px 24px', borderRadius: '14px',
                                    fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em',
                                    textTransform: 'uppercase', cursor: 'pointer',
                                    background: isActive ? 'linear-gradient(135deg, #2563EB, #4f46e5)' : '#FFFFFF',
                                    color: isActive ? '#fff' : '#64748b',
                                    border: `1px solid ${isActive ? 'transparent' : 'rgba(0,0,0,0.08)'}`,
                                    boxShadow: isActive ? '0 4px 16px rgba(37,99,235,0.25)' : '0 1px 4px rgba(0,0,0,0.04)',
                                    transition: 'all 0.4s cubic-bezier(0.23,1,0.32,1)',
                                    transform: isActive ? 'scale(1.05)' : 'scale(1)',
                                }}
                            >
                                <Icon size={14} /> {ind.label}
                            </button>
                        );
                    })}
                </motion.div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    <motion.div key={current.id}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.35, ease }}
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 'clamp(16px, 2.5vw, 20px)' }}>
                            {/* Image */}
                            <div className="img-showcase" style={{ height: 'clamp(280px, 30vw, 420px)' }}>
                                <img src={current.image} alt={current.label} loading="lazy" decoding="async" />
                                {/* Floating badge */}
                                <div style={{
                                    position: 'absolute', top: '20px', left: '20px', zIndex: 10,
                                    display: 'flex', alignItems: 'center', gap: '8px',
                                    padding: '8px 16px', borderRadius: '10px',
                                    background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)',
                                    border: '1px solid rgba(0,0,0,0.06)',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                }}>
                                    <current.icon size={14} style={{ color: current.color }} />
                                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#0F172A', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                        {current.label}
                                    </span>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="card-light flex flex-col justify-center" style={{ padding: 'clamp(28px, 4vw, 44px)' }}>
                                <p style={{
                                    fontFamily: "'DM Serif Display', serif",
                                    fontSize: 'clamp(17px, 2vw, 22px)',
                                    fontStyle: 'italic', color: '#1e293b',
                                    lineHeight: 1.6, margin: '0 0 28px',
                                }}>
                                    &ldquo;{current.scenario}&rdquo;
                                </p>

                                <div style={{ marginBottom: '24px' }}>
                                    <span style={{
                                        fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.15em',
                                        textTransform: 'uppercase', color: current.color,
                                        display: 'block', marginBottom: '14px',
                                    }}>✦ Results with AigentG9</span>
                                    {current.results.map((r) => (
                                        <div key={r} style={{
                                            display: 'flex', alignItems: 'center', gap: '10px',
                                            padding: '10px 0', borderBottom: '1px solid rgba(0,0,0,0.04)',
                                        }}>
                                            <div style={{
                                                width: '6px', height: '6px', borderRadius: '50%',
                                                background: '#22C55E', flexShrink: 0,
                                                boxShadow: '0 0 8px rgba(34,197,94,0.3)',
                                            }} />
                                            <span style={{ fontSize: '14px', color: '#64748b' }}>{r}</span>
                                        </div>
                                    ))}
                                </div>

                                <button type="button" className="btn-ghost" style={{ alignSelf: 'flex-start' }}>
                                    Learn More <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
