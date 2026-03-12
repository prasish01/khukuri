import { useRef, useEffect }                    from 'react'
import { Link }                                  from 'react-router-dom'
import gsap                                      from 'gsap'
import { ScrollTrigger }                         from 'gsap/ScrollTrigger'
import { ABOUT, ACHIEVEMENTS, TOURNAMENTS, CLUB } from '@/data/siteData'
import {
  IconHandshake, IconMountain, IconSeedling,
  IconCelebration, IconArrowRight,
} from '@/components/icons'

gsap.registerPlugin(ScrollTrigger)

// Map icon key → component
const VALUE_ICONS = {
  handshake:   IconHandshake,
  mountain:    IconMountain,
  seedling:    IconSeedling,
  celebration: IconCelebration,
}

// ─────────────────────────────────────────────────────────────
//  Shared small components
// ─────────────────────────────────────────────────────────────

function SectionEyebrow({ text }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="divider-thick shrink-0" aria-hidden="true" />
      <span className="t-mono text-[10px] text-stone" style={{ letterSpacing: '0.22em' }}>
        {text.toUpperCase()}
      </span>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
//  Page hero banner
// ─────────────────────────────────────────────────────────────

function AboutHero() {
  const wrapRef  = useRef(null)
  const h1Ref    = useRef(null)
  const introRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
    tl.fromTo(wrapRef.current?.querySelector('.eyebrow-row'),
      { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8 }, 0.1)
    tl.fromTo(h1Ref.current?.children,
      { opacity: 0, y: 64, skewY: 3 },
      { opacity: 1, y: 0, skewY: 0, stagger: 0.1, duration: 1.1 },
      0.25)
    tl.fromTo(introRef.current,
      { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9 }, 0.75)
    return () => tl.kill()
  }, [])

  return (
    <section
      ref={wrapRef}
      className="relative overflow-hidden grain pt-32 pb-20"
      style={{ background: 'var(--parchment)' }}
      aria-label="About Khukuri FC"
    >
      {/* Decorative large background letter */}
      <div
        className="absolute right-0 top-0 leading-none select-none pointer-events-none t-display"
        style={{
          fontSize: 'clamp(18rem, 30vw, 36rem)',
          color: 'rgba(192,57,43,0.045)',
          lineHeight: 1,
          top: '-0.1em',
          right: '-0.05em',
          letterSpacing: '-0.05em',
        }}
        aria-hidden="true"
      >
        KFC
      </div>

      {/* Blob */}
      <div
        className="absolute top-0 left-0 w-96 h-96 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(240,165,0,0.1), transparent 70%)',
          borderRadius: '60% 40% 55% 45% / 50% 55% 45% 50%',
          filter: 'blur(2px)',
        }}
        aria-hidden="true"
      />

      <div className="site-container relative z-10">
        <div className="eyebrow-row" style={{ opacity: 0 }}>
          <SectionEyebrow text={ABOUT.eyebrow} />
        </div>

        <h1
          ref={h1Ref}
          className="mb-8"
          aria-label={ABOUT.headline.join(' ')}
          style={{ overflow: 'hidden' }}
        >
          {ABOUT.headline.map((line, i) => (
            <span
              key={i}
              className="block t-serif font-bold leading-[0.93]"
              style={{
                fontSize: 'clamp(3.4rem,7.5vw,6.5rem)',
                color: i === 1 ? 'var(--brick)' : 'var(--ink)',
                fontStyle: i === 1 ? 'italic' : 'normal',
                opacity: 0,
              }}
            >
              {line}
            </span>
          ))}
        </h1>

        <p
          ref={introRef}
          className="t-sans leading-relaxed max-w-2xl"
          style={{ fontSize: '1.05rem', color: 'var(--stone)', opacity: 0 }}
        >
          {ABOUT.intro}
        </p>

        {/* Scroll hint */}
        <div className="mt-12 flex items-center gap-4" aria-hidden="true">
          <div className="divider" style={{ maxWidth: '80px' }} />
          <span className="t-mono text-[9px] text-stone-light" style={{ letterSpacing: '0.2em' }}>
            SCROLL TO EXPLORE
          </span>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
//  Origin Story section
// ─────────────────────────────────────────────────────────────

