import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { NAV_LINKS, CLUB } from "@/data/siteData";

// ─────────────────────────────────────────────────────────────
//  Logo
// ─────────────────────────────────────────────────────────────
function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-3 group"
      aria-label="Khukuri FC — Home"
    >
      {/* Kukri badge mark */}
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

      {/* Wordmark */}
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

// ─────────────────────────────────────────────────────────────
//  Desktop NavLink
// ─────────────────────────────────────────────────────────────
function DesktopLink({ to, label, active }) {
  return (
    <Link
      to={to}
      className="relative group py-1"
      aria-current={active ? "page" : undefined}
      style={{ color: active ? "var(--brick)" : "var(--stone)" }}
    >
      <span
        className="t-sans text-sm font-medium tracking-wide transition-colors duration-200 group-hover:text-ink"
        style={{ letterSpacing: "0.03em" }}
      >
        {label}
      </span>
      {/* Animated dot under active/hover */}
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

// ─────────────────────────────────────────────────────────────
//  Navbar
// ─────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const drawerRef = useRef(null);
  const drawerLinks = useRef([]);
  const location = useLocation();

  // ── Scroll detect ─────────────────────────────────────────
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // ── Entrance ──────────────────────────────────────────────
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.15 },
    );
  }, []);

  // ── Mobile drawer animation ───────────────────────────────
  useEffect(() => {
    const drawer = drawerRef.current;
    const links = drawerLinks.current.filter(Boolean);
    if (!drawer) return;

    if (menuOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(
        drawer,
        { xPercent: 100 },
        { xPercent: 0, duration: 0.55, ease: "power4.out" },
      );
      gsap.fromTo(
        links,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.06,
          duration: 0.5,
          ease: "power3.out",
          delay: 0.2,
        },
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(drawer, { xPercent: 100, duration: 0.4, ease: "power3.in" });
    }
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* ── Main nav bar ────────────────────────────────────── */}
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
          zIndex: 50,
          opacity: 0, // GSAP will reveal
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

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <Link
              to="/join"
              className="btn btn-brick hidden sm:inline-flex"
              aria-label="Join Khukuri FC"
            >
              <span>Join the Club</span>
              <ArrowRight size={13} />
            </Link>

            {/* Hamburger */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-2 focus:outline-none"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open navigation"}
              aria-expanded={menuOpen}
            >
              <span
                className="block w-5 h-px transition-all duration-300"
                style={{
                  background: "var(--ink)",
                  transform: menuOpen
                    ? "translateY(5px) rotate(45deg)"
                    : "none",
                }}
              />
              <span
                className="block w-5 h-px transition-all duration-300"
                style={{ background: "var(--ink)", opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="block w-5 h-px transition-all duration-300"
                style={{
                  background: "var(--ink)",
                  transform: menuOpen
                    ? "translateY(-5px) rotate(-45deg)"
                    : "none",
                }}
              />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <ScrollProgress />
      </nav>

      {/* ── Mobile side drawer ──────────────────────────────── */}
      <div
        ref={drawerRef}
        aria-hidden={!menuOpen}
        className="fixed inset-y-0 right-0 w-full sm:w-96 z-40 lg:hidden flex flex-col"
        style={{
          background: "var(--cream)",
          borderLeft: "1px solid var(--border)",
          transform: "translateX(100%)",
          paddingTop: "var(--nav-h)",
        }}
      >
        {/* Stripe accent */}
        <div
          className="absolute inset-0 pattern-stripe opacity-50 pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative flex flex-col justify-between h-full p-8">
          {/* Links */}
          <ul className="flex flex-col gap-0.5 mt-6">
            {NAV_LINKS.map(({ label, path }, i) => (
              <li key={path} ref={(el) => (drawerLinks.current[i] = el)}>
                <Link
                  to={path}
                  className="group flex items-center justify-between py-4 border-b"
                  style={{ borderColor: "var(--border)", opacity: 0 }}
                >
                  <span
                    className="t-serif text-3xl font-bold transition-colors duration-200 group-hover:text-brick"
                    style={{
                      color:
                        location.pathname === path
                          ? "var(--brick)"
                          : "var(--ink)",
                    }}
                  >
                    {label}
                  </span>
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 group-hover:bg-brick group-hover:text-cream"
                    style={{ border: "1px solid var(--border)" }}
                  >
                    <ArrowRight size={12} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Footer of drawer */}
          <div className="flex flex-col gap-4 pb-4">
            <Link to="/join" className="btn btn-brick w-full justify-center">
              <span>Join the Club</span>
              <ArrowRight size={13} />
            </Link>
            <div className="flex gap-5">
              <a
                href={CLUB.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="t-mono text-xs text-stone hover:text-ink transition-colors"
                style={{ letterSpacing: "0.1em" }}
              >
                INSTAGRAM
              </a>
              <a
                href={CLUB.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="t-mono text-xs text-stone hover:text-ink transition-colors"
                style={{ letterSpacing: "0.1em" }}
              >
                FACEBOOK
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden"
          style={{
            background: "rgba(26,18,9,0.35)",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}

// ── Scroll progress bar ──────────────────────────────────────
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
