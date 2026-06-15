import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { CloudDownload, Zap, TrendingUp } from 'lucide-react';
import processImg from '../assets/sections/process_flow.png';

const ease: [number, number, number, number] = [0.23, 1, 0.32, 1];

const steps = [
  {
    num: '01',
    icon: CloudDownload,
    title: 'Adopt',
    desc: 'Connect your ERP, POS, or spreadsheet data. AigentG9 ingests it all — no migration needed.',
    badge: '< 48 HRS',
    color: '#2563EB',
  },
  {
    num: '02',
    icon: Zap,
    title: 'Automate',
    desc: '9 specialized AI agents begin analyzing, forecasting, and recommending actions autonomously.',
    badge: '9 AGENTS',
    color: '#7c3aed',
  },
  {
    num: '03',
    icon: TrendingUp,
    title: 'Evolve',
    desc: 'Agents learn from every decision cycle, continuously sharpening accuracy and expanding coverage.',
    badge: '∞ LEARNING',
    color: '#059669',
  },
];

const badgeColors = ['#2563EB', '#7c3aed', '#059669'];

/* ── Hex polygon helper ── */
function hexPts(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (i * 60 - 30) * Math.PI / 180;
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(' ');
}

/* ── Sonar ring — reusable pulse ── */
function SonarRing({ color, size }: { color: string; size: number }) {
  return (
    <motion.div
      style={{
        position: 'absolute', top: 0, left: 0,
        width: size, height: size, borderRadius: '50%', background: color,
      }}
      animate={{ scale: [1, 2.5], opacity: [0.3, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
    />
  );
}

/* ═══════════════════════════════
   AdoptSVG — animated pipes
═══════════════════════════════ */
function AdoptSVG() {
  const svgRef = useRef<SVGSVGElement>(null);
  const inView = useInView(svgRef, { once: true, margin: '-60px' });

  const pipes = [
    { d: 'M92,58 C140,58 188,120 216,120', delay: 0 },
    { d: 'M92,122 C140,122 188,120 216,120', delay: 0.2 },
    { d: 'M92,186 C140,186 188,120 216,120', delay: 0.4 },
  ];

  return (
    <svg ref={svgRef} viewBox="0 0 320 240" width="100%" height="100%">
      <defs>
        <radialGradient id="hiw-adopt-glow" cx="75%" cy="50%" r="40%">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="240" cy="120" r="75" fill="url(#hiw-adopt-glow)" />

      {/* Source boxes + animated pipes */}
      {([['ERP', 44], ['POS', 108], ['CSV', 172]] as [string, number][]).map(([label, y], i) => (
        <g key={label}>
          <rect x="18" y={y} width="72" height="28" rx="7"
            fill="rgba(37,99,235,0.05)" stroke="rgba(37,99,235,0.2)" strokeWidth="1" />
          <text x="54" y={y + 18} fill="#2563EB" fontSize="11" fontWeight="600"
            textAnchor="middle" fontFamily="JetBrains Mono, monospace">{label}</text>

          {/* Pipe draws in */}
          <motion.path
            d={pipes[i].d}
            fill="none" stroke="rgba(37,99,235,0.18)" strokeWidth="1.5" strokeDasharray="5 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: pipes[i].delay, ease: [0.4, 0, 0.2, 1] }}
          />

          {/* Data flowing dot — native SVG animateMotion */}
          {inView && (
            <circle r="3" fill="#2563EB" opacity="0.55">
              <animateMotion dur="2.5s" begin={`${pipes[i].delay * 1.2}s`}
                repeatCount="indefinite" path={pipes[i].d} />
            </circle>
          )}
        </g>
      ))}

      {/* Outer static ring */}
      <circle cx="240" cy="120" r="44" fill="rgba(37,99,235,0.04)" stroke="rgba(37,99,235,0.12)" strokeWidth="1" />
      {/* Pulsing middle ring */}
      <motion.circle cx="240" cy="120" r="27"
        fill="rgba(37,99,235,0.08)" stroke="rgba(37,99,235,0.22)" strokeWidth="1.5"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '240px 120px' }}
      />
      <circle cx="240" cy="120" r="10" fill="#2563EB" />
      <circle cx="240" cy="120" r="55" fill="none" stroke="rgba(37,99,235,0.06)" strokeWidth="1" strokeDasharray="3 6" />
    </svg>
  );
}

/* ═══════════════════════════════
   AutomateSVG — orbiting hexagons
═══════════════════════════════ */
function AutomateSVG() {
  const svgRef = useRef<SVGSVGElement>(null);
  const inView = useInView(svgRef, { once: true, margin: '-60px' });
  const cx = 160, cy = 120, r = 80;
  const nodes = Array.from({ length: 8 }, (_, i) => ({
    x: cx + r * Math.cos((i * 45) * Math.PI / 180),
    y: cy + r * Math.sin((i * 45) * Math.PI / 180),
    col: (['#7c3aed', '#a78bfa', '#c4b5fd'] as const)[i % 3],
  }));

  return (
    <svg ref={svgRef} viewBox="0 0 320 240" width="100%" height="100%">
      <defs>
        <radialGradient id="hiw-auto-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r="105" fill="url(#hiw-auto-glow)" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(124,58,237,0.08)" strokeWidth="1" strokeDasharray="3 5" />

      {/* Orbit nodes — stagger in */}
      {nodes.map((n, i) => (
        <g key={i}>
          {/* Line fades in */}
          <motion.line x1={cx} y1={cy} x2={n.x} y2={n.y}
            stroke="rgba(124,58,237,0.1)" strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: i * 0.08 + 0.1 }}
          />
          {/* Hex scales in with spring */}
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ type: 'spring', stiffness: 260, damping: 18, delay: i * 0.08 }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          >
            <polygon points={hexPts(n.x, n.y, 13)} fill={`${n.col}18`} stroke={n.col} strokeWidth="1" />
          </motion.g>
          {/* Node pulse */}
          <motion.circle cx={n.x} cy={n.y} r="3" fill={n.col}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.25, ease: 'easeInOut' }}
          />
        </g>
      ))}

      {/* Center hexagons — slow radar rotate */}
      <motion.g
        style={{ transformOrigin: `${cx}px ${cy}px` }}
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      >
        <polygon points={hexPts(cx, cy, 30)} fill="rgba(124,58,237,0.06)" stroke="rgba(124,58,237,0.25)" strokeWidth="1.5" />
        <polygon points={hexPts(cx, cy, 18)} fill="rgba(124,58,237,0.1)" stroke="rgba(124,58,237,0.35)" strokeWidth="1" />
      </motion.g>
      {/* Fixed center dot */}
      <circle cx={cx} cy={cy} r="8" fill="#7c3aed" />
    </svg>
  );
}

