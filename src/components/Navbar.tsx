'use client'

import { useState, useEffect } from 'react'

const ItalianFlag = () => (
  <svg className="navbar-flag" viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="10" height="20" fill="#009246" />
    <rect x="10" width="10" height="20" fill="#FFFFFF" />
    <rect x="20" width="10" height="20" fill="#CE2B37" />
  </svg>
)

const navLinks = [
  { label: 'Über uns', id: 'about' },
  { label: 'Speisekarte', id: 'menu' },
  { label: 'Öffnungszeiten', id: 'hours' },
  { label: 'Kontakt', id: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Hauptnavigation">
        <a href="#hero" className="navbar-logo" onClick={(e) => scrollToSection(e, 'hero')} aria-label="Le Gusto Ristorante – zurück nach oben">
          <ItalianFlag />
          <span className="navbar-logo-text">Le Gusto</span>
        </a>

        <ul className="navbar-links">
          {navLinks.map(({ label, id }) => (
            <li key={id}>
              <a href={`#${id}`} onClick={(e) => scrollToSection(e, id)}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className={`navbar-hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Full-screen mobile overlay */}
      <div className={`navbar-overlay${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        <ul className="navbar-overlay-links">
          {navLinks.map(({ label, id }) => (
            <li key={id}>
              <a href={`#${id}`} onClick={(e) => scrollToSection(e, id)}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
