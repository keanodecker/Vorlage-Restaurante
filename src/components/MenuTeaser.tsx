'use client'

import { useEffect } from 'react'

const cards = [
  {
    id: 1,
    title: 'Antipasti',
    subtitle: 'Vorspeisen aus dem Süden',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&q=80',
    alt: 'Frische Antipasti',
  },
  {
    id: 2,
    title: 'Pasta & Risotto',
    subtitle: 'Klassiker der Toskana',
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=900&q=80',
    alt: 'Hausgemachte Pasta',
  },
  {
    id: 3,
    title: 'Secondi Piatti',
    subtitle: 'Hauptgerichte mit Charakter',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=900&q=80',
    alt: 'Italienische Secondi',
  },
]

export default function MenuTeaser() {
  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.fromTo(
        '.menu-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.menu', start: 'top 80%' },
        }
      )

      gsap.fromTo(
        '.menu-card',
        { opacity: 0, y: 55 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.menu-grid', start: 'top 85%' },
        }
      )

      gsap.fromTo(
        '.menu-cta-wrapper',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.menu-cta-wrapper', start: 'top 90%' },
        }
      )
    }

    init()
  }, [])

  return (
    <section className="menu" id="menu">
      <div className="menu-inner">
        <div className="menu-header">
          <span className="section-label">Unsere Küche</span>
          <h2 className="menu-headline">Was uns bewegt</h2>
        </div>

        <div className="menu-grid">
          {cards.map((card) => (
            <div key={card.id} className="menu-card">
              <div className="menu-card-image">
                <img src={card.image} alt={card.alt} loading="lazy" />
                <div className="menu-card-overlay">
                  <div>
                    <p className="menu-card-title">{card.title}</p>
                    <span className="menu-card-subtitle">{card.subtitle}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="menu-cta-wrapper">
          <a
            href="#"
            className="btn-primary"
          >
            Zur vollständigen Speisekarte
          </a>
        </div>
      </div>
    </section>
  )
}