/* ═══════════════════════════════
   EvolveSVG — clipPath reveal
═══════════════════════════════ */
function EvolveSVG() {
  const svgRef = useRef<SVGSVGElement>(null);
  const inView = useInView(svgRef, { once: true, margin: '-60px' });

  return (
    <svg ref={svgRef} viewBox="0 0 320 240" width="100%" height="100%">
      <defs>
        <linearGradient id="hiw-ev-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hiw-ev-stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#059669" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <filter id="hiw-ep-glow">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        {/* Expanding clip rect — reveals fill left→right */}
        <clipPath id="hiw-ev-clip">
          <motion.rect
            x="28" y="0" height="240"
            initial={{ width: 0 }}
            animate={inView ? { width: 264 } : {}}
            transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
          />
        </clipPath>
      </defs>

      {/* Grid lines */}
      {[70, 110, 150, 190].map(y => (
        <line key={y} x1="28" y1={y} x2="295" y2={y} stroke="rgba(5,150,105,0.05)" strokeWidth="1" />
      ))}

      {/* Area fill — clipped reveal */}
      <g clipPath="url(#hiw-ev-clip)">
        <path d="M28,198 C70,192 110,176 150,151 C190,125 232,97 280,57 L280,212 L28,212 Z"
          fill="url(#hiw-ev-fill)" />
      </g>

      {/* Stroke line — pathLength draw */}
      <motion.path
        d="M28,198 C70,192 110,176 150,151 C190,125 232,97 280,57"
        fill="none" stroke="url(#hiw-ev-stroke)" strokeWidth="2.5" strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Mid data points */}
      {([[88, 184], [150, 151], [212, 112]] as [number, number][]).map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="3.5" fill="#059669" opacity="0.4" />
      ))}

      {/* Endpoint halo */}
      <circle cx="280" cy="57" r="17" fill="rgba(5,150,105,0.08)" />
      {/* Endpoint spring bounce */}
      <motion.circle cx="280" cy="57" r="9" fill="#059669"
        filter="url(#hiw-ep-glow)" opacity="0.55"
        initial={{ scale: 0 }}
        animate={inView ? { scale: [0, 1.4, 1] } : {}}
        transition={{ duration: 0.6, delay: 1.6, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformOrigin: '280px 57px' }}
      />
      {/* Endpoint continuous pulse */}
      <motion.circle cx="280" cy="57" r="5" fill="#059669"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay: 2.2, ease: 'easeInOut' }}
        style={{ transformOrigin: '280px 57px' }}
      />

      {/* Badge slides down after line finishes */}
      <motion.g
        initial={{ opacity: 0, y: -10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 1.9, ease }}
      >
        <rect x="248" y="32" width="78" height="20" rx="5"
          fill="rgba(5,150,105,0.07)" stroke="rgba(5,150,105,0.18)" strokeWidth="1" />
        <text x="287" y="46" fill="#059669" fontSize="10" fontWeight="700"
          textAnchor="middle" fontFamily="JetBrains Mono, monospace">+34% ACC</text>
      </motion.g>
    </svg>
  );
}