function OriginSection() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text side
      gsap.fromTo('.origin-text > *',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.origin-text', start: 'top 85%' } })
      // Image side
      gsap.fromTo('.origin-img',
        { opacity: 0, x: 50, scale: 0.97 },
        { opacity: 1, x: 0, scale: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.origin-img', start: 'top 85%' } })
      // Parallax on image
      gsap.to('.origin-img-inner', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: { trigger: '.origin-img', start: 'top bottom', end: 'bottom top', scrub: true },
      })
    }, ref.current)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={ref}
      className="relative py-24 overflow-hidden"
      style={{ background: 'var(--cream)' }}
    >
      {/* Thin vertical rule */}
      <div
        className="absolute left-0 top-16 bottom-16 w-px hidden xl:block"
        style={{ background: 'var(--border)', left: '5rem' }}
        aria-hidden="true"
      />

      <div className="site-container">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* Text */}
          <div className="origin-text">
            <SectionEyebrow text={ABOUT.origin.label} />
            <h2
              className="t-serif font-bold mb-7 leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--ink)' }}
            >
              {ABOUT.origin.heading}
            </h2>
            {ABOUT.origin.body.map((para, i) => (
              <p
                key={i}
                className="t-sans leading-relaxed mb-5"
                style={{ color: 'var(--stone)', fontSize: '0.975rem' }}
              >
                {para}
              </p>
            ))}

            {/* Club name meaning callout */}
            <div
              className="mt-8 p-6 relative overflow-hidden"
              style={{ background: 'var(--parchment)', border: '1px solid var(--border)' }}
            >
              <div className="pattern-stripe absolute inset-0 opacity-60" aria-hidden="true" />
              <div className="relative">
                <span
                  className="t-display text-5xl leading-none text-brick block mb-2"
                  style={{ letterSpacing: '0.04em' }}
                >
                  खुकुरी
                </span>
                <p className="t-mono text-[10px] text-stone mb-3" style={{ letterSpacing: '0.18em' }}>
                  KHUKURI — THE CURVED BLADE OF NEPAL
                </p>
                <p className="t-sans text-sm leading-relaxed" style={{ color: 'var(--inkLight)' }}>
                  A symbol of courage and identity carried by Gurkha soldiers for centuries —
                  and now, the badge on our chest every time we step onto the pitch.
                </p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="origin-img relative" style={{ opacity: 0 }}>
            <div
              className="overflow-hidden"
              style={{ border: '1px solid var(--border)' }}
            >
              <img
                src={ABOUT.origin.image}
                alt={ABOUT.origin.imageCaption}
                className="origin-img-inner w-full object-cover"
                style={{ aspectRatio: '4/3' }}
              />
            </div>
            {/* Caption */}
            <p
              className="mt-3 t-mono text-[10px] text-stone"
              style={{ letterSpacing: '0.15em' }}
            >
              {ABOUT.origin.imageCaption}
            </p>
            {/* Floating year badge */}
            <div
              className="absolute -top-5 -right-5 w-20 h-20 rounded-full flex flex-col items-center justify-center"
              style={{
                background: 'var(--brick)',
                border: '3px solid var(--cream)',
                boxShadow: '0 4px 24px rgba(192,57,43,0.3)',
              }}
              aria-label={`Founded ${CLUB.foundedYear}`}
            >
              <span className="t-display text-cream text-xl leading-none" style={{ letterSpacing: '0.02em' }}>
                {CLUB.foundedYear}
              </span>
              <span className="t-mono text-[7px] text-cream opacity-75" style={{ letterSpacing: '0.2em' }}>
                FOUNDED
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
//  Family / Values section
// ─────────────────────────────────────────────────────────────

