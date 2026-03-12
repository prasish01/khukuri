import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { NAV_LINKS, CLUB } from "@/data/siteData";

function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-3 group"
      aria-label="Khukuri FC — Home"
    >
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center relative overflow-hidden"
        style={{
          background: "var(--brick)",
          border: "1.5px solid rgba(240,165,0,0.35)",
        }}
      >
        <img
          src="/logo.png"
          alt="Khukuri FC logo"
          className="w-12 h-12 object-contain"
        />
      </div>
      <div>
        <div
          className="t-display leading-none text-xl group-hover:text-brick transition-colors duration-300"
          style={{ color: "var(--ink)", letterSpacing: "0.06em" }}
        >
          KHUKURI FC
        </div>
        <div
          className="t-mono text-[8px] leading-none mt-0.5"
          style={{ color: "var(--stone)", letterSpacing: "0.2em" }}
        >
          AUCKLAND · EST. 2003
        </div>
      </div>
    </Link>
  );
}

function DesktopLink({ to, label, active }) {
  return (
    <Link
      to={to}
      className="relative group py-1"
      aria-current={active ? "page" : undefined}
      style={{ color: active ? "var(--brick)" : "var(--stone)" }}
    >
      <span
        className="t-sans text-sm font-medium transition-colors duration-200 group-hover:text-ink"
        style={{ letterSpacing: "0.03em" }}
      >
        {label}
      </span>
      <span
        className="absolute -bottom-1 left-0 right-0 flex justify-center"
        aria-hidden="true"
      >
        <span
          className="w-1 h-1 rounded-full transition-all duration-300"
          style={{
            background: "var(--brick)",
            opacity: active ? 1 : 0,
            transform: active ? "scale(1)" : "scale(0)",
          }}
        />
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.15 },
    );
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* ── Nav bar ───────────────────────────────────────── */}
      <nav
        ref={navRef}
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "var(--nav-h)",
          zIndex: 100,
          opacity: 0,
          backgroundColor: scrolled ? "rgba(250,246,239,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--border)"
            : "1px solid transparent",
          transition:
            "background-color 0.4s, border-color 0.4s, backdrop-filter 0.4s",
        }}
      >
        <div className="site-container h-full flex items-center justify-between">
          <Logo />

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(({ label, path }) => (
              <li key={path}>
                <DesktopLink
                  to={path}
                  label={label}
                  active={location.pathname === path}
                />
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link to="/join" className="btn btn-brick hidden sm:inline-flex">
              <span>Join the Club</span>
              <ArrowRight size={13} />
            </Link>

            {/* Hamburger — only visible below lg */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
                width: "44px",
                height: "44px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 0,
                flexShrink: 0,
                zIndex: 110,
                position: "relative",
              }}
              className="lg:hidden"
            >
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  borderRadius: "2px",
                  backgroundColor: "var(--ink)",
                  transformOrigin: "center",
                  transition: "transform 0.3s ease",
                  transform: menuOpen
                    ? "translateY(7px) rotate(45deg)"
                    : "none",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  borderRadius: "2px",
                  backgroundColor: "var(--ink)",
                  transition: "opacity 0.2s ease",
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  borderRadius: "2px",
                  backgroundColor: "var(--ink)",
                  transformOrigin: "center",
                  transition: "transform 0.3s ease",
                  transform: menuOpen
                    ? "translateY(-7px) rotate(-45deg)"
                    : "none",
                }}
              />
            </button>
          </div>
        </div>
        <ScrollProgress />
      </nav>

      {/* ── Backdrop ──────────────────────────────────────── */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(26,18,9,0.4)",
            backdropFilter: "blur(4px)",
            zIndex: 88,
          }}
        />
      )}

      {/* ── Drawer ────────────────────────────────────────── */}
      {/*
        Rendered always so transition works.
        Visibility controlled entirely by translateX inline style.
        No CSS classes involved in open/close logic at all.
      */}
      <div
        aria-hidden={!menuOpen}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(85vw, 380px)",
          zIndex: 89,
          display: "flex",
          flexDirection: "column",
          background: "var(--cream)",
          borderLeft: "1px solid var(--border)",
          paddingTop: "var(--nav-h)",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)",
          willChange: "transform",
          // Hide on lg+ screens
          visibility: "visible",
        }}
        className="lg:!hidden"
      >
        {/* Stripe texture */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: 0.04,
            backgroundImage:
              "repeating-linear-gradient(45deg, var(--ink) 0px, var(--ink) 1px, transparent 1px, transparent 8px)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            padding: "1.5rem 2rem",
            overflowY: "auto",
          }}
        >
          {/* Nav links */}
          <nav aria-label="Mobile navigation">
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {NAV_LINKS.map(({ label, path }, i) => (
                <li
                  key={path}
                  style={{
                    borderBottom: "1px solid var(--border)",
                    // Stagger via transition-delay so each link fades in after drawer slides in
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? "translateX(0)" : "translateX(16px)",
                    transition: `opacity 0.35s ease ${0.15 + i * 0.06}s, transform 0.35s ease ${0.15 + i * 0.06}s`,
                  }}
                >
                  <Link
                    to={path}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "1rem 0",
                      textDecoration: "none",
                      color:
                        location.pathname === path
                          ? "var(--brick)"
                          : "var(--ink)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-serif, Georgia, serif)",
                        fontWeight: 700,
                        fontSize: "clamp(1.5rem, 5vw, 1.9rem)",
                        lineHeight: 1.1,
                      }}
                    >
                      {label}
                    </span>
                    <span
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        border: "1px solid var(--border)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        color: "var(--ink)",
                      }}
                    >
                      <ArrowRight size={11} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              paddingTop: "2rem",
              paddingBottom: "0.5rem",
              opacity: menuOpen ? 1 : 0,
              transition: "opacity 0.35s ease 0.45s",
            }}
          >
            <Link
              to="/join"
              className="btn btn-brick"
              style={{ justifyContent: "center" }}
            >
              <span>Join the Club</span>
              <ArrowRight size={13} />
            </Link>
            <div
              style={{ display: "flex", gap: "1.25rem", paddingTop: "0.25rem" }}
            >
              <a
                href={CLUB.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--stone)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  textDecoration: "none",
                  fontFamily: "var(--font-mono, monospace)",
                }}
              >
                INSTAGRAM
              </a>
              <a
                href={CLUB.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--stone)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  textDecoration: "none",
                  fontFamily: "var(--font-mono, monospace)",
                }}
              >
                FACEBOOK
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ScrollProgress() {
  const ref = useRef(null);
  useEffect(() => {
    const update = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      if (ref.current)
        ref.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div
      ref={ref}
      className="absolute bottom-0 left-0 right-0 h-px origin-left"
      style={{ background: "var(--brick)", transform: "scaleX(0)" }}
      aria-hidden="true"
    />
  );
}

function ArrowRight({ size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
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
  );
}
