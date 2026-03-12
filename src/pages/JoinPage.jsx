import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { JOIN_PAGE, JOIN_FAQ, CLUB } from "@/data/siteData";
import {
  IconHandshake,
  IconMountain,
  IconSeedling,
  IconCelebration,
  IconCheck,
  IconChevronDown,
  IconMail,
} from "@/components/icons";

gsap.registerPlugin(ScrollTrigger);

// ── Icon map ──────────────────────────────────────────────────
const ICONS = {
  handshake: IconHandshake,
  mountain: IconMountain,
  seedling: IconSeedling,
  celebration: IconCelebration,
};

// ─────────────────────────────────────────────────────────────
//  Shared
// ─────────────────────────────────────────────────────────────
function Eyebrow({ text }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="divider-thick shrink-0" aria-hidden="true" />
      <span
        className="t-mono text-[10px] text-stone"
        style={{ letterSpacing: "0.22em" }}
      >
        {text.toUpperCase()}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  Hero
// ─────────────────────────────────────────────────────────────
function JoinHero() {
  const ref = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.fromTo(
      ref.current?.querySelector(".eyebrow"),
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.8 },
      0.1,
    );
    tl.fromTo(
      ref.current?.querySelectorAll(".h1-line"),
      { opacity: 0, y: 56, skewY: 3 },
      { opacity: 1, y: 0, skewY: 0, stagger: 0.12, duration: 1.1 },
      0.25,
    );
    tl.fromTo(
      ref.current?.querySelector(".intro"),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.9 },
      0.75,
    );
    return () => tl.kill();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden grain pt-32 pb-24"
      style={{ background: "var(--cream)" }}
      aria-label="Join Khukuri FC"
    >
      {/* Decorative blob */}
      <div
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: "50vw",
          height: "50vw",
          background:
            "radial-gradient(circle at 60% 30%, rgba(192,57,43,0.09), transparent 65%)",
          borderRadius: "40% 60% 55% 45% / 50% 45% 55% 50%",
          filter: "blur(2px)",
        }}
        aria-hidden="true"
      />

      {/* Large bg numeral */}
      <div
        className="absolute left-0 bottom-0 t-display leading-none pointer-events-none select-none"
        style={{
          fontSize: "clamp(14rem,24vw,28rem)",
          color: "rgba(240,165,0,0.055)",
          lineHeight: 0.85,
          bottom: "-0.1em",
          left: "-0.05em",
        }}
        aria-hidden="true"
      >
        $50
      </div>

      <div className="site-container relative z-10 max-w-3xl">
        <div className="eyebrow" style={{ opacity: 0 }}>
          <Eyebrow text={JOIN_PAGE.eyebrow} />
        </div>
        <h1 className="mb-8">
          {JOIN_PAGE.headline.map((line, i) => (
            <span
              key={i}
              className="h1-line block t-serif font-bold leading-[0.93]"
              style={{
                fontSize: "clamp(3rem,7vw,5.8rem)",
                color: i === 1 ? "var(--brick)" : "var(--ink)",
                fontStyle: i === 1 ? "italic" : "normal",
                opacity: 0,
              }}
            >
              {line}
            </span>
          ))}
        </h1>
        <p
          className="intro t-sans leading-relaxed max-w-xl"
          style={{ fontSize: "1.025rem", color: "var(--stone)", opacity: 0 }}
        >
          {JOIN_PAGE.intro}
        </p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
//  Ways to get involved — informational rows, no buttons
// ─────────────────────────────────────────────────────────────
const INVOLVEMENT_INFO = [
  {
    id: "play-free",
    icon: "seedling",
    label: "Students & those who need support",
    title: "Play for free.",
    price: "$0",
    priceSub: "Always — no strings attached",
    body: "We believe the beautiful game belongs to everyone. If you're a student or facing financial hardship, you play free — kit, training, matches, the lot. No questions asked. Just show up and give everything.",
    perks: [
      "Full squad access",
      "Training & match kit",
      "Subsidised tournament fees",
      "Community support network",
    ],
  },
  {
    id: "member",
    icon: "handshake",
    label: "The most popular way to belong",
    title: "Club membership.",
    price: "$50",
    priceSub: "per year",
    body: "Your $50 keeps the lights on — covering ground fees, kit contributions, and the community events that make Khukuri FC special. You get a vote, a voice, and a seat at every gathering.",
    perks: [
      "Official membership card",
      "Voting rights",
      "Priority squad selection",
      "All socials & picnics",
      "Retired member network",
    ],
  },
  {
    id: "support",
    icon: "celebration",
    label: "Supporters & families",
    title: "Just come and watch.",
    price: "Free",
    priceSub: "always welcome",
    body: "Not ready to play? Come watch. Cheer from the sideline. Bring your family. Every supporter who shows up on a cold Sunday morning means the world to the players on that pitch.",
    perks: [
      "Match day access",
      "Community newsletter",
      "Social event invites",
      "Sponsor a player",
    ],
  },
];

