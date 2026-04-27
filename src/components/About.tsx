'use client'

import { useEffect, useRef } from 'react'

export default function About() {
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      // Staggered text reveal
      gsap.fromTo(
        '.about-reveal',
        { opacity: 0, y: 38 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.14,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-text',
            start: 'top 80%',
          },
        }
      )

      // Image parallax
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: '12%',
          ease: 'none',
          scrollTrigger: {
            trigger: '.about-image-wrapper',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    }

    init()
  }, [])

  return (
    <section className="about" id="about">
      <div className="about-grid">
        <div className="about-text">
          <span className="section-label about-reveal">Über uns</span>
          <h2 className="about-headline about-reveal">
            Ein Stück Italien<br />mitten in Freiburg
          </h2>
          <p className="about-body about-reveal">
            Bei [Ihr Firmenname] begrüßen wir Sie mit der Herzlichkeit und dem unverwechselbaren
            Geschmack Italiens. Unsere Küche verbindet traditionelle Familienrezepte aus der Toskana
            mit frischen, sorgfältig ausgewählten Zutaten — für ein echtes italienisches Erlebnis
            mitten in Freiburg.
          </p>
          <p className="about-body about-reveal">
            Ob ein entspanntes Mittagessen oder ein festliches Abendessen im Kreise der Familie —
            bei uns finden Sie Genuss, Wärme und Gastfreundschaft, die Sie immer wieder
            zurückkommen lässt.
          </p>
          <div className="about-rating about-reveal">
            <span className="stars">★★★★½</span>
            <span>4,7 auf Google · 184 Bewertungen</span>
          </div>
          <a
            href="#"
            className="about-link about-reveal"
          >
            Bewertungen lesen →
          </a>
        </div>

        <div className="about-image-wrapper">
          <img
            ref={imageRef}
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80"
            alt="Stimmungsvoller Innenraum eines italienischen Restaurants"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}
