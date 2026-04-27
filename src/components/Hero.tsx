'use client'

import { useEffect, useRef } from 'react'

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      // Set initial hidden states before animating
      gsap.set('.hero-location', { opacity: 0, y: 24 })
      gsap.set('.hero-title', { opacity: 0, y: 48 })
      gsap.set('.hero-subtitle', { opacity: 0, y: 24 })
      gsap.set('.hero-cta', { opacity: 0, y: 24 })

      // Staggered entrance animation
      const tl = gsap.timeline({ delay: 0.4 })
      tl.to('.hero-location', { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' })
        .to('.hero-title', { opacity: 1, y: 0, duration: 1.1, ease: 'power2.out' }, '-=0.5')
        .to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, '-=0.55')
        .to('.hero-cta', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.55')

      // Parallax background on scroll
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          y: '30%',
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    }

    init()
  }, [])

  return (
    <section className="hero" id="hero">
      {/* Parallax background */}
      <div className="hero-bg" ref={bgRef} aria-hidden="true" />
      <div className="hero-overlay" aria-hidden="true" />

      {/* Centered content */}
      <div className="hero-content">
        <span className="hero-location">Kaiserstraße 43 · Lahr/Schwarzwald</span>
        <h1 className="hero-title">
          <span>Dove il gusto</span>
          <span>incontra l&apos;anima</span>
        </h1>
        <p className="hero-subtitle">
          Authentische italienische Küche — mit Leidenschaft zubereitet seit Jahren
        </p>
        <a href="tel:078219769376" className="hero-cta">
          Tisch reservieren
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator" aria-hidden="true">
        <span>Entdecken</span>
        <div className="scroll-arrow" />
      </div>
    </section>
  )
}
