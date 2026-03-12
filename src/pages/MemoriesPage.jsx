import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MEMORIES } from "@/data/siteData";
import {
  IconClose,
  IconChevronLeft,
  IconChevronRight,
  IconExpand,
} from "@/components/icons";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────
//  Helpers
// ─────────────────────────────────────────────────────────────

function SectionEyebrow({ text }) {
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

function MemoriesHero() {
  const ref = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.fromTo(
      ref.current?.querySelector(".mem-eyebrow"),
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.8 },
      0.1,
    );
    tl.fromTo(
      ref.current?.querySelectorAll(".mem-h1-line"),
      { opacity: 0, y: 56, skewY: 3 },
      { opacity: 1, y: 0, skewY: 0, stagger: 0.1, duration: 1.1 },
      0.25,
    );
    tl.fromTo(
      ref.current?.querySelector(".mem-intro"),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.9 },
      0.75,
    );
    return () => tl.kill();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden grain pt-32 pb-20"
      style={{ background: "var(--warm)" }}
      aria-label="Memories"
    >
      <div
        className="absolute right-0 top-0 t-display leading-none select-none pointer-events-none"
        style={{
          fontSize: "clamp(16rem,28vw,34rem)",
          color: "rgba(240,165,0,0.06)",
          lineHeight: 1,
          top: "-0.1em",
          right: "-0.02em",
        }}
        aria-hidden="true"
      >
        20+
      </div>
      <div
        className="absolute bottom-0 left-0 w-80 h-80 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(192,57,43,0.08), transparent 70%)",
          borderRadius: "50%",
          filter: "blur(2px)",
        }}
        aria-hidden="true"
      />
      <div className="site-container relative z-10">
        <div className="mem-eyebrow" style={{ opacity: 0 }}>
          <SectionEyebrow text={MEMORIES.eyebrow} />
        </div>
        <h1 className="mb-8" aria-label={MEMORIES.headline.join(" ")}>
          {MEMORIES.headline.map((line, i) => (
            <span
              key={i}
              className="mem-h1-line block t-serif font-bold leading-[0.93]"
              style={{
                fontSize: "clamp(3.2rem,7vw,6rem)",
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
          className="mem-intro t-sans leading-relaxed max-w-xl"
          style={{ fontSize: "1rem", color: "var(--stone)", opacity: 0 }}
        >
          {MEMORIES.intro}
        </p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
//  Lightbox
// ─────────────────────────────────────────────────────────────

function Lightbox({ item, onClose, onPrev, onNext, hasPrev, hasNext }) {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" },
    );
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, scale: 0.95, y: 16 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power3.out" },
    );
  }, [item.id]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onNext, onPrev]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-10"
      style={{ background: "rgba(26,18,9,0.9)", backdropFilter: "blur(14px)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.caption}
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <img
            src={item.image}
            alt={item.caption}
            className="w-full object-cover"
            style={{ maxHeight: "72vh" }}
          />
        </div>
        <div className="flex items-start justify-between gap-4 mt-3 px-1">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span
                className="t-mono text-[9px] px-2 py-0.5"
                style={{
                  background: "var(--brick)",
                  color: "var(--cream)",
                  letterSpacing: "0.16em",
                }}
              >
                {item.category}
              </span>
              <span
                className="t-mono text-[9px] text-stone-light"
                style={{ letterSpacing: "0.18em" }}
              >
                {item.year}
              </span>
            </div>
            <p
              className="t-sans text-sm"
              style={{ color: "rgba(232,227,216,0.8)" }}
            >
              {item.caption}
            </p>
          </div>
        </div>
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-10 h-10 flex items-center justify-center"
          style={{ background: "var(--cream)", color: "var(--ink)" }}
          aria-label="Close"
        >
          <IconClose size={18} />
        </button>
        {/* Prev / Next */}
        {hasPrev && (
          <button
            onClick={onPrev}
            className="absolute top-1/2 -translate-y-1/2 -left-6 w-12 h-12 flex items-center justify-center"
            style={{ background: "var(--cream)", color: "var(--ink)" }}
            aria-label="Previous"
          >
            <IconChevronLeft size={20} />
          </button>
        )}
        {hasNext && (
          <button
            onClick={onNext}
            className="absolute top-1/2 -translate-y-1/2 -right-6 w-12 h-12 flex items-center justify-center"
            style={{ background: "var(--cream)", color: "var(--ink)" }}
            aria-label="Next"
          >
            <IconChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  Gallery card
// ─────────────────────────────────────────────────────────────

function GalleryCard({ item, onClick }) {
  const aspect =
    item.size === "wide" ? "16/9" : item.size === "tall" ? "2/3" : "4/3";

  return (
    <button
      className="gallery-card group relative w-full overflow-hidden text-left"
      style={{
        opacity: 0,
        border: "1px solid var(--border)",
        cursor: "none",
        display: "block",
      }}
      onClick={onClick}
      aria-label={`View photo: ${item.caption}`}
    >
      <div style={{ aspectRatio: aspect, overflow: "hidden" }}>
        <img
          src={item.image}
          alt={item.caption}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      {/* Hover overlay */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(to top, rgba(26,18,9,0.85) 0%, transparent 50%)",
        }}
      >
        <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className="t-mono text-[9px] px-2 py-0.5"
              style={{
                background: "var(--brick)",
                color: "var(--cream)",
                letterSpacing: "0.14em",
              }}
            >
              {item.category}
            </span>
            <span
              className="t-mono text-[9px] text-stone-light"
              style={{ letterSpacing: "0.14em" }}
            >
              {item.year}
            </span>
          </div>
          <p
            className="t-sans text-xs leading-snug"
            style={{ color: "rgba(232,227,216,0.9)" }}
          >
            {item.caption}
          </p>
        </div>
      </div>
      {/* Expand icon */}
      <div
        className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(6px)",
        }}
        aria-hidden="true"
      >
        <IconExpand size={12} className="text-white" />
      </div>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
//  Bento Grid — tight, no gaps, fills all space
// ─────────────────────────────────────────────────────────────

function BentoGrid({ items, onOpen }) {
  const gridRef = useRef(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".gallery-card");
    if (!cards?.length) return;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.04, duration: 0.55, ease: "power3.out" },
    );
  }, [items]);

  // Build bento rows of 3 cells each: wide=2cols, normal/tall=1col
  // We pack items into rows so no cell is ever empty.
  // Pattern: [wide, normal] [normal, normal, normal] [tall, normal, normal] ...
  const rows = [];
  let i = 0;
  while (i < items.length) {
    const item = items[i];
    if (item.size === "wide") {
      // wide takes 2 cols; pair with 1 next item
      const companion = items[i + 1];
      rows.push({
        type: "wide-1",
        cells: companion ? [item, companion] : [item],
      });
      i += companion ? 2 : 1;
    } else if (item.size === "tall") {
      // tall in col1; fill cols 2+3 with up to 2 normal/wide items stacked
      const next1 = items[i + 1];
      const next2 = items[i + 2];
      rows.push({
        type: "tall-2",
        cells: [item, next1, next2].filter(Boolean),
      });
      i += 1 + (next1 ? 1 : 0) + (next2 ? 1 : 0);
    } else {
      // 3 normals in a row
      const a = items[i],
        b = items[i + 1],
        c = items[i + 2];
      rows.push({ type: "triple", cells: [a, b, c].filter(Boolean) });
      i += [a, b, c].filter(Boolean).length;
    }
  }

  return (
    <div ref={gridRef} className="flex flex-col" style={{ gap: "3px" }}>
      {rows.map((row, ri) => {
        if (row.type === "wide-1") {
          return (
            <div
              key={ri}
              className="grid"
              style={{ gridTemplateColumns: "2fr 1fr", gap: "3px" }}
            >
              <GalleryCard
                item={row.cells[0]}
                onClick={() => onOpen(row.cells[0].id)}
              />
              {row.cells[1] ? (
                <GalleryCard
                  item={row.cells[1]}
                  onClick={() => onOpen(row.cells[1].id)}
                />
              ) : (
                <div
                  style={{
                    background: "var(--parchment)",
                    border: "1px solid var(--border)",
                  }}
                />
              )}
            </div>
          );
        }
        if (row.type === "tall-2") {
          const [tall, a, b] = row.cells;
          return (
            <div
              key={ri}
              className="grid"
              style={{ gridTemplateColumns: "1fr 2fr", gap: "3px" }}
            >
              <GalleryCard item={tall} onClick={() => onOpen(tall.id)} />
              <div className="flex flex-col" style={{ gap: "3px" }}>
                {a && <GalleryCard item={a} onClick={() => onOpen(a.id)} />}
                {b && <GalleryCard item={b} onClick={() => onOpen(b.id)} />}
              </div>
            </div>
          );
        }
        // triple
        return (
          <div
            key={ri}
            className="grid"
            style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: "3px" }}
          >
            {row.cells.map((cell) => (
              <GalleryCard
                key={cell.id}
                item={cell}
                onClick={() => onOpen(cell.id)}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  Gallery section with filter
// ─────────────────────────────────────────────────────────────

function GallerySection() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const filtered =
    active === "All"
      ? MEMORIES.items
      : MEMORIES.items.filter((i) => i.category === active);

  const lightboxItem = MEMORIES.items.find((i) => i.id === lightbox);
  const lightboxIndex = filtered.findIndex((i) => i.id === lightbox);

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prevPhoto = useCallback(() => {
    if (lightboxIndex > 0) setLightbox(filtered[lightboxIndex - 1].id);
  }, [lightboxIndex, filtered]);
  const nextPhoto = useCallback(() => {
    if (lightboxIndex < filtered.length - 1)
      setLightbox(filtered[lightboxIndex + 1].id);
  }, [lightboxIndex, filtered]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".filter-bar",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".filter-bar", start: "top 90%" },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      className="py-16"
      style={{ background: "var(--cream)" }}
      aria-label="Photo gallery"
    >
      <div className="site-container">
        {/* Filter bar */}
        <div
          className="filter-bar flex flex-wrap gap-2 mb-10"
          role="tablist"
          aria-label="Filter by category"
          style={{ opacity: 0 }}
        >
          {MEMORIES.filters.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={active === f}
              onClick={() => setActive(f)}
              className="t-mono text-[10px] px-4 py-2 transition-all duration-200"
              style={{
                letterSpacing: "0.16em",
                cursor: "none",
                background: active === f ? "var(--ink)" : "transparent",
                color: active === f ? "var(--cream)" : "var(--stone)",
                border:
                  active === f
                    ? "1px solid var(--ink)"
                    : "1px solid var(--border)",
              }}
            >
              {f}
            </button>
          ))}
          <span
            className="t-mono text-[10px] self-center ml-2 text-stone-light"
            style={{ letterSpacing: "0.12em" }}
          >
            {filtered.length} photos
          </span>
        </div>

        {/* Bento grid */}
        {filtered.length > 0 ? (
          <BentoGrid items={filtered} onOpen={setLightbox} />
        ) : (
          <div className="py-20 text-center">
            <p
              className="t-serif italic text-2xl"
              style={{ color: "var(--stone)" }}
            >
              No photos in this category yet.
            </p>
          </div>
        )}
      </div>

      {lightbox && lightboxItem && (
        <Lightbox
          item={lightboxItem}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
          hasPrev={lightboxIndex > 0}
          hasNext={lightboxIndex < filtered.length - 1}
        />
      )}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
//  CTA strip
// ─────────────────────────────────────────────────────────────

function MemoriesCTA() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current?.children,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 88%" },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      className="relative py-20 grain overflow-hidden"
      style={{
        background: "var(--parchment)",
        borderTop: "1px solid var(--border)",
      }}
      aria-label="Be part of future memories"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 40% 50%, rgba(192,57,43,0.07), transparent 60%)",
        }}
        aria-hidden="true"
      />
      <div
        ref={ref}
        className="site-container relative text-center max-w-2xl mx-auto"
      >
        <SectionEyebrow text="Write your own chapter" />
        <h2
          className="t-serif font-bold leading-tight mb-5"
          style={{ fontSize: "clamp(1.9rem,4vw,3rem)", color: "var(--ink)" }}
        >
          Your photo belongs
          <br />
          <em style={{ color: "var(--brick)" }}>in this album too.</em>
        </h2>
        <p
          className="t-sans leading-relaxed mb-8 mx-auto"
          style={{
            fontSize: "0.975rem",
            color: "var(--stone)",
            maxWidth: "460px",
          }}
        >
          Every image here is someone's Sunday morning, someone's best goal,
          someone's first match in New Zealand. Come be part of the next
          chapter.
        </p>
        <a href="/join" className="btn btn-brick inline-flex">
          <span>Join the Family</span>
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
        </a>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
//  Page
// ─────────────────────────────────────────────────────────────

export default function MemoriesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main>
      <MemoriesHero />
      <GallerySection />
      <MemoriesCTA />
    </main>
  );
}