function FamilySection() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.family-header > *',
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.family-header', start: 'top 85%' } })
      gsap.fromTo('.value-card',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.values-grid', start: 'top 85%' } })
      gsap.fromTo('.family-img',
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.family-img', start: 'top 85%' } })
    }, ref.current)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={ref}
      className="relative py-24 overflow-hidden grain"
      style={{ background: 'var(--warm)' }}
      aria-labelledby="family-heading"
    >
      {/* Large decorative blob */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 70% 40%, rgba(192,57,43,0.07), transparent 65%)',
        }}
        aria-hidden="true"
      />

      <div className="site-container relative">

        {/* Header */}
        <div className="family-header mb-16 max-w-3xl">
          <SectionEyebrow text={ABOUT.family.label} />
          <h2
            id="family-heading"
            className="t-serif font-bold leading-tight mb-6"
            style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.9rem)', color: 'var(--ink)' }}
          >
            {ABOUT.family.heading}
          </h2>
          <p
            className="t-sans leading-relaxed"
            style={{ fontSize: '1rem', color: 'var(--stone)', maxWidth: '600px' }}
          >
            {ABOUT.family.body}
          </p>
        </div>

        {/* Values grid + image */}
        <div className="grid lg:grid-cols-5 gap-12 items-start">

          {/* Value cards — 3 cols */}
          <div className="values-grid lg:col-span-3 grid sm:grid-cols-2 gap-4">
            {ABOUT.family.values.map((v) => {
              const IconComp = VALUE_ICONS[v.icon]
              return (
              <div
                key={v.title}
                className="value-card group p-6 relative overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.65)',
                  border: '1px solid var(--border)',
                  backdropFilter: 'blur(6px)',
                  opacity: 0,
                }}
              >
                {/* Hover tint */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: 'rgba(192,57,43,0.04)' }}
                  aria-hidden="true"
                />
                {/* Bottom accent */}
                <div
                  className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: 'var(--saffron)' }}
                  aria-hidden="true"
                />
                <div
                  className="w-10 h-10 flex items-center justify-center mb-4 rounded-sm"
                  style={{ background: 'rgba(192,57,43,0.08)', color: 'var(--brick)' }}
                >
                  {IconComp && <IconComp size={20} />}
                </div>
                <h3
                  className="t-serif font-bold mb-2 leading-snug"
                  style={{ fontSize: '1.05rem', color: 'var(--ink)' }}
                >
                  {v.title}
                </h3>
                <p
                  className="t-sans text-sm leading-relaxed"
                  style={{ color: 'var(--stone)' }}
                >
                  {v.desc}
                </p>
              </div>
              )
            })}
          </div>

          {/* Image — 2 cols */}
          <div className="family-img lg:col-span-2 relative" style={{ opacity: 0 }}>
            <div
              className="overflow-hidden"
              style={{ border: '1px solid var(--border)' }}
            >
              <img
                src={ABOUT.family.image}
                alt="Khukuri FC community event"
                className="w-full object-cover"
                style={{ aspectRatio: '3/4' }}
              />
            </div>
            {/* Community tag */}
            <div
              className="absolute -bottom-4 -left-4 px-5 py-3"
              style={{ background: 'var(--ink)', color: 'var(--cream)' }}
            >
              <p className="t-mono text-[9px]" style={{ letterSpacing: '0.2em' }}>
                MORE THAN A CLUB
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
//  Achievements timeline
// ─────────────────────────────────────────────────────────────

