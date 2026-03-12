import { useRef, useEffect } from 'react'
import gsap                   from 'gsap'
import { ScrollTrigger }      from 'gsap/ScrollTrigger'
import { SPONSORS_PAGE, SPONSORS, CLUB } from '@/data/siteData'
import {
  IconHandshake, IconMountain, IconSeedling, IconCelebration,
  IconArrowRight, IconExternalLink, IconMail,
} from '@/components/icons'

gsap.registerPlugin(ScrollTrigger)

const ICONS = {
  handshake: IconHandshake, mountain: IconMountain,
  seedling: IconSeedling,   celebration: IconCelebration,
}

function Eyebrow({ text }) {
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
//  Hero
// ─────────────────────────────────────────────────────────────
function SponsorsHero() {
  const ref = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
    tl.fromTo(ref.current?.querySelector('.eyebrow'),
      { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.8 }, 0.1)
    tl.fromTo(ref.current?.querySelectorAll('.h1-line'),
      { opacity: 0, y: 56, skewY: 3 },
      { opacity: 1, y: 0, skewY: 0, stagger: 0.12, duration: 1.1 }, 0.25)
    tl.fromTo(ref.current?.querySelector('.intro'),
      { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9 }, 0.75)
    return () => tl.kill()
  }, [])

  return (
    <section ref={ref}
      className="relative overflow-hidden grain pt-32 pb-24"
      style={{ background: 'var(--parchment)' }}
      aria-label="Sponsors"
    >
      <div className="absolute top-0 left-0 w-1/2 h-full pointer-events-none"
        style={{ background: 'radial-gradient(circle at 20% 50%, rgba(240,165,0,0.08), transparent 65%)' }}
        aria-hidden="true" />

      <div className="site-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="eyebrow" style={{ opacity: 0 }}><Eyebrow text={SPONSORS_PAGE.eyebrow} /></div>
            <h1 className="mb-8">
              {SPONSORS_PAGE.headline.map((line, i) => (
                <span key={i} className="h1-line block t-serif font-bold leading-[0.93]"
                  style={{ fontSize: 'clamp(2.8rem,6.5vw,5.2rem)',
                    color: i === 1 ? 'var(--brick)' : 'var(--ink)',
                    fontStyle: i === 1 ? 'italic' : 'normal', opacity: 0 }}>
                  {line}
                </span>
              ))}
            </h1>
            <p className="intro t-sans leading-relaxed"
              style={{ fontSize: '1rem', color: 'var(--stone)', maxWidth: '480px', opacity: 0 }}>
              {SPONSORS_PAGE.intro}
            </p>
          </div>

          {/* Current sponsors preview */}
          <div className="flex flex-col gap-3">
            {SPONSORS.map((s) => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                className="group flex items-center justify-between p-5 transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid var(--border)',
                  backdropFilter: 'blur(6px)' }}>
                <div>
                  <p className="t-mono text-[9px] mb-1 text-stone" style={{ letterSpacing: '0.18em' }}>
                    {s.tier.toUpperCase()}
                  </p>
                  <p className="t-serif font-bold" style={{ color: 'var(--ink)' }}>{s.name}</p>
                </div>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ color: 'var(--brick)' }}>
                  <IconExternalLink size={14} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
