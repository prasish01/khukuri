import { Link } from "react-router-dom";
import { CLUB, FOOTER, NAV_LINKS } from "@/data/siteData";
import { IconInstagram, IconFacebook, IconMail } from "@/components/icons";

function FooterLogo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-3 group"
      aria-label="Khukuri FC Home"
    >
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
        style={{
          background: "var(--brick)",
          border: "1.5px solid rgba(240,165,0,0.3)",
        }}
      >
        <img
          src="/logo.png"
          alt="Khukuri FC logo"
          className="w-20 h-20 object-contain"
        />
      </div>
      <div>
        <div
          className="t-display text-xl leading-none group-hover:text-brick transition-colors duration-300"
          style={{ color: "var(--cream)", letterSpacing: "0.06em" }}
        >
          KHUKURI FC
        </div>
        <div
          className="t-mono text-[8px] mt-0.5"
          style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.22em" }}
        >
          AUCKLAND · EST. {CLUB.foundedYear}
        </div>
      </div>
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────
//  Footer
// ─────────────────────────────────────────────────────────────
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: "var(--ink)" }} aria-label="Site footer">
      {/* ── Main footer body ───────────────────────────────── */}
      <div className="site-container py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand col — 2 spans */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <FooterLogo />

            <p
              className="t-serif italic leading-relaxed"
              style={{
                fontSize: "1.05rem",
                color: "rgba(232,227,216,0.55)",
                maxWidth: "280px",
              }}
            >
              "{FOOTER.tagline}"
            </p>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href={CLUB.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center transition-all duration-200 group"
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(232,227,216,0.5)",
                }}
                aria-label="Instagram"
              >
                <IconInstagram
                  size={16}
                  className="group-hover:text-cream transition-colors duration-200"
                />
              </a>
              <a
                href={CLUB.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center transition-all duration-200 group"
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(232,227,216,0.5)",
                }}
                aria-label="Facebook"
              >
                <IconFacebook
                  size={16}
                  className="group-hover:text-cream transition-colors duration-200"
                />
              </a>
              <a
                href={`mailto:${CLUB.email}`}
                className="w-9 h-9 flex items-center justify-center transition-all duration-200 group"
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(232,227,216,0.5)",
                }}
                aria-label="Email"
              >
                <IconMail
                  size={16}
                  className="group-hover:text-cream transition-colors duration-200"
                />
              </a>
            </div>

            {/* Ground info */}
            <div className="pt-2">
              <p
                className="t-mono text-[9px] mb-1"
                style={{
                  color: "rgba(255,255,255,0.25)",
                  letterSpacing: "0.2em",
                }}
              >
                HOME GROUND
              </p>
              <p
                className="t-sans text-sm"
                style={{ color: "rgba(232,227,216,0.45)" }}
              >
                {CLUB.ground}
              </p>
            </div>
          </div>

          {/* Nav columns */}
          {FOOTER.columns.map((col) => (
            <div key={col.heading} className="flex flex-col gap-4">
              <h3
                className="t-mono text-[9px]"
                style={{
                  color: "rgba(255,255,255,0.3)",
                  letterSpacing: "0.22em",
                }}
              >
                {col.heading.toUpperCase()}
              </h3>
              <ul className="flex flex-col gap-3">
                {col.links.map(({ label, path }) => (
                  <li key={label}>
                    <Link
                      to={path}
                      className="t-sans text-sm transition-colors duration-200 group flex items-center gap-1.5"
                      style={{ color: "rgba(232,227,216,0.5)" }}
                    >
                      <span className="group-hover:text-cream transition-colors duration-200">
                        {label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Divider ────────────────────────────────────────── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} />

      {/* ── Bottom bar ─────────────────────────────────────── */}
      <div className="site-container py-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p
            className="t-mono text-[9px]"
            style={{ color: "rgba(255,255,255,0.2)", letterSpacing: "0.18em" }}
          >
            © {year} KHUKURI FC INC. — AUCKLAND, NEW ZEALAND
          </p>
          <div className="flex items-center gap-5">
            <Link
              to="/join"
              className="t-mono text-[9px] transition-colors duration-200 hover:text-cream"
              style={{
                color: "rgba(255,255,255,0.2)",
                letterSpacing: "0.16em",
              }}
            >
              JOIN THE CLUB
            </Link>
            <Link
              to="/sponsors"
              className="t-mono text-[9px] transition-colors duration-200 hover:text-cream"
              style={{
                color: "rgba(255,255,255,0.2)",
                letterSpacing: "0.16em",
              }}
            >
              BECOME A SPONSOR
            </Link>
            <a
              href={`mailto:${CLUB.email}`}
              className="t-mono text-[9px] transition-colors duration-200 hover:text-cream"
              style={{
                color: "rgba(255,255,255,0.2)",
                letterSpacing: "0.16em",
              }}
            >
              {CLUB.email}
            </a>
          </div>
        </div>
      </div>

      {/* ── Khukuri Pride stripe ────────────────────────────── */}
      <div
        className="h-1 w-full"
        style={{
          background:
            "linear-gradient(90deg, var(--brick) 0%, var(--saffron) 50%, var(--brick) 100%)",
        }}
        aria-hidden="true"
      />
    </footer>
  );
}
