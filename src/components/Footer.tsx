const ItalianFlag = () => (
  <svg
    width="28"
    height="19"
    viewBox="0 0 30 20"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    style={{ borderRadius: '2px', flexShrink: 0, boxShadow: '0 1px 4px rgba(0,0,0,0.25)' }}
  >
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

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo">
          <ItalianFlag />
          Le Gusto Ristorante
        </div>

        <ul className="footer-nav" aria-label="Footer Navigation">
          {navLinks.map(({ label, id }) => (
            <li key={id}>
              <a href={`#${id}`}>{label}</a>
            </li>
          ))}
        </ul>

        <p className="footer-copy">
          &copy; 2025 Le Gusto Ristorante<br />
          Kaiserstraße 43, 77933 Lahr
        </p>
      </div>

      {/* Italian tricolore bottom stripe */}
      <div className="footer-flag-stripe" aria-hidden="true">
        <span className="green" />
        <span className="white" />
        <span className="red" />
      </div>
    </footer>
  )
}
