import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

const socialIcons = [
  {
    label: 'Discord',
    d: 'M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.056a19.9 19.9 0 0 0 5.993 3.03.077.077 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z',
  },
  {
    label: 'X',
    d: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L2.25 2.25h6.194l4.265 5.638L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z',
  },
  {
    label: 'LinkedIn',
    d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  },
  {
    label: 'GitHub',
    d: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22',
  },
];

const navColumns = [
  {
    title: 'Platform',
    links: [
      'How it Works',
      'G9 Agents',
      'Demand Forecasting',
      'ERP Integration',
      'Pricing',
    ],
  },
  {
    title: 'Company',
    links: [
      'About AigentG9',
      'Blog',
      'Careers',
      'Privacy Policy',
      'Terms of Service',
    ],
  },
];

export default function Footer() {
  const [time, setTime] = useState('');

  /* Live IST clock */
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Asia/Kolkata',
          hour12: false,
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  /* Watermark viewBox auto-fit */
  useEffect(() => {
    const fit = () => {
      const svg = document.getElementById(
        'watermarkSvg'
      ) as SVGSVGElement | null;
      const text = document.getElementById(
        'watermarkText'
      ) as SVGTextElement | null;
      if (!svg || !text) return;
      try {
        const b = text.getBBox();
        svg.setAttribute(
          'viewBox',
          `${b.x} ${b.y} ${b.width} ${b.height}`
        );
      } catch {
        /* ignore if not rendered yet */
      }
    };
    document.fonts.ready.then(fit);
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  return (
    <section className="footer-section bg-white px-6 py-12">
      {/* Wrapper: two-column grid */}
      <div
        className="footer-wrapper max-w-[1150px] mx-auto grid gap-4 grid-cols-1 min-[860px]:grid-cols-[350px_1fr]"
        style={{ alignItems: 'stretch' }}
      >
        {/* ── LEFT CARD ── */}
        <div
          className="relative min-h-[280px] min-[860px]:min-h-[340px] rounded-[28px] p-8 overflow-hidden flex flex-col justify-between"
          style={{
            background: '#1D4ED8',
            boxShadow: '0 12px 40px rgba(29,78,216,0.28)',
          }}
        >
          {/* Background video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          >
            <source
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_104800_bc43ae09-f494-43e3-97d7-2f8c1692cfd7.mp4"
              type="video/mp4"
            />
          </video>

          {/* Logo */}
          <div className="relative z-10 flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-base tracking-tight"
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: '1.5px solid rgba(255,255,255,0.85)',
              }}
            >
              Z
            </div>
            <span className="font-bold text-white text-[22px] tracking-tight">
              Zappcode
            </span>
          </div>

          {/* Tagline */}
          <div className="relative z-10 mt-auto mb-7">
            <p className="text-white text-[19px] font-normal leading-[1.45]">
              Demand intelligence,
              <br />
              <span style={{ color: 'rgba(255,255,255,0.65)' }}>
                powered by G9 AI.
              </span>
            </p>
          </div>

          {/* Social row */}
          <div className="relative z-10 flex items-center justify-between gap-3">
            <span
              className="font-caveat text-[17px] font-semibold tracking-[0.3px]"
              style={{ color: 'rgba(255,255,255,0.9)' }}
            >
              Stay in touch!
            </span>
            <div className="flex gap-[7px]">
              {socialIcons.map(({ label, d }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-[9px] bg-[#0e1014] flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-black hover:-translate-y-0.5"
                  style={{
                    boxShadow:
                      '0 6px 18px rgba(0,0,0,0.35), 0 2px 6px rgba(0,0,0,0.2)',
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-[15px] h-[15px] fill-white"
                  >
                    <path d={d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT CARD ── */}
        <div
          className="relative rounded-[28px] p-6 min-[860px]:p-10 flex flex-col justify-between overflow-visible"
          style={{
            background: '#EFF6FF',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
          }}
        >
          {/* Floating G9 badge — overflows above card */}
          <div
            className="absolute flex flex-col items-start gap-1.5 z-10 right-3 min-[860px]:right-[40px]"
            style={{ top: '-36px' }}
          >
            <div
              className="w-18 h-18 min-[860px]:w-24 min-[860px]:h-24 rounded-[22px] flex items-center justify-center"
              style={{
                transform: 'rotate(-10deg)',
                background:
                  'linear-gradient(135deg, #60a5fa 0%, #1D4ED8 55%, #1e40af 100%)',
                boxShadow:
                  'inset 3px 3px 8px rgba(255,255,255,0.35), inset -3px -3px 12px rgba(0,0,0,0.18), 8px 14px 28px rgba(29,78,216,0.35)',
              }}
            >
              <span
                className="text-white font-bold text-[32px] min-[860px]:text-[42px] tracking-[-0.04em] leading-none drop-shadow-md"
                style={{ transform: 'rotate(10deg)' }}
              >
                Z
              </span>
            </div>
            <div
              className="flex items-center gap-1.5 mt-1"
              style={{ transform: 'rotate(-4deg)' }}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-[22px] h-[22px] text-gray-400"
              >
                <path
                  d="M3 20 C 6 14, 10 9, 18 5"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18 5 L 12 5"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18 5 L 18 11"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-caveat text-[20px] font-semibold text-gray-400 whitespace-nowrap">
                G9 Certified!
              </span>
            </div>
          </div>

          {/* Nav columns */}
          <div className="flex flex-wrap gap-8 min-[860px]:gap-18 pt-2">
            {navColumns.map(({ title, links }) => (
              <div key={title}>
                <p className="font-caveat text-2xl font-semibold italic text-gray-400 mb-[18px]">
                  {title}
                </p>
                {links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="block text-[14px] font-semibold text-gray-900 mb-[14px] no-underline transition-colors duration-200 hover:text-[#1D4ED8]"
                  >
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>

          {/* Bottom row */}
          <div className="flex flex-col items-start gap-6 min-[860px]:flex-row min-[860px]:items-end min-[860px]:justify-between min-[860px]:gap-0 mt-12">
            {/* Copyright + Clock */}
            <div className="flex flex-col gap-1.5">
              <p className="text-[12.5px] font-medium text-gray-400">
                © 2025 Zappcode. All rights reserved.
              </p>
              <span className="text-[13px] text-gray-400 flex items-center gap-1">
                <Clock size={13} /> {time} IST
              </span>
            </div>

            {/* CTA + Subscribe */}
            <div className="flex flex-col gap-3.5">
              <h4 className="text-[15px] font-normal text-gray-500 leading-[1.45]">
                AI moves fast.
                <br />
                <strong className="block text-[19px] font-bold text-gray-900">
                  Stay ahead with Zappcode.
                </strong>
              </h4>
              <div
                className="flex w-full min-[860px]:w-[310px] bg-white border border-gray-200 rounded-xl p-[5px]"
                style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}
              >
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="flex-1 px-3.5 py-[11px] bg-transparent border-none outline-none text-[13.5px] text-gray-900 placeholder-gray-400 font-sans"
                />
                <button
                  type="button"
                  className="px-[22px] py-[11px] bg-[#1D4ED8] text-white text-[13.5px] font-semibold rounded-lg transition-all duration-200 hover:bg-[#1e40af] hover:-translate-y-px"
                  style={{
                    boxShadow:
                      '0 6px 20px rgba(29,78,216,0.35), 0 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Watermark */}
      <div
        className="max-w-[1150px] mx-auto pointer-events-none select-none relative z-0 leading-none"
        style={{ marginTop: '-60px' }}
        aria-hidden="true"
      >
        <svg
          id="watermarkSvg"
          viewBox="62 95 876 175"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
            overflow: 'visible',
          }}
        >
          <text
            id="watermarkText"
            x="500"
            y="240"
            textAnchor="middle"
            fontSize="320"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              letterSpacing: '-0.03em',
              fill: 'rgba(0,0,0,0.04)',
            }}
          >
            Zappcode
          </text>
        </svg>
      </div>
    </section>
  );
}
