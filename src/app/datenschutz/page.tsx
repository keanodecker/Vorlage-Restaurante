import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Datenschutz | Demo-Webseite',
}

export default function Datenschutz() {
  return (
    <main className="legal-page">
      <div className="legal-inner">
        <Link href="/" className="legal-back">← Zurück zur Startseite</Link>
        <h1 className="legal-headline">Datenschutzerklärung</h1>
        <p className="legal-body">
          Dies ist eine Demo-Webseite von Media Castle. Hier wird im Live-Betrieb die
          Datenschutzerklärung des Auftraggebers eingefügt.
        </p>
        <p className="legal-body">
          Sie möchten eine eigene Webseite in diesem Stil?{' '}
          <a href="https://www.media-castle.com/leistungen/webdesign-vorlagen" target="_blank" rel="noopener noreferrer">
            Jetzt Media Castle kontaktieren
          </a>
          .
        </p>
      </div>
    </main>
  )
}
