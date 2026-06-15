import { useEffect, useState, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Hero from './components/Hero';
import ProblemStatement from './components/ProblemStatement';
import HowItWorksLight from './components/HowItWorksLight';
// import AgentShowcase from './components/AgentShowcase';
import ROIMetrics from './components/ROIMetrics';
import UseCases from './components/UseCases';
import Integration from './components/Integration';
import BrandStory from './components/BrandStory';
import SocialProof from './components/SocialProof';
import VisionCTA from './components/VisionCTA';
import Footer from './components/Footer';


import { ArrowRight, Sparkles, Zap, BarChart3 } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import AgentScrollSection from './components/AgentScrollSection';

function ScrollProgress() {
    const [width, setWidth] = useState(0);
    useEffect(() => {
        const onScroll = () => {
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            setWidth(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    return <div className="scroll-progress" style={{ width: `${width}%` }} />;
}

function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (window.matchMedia('(max-width: 768px)').matches) return;
        if (window.matchMedia('(pointer: coarse)').matches) return;
        setVisible(true);

        let mouseX = 0, mouseY = 0;
        let dotX = 0, dotY = 0;
        let ringX = 0, ringY = 0;
        let isHovering = false;

        const onMove = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };
        const onOver = () => { isHovering = true; };
        const onLeave = () => { isHovering = false; };

        const addListeners = () => {
            document.querySelectorAll('a, button, [role="button"], .cursor-pointer, .card-light, .card-mega, .glass-card, .group').forEach((el) => {
                el.addEventListener('mouseenter', onOver);
                el.addEventListener('mouseleave', onLeave);
            });
        };

        window.addEventListener('mousemove', onMove, { passive: true });
        addListeners();
        const observer = new MutationObserver(() => addListeners());
        observer.observe(document.body, { childList: true, subtree: true });

        let raf: number;
        const tick = () => {
            dotX += (mouseX - dotX) * 0.35;
            dotY += (mouseY - dotY) * 0.35;
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;

            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${dotX - 5}px, ${dotY - 5}px)`;
            }
            if (ringRef.current) {
                const size = isHovering ? 48 : 0;
                ringRef.current.style.transform = `translate(${ringX - size / 2}px, ${ringY - size / 2}px)`;
                ringRef.current.style.width = `${size}px`;
                ringRef.current.style.height = `${size}px`;
                ringRef.current.style.opacity = isHovering ? '1' : '0';
            }
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);

        return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); observer.disconnect(); };
    }, []);

    if (!visible) return null;
    return (
        <>
            <div ref={dotRef} style={{ position: 'fixed', top: 0, left: 0, width: '10px', height: '10px', borderRadius: '50%', background: '#2563EB', pointerEvents: 'none', zIndex: 99999, mixBlendMode: 'difference' }} />
            <div ref={ringRef} style={{ position: 'fixed', top: 0, left: 0, width: 0, height: 0, borderRadius: '50%', border: '2px solid #2563EB', background: 'rgba(37,99,235,0.06)', pointerEvents: 'none', zIndex: 99998, opacity: 0, transition: 'width 0.3s cubic-bezier(0.23,1,0.32,1), height 0.3s cubic-bezier(0.23,1,0.32,1), opacity 0.2s ease' }} />
        </>
    );
}

/* ── CTA Section Divider ── */
function CTADivider({ headline, sub, btnText, btnHref, icon: Icon, variant = 'gradient' }: {
    headline: string;
    sub: string;
    btnText: string;
    btnHref: string;
    icon: typeof Sparkles;
    variant?: 'gradient' | 'dark' | 'blue';
}) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    const bgStyles: Record<string, React.CSSProperties> = {
        gradient: {
            background: 'linear-gradient(135deg, #0F172A 0%, #1e293b 50%, #0F172A 100%)',
        },
        dark: {
            background: '#0F172A',
        },
        blue: {
            background: 'linear-gradient(135deg, #1e3a8a 0%, #2563EB 50%, #1e3a8a 100%)',
        },
    };

    return (
        <div ref={ref} className="noise-overlay" style={{
            ...bgStyles[variant],
            position: 'relative', overflow: 'hidden',
            padding: 'clamp(48px, 6vw, 72px) clamp(24px, 5vw, 64px)',
        }}>
            {/* Top glow line */}
            <div style={{
                position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
                background: variant === 'blue'
                    ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                    : 'linear-gradient(90deg, transparent, rgba(37,99,235,0.3), transparent)',
            }} />
            {/* Bottom glow line */}
            <div style={{
                position: 'absolute', bottom: 0, left: '10%', right: '10%', height: '1px',
                background: variant === 'blue'
                    ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                    : 'linear-gradient(90deg, transparent, rgba(37,99,235,0.3), transparent)',
            }} />
            {/* Background orb */}
            <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '400px', height: '400px', borderRadius: '50%',
                background: variant === 'blue'
                    ? 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)'
                    : 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)',
                filter: 'blur(40px)', pointerEvents: 'none',
            }} />

            <div className="relative z-10 max-w-350 mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-12">
                {/* Icon */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5 }}
                    style={{
                        width: '56px', height: '56px', borderRadius: '16px',
                        background: variant === 'blue' ? 'rgba(255,255,255,0.1)' : 'rgba(37,99,235,0.12)',
                        border: `1px solid ${variant === 'blue' ? 'rgba(255,255,255,0.15)' : 'rgba(37,99,235,0.2)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                    }}
                >
                    <Icon size={24} style={{ color: variant === 'blue' ? '#fff' : '#60a5fa' }} />
                </motion.div>

                {/* Text */}
                <div style={{ flex: 1, textAlign: 'center', minWidth: 0 }} className="md:text-left">
                    <motion.h3
                        initial={{ opacity: 0, y: 12 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        style={{
                            fontFamily: "'DM Serif Display', serif",
                            fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
                            color: '#f1f5f9', lineHeight: 1.2,
                            margin: '0 0 6px',
                        }}
                    >{headline}</motion.h3>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '12px', color: '#64748b', letterSpacing: '0.04em', margin: 0,
                        }}
                    >{sub}</motion.p>
                </div>

                {/* CTA Button */}
                <motion.a
                    href={btnHref}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className={variant === 'blue' ? 'cta-divider-btn-white' : 'btn-primary'}
                    style={{
                        flexShrink: 0, whiteSpace: 'nowrap', textDecoration: 'none',
                        ...(variant === 'blue' ? {
                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                            padding: '14px 28px', borderRadius: '14px',
                            background: '#fff', color: '#1e3a8a',
                            fontWeight: 700, fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase' as const,
                            border: 'none', cursor: 'pointer',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                            transition: 'all 0.4s cubic-bezier(0.23,1,0.32,1)',
                        } : {}),
                    }}
                >
                    {btnText} <ArrowRight size={14} />
                </motion.a>
            </div>
        </div>
    );
}

import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';
import AgentsPage from './pages/AgentsPage';

function HomePage() {
    return (
        <main>
            <Hero />

            <ProblemStatement />

            <CTADivider
                icon={Sparkles}
                headline="See how 9 agents work in concert."
                sub="From raw data to real-time decisions — in under 48 hours."
                btnText="Explore Agents"
                btnHref="#agents"
                variant="gradient"
            />

            <HowItWorksLight />
            <AgentScrollSection />
            {/* <AgentShowcase /> */}

            <CTADivider
                icon={BarChart3}
                headline="Don't just forecast. Dominate."
                sub="40% inventory cost reduction · 3.2× first-year ROI · 35% accuracy boost"
                btnText="See the Numbers"
                btnHref="#roi"
                variant="blue"
            />

            <ROIMetrics />

            <CTADivider
                icon={Zap}
                headline="Built for your industry. Proven at scale."
                sub="FMCG · Retail · Manufacturing · E-Commerce · Pharma"
                btnText="View Use Cases"
                btnHref="#use-cases"
                variant="dark"
            />

            <UseCases />
            <Integration />
            <BrandStory />
            <SocialProof />
            {/* <ContactInquiry /> */}
            <VisionCTA />
            <Footer />
        </main>
    );
}

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
    return null;
}

function App() {
    return (
        <>
            <ScrollProgress />
            <CustomCursor />
            <ScrollToTop />
            <Routes>
                <Route path="/"        element={<HomePage />} />
                <Route path="/about"   element={<AboutUsPage />} />
                <Route path="/contact" element={<ContactUsPage />} />
                <Route path="/agents"  element={<AgentsPage />} />
            </Routes>
        </>
    );
}

export default App;