function InvolvementRow({ item, index }) {
  const isMiddle = index === 1;

  return (
    <div
      className="involvement-row relative pl-5"
      style={{
        opacity: 0,
        borderTop: "1px solid var(--border)",
        paddingTop: "2.5rem",
        paddingBottom: "2.5rem",
      }}
    >
      {/* Brick accent bar for middle/featured row */}
      {isMiddle && (
        <div
          className="absolute left-0 top-0 bottom-0 w-[3px]"
          style={{ background: "var(--brick)" }}
          aria-hidden="true"
        />
      )}

      <div className="grid md:grid-cols-[1fr_2fr_1.4fr] gap-8 xl:gap-16 items-start">
        {/* Left — label + price + title */}
        <div>
          <span
            className="t-mono text-[10px] block mb-4"
            style={{ color: "var(--stone)", letterSpacing: "0.18em" }}
          >
            {item.label.toUpperCase()}
          </span>
          <div className="flex items-baseline gap-3 mb-2 flex-wrap">
            <span
              className="t-display leading-none"
              style={{
                fontSize: "clamp(2.4rem,4vw,3.2rem)",
                color: isMiddle ? "var(--brick)" : "var(--ink)",
                letterSpacing: "0.02em",
              }}
            >
              {item.price}
            </span>
            <span
              className="t-mono text-[10px]"
              style={{ color: "var(--stone)", letterSpacing: "0.12em" }}
            >
              {item.priceSub.toUpperCase()}
            </span>
          </div>
          <h3
            className="t-serif font-bold leading-tight"
            style={{
              fontSize: "clamp(1.3rem,2.2vw,1.6rem)",
              color: "var(--ink)",
            }}
          >
            {item.title}
          </h3>
        </div>

        {/* Middle — body copy */}
        <p
          className="t-sans leading-relaxed"
          style={{
            fontSize: "0.975rem",
            color: "var(--stone)",
            paddingTop: "0.2rem",
          }}
        >
          {item.body}
        </p>

        {/* Right — perks list */}
        <ul className="flex flex-col gap-2.5">
          {item.perks.map((perk) => (
            <li key={perk} className="flex items-start gap-2.5">
              <span
                className="mt-[3px] shrink-0"
                style={{ color: "var(--sage)" }}
              >
                <IconCheck size={13} />
              </span>
              <span
                className="t-sans text-sm"
                style={{ color: "var(--ink-light)" }}
              >
                {perk}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function InvolvementSection() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".involvement-row",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.14,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".involvement-list", start: "top 85%" },
        },
      );
    }, ref.current);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="py-24 grain"
      style={{ background: "var(--parchment)" }}
      aria-labelledby="involvement-heading"
    >
      <div className="site-container">
        <div className="mb-14">
          <Eyebrow text="Ways to get involved" />
          <h2
            id="involvement-heading"
            className="t-serif font-bold leading-tight"
            style={{ fontSize: "clamp(2rem,4vw,2.8rem)", color: "var(--ink)" }}
          >
            There's a place for everyone
            <br />
            <em style={{ color: "var(--brick)" }}>in the Khukuri family.</em>
          </h2>
        </div>

        <div
          className="involvement-list"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          {INVOLVEMENT_INFO.map((item, i) => (
            <InvolvementRow key={item.id} item={item} index={i} />
          ))}
        </div>

        <p className="mt-8 t-sans text-sm" style={{ color: "var(--stone)" }}>
          Not sure where you fit?{" "}
          <a
            href={`mailto:${CLUB.email}`}
            className="underline hover:text-brick transition-colors duration-200"
            style={{ color: "var(--ink-light)" }}
          >
            Email us
          </a>{" "}
          — we'll point you in the right direction.
        </p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
