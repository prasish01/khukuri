import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CONTACT, CLUB } from "@/data/siteData";
import {
  IconMail,
  IconInstagram,
  IconFacebook,
  IconPin,
  IconArrowRight,
  IconCheck,
} from "@/components/icons";

gsap.registerPlugin(ScrollTrigger);

// ── Icon map for contact detail cards ────────────────────────
const DETAIL_ICONS = {
  mail: IconMail,
  instagram: IconInstagram,
  facebook: IconFacebook,
  pin: IconPin,
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
//  Page Hero
// ─────────────────────────────────────────────────────────────
function ContactHero() {
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
      style={{ background: "var(--warm)" }}
      aria-label="Contact Khukuri FC"
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: "45vw",
          height: "45vw",
          background:
            "radial-gradient(circle at 65% 35%, rgba(192,57,43,0.09), transparent 65%)",
          filter: "blur(2px)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 pointer-events-none"
        style={{
          width: "30vw",
          height: "30vw",
          background:
            "radial-gradient(circle at 30% 70%, rgba(240,165,0,0.07), transparent 70%)",
          filter: "blur(2px)",
        }}
        aria-hidden="true"
      />

      <div className="site-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-end">
          {/* Left: headline */}
          <div>
            <div className="eyebrow" style={{ opacity: 0 }}>
              <Eyebrow text={CONTACT.eyebrow} />
            </div>
            <h1 className="mb-6">
              {CONTACT.headline.map((line, i) => (
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
              className="intro t-sans leading-relaxed"
              style={{
                fontSize: "1rem",
                color: "var(--stone)",
                maxWidth: "440px",
                opacity: 0,
              }}
            >
              {CONTACT.intro}
            </p>
          </div>

          {/* Right: quick contact cards */}
          <div className="grid grid-cols-2 gap-3">
            {CONTACT.details.map((d) => {
              const IconComp = DETAIL_ICONS[d.icon];
              return (
                <a
                  key={d.label}
                  href={d.href}
                  target={d.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group p-5 relative overflow-hidden transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.55)",
                    border: "1px solid var(--border)",
                    backdropFilter: "blur(6px)",
                    textDecoration: "none",
                  }}
                >
                  <div
                    className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                    style={{ background: "var(--brick)" }}
                    aria-hidden="true"
                  />
                  <div
                    className="w-8 h-8 flex items-center justify-center mb-3 rounded-sm"
                    style={{
                      background: "rgba(192,57,43,0.08)",
                      color: "var(--brick)",
                    }}
                  >
                    {IconComp && <IconComp size={16} />}
                  </div>
                  <p
                    className="t-mono text-[9px] mb-0.5 text-stone"
                    style={{ letterSpacing: "0.18em" }}
                  >
                    {d.label.toUpperCase()}
                  </p>
                  <p
                    className="t-sans text-sm font-medium leading-snug mb-1"
                    style={{ color: "var(--ink)" }}
                  >
                    {d.value}
                  </p>
                  <p
                    className="t-mono text-[9px]"
                    style={{
                      color: "var(--stone-light)",
                      letterSpacing: "0.12em",
                    }}
                  >
                    {d.note}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
//  Contact form + reasons
// ─────────────────────────────────────────────────────────────

// Simple form state hook
function useForm(initial) {
  const [values, setValues] = useState(initial);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const set = (field) => (e) =>
    setValues((v) => ({ ...v, [field]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    // No backend — opens mailto with prefilled subject/body
    const subject = encodeURIComponent(
      `[${values.reason}] ${values.subject || "Khukuri FC Enquiry"}`,
    );
    const body = encodeURIComponent(
      `Hi Khukuri FC,\n\nName: ${values.name}\nEmail: ${values.email}\n\n${values.message}\n`,
    );
    window.location.href = `mailto:${CLUB.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
  };

  return { values, set, status, setStatus };
}

function ContactForm() {
  const { values, set, status, setStatus, submit } = useForm({
    name: "",
    email: "",
    reason: CONTACT.reasons[0].label,
    subject: "",
    message: "",
  });
  const formRef = useRef(null);

  // Field style helper
  const fieldStyle = {
    width: "100%",
    padding: "0.85rem 1rem",
    background: "rgba(255,255,255,0.6)",
    border: "1px solid var(--border)",
    borderRadius: 0,
    color: "var(--ink)",
    fontFamily: "Plus Jakarta Sans, sans-serif",
    fontSize: "0.9rem",
    outline: "none",
    cursor: "auto",
    transition: "border-color 0.2s",
  };
  const labelStyle = {
    display: "block",
    fontFamily: "JetBrains Mono, monospace",
    fontSize: "0.65rem",
    letterSpacing: "0.18em",
    color: "var(--stone)",
    marginBottom: "0.4rem",
    textTransform: "uppercase",
  };

  return (
    <form ref={formRef} onSubmit={submit} noValidate>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="name" style={labelStyle}>
            Your Name
          </label>
          <input
            id="name"
            type="text"
            required
            placeholder="Aarav Shrestha"
            value={values.name}
            onChange={set("name")}
            style={fieldStyle}
            onFocus={(e) => (e.target.style.borderColor = "var(--brick)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
        </div>
        <div>
          <label htmlFor="email" style={labelStyle}>
            Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="you@email.com"
            value={values.email}
            onChange={set("email")}
            style={fieldStyle}
            onFocus={(e) => (e.target.style.borderColor = "var(--brick)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
        </div>
      </div>

      {/* Reason selector */}
      <div className="mb-4">
        <label style={labelStyle}>What's this about?</label>
        <div className="grid grid-cols-2 gap-2">
          {CONTACT.reasons.map((r) => (
            <button
              key={r.label}
              type="button"
              onClick={() => set("reason")({ target: { value: r.label } })}
              className="text-left p-3 transition-all duration-200"
              style={{
                cursor: "none",
                border:
                  values.reason === r.label
                    ? "1.5px solid var(--brick)"
                    : "1px solid var(--border)",
                background:
                  values.reason === r.label
                    ? "rgba(192,57,43,0.05)"
                    : "rgba(255,255,255,0.4)",
              }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full border flex items-center justify-center shrink-0"
                  style={{
                    borderColor:
                      values.reason === r.label
                        ? "var(--brick)"
                        : "var(--border)",
                    background:
                      values.reason === r.label
                        ? "var(--brick)"
                        : "transparent",
                  }}
                >
                  {values.reason === r.label && (
                    <IconCheck size={10} className="text-white" />
                  )}
                </div>
                <span
                  className="t-sans text-xs font-medium"
                  style={{ color: "var(--ink)" }}
                >
                  {r.label}
                </span>
              </div>
            </button>
          ))}
        </div>
        {/* Show desc for selected reason */}
        {CONTACT.reasons.find((r) => r.label === values.reason) && (
          <p className="mt-2 t-sans text-xs" style={{ color: "var(--stone)" }}>
            {CONTACT.reasons.find((r) => r.label === values.reason).desc}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="message" style={labelStyle}>
          Your Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          placeholder="Tell us a bit about yourself and what you're looking for..."
          value={values.message}
          onChange={set("message")}
          style={{ ...fieldStyle, resize: "vertical", lineHeight: "1.6" }}
          onFocus={(e) => (e.target.style.borderColor = "var(--brick)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
        />
      </div>

      {status === "sent" ? (
        <div
          className="flex items-center gap-3 p-4"
          style={{
            background: "rgba(107,127,94,0.12)",
            border: "1px solid rgba(107,127,94,0.3)",
          }}
        >
          <span style={{ color: "var(--sage)" }}>
            <IconCheck size={18} />
          </span>
          <div>
            <p
              className="t-sans text-sm font-medium"
              style={{ color: "var(--ink)" }}
            >
              Your mail client should have opened.
            </p>
            <p
              className="t-sans text-xs mt-0.5"
              style={{ color: "var(--stone)" }}
            >
              If not, email us directly at {CLUB.email}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="ml-auto t-mono text-[9px] underline"
            style={{
              color: "var(--stone)",
              cursor: "none",
              letterSpacing: "0.14em",
            }}
          >
            SEND ANOTHER
          </button>
        </div>
      ) : (
        <button
          type="submit"
          className="btn btn-brick w-full justify-center"
          style={{ cursor: "none" }}
        >
          <span>Send Message</span>
          <IconArrowRight size={13} />
        </button>
      )}
    </form>
  );
}

function ContactSection() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-left > *",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact-left", start: "top 85%" },
        },
      );
      gsap.fromTo(
        ".contact-form-wrap",
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact-form-wrap", start: "top 85%" },
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
      aria-labelledby="contact-form-heading"
    >
      <div className="site-container">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-start">
          {/* Left — info */}
          <div className="contact-left">
            <Eyebrow text="Send a message" />
            <h2
              id="contact-form-heading"
              className="t-serif font-bold leading-tight mb-6"
              style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "var(--ink)" }}
            >
              Drop us a line.
              <br />
              <em style={{ color: "var(--brick)" }}>We'll get back to you.</em>
            </h2>

            <p
              className="t-sans leading-relaxed mb-10"
              style={{
                fontSize: "0.975rem",
                color: "var(--stone)",
                maxWidth: "380px",
              }}
            >
              Fill in the form and it'll open your email client with everything
              pre-filled. Quick and easy — no spam, no mailing list, just a real
              conversation.
            </p>

            {/* Contact details vertical list */}
            <div
              className="flex flex-col gap-0"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              {CONTACT.details.map((d) => {
                const IconComp = DETAIL_ICONS[d.icon];
                return (
                  <a
                    key={d.label}
                    href={d.href}
                    target={d.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 py-4"
                    style={{
                      borderBottom: "1px solid var(--border)",
                      textDecoration: "none",
                    }}
                  >
                    <div
                      className="w-9 h-9 flex items-center justify-center shrink-0 rounded-sm"
                      style={{
                        background: "rgba(192,57,43,0.07)",
                        color: "var(--brick)",
                      }}
                    >
                      {IconComp && <IconComp size={17} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="t-mono text-[9px] text-stone mb-0.5"
                        style={{ letterSpacing: "0.18em" }}
                      >
                        {d.label.toUpperCase()}
                      </p>
                      <p
                        className="t-sans text-sm font-medium truncate"
                        style={{ color: "var(--ink)" }}
                      >
                        {d.value}
                      </p>
                    </div>
                    <span
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0"
                      style={{ color: "var(--brick)" }}
                    >
                      <IconArrowRight size={13} />
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right — form */}
          <div
            className="contact-form-wrap p-8 lg:p-10"
            style={{
              background: "var(--parchment)",
              border: "1px solid var(--border)",
            }}
          >
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
//  "Come Watch Us" warm bottom section
// ─────────────────────────────────────────────────────────────
function ComeWatchSection() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current?.querySelectorAll(".watch-item"),
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%" },
        },
      );
    }, ref.current);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-24 grain overflow-hidden"
      style={{ background: "var(--ink)" }}
      aria-label="Come watch us play"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 60%, rgba(192,57,43,0.2), transparent 55%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 80% 30%, rgba(240,165,0,0.08), transparent 55%)",
        }}
        aria-hidden="true"
      />

      <div className="site-container relative">
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Main text */}
          <div className="lg:col-span-2">
            <div className="watch-item" style={{ opacity: 0 }}>
              <Eyebrow text="Match days" />
            </div>
            <h2
              className="watch-item t-serif font-bold leading-tight mb-6"
              style={{
                fontSize: "clamp(2.2rem,5vw,3.8rem)",
                color: "var(--cream)",
                opacity: 0,
              }}
            >
              Can't play? Just come and{" "}
              <em style={{ color: "var(--saffron)" }}>cheer us on.</em>
            </h2>
            <p
              className="watch-item t-sans leading-relaxed mb-8"
              style={{
                fontSize: "0.975rem",
                color: "rgba(232,227,216,0.6)",
                maxWidth: "520px",
                opacity: 0,
              }}
            >
              We play in the ASFA Sunday League throughout the season and travel
              to national Nepali tournaments across New Zealand. Every supporter
              on the sideline makes a difference. Bring the family.
            </p>
            <div
              className="watch-item flex flex-wrap gap-3"
              style={{ opacity: 0 }}
            >
              <a
                href={CLUB.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{
                  background: "var(--brick)",
                  color: "var(--cream)",
                  border: "1.5px solid var(--brick)",
                }}
              >
                <IconFacebook size={14} />
                <span>Follow for Fixtures</span>
              </a>
              <a
                href={CLUB.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{
                  background: "transparent",
                  color: "var(--cream)",
                  border: "1.5px solid rgba(232,227,216,0.2)",
                }}
              >
                <IconInstagram size={14} />
                <span>@fckhukuri_nz</span>
              </a>
            </div>
          </div>

          {/* Ground card */}
          <div
            className="watch-item p-6 flex flex-col gap-4"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              opacity: 0,
            }}
          >
            <div
              className="w-10 h-10 flex items-center justify-center rounded-sm"
              style={{
                background: "rgba(192,57,43,0.25)",
                color: "var(--saffron)",
              }}
            >
              <IconPin size={20} />
            </div>
            <div>
              <p
                className="t-mono text-[9px] mb-1"
                style={{
                  color: "rgba(255,255,255,0.3)",
                  letterSpacing: "0.2em",
                }}
              >
                HOME GROUND
              </p>
              <p
                className="t-serif font-bold text-xl mb-1"
                style={{ color: "var(--cream)" }}
              >
                ASFA Ground
              </p>
              <p
                className="t-sans text-sm"
                style={{ color: "rgba(232,227,216,0.5)" }}
              >
                Auckland, New Zealand
              </p>
            </div>
            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,0.08)",
                paddingTop: "1rem",
              }}
            >
              <p
                className="t-mono text-[9px] mb-1"
                style={{
                  color: "rgba(255,255,255,0.3)",
                  letterSpacing: "0.2em",
                }}
              >
                MATCH DAYS
              </p>
              <p
                className="t-sans text-sm"
                style={{ color: "rgba(232,227,216,0.6)" }}
              >
                Sundays during the ASFA season
              </p>
            </div>
            <a
              href={`https://maps.google.com/?q=ASFA+Ground+Auckland`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn mt-auto"
              style={{
                background: "transparent",
                color: "rgba(232,227,216,0.6)",
                border: "1px solid rgba(255,255,255,0.1)",
                justifyContent: "center",
              }}
            >
              <span>Open in Maps</span>
              <IconArrowRight size={12} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
//  Page
// ─────────────────────────────────────────────────────────────
export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main>
      <ContactHero />
      <ContactSection />
      <ComeWatchSection />
    </main>
  );
}
