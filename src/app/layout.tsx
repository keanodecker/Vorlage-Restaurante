import type { Metadata } from 'next'
import './globals.css'
import DemoBadge from '@/components/DemoBadge'

export const metadata: Metadata = {
  title: 'Demo-Webseite Restaurant | Media Castle',
  description:
    'Dies ist eine Demo-Webseite von Media Castle. So könnte Ihre Restaurant-Webseite aussehen.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Google Fonts — loaded at runtime so no build-time network access needed */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Lato:wght@300;400;700&family=DM+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <DemoBadge />
      </body>
    </html>
  )
}