//  Current sponsors — full showcase
// ─────────────────────────────────────────────────────────────
function CurrentSponsors() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.sponsor-card',
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.sponsors-grid', start: 'top 85%' } })
    }, ref.current)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="py-24" style={{ background: 'var(--cream)' }}
      aria-labelledby="current-sponsors-heading">
      <div className="site-container">
        <div className="mb-12">
          <Eyebrow text="Current partners" />
          <h2 id="current-sponsors-heading" className="t-serif font-bold"
            style={{ fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', color: 'var(--ink)' }}>
            The people who make it possible.
          </h2>
        </div>

        <div className="sponsors-grid grid md:grid-cols-2 gap-6">
          {SPONSORS.map((s) => (
            <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
              className="sponsor-card group relative overflow-hidden flex flex-col"
              style={{ border: '1px solid var(--border)', opacity: 0, textDecoration: 'none' }}>

              {/* Tier tag */}
              <div className="px-6 pt-5 pb-3 flex items-center justify-between"
                style={{ borderBottom: '1px solid var(--border)' }}>
                <span className="t-mono text-[9px] text-stone" style={{ letterSpacing: '0.2em' }}>
                  {s.tier.toUpperCase()}
                </span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ color: 'var(--brick)' }}>
                  <IconExternalLink size={13} />
                </span>
              </div>

              {/* Logo area */}
              <div className="flex items-center justify-center p-12"
                style={{ background: 'var(--warm)', flex: 1 }}>
                <img src={s.logo} alt={s.name} className="max-w-full object-contain"
                  style={{ maxHeight: '80px' }} />
              </div>

              {/* Name + desc */}
              <div className="px-6 py-5">
                <p className="t-serif font-bold mb-1"
                  style={{ fontSize: '1.1rem', color: 'var(--ink)' }}>{s.name}</p>
                <p className="t-sans text-sm" style={{ color: 'var(--stone)' }}>{s.description}</p>
              </div>

              {/* Bottom hover line */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                style={{ background: 'var(--brick)' }} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
//  Sponsor perks grid
// ─────────────────────────────────────────────────────────────
function SponsorPerks() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.perk-card',
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, stagger: 0.09, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.perks-grid', start: 'top 85%' } })
      gsap.fromTo('.perks-header > *',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, stagger: 0.09, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.perks-header', start: 'top 85%' } })
    }, ref.current)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="py-24 grain"
      style={{ background: 'var(--warm)' }}
      aria-labelledby="perks-heading">
      <div className="site-container">
        <div className="perks-header mb-14">
          <Eyebrow text="What sponsorship means" />
          <h2 id="perks-heading" className="t-serif font-bold leading-tight"
            style={{ fontSize: 'clamp(1.9rem,3.8vw,2.8rem)', color: 'var(--ink)' }}>
            Your brand, at the heart<br />
            <em style={{ color: 'var(--brick)' }}>of a real community.</em>
          </h2>
        </div>

        <div className="perks-grid grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {SPONSORS_PAGE.perks.map((p) => {
            const IconComp = ICONS[p.icon]
            return (
              <div key={p.title} className="perk-card group p-6 relative overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid var(--border)',
                  backdropFilter: 'blur(6px)', opacity: 0 }}>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: 'var(--saffron)' }} aria-hidden="true" />
                <div className="w-10 h-10 flex items-center justify-center mb-4 rounded-sm"
                  style={{ background: 'rgba(192,57,43,0.08)', color: 'var(--brick)' }}>
                  {IconComp && <IconComp size={20} />}
                </div>
                <h3 className="t-serif font-bold mb-2"
                  style={{ fontSize: '1rem', color: 'var(--ink)' }}>{p.title}</h3>
                <p className="t-sans text-sm leading-relaxed"
                  style={{ color: 'var(--stone)' }}>{p.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
//  Become a Sponsor CTA
// ─────────────────────────────────────────────────────────────
function BecomeSponsor() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current?.querySelectorAll('.cta-item'),
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%' } })
    }, ref.current)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="relative py-24 overflow-hidden grain"
      style={{ background: 'var(--ink)' }}
      aria-labelledby="become-sponsor-heading">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(192,57,43,0.22), transparent 60%)' }}
        aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(240,165,0,0.09), transparent 55%)' }}
        aria-hidden="true" />

      <div className="site-container relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="cta-item" style={{ opacity: 0 }}>
              <Eyebrow text={SPONSORS_PAGE.sponsorCTA.heading} />
            </div>
            <h2 id="become-sponsor-heading"
              className="cta-item t-serif font-bold leading-tight mb-6"
              style={{ fontSize: 'clamp(2rem,4.5vw,3.5rem)', color: 'var(--cream)', opacity: 0 }}>
              Let's build something<br />
              <em style={{ color: 'var(--saffron)' }}>together.</em>
            </h2>
            <p className="cta-item t-sans leading-relaxed mb-8"
              style={{ fontSize: '1rem', color: 'rgba(232,227,216,0.65)',
                maxWidth: '440px', opacity: 0 }}>
              {SPONSORS_PAGE.sponsorCTA.body}
            </p>
            <div className="cta-item flex flex-wrap gap-3" style={{ opacity: 0 }}>
              <a href={`mailto:${SPONSORS_PAGE.sponsorCTA.email}`}
                className="btn" style={{
                  background: 'var(--brick)', color: 'var(--cream)',
                  border: '1.5px solid var(--brick)' }}>
                <IconMail size={14} />
                <span>Get in Touch</span>
              </a>
              <a href={`mailto:${SPONSORS_PAGE.sponsorCTA.email}`}
                className="btn" style={{
                  background: 'transparent', color: 'var(--cream)',
                  border: '1.5px solid rgba(232,227,216,0.25)' }}>
                <span>{SPONSORS_PAGE.sponsorCTA.email}</span>
              </a>
            </div>
          </div>

          {/* Decorative stat panel */}
          <div className="cta-item grid grid-cols-2 gap-3" style={{ opacity: 0 }}>
            {[
              { val: '20+', label: 'Years of community' },
              { val: 'NZ',  label: 'National reach' },
              { val: '100+', label: 'Active members' },
              { val: '4',   label: 'Tournaments per year' },
            ].map(({ val, label }) => (
              <div key={label} className="p-5 flex flex-col gap-1"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <span className="t-display text-3xl leading-none"
                  style={{ color: 'var(--saffron)', letterSpacing: '0.02em' }}>{val}</span>
                <span className="t-mono text-[9px] text-stone-light" style={{ letterSpacing: '0.16em' }}>
                  {label.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
//  Page
// ─────────────────────────────────────────────────────────────
export default function SponsorsPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <main>
      <SponsorsHero />
      <CurrentSponsors />
      <SponsorPerks />
      <BecomeSponsor />
    </main>
  )
}