function AchievementsSection() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ach-header > *',
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, stagger: 0.09, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.ach-header', start: 'top 85%' } })
      // Timeline items reveal from left
      gsap.fromTo('.ach-item',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: '.ach-list', start: 'top 85%' } })
      // Line grows down
      gsap.fromTo('.ach-line',
        { scaleY: 0 },
        { scaleY: 1, duration: 1.4, ease: 'power2.out',
          scrollTrigger: { trigger: '.ach-list', start: 'top 85%' } })
    }, ref.current)
    return () => ctx.revert()
  }, [])

  const champions = ACHIEVEMENTS.filter(a => a.result === 'Winners' || a.result === 'Champions')
  const podiums   = ACHIEVEMENTS.filter(a => a.result !== 'Winners' && a.result !== 'Champions')

  return (
    <section
      ref={ref}
      className="py-24"
      style={{ background: 'var(--cream)' }}
      aria-labelledby="achievements-heading"
    >
      <div className="site-container">

        {/* Header */}
        <div className="ach-header mb-16">
          <SectionEyebrow text="Honours & achievements" />
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2
              id="achievements-heading"
              className="t-serif font-bold leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--ink)' }}
            >
              A record built<br />
              <em style={{ color: 'var(--brick)' }}>on the pitch.</em>
            </h2>
            <p className="t-sans text-sm leading-relaxed max-w-sm" style={{ color: 'var(--stone)' }}>
              Nine major honours across NZ's top Nepali football competitions,
              with the Tenzing Hillary Cup firmly in our sights every year.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">

          {/* Timeline */}
          <div className="ach-list relative">
            {/* Vertical line */}
            <div
              className="ach-line absolute top-0 bottom-0 w-px origin-top"
              style={{ left: '0', background: 'var(--border)' }}
              aria-hidden="true"
            />

            {ACHIEVEMENTS.map((a, i) => {
              const isWin = a.result === 'Winners' || a.result === 'Champions'
              return (
                <div
                  key={i}
                  className="ach-item relative flex gap-6 pb-6"
                  style={{ paddingLeft: '1.75rem', opacity: 0 }}
                >
                  {/* Dot */}
                  <div
                    className="absolute left-0 top-1 w-2.5 h-2.5 rounded-full -translate-x-[4px]"
                    style={{
                      background: isWin ? 'var(--brick)' : 'var(--border)',
                      border: isWin ? '2px solid var(--saffron)' : '2px solid var(--stone-light)',
                    }}
                    aria-hidden="true"
                  />

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span
                          className="t-mono text-[10px] text-stone block mb-1"
                          style={{ letterSpacing: '0.18em' }}
                        >
                          {a.year}
                        </span>
                        <p
                          className="t-serif font-medium leading-snug"
                          style={{ fontSize: '1rem', color: 'var(--ink)' }}
                        >
                          {a.title}
                        </p>
                      </div>
                      <span
                        className="t-mono text-[9px] whitespace-nowrap px-2.5 py-1 shrink-0"
                        style={{
                          background: isWin ? 'var(--brick)' : 'transparent',
                          color:      isWin ? 'var(--cream)' : 'var(--stone)',
                          border:     isWin ? 'none' : '1px solid var(--border)',
                          letterSpacing: '0.14em',
                        }}
                      >
                        {a.result}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Trophy count visual */}
          <div className="flex flex-col gap-6">
            {/* Big numbers */}
            <div
              className="p-8 relative overflow-hidden"
              style={{ background: 'var(--brick)', color: 'var(--cream)' }}
            >
              <div className="pattern-stripe absolute inset-0 opacity-20" aria-hidden="true" />
              <div className="relative">
                <span
                  className="t-display leading-none block"
                  style={{ fontSize: '7rem', color: 'rgba(255,255,255,0.12)', position: 'absolute', top: '-1rem', right: '-1rem', letterSpacing: '-0.02em' }}
                  aria-hidden="true"
                >
                  {champions.length}
                </span>
                <p className="t-mono text-[10px] mb-3 opacity-70" style={{ letterSpacing: '0.22em' }}>
                  TOURNAMENT TITLES
                </p>
                <p className="t-serif font-bold text-5xl mb-1">
                  {champions.length} Titles
                </p>
                <p className="t-sans text-sm opacity-80">
                  NANI Cup &amp; Tenzing Hillary Cup wins
                </p>
              </div>
            </div>

            <div
              className="p-8 relative overflow-hidden"
              style={{ background: 'var(--parchment)', border: '1px solid var(--border)' }}
            >
              <span
                className="t-display leading-none block"
                style={{ fontSize: '7rem', color: 'rgba(192,57,43,0.07)', position: 'absolute', top: '-1rem', right: '-1rem', letterSpacing: '-0.02em' }}
                aria-hidden="true"
              >
                {podiums.length}
              </span>
              <div className="relative">
                <p className="t-mono text-[10px] mb-3 text-stone" style={{ letterSpacing: '0.22em' }}>
                  PODIUM FINISHES
                </p>
                <p className="t-serif font-bold text-5xl text-ink mb-1">
                  {podiums.length} Podiums
                </p>
                <p className="t-sans text-sm text-stone">
                  Runner-up and 3rd place across NZ
                </p>
              </div>
            </div>

            {/* Ambition quote */}
            <blockquote
              className="p-6"
              style={{ borderLeft: '3px solid var(--saffron)', background: 'rgba(240,165,0,0.06)' }}
            >
              <p
                className="t-serif italic font-medium mb-3"
                style={{ fontSize: '1.1rem', color: 'var(--ink-light)' }}
              >
                {ABOUT.ambition.quote}
              </p>
              <p className="t-sans text-sm leading-relaxed" style={{ color: 'var(--stone)' }}>
                {ABOUT.ambition.body}
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
//  Where we play section
// ─────────────────────────────────────────────────────────────

function GroundSection() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ground-content > *',
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.ground-content', start: 'top 85%' } })
      gsap.fromTo('.tournament-card',
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, stagger: 0.09, duration: 0.75, ease: 'power3.out',
          scrollTrigger: { trigger: '.tournaments-row', start: 'top 88%' } })
      gsap.fromTo('.ground-img-wrap',
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.ground-img-wrap', start: 'top 85%' } })
    }, ref.current)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={ref}
      className="py-24 overflow-hidden"
      style={{ background: 'var(--warm)' }}
      aria-labelledby="ground-heading"
    >
      <div className="site-container">

        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-start mb-20">

          {/* Left: text */}
          <div className="ground-content">
            <SectionEyebrow text={ABOUT.ground.label} />
            <h2
              id="ground-heading"
              className="t-serif font-bold leading-tight mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--ink)' }}
            >
              {ABOUT.ground.heading}
            </h2>
            <p
              className="t-sans leading-relaxed mb-8"
              style={{ fontSize: '0.975rem', color: 'var(--stone)', maxWidth: '480px' }}
            >
              {ABOUT.ground.body}
            </p>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ background: 'var(--sage)', opacity: 0.85 }}
                aria-hidden="true"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"
                    fill="var(--cream)" opacity="0.9"/>
                </svg>
              </div>
              <span className="t-sans text-sm" style={{ color: 'var(--ink-light)' }}>
                {CLUB.ground}
              </span>
            </div>
          </div>

          {/* Right: match photo */}
          <div className="ground-img-wrap relative" style={{ opacity: 0 }}>
            <div className="overflow-hidden" style={{ border: '1px solid var(--border)' }}>
              <img
                src={ABOUT.ground.image}
                alt="Khukuri FC match day"
                className="w-full object-cover"
                style={{ aspectRatio: '16/9' }}
              />
            </div>
          </div>
        </div>

        {/* Tournaments */}
        <div>
          <div className="mb-8">
            <SectionEyebrow text="Competitions we play in" />
          </div>
          <div className="tournaments-row grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {TOURNAMENTS.map((t) => (
              <div
                key={t.name}
                className="tournament-card group p-6 relative overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.6)',
                  border: '1px solid var(--border)',
                  backdropFilter: 'blur(6px)',
                  opacity: 0,
                }}
              >
                <div
                  className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: 'var(--brick)' }}
                  aria-hidden="true"
                />
                {/* Tier badge */}
                <span
                  className="t-mono text-[9px] px-2 py-0.5 mb-4 inline-block"
                  style={{
                    background: t.tier === 'Main Goal' ? 'var(--brick)' : 'transparent',
                    color:      t.tier === 'Main Goal' ? 'var(--cream)' : 'var(--stone)',
                    border:     t.tier === 'Main Goal' ? 'none' : '1px solid var(--border)',
                    letterSpacing: '0.14em',
                  }}
                >
                  {t.tier}
                </span>
                <h3
                  className="t-serif font-bold mb-1 leading-snug"
                  style={{ fontSize: '1rem', color: 'var(--ink)' }}
                >
                  {t.name}
                </h3>
                <span
                  className="t-mono text-[9px] text-stone block mb-3"
                  style={{ letterSpacing: '0.15em' }}
                >
                  {t.short}
                </span>
                <p className="t-sans text-sm leading-relaxed" style={{ color: 'var(--stone)' }}>
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
//  CTA banner
// ─────────────────────────────────────────────────────────────

