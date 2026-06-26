'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import {
  Camera, Shirt, TrendingDown, MessageCircle, ArrowRight,
  Star, Users, Zap, Shield, ChevronRight, Sparkles,
  ShoppingBag, Bell, CheckCircle, Globe, Lock, BarChart3
} from 'lucide-react';

// ─────────────────────────────────────────────
// 🔗 CONFIGURATION — Edit these values
// ─────────────────────────────────────────────
const CONFIG = {
  // PASTE YOUR WhatsApp wa.me LINK HERE 👇
  WHATSAPP_LINK: 'https://wa.me/919587193515?text=Hi%20Choizo!%20I%20want%20to%20start%20AI%20shopping',

  // Bot name
  BOT_NAME: 'Choizo',
};

// ─────────────────────────────────────────────
// Live savings data for marquee
// ─────────────────────────────────────────────
const SAVINGS = [
  { name: 'Rahul K.', saved: '₹1,200', store: 'Myntra', emoji: '👕' },
  { name: 'Priya S.', saved: '₹3,400', store: 'Amazon', emoji: '📱' },
  { name: 'Arjun M.', saved: '₹890', store: 'Flipkart', emoji: '👟' },
  { name: 'Neha T.', saved: '₹5,100', store: 'Nykaa', emoji: '💄' },
  { name: 'Vikram R.', saved: '₹2,700', store: 'Ajio', emoji: '👗' },
  { name: 'Sneha P.', saved: '₹1,650', store: 'Meesho', emoji: '🛍️' },
  { name: 'Karan D.', saved: '₹4,200', store: 'Snapdeal', emoji: '💻' },
  { name: 'Aarti B.', saved: '₹980', store: 'Myntra', emoji: '👜' },
  { name: 'Rohan V.', saved: '₹3,800', store: 'Amazon', emoji: '⌚' },
  { name: 'Meera J.', saved: '₹1,100', store: 'Flipkart', emoji: '🎧' },
];

const FEATURES = [
  {
    icon: Camera,
    title: 'Screenshot-to-Search',
    desc: 'Snap a photo of anything you like. Our AI instantly finds it across 50+ stores — in seconds.',
    tag: 'AI Visual Match',
    delay: 0,
  },
  {
    icon: Shirt,
    title: 'Virtual Fitting Room',
    desc: 'Upload your photo and see exactly how clothes look on YOUR body before buying. Zero returns.',
    tag: 'Try Before Buy',
    delay: 1,
  },
  {
    icon: TrendingDown,
    title: 'Price-Drop Sniper',
    desc: 'We track prices 24/7. The moment your item drops in price, you get an instant WhatsApp alert.',
    tag: 'Real-time Alert',
    delay: 2,
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Deals',
    desc: 'Get curated discount links, coupon codes, and cashback offers delivered straight to WhatsApp.',
    tag: 'Instant Delivery',
    delay: 3,
  },
  {
    icon: Globe,
    title: 'Pan-India Coverage',
    desc: 'We scrape deals from 50+ Indian and global e-commerce platforms simultaneously. Nothing slips through.',
    tag: '50+ Platforms',
    delay: 4,
  },
  {
    icon: Shield,
    title: '100% Safe & Private',
    desc: 'Your data never leaves our encrypted servers. No tracking, no selling, no spam. Just pure savings.',
    tag: 'Zero Spam',
    delay: 5,
  },
];

const STATS = [
  { value: '2.4L+', label: 'Active Shoppers' },
  { value: '₹12Cr+', label: 'Total Savings' },
  { value: '50+', label: 'Stores Covered' },
  { value: '4.9★', label: 'User Rating' },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Send a photo', desc: 'Screenshot any product you love and send it to Choizo on WhatsApp.' },
  { step: '02', title: 'AI does the work', desc: 'Our AI finds the exact item, compares prices across 50+ stores in real time.' },
  { step: '03', title: 'Save big', desc: 'Get the best deal link, active coupons, and cashback — directly in your chat.' },
];

