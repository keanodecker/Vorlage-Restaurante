'use client'

import { useEffect } from 'react'

export default function Contact() {
  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.fromTo(
        '.contact-info',
        { opacity: 0, x: -35 },
        {
          opacity: 1,
          x: 0,
          duration: 0.95,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.contact', start: 'top 80%' },
        }
      )

      gsap.fromTo(
        '.contact-map',
        { opacity: 0, x: 35 },
        {
          opacity: 1,
          x: 0,
          duration: 0.95,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.contact', start: 'top 80%' },
        }
      )
    }

    init()
  }, [])

  return (
    <section className="contact" id="contact">
      <div className="contact-inner">
        {/* Left: contact info */}
        <div className="contact-info">
          <span className="section-label">Finden Sie uns</span>
          <h2 className="contact-headline">Besuchen Sie uns</h2>

          <div className="contact-item">
            <span className="contact-item-label">Adresse</span>
            <span className="contact-item-value">
              [Ihre Adresse]<br />
              Freiburg
            </span>
          </div>

          <div className="contact-item">
            <span className="contact-item-label">Telefon</span>
            <span className="contact-item-value">
              [Ihre Telefonnummer]
            </span>
          </div>

          <div className="contact-item">
            <span className="contact-item-label">E-Mail</span>
            <span className="contact-item-value">
              [Ihre E-Mail]
            </span>
          </div>

          <div className="contact-item">
            <span className="contact-item-label">Preisklasse</span>
            <span className="contact-item-value">20 – 30 € pro Person</span>
          </div>

          <div className="contact-item">
            <span className="contact-item-label">Öffnungszeiten</span>
            <span className="contact-item-value">
              Di – Fr: 11:30 – 14:00 &amp; 17:00 – 22:00<br />
              Samstag: 12:00 – 22:00<br />
              Sonntag: 12:00 – 21:00<br />
              Montag: Geschlossen
            </span>
          </div>

          <a href="#" className="contact-cta">
            Tisch reservieren
          </a>
        </div>

        {/* Right: Google Maps */}
        <div className="contact-map">
          <iframe
            src="https://maps.google.com/maps?q=Freiburg+im+Breisgau&output=embed"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Karte – Freiburg"
          />
        </div>
      </div>
    </section>
  )
}