function AboutCTA() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cta-inner > *',
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.cta-inner', start: 'top 88%' } })
    }, ref.current)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={ref}
      className="relative py-24 grain overflow-hidden"
      style={{ background: 'var(--ink)' }}
      aria-label="Join Khukuri FC"
    >
      {/* Warm glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 60% 50%, rgba(192,57,43,0.25), transparent 65%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 20% 50%, rgba(240,165,0,0.1), transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="site-container relative">
        <div className="cta-inner max-w-3xl">
          <SectionEyebrow text="Ready to be part of it?" />
          <h2
            className="t-serif font-bold leading-tight mb-6"
            style={{ fontSize: 'clamp(2.4rem,5vw,4rem)', color: 'var(--cream)' }}
          >
            The badge is yours to earn.{' '}
            <em style={{ color: 'var(--saffron)' }}>Come earn it.</em>
          </h2>
          <p
            className="t-sans leading-relaxed mb-10"
            style={{ fontSize: '1rem', color: 'rgba(232,227,216,0.7)', maxWidth: '520px' }}
          >
            Whether you're a seasoned player, a student on a tight budget, or someone who just
            wants to be part of something real — there's a place for you at Khukuri FC.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/join"
              className="btn"
              style={{
                background: 'var(--brick)',
                color: 'var(--cream)',
                border: '1.5px solid var(--brick)',
              }}
            >
              <span>Join the Family</span>
              <IconArrowRight size={13} />
            </Link>
            <Link
              to="/contact"
              className="btn"
              style={{
                background: 'transparent',
                color: 'var(--cream)',
                border: '1.5px solid rgba(232,227,216,0.3)',
              }}
            >
              <span>Get in Touch</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
//  Page assembly
// ─────────────────────────────────────────────────────────────

export default function AboutPage() {
  // Scroll to top on mount
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <main>
      <AboutHero />
      <OriginSection />
      <FamilySection />
      <AchievementsSection />
      <GroundSection />
      <AboutCTA />
    </main>
  )
}