// ─────────────────────────────────────────────
// CANVAS BACKGROUND — animated mesh + particles
// ─────────────────────────────────────────────
function CanvasBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    // Nodes
    const NODE_COUNT = Math.min(80, Math.floor((W * H) / 14000));
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
      opacity: Math.random() * 0.6 + 0.2,
    }));

    // Ripples from clicks
    const ripples = [];

    const addRipple = (x, y) => {
      ripples.push({ x, y, r: 0, maxR: 120, opacity: 0.6 });
    };

    const onMouse = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onClick = (e) => addRipple(e.clientX, e.clientY);
    const onTouch = (e) => {
      const t = e.touches[0];
      addRipple(t.clientX, t.clientY);
      mouseRef.current = { x: t.clientX, y: t.clientY };
    };

    window.addEventListener('mousemove', onMouse);
    window.addEventListener('click', onClick);
    window.addEventListener('touchstart', onTouch);

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    let frame = 0;
    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, W, H);

      // Mouse influence
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Update + draw nodes
      nodes.forEach((n) => {
        // Gentle attraction toward mouse
        const dx = mx - n.x;
        const dy = my - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          n.vx += (dx / dist) * 0.008;
          n.vy += (dy / dist) * 0.008;
        }

        n.vx *= 0.99;
        n.vy *= 0.99;
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;

        n.opacity = 0.2 + 0.3 * Math.sin(frame * 0.02 + n.x);

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(37, 211, 102, ${n.opacity})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            const alpha = (1 - d / 120) * 0.25;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(37, 211, 102, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.r += 3;
        rp.opacity -= 0.015;
        if (rp.opacity <= 0) { ripples.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(37, 211, 102, ${rp.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('click', onClick);
      window.removeEventListener('touchstart', onTouch);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0, pointerEvents: 'none',
      }}
    />
  );
}

// ─────────────────────────────────────────────
// CUSTOM CURSOR
// ─────────────────────────────────────────────
function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
    };

    const onOver = (e) => {
      if (e.target.closest('a,button,.feature-card,.cta-btn')) {
        ring.classList.add('hovering');
      }
    };
    const onOut = () => ring.classList.remove('hovering');

    let animId;
    const followRing = () => {
      ringPosRef.current.x += (posRef.current.x - ringPosRef.current.x) * 0.12;
      ringPosRef.current.y += (posRef.current.y - ringPosRef.current.y) * 0.12;
      ring.style.left = ringPosRef.current.x + 'px';
      ring.style.top = ringPosRef.current.y + 'px';
      animId = requestAnimationFrame(followRing);
    };
    followRing();

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

