import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Le Gusto Ristorante | Authentische Italienische Küche in Lahr',
  description:
    'Erleben Sie authentische italienische Küche im Herzen von Lahr/Schwarzwald. Le Gusto Ristorante — Kaiserstraße 43, 77933 Lahr. Täglich geöffnet (außer Montag). Bewertung: 4,6 ★',
  keywords: ['Le Gusto', 'Ristorante', 'Italienisches Restaurant', 'Lahr', 'Schwarzwald', 'Pizza', 'Pasta'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Google Fonts — loaded at runtime so no build-time network access needed */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Lato:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
