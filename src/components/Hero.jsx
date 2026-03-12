import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HERO, CLUB, ACHIEVEMENTS } from "@/data/siteData";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const badgeRef = useRef(null);
  const eyebrowRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const quoteRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);
  const scrollRef = useRef(null);
  const blobsRef = useRef(null);

  // ── Badge float + mouse parallax ─────────────────────────
  useEffect(() => {
    const badge = badgeRef.current;
    if (!badge) return;
    gsap.to(badge, {
      y: -12,
      duration: 2.8,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
    const onMove = (e) => {
      const rx = (e.clientY / window.innerHeight - 0.5) * 14;
      const ry = (e.clientX / window.innerWidth - 0.5) * -14;
      gsap.to(badge, {
        rotateX: rx,
        rotateY: ry,
        duration: 1.4,
        ease: "power2.out",
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // ── Scroll parallax ───────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(blobsRef.current, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  // ── Entrance animation ────────────────────────────────────
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      blobsRef.current?.children,
      { scale: 0.7, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        stagger: 0.15,
        duration: 1.6,
        ease: "power3.out",
      },
      0,
    );

    tl.fromTo(
      badgeRef.current,
      { scale: 0, rotation: -25, opacity: 0 },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 1.2,
        ease: "back.out(1.6)",
      },
      0.3,
    );

    tl.fromTo(
      eyebrowRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.8 },
      0.7,
    );

    [line1Ref, line2Ref, line3Ref].forEach((r, i) =>
      tl.fromTo(
        r.current,
        { opacity: 0, y: 60, skewY: 3 },
        { opacity: 1, y: 0, skewY: 0, duration: 1 },
        0.85 + i * 0.12,
      ),
    );

    tl.fromTo(
      quoteRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.9 },
      1.3,
    );
    tl.fromTo(
      descRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.8 },
      1.5,
    );
    tl.fromTo(
      Array.from(ctaRef.current?.children || []),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.08, duration: 0.7 },
      1.7,
    );
    tl.fromTo(
      Array.from(statsRef.current?.children || []),
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, stagger: 0.07, duration: 0.6 },
      1.9,
    );
    tl.fromTo(
      scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      2.4,
    );

    tl.add(() => {
      statsRef.current?.querySelectorAll("[data-count]").forEach((el) => {
        const end = parseFloat(el.dataset.count);
        gsap.fromTo(
          { n: 0 },
          {
            n: end,
            duration: 1.8,
            ease: "power2.out",
            onUpdate() {
              el.textContent =
                (el.dataset.prefix || "") +
                Math.round(this.targets()[0].n) +
                (el.dataset.suffix || "");
            },
          },
        );
      });
    }, 2.0);

    return () => tl.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden grain"
      style={{ background: "var(--cream)" }}
      aria-label="Welcome to Khukuri FC"
    >
      {/* ── Colour blobs ──────────────────────────────────── */}
      <div
        ref={blobsRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          style={{
            position: "absolute",
            top: "-12%",
            right: "-8%",
            width: "55vw",
            height: "55vw",
            borderRadius: "60% 40% 55% 45% / 50% 55% 45% 50%",
            background:
              "radial-gradient(circle at 40% 40%, rgba(232,86,58,0.15), rgba(192,57,43,0.05) 70%, transparent)",
            filter: "blur(1px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "-10%",
            width: "40vw",
            height: "40vw",
            borderRadius: "45% 55% 40% 60% / 55% 45% 55% 45%",
            background:
              "radial-gradient(circle at 60% 60%, rgba(240,165,0,0.12), transparent 70%)",
            filter: "blur(2px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-8%",
            right: "10%",
            width: "30vw",
            height: "30vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(107,127,94,0.09), transparent 70%)",
            filter: "blur(2px)",
          }}
        />
      </div>

      {/* ── Dot grid (left half only) ─────────────────────── */}
      <div
        className="absolute inset-y-0 left-0 w-1/2 pointer-events-none pattern-grid opacity-40"
        aria-hidden="true"
      />

      {/* ── Photo panel — desktop only, right 42% ─────────── */}
      <div
        ref={imgRef}
        className="absolute right-0 top-0 bottom-0 hidden lg:block"
        style={{ width: "42%", willChange: "transform" }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-4 overflow-hidden"
          style={{ border: "1px solid var(--border)" }}
        >
          <img
            src={HERO.backgroundImage}
            alt="Khukuri FC in action"
            className="w-full h-full object-cover"
            style={{ filter: "saturate(0.9) contrast(1.03)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 50%, rgba(26,18,9,0.45))",
            }}
          />
          <div
            className="absolute bottom-6 left-6"
            style={{
              background: "var(--brick)",
              color: "var(--cream)",
              padding: "0.35rem 0.75rem",
            }}
          >
            <span className="t-mono text-xs" style={{ letterSpacing: "0.2em" }}>
              EST. {CLUB.foundedYear}
            </span>
          </div>
        </div>
        <div
          className="absolute top-1/2 left-0"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            transform: "translateY(-50%) rotate(180deg)",
            paddingLeft: "0.25rem",
          }}
        >
          <span
            className="t-mono text-[9px] text-stone"
            style={{ letterSpacing: "0.25em" }}
          >
            AUCKLAND · NEW ZEALAND
          </span>
        </div>
      </div>

      {/* ── Floating badge — straddles content/photo boundary */}
      <div
        ref={badgeRef}
        className="absolute hidden xl:block"
        style={{
          right: "calc(42% - 68px)",
          top: "8%",
          perspective: "500px",
          transformStyle: "preserve-3d",
          opacity: 0,
          zIndex: 10,
        }}
        aria-hidden="true"
      >
        <KhukuriBadge />
      </div>

      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full lg:w-[58vw] px-6 sm:px-10 lg:px-16 xl:px-20 py-32">
          {/* Eyebrow — hidden on mobile */}
          <div
            ref={eyebrowRef}
            className="hidden md:flex items-center gap-3 mb-8"
            style={{ opacity: 0 }}
          >
            <span className="divider-thick" aria-hidden="true" />
            <span
              className="t-mono text-[11px] text-stone"
              style={{ letterSpacing: "0.2em" }}
            >
              {HERO.eyebrow}
            </span>
          </div>

          {/* Headline — font clamps so it never overflows the column */}
          <h1
            className="mb-6"
            aria-label={`${HERO.headlinePart1} ${HERO.headlinePart2} ${HERO.headlinePart3}`}
          >
            <span
              ref={line1Ref}
              className="block t-serif leading-[0.93] font-bold"
              style={{
                fontSize: "clamp(3rem, 5.5vw, 6rem)",
                color: "var(--ink)",
                opacity: 0,
              }}
            >
              {HERO.headlinePart1}
            </span>
            <span
              ref={line2Ref}
              className="block t-serif leading-[0.93] font-bold italic"
              style={{
                fontSize: "clamp(3rem, 5.5vw, 6rem)",
                color: "var(--brick)",
                opacity: 0,
              }}
            >
              {HERO.headlinePart2}
            </span>
            <span
              ref={line3Ref}
              className="block t-serif leading-[0.93] font-bold"
              style={{
                fontSize: "clamp(3rem, 5.5vw, 6rem)",
                color: "var(--ink)",
                opacity: 0,
              }}
            >
              {HERO.headlinePart3}
            </span>
          </h1>

          {/* Pull quote */}
          <blockquote
            ref={quoteRef}
            className="relative mb-6 pl-5"
            style={{ borderLeft: "3px solid var(--saffron)", opacity: 0 }}
          >
            <p
              className="t-serif italic font-medium leading-snug"
              style={{
                fontSize: "clamp(0.95rem, 1.4vw, 1.15rem)",
                color: "var(--ink-light)",
              }}
            >
              {HERO.pullQuote}
            </p>
          </blockquote>

          {/* Descriptor */}
          <p
            ref={descRef}
            className="t-sans leading-relaxed mb-10"
            style={{
              fontSize: "0.975rem",
              color: "var(--stone)",
              maxWidth: "44ch",
              opacity: 0,
            }}
          >
            {HERO.descriptor}
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap gap-3 mb-14">
            <Link to={HERO.ctaPrimary.path} className="btn btn-brick">
              <span>{HERO.ctaPrimary.label}</span>
              <svg
                width="13"
                height="13"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 7h10M7 2l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link to={HERO.ctaSecondary.path} className="btn btn-outline-ink">
              <span>{HERO.ctaSecondary.label}</span>
            </Link>
          </div>

          {/* Stats grid — 2 col mobile, 4 col sm+ */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
            role="list"
            aria-label="Club statistics"
          >
            {HERO.stats.map(({ value, label }) => {
              const numericVal = parseFloat(value.replace(/[^0-9.]/g, "")) || 0;
              const prefix = value.match(/^[^0-9]*/)?.[0] ?? "";
              const suffix = value.match(/[^0-9.]+$/)?.[0] ?? "";
              return (
                <div
                  key={label}
                  className="flex flex-col gap-1 p-4 relative group"
                  style={{
                    background: "rgba(255,255,255,0.55)",
                    border: "1px solid var(--border)",
                    backdropFilter: "blur(6px)",
                  }}
                  role="listitem"
                >
                  <span
                    className="t-serif font-bold text-3xl leading-none text-brick"
                    data-count={numericVal}
                    data-prefix={prefix}
                    data-suffix={suffix}
                  >
                    {value}
                  </span>
                  <span
                    className="t-mono text-[10px] text-stone"
                    style={{ letterSpacing: "0.1em" }}
                  >
                    {label}
                  </span>
                  <div
                    className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                    style={{ background: "var(--saffron)" }}
                    aria-hidden="true"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Scroll cue ─────────────────────────────────────── */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-8 flex items-center gap-3 z-10"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        <svg width="18" height="28" viewBox="0 0 18 28" fill="none">
          <rect
            x="1"
            y="1"
            width="16"
            height="26"
            rx="8"
            stroke="var(--stone-light)"
            strokeWidth="1.2"
          />
          <rect
            x="7.5"
            y="5"
            width="3"
            height="6"
            rx="1.5"
            fill="var(--brick)"
            opacity="0.7"
          />
        </svg>
        <span
          className="t-mono text-[9px] text-stone-light"
          style={{ letterSpacing: "0.2em" }}
        >
          SCROLL
        </span>
      </div>

      {/* ── Achievement ticker ─────────────────────────────── */}
      <AchievementTicker />
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
//  Badge
// ─────────────────────────────────────────────────────────────
function KhukuriBadge() {
  return (
    <div className="relative w-36 h-36">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: "1px solid rgba(192,57,43,0.25)",
          animation: "spin 18s linear infinite",
        }}
      />
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 144 144"
        fill="none"
      >
        <circle
          cx="72"
          cy="72"
          r="64"
          stroke="var(--saffron)"
          strokeWidth="0.75"
          strokeDasharray="4 8"
          opacity="0.4"
          style={{ animation: "spin 30s linear infinite reverse" }}
        />
      </svg>
      <div
        className="absolute inset-4 rounded-full flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, var(--brick) 0%, #8B1A10 100%)",
          boxShadow:
            "0 8px 40px rgba(192,57,43,0.4), inset 0 1px 0 rgba(255,255,255,0.12)",
        }}
      >
        <img
          src="/logo.png"
          alt="Khukuri FC logo"
          className="w-20 h-20 object-contain"
        />
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  Achievement ticker
// ─────────────────────────────────────────────────────────────
function AchievementTicker() {
  const items = ACHIEVEMENTS.map(
    (a) => `${a.year}  ${a.title}  —  ${a.result}`,
  );
  const doubled = [...items, ...items];
  return (
    <div
      className="absolute bottom-0 left-0 right-0 overflow-hidden"
      style={{
        borderTop: "1px solid var(--border)",
        background: "rgba(242,235,217,0.8)",
        backdropFilter: "blur(8px)",
      }}
      aria-label="Achievement ticker"
    >
      <div className="marquee-inner py-3">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center shrink-0">
            <span
              className="t-mono text-[10px] text-stone px-6 whitespace-nowrap"
              style={{ letterSpacing: "0.18em" }}
            >
              {item}
            </span>
            <span
              className="text-brick text-xs"
              aria-hidden="true"
              style={{ opacity: 0.5 }}
            >
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