const illustrations = [AdoptSVG, AutomateSVG, EvolveSVG];

/* ═══════════════════════════════
   Main section
═══════════════════════════════ */
export default function HowItWorksLight() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  /* Section-scoped scroll progress bar */
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const barScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={ref}
      id="how-it-works"
      style={{ background: '#FFFFFF', padding: 'clamp(80px, 12vw, 160px) 0', position: 'relative', overflow: 'hidden' }}
    >
      <style>{`
        @media (max-width: 767px) {
          .howit-row-left  { flex-direction: column-reverse !important; }
          .howit-row-right { flex-direction: column !important; }
          .howit-dot-col   { display: none !important; }
          .howit-col       { flex: 0 0 100% !important; width: 100% !important; }
          .howit-inner     { padding: 0 !important; }
          .howit-timeline  { display: none !important; }
          .howit-header-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Section-scoped progress bar */}
      <motion.div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 4,
        background: 'linear-gradient(90deg, #2563EB, #7c3aed, #059669)',
        scaleX: barScaleX, transformOrigin: 'left', zIndex: 10,
      }} />

      {/* Ambient wash */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 20% 50%, rgba(37,99,235,0.04) 0%, transparent 60%)',
      }} />

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 clamp(24px, 5vw, 64px)', position: 'relative', zIndex: 1 }}>

        {/* ─── HEADER + IMAGE GRID ─── */}
        <div className="howit-header-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'clamp(32px, 5vw, 64px)', alignItems: 'center', marginBottom: 'clamp(64px, 9vw, 110px)' }}>

          {/* LEFT — Content */}
          <div>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 16, marginBottom: 28 }}
            >
              <div style={{ width: 60, height: 2, background: 'linear-gradient(90deg, #2563EB, #60a5fa)', borderRadius: 2, flexShrink: 0 }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#2563EB', fontWeight: 600 }}>
                How It Works
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease }}
              style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2.4rem, 4.5vw, 4.2rem)', color: '#0A0F1E', lineHeight: 1.05, letterSpacing: '-0.02em', margin: 0 }}
            >
              Three steps to
              <br />
              <span style={{ position: 'relative', display: 'inline-block', paddingBottom: 12 }}>
                autonomous intelligence.
                {/* Wavy underline */}
                <motion.svg
                  viewBox="0 0 600 22" preserveAspectRatio="none" aria-hidden
                  style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 18, overflow: 'visible', transformOrigin: 'center' }}
                  animate={inView ? { scaleX: [1, 1.008, 1] } : {}}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 2.2 }}
                >
                  <motion.path
                    d="M0,11 C60,2 120,20 180,11 C240,2 300,20 360,11 C420,2 480,20 540,11 L600,11"
                    fill="none" stroke="#2563EB" strokeWidth="8" strokeLinecap="round"
                    initial={{ pathLength: 0, strokeOpacity: 0.1 }}
                    animate={inView ? { pathLength: 1, strokeOpacity: 0.28 } : {}}
                    transition={{ duration: 1.3, delay: 0.65, ease: [0.4, 0, 0.2, 1] }}
                  />
                </motion.svg>
              </span>
            </motion.h2>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.28, ease }}
              style={{ fontSize: 18, color: '#64748B', lineHeight: 1.65, maxWidth: 480, margin: 'clamp(24px, 2.5vw, 36px) 0 0' }}
            >
              From raw data to autonomous decisions in three intelligent steps.
            </motion.p>

            {/* Inline stats row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45, ease }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginTop: 'clamp(28px, 3vw, 44px)' }}
            >
              {[
                { stat: '9 AI Agents', label: 'Working in Concert' },
                { stat: 'Real-time', label: 'Decisions' },
                { stat: '< 48hr', label: 'Setup Time' },
              ].map(({ stat, label }, i) => (
                <motion.div
                  key={stat}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.55 + i * 0.1, ease }}
                  style={{ padding: '12px 20px', borderRadius: 14, background: 'rgba(37,99,235,0.04)', border: '1px solid rgba(37,99,235,0.1)' }}
                >
                  <div style={{ fontWeight: 800, fontSize: 16, color: '#0F172A', letterSpacing: '-0.01em' }}>{stat}</div>
                  <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2, letterSpacing: '0.04em', fontFamily: "'JetBrains Mono', monospace" }}>{label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Image */}
          <motion.div
            initial={{ opacity: 0, y: 44, scale: 0.97 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1.1, delay: 0.32, ease }}
            whileHover={{ scale: 1.01, transition: { duration: 0.5, ease } }}
            style={{ position: 'relative', borderRadius: 28, overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.04), 0 24px 80px rgba(37,99,235,0.10), 0 0 0 1px rgba(37,99,235,0.06)', cursor: 'default' }}
          >
            <img src={processImg} alt="AI Processing Pipeline" loading="lazy" decoding="async"
              style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover', objectPosition: 'center 40%', minHeight: 360 }} />
          </motion.div>
        </div>

        {/* ─── STEPS ─── */}
        <div style={{ position: 'relative' }}>

          {/* Timeline dashed line — grows down, contains scanning glow */}
          <motion.div
            className="howit-timeline"
            initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.7, delay: 0.45, ease }}
            style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, transform: 'translateX(-50%)', transformOrigin: 'top', background: 'repeating-linear-gradient(to bottom, rgba(37,99,235,0.14) 0px, rgba(37,99,235,0.14) 8px, transparent 8px, transparent 18px)', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}
          >
            {/* Scanning light that travels down the line */}
            <motion.div
              style={{ position: 'absolute', left: 0, right: 0, height: 40, background: 'linear-gradient(to bottom, rgba(37,99,235,0), rgba(37,99,235,0.5), rgba(37,99,235,0))' }}
              animate={{ top: ['-10%', '110%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 1.8 }}
            />
          </motion.div>

          {steps.map((step, i) => {
            const contentLeft = i % 2 === 0;
            const Icon = step.icon;
            const Illust = illustrations[i];

            /* ── Content block ── */
            const contentBlock = (
              <div className="howit-inner" style={{ position: 'relative', overflow: 'hidden', padding: contentLeft ? '0 56px 0 0' : '0 0 0 56px' }}>

                {/* Ghost number — emerges from behind */}
                <motion.div
                  initial={{ scale: 1.4, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 0.05 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.85, delay: 0.22, ease }}
                  style={{
                    position: 'absolute', top: -24,
                    [contentLeft ? 'left' : 'right']: -16,
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: 'clamp(100px, 15vw, 180px)',
                    color: '#2563EB', lineHeight: 1,
                    userSelect: 'none', pointerEvents: 'none',
                    whiteSpace: 'nowrap', zIndex: 0,
                    filter: 'blur(2px)',
                  }}
                >
                  {step.num}
                </motion.div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                  {/* Step label */}
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.2em', color: '#94A3B8', textTransform: 'uppercase', marginBottom: 16 }}>
                    Step {step.num} · {step.title}
                  </div>

                  {/* Icon box — spring bounce on entry, hover scale, continuous rotate */}
                  <motion.div
                    whileHover={{ scale: 1.08, transition: { duration: 0.3, ease } }}
                    style={{ display: 'inline-block', marginBottom: 28, cursor: 'default' }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.25 + i * 0.1 }}
                      style={{ width: 68, height: 68, borderRadius: 20, background: `linear-gradient(135deg, ${step.color}15, ${step.color}06)`, border: `1px solid ${step.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      {/* Subtle continuous icon rotate */}
                      <motion.div
                        animate={{ rotate: [0, 8, -8, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <Icon size={28} style={{ color: step.color }} />
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  {/* Title */}
                  <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2rem, 3vw, 2.8rem)', color: '#0A0F1E', lineHeight: 1.1, letterSpacing: '-0.01em', margin: '0 0 16px' }}>
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p style={{ fontSize: 16, fontWeight: 500, color: '#374151', lineHeight: 1.8, maxWidth: 480, margin: '0 0 28px' }}>
                    {step.desc}
                  </p>

                  {/* Badge + Learn more */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                    {/* Badge — spring scale in */}
                    <motion.span
                      initial={{ scale: 0.9, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.4 + i * 0.1 }}
                      style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.15em', color: step.color, padding: '8px 18px', background: `${step.color}08`, border: `1px solid ${step.color}25`, borderRadius: 10, display: 'inline-block' }}
                    >
                      {step.badge}
                    </motion.span>

                    {/* Learn more — animated arrow + growing underline */}
                    <motion.a
                      href="#"
                      whileHover="hovered"
                      initial="initial"
                      style={{ color: '#2563EB', fontSize: 14, fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 3, position: 'relative' }}
                    >
                      <span>Learn more</span>
                      <motion.span
                        variants={{ initial: { x: 0 }, hovered: { x: 5 } }}
                        transition={{ duration: 0.2, ease }}
                        style={{ display: 'inline-block' }}
                      >→</motion.span>
                      {/* Underline grows on hover */}
                      <motion.span
                        variants={{ initial: { scaleX: 0 }, hovered: { scaleX: 1 } }}
                        transition={{ duration: 0.25, ease }}
                        style={{ position: 'absolute', bottom: -2, left: 0, width: '100%', height: 1, background: '#2563EB', transformOrigin: 'left', display: 'block' }}
                      />
                    </motion.a>
                  </div>
                </div>
              </div>
            );

            /* ── Visual block ── */
            const visualBlock = (
              <motion.div
                initial={{ scale: 0.92, rotate: contentLeft ? -2 : 2, opacity: 0, filter: 'blur(4px)' }}
                whileInView={{ scale: 1, rotate: 0, opacity: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.88, delay: contentLeft ? 0.1 : 0, ease }}
                whileHover={{ boxShadow: '0 16px 48px rgba(37,99,235,0.12)' }}
                style={{ width: '100%', height: 320, borderRadius: 28, background: 'linear-gradient(135deg, #F8FAFF, #EEF2FF)', border: '1px solid rgba(37,99,235,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: 32, boxShadow: '0 8px 32px rgba(37,99,235,0.07)', cursor: 'default' }}
              >
                <Illust />
              </motion.div>
            );

            return (
              <div key={step.num}>
                {/* Step row — left and right cols animate independently */}
                <div className={`howit-row-${contentLeft ? 'left' : 'right'}`}
                  style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>

                  {/* Left column */}
                  <motion.div
                    className="howit-col"
                    initial={{ opacity: 0, x: contentLeft ? -60 : 0, filter: 'blur(4px)' }}
                    whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.82, delay: contentLeft ? 0 : 0.1, ease }}
                    style={{ flex: '0 0 45%' }}
                  >
                    {contentLeft ? contentBlock : visualBlock}
                  </motion.div>

                  {/* Center: timeline dot with sonar ring */}
                  <div className="howit-dot-col"
                    style={{ flex: '0 0 10%', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
                    <div style={{ position: 'relative', width: 14, height: 14 }}>
                      <SonarRing color={step.color} size={14} />
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.35 + i * 0.15 }}
                        style={{ position: 'relative', zIndex: 1, width: 14, height: 14, borderRadius: '50%', background: step.color, boxShadow: `0 0 0 5px ${step.color}22` }}
                      />
                    </div>
                  </div>

                  {/* Right column */}
                  <motion.div
                    className="howit-col"
                    initial={{ opacity: 0, x: contentLeft ? 0 : 60, filter: 'blur(4px)' }}
                    whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.82, delay: contentLeft ? 0.1 : 0, ease }}
                    style={{ flex: '0 0 45%' }}
                  >
                    {contentLeft ? visualBlock : contentBlock}
                  </motion.div>
                </div>

                {/* Inter-step divider — draws from center */}
                {i < 2 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.8, ease }}
                    style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(37,99,235,0.15), transparent)', margin: 'clamp(48px, 7vw, 80px) 0', transformOrigin: 'center' }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* ─── BOTTOM BADGES ─── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          whileHover={{ boxShadow: '0 8px 40px rgba(37,99,235,0.12)', transition: { duration: 0.3 } }}
          style={{ marginTop: 'clamp(48px, 7vw, 80px)', background: 'linear-gradient(135deg, #F0F4FF, #F8FAFF)', border: '1px solid rgba(37,99,235,0.1)', borderRadius: 20, padding: 'clamp(20px, 3vw, 32px) clamp(24px, 4vw, 48px)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 'clamp(20px, 4vw, 48px)', boxShadow: '0 4px 24px rgba(37,99,235,0.06)' }}
        >
          {['Live in < 48 hrs', 'No code changes', 'Full audit trail'].map((item, i) => (
            <motion.span
              key={item}
              variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
              transition={{ duration: 0.5, delay: i * 0.12, ease }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#475569', letterSpacing: '0.04em' }}
            >
              {/* Dot with sonar ring */}
              <span style={{ position: 'relative', display: 'inline-flex', width: 8, height: 8, flexShrink: 0 }}>
                <SonarRing color={badgeColors[i]} size={8} />
                <span style={{ position: 'relative', zIndex: 1, width: 8, height: 8, borderRadius: '50%', background: badgeColors[i], display: 'inline-block' }} />
              </span>
              {item}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