//  Welcome note — warm community message
// ─────────────────────────────────────────────────────────────
function WelcomeNote() {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".welcome-content > *",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".welcome-content", start: "top 85%" },
        },
      );
    }, ref.current);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-20" style={{ background: "var(--warm)" }}>
      <div className="site-container">
        <div className="welcome-content grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
          {/* Quote block */}
          <div>
            <Eyebrow text="A word from the club" />
            <blockquote
              className="t-serif font-bold leading-snug mb-6"
              style={{
                fontSize: "clamp(1.5rem,3vw,2.2rem)",
                color: "var(--ink)",
              }}
            >
              "We don't care where you're from, what level you play at, or how
              full your wallet is. If you want to play football and be part of a
              real community —
              <em style={{ color: "var(--brick)" }}> the door is open.</em>"
            </blockquote>
            <p className="t-sans text-sm" style={{ color: "var(--stone)" }}>
              — Khukuri FC, Auckland
            </p>
          </div>

          {/* Quick facts */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { num: "Sunday", label: "Weekly match days" },
              { num: "ASFA", label: "Home league ground" },
              { num: "NZ-wide", label: "Tournament travel" },
              { num: "20+", label: "Years of community" },
            ].map(({ num, label }) => (
              <div
                key={label}
                className="p-5 group relative overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.55)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: "var(--saffron)" }}
                  aria-hidden="true"
                />
                <p
                  className="t-display text-2xl leading-none mb-1"
                  style={{ color: "var(--brick)", letterSpacing: "0.02em" }}
                >
                  {num}
                </p>
                <p
                  className="t-mono text-[10px] text-stone"
                  style={{ letterSpacing: "0.14em" }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
//  FAQ Accordion
// ─────────────────────────────────────────────────────────────
function FAQItem({ item, isOpen, onToggle }) {
  const bodyRef = useRef(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    if (isOpen) {
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.4, ease: "power3.out" },
      );
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
    }
  }, [isOpen]);

  return (
    <div className="border-b" style={{ borderColor: "var(--border)" }}>
      <button
        className="w-full flex items-start justify-between gap-4 py-5 text-left"
        style={{ cursor: "none" }}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span
          className="t-serif font-medium"
          style={{ fontSize: "1.025rem", color: "var(--ink)" }}
        >
          {item.q}
        </span>
        <span
          className="shrink-0 mt-0.5 transition-transform duration-300"
          style={{
            transform: isOpen ? "rotate(180deg)" : "none",
            color: "var(--stone)",
          }}
        >
          <IconChevronDown size={18} />
        </span>
      </button>
      <div ref={bodyRef} style={{ height: 0, overflow: "hidden", opacity: 0 }}>
        <p
          className="t-sans text-sm leading-relaxed pb-5"
          style={{ color: "var(--stone)" }}
        >
          {item.a}
        </p>
      </div>
    </div>
  );
}

function FAQSection() {
  const [openIdx, setOpenIdx] = useState(null);
  const ref = useRef(null);

  const toggle = (i) => setOpenIdx((prev) => (prev === i ? null : i));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-header > *",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".faq-header", start: "top 85%" },
        },
      );
      gsap.fromTo(
        ".faq-list > *",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.07,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".faq-list", start: "top 88%" },
        },
      );
    }, ref.current);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="py-24"
      style={{ background: "var(--cream)" }}
      aria-labelledby="faq-heading"
    >
      <div className="site-container">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24">
          <div className="faq-header">
            <Eyebrow text="Common questions" />
            <h2
              id="faq-heading"
              className="t-serif font-bold leading-tight mb-6"
              style={{
                fontSize: "clamp(2rem,4vw,2.8rem)",
                color: "var(--ink)",
              }}
            >
              Answers to the things
              <br />
              <em style={{ color: "var(--brick)" }}>people usually wonder.</em>
            </h2>
            <p
              className="t-sans text-sm leading-relaxed mb-8"
              style={{ color: "var(--stone)", maxWidth: "360px" }}
            >
              Still have questions? Drop us a message — we're a community club,
              not a corporation. Someone will actually reply.
            </p>
            <a
              href={`mailto:${CLUB.email}`}
              className="btn btn-brick inline-flex"
            >
              <IconMail size={14} />
              <span>Email Us</span>
            </a>
          </div>

          <div
            className="faq-list"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            {JOIN_FAQ.map((item, i) => (
              <FAQItem
                key={i}
                item={item}
                isOpen={openIdx === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
//  Page
// ─────────────────────────────────────────────────────────────
export default function JoinPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main>
      <JoinHero />
      <InvolvementSection />
      <WelcomeNote />
      <FAQSection />
    </main>
  );
}
