const LogoPlaceholder = () => (
  <span className="footer-logo-box" aria-hidden="true">Logo</span>
)

const navLinks = [
  { label: 'Über uns', id: 'about' },
  { label: 'Speisekarte', id: 'menu' },
  { label: 'Öffnungszeiten', id: 'hours' },
  { label: 'Kontakt', id: 'contact' },
]

const legalLinks = [
  { label: 'Impressum', href: '/impressum' },
  { label: 'Datenschutz', href: '/datenschutz' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo">
          <LogoPlaceholder />
          [Ihr Firmenname]
        </div>

        <ul className="footer-nav" aria-label="Footer Navigation">
          {navLinks.map(({ label, id }) => (
            <li key={id}>
              <a href={`#${id}`}>{label}</a>
            </li>
          ))}
          {legalLinks.map(({ label, href }) => (
            <li key={href}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>

        <p className="footer-copy">
          &copy; 2025 [Ihr Firmenname]<br />
          [Ihre Adresse], Freiburg
        </p>
      </div>

      <p className="footer-mediacastle">
        Webseite erstellt von{' '}
        <a href="https://mediacastle.de" target="_blank" rel="noopener noreferrer">
          Media Castle – mediacastle.de
        </a>
      </p>

      {/* Italian tricolore bottom stripe */}
      <div className="footer-flag-stripe" aria-hidden="true">
        <span className="green" />
        <span className="white" />
        <span className="red" />
      </div>
    </footer>
  )
}
