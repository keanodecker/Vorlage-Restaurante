'use client'

import { useEffect, useRef } from 'react'

export default function Atmosphere() {
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      // Parallax on background
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          y: '28%',
          ease: 'none',
          scrollTrigger: {
            trigger: '.atmosphere',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      // Quote fade in
      gsap.fromTo(
        '.atmosphere-content',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.atmosphere', start: 'top 65%' },
        }
      )
    }

    init()
  }, [])

  return (
    <section className="atmosphere" aria-label="Zitat">
      <div className="atmosphere-bg" ref={bgRef} aria-hidden="true" />
      <div className="atmosphere-overlay" aria-hidden="true" />

      <div className="atmosphere-content">
        <blockquote className="atmosphere-quote">
          &ldquo;La cucina è l&apos;arte di trasformare<br />i prodotti della natura in gioia.&rdquo;
        </blockquote>
        <p className="atmosphere-credit">— [Ihr Firmenname], Freiburg</p>
      </div>
    </section>
  )
}