// ─────────────────────────────────────────────
// AD BANNER — Top (Adsterra)
// ─────────────────────────────────────────────
function AdBannerTop() {
  return (
    <div className="ad-banner" style={{ minHeight: 50 }}>
      {/* ───────────────────────────────────────────────
          📢 ADSTERRA AD SCRIPT — TOP BANNER (320x50)
          Paste your Adsterra Native Banner / Direct Link script here.
          Example:
          <script async src="//your-adsterra-script-url.js"></script>
          ─────────────────────────────────────────────── */}
      <div
        style={{
          width: 320, height: 50,
          background: 'rgba(37,211,102,0.05)',
          border: '1px dashed rgba(37,211,102,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, color: 'rgba(255,255,255,0.3)', borderRadius: 4,
        }}
      >
        Ad Placement — Adsterra 320×50
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// HEADER
// ─────────────────────────────────────────────
function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? 'header-blur' : ''}`}
      style={{ borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div
            style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, #25D366, #128C7E)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 20px rgba(37,211,102,0.4)',
            }}
          >
            <ShoppingBag size={18} color="#fff" />
          </div>
          <span
            style={{
              fontSize: 22, fontWeight: 800, letterSpacing: '-0.5px',
              background: 'linear-gradient(135deg, #fff 40%, #25D366)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}
          >
            {CONFIG.BOT_NAME}
          </span>
        </div>

        {/* Nav (desktop only) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how" className="hover:text-white transition-colors">How it works</a>
          <a href="#stats" className="hover:text-white transition-colors">Results</a>
        </nav>

        {/* CTA */}
        <a
          href={CONFIG.WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-btn flex items-center gap-2 px-4 py-2 text-white text-sm font-semibold"
          style={{ borderRadius: 12 }}
        >
          <MessageCircle size={16} />
          <span>Launch App</span>
        </a>
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────
// SAVINGS MARQUEE
// ─────────────────────────────────────────────
function SavingsMarquee() {
  const items = [...SAVINGS, ...SAVINGS];
  return (
    <div
      style={{
        background: 'rgba(37,211,102,0.04)',
        borderTop: '1px solid rgba(37,211,102,0.15)',
        borderBottom: '1px solid rgba(37,211,102,0.15)',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* Left fade */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to right, #020817, transparent)', zIndex: 2 }} />
      {/* Right fade */}
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to left, #020817, transparent)', zIndex: 2 }} />

      <div className="marquee-track py-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2 px-8 whitespace-nowrap">
            <div className="live-dot" />
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
              <span style={{ color: '#4ade80', fontWeight: 600 }}>{item.name}</span>
              {' '}saved{' '}
              <span style={{ color: '#25D366', fontWeight: 700 }}>{item.saved}</span>
              {' '}on{' '}
              <span style={{ color: '#fff', fontWeight: 500 }}>{item.store}</span>
              {' '}{item.emoji}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.15)', marginLeft: 16, fontSize: 16 }}>·</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// HERO SECTION
// ─────────────────────────────────────────────
function HeroSection() {
  const [typed, setTyped] = useState('');
  const phrases = ['₹1,200 on Shoes', '₹3,400 on Phones', '₹890 on Clothes', '₹5,100 on Makeup'];
  const phraseIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);

  // Typing animation
  useEffect(() => {
    const tick = () => {
      const phrase = phrases[phraseIdx.current];
      if (!deleting.current) {
        charIdx.current++;
        setTyped(phrase.slice(0, charIdx.current));
        if (charIdx.current === phrase.length) {
          deleting.current = true;
          setTimeout(tick, 1800);
          return;
        }
      } else {
        charIdx.current--;
        setTyped(phrase.slice(0, charIdx.current));
        if (charIdx.current === 0) {
          deleting.current = false;
          phraseIdx.current = (phraseIdx.current + 1) % phrases.length;
        }
      }
      setTimeout(tick, deleting.current ? 40 : 80);
    };
    const t = setTimeout(tick, 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 py-20"
      style={{ zIndex: 5 }}
    >
      {/* Ambient orbs */}
      <div className="orb" style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(37,211,102,0.12) 0%, transparent 70%)', top: '10%', left: '-10%' }} />
      <div className="orb" style={{ width: 400, height: 400, background: 'radial-gradient(circle, rgba(18,140,126,0.1) 0%, transparent 70%)', bottom: '10%', right: '-10%', animationDelay: '-4s' }} />

      <div className="max-w-4xl mx-auto">
        {/* Badge */}
        <div className="reveal flex justify-center mb-6">
          <div className="hero-badge">
            <Sparkles size={13} />
            Powered by Advanced AI · WhatsApp Native
          </div>
        </div>

        {/* Tagline */}
        <p className="reveal reveal-delay-1 text-sm font-semibold tracking-widest uppercase mb-4"
          style={{ color: '#25D366', letterSpacing: '0.25em' }}>
          Your Personal AI Shopping Agent
        </p>

        {/* Headline */}
        <h1 className="reveal reveal-delay-2 font-black leading-none tracking-tight mb-6"
          style={{ fontSize: 'clamp(36px, 7vw, 80px)', color: '#ffffff' }}>
          Stop Overpaying.{' '}
          <span className="gradient-text">Start Saving.</span>
          <br />
          <span style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 700, fontSize: '0.65em' }}>
            Unlock the Future of AI Shopping.
          </span>
        </h1>

        {/* Typing savings */}
        <div className="reveal reveal-delay-2 flex justify-center mb-4">
          <div
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'rgba(37,211,102,0.08)',
              border: '1px solid rgba(37,211,102,0.2)',
              borderRadius: 12, padding: '10px 20px',
            }}
          >
            <Zap size={16} color="#25D366" />
            <span style={{ color: '#aaa', fontSize: 15 }}>
              Today's top save:{' '}
              <span style={{ color: '#25D366', fontWeight: 700, minWidth: 160, display: 'inline-block', textAlign: 'left' }}>
                {typed}
                <span style={{ borderRight: '2px solid #25D366', marginLeft: 2, animation: 'none' }}>|</span>
              </span>
            </span>
          </div>
        </div>

        {/* Sub-headline */}
        <p className="reveal reveal-delay-3 mb-10 mx-auto"
          style={{ maxWidth: 600, fontSize: 'clamp(15px, 2vw, 19px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
          Upload a photo to see it on yourself. Find the lowest prices across 50+ stores.
          Get instant discount links via{' '}
          <span style={{ color: '#25D366', fontWeight: 600 }}>WhatsApp</span>.
        </p>

        {/* CTA Buttons */}
        <div className="reveal reveal-delay-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Primary CTA */}
          <a
            href={CONFIG.WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn shine-btn flex items-center justify-center gap-3 px-8 py-4 text-white font-bold text-lg w-full sm:w-auto"
            style={{
              borderRadius: 18,
              background: 'linear-gradient(135deg, #25D366 0%, #128C7E 50%, #25D366 100%)',
              backgroundSize: '200% auto',
              animation: 'shine 3s linear infinite',
              minWidth: 260,
              fontSize: 18,
            }}
          >
            <MessageCircle size={22} />
            Start AI Shopping
            <ArrowRight size={18} />
          </a>

          {/* Secondary CTA */}
          <a
            href="#how"
            className="flex items-center gap-2 px-6 py-4 font-semibold text-sm"
            style={{
              color: 'rgba(255,255,255,0.6)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 18,
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.borderColor = 'rgba(37,211,102,0.4)';
              e.currentTarget.style.background = 'rgba(37,211,102,0.05)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            See how it works
            <ChevronRight size={16} />
          </a>
        </div>

        {/* Trust indicators */}
        <div className="reveal flex flex-wrap justify-center gap-6 mt-12" style={{ opacity: 0.6 }}>
          {[
            { icon: CheckCircle, text: 'Free to use' },
            { icon: Shield, text: '100% Secure' },
            { icon: Star, text: '4.9★ Rated' },
            { icon: Users, text: '2.4L+ Users' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
              <Icon size={14} color="#25D366" />
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2"
        style={{ transform: 'translateX(-50%)', animation: 'float 2s ease-in-out infinite' }}
      >
        <div style={{ width: 24, height: 40, border: '1.5px solid rgba(37,211,102,0.3)', borderRadius: 12, display: 'flex', justifyContent: 'center', paddingTop: 6 }}>
          <div style={{ width: 3, height: 8, background: '#25D366', borderRadius: 2, animation: 'float 1.5s ease-in-out infinite' }} />
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// STATS SECTION
// ─────────────────────────────────────────────
function StatsSection() {
  return (
    <section id="stats" className="relative py-16 px-4" style={{ zIndex: 5 }}>
      <div className="max-w-5xl mx-auto">
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-1 rounded-2xl overflow-hidden glass-card gradient-border"
          style={{ border: '1px solid rgba(37,211,102,0.15)' }}
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              className="reveal flex flex-col items-center justify-center py-8 px-4 text-center"
              style={{
                borderRight: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                background: i % 2 === 0 ? 'rgba(37,211,102,0.02)' : 'transparent',
              }}
            >
              <div className="gradient-text font-black mb-1" style={{ fontSize: 'clamp(28px, 5vw, 44px)' }}>
                {s.value}
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// FEATURES SECTION
// ─────────────────────────────────────────────
function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 px-4" style={{ zIndex: 5 }}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 reveal">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#25D366', letterSpacing: '0.2em' }}>
            What Choizo Does
          </p>
          <h2 className="font-black mb-4" style={{ fontSize: 'clamp(28px, 5vw, 52px)', color: '#fff', letterSpacing: '-1px' }}>
            Everything you need to{' '}
            <span className="gradient-text">never overpay</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
            Six powerful AI tools, all accessible through WhatsApp. No app download needed.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className={`feature-card glass-card gradient-border reveal reveal-delay-${(f.delay % 4) + 1} rounded-2xl p-6`}
                style={{ borderRadius: 20 }}
              >
                {/* Icon + Tag */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    style={{
                      width: 48, height: 48, borderRadius: 14,
                      background: 'rgba(37,211,102,0.1)',
                      border: '1px solid rgba(37,211,102,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <Icon size={22} color="#25D366" />
                  </div>
                  <span
                    style={{
                      fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
                      color: '#25D366', background: 'rgba(37,211,102,0.1)',
                      border: '1px solid rgba(37,211,102,0.2)',
                      padding: '3px 10px', borderRadius: 100, textTransform: 'uppercase',
                    }}
                  >
                    {f.tag}
                  </span>
                </div>

                <h3 className="font-bold mb-2" style={{ fontSize: 18, color: '#fff' }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// HOW IT WORKS
// ─────────────────────────────────────────────
function HowItWorks() {
  return (
    <section id="how" className="relative py-24 px-4" style={{ zIndex: 5 }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 reveal">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#25D366', letterSpacing: '0.2em' }}>
            Simple as WhatsApp
          </p>
          <h2 className="font-black mb-4" style={{ fontSize: 'clamp(28px, 5vw, 52px)', color: '#fff', letterSpacing: '-1px' }}>
            How <span className="gradient-text">Choizo</span> works
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {HOW_IT_WORKS.map((step, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1} glass-card gradient-border rounded-2xl p-6 flex items-start gap-6`}
              style={{
                borderRadius: 20,
                transform: `translateX(${i % 2 === 0 ? '-20px' : '20px'})`,
                opacity: 0,
              }}
            >
              <div
                style={{
                  minWidth: 56, height: 56, borderRadius: 16,
                  background: 'linear-gradient(135deg, #25D366, #128C7E)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, fontWeight: 900, color: '#fff',
                  boxShadow: '0 0 30px rgba(37,211,102,0.35)',
                }}
              >
                {step.step}
              </div>
              <div>
                <h3 className="font-bold mb-2" style={{ fontSize: 20, color: '#fff' }}>{step.title}</h3>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{step.desc}</p>
              </div>
              {i < HOW_IT_WORKS.length - 1 && (
                <div style={{ position: 'absolute', left: 39, bottom: -24, width: 2, height: 24, background: 'rgba(37,211,102,0.2)' }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// FINAL CTA SECTION
// ─────────────────────────────────────────────
function FinalCTA() {
  return (
    <section className="relative py-24 px-4" style={{ zIndex: 5 }}>
      <div className="max-w-3xl mx-auto text-center">
        {/* Glow backdrop */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 600, height: 300,
          background: 'radial-gradient(ellipse, rgba(37,211,102,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="reveal glass-card gradient-border rounded-3xl p-10 md:p-16">
          <div className="hero-badge mx-auto mb-6" style={{ display: 'inline-flex' }}>
            <Bell size={13} />
            Start saving in 30 seconds — No app download
          </div>

          <h2 className="font-black mb-4" style={{ fontSize: 'clamp(28px, 5vw, 52px)', color: '#fff', letterSpacing: '-1px', lineHeight: 1.1 }}>
            Your next purchase{' '}
            <span className="gradient-text">deserves a discount.</span>
          </h2>

          <p className="mb-10" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 17, lineHeight: 1.7 }}>
            Join 2.4 lakh shoppers who never pay full price. Send a WhatsApp message and let Choizo handle the rest.
          </p>

          <a
            href={CONFIG.WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn inline-flex items-center justify-center gap-3 px-10 py-5 text-white font-bold"
            style={{
              borderRadius: 20, fontSize: 20,
              background: 'linear-gradient(135deg, #25D366 0%, #128C7E 50%, #25D366 100%)',
              backgroundSize: '200% auto',
              animation: 'shine 3s linear infinite',
              boxShadow: '0 0 60px rgba(37,211,102,0.4)',
            }}
          >
            <MessageCircle size={24} />
            Chat with Choizo on WhatsApp
            <ArrowRight size={20} />
          </a>

          <p className="mt-4 text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Free · No registration · Works on any phone
          </p>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// AD BANNER — Bottom (Adsterra)
// ─────────────────────────────────────────────
function AdBannerBottom() {
  return (
    <div
      style={{
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px 0',
        background: 'rgba(37,211,102,0.02)',
        borderTop: '1px solid rgba(37,211,102,0.06)',
        zIndex: 5, position: 'relative',
      }}
    >
      {/* ───────────────────────────────────────────────
          📢 ADSTERRA AD SCRIPT — BOTTOM BANNER
          Paste your Adsterra In-Page Push / Banner script here.
          Example:
          <script async src="//your-adsterra-script-url.js"></script>
          ─────────────────────────────────────────────── */}
      <div
        style={{
          width: 320, height: 100,
          background: 'rgba(37,211,102,0.04)',
          border: '1px dashed rgba(37,211,102,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, color: 'rgba(255,255,255,0.25)', borderRadius: 6,
        }}
      >
        Ad Placement — Adsterra Footer Banner
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────
function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        padding: '32px 24px',
        zIndex: 5, position: 'relative',
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg, #25D366, #128C7E)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShoppingBag size={14} color="#fff" />
          </div>
          <span style={{ fontWeight: 700, fontSize: 16, color: '#fff' }}>Choizo</span>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)' }}>© 2025</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
          {/* UPDATE THESE LINKS with your actual pages */}
          <a href="/terms" className="hover:text-white transition-colors">Terms</a>
          <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
          <a href="mailto:hello@choizo.in" className="hover:text-white transition-colors">Contact</a>
        </div>

        {/* Tagline */}
        <div className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
          Made with ♥ for smart Indian shoppers
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────
// SCROLL REVEAL HOOK
// ─────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ─────────────────────────────────────────────
// TILT EFFECT FOR FEATURE CARDS
// ─────────────────────────────────────────────
function useTiltEffect() {
  useEffect(() => {
    const cards = document.querySelectorAll('.feature-card');
    const handlers = [];
    cards.forEach(card => {
      const onMove = (e) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        card.style.transform = `translateY(-8px) scale(1.02) rotateX(${-dy * 5}deg) rotateY(${dx * 5}deg)`;
      };
      const onLeave = () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
      };
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
      handlers.push({ card, onMove, onLeave });
    });
    return () => handlers.forEach(({ card, onMove, onLeave }) => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
    });
  }, []);
}

// ─────────────────────────────────────────────
// PARALLAX ON SCROLL
// ─────────────────────────────────────────────
function useParallax() {
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      document.querySelectorAll('.orb').forEach((orb, i) => {
        const speed = i % 2 === 0 ? 0.15 : -0.1;
        orb.style.transform += ` translateY(${y * speed}px)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
export default function Home() {
  useScrollReveal();
  useTiltEffect();

  return (
    <div style={{ background: '#020817', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      {/* Animated background canvas */}
      <CanvasBackground />

      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      {/* Top Ad Banner */}
      <AdBannerTop />

      {/* Sticky Header */}
      <Header />

      {/* Live Savings Marquee */}
      <SavingsMarquee />

      {/* Main content */}
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <HowItWorks />
        <FinalCTA />
      </main>

      {/* Bottom Ad Banner */}
      <AdBannerBottom />

      {/* Footer */}
      <Footer />
    </div>
  );
}
