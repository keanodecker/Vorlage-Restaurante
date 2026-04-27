import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Impressum | Demo-Webseite',
}

export default function Impressum() {
  return (
    <main className="legal-page">
      <div className="legal-inner">
        <Link href="/" className="legal-back">← Zurück zur Startseite</Link>
        <h1 className="legal-headline">Impressum</h1>
        <p className="legal-body">
          Dies ist eine Demo-Webseite von Media Castle. Hier wird im Live-Betrieb das
          Impressum des Auftraggebers eingefügt.
        </p>
        <p className="legal-body">
          Sie möchten eine eigene Webseite in diesem Stil?{' '}
          <a href="https://mediacastle.de/#kontakt" target="_blank" rel="noopener noreferrer">
            Jetzt Media Castle kontaktieren
          </a>
          .
        </p>
      </div>
    </main>
  )
}
